#!/usr/bin/env python3
"""Force download TED talk by writing result to file"""
import subprocess, json, os, sys

url = "https://www.youtube.com/watch?v=RcGyVTAoXEU"
raw_dir = "/home/team/shared/raw"
log = "/home/team/shared/raw/ted_dl_log.txt"

def log_msg(msg):
    with open(log, "a") as f:
        f.write(msg + "\n")
    print(msg)

log_msg("=== Starting download ===")

subprocess.run(["pip3", "install", "yt-dlp", "--break-system-packages", "-q"], capture_output=True)

# Get info
r = subprocess.run(["yt-dlp", "-s", "--dump-json", url], capture_output=True, text=True, timeout=30)
if r.returncode != 0:
    log_msg(f"INFO FAILED: {r.stderr[:300]}")
    sys.exit(1)

info = json.loads(r.stdout)
log_msg(f"Video: {info['title']} ({info['duration']}s, {info.get('view_count',0):,} views)")

# Download
out = os.path.join(raw_dir, "ted_stress.mp4")
log_msg("Downloading...")
r2 = subprocess.run([
    "yt-dlp", "-f", "best[height<=720]",
    "-o", out, "--no-playlist", url
], capture_output=True, text=True, timeout=600)

if os.path.exists(out):
    log_msg(f"✅ SUCCESS: {os.path.getsize(out)//1024}KB ({os.path.getsize(out)/(1024*1024):.1f}MB)")
else:
    # Try with different format
    log_msg(f"First attempt failed, retrying...")
    r3 = subprocess.run([
        "yt-dlp",
        "-o", out, "--no-playlist", url
    ], capture_output=True, text=True, timeout=600)
    if os.path.exists(out):
        log_msg(f"✅ SUCCESS (retry): {os.path.getsize(out)//1024}KB")
    else:
        log_msg(f"❌ FAILED: {r2.stderr[:200]} | {r3.stderr[:200]}")

log_msg(f"=== Download complete ===")
print("DONE - check ted_dl_log.txt")