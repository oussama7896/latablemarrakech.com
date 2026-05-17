#!/usr/bin/env python3
"""
Build the la-table-marrakech site and upload it to Hostinger over FTP/FTPS.

Uses only the Python standard library (ftplib) so no `brew install` is
needed. Mirrors dist/public to the remote root, uploads in parallel, and
optionally removes files on the server that no longer exist locally.

Usage:
    python3 scripts/deploy-hostinger.py            # build + upload
    python3 scripts/deploy-hostinger.py --no-build # upload only
    python3 scripts/deploy-hostinger.py --dry-run  # preview, upload nothing
    python3 scripts/deploy-hostinger.py --no-delete

Configuration: copy .env.deploy.example to .env.deploy.
"""

from __future__ import annotations

import argparse
import concurrent.futures as cf
import ftplib
import os
import posixpath
import ssl
import subprocess
import sys
import threading
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ENV_FILE = ROOT / ".env.deploy"
DIST_DIR = ROOT / "artifacts" / "la-table-marrakech" / "dist" / "public"
EXCLUDE_NAMES = {".DS_Store"}
EXCLUDE_SUFFIXES = {".map"}
PARALLEL = 4


# ── env ──────────────────────────────────────────────────────
def load_env(path: Path) -> dict[str, str]:
    if not path.exists():
        sys.exit(
            f"Missing {path}\n\n"
            "Copy .env.deploy.example to .env.deploy and fill in your\n"
            "Hostinger FTP credentials. The file is gitignored."
        )
    env: dict[str, str] = {}
    for raw in path.read_text().splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if "=" not in line:
            continue
        key, _, value = line.partition("=")
        env[key.strip()] = value.strip().strip('"').strip("'")
    required = ("HOSTINGER_HOST", "HOSTINGER_USER", "HOSTINGER_PASS")
    missing = [k for k in required if not env.get(k)]
    if missing:
        sys.exit(f"Missing required keys in .env.deploy: {', '.join(missing)}")
    env.setdefault("HOSTINGER_REMOTE_PATH", "/public_html")
    env.setdefault("HOSTINGER_PROTOCOL", "ftp")
    env.setdefault("HOSTINGER_PORT", "21")
    return env


# ── ftp helpers ──────────────────────────────────────────────
def make_ftp(env: dict[str, str]) -> ftplib.FTP:
    proto = env["HOSTINGER_PROTOCOL"].lower()
    if proto not in {"ftp", "ftps"}:
        sys.exit(
            f"HOSTINGER_PROTOCOL={proto!r} not supported by this script (use ftp or ftps).\n"
            "For SFTP, install lftp and use scripts/deploy-hostinger.sh instead."
        )
    port = int(env["HOSTINGER_PORT"])
    if proto == "ftps":
        ftp = ftplib.FTP_TLS(context=ssl.create_default_context())
        ftp.connect(env["HOSTINGER_HOST"], port, timeout=30)
        ftp.login(env["HOSTINGER_USER"], env["HOSTINGER_PASS"])
        ftp.prot_p()
    else:
        ftp = ftplib.FTP()
        ftp.connect(env["HOSTINGER_HOST"], port, timeout=30)
        ftp.login(env["HOSTINGER_USER"], env["HOSTINGER_PASS"])
    ftp.set_pasv(True)
    return ftp


def ensure_remote_dir(ftp: ftplib.FTP, remote_dir: str) -> None:
    """mkdir -p on the remote side."""
    parts = [p for p in remote_dir.split("/") if p]
    path = "/" if remote_dir.startswith("/") else ""
    for part in parts:
        path = posixpath.join(path, part) if path else part
        try:
            ftp.cwd(path)
        except ftplib.error_perm:
            try:
                ftp.mkd(path)
            except ftplib.error_perm:
                pass
    ftp.cwd("/")


def list_remote_files(ftp: ftplib.FTP, root: str) -> set[str]:
    """Recursively list all files under `root`. Returns paths relative to root."""
    found: set[str] = set()

    def walk(remote_dir: str) -> None:
        try:
            ftp.cwd(remote_dir)
        except ftplib.error_perm:
            return
        entries: list[tuple[str, str]] = []
        try:
            for name, facts in ftp.mlsd():
                if name in {".", ".."}:
                    continue
                entries.append((name, facts.get("type", "")))
        except (ftplib.error_perm, AttributeError):
            names: list[str] = []
            ftp.retrlines("NLST", names.append)
            for name in names:
                if name in {".", ".."}:
                    continue
                kind = "dir"
                try:
                    ftp.cwd(name)
                    ftp.cwd("..")
                except ftplib.error_perm:
                    kind = "file"
                entries.append((name, kind))
        for name, kind in entries:
            full = posixpath.join(remote_dir, name)
            if kind == "dir":
                walk(full)
            else:
                rel = posixpath.relpath(full, root)
                found.add(rel)
        ftp.cwd("/")

    walk(root)
    return found


