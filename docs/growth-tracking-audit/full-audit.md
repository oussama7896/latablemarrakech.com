# Growth Tracking Audit — latablemarrakech.com

**Audit date:** 2026-05-17
**Audited by:** Cowork (senior growth engineer mode)
**Live site:** https://latablemarrakech.com/
**Repo:** `/Users/oussamalaroussi/Desktop/latablemarrakech.com`
**Branch created for this audit:** `growth-tracking-audit-2026-05-17`

---

## TL;DR

The site is a well-built Vite + React 19 SPA with strong SEO fundamentals (schema, alt text, OG tags, sitemap, robots, .htaccess, HTTPS, SPA fallback). But the **tracking layer is empty on the live site** — no GTM, no GA4, no Google Search Console, no Google Ads were found in your Google account, and the `<title>`/`<meta>`/`<link rel="canonical">` set per page were being overridden by the static homepage values in `index.html` (so every page on the live site was canonicalising to `/`). That alone is a major silent SEO bug.

This audit corrects the on-site issues in code and gives you a clear manual setup runbook for everything that lives outside the repo (GA4 property, GTM container, Search Console verification, Google Ads).

---

## What I checked

### Repo (code)
- `package.json`, `vite.config.ts`, `tsconfig.json` — stack + build
- `vercel.json`, `scripts/deploy-hostinger.{sh,py}`, `.env.deploy.example`, `public/.htaccess` — deployment
- `artifacts/la-table-marrakech/index.html` — base HTML, OG tags, tracking stubs, schema
- `public/sitemap.xml`, `public/robots.txt` — SEO indexing
- All 7 main pages + 4 SEO landing pages under `src/pages/`
- `src/lib/analytics.ts` — WhatsApp click tracking
- `src/App.tsx`, `src/main.tsx` — routing, init order
- `src/components/layout/Navbar.tsx`, `Footer.tsx` — site-wide CTAs

### Live site (via Chrome)
- HTML head on `/`, `/chef`, `/faq`, `/private-chef-marrakech`
- `window.dataLayer`, `window.gtag`, `window.google_tag_manager` presence
- Loaded scripts (none from Google / GTM / GA found)
- H1 count, H2 count, image alt coverage, WhatsApp link count
- JSON-LD schema presence per route
- Live whatsapp_click event firing test (✓ working)

### Google accounts (via Chrome)
- Google Tag Manager: signed in, **0 accounts/containers**
- Google Analytics 4: blocked from automated check (domain restricted)
- Google Search Console: blocked from automated check (domain restricted)
- Google Ads: blocked from automated check (domain restricted)

Where browser automation couldn't access a Google property, the assumption is "not yet set up" because (a) GTM is empty for the same Google account, and (b) the live site has no GA4 / Ads tag installed.

---

## What's working

| Area | Status |
| --- | --- |
| Stack & build | ✓ Vite 7, React 19, TypeScript 5.9, npm workspaces |
| SPA routing | ✓ wouter, with `.htaccess` rewrite fallback and Vercel rewrites |
| Title tags | ✓ Unique per route (now correctly hoisted via `useSEO`) |
| H1 hierarchy | ✓ 1 H1 per page, sensible H2 nesting |
| Alt text | ✓ 29/29 images on homepage have alt text |
| Robots.txt | ✓ Allow all, disallow /admin, sitemap link present |
| Sitemap | ✓ 11 URLs (now with lastmod) |
| Restaurant JSON-LD | ✓ Global, in `index.html` |
| FAQPage JSON-LD | ✓ On `/faq` |
| LocalBusiness JSON-LD | ✓ On `/private-chef-marrakech` |
| Open Graph + Twitter Card | ✓ Set with proper og:image (1200×630) |
| HTTPS redirect | ✓ `.htaccess` 301 |
| Asset cache headers | ✓ 1-year immutable for hashed assets |
| Security headers | ✓ X-Content-Type-Options, Referrer-Policy, Permissions-Policy |
| WhatsApp click tracking | ✓ Live test confirmed `whatsapp_click` + `generate_lead` push to dataLayer |
| Mobile viewport | ✓ Correct meta viewport (with max-scale=1, see notes) |
| LCP image preload | ✓ Hero preload + srcset |
| Font loading | ✓ Non-blocking via preload+onload swap |

