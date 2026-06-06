#!/usr/bin/env python3
"""Download YouTube video for ClipCraft processing"""
import subprocess, json, sys, os

url = "https://www.youtube.com/watch?v=UgHKb_7884o"

# Install yt-dlp
subprocess.run(["pip3", "install", "yt-dlp", "--break-system-packages", "-q"], capture_output=True)

# Get info
r = subprocess.run(["yt-dlp", "-s", "--dump-json", url], capture_output=True, text=True, timeout=30)
info = json.loads(r.stdout)
title = info["title"]
duration = info["duration"]
views = info.get("view_count", "N/A")

with open("/home/team/shared/raw/video_info.txt", "w") as f:
    f.write(f"Title: {title}\nDuration: {duration}s ({duration//60}m{duration%60}s)\nViews: {views:,}\nURL: {url}\n")

print(f"TITLE: {title}")
print(f"DURATION: {duration}s ({duration//60}m{duration%60}s)")
print(f"VIEWS: {views:,}")
print("---")

# Download at 720p max
print("Downloading (720p max)...")
r2 = subprocess.run([
    "yt-dlp", "-f", "best[height<=720]",
    "-o", "/home/team/shared/raw/%(title)s.%(ext)s",
    "--no-playlist", url
], capture_output=True, text=True, timeout=600)

if r2.returncode == 0:
    for f in os.listdir("/home/team/shared/raw/"):
        if f.endswith((".mp4", ".mkv", ".webm")):
            size_mb = os.path.getsize(os.path.join("/home/team/shared/raw/", f)) / (1024*1024)
            print(f"DONE: {f} ({size_mb:.1f}MB)")
else:
    print(f"ERROR: {r2.stderr[:500]}")