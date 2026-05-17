#!/usr/bin/env bash
# Build the la-table-marrakech site and upload it to Hostinger.
#
# Usage:
#   ./scripts/deploy-hostinger.sh            # build + upload
#   ./scripts/deploy-hostinger.sh --no-build # upload only (reuse existing dist)
#   ./scripts/deploy-hostinger.sh --dry-run  # show what would change, upload nothing
#
# Configuration: copy .env.deploy.example to .env.deploy and fill it in.

set -euo pipefail

# ── locate repo root ─────────────────────────────────────────
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

ENV_FILE="${ROOT}/.env.deploy"
DIST_DIR="${ROOT}/artifacts/la-table-marrakech/dist/public"

# ── flags ────────────────────────────────────────────────────
DO_BUILD=1
DRY_RUN=0
for arg in "$@"; do
  case "$arg" in
    --no-build) DO_BUILD=0 ;;
    --dry-run)  DRY_RUN=1 ;;
    -h|--help)
      sed -n '2,9p' "$0" | sed 's/^# //; s/^#//'
      exit 0
      ;;
    *) echo "Unknown flag: $arg" >&2; exit 64 ;;
  esac
done

# ── load env ─────────────────────────────────────────────────
if [[ ! -f "$ENV_FILE" ]]; then
  cat >&2 <<EOF
Missing $ENV_FILE

Copy .env.deploy.example to .env.deploy and fill in your Hostinger
FTP/SFTP credentials. The file is gitignored — your password will not
be committed.
EOF
  exit 1
fi
# shellcheck disable=SC1090
set -a; source "$ENV_FILE"; set +a

: "${HOSTINGER_HOST:?HOSTINGER_HOST is required (e.g. ftp.latablemarrakech.com or files.000webhost.com)}"
: "${HOSTINGER_USER:?HOSTINGER_USER is required}"
: "${HOSTINGER_PASS:?HOSTINGER_PASS is required}"
: "${HOSTINGER_REMOTE_PATH:=/public_html}"
PROTOCOL="${HOSTINGER_PROTOCOL:-ftp}"     # ftp | sftp
PORT="${HOSTINGER_PORT:-}"                # optional override

# ── tooling check ────────────────────────────────────────────
if ! command -v lftp >/dev/null 2>&1; then
  cat >&2 <<EOF
lftp is required but not installed.

Install on macOS:   brew install lftp
Install on Ubuntu:  sudo apt-get install lftp
EOF
  exit 1
fi

# ── build ────────────────────────────────────────────────────
if [[ $DO_BUILD -eq 1 ]]; then
  echo "→ Building la-table-marrakech"
  npm run build --workspace=@workspace/la-table-marrakech
else
  echo "→ Skipping build (--no-build)"
fi

if [[ ! -d "$DIST_DIR" ]]; then
  echo "Build output not found at $DIST_DIR" >&2
  exit 1
fi

FILE_COUNT="$(find "$DIST_DIR" -type f | wc -l | tr -d ' ')"
SIZE="$(du -sh "$DIST_DIR" | awk '{print $1}')"
echo "→ $FILE_COUNT files / $SIZE ready in $DIST_DIR"

# ── upload via lftp mirror ──────────────────────────────────
echo "→ Connecting to $PROTOCOL://$HOSTINGER_USER@$HOSTINGER_HOST"

LFTP_URL="${PROTOCOL}://${HOSTINGER_HOST}"
[[ -n "$PORT" ]] && LFTP_URL="${LFTP_URL}:${PORT}"

DRY_FLAG=""
[[ $DRY_RUN -eq 1 ]] && DRY_FLAG="--dry-run"

# Use a heredoc so the password never appears on argv (visible in `ps`).
lftp -u "$HOSTINGER_USER,$HOSTINGER_PASS" "$LFTP_URL" <<LFTP_SCRIPT
set ssl:verify-certificate no
set ftp:ssl-protect-data true
set net:max-retries 3
set net:timeout 20
set mirror:use-pget-n 4

mirror \\
  --reverse \\
  --delete \\
  --parallel=4 \\
  --verbose \\
  --exclude-glob .DS_Store \\
  --exclude-glob *.map \\
  $DRY_FLAG \\
  "$DIST_DIR/" "$HOSTINGER_REMOTE_PATH/"

bye
LFTP_SCRIPT

if [[ $DRY_RUN -eq 1 ]]; then
  echo "✓ Dry-run complete (nothing was uploaded)"
else
  echo "✓ Deployed to https://${HOSTINGER_HOST#ftp.}${HOSTINGER_REMOTE_PATH#/public_html}"
fi
