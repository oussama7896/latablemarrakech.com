# Vercel Import — Prompt for Claude (paste this into claude.ai)

Copy everything below the line and paste it as your first message
into a new Claude conversation in Chrome. Claude will then have all
the context it needs to walk you through importing the GitHub repo
into Vercel.

---

I want to import a GitHub repo into Vercel for the first time and
have it auto-deploy on every push.

## Project details

- **GitHub repo:** `oussama7896/latablemarrakech.com`
- **Default branch:** `main`
- **Type:** Vite + React + TypeScript SPA inside an npm-workspaces monorepo
- **The site lives at:** `artifacts/la-table-marrakech` (not the repo root)
- **Build output:** `artifacts/la-table-marrakech/dist/public`
- **Live mirror already on Hostinger:** https://latablemarrakech.com
  (Hostinger is the production. Vercel will be a parallel preview /
  backup environment.)

A `vercel.json` is already committed at the repo root and tells
Vercel everything it needs:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": null,
  "installCommand": "npm install --no-audit --no-fund",
  "buildCommand": "npm run build --workspace=@workspace/la-table-marrakech",
  "outputDirectory": "artifacts/la-table-marrakech/dist/public",
  "rewrites": [
    { "source": "/((?!assets/).*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

Root `package.json` declares `"packageManager": "npm@11.9.0"` and
`"engines.node": ">=20"` so Vercel uses npm (not pnpm or yarn) and
Node 20+.

## What I need help with

Walk me through the import, one step at a time, waiting for me to
confirm each one before moving on:

1. **Sign in to Vercel.** Tell me exactly where to click at
   https://vercel.com if I don't have an account yet. Recommend
   signing in with GitHub so the repo connection is one-click.
2. **Start the import.** Tell me to go to https://vercel.com/new and
   how to find my `oussama7896/latablemarrakech.com` repo in the
   list. If I don't see it, walk me through "Adjust GitHub App
   Permissions" to grant access.
3. **Configure project.** Confirm Vercel auto-detected the right
   settings from `vercel.json`. The fields I should NOT touch:
   - Framework Preset: should show "Other" (because `vercel.json`
     sets `"framework": null`)
   - Build Command, Install Command, Output Directory: should show
     the values from `vercel.json` and be greyed out / inherited
   - Root Directory: leave as `./` (the repo root). Do NOT set it to
     `artifacts/la-table-marrakech` — npm workspaces need to run
     from the root.
4. **Deploy.** Tell me to click the Deploy button. The first build
   takes 60-90 seconds. While I wait, explain what's happening (npm
   install at root, then `npm run build --workspace=...`, then
   serving `artifacts/la-table-marrakech/dist/public`).
5. **Verify.** Once it's deployed, tell me:
   - To open the `*.vercel.app` URL Vercel shows
   - To click into `/experiences`, `/chef`, `/contact` and refresh
     each one (confirms SPA rewrites in `vercel.json` are working)
   - To check that hashed assets at `/assets/*.js` have the
     `Cache-Control: public, max-age=31536000, immutable` header
     (use DevTools → Network tab)
6. **Confirm auto-deploy.** Tell me that from now on, every
   `git push origin main` will auto-deploy. Branch pushes get
   preview URLs.

## Common errors I might hit

- **"Command exited with 127"** during build → the root
  `preinstall` script is rejecting the package manager. The fix is
  already in place (`packageManager: "npm@11.9.0"` in
  `package.json`) but if it still happens, tell me to check
  Vercel's build logs for which lockfile it detected. Last time
  this was caused by a tracked `pnpm-lock.yaml` (already deleted).
- **404 on `/experiences` after refresh** → SPA rewrites in
  `vercel.json` aren't being applied. Most likely cause: Vercel
  picked up a stale config. Tell me to redeploy.
- **Build can't find `@workspace/api-client-react`** → I'd have to
  set Root Directory to `./` (repo root) so npm workspaces resolve
  the `file:../../lib/api-client-react` link. This is the default,
  so this should not happen — but if it does, that's the fix.

## Things you should NOT do

- Do not suggest changing `vercel.json`, `package.json`, or any
  build config unless I report a specific reproducible error.
- Do not tell me to use the Vercel CLI (`vercel` command). I'm
  doing this through the web dashboard.
- Do not tell me to set a Root Directory other than `./`. The
  monorepo workspace setup requires npm install to run from the
  repo root.

Start with step 1 when you're ready.
