# SEO Checklist — La Table Marrakech

Status as of 2026-05-17.

## On-page (per route)

| Page | Title | Description | Canonical | H1 | Page schema | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | Private Chef in Marrakech \| Villa, Riad & Desert Dining — La Table Marrakech | Set | `/` | "A private chef at your table. In Marrakech, tonight." | Restaurant + Breadcrumb | ✓ |
| `/experiences` | Ten Ways To Eat Well In Marrakech — La Table Marrakech | Set | `/experiences` | Set | Restaurant + Breadcrumb | ✓ |
| `/chef` | The Chef — Twenty Years In The Kitchen \| La Table Marrakech | Set | `/chef` | "Twenty years. One obsession." | Restaurant + Breadcrumb | ✓ |
| `/gallery` | Gallery — La Table Marrakech Private Chef Experiences | Set | `/gallery` | "Gallery" | Restaurant + Breadcrumb | ✓ |
| `/testimonials` | Guest Testimonials — La Table Marrakech | Set | `/testimonials` | "Testimonials" | Restaurant + Breadcrumb + AggregateRating | ✓ NEW |
| `/faq` | Frequently Asked Questions — La Table Marrakech Private Chef | Set | `/faq` | "FAQ" | Restaurant + Breadcrumb + FAQPage | ✓ |
| `/contact` | Reserve A Private Chef In Marrakech — La Table Marrakech | Set | `/contact` | Set | Restaurant + Breadcrumb | ✓ |
| `/private-chef-marrakech` | Private Chef in Marrakech — Luxury Dining at Your Villa or Riad | Set | `/private-chef-marrakech` | "Private Chef in Marrakech" | Restaurant + Breadcrumb + LocalBusiness | ✓ |
| `/romantic-dinner-marrakech` | Romantic Dinner in Marrakech — Private Chef for Two \| La Table Marrakech | Set | `/romantic-dinner-marrakech` | Set | Restaurant + Breadcrumb | ✓ |
| `/villa-chef-marrakech` | Villa Private Chef in Marrakech — Luxury Chef at Your Villa \| La Table Marrakech | Set | `/villa-chef-marrakech` | Set | Restaurant + Breadcrumb | ✓ |
| `/moroccan-cooking-experience` | Moroccan Cooking Class in Marrakech — Private Chef Experience \| La Table Marrakech | Set | `/moroccan-cooking-experience` | Set | Restaurant + Breadcrumb | ✓ |

**Bug fixed:** before this branch, EVERY page had `canonical = https://latablemarrakech.com/` and the homepage description, because the static `index.html` tags were winning over React-emitted ones. `useSEO` now mutates the existing tag in place — exactly one canonical per page, with the right URL.

## Indexing infrastructure

| Item | Status | Notes |
| --- | --- | --- |
| `robots.txt` | ✓ | Allow all, disallow `/admin`, sitemap URL set. |
| `sitemap.xml` | ✓ | 11 URLs, lastmod added 2026-05-17. |
| `<link rel="canonical">` per page | ✓ FIXED | Was broken — see above. |
| HTTPS 301 | ✓ | `.htaccess` `RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI}` |
| SPA fallback to `/index.html` | ✓ | `.htaccess` |
| OG image (1200×630) | ✓ | `/opengraph.jpg` exists. |
| Twitter Card | ✓ | `summary_large_image` |
| Restaurant JSON-LD | ✓ | Global, in `index.html`. |
| Per-page schema | ✓ | BreadcrumbList everywhere, FAQPage on `/faq`, AggregateRating on `/testimonials`, LocalBusiness on `/private-chef-marrakech`. |

## Image SEO

| Check | Status |
| --- | --- |
| All `<img>` have `alt` | ✓ (29/29 on homepage) |
| LCP hero preload | ✓ |
| Below-fold lazy loading | ⚠️ Add `loading="lazy"` to gallery + experience grid images. Not blocking, but improves LCP. |
| Image format | ⚠️ Most images are JPG via Pexels/Unsplash CDNs. They already do format negotiation. No action. |

## Accessibility (SEO-adjacent)

| Check | Status |
| --- | --- |
| `lang="en"` on `<html>` | ✓ |
| `viewport` meta | ✓ but `maximum-scale=1` blocks pinch-zoom. **Recommend** removing `maximum-scale=1` from `index.html` — Google's mobile-friendly test will flag it. |
| Color contrast | Not audited automatically. Run https://wave.webaim.org/ on every page before launch. |
| Skip-to-content link | Missing. Low priority, but nice for screen-reader users. |
| Focus styles | Tailwind defaults — verify keyboard nav works on the Reserve form. |

## International SEO

| Check | Status |
| --- | --- |
| hreflang | Partial — `en` + `x-default` set on `/`. Once a French version exists, add `fr-FR` everywhere and self-reference all hreflang links per Google's docs. |
| Multilingual sitemap | Not needed yet (English-only). |

## Content / keyword strategy

You already have 4 dedicated SEO landing pages targeting strong commercial intent keywords:
- `/private-chef-marrakech` — "private chef Marrakech" (high)
- `/romantic-dinner-marrakech` — "romantic dinner Marrakech" (high)
- `/villa-chef-marrakech` — "villa chef Marrakech" (high)
- `/moroccan-cooking-experience` — "cooking class Marrakech" (medium-high)

**Gaps worth considering** (don't build yet — wait for Search Console data after 4–6 weeks):
- `/riad-private-chef-marrakech`
- `/agafay-desert-dinner-experience`
- `/marrakech-honeymoon-private-dinner`
- `/airbnb-private-chef-marrakech`
- A blog at `/journal/` with content like *"What to Eat in Marrakech: A First-Timer's Guide"* — captures upper-funnel traffic and funnels to /experiences.

## Pre-launch SEO smoke test

After deploying to Hostinger, run through every URL in `sitemap.xml` and check:

1. **View Source** (`Cmd+U`) and look for the right `<title>`, `<meta name="description">`, `<link rel="canonical">`. They should match the route. If they all say "Private Chef in Marrakech | Villa, Riad..." (the homepage values) you've regressed the canonical bug — `useSEO` isn't running.
2. **Visit** https://search.google.com/test/rich-results and paste each page URL. Verify the right schemas are detected (FAQPage on /faq, Breadcrumb everywhere, AggregateRating on /testimonials).
3. **Refresh** `/chef`, `/contact`, `/faq` directly (don't navigate via menu). They should load via SPA fallback in `.htaccess` — not 404. If they 404, `.htaccess` didn't upload to Hostinger.
