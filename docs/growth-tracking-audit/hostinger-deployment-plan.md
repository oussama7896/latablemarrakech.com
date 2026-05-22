# Hostinger Deployment Plan — La Table Marrakech

The repo is already configured for Hostinger shared hosting. This doc covers the build + upload flow and the production-readiness checks specific to this branch.

## What's already in place

| File | Purpose |
| --- | --- |
| `scripts/deploy-hostinger.py` | Python-stdlib (`ftplib`) uploader. **Recommended.** No extra installs. |
| `scripts/deploy-hostinger.sh` | `lftp`-based uploader. Requires Homebrew on macOS. |
| `.env.deploy.example` | Template for FTP credentials. |
| `.env.deploy` | Your filled-in credentials (gitignored). |
| `artifacts/la-table-marrakech/public/.htaccess` | HTTPS redirect + SPA fallback + cache + security headers. Auto-copied into `dist/public` on every build. |
| `DEPLOY-PROMPT.md` | Step-by-step deploy walkthrough. |
| `vercel.json` | **Unused** — repo also had Vercel config; you confirmed Hostinger is the live target. Recommend removing `vercel.json` (or leave to keep Vercel as a backup). |

## One-time setup

1. Get your FTP credentials from Hostinger's hPanel → Files → FTP Accounts.
2. Copy `.env.deploy.example` to `.env.deploy`:
   ```bash
   cp .env.deploy.example .env.deploy
   ```
3. Fill in:
   ```
   HOSTINGER_HOST=ftp.latablemarrakech.com
   HOSTINGER_USER=u123456789      ← from hPanel
   HOSTINGER_PASS=…                ← from hPanel
   HOSTINGER_REMOTE_PATH=/public_html
   HOSTINGER_PROTOCOL=ftp          ← or sftp if you've enabled SSH
   ```
4. Confirm `.env.deploy` is in `.gitignore` (it is).

## New env required for this branch

Create `artifacts/la-table-marrakech/.env.local` with your tracking IDs:

```bash
cd artifacts/la-table-marrakech
cp .env.example .env.local
```

Edit `.env.local`:
```
VITE_GTM_ID=GTM-XXXXXXX   ← only set ONE of these (prefer GTM)
VITE_GA4_ID=
```

If you set `VITE_GTM_ID`, configure GA4 INSIDE GTM (see `gtm-ga4-event-map.md`). Don't also set `VITE_GA4_ID` — duplicate hits.

`.env.local` is gitignored by Vite's defaults — never commit real tracking IDs.

## Build + deploy

```bash
# From repo root:

# 1. (Recommended) dry run first to see what would change
python3 scripts/deploy-hostinger.py --dry-run

# 2. Real deploy (builds + uploads)
python3 scripts/deploy-hostinger.py
```

The script will:
1. Run `npm run build --workspace=@workspace/la-table-marrakech`
2. Verify `artifacts/la-table-marrakech/dist/public/` exists with files
3. Mirror it to `/public_html/` on Hostinger (additive + delete files no longer present locally)

Build output goes to `artifacts/la-table-marrakech/dist/public/`. The contents you see there are what ends up on Hostinger.

## What needs to be in `dist/public/` after build

| File / pattern | Purpose |
| --- | --- |
| `index.html` | Entry, with your `%VITE_GTM_ID%` replaced by real value |
| `assets/*` | Hashed JS / CSS bundles (long-cache OK) |
| `.htaccess` | SPA fallback + HTTPS + cache — **must be present** |
| `robots.txt` | `Allow:`, sitemap link |
| `sitemap.xml` | 11 URLs with lastmod |
| `opengraph.jpg` | OG image for social previews |
| `favicon.svg` | Favicon |
| `images/` | Any static images you've added |

## Sanity check (after deploy)

Open https://latablemarrakech.com/ in an Incognito window and run:

