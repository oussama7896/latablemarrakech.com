// Global event tracker for La Table Marrakech.
//
// Pushes events to dataLayer (for GTM) and gtag (for GA4 direct).
// Both work even if GTM/GA4 aren't installed yet — dataLayer queues, gtag
// is a no-op stub from index.html.
//
// Events emitted:
//   - page_view       (SPA route change, fired by useSEO in lib/seo.ts)
//   - whatsapp_click  (any link to wa.me / whatsapp.com / api.whatsapp.com)
//   - booking_submit  (successful booking/contact form submission)
//   - generate_lead   (companion conversion event for booking_submit)
//   - phone_click     (any tel: link)
//   - email_click     (any mailto: link)
//   - cta_click       (any element with data-cta="...")
//   - form_submit     (legacy helper, not used by the booking form)
//   - scroll          (25/50/75/100% milestones per page)
//
// UTM source/medium/campaign captured on landing are attached to every
// whatsapp_click and generate_lead so we keep paid-traffic attribution
// even when the user leaves the site through WhatsApp.
//
// Initialised once from main.tsx.

type DataLayerEvent = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
    gtag?: (...args: unknown[]) => void;
    __ltmAnalyticsReady?: boolean;
    __ltmGa4?: string;
    __ltmGtm?: string;
  }
}

const WHATSAPP_HOSTS = new Set([
  "wa.me",
  "api.whatsapp.com",
  "web.whatsapp.com",
]);

const STORED_UTM_KEY = "ltm_utm_v1";
const DEBUG_TRACKING_KEY = "ltm_debug_tracking";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;
const EMPTY_UTM_PARAMS = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
};

export type AttributionContext = Record<string, string>;

let lastPageViewKey = "";
let lastBookingSubmitKey = "";
const whatsappClickTimes = new WeakMap<HTMLAnchorElement, number>();

function getElementLabel(el: HTMLElement): string {
  return (
    el.dataset.ctaLabel ||
    el.dataset.cta ||
    el.dataset.testid ||
    el.getAttribute("aria-label") ||
    el.textContent?.trim().slice(0, 60) ||
    "unlabeled"
  );
}

function getElementPosition(el: HTMLElement): string {
  return (
    el.dataset.ctaPosition ||
    el.dataset.position ||
    el.dataset.location ||
    el.closest<HTMLElement>("[data-cta-position]")?.dataset.ctaPosition ||
    el.closest<HTMLElement>("footer")?.tagName.toLowerCase() ||
    el.closest<HTMLElement>("header,nav,main,section")?.tagName.toLowerCase() ||
    "unknown"
  );
}

function getDeviceType(): "mobile" | "tablet" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia("(max-width: 767px)").matches) return "mobile";
  if (window.matchMedia("(max-width: 1023px)").matches) return "tablet";
  return "desktop";
}

function findAnchor(
  target: EventTarget | null,
  selector: string,
): HTMLAnchorElement | null {
  if (!(target instanceof Element)) return null;
  return target.closest(selector) as HTMLAnchorElement | null;
}

function pushEvent(eventName: string, params: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
  if (window.__ltmGa4 && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
  debugTracking(`${eventName} fired`, params);
}

function getUtmContext(): Record<string, string> {
  const attribution = getAttributionContext();
  return {
    utm_source: attribution.utm_source || "",
    utm_medium: attribution.utm_medium || "",
    utm_campaign: attribution.utm_campaign || "",
    utm_term: attribution.utm_term || "",
    utm_content: attribution.utm_content || "",
  };
}

/* ── UTM capture / persistence ──────────────────────────────────────── */

function isDebugTrackingEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get("debug_tracking") === "true") {
      sessionStorage.setItem(DEBUG_TRACKING_KEY, "true");
      return true;
    }
    return sessionStorage.getItem(DEBUG_TRACKING_KEY) === "true";
  } catch {
    return false;
  }
}

export function debugTracking(message: string, details?: unknown): void {
  if (!isDebugTrackingEnabled()) return;
  // eslint-disable-next-line no-console
  console.info(`[tracking] ${message}`, details ?? "");
}

