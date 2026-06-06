#!/usr/bin/env python3
"""Download a short segment from the fireplace video"""
import subprocess, json, os

url = "https://www.youtube.com/watch?v=UgHKb_7884o"
raw_dir = "/home/team/shared/raw"

subprocess.run(["pip3", "install", "yt-dlp", "--break-system-packages", "-q"], capture_output=True)

# Get video info
r = subprocess.run(["yt-dlp", "-s", "--dump-json", url], capture_output=True, text=True, timeout=30)
info = json.loads(r.stdout)
title = info["title"]
duration = info["duration"]
views = info.get("view_count", 0)

with open(os.path.join(raw_dir, "video_info.txt"), "w") as f:
    f.write(f"Title: {title}\nDuration: {duration}s\nViews: {views}\n")

print(f"Video: {title}")
print(f"Length: {duration}s ({duration//3600}h {(duration%3600)//60}m)")
print(f"Views: {views:,}")

# Download just 5 minutes for sampling (enough for multiple clips)
# Use best quality since it's a cozy/visual video
print("Downloading 5min sample...")
out_path = os.path.join(raw_dir, "fireplace_sample.mp4")
r2 = subprocess.run([
    "yt-dlp", "-f", "best[height<=1080]",
    "--download-sections", "*0-300",  # first 5 minutes
    "--force-keyframes-at-cuts",
    "-o", out_path,
    "--no-playlist", url
], capture_output=True, text=True, timeout=600)

if r2.returncode == 0 and os.path.exists(out_path):
    size_mb = os.path.getsize(out_path) / (1024*1024)
    print(f"DONE: {size_mb:.1f}MB downloaded to {out_path}")
else:
    # Fallback: try full download with shorter section
    print(f"Trying alternative approach...")
    r3 = subprocess.run([
        "yt-dlp", "-f", "best[height<=720]",
        "-o", out_path,
        "--no-playlist", url
    ], capture_output=True, text=True, timeout=600)
    if r3.returncode == 0 and os.path.exists(out_path):
        size_mb = os.path.getsize(out_path) / (1024*1024)
        print(f"DONE: {size_mb:.1f}MB downloaded")
    else:
        print(f"Error: {r2.stderr[:300]}")

# List what we have
for f in os.listdir(raw_dir):
    fp = os.path.join(raw_dir, f)
    if os.path.isfile(fp):
        print(f"  {f} ({os.path.getsize(fp)//1024}KB)")

print("DONE")