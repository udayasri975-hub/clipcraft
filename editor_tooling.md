# ClipCraft Video Editor Tooling

## Overview
This document describes the video editing environment and helper scripts
used by ClipCraft to turn long-form content into platform-ready short-form clips.

## Environment

### System Requirements
- **OS:** Ubuntu (sandbox)
- **ffmpeg:** 6.1.1 (installed at `/usr/bin/ffmpeg`)
- **Python:** 3.12.3 with pip
- **Whisper:** AI speech-to-text for auto-captioning (installed in `/home/team/shared/venv/`)

### ffmpeg Capabilities
- Full codec support: libx264, libx265, libvpx, libaom
- Subtitle rendering: libass, libfreetype
- Audio: libmp3lame, libopus, libvorbis
- Encoder preset: `fast` with CRF 18 for high-quality output
- Pixel format: yuv420p (broadcast-safe)
- Fast start: movflags enabled for web streaming

## Helper Scripts

### 1. `clip_extract.sh` — Clip Extraction
Extracts a segment from a video and crops to the target aspect ratio.

```bash
Usage: ./clip_extract.sh <input.mp4> <start_time> <duration> <aspect_ratio> <output.mp4>
```

**Example:**
```bash
./clip_extract.sh episode.mp4 00:23:45 45 9:16 shorts_intro.mp4
```

**Supported aspect ratios:**
| Ratio | Platform | Resolution |
|-------|----------|-----------|
| `9:16` | YouTube Shorts, Instagram Reels | 1080×1920 |
| `16:9` | YouTube, LinkedIn | 1920×1080 |
| `1:1` | Instagram square | 1080×1080 |

**What it does:**
1. Seeks to `start_time` with precise positioning (`-ss` before `-i`)
2. Extracts `duration` seconds
3. Applies crop filter for the target aspect ratio
4. Scales to standard resolution
5. Encodes with libx264 at CRF 18

### 2. `add_captions.sh` — Caption Burn-In
Burns subtitles into a video, with optional auto-transcription.

```bash
Usage: ./add_captions.sh <video.mp4> [subtitles.srt] [output.mp4]
```

**Auto-caption mode** (no SRT provided):
- Extracts audio to WAV (16kHz, mono)
- Runs OpenAI Whisper (small model) for transcription
- Generates SRT subtitle file
- Burns captions into video

**With existing SRT:**
- Uses provided SRT file
- Applies styling: Inter Bold font, white text with black outline, 40px margin from bottom

**Caption styling:**
- Font: Inter Bold, 18pt on 1080p canvas
- Colour: White (#FFFFFF) with black outline (#000000)
- Border style: 3 (outline), thickness 2
- Bottom margin: 40px

## Platform Output Specs

| Platform | Format | Resolution | Max Duration | Codec |
|----------|--------|-----------|-------------|-------|
| YouTube Shorts | MP4 | 1080×1920 (9:16) | 60s | H.264 + AAC |
| Instagram Reels | MP4 | 1080×1920 (9:16) | 90s | H.264 + AAC |
| YouTube Video | MP4 | 1920×1080 (16:9) | — | H.264 + AAC |
| LinkedIn Video | MP4 | 1920×1080 (16:9) | 10min | H.264 + AAC |

## Workflow

```
Raw video file (long-form, e.g. podcast episode)
        │
        ▼
[Content Strategist] reviews content, writes clip brief
        │ Timestamps, script outline, platform targets
        ▼
[Video Editor] uses clip_extract.sh to cut each clip
        │
        ▼
[Video Editor] uses add_captions.sh to burn subtitles
        │
        ▼
Finished clip placed in /home/team/shared/finished_clips/
```

## Directory Structure

```
/home/team/shared/
├── content_playbook.md      # Content strategist's playbook
├── brand_voice_guide.md     # Brand voice guidelines
├── clip_briefs/             # Clip briefs from strategist
│   ├── README.md
│   └── YYYY-MM-DD_Title_ClipNN.md
├── clip_extract.sh          # Clip extraction script (executable)
├── add_captions.sh          # Caption burn-in script (executable)
├── editor_tooling.md        # This file
├── finished_clips/          # Output directory for final clips
└── raw/                     # Raw long-form content
    ├── fireplace.mp4        # 12h cozy fireplace ambience (22.6MB sample)
    └── ted_stress.mp4       # TED talk on stress (29.8MB sample)

## Verified Setup (June 2025)

| Component | Status | Notes |
|-----------|--------|-------|
| ffmpeg 6.1.1 | ✅ Verified | H.264, H.265, VP9, libass subtitles, drawtext |
| Python 3.12 | ✅ Verified | pip 24.0 available |
| clip_extract.sh | ✅ Executable | Tested: 3s clip at 9:16 → 1080×1920 ✅ |
| add_captions.sh | ✅ Executable | SRT burn-in ready; whisper auto-transcription optional |
| Whisper AI | ⏳ Installing | Installs in background via pip |
| fireplace.mp4 | ✅ Available | 22.6MB sample in /home/team/shared/raw/ |
| ted_stress.mp4 | ✅ Available | 29.8MB sample in /home/team/shared/raw/ |
| Clip briefs (fireplace) | ✅ 5 briefs ready | Shorts, LinkedIn, X Thread, Log Burning, Flame Flickers |
| Clip briefs (TED stress) | ✅ 6 briefs ready | Shorts, Biology, LinkedIn, X Thread, Story, LinkedIn Belief |
```