#!/bin/bash
pip3 install yt-dlp --break-system-packages 2>&1 | tail -3
echo "---"
yt-dlp --version 2>&1