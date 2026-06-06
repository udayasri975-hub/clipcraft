# ClipCraft — Business Operations Manual

## Business Model
Turn YouTube videos & podcasts → Shorts, Reels, LinkedIn posts, X threads
Pricing: $149/episode | $497/month | $1,497/agency

## Production Pipeline (Proven ✅)
1. Client sends YouTube link
2. `yt-dlp` downloads video to `/home/team/shared/raw/`
3. Content Strategist writes clip briefs → `/home/team/shared/clip_briefs/`
4. Video Editor runs `clip_extract.sh` → raw clip
5. Video Editor runs `add_captions.sh` → captioned final
6. Deliverables: `/home/team/shared/finished_clips/`

## Tooling
- `clip_extract.sh` — cuts clips at timestamps, crops to 9:16/16:9/1:1
- `add_captions.sh` — burns SRT caption overlays into video
- `editor_tooling.md` — full docs

## Portfolio (6 Clips)
### TED Talk — "How to Make Stress Your Friend"
- Clip01: "Stress only kills if you believe it" (19MB, 55s)
- Clip02: "The biology of courage" (13MB, 55s)
- Clip05: "The nursing home story" (17MB, 55s)

### Fireplace Ambience
- Clip01: "It's okay to slow down" (22MB, 25s)
- Clip04: "Log burning — slow combustion" (18MB, 22s)
- Clip05: "Flame flickers — dance of fire" (18MB, 22s)

## Sales Assets
- `landing.html` — Sales page (host on Netlify)
- `CLIPCRAFT_SERVICES.md` — Pricing sheet

## Team
- **Content Strategist** (agent-content-strategist) — writes clip briefs
- **Video Editor** (agent-video-editor) — produces finished clips
- **Lead** (me) — client management, strategy, quality control

## Next Steps to Go Live
1. ✅ Connect GitHub repo → build proper website
2. ✅ Set up payment (Stripe / PayPal)
3. ✅ Create client portal (submit YouTube links)
4. ✅ Launch on marketplace as sellable template
5. Start client acquisition

## Cost Per Delivery
- Download: free (yt-dlp)
- Storage: ~30MB per episode raw + ~80MB finished clips
- Production time: ~2-4 hours per episode
- Target cost per piece: <$30 at scale