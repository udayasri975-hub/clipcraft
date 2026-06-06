#!/bin/bash
# ClipCraft - Caption/Subtitle Burn-In Script
# Usage: ./add_captions.sh <video.mp4> <subtitles.srt> <output.mp4>
# If no SRT is provided, auto-generates one using whisper
# Example: ./add_captions.sh clip.mp4 captions.srt clip_captioned.mp4

set -e

INPUT="$1"
SRT="$2"
OUTPUT="$3"

if [ -z "$INPUT" ]; then
    echo "Usage: $0 <video.mp4> [subtitles.srt] [output.mp4]"
    echo ""
    echo "  If subtitles.srt is omitted, auto-generates captions from audio."
    echo "  If output.mp4 is omitted, appends '_captioned' to input filename."
    exit 1
fi

if [ -z "$OUTPUT" ]; then
    BASENAME="${INPUT%.*}"
    OUTPUT="${BASENAME}_captioned.mp4"
fi

# Auto-generate subtitles if not provided
if [ -z "$SRT" ] || [ ! -f "$SRT" ]; then
    echo "🎤 No SRT provided. Auto-generating captions with whisper..."
    
    # Check if whisper is available (venv or system)
    WHISPER_CMD=""
    if command -v whisper &>/dev/null; then
        WHISPER_CMD="whisper"
    elif [ -f "/home/team/shared/venv/bin/whisper" ]; then
        WHISPER_CMD="/home/team/shared/venv/bin/whisper"
    else
        echo "❌ Whisper not found. Install with: pip install openai-whisper"
        echo "   Falling back to ffmpeg raw caption style (no transcription)..."
        # Fallback: just burn empty captions
        SRT=""
    fi
    
    if [ -n "$WHISPER_CMD" ]; then
        echo "   Transcribing: $INPUT"
        # Extract audio first for faster processing
        AUDIO_TMP="/tmp/clipcraft_audio_$$.wav"
        ffmpeg -y -i "$INPUT" -vn -acodec pcm_s16le -ar 16000 -ac 1 "$AUDIO_TMP" 2>&1 | tail -1
        
        # Run whisper (small model for speed)
        $WHISPER_CMD "$AUDIO_TMP" --model small --output_format srt --output_dir /tmp/ 2>&1 | tail -3
        
        SRT_BASE=$(basename "$AUDIO_TMP" .wav)
        SRT="/tmp/${SRT_BASE}.srt"
        rm -f "$AUDIO_TMP"
        echo "   Captions generated: $SRT"
    fi
fi

echo "💬 Burning captions into video..."
echo "   Input: $INPUT"
echo "   Output: $OUTPUT"

if [ -n "$SRT" ] && [ -f "$SRT" ]; then
    # Burn subtitles with styling
    ffmpeg -y -i "$INPUT" \
        -vf "subtitles='$SRT':force_style='FontName=Inter Bold,FontSize=18,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BorderStyle=3,OutlineSize=2,Shadow=0,MarginV=40'" \
        -c:v libx264 -preset fast -crf 18 \
        -c:a aac -b:a 128k \
        -pix_fmt yuv420p \
        -movflags +faststart \
        "$OUTPUT" 2>&1 | tail -5
else
    # Fallback: just copy with no caption processing
    ffmpeg -y -i "$INPUT" -c copy "$OUTPUT" 2>&1 | tail -3
fi

echo "✅ Done: $OUTPUT"