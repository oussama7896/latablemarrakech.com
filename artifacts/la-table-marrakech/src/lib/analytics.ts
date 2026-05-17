// Global click tracker for WhatsApp CTAs.
//
// Fires a `whatsapp_click` event to dataLayer (for GTM) and a `generate_lead`
// event via gtag (for GA4). Both work even if GTM/GA4 aren't installed yet —
// dataLayer queues the event and gtag is a no-op stub from index.html.
//
// Initialised once from main.tsx so every <a href="https://wa.me/...">
// across every page gets tracked without touching component code.

type DataLayerEvent = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
    gtag?: (...args: unknown[]) => void;
  }
}

const WHATSAPP_HOSTS = new Set(["wa.me", "api.whatsapp.com", "web.whatsapp.com"]);

function isWhatsAppLink(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof Element)) return null;
  const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
  if (!anchor) return null;
  try {
    const url = new URL(anchor.href, window.location.href);
    return WHATSAPP_HOSTS.has(url.host) ? anchor : null;
  } catch {
    return null;
  }
}

function locationLabel(anchor: HTMLAnchorElement): string {
  return (
    anchor.dataset.testid ||
    anchor.getAttribute("aria-label") ||
    anchor.textContent?.trim().slice(0, 60) ||
    "unlabeled"
  );
}

export function initWhatsAppTracking(): void {
  if (typeof window === "undefined") return;
  document.addEventListener(
    "click",
    (event) => {
      const anchor = isWhatsAppLink(event.target);
      if (!anchor) return;
      const payload = {
        event: "whatsapp_click",
        link_url: anchor.href,
        link_location: locationLabel(anchor),
        page_path: window.location.pathname,
      };
      window.dataLayer.push(payload);
      if (typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          method: "whatsapp",
          link_location: payload.link_location,
        });
      }
    },
    { capture: true, passive: true },
  );
}
