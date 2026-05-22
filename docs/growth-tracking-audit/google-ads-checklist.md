# Google Ads Checklist — La Table Marrakech

Status: **Google Ads account not detected**. This is a runbook for setting up Ads cleanly so spend is profitable from day 1.

## Setup order

### 1. Prereqs (do these FIRST — Ads is meaningless without them)
- ✅ Site live with `useSEO` page_view + `generate_lead` events firing
- ✅ GA4 property installed via GTM
- ✅ `generate_lead` marked as a conversion in GA4
- ⬜ GSC verified (see `search-console-checklist.md`)
- ⬜ Google Ads account created at https://ads.google.com (don't enter billing yet — we'll only enable at launch)
- ⬜ Google Ads ↔ GA4 link in **GA4 → Admin → Google Ads links → Link**
- ⬜ Google Ads ↔ Google Merchant Center skipped (no e-commerce catalog)

### 2. Import conversion from GA4 into Google Ads

1. Google Ads → **Tools → Conversions → New conversion action**
2. Choose **Import → Google Analytics 4 properties → Web**
3. Pick `generate_lead`
4. Set:
   - **Goal:** Submit a lead form (or your closest equivalent)
   - **Value:** Use the same value for each conversion → `1` (or estimate average booking value, e.g. €400 if avg booking ≈ €400)
   - **Count:** One per click (so the same user reaching out twice in the same paid click doesn't double-count)
   - **Attribution model:** Data-driven (default)

This is your **primary smart-bidding signal**. Don't import any other conversion until you have 30+ `generate_lead` events / month.

### 3. Enable Enhanced Conversions (free, big lift)

Enhanced Conversions sends hashed first-party data (the email/phone from the reservation form) back to Google Ads. Lift on conversion volume is typically 5–15%.

1. Google Ads → **Tools → Conversions → click `generate_lead` → Enhanced conversions → Turn on**
2. Method: **Google Tag** (via GTM)
3. In GTM, edit your GA4 Event tag for `form_submit` → enable **User-provided data** → map `email` and `phone_number` from dataLayer
4. **Important:** the reservation form must collect email + phone (it already does — `email` and `whatsapp` fields)
5. Update `src/pages/Contact.tsx` so `trackFormSubmit` includes hashed user data — see follow-up section below.

### 4. Account-level settings

Before launching ANY campaign:
- **Billing:** EUR (or MAD if you bill in dirham)
- **Time zone:** Africa/Casablanca (Morocco)
- **Account → Auto-applied recommendations:** TURN OFF every option. Google's auto-changes routinely add irrelevant keywords and broaden match types in ways that waste your spend.
- **Search partners:** OFF (Google search only). Search partners convert at 30–60% lower rates.
- **Display network:** OFF (Search-only campaigns only — at this scale, display is mostly bot traffic and you'll burn budget).

## Campaign structure (recommended)

Start with **2 small Search campaigns** + 0 Display, 0 Performance Max. Scale only after 30 days of data.

### Campaign 1: Brand defense (€5–10/day)
- Goal: stop competitors bidding on "La Table Marrakech" and stealing your traffic
- Match type: Exact + Phrase
- Keywords:
  - `"la table marrakech"`
  - `[la table marrakech]`
  - `"la table marrakech private chef"`
- Negative match list: see Section "Universal negative keywords"
- Landing page: `/`

### Campaign 2: High-intent commercial keywords (€20–40/day to start)
- Geotarget: Worldwide, EXCEPT location-irrelevant cheap-traffic regions
- Keep top 4 ad groups:

**Ad group A: Private chef Marrakech**
- Keywords: `[private chef marrakech]`, `"private chef in marrakech"`, `"hire private chef marrakech"`
- Landing page: `/private-chef-marrakech`

**Ad group B: Villa chef Marrakech**
- Keywords: `[villa chef marrakech]`, `"private chef for villa marrakech"`, `"chef airbnb marrakech"`
- Landing page: `/villa-chef-marrakech`

**Ad group C: Romantic dinner Marrakech**
- Keywords: `[romantic dinner marrakech]`, `"private romantic dinner marrakech"`, `"honeymoon dinner marrakech"`
- Landing page: `/romantic-dinner-marrakech`

**Ad group D: Marrakech cooking class**
- Keywords: `[moroccan cooking class marrakech]`, `"cooking class marrakech with chef"`, `"learn moroccan cooking marrakech"`
- Landing page: `/moroccan-cooking-experience`

### Settings for Campaign 2
- **Bidding:** Maximize conversions, with **target CPA** unset for the first 14 days (let it learn)
- After 30+ conversions: set target CPA to `(avg booking value) × (margin%) ÷ (conversion-to-booking rate)`
  - Example: €400 avg booking × 60% margin / 30% conversion-to-booking = **€80 target CPA**
- **Ad rotation:** Optimize for conversions
- **Budget:** €30/day to start; reassess weekly
- **Audience signals:** Add custom segment "people who searched private chef + marrakech"

## Universal negative keyword list

Add these to BOTH campaigns. They will save you 20–40% of your budget on day 1.

```
job
jobs
hiring
career
careers
salary
recipe
recipes
youtube
free
cheap
budget
under 20
under 30
fast food
mcdonalds
kfc
restaurant near me        ← qualifies "private chef" but pulls cheap restaurant traffic
casablanca
rabat
agadir
essaouira
fez
chefchaouen
tangier
michelin star            ← brand confusion, expensive clicks, no buy intent
trainee
internship
school
course (only if you DON'T want the cooking class — for ad group D, keep)
```

Add per-ad-group negatives so groups don't cannibalize each other:
- **Ad group A**: `villa`, `cooking class`, `romantic`
- **Ad group B**: `cooking class`, `romantic`, `cheap`
- **Ad group C**: `villa`, `group`, `family`
- **Ad group D**: `private chef` (only if not in ad group cluster), `romantic`

## Ad copy template (Responsive Search Ads)

Per ad group, write 15 headlines + 4 descriptions. Headlines (rotating):

```
Private Chef in Marrakech
A Table At Your Villa Tonight
Bespoke Menu, Cooked In Your Riad
Romantic Dinner For Two
WhatsApp Reply In Under An Hour
Trained In Paris. Cooks In Marrakech.
The Chef Stays For The Meal
20+ Years Cooking, 7 In Private Dining
Local Ingredients, Global Technique
No Tourist Menus. No Compromises.
Tagine As You've Never Had It
Featured In Condé Nast Traveller
Bookings From €90 Per Person
Available 7 Nights A Week
Reserve On WhatsApp Now
```

Descriptions:
```
Trained at Le Cordon Bleu Paris. 20+ years of cooking, now serving private tables across Marrakech and the Agafay desert.
Romantic dinners, family feasts, villa chefs, cooking classes. WhatsApp +212 721 354 757 — reply usually within the hour.
The chef arrives, cooks in your space, serves each course personally, and cleans up. Menu built around what you love.
Six experiences from €90 per person. Bookings 48 hours ahead. Speak English, French, Arabic. Reserve on WhatsApp.
```

Path fields: `private-chef` / `marrakech`

## Ad extensions (assets)

Add ALL of these:
- **Sitelinks** (4–6): The Chef, Experiences, Gallery, FAQ, Testimonials, Contact
- **Callouts**: 24-hour WhatsApp reply, Trained in Paris, Local ingredients, Featured in Condé Nast, Free menu consultation, Worldwide guests welcome
- **Structured snippets**: Service catalog → Romantic Dinner, Villa Chef, Rooftop Dinner, Family Dining, Cooking Class, Desert Dining
- **Call extension**: +212 721 354 757 — tracked through Google forwarding number so phone calls also count as conversions
- **Location extension**: Skip (you don't have a fixed venue)
- **Lead form**: Skip (WhatsApp is your funnel — don't divert to a Google form)

## Conversions to watch

In Google Ads' Conversions report, after 30 days:

| Metric | Healthy target | What to do if missed |
| --- | --- | --- |
| Conversions / day | ≥ 2 | Increase budget on best-converting keywords; pause low-CTR keywords |
| Cost per conversion | < your target CPA | Add negatives, narrow geotarget, refine ad copy |
| Conversion rate (clicks → generate_lead) | ≥ 4% | Improve landing page above-fold copy, faster mobile LCP |
| CTR | ≥ 5% (search) | Rewrite ad copy with stronger urgency and offer specificity |
| Search terms with 0 conversions | Add as negative if irrelevant | Use the Search Terms report weekly |

## Things that will waste budget if you let them

1. **Broad match keywords without strict negatives.** Google will match `private chef marrakech` against `cheap chef hat marrakech costume halloween`. Use exact + phrase only for the first 90 days.
2. **Performance Max campaigns at launch.** PMax is a black box. Don't run it until you have 100+ conversions and trust the GA4 attribution.
3. **Display Network ON.** Bot/farm traffic, 0% conversion rate, drains budget silently.
4. **Auto-apply recommendations.** Always off.
5. **Letting Google "expand reach by matching close variants."** Off.
6. **Bidding on "Marrakech" alone.** Way too broad, will cost €4+/click on travel intent.
7. **Running ads before tracking is verified.** Spend €0 until you see `generate_lead` events in GA4 Realtime with the right UTM params.

## Sanity check before turning on billing

- ☐ GA4 Realtime shows `page_view` events
- ☐ GA4 Realtime shows `generate_lead` events when you click WhatsApp from the live site
- ☐ The conversion in Google Ads shows "Recording conversions" (green status)
- ☐ A test URL with UTM params (`?utm_source=adtest&utm_medium=manual`) appears in GA4 Acquisition reports
- ☐ Universal negative keyword list applied
- ☐ Search partners + Display Network OFF
- ☐ Auto-apply recommendations OFF
- ☐ Daily budget set to a number you're comfortable losing the first 2 weeks (typically €20–50/day)

When all boxes are checked, **enable billing** and launch.

## Add hashed user data for Enhanced Conversions (advanced — optional)

To send hashed email + phone with `form_submit`, update `Contact.tsx`'s submit handler:

```ts
// at top of file:
import { trackFormSubmit } from "@/lib/analytics";

// in onSubmit:
trackFormSubmit("reservation", {
  experience_type: values.experienceType,
  guests: values.guests,
  country: values.country,
  // Enhanced Conversions: GTM will hash these before sending to Google.
  user_email: values.email,
  user_phone: values.whatsapp,
});
```

Then in GTM, on your `form_submit` GA4 event tag, enable **User-provided data → Manual configuration** and map `email` → `dlv.user_email`, `phone_number` → `dlv.user_phone`. GTM hashes via SHA-256 in-browser.
