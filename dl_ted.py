#!/usr/bin/env python3
"""Download TED talk: How to Make Stress Your Friend"""
import subprocess, json, os

url = "https://www.youtube.com/watch?v=RcGyVTAoXEU"
raw_dir = "/home/team/shared/raw"

subprocess.run(["pip3", "install", "yt-dlp", "--break-system-packages", "-q"], capture_output=True)

# Get info
r = subprocess.run(["yt-dlp", "-s", "--dump-json", url], capture_output=True, text=True, timeout=30)
info = json.loads(r.stdout)
title = info["title"]
duration = info["duration"]
views = info.get("view_count", 0)
print(f"Video: {title}")
print(f"Length: {duration}s ({duration//60}m)")
print(f"Views: {views:,}")

# Download at 720p
out_path = os.path.join(raw_dir, "ted_stress.mp4")
print("Downloading...")
r2 = subprocess.run([
    "yt-dlp", "-f", "best[height<=720]",
    "-o", out_path, "--no-playlist", url
], capture_output=True, text=True, timeout=600)

if os.path.exists(out_path):
    size_mb = os.path.getsize(out_path) / (1024*1024)
    print(f"✅ Downloaded: {size_mb:.1f}MB")
    # Also save transcript if available
    subprocess.run(["yt-dlp", "--write-auto-subs", "--sub-lang", "en", "--skip-download",
                    "-o", os.path.join(raw_dir, "ted_stress"), url],
                   capture_output=True, timeout=60)
else:
    print(f"❌ Failed: {r2.stderr[:300]}")