---

## What is broken / missing

### 🔴 Critical — fix-first

1. **No GA4, no GTM, no live tracking.** The stubs in `index.html` push to `dataLayer` but no Google service is collecting them. Whatsapp_click fires into the void. **Fix:** create GA4 + GTM (next-actions.md step 1–3) and set `VITE_GTM_ID` (and/or `VITE_GA4_ID`) in `.env.local`.

2. **Per-page canonicals were all `/` on the live site.** Every route was self-canonicalising to home, which actively suppresses indexing of `/chef`, `/faq`, all 4 SEO landing pages, etc. Even though the React component emitted a `<link rel="canonical">`, the static one from `index.html` won the `document.querySelector` lookup that Googlebot uses.
   **Fix applied:** new `useSEO` hook in `src/lib/seo.ts` mutates the existing tag in place. Now exactly one canonical per route, set to the right URL.

3. **Per-page meta descriptions were all the homepage description.** Same root cause as canonical. **Fix applied:** same hook.

4. **No SPA `page_view` events.** wouter route changes don't trigger gtag's auto page_view. Without this, GA4 would see only 1 page_view per session.
   **Fix applied:** `useSEO` fires `page_view` on every route change via `trackPageView`.

5. **No phone / email / form / CTA / scroll tracking.** Only WhatsApp was tracked.
   **Fix applied:** `src/lib/analytics.ts` now emits `phone_click`, `email_click`, `cta_click`, `form_submit`, and 25/50/75/100% `scroll` events.

6. **No UTM attribution for WhatsApp leads.** Once a user clicks `wa.me/…`, they leave the site — and GA4 loses all referral context. Paid traffic from Google Ads couldn't be attributed.
   **Fix applied:** `initAnalytics` captures UTM params (utm_source/medium/campaign/content/term + gclid + fbclid) on landing into `sessionStorage`, and every `whatsapp_click` / `generate_lead` / `form_submit` event includes them.

7. **No Google Search Console verified.** You cannot see what queries you're ranking for. **Fix:** see `search-console-checklist.md`.

### 🟡 Important

8. **Sitemap had no `<lastmod>`.** Search engines re-crawl pages with fresh lastmod faster. **Fix applied:** added `<lastmod>2026-05-17</lastmod>` to every URL.

9. **No hreflang declarations.** Site is English-only today but if you ever add French (your chef speaks French, and the homepage describes English-or-French replies), Google needs to know. **Fix applied:** added `<link rel="alternate" hreflang="en">` + `x-default` on the root in `index.html` and in `sitemap.xml` for `/`.

10. **No BreadcrumbList schema.** Helps Google show site structure in SERPs. **Fix applied:** every page now emits a BreadcrumbList via `useSEO`.

11. **No Review / AggregateRating schema** on `/testimonials` despite 15+ glowing reviews. **Fix applied:** `reviewAggregateSchema` injected on `/testimonials`.

12. **Tracking IDs were hardcoded as TODO comments in `index.html`.** Easy to accidentally commit real IDs. **Fix applied:** moved to build-time env vars (`VITE_GTM_ID`, `VITE_GA4_ID`), with conditional script injection in `index.html`. `.env.example` added.

13. **`maximum-scale=1` on viewport.** This blocks user-pinch-zoom on mobile, which is a WCAG accessibility issue Google may penalise. Consider removing — see `seo-checklist.md`.

### 🟢 Nice to have

