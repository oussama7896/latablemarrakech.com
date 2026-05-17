# Hostinger Deploy — Prompt for Claude (paste this into claude.ai)

Copy everything below the line and paste it as your first message
into a new Claude conversation in your browser. Claude will then have
all the context it needs to help you deploy the site.

---

I have a Vite + React site for **La Table Marrakech** and need to deploy
it to my Hostinger shared hosting. The site lives in this repo:

- Repo path: `/Users/oussamalaroussi/Desktop/latablemarrakech.com`
- Build subfolder: `artifacts/la-table-marrakech`
- Build output: `artifacts/la-table-marrakech/dist/public`
- Build command: `npm run build --workspace=@workspace/la-table-marrakech`
- Hostinger web root: `public_html`

There are already two deploy scripts in the repo:

1. `scripts/deploy-hostinger.py` — uses only Python 3 stdlib (`ftplib`),
   no extra installs needed. **Recommended.**
2. `scripts/deploy-hostinger.sh` — uses `lftp` (which requires Homebrew
   on macOS).

Both scripts read credentials from `.env.deploy` at the repo root.
A template is at `.env.deploy.example`:

```
HOSTINGER_HOST=ftp.latablemarrakech.com
HOSTINGER_USER=u123456789
HOSTINGER_PASS=changeme
HOSTINGER_REMOTE_PATH=/public_html
HOSTINGER_PROTOCOL=ftp
HOSTINGER_PORT=21
```

The build output includes a `.htaccess` file that handles:
- HTTPS redirect
- SPA fallback (rewrites all non-asset URLs to `/index.html`)
- 1-year immutable cache on hashed assets, no-cache on HTML
- Gzip + basic security headers

## What I need help with

Walk me through these steps, one at a time, waiting for me to confirm
each one before moving on:

1. **Get FTP creds from hPanel.** Tell me where to click in Hostinger
   to find my FTP host, username, and password.
2. **Create `.env.deploy`.** Give me the exact terminal commands to copy
   the template and open it in an editor on macOS.
3. **Dry-run the deploy.** Run:
   ```
   python3 scripts/deploy-hostinger.py --dry-run
   ```
   Help me read the output and confirm it found my files + connected
   to the server successfully.
4. **Real deploy.** Run:
   ```
   python3 scripts/deploy-hostinger.py
   ```
   Tell me what to expect (it builds, uploads, prints progress).
5. **Verify.** Tell me how to test the deployed site (visit my domain,
   click into `/experiences`, `/chef`, `/contact` and refresh on each
   to confirm SPA routing works).

## Common errors I might hit, and how you should help fix them

- **`530 Login authentication failed`** → wrong username/password in
  `.env.deploy`. Tell me to double-check hPanel.
- **`getaddrinfo ENOTFOUND`** → wrong `HOSTINGER_HOST`. The right host
  is shown in hPanel under FTP Accounts; usually `ftp.<my-domain>` or
  `files.<something>.hostinger.com`.
- **SPA routes (e.g. `/experiences`) return 404 on refresh** → the
  `.htaccess` file didn't upload. Tell me to enable "Show hidden files"
  in hPanel's File Manager and re-upload.
- **Site shows old version after deploy** → tell me to hard-refresh
  (`Cmd+Shift+R`) and verify the file timestamps in hPanel's File
  Manager.

## Things you should NOT do

- Do not ask me to paste my password into the chat — it should only
  live in `.env.deploy` on my disk.
- Do not suggest I install Homebrew unless I explicitly say I want to
  use the bash/lftp script instead of the Python one.
- Do not change any of the existing scripts or `.htaccess` rules
  unless I report a specific bug; they were written for this exact
  setup.

Start with step 1 when you're ready.
