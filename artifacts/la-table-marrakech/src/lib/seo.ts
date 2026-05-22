// Per-page SEO + page_view hook.
//
// Why a runtime hook (instead of just JSX <title> / <meta>):
//   index.html ships static <title>, <meta name="description">, and
//   <link rel="canonical"> for no-JS / crawler fallback. React 19 hoists
//   newly-rendered <title>/<meta>/<link> into <head> but does NOT
//   deduplicate by name/rel, so we'd end up with two canonicals per
//   page (Google reads the first one — which would be the static home
//   value). This hook mutates the existing tags in place so there's
//   exactly one of each, with the correct values for the current route.
//
// Also fires the SPA page_view event so GA4 / GTM see route changes
// (wouter doesn't trigger them automatically).

import { useEffect } from "react";
import { trackPageView } from "./analytics";

export const HOMEPAGE_TITLE =
  "Private Chef Marrakech | Villa & Riad Dining from €85/Person — La Table Marrakech";

export const HOMEPAGE_DESC =
  "Private chef at your villa or riad in Marrakech. Bespoke Moroccan menus, souk-fresh ingredients, full service & cleanup. From €85/person. WhatsApp +212 721 354 757.";

export const SITE_URL = "https://latablemarrakech.com";
export const OPENGRAPH_IMAGE = `${SITE_URL}/opengraph.jpg`;

export interface SEOInput {
  title: string;
  description: string;
  /** Absolute URL, e.g. "https://latablemarrakech.com/chef" */
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  /** Absolute URL to a 1200x630 image. Defaults to /opengraph.jpg. */
  ogImage?: string;
  ogType?: "website" | "article" | "restaurant.restaurant";
  /** noindex flag for thin / utility pages. */
  noindex?: boolean;
  /** Any JSON-LD object (or array) to inject as <script id="page-jsonld">. */
  jsonLd?: unknown;
}

const DEFAULT_OG_IMAGE = OPENGRAPH_IMAGE;
const PAGE_JSONLD_ID = "page-jsonld";

function ensureMeta(
  attr: "name" | "property",
  key: string,
  value: string,
): void {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function ensureLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function ensurePageJsonLd(data: unknown): void {
  let el = document.getElementById(
    PAGE_JSONLD_ID,
  ) as HTMLScriptElement | null;
  if (data == null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.id = PAGE_JSONLD_ID;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function useSEO(input: SEOInput): void {
  useEffect(() => {
    const ogImage = input.ogImage ?? DEFAULT_OG_IMAGE;
    const ogTitle = input.ogTitle ?? input.title;
    const ogDescription = input.ogDescription ?? input.description;

    document.title = input.title;
    ensureMeta("name", "description", input.description);
    ensureLink("canonical", input.canonical);
    ensureMeta(
      "name",
      "robots",
      input.noindex ? "noindex, nofollow" : "index, follow",
    );

    // Open Graph
    ensureMeta("property", "og:title", ogTitle);
    ensureMeta("property", "og:description", ogDescription);
    ensureMeta("property", "og:url", input.canonical);
    ensureMeta("property", "og:image", ogImage);
    ensureMeta("property", "og:type", input.ogType ?? "website");
    ensureMeta("property", "og:site_name", "La Table Marrakech");
    ensureMeta("property", "og:locale", "en_US");

    // Twitter
    ensureMeta("name", "twitter:card", "summary_large_image");
    ensureMeta("name", "twitter:title", ogTitle);
    ensureMeta("name", "twitter:description", ogDescription);
    ensureMeta("name", "twitter:image", ogImage);

    // Page-scoped JSON-LD (Restaurant JSON-LD in index.html is global; this
    // tag is for page-specific schemas like FAQPage / BreadcrumbList).
    ensurePageJsonLd(input.jsonLd);

    // SPA page_view for GA4 / GTM
    try {
      const path = new URL(input.canonical).pathname || "/";
      trackPageView(path, input.title);
    } catch {
      trackPageView(window.location.pathname, input.title);
    }
  }, [
    input.title,
    input.description,
    input.canonical,
    input.ogTitle,
    input.ogDescription,
    input.ogImage,
    input.ogType,
    input.noindex,
    // jsonLd is intentionally stringified outside to avoid identity churn;
    // pages pass static objects so the dep array is fine without it.
  ]);
}

/* ── JSON-LD helpers ─────────────────────────────────────────────── */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): unknown {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface FAQ {
  question: string;
  answer: string;
}

export function faqSchema(faqs: FAQ[]): unknown {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

export interface Review {
  author: string;
  text: string;
  rating?: number;
}

export function reviewAggregateSchema(
  reviews: Review[],
  businessName = "La Table Marrakech",
  businessUrl = "https://latablemarrakech.com/",
): unknown {
  const ratings = reviews
    .map((r) => r.rating)
    .filter((r): r is number => typeof r === "number");
  const avg =
    ratings.length > 0
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : 5;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: businessName,
    url: businessUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.slice(0, 10).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating ?? 5,
        bestRating: 5,
      },
      reviewBody: r.text,
    })),
  };
}