14. **`Admin.tsx` has typecheck errors** (`framer-motion` `linear` import, untyped params). Not in the routing (App.tsx doesn't import it), but it pollutes `npm run typecheck`. Either delete the file or fix the imports — non-blocking for production.

15. **Two competing deploy paths** (Vercel + Hostinger). Repo has `vercel.json` AND `scripts/deploy-hostinger.{sh,py}`. You confirmed Hostinger is live. Recommend removing `vercel.json` to remove ambiguity. See `hostinger-deployment-plan.md`.

16. **`C1682.MP4` (67 MB)** lives in the repo root. Not in `.gitignore`. If this got committed historically, it's bloating `git clone`. Consider `git lfs` or move to a CDN.

17. **No image lazy-loading discipline.** 29 images on homepage all eagerly loaded. Add `loading="lazy"` for everything below the fold and `fetchpriority="high"` only for the LCP image (already done correctly for the hero).

---

## What I fixed in this branch

| File | Change |
| --- | --- |
| `src/lib/seo.ts` | **NEW.** `useSEO` hook (mutates head in place, fires SPA page_view). Helpers for breadcrumb, FAQ, AggregateRating schema. |
| `src/lib/analytics.ts` | **REWRITTEN.** Adds phone/email/CTA/form/scroll/page_view events + UTM capture & passthrough. Backwards-compatible exports. |
| `src/main.tsx` | Calls `initAnalytics()` instead of `initWhatsAppTracking()` (same function, clearer name). |
| `artifacts/la-table-marrakech/index.html` | Env-driven GTM/GA4 install (reads `VITE_GTM_ID` / `VITE_GA4_ID` at build). GTM noscript fallback injected from JS. hreflang en + x-default. |
| `public/sitemap.xml` | Added `<lastmod>` to every URL, hreflang on home. |
| `.env.example` | **NEW.** Documents `VITE_GTM_ID`, `VITE_GA4_ID`. |
| `src/pages/Home.tsx` | Replaced inline `<title>/<meta>/<link>` with `useSEO(...)` + breadcrumb schema. |
| `src/pages/Experiences.tsx` | Same. |
| `src/pages/Chef.tsx` | Same. |
| `src/pages/Gallery.tsx` | Same. |
| `src/pages/Testimonials.tsx` | Same + AggregateRating schema from real testimonials. |
| `src/pages/FAQ.tsx` | Same + FAQ schema via helper (cleaner than inline). |
| `src/pages/Contact.tsx` | Same + `trackFormSubmit("reservation", …)` fires before opening wa.me. |
| `src/pages/SEO/*.tsx` (×4) | Same. SEO landing pages now have unique canonical, description, breadcrumb. |

---

## What still needs manual setup (you)

These cannot be done from the repo. Each has a dedicated checklist in this folder.

1. **Create GA4 property** — `search-console-checklist.md` step 1, `gtm-ga4-event-map.md` for which events to mark as conversions.
2. **Create GTM container** + paste GTM-XXXXXXX into `.env.local` — `gtm-ga4-event-map.md`.
3. **Verify Search Console** — `search-console-checklist.md`.
4. **Set up Google Ads conversion actions** — `google-ads-checklist.md`.
5. **Build + deploy** to Hostinger — `hostinger-deployment-plan.md`.

See `next-actions.md` for the ordered, time-boxed sequence.

---

## Methodology notes

- Live whatsapp_click test: programmatically dispatched a click on the hero WhatsApp link, captured the dataLayer push. Confirmed `whatsapp_click` and `generate_lead` events both fire correctly.
- Canonical bug confirmed by navigating to `/chef`, `/faq`, `/private-chef-marrakech` and inspecting `document.querySelector('link[rel=canonical]').href` — all returned `https://latablemarrakech.com/` despite each component emitting a different canonical via JSX.
- Tracking install check: queried `window.google_tag_manager`, scanned all `<script src>` for any google/gtm/gtag/analytics/tagmanager URL. Result: 0.
