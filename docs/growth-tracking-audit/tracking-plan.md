# Tracking Plan — La Table Marrakech

The single source of truth for **every event the site emits** and **what each one means for the business**.

## Primary conversion

| Event | Meaning | Where it fires |
| --- | --- | --- |
| `whatsapp_click` | A visitor clicked a WhatsApp CTA — the main lead signal. | Any `<a>` whose host is `wa.me`, `api.whatsapp.com`, or `web.whatsapp.com`. Captured globally in `src/lib/analytics.ts`. |
| `generate_lead` | Fires alongside `whatsapp_click` and `form_submit`. Use this as the GA4 conversion / Google Ads conversion. | Same as above + reservation form submit. Carries `method: "whatsapp"` or `"form"`. |

**This is the event to mark as the primary conversion in GA4** (Admin → Events → Mark as conversion → `generate_lead`).

## Secondary engagement events

| Event | When | Use for |
| --- | --- | --- |
| `page_view` | Every SPA route change (fired by `useSEO` hook). | Funnel reports, landing-page-to-conversion rate. |
| `phone_click` | Any `tel:` link click. | Phone-call lead signal (secondary to WhatsApp). |
| `email_click` | Any `mailto:` link click. | Email lead signal. |
| `cta_click` | Any element with `data-cta="..."` attribute clicked. | Test which buttons / placements convert best. Add `data-cta` to any new button you want to track. |
| `form_submit` | Reservation form submit on `/contact`. | Form-to-WhatsApp funnel. |
| `scroll` | 25 / 50 / 75 / 100% scroll depth (per route). | Engagement, identify pages where users bounce vs. read. |

## Event parameters (what each event carries)

Every event includes:
- `page_path` — current URL path (e.g. `/chef`)

WhatsApp + form events additionally include captured UTM params from the session:
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- `gclid` (Google Ads click ID — required for offline conversion import)
- `fbclid` (Facebook click ID — if you ever run Meta ads)

Click events carry:
- `link_url` — the destination (only for link clicks)
- `link_location` — derived from `data-cta`, `data-testid`, `aria-label`, or text content (whichever exists first). This is what tells you WHICH button was clicked, not just THAT a button was clicked.

`generate_lead` additionally carries:
- `method` — `"whatsapp"` or `"form"`
- `value: 1`
- `currency: "EUR"` — adjust if you switch to MAD/USD pricing in Ads.

`form_submit` additionally carries:
- `form_name` — `"reservation"`
- `experience_type` — e.g. `"romantic_dinner"`
- `guests` — number
- `country` — visitor-provided country

`scroll` additionally carries:
- `percent_scrolled` — 25 | 50 | 75 | 100

## Attribution rules

1. **UTM capture is session-scoped.** First touch wins for the session. Cleared when the browser tab closes.
2. **Every WhatsApp lead carries its UTM** even though the user leaves the site. This lets you reconstruct attribution in GA4 by `utm_source` / `utm_medium`.
3. **gclid is preserved** for Google Ads offline conversion uploads. If you ever import WhatsApp-to-booking conversions back into Google Ads, you'll have the gclid to match on.

## What you should add manually in GTM

Once GTM is installed (see `gtm-ga4-event-map.md`):

1. **GA4 Configuration tag** — `G-XXXXXXXXXX`, fires on All Pages. Set `send_page_view: false` (we send our own SPA page_views).
2. **GA4 Event tags** — one per event listed above, mapping the dataLayer fields to GA4 event parameters.
3. **Triggers** — Custom Event triggers matching each event name.

## What you should NOT do

- ❌ Don't install GA4 directly via gtag.js if you've set `VITE_GTM_ID`. Pick one.
- ❌ Don't add a duplicate WhatsApp click trigger in GTM — the site already pushes `whatsapp_click` to `dataLayer`. GTM just needs a Custom Event trigger that listens for it.
- ❌ Don't track form_submit AND a redirect-to-WhatsApp click as separate conversions on the same submit — that's double-counting. The Contact form fires `form_submit` THEN opens wa.me (which also fires `whatsapp_click`). Mark only `generate_lead` as the conversion to dedupe.

## Adding new buttons you want tracked

Add a `data-cta="my-button-name"` attribute. Done. No code changes needed.

```tsx
<Link href="/contact" data-cta="hero-reserve">Reserve Your Chef</Link>
```

`cta_click` will fire on every click with `cta_name: "hero-reserve"`.
