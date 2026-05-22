import { getAttributionContext } from "./analytics";

export const WHATSAPP_PHONE = "212721354757";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello La Table Marrakech, I would like to check availability for a private chef in Marrakech. Could you help me with dates, menu options, and pricing?";

function buildPaidClickNote(): string {
  const attribution = getAttributionContext();
  if (!attribution.utm_source && !attribution.utm_medium && !attribution.utm_campaign) {
    return "";
  }

  const lines = [
    "[ad]",
    attribution.utm_source ? `utm_source=${attribution.utm_source}` : "",
    attribution.utm_medium ? `utm_medium=${attribution.utm_medium}` : "",
    attribution.utm_campaign ? `utm_campaign=${attribution.utm_campaign}` : "",
    attribution.utm_term ? `utm_term=${attribution.utm_term}` : "",
    attribution.utm_content ? `utm_content=${attribution.utm_content}` : "",
  ].filter(Boolean);

  return `\n\n${lines.join("\n")}`;
}

export function createWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`${message}${buildPaidClickNote()}`)}`;
}

export function getWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE): string {
  return createWhatsAppUrl(message);
}
