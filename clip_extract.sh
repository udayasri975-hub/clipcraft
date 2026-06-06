#!/bin/bash
# ClipCraft - Clip Extraction Script
# Usage: ./clip_extract.sh <input.mp4> <start_time> <duration> <aspect_ratio> <output.mp4>
# Example: ./clip_extract.sh episode.mp4 00:23:45 45 9:16 clip.mp4

set -e

INPUT="$1"
START="$2"
DURATION="$3"
ASPECT="$4"
OUTPUT="$5"

if [ -z "$INPUT" ] || [ -z "$START" ] || [ -z "$DURATION" ] || [ -z "$ASPECT" ] || [ -z "$OUTPUT" ]; then
    echo "Usage: $0 <input.mp4> <start_time> <duration> <aspect_ratio> <output.mp4>"
    echo "Example: $0 episode.mp4 00:23:45 45 9:16 clip.mp4"
    echo ""
    echo "Supported aspect ratios:"
    echo "  9:16  - YouTube Shorts / Instagram Reels (portrait)"
    echo "  16:9  - YouTube / LinkedIn (landscape)"
    echo "  1:1   - Instagram square"
    exit 1
fi

# Determine filter based on aspect ratio
case "$ASPECT" in
    9:16)
        # Portrait - crop to 9:16 from center
        FILTER="crop=ih*9/16:ih,scale=1080:1920"
        ;;
    16:9)
        # Landscape - crop to 16:9 from center
        FILTER="crop=iw:iw*9/16,scale=1920:1080"
        ;;
    1:1)
        # Square - crop to 1:1 from center
        FILTER="crop=min(iw,ih):min(iw,ih),scale=1080:1080"
        ;;
    *)
        echo "Unsupported aspect ratio: $ASPECT"
        echo "Use: 9:16, 16:9, or 1:1"
        exit 1
        ;;
esac

echo "🎬 Extracting clip: $START for ${DURATION}s at ${ASPECT}..."
echo "   Input: $INPUT"
echo "   Output: $OUTPUT"

# Extract clip with precise seeking, aspect ratio crop, and high-quality encoding
ffmpeg -y -ss "$START" -i "$INPUT" -t "$DURATION" \
    -vf "$FILTER" \
    -c:v libx264 -preset fast -crf 18 \
    -c:a aac -b:a 128k \
    -pix_fmt yuv420p \
    -movflags +faststart \
    "$OUTPUT" 2>&1

echo "✅ Done: $OUTPUT"
echo "   Duration: ${DURATION}s | Aspect: ${ASPECT}"

# Show file info
ffprobe -v quiet -print_format json -show_format -show_streams "$OUTPUT" 2>&1 | python3 -c "
import json, sys
d = json.load(sys.stdin)
fmt = d.get('format', {})
print(f'   Size: {int(fmt.get(\"size\", 0)) // 1024}KB')
print(f'   Bitrate: {int(fmt.get(\"bit_rate\", 0)) // 1000}kbps')
for s in d.get('streams', []):
    if s['codec_type'] == 'video':
        print(f'   Video: {s[\"width\"]}x{s[\"height\"]} @ {s.get(\"r_frame_rate\", \"?\")}fps')
" 2>/dev/null || true