# ── upload ───────────────────────────────────────────────────
def collect_local_files(dist: Path) -> list[Path]:
    files: list[Path] = []
    for p in dist.rglob("*"):
        if not p.is_file():
            continue
        if p.name in EXCLUDE_NAMES:
            continue
        if p.suffix in EXCLUDE_SUFFIXES:
            continue
        files.append(p)
    return files


_print_lock = threading.Lock()


def log(msg: str) -> None:
    with _print_lock:
        print(msg, flush=True)


def upload_one(env: dict[str, str], dist: Path, local: Path, remote_root: str) -> None:
    rel = local.relative_to(dist).as_posix()
    remote_path = posixpath.join(remote_root, rel)
    remote_dir = posixpath.dirname(remote_path)
    ftp = make_ftp(env)
    try:
        ensure_remote_dir(ftp, remote_dir)
        with local.open("rb") as fh:
            ftp.storbinary(f"STOR {remote_path}", fh)
        log(f"  ↑ {rel}")
    finally:
        try:
            ftp.quit()
        except Exception:
            ftp.close()


def delete_one(env: dict[str, str], remote_root: str, rel: str) -> None:
    remote_path = posixpath.join(remote_root, rel)
    ftp = make_ftp(env)
    try:
        try:
            ftp.delete(remote_path)
            log(f"  − {rel}")
        except ftplib.error_perm as exc:
            log(f"  (skip) cannot delete {rel}: {exc}")
    finally:
        try:
            ftp.quit()
        except Exception:
            ftp.close()


# ── main ─────────────────────────────────────────────────────
def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--no-build", action="store_true", help="reuse existing dist/public")
    parser.add_argument("--no-delete", action="store_true", help="do not delete stale remote files")
    parser.add_argument("--dry-run", action="store_true", help="show plan, upload nothing")
    args = parser.parse_args()

    env = load_env(ENV_FILE)

    if not args.no_build:
        print("→ Building la-table-marrakech")
        result = subprocess.run(
            ["npm", "run", "build", "--workspace=@workspace/la-table-marrakech"],
            cwd=ROOT,
        )
        if result.returncode != 0:
            sys.exit("Build failed")
    else:
        print("→ Skipping build (--no-build)")

    if not DIST_DIR.is_dir():
        sys.exit(f"Build output not found at {DIST_DIR}")

    local_files = collect_local_files(DIST_DIR)
    local_rels = {p.relative_to(DIST_DIR).as_posix() for p in local_files}
    total_bytes = sum(p.stat().st_size for p in local_files)
    print(f"→ {len(local_files)} files / {total_bytes / 1024 / 1024:.2f} MB ready in {DIST_DIR}")

    remote_root = env["HOSTINGER_REMOTE_PATH"].rstrip("/") or "/"
    print(f"→ Connecting to {env['HOSTINGER_PROTOCOL']}://{env['HOSTINGER_USER']}@{env['HOSTINGER_HOST']}:{env['HOSTINGER_PORT']}{remote_root}")

    # probe connection once with a clear error if creds are wrong
    try:
        probe = make_ftp(env)
        ensure_remote_dir(probe, remote_root)
        existing = list_remote_files(probe, remote_root) if not args.no_delete else set()
        probe.quit()
    except ftplib.error_perm as exc:
        sys.exit(f"FTP auth/permission failed: {exc}")
    except Exception as exc:
        sys.exit(f"FTP connection failed: {exc}")

    stale = sorted(existing - local_rels)
    to_upload = local_files

    print(f"→ Plan: upload {len(to_upload)} files" + (f", delete {len(stale)} stale" if not args.no_delete else ""))

    if args.dry_run:
        for p in sorted(to_upload, key=lambda p: p.relative_to(DIST_DIR).as_posix())[:30]:
            print(f"  + {p.relative_to(DIST_DIR).as_posix()}")
        if len(to_upload) > 30:
            print(f"  + … and {len(to_upload) - 30} more")
        for rel in stale[:30]:
            print(f"  − {rel}")
        print("✓ Dry-run complete (nothing was uploaded)")
        return 0

    with cf.ThreadPoolExecutor(max_workers=PARALLEL) as pool:
        list(pool.map(lambda p: upload_one(env, DIST_DIR, p, remote_root), to_upload))

    if not args.no_delete and stale:
        with cf.ThreadPoolExecutor(max_workers=PARALLEL) as pool:
            list(pool.map(lambda rel: delete_one(env, remote_root, rel), stale))

    print(f"✓ Deployed {len(to_upload)} files to https://{env['HOSTINGER_HOST'].removeprefix('ftp.')}")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        sys.exit(130)
