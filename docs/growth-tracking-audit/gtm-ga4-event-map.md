# GTM + GA4 Event Map — La Table Marrakech

Use this once you've created your GTM container and GA4 property. Step-by-step setup is in `next-actions.md`.

## Architecture

```
        ┌─────────────────────────────────────────────┐
        │  Browser (latablemarrakech.com)             │
        │                                             │
        │  src/lib/analytics.ts ──┐                   │
        │  src/lib/seo.ts (useSEO)│── push to         │
        │  Contact form           │   window.dataLayer│
        │                          │                  │
        └──────────────────┬──────────────────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  GTM container  │  ← VITE_GTM_ID
                  │  (recommended)  │
                  └────────┬────────┘
                           │  configures
                           ▼
                  ┌─────────────────┐
                  │  GA4 property   │  ← VITE_GA4_ID
                  └─────────────────┘
                           │
                           ▼  marks as conversion
                  ┌─────────────────┐
                  │  Google Ads     │  imports `generate_lead`
                  │  conversion     │  from GA4
                  └─────────────────┘
```

**Use GTM, not direct gtag.** GTM lets you change tracking without redeploying. Configure GA4 INSIDE the GTM container — don't also inject GA4 directly via `VITE_GA4_ID`. Set `VITE_GTM_ID` only.

## GTM tags to create

### 1. GA4 Configuration tag (the foundation)

- **Tag type:** GA4 Configuration / Google Tag
- **Measurement ID:** `G-XXXXXXXXXX` (your GA4 property)
- **Trigger:** All Pages
- **Configuration parameters:**
  - `send_page_view` → `false` (the site fires its own SPA page_view)

### 2. GA4 Event tags (one per custom event)

| Tag name | Event name | Trigger | Recommended params (map from dataLayer) |
| --- | --- | --- | --- |
| `GA4 — page_view` | `page_view` | Custom Event = `page_view` | `page_path`, `page_title`, `page_location` |
| `GA4 — whatsapp_click` | `whatsapp_click` | Custom Event = `whatsapp_click` | `link_url`, `link_location`, `page_path`, `utm_source`, `utm_medium`, `utm_campaign`, `gclid` |
| `GA4 — generate_lead` ⭐ | `generate_lead` | Custom Event = `generate_lead` | `method`, `value`, `currency`, `link_location`, `utm_source`, `utm_medium`, `utm_campaign`, `gclid` |
| `GA4 — phone_click` | `phone_click` | Custom Event = `phone_click` | `link_url`, `link_location`, `page_path` |
| `GA4 — email_click` | `email_click` | Custom Event = `email_click` | `link_url`, `link_location`, `page_path` |
| `GA4 — cta_click` | `cta_click` | Custom Event = `cta_click` | `cta_name`, `cta_location`, `page_path` |
| `GA4 — form_submit` | `form_submit` | Custom Event = `form_submit` | `form_name`, `experience_type`, `guests`, `country`, `utm_source`, `utm_medium`, `utm_campaign`, `gclid` |
| `GA4 — scroll` | `scroll` | Custom Event = `scroll` | `percent_scrolled`, `page_path` |

⭐ = mark as conversion in GA4.

### 3. Triggers

Each trigger is `Custom Event` with the matching event name (regex off). Example for `generate_lead`:

- **Trigger type:** Custom Event
- **Event name:** `generate_lead`
- **This trigger fires on:** All Custom Events

### 4. Variables (Data Layer Variables)

Create one DLV per parameter you want to forward. GTM names → dataLayer keys:

| Variable name (GTM) | Data Layer Variable Name |
| --- | --- |
| `dlv.link_url` | `link_url` |
| `dlv.link_location` | `link_location` |
| `dlv.page_path` | `page_path` |
| `dlv.page_title` | `page_title` |
| `dlv.page_location` | `page_location` |
| `dlv.cta_name` | `cta_name` |
| `dlv.cta_location` | `cta_location` |
| `dlv.form_name` | `form_name` |
| `dlv.experience_type` | `experience_type` |
| `dlv.guests` | `guests` |
| `dlv.country` | `country` |
| `dlv.method` | `method` |
| `dlv.value` | `value` |
| `dlv.currency` | `currency` |
| `dlv.percent_scrolled` | `percent_scrolled` |
| `dlv.utm_source` | `utm_source` |
| `dlv.utm_medium` | `utm_medium` |
| `dlv.utm_campaign` | `utm_campaign` |
| `dlv.utm_content` | `utm_content` |
| `dlv.utm_term` | `utm_term` |
| `dlv.gclid` | `gclid` |
| `dlv.fbclid` | `fbclid` |

## GA4 Custom Definitions

In **GA4 → Admin → Custom definitions → Custom dimensions**, register the params you want to filter/segment by (max 50 free):

| Dimension name | Scope | Event parameter |
| --- | --- | --- |
| WhatsApp link location | Event | `link_location` |
| CTA name | Event | `cta_name` |
| Form name | Event | `form_name` |
| Experience type | Event | `experience_type` |
| Guests | Event | `guests` |
| Country (form) | Event | `country` |
| Method | Event | `method` |
| UTM source | Event | `utm_source` |
| UTM medium | Event | `utm_medium` |
| UTM campaign | Event | `utm_campaign` |
| GCLID | Event | `gclid` |

**Tip:** Register only the ones you'll actually use in reports. You can always add more later.

## GA4 Conversions

**GA4 → Admin → Events → Mark as conversion** (or "Mark as key event" in newer UI):

1. `generate_lead` ⭐ — your primary conversion. Used by Google Ads.
2. `form_submit` — secondary (already triggers `generate_lead` but useful as its own dimension).

**Do not mark** `whatsapp_click` as a conversion separately — it always co-fires `generate_lead` (which is the conversion event). Marking both = double counting.

## Verification (after publishing GTM)

1. Open https://latablemarrakech.com/?utm_source=test&utm_medium=manual&utm_campaign=audit
2. Open Chrome DevTools → Network → filter "google" or "g/collect" — should see GA4 hits.
3. Click the hero WhatsApp button.
4. In GA4: **Reports → Realtime** — should see `page_view`, `whatsapp_click`, `generate_lead` events appearing in seconds.
5. In **GTM → Preview mode** — confirm tags fire on each event.

## Common gotchas

- **Double page_view.** Happens if you forgot `send_page_view: false` on the GA4 Configuration tag AND have a separate GA4 event tag for `page_view`. Pick one — the site's own `page_view` is more accurate for SPA routes.
- **Events show up in dataLayer but not in GA4.** GTM workspace not published yet. Click **Submit → Publish** in GTM.
- **No UTM data.** User landed on the site without UTMs, or sessionStorage is disabled (rare). Check by manually setting `sessionStorage.ltm_utm_v1` to a JSON object with `utm_source`.
- **Multiple `whatsapp_click` per click.** Likely event listener was attached twice. `initAnalytics` is idempotent (uses `window.__ltmAnalyticsReady`), so this only happens if you have a separate GTM-side click listener too. Remove the GTM one.