function captureUtms(): void {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    const utm: Record<string, string> = {};
    for (const k of UTM_KEYS) {
      const v = url.searchParams.get(k);
      if (v) utm[k] = v;
    }
    if (Object.keys(utm).length === 0) return;
    sessionStorage.setItem(
      STORED_UTM_KEY,
      JSON.stringify({
        ...utm,
        landing_page: url.pathname,
        landing_page_url: url.href,
        referrer: document.referrer || "",
        captured_at: new Date().toISOString(),
        first_visit_timestamp: new Date().toISOString(),
      }),
    );
    debugTracking("UTM captured", {
      ...utm,
      landing_page: url.pathname,
      referrer: document.referrer || "",
    });
  } catch {
    /* sessionStorage / URL parsing failed — silent */
  }
}

export function getAttributionContext(): AttributionContext {
  if (typeof window === "undefined") return { ...EMPTY_UTM_PARAMS };
  try {
    const raw = sessionStorage.getItem(STORED_UTM_KEY);
    if (!raw) return { ...EMPTY_UTM_PARAMS };
    const parsed = JSON.parse(raw) as Record<string, string>;
    const out: Record<string, string> = { ...EMPTY_UTM_PARAMS };
    for (const k of UTM_KEYS) if (parsed[k]) out[k] = parsed[k];
    for (const k of [
      "landing_page",
      "landing_page_url",
      "referrer",
      "captured_at",
      "first_visit_timestamp",
    ]) {
      if (parsed[k]) out[k] = parsed[k];
    }
    return out;
  } catch {
    return { ...EMPTY_UTM_PARAMS };
  }
}

function getStoredUtms(): Record<string, string> {
  return getUtmContext();
}

/* ── Click handlers ─────────────────────────────────────────────────── */

function isWhatsAppHref(href: string): boolean {
  try {
    return WHATSAPP_HOSTS.has(new URL(href, window.location.href).host);
  } catch {
    return false;
  }
}

function handleClick(event: MouseEvent): void {
  if (!(event.target instanceof Element)) return;

  // 1) WhatsApp links (any host in WHATSAPP_HOSTS)
  const anyAnchor = findAnchor(event.target, "a[href]");
  if (anyAnchor && isWhatsAppHref(anyAnchor.href)) {
    const now = Date.now();
    const previous = whatsappClickTimes.get(anyAnchor) || 0;
    if (now - previous < 1500) {
      debugTracking("duplicate whatsapp_click suppressed", {
        cta_label: getElementLabel(anyAnchor),
        href: anyAnchor.href,
      });
      return;
    }
    whatsappClickTimes.set(anyAnchor, now);

    const utm = getStoredUtms();
    const ctaLabel = getElementLabel(anyAnchor);
    const ctaPosition = getElementPosition(anyAnchor);
    const payload = {
      link_url: anyAnchor.href,
      link_location: ctaPosition,
      link_type: "whatsapp",
      page_path: window.location.pathname,
      page_title: document.title,
      cta_label: ctaLabel,
      cta_position: ctaPosition,
      whatsapp_number: "212721354757",
      device: getDeviceType(),
      ...utm,
    };
    pushEvent("whatsapp_click", payload);
    return;
  }

  // 2) Phone (tel:) links
  const tel = findAnchor(event.target, "a[href^='tel:']");
  if (tel) {
    const ctaPosition = getElementPosition(tel);
    const payload = {
      link_url: tel.href,
      link_location: getElementLabel(tel),
      cta_position: ctaPosition,
      link_type: "phone",
      page_path: window.location.pathname,
      device: getDeviceType(),
    };
    pushEvent("phone_click", payload);
    pushEvent("link_click", payload);
    return;
  }

  // 3) Email (mailto:) links
  const mail = findAnchor(event.target, "a[href^='mailto:']");
  if (mail) {
    const ctaPosition = getElementPosition(mail);
    const payload = {
      link_url: mail.href,
      link_location: getElementLabel(mail),
      cta_position: ctaPosition,
      link_type: "email",
      page_path: window.location.pathname,
      device: getDeviceType(),
    };
    pushEvent("email_click", payload);
    pushEvent("link_click", payload);
    return;
  }

  // 4) CTA buttons (anything with data-cta="…")
  const cta = (event.target as Element).closest(
    "[data-cta]",
  ) as HTMLElement | null;
  if (cta) {
    pushEvent("cta_click", {
      cta_name: cta.dataset.cta,
      cta_location: cta.dataset.location || getElementPosition(cta),
      cta_label: getElementLabel(cta),
      cta_position: getElementPosition(cta),
      device: getDeviceType(),
      page_path: window.location.pathname,
    });
  }
}

