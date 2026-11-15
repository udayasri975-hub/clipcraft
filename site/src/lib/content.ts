/**
 * Single source of truth for storefront copy.
 *
 * Prices and offers mirror the team's business plan (Episode Repurpose Pack
 * $249 / Single Short $79 / Monthly retainer $749). Older shared docs
 * (CLIPCRAFT_SERVICES.md, README.md) quote a superseded $149 / $497 / $1,497
 * ladder — the business plan wins, do not copy prices from those files.
 */

export const BUSINESS = {
  name: "ClipCraft",
  tagline: "One recording in. A week of content out.",
  handle: "@clipcraft",
  turnaround: "24-hour target turnaround",
};

export type Pack = {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  bestFor: string;
  summary: string;
  includes: string[];
  featured?: boolean;
  turnaround: string;
};

export const PACKS: Pack[] = [
  {
    id: "single",
    name: "Single Short",
    price: "$79",
    priceNote: "per clip",
    bestFor: "One moment you already know is good",
    summary:
      "One captioned, branded short for any single platform — cut from your episode and export-ready.",
    includes: [
      "1 clip cut at the moment you pick (or the one we recommend)",
      "9:16 vertical crop, or 1:1 / 16:9 on request",
      "Burned-in captions with your brand colours",
      "Logo or handle overlay",
      "Export sized for YouTube Shorts, Instagram Reels, TikTok or LinkedIn",
    ],
    turnaround: "24-hour target",
  },
  {
    id: "pack",
    name: "Episode Repurpose Pack",
    price: "$249",
    priceNote: "per episode",
    bestFor: "Podcasters, founders and coaches publishing weekly",
    summary:
      "One long recording becomes five postable pieces: three captioned shorts, a LinkedIn post and an X thread.",
    includes: [
      "3 captioned, branded shorts (split across YouTube Shorts, Instagram Reels and LinkedIn video as you like)",
      "1 LinkedIn post drafted to match the clip you attach",
      "1 X thread, 5–8 tweets, one idea per tweet",
      "Moment selection with timestamps — we watch the whole episode so you don't",
      "Captions styled to your brand, plus SRT files for your own uploads",
      "Everything delivered in one folder, named and ready to post",
    ],
    featured: true,
    turnaround: "24-hour target",
  },
  {
    id: "retainer",
    name: "Monthly Retainer",
    price: "$749",
    priceNote: "per month",
    bestFor: "Shows shipping every week",
    summary:
      "Four episodes repurposed every month — 12 shorts, 4 LinkedIn posts and 4 X threads on a fixed schedule.",
    includes: [
      "4 episodes repurposed per month (the full pack, every time)",
      "Priority queue — your episodes jump ahead of one-off bookings",
      "Consistent caption styling and overlays across every episode",
      "Rolling content calendar so you always know what posts when",
      "Monthly recap of what shipped and which pieces performed best",
    ],
    turnaround: "Scheduled slots",
  },
];

export const ADDONS = [
  {
    name: "Caption pack & SRT files",
    detail:
      "Clean, punctuated captions for clips we cut, plus standalone SRT files for anything you upload yourself.",
  },
  {
    name: "Custom branding kit",
    detail:
      "We build your caption style once — font, colours, logo sting, lower-third — and reuse it on every future episode.",
  },
  {
    name: "Extra shorts",
    detail:
      "Long episode with more than three clip-worthy moments? Add shorts to any pack at a per-clip rate.",
  },
  {
    name: "White-label for agencies",
    detail:
      "Volume repurposing delivered under your studio's name. Tell us your monthly episode count and we'll quote.",
  },
];

export const STEPS = [
  {
    n: "01",
    title: "Send one link",
    body: "A YouTube URL, a podcast RSS feed, a Drive link or the raw file. Unlisted and rough-cut episodes are fine.",
  },
  {
    n: "02",
    title: "We watch the whole thing",
    body: "We pull the quotable lines, hot takes, teaching moments and story beats — then send you the timestamps we're cutting.",
  },
  {
    n: "03",
    title: "We cut, caption, brand",
    body: "Vertical crops, burned-in captions, your colours and logo, correct lengths and aspect ratios for each platform.",
  },
  {
    n: "04",
    title: "You post",
    body: "Files land in one folder with the written posts alongside them. Download, upload, done.",
  },
];

