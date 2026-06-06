#!/bin/bash
cd /home/team/shared/raw
pip3 install yt-dlp --break-system-packages -q 2>/dev/null
yt-dlp -f "best[height<=720]" -o "fireplace.mp4" --download-sections "*0-120" --force-keyframes-at-cuts "https://www.youtube.com/watch?v=UgHKb_7884o" > /home/team/shared/raw/dl_log.txt 2>&1
echo "EXIT: $?" >> /home/team/shared/raw/dl_log.txt