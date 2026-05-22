# Search Console Checklist — La Table Marrakech

Status: **not yet verified** for `latablemarrakech.com`. Without GSC you are flying blind on what queries you rank for. Setting this up is a 10-minute job and pays back immediately.

## Setup

### 1. Add the property

1. Visit https://search.google.com/search-console
2. Click **Add property** → pick **URL prefix**
3. Enter `https://latablemarrakech.com/` (with the trailing slash and HTTPS)

### 2. Verify ownership

Pick **one** of these methods. The HTML file is the easiest given your repo structure:

**Option A — HTML file (recommended)**
1. Download the `google[hash].html` verification file from Search Console.
2. Drop it into `artifacts/la-table-marrakech/public/` so the build emits it at the root of `dist/public`.
3. Commit + deploy.
4. Click **Verify** in Search Console.

**Option B — HTML tag**
1. Copy the `<meta name="google-site-verification" content="...">` tag.
2. Paste it into `artifacts/la-table-marrakech/index.html` just below the `<meta name="theme-color">`.
3. Deploy → click Verify.

**Option C — DNS TXT record**
1. Add the TXT record in Hostinger's DNS panel (hPanel → Domains → DNS).
2. Wait 10–30 min for propagation → click Verify.

### 3. Submit sitemap

1. **Sitemaps** in the left nav
2. Enter `sitemap.xml` → **Submit**
3. Should report "Success" within 5 minutes with 11 discovered URLs.

### 4. Add the alternative property formats

Add THREE more properties so reports work no matter how Google logs the URL:
- `https://www.latablemarrakech.com/`
- Domain property: `latablemarrakech.com` (DNS-verified, covers all subdomains and protocols — recommended once you have time for DNS verification)

Then go to **Settings → Domain property** as your primary view.

## Weekly review checklist (5 minutes)

In **Performance → Search Results**, set the date range to **Last 28 days vs. Previous 28 days**:

| What to check | Where | What to do |
| --- | --- | --- |
| Total clicks trend | Top chart | Should be growing weekly |
| Top queries | Queries tab | Note any branded vs. non-branded mix change |
| Top pages | Pages tab | Confirm SEO landing pages (`/private-chef-marrakech`, etc.) appear |
| Pages with high impressions but low CTR | Sort Pages by impressions DESC, look for CTR < 2% | Rewrite the title + meta description |
| Keywords at position 4–20 | Queries sorted by position ascending, filter > 4 < 20 | These are the "easy wins" — write a paragraph on the most relevant page that targets the exact phrase |
| Mobile usability errors | Page experience | Fix any flagged URLs |
| Coverage / Indexing errors | Indexing → Pages | Investigate any "Not indexed" status reasons |
| Core Web Vitals | Page experience | Aim for "Good" on LCP, INP, CLS for mobile |

## Easy-win queries (likely worth chasing in 2026)

Based on the SEO landing pages already in your sitemap, these are likely keyword targets:

| Query | Page | Tactic |
| --- | --- | --- |
| `private chef Marrakech` | `/private-chef-marrakech` | Already targeted. Watch position weekly. |
| `private chef Marrakech villa` | `/villa-chef-marrakech` | Add an FAQ block to this page with the literal phrase. |
| `chef privé Marrakech` (French) | NEW page needed | French version of the homepage. Lots of Moroccan / French residents search in French. |
| `romantic dinner Marrakech for couples` | `/romantic-dinner-marrakech` | Already targeted. Add testimonials FROM couples. |
| `Marrakech cooking class` | `/moroccan-cooking-experience` | Strong intent. Make sure the H1 contains "Marrakech cooking class" verbatim. |
| `Agafay desert dinner` | NEW landing page worth building | Capture this — high commercial intent, low competition. |
| `Marrakech Airbnb chef` | NEW (or add section to /villa-chef-marrakech) | Trending search. |
| `riad private dinner Marrakech` | NEW landing page | Highly qualified — riad guests have budget. |

**Decision rule for new landing pages:** wait until you have 4 weeks of GSC data, then build pages for queries where you already get impressions but no clicks (your page is being SHOWN but not chosen).

## Indexing checks for the new branch

After deploying the `growth-tracking-audit-2026-05-17` branch:

1. **URL Inspection** in GSC for each route in the sitemap.
2. Click **Request Indexing** for any that show "Not indexed" or have an outdated canonical.
3. Look for "User-declared canonical" — confirm each page shows ITS OWN URL, not `/`. (This is the canonical bug being fixed by this audit.)
4. For the SEO landing pages, check **Coverage → Discovered – currently not indexed**. If they're stuck there, internal linking from `/experiences` and the homepage will help.

## Linking GSC to GA4

In **GA4 → Admin → Search Console links → Link**:
1. Select your verified GSC property.
2. Pick the web data stream.
3. Now **GA4 → Reports → Acquisition → Search Console** shows organic queries, landing pages, CTR.

## Tools to use alongside GSC

Free / cheap:
- **Bing Webmaster Tools** — verify the site here too. Import from GSC works in 1 click. Free traffic.
- **Google's Rich Results Test** — https://search.google.com/test/rich-results — validate your FAQPage, AggregateRating, BreadcrumbList schemas after deploy.
- **PageSpeed Insights** — https://pagespeed.web.dev/ — track LCP/INP/CLS on mobile.

Paid (only when you outgrow GSC):
- Ahrefs / SEMrush / SE Ranking — backlinks + competitor keyword gap analysis.