/* ── Scroll milestone tracking (per page) ──────────────────────────── */

let scrollMilestonesHit = new Set<number>();
let lastScrollPath = "";

function handleScroll(): void {
  if (window.location.pathname !== lastScrollPath) {
    scrollMilestonesHit = new Set();
    lastScrollPath = window.location.pathname;
  }
  const h = document.documentElement;
  const total = h.scrollHeight - h.clientHeight;
  if (total <= 0) return;
  const pct = Math.round((h.scrollTop / total) * 100);
  for (const m of [25, 50, 75, 100]) {
    if (pct >= m && !scrollMilestonesHit.has(m)) {
      scrollMilestonesHit.add(m);
      const payload = {
        // Both names supplied so any GTM trigger (legacy or audit-defined) fires.
        percent_scrolled: m,
        scroll_depth: m,
        scroll_threshold: m,
        page_path: window.location.pathname,
      };
      pushEvent("scroll", payload);
      // Matches the existing GTM "GA4 Event — scroll_depth" tag
      pushEvent("scroll_depth", payload);
    }
  }
}

export function resetScrollMilestones(): void {
  scrollMilestonesHit = new Set();
}

/* ── Public API for components ─────────────────────────────────────── */

/**
 * Call from form submit handlers to fire a form_submit event.
 * Example: trackFormSubmit("reservation", { experience: "romantic_dinner", guests: 4 })
 */
export function trackFormSubmit(
  formName: string,
  details: Record<string, unknown> = {},
): void {
  const utm = getStoredUtms();
  pushEvent("form_submit", {
    form_name: formName,
    page_path: window.location.pathname,
    page_title: document.title,
    ...utm,
    ...details,
  });
}

export function trackBookingSubmit(
  formName: string,
  details: Record<string, unknown> = {},
): void {
  const utm = getStoredUtms();
  const payload = {
    form_name: formName,
    page_path: window.location.pathname,
    page_title: document.title,
    ...utm,
    ...details,
  };
  const dedupeKey = JSON.stringify(payload);
  if (dedupeKey === lastBookingSubmitKey) {
    debugTracking("duplicate booking_submit suppressed", payload);
    return;
  }
  lastBookingSubmitKey = dedupeKey;

  pushEvent("booking_submit", payload);
  pushEvent("generate_lead", {
    method: "booking_form",
    value: 1,
    currency: "EUR",
    ...payload,
  });
}

/**
 * Fire a page_view event for SPA route changes. Called by useSEO().
 */
export function trackPageView(path: string, title: string): void {
  const utm = getStoredUtms();
  const pageViewKey = `${path}|${title}|${window.location.href}`;
  if (pageViewKey === lastPageViewKey) {
    debugTracking("duplicate page_view suppressed", {
      page_path: path,
      page_title: title,
    });
    return;
  }
  lastPageViewKey = pageViewKey;

  pushEvent("page_view", {
    page_path: path,
    page_title: title,
    ...utm,
  });
}

/* ── Initialiser ───────────────────────────────────────────────────── */

export function initAnalytics(): void {
  if (typeof window === "undefined") return;
  if (window.__ltmAnalyticsReady) return; // idempotent
  window.__ltmAnalyticsReady = true;

  isDebugTrackingEnabled();
  captureUtms();
  const context = getAttributionContext();
  debugTracking("stored tracking context", context);
  debugTracking("analytics initialized", {
    page_path: window.location.pathname,
    has_gtm: Boolean(window.__ltmGtm),
    has_ga4_direct: Boolean(window.__ltmGa4),
  });

  document.addEventListener("click", handleClick, {
    capture: true,
    passive: true,
  });

  window.addEventListener("scroll", handleScroll, { passive: true });
  lastScrollPath = window.location.pathname;
}

/**
 * Backwards-compatible export — main.tsx used to call this name.
 */
export function initWhatsAppTracking(): void {
  initAnalytics();
}
