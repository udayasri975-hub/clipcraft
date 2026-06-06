#!/bin/bash
# Setup ClipCraft video tools
cd /home/team/shared

# Create directories
mkdir -p raw finished_clips

# Setup whisper in venv
python3 -m venv venv 2>/dev/null
source venv/bin/activate
pip install openai-whisper --quiet 2>&1 | tail -1

# Make scripts executable
chmod +x clip_extract.sh add_captions.sh 2>/dev/null

echo "SETUP COMPLETE"
python3 -c "import whisper; print('WHISPER OK')" 2>&1
ffmpeg -version 2>&1 | head -1