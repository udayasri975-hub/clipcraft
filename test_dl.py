#!/usr/bin/env python3
"""Simple yt-dlp test"""
import subprocess, json

url = "https://www.youtube.com/watch?v=UgHKb_7884o"
result = subprocess.run(["yt-dlp", "-s", "--dump-json", url], capture_output=True, text=True, timeout=30)

print(f"RC: {result.returncode}")
print(f"STDOUT: {result.stdout[:300]}")
print(f"STDERR: {result.stderr[:500]}")

if result.returncode == 0:
    d = json.loads(result.stdout)
    print(f"TITLE: {d['title']}")
    print(f"DURATION: {d['duration']}s")