1. **HTTP test** — visit `http://latablemarrakech.com/` (plain HTTP). It should 301 → HTTPS.
2. **SPA refresh test** — go to `https://latablemarrakech.com/chef`, hit `Cmd+Shift+R`. The page should reload as `/chef` (NOT 404). If it 404s, `.htaccess` didn't upload — re-deploy and confirm "Show hidden files" in Hostinger's File Manager.
3. **Tracking smoke test** — open DevTools → Console → run:
   ```js
   const out = {
     gtm: !!window.google_tag_manager,
     ga4: typeof window.gtag === 'function' && !!window.__ltmGa4,
     dl: window.dataLayer.length,
     analytics: window.__ltmAnalyticsReady === true
   };
   JSON.stringify(out);
   ```
   Expected:
   - `gtm: true` if `VITE_GTM_ID` was set
   - `ga4: true` if `VITE_GA4_ID` was set (without GTM)
   - `dl: ≥ 2`
   - `analytics: true`
4. **Canonical test** — DevTools → Console → on each route run:
   ```js
   document.querySelector('link[rel=canonical]').href
   ```
   `/chef` → `https://latablemarrakech.com/chef`. NOT `/`. If you see `/` on every route, the canonical bug regressed.
5. **WhatsApp click test** — click the hero WhatsApp CTA. In GA4 Realtime, expect `whatsapp_click` and `generate_lead` events within 30s.
6. **Rich Results Test** — paste each route into https://search.google.com/test/rich-results. Expect:
   - `/` → Restaurant + BreadcrumbList
   - `/faq` → FAQPage
   - `/testimonials` → AggregateRating
   - `/private-chef-marrakech` → LocalBusiness + BreadcrumbList
7. **Lighthouse** on `/` (mobile) — aim for Performance ≥ 85, SEO ≥ 95, Accessibility ≥ 90.

## Hostinger-specific gotchas

- **`.htaccess` doesn't upload by default in some FTP clients** because it starts with a dot. The Python script copies it via the same recursive mirror as everything else, so this is handled. But if you ever upload manually, enable "Show hidden files".
- **Browser cache after deploy.** The `.htaccess` sets `Cache-Control: no-cache, must-revalidate` on HTML so users see new deploys. But the SERVICE WORKER (if any — there isn't one here) or CDN proxy can hold an old version. Use Hostinger hPanel → "Clear all caches" if updates don't appear.
- **PHP errors in the access log.** The site is static — there should be no PHP execution. If you see PHP errors, something inside `public_html` is being interpreted that shouldn't be. Most often a leftover `wp-` file from a previous WordPress install. Delete.
- **Custom MIME type for `.webp`.** If you start serving WebP images and they 406, add `AddType image/webp .webp` to `.htaccess`.

## Removing the dual deploy paths (optional cleanup)

Since you confirmed Hostinger is live and Vercel is unused:

```bash
git rm vercel.json VERCEL-PROMPT.md
git commit -m "chore: drop unused Vercel config (Hostinger is live target)"
```

Or, if you want to keep Vercel as a backup CDN (free), leave the files but document in the repo README which target is canonical.

## Rollback plan if a deploy breaks the site

The Python script doesn't keep backups remotely. To roll back:

1. Check out the prior commit locally:
   ```bash
   git log --oneline -10
   git checkout <commit-before-the-bad-deploy>
   ```
2. Re-build + re-deploy:
   ```bash
   python3 scripts/deploy-hostinger.py
   ```
3. After verifying the site works, return to your working branch:
   ```bash
   git checkout main
   ```

For real safety, take a Hostinger backup before any major change:
- hPanel → **Files → Backups → Create new backup**

## CI/CD (not needed yet, but here's the path)

Once you're comfortable, you could push deploys via GitHub Actions:

```yaml
# .github/workflows/deploy.yml (sketch)
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: echo "VITE_GTM_ID=${{ secrets.VITE_GTM_ID }}" > artifacts/la-table-marrakech/.env.local
      - run: npm run build --workspace=@workspace/la-table-marrakech
      - name: FTP deploy
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.HOSTINGER_HOST }}
          username: ${{ secrets.HOSTINGER_USER }}
          password: ${{ secrets.HOSTINGER_PASS }}
          local-dir: ./artifacts/la-table-marrakech/dist/public/
          server-dir: /public_html/
```

But for now, the Python script is fine. Don't add CI complexity until you're deploying daily.