export const DELIVERABLES = [
  {
    format: "YouTube Shorts",
    spec: "9:16 · 1080×1920 · up to 60s",
    detail: "Hook in the first three seconds, captions burned in, looped ending.",
  },
  {
    format: "Instagram Reels",
    spec: "9:16 · 1080×1920 · up to 90s",
    detail: "Reels-native pacing and caption placement clear of the UI.",
  },
  {
    format: "LinkedIn post",
    spec: "900–1200 characters",
    detail: "A written post built around the clip you attach, hook on line one.",
  },
  {
    format: "X thread",
    spec: "5–8 tweets",
    detail: "One idea per tweet, with the clip attached to the opener.",
  },
];

export const SAMPLE_WORK = [
  {
    title: "Everything you know about stress is wrong",
    source: "TED-style talk — Kelly McGonigal",
    platform: "YouTube Shorts · Instagram Reels",
    category: "Hot take / Educational",
    length: "55s",
    spec: "9:16 · 1080×1920 · burned-in captions",
    why: "The counterintuitive stat is the hook: a 30,000-person study, then the reversal. Statistic on screen, reveal held to the last beat.",
  },
  {
    title: "The biology of courage",
    source: "TED-style talk — Kelly McGonigal",
    platform: "Instagram Reels · YouTube Shorts",
    category: "Educational insight",
    length: "55s",
    spec: "9:16 · 1080×1920 · burned-in captions",
    why: "Reframes the racing heart as a performance resource. Clean two-beat structure: the sensation, then the reframe.",
  },
  {
    title: "The nursing home story",
    source: "TED-style talk — Kelly McGonigal",
    platform: "YouTube Shorts · LinkedIn",
    category: "Storytelling beat",
    length: "55s",
    spec: "9:16 · 1080×1920 · burned-in captions",
    why: "A story clip with no stat in sight — proof the format works for narrative episodes, not just listicles.",
  },
  {
    title: "It's okay to slow down",
    source: "Ambience footage — 12-hour fireplace video",
    platform: "YouTube Shorts · Instagram Reels",
    category: "Aesthetic / Mood",
    length: "25s",
    spec: "9:16 · 1080×1920 · text overlays",
    why: "No spoken word at all. Warm grade, soft vignette and three lines of type carrying the whole clip.",
  },
  {
    title: "The art of slow combustion",
    source: "Ambience footage — 12-hour fireplace video",
    platform: "Instagram Reels",
    category: "Macro detail",
    length: "22s",
    spec: "9:16 · 1080×1920 · text overlays",
    why: "A single macro shot held for the full clip. Proof that a tight visual loop can carry a post on its own.",
  },
  {
    title: "The dance of fire",
    source: "Ambience footage — 12-hour fireplace video",
    platform: "YouTube Shorts · X · LinkedIn",
    category: "Cinematic abstract",
    length: "22s",
    spec: "9:16 · 1080×1920 · text overlays",
    why: "One clip, three platforms: vertical for Shorts, attachment-sized for X and LinkedIn.",
  },
];

export const FAQS = [
  {
    q: "How fast do I get my clips?",
    a: "Our target is 24 hours from the moment we have your episode and your brand assets. A three-hour recording with a lot of clip-worthy moments can take up to 48 hours — we'll tell you which before we start.",
  },
  {
    q: "What do you need from me to start?",
    a: "A link or file for the episode, your logo (if you want one on the clips), your brand colours and font if you have them, and any handles to tag. If you don't have brand assets, we'll use a clean default style and you can keep or change it after you see the first cut.",
  },
  {
    q: "Do I have to send the raw video file?",
    a: "No. A YouTube link or podcast RSS feed is enough. If your episode is unlisted, a Drive, Dropbox or WeTransfer link works.",
  },
  {
    q: "What if I don't like a clip?",
    a: "Every clip includes one round of revisions — a different moment, a tighter cut, different captions. Tell us what's off and we'll re-cut it.",
  },
  {
    q: "Who owns the clips?",
    a: "You do. You own the content you send us and everything we deliver from it. We only show your work as a sample if you say yes.",
  },
  {
    q: "Do you work with agencies?",
    a: "Yes. White-label repurposing under your studio's name, at volume. Tell us your monthly episode count and we'll quote per episode.",
  },
  {
    q: "How does payment work?",
    a: "We confirm scope and price before we start, then invoice for the work. Send your episode through the brief form and we'll come back with the price and next steps.",
  },
  {
    q: "Which platforms do you produce for?",
    a: "YouTube Shorts, Instagram Reels, TikTok, LinkedIn (video post and written post) and X threads. Same episode, cut for each.",
  },
];
