# Next Actions — La Table Marrakech

Ordered, time-boxed sequence. Total time to get from "audit complete" to "tracking + Ads live": **~3 hours of focused work**, spread over 2 days.

## Day 1 — 90 minutes

### Step 1 (20 min) — Create GA4 property
1. Go to https://analytics.google.com → **Admin → Create → Property**
2. Name: `La Table Marrakech`, timezone: `Africa/Casablanca`, currency: `EUR`
3. Industry: `Travel & Tourism` (or `Food & Drink`)
4. Data stream: **Web** → URL `https://latablemarrakech.com/` → Stream name `Web Stream`
5. Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`) — save for step 3.
6. In **Admin → Events → Modify**, IGNORE the auto-collected events for now.

### Step 2 (15 min) — Create GTM container
1. Go to https://tagmanager.google.com → **Create account**
2. Account name: `La Table Marrakech`, country: Morocco
3. Container name: `latablemarrakech.com`, target platform: **Web**
4. Copy the **Container ID** (`GTM-XXXXXXX`) — save for step 3.
5. Skip the install instructions popup — you're not pasting raw scripts; we use env vars.

### Step 3 (5 min) — Wire IDs into the build
```bash
cd /Users/oussamalaroussi/Desktop/latablemarrakech.com/artifacts/la-table-marrakech
cp .env.example .env.local
```
Edit `.env.local`:
```
VITE_GTM_ID=GTM-XXXXXXX      ← from step 2
VITE_GA4_ID=                  ← LEAVE BLANK (configure GA4 inside GTM)
```

### Step 4 (10 min) — Build + deploy
```bash
cd /Users/oussamalaroussi/Desktop/latablemarrakech.com
python3 scripts/deploy-hostinger.py --dry-run
python3 scripts/deploy-hostinger.py
```

### Step 5 (10 min) — Verify tracking is live
1. Open https://latablemarrakech.com/?utm_source=test&utm_medium=manual&utm_campaign=audit
2. DevTools → Console → run:
   ```js
   ({gtm: !!window.google_tag_manager, dl: window.dataLayer.length})
   ```
   Expected: `{gtm: true, dl: ≥ 3}`
3. Click the hero WhatsApp button.
4. In **GTM → Preview** (paste your site URL), confirm the `whatsapp_click` event fires.

### Step 6 (20 min) — Set up GTM tags
Follow `gtm-ga4-event-map.md` to create:
- GA4 Configuration tag (with `send_page_view: false`)
- GA4 Event tags for each event
- Custom Event triggers
- Data Layer Variables

Click **Submit → Publish** when done.

### Step 7 (10 min) — Mark conversions in GA4
1. Visit https://latablemarrakech.com/?utm_source=test → click WhatsApp once.
2. Wait 5 minutes (GA4 ingest lag).
3. **GA4 → Admin → Events** — see `generate_lead` appear.
4. Toggle **Mark as conversion** ON for `generate_lead`. (May be labelled "Mark as key event" in newer UI.)

---

## Day 2 — 90 minutes

### Step 8 (20 min) — Verify Search Console
1. https://search.google.com/search-console → **Add property → URL prefix → https://latablemarrakech.com/**
2. Verify via HTML file: download `google[hash].html`, drop into `artifacts/la-table-marrakech/public/`, redeploy, click Verify.
3. **Sitemaps → Add new sitemap** → enter `sitemap.xml` → Submit.
4. Wait 24h, then re-check coverage (most pages should be discovered).
5. (Optional) Verify Bing Webmaster Tools too — free traffic, takes 5 min.

### Step 9 (15 min) — Set up Google Ads account (don't enable billing yet)
1. https://ads.google.com → **Switch to expert mode** (top right)
2. Skip campaign creation when prompted
3. **Settings → Account access** — add your business email
4. **Settings → Account settings**:
   - Currency: EUR
   - Time zone: Africa/Casablanca
5. **Tools → Linked accounts → GA4 → Link** to your GA4 property
6. **Tools → Linked accounts → GSC → Link** to your verified GSC property

### Step 10 (20 min) — Import conversion + Enhanced Conversions
Follow `google-ads-checklist.md`:
1. **Conversions → New → Import from GA4** → `generate_lead` → set value `1` (or estimated avg booking value)
2. Enable **Enhanced Conversions** with manual configuration via GTM
3. Update Contact.tsx if you want hashed email/phone (instructions in `google-ads-checklist.md` final section). Redeploy.

### Step 11 (20 min) — Build the first Search campaign (paused)
Build Campaign 2 from `google-ads-checklist.md`:
- 4 ad groups (Private Chef, Villa Chef, Romantic Dinner, Cooking Class)
- Exact + Phrase keywords (NO Broad)
- Universal negatives applied
- 1 RSA per ad group with the headlines/descriptions in the doc
- All sitelinks, callouts, structured snippets, call extension added
- **Keep the campaign PAUSED** for the next 24 hours

### Step 12 (15 min) — Build the brand defense campaign (paused)
Campaign 1 from `google-ads-checklist.md`:
- Exact + Phrase brand match
- €5–10/day
- Landing page `/`
- **Keep paused** for the next 24h

---

## Day 3 — 30 minutes (launch)

### Step 13 — Final readiness check
- ☐ GA4 Realtime shows your test clicks
- ☐ `generate_lead` is marked as conversion
- ☐ Google Ads conversion status shows "Recording conversions"
- ☐ Test URL with UTM params correctly attributes to source/medium in GA4
- ☐ All universal negative keywords applied
- ☐ Search partners + Display + Auto-apply recs OFF
- ☐ Daily budget is a number you're comfortable losing in the first 14 days
- ☐ `.env.local` NOT committed (`git status` should show it ignored)

### Step 14 — Enable billing + unpause
1. Google Ads → **Billing → Setup** → enter card
2. Unpause Campaign 1 (brand defense)
3. Wait 2 hours, confirm clicks coming in and conversions tracking
4. Unpause Campaign 2 (commercial)
5. Set a calendar reminder for Day 4–Day 30 (see below)

---

## Ongoing — weekly cadence (30 min / week)

Every Monday morning:

### Marketing review
- **Google Ads → Campaigns:** spend, conversions, CPA per campaign and per ad group
- **Search Terms report:** add irrelevant terms as negative keywords
- **Ad copy:** rotate in 1 new headline per RSA per week
- **Landing pages:** if conv rate < 3% on a high-traffic page, rewrite the above-fold copy

### SEO review (from `search-console-checklist.md`)
- **GSC Performance:** top queries last 28d vs prior 28d
- **Pages at position 4–20:** pick 1, add 100 words targeting the phrase to the right page

### Tech sanity
- Spot-check **GA4 Realtime** for `page_view` + `generate_lead` events still firing
- Check **GSC Coverage** for any newly indexed or excluded URLs

---

## When to scale (after 30 days)

Only after 30+ `generate_lead` conversions, consider:
- Adding a **Performance Max** campaign (after you trust GA4 attribution)
- Increasing daily budgets on the best-converting ad groups
- Building 1–2 new SEO landing pages targeting queries from GSC with high impressions but low CTR
- Adding a French version of the site if French-language searches drive ≥ 10% of impressions

## When to expand to other channels

- **Meta Ads (Instagram):** strong fit for romantic dinner targeting (visual product, couples audience). Wait until you have ≥ 50 generate_lead/month from Google Ads first.
- **TripAdvisor + Viator:** consider listing experiences with click-through to WhatsApp. Their take is high (15–25%) so only for marginal-cost-of-acquisition fill.
- **Booking.com Experiences:** ditto.

## Things NOT to do right now (anti-patterns)

- ❌ Don't enable Google Ads "Auto-apply recommendations" — it will add bad keywords on its own
- ❌ Don't start a Display campaign — bot traffic at this scale wastes 80%+ of spend
- ❌ Don't run TWO ad accounts (e.g. one for FR-speakers and one for EN-speakers) — keep one account, use ad-group-level language targeting
- ❌ Don't change conversion definitions in GA4 once Ads is bidding on them — Ads needs ≥ 30 conversions to learn; resetting wipes the learning phase

## Quick-reference contacts

| Tool | URL | What lives there |
| --- | --- | --- |
| GA4 | https://analytics.google.com | Events, conversions, audience |
| GTM | https://tagmanager.google.com | Tag config, debug preview |
| GSC | https://search.google.com/search-console | Organic queries, indexing |
| Google Ads | https://ads.google.com | Campaigns, conversions, billing |
| Rich Results Test | https://search.google.com/test/rich-results | Validate schema after deploy |
| PageSpeed Insights | https://pagespeed.web.dev/ | Mobile Core Web Vitals |
| Hostinger hPanel | https://hpanel.hostinger.com | FTP creds, file manager, DNS |
