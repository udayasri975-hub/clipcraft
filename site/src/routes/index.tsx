import { createFileRoute } from "@tanstack/react-router";
import { Btn, Card, ClipMock, Container, Eyebrow, FaqList, Section, SectionHead } from "~/components/site";
import { BUSINESS, DELIVERABLES, PACKS, SAMPLE_WORK, STEPS } from "~/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClipCraft — one recording in, a week of content out" },
      {
        name: "description",
        content:
          "Turn a podcast or long video into captioned YouTube Shorts, Instagram Reels, a LinkedIn post and an X thread. $249 per episode. 24-hour target turnaround.",
      },
    ],
  }),
  component: Home,
});

const STATS = [
  { value: "24h", label: "target turnaround" },
  { value: "5", label: "pieces per episode" },
  { value: "4", label: "platforms covered" },
  { value: "9:16", label: "1080×1920 exports" },
];

const PROBLEMS = [
  {
    title: "The 12 hours you don't have",
    body: "A 45-minute episode holds eight or ten postable moments. Finding them, cutting them, captioning them and resizing them for four platforms is a full working day — per episode.",
  },
  {
    title: "Every platform wants a different cut",
    body: "A vertical 60-second short is not a LinkedIn post. A thread is not a Reel. One export does not fit four feeds, so most episodes get one post and disappear.",
  },
  {
    title: "Your best line is at minute 34",
    body: "The strongest 40 seconds of the conversation sits where nobody scrolls to. Without an edit, the moment that would have travelled stays buried in the long version.",
  },
];

const WHO = [
  {
    title: "Podcasters & creators",
    body: "You already publish long-form weekly. Shorts are the part that never gets done.",
  },
  {
    title: "Founders, coaches & consultants",
    body: "One recording session should feed your audience for a fortnight, not one post.",
  },
  {
    title: "Agencies & studios",
    body: "White-label repurposing at volume, delivered under your name on your schedule.",
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-14 pb-10 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Eyebrow>Short-form production studio</Eyebrow>
            <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-cream sm:text-5xl lg:text-6xl">
              One recording in.
              <br />
              <span className="text-brand">A week of content</span> out.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/65">
              Send us your podcast or long video. We cut the moments worth sharing, caption them,
              brand them, and hand back captioned shorts for YouTube and Instagram, a LinkedIn post
              and an X thread — sized for each platform and ready to publish.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Btn to="/start">Start an Episode Pack — $249</Btn>
              <Btn to="/samples" variant="ghost">
                See sample work
              </Btn>
            </div>
            <p className="mt-4 text-sm text-cream/40">
              Priced per episode. No subscription required to start. We confirm scope and price
              before any work begins.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <ClipMock
              hook="Everything you know about stress is wrong."
              caption="People who were stressed but didn't believe stress was harmful had the lowest risk of all."
              platform="Shorts"
              length="0:55"
            />
          </div>
        </div>
      </Section>

      {/* Stats */}
      <div className="border-y border-cream/10 bg-ink-2/60">
        <Container className="grid grid-cols-2 divide-cream/10 sm:grid-cols-4 sm:divide-x">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-2 py-6 text-center sm:py-7">
              <p className="font-display text-2xl font-bold text-brand sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-cream/50 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </Container>
      </div>

      {/* Problem */}
      <Section>
        <SectionHead
          eyebrow="The bottleneck"
          title="You already have the content. What's missing is the edit."
          lead="Repurposing isn't a creative problem for most creators — it's four hours of cutting, captioning and resizing on top of everything else you already do. That's the work we take off your desk."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((item, i) => (
            <Card key={item.title}>
              <span className="font-display text-sm font-bold text-brand/70">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-cream">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/55">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section id="how" className="border-y border-cream/10 bg-ink-2/40">
        <SectionHead
          eyebrow="How it works"
          title="Four steps, and only the first one is yours."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="relative rounded-2xl border border-cream/10 bg-cream/[0.03] p-6"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand font-display text-sm font-bold text-ink">
                {step.n}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-cream">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/55">{step.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-cream/50">
          <span className="font-medium text-cream/80">Works with:</span>
          {["YouTube links", "Podcast RSS", "Google Drive", "Dropbox", "Raw MP4 / MOV / WAV"].map(
            (tool) => (
              <span key={tool} className="rounded-full border border-cream/15 px-3 py-1">
                {tool}
              </span>
            )
          )}
        </div>
      </Section>

      {/* Deliverables */}
      <Section id="deliverables">
        <SectionHead
          eyebrow="What you get back"
          title="Five pieces from one episode, each built for its platform."
          lead="Nothing is a re-export with a different file name. Lengths, framing, caption placement and written copy change per platform."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {DELIVERABLES.map((item) => (
            <Card key={item.format} className="flex flex-col">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-cream">{item.format}</h3>
                <span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-medium text-brand">
                  {item.spec}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-cream/55">{item.detail}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-cream/40">
          Every clip ships with burned-in captions and your logo or handle. SRT files included on the
          Episode Pack.
        </p>
      </Section>

      {/* Who it's for */}
      <Section className="border-y border-cream/10 bg-ink-2/40">
        <SectionHead eyebrow="Who it's for" title="Built for people whose episode is already recorded." />
        <div className="grid gap-5 md:grid-cols-3">
          {WHO.map((item) => (
            <Card key={item.title}>
              <h3 className="font-display text-lg font-semibold text-cream">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/55">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section>
        <SectionHead
          eyebrow="Pricing"
          title="Per episode, or monthly if you publish weekly."
          lead="No setup fee, no minimum term. The price you see is the price we confirm before we start."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {PACKS.map((pack) => (
            <div
              key={pack.id}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                pack.featured
                  ? "border-brand bg-brand/[0.06] shadow-2xl shadow-brand/10"
                  : "border-cream/10 bg-cream/[0.03]"
              }`}
            >
              {pack.featured ? (
                <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-[11px] font-bold tracking-wide text-ink uppercase">
                  Most popular
                </span>
              ) : null}
              <h3 className="font-display text-lg font-semibold text-cream">{pack.name}</h3>
              <p className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-cream">{pack.price}</span>
                <span className="text-sm text-cream/45">{pack.priceNote}</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cream/55">{pack.summary}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {pack.includes.slice(0, 4).map((line) => (
                  <li key={line} className="flex gap-2.5 text-sm text-cream/65">
                    <span className="mt-0.5 text-brand">✓</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Btn
                  to="/start"
                  variant={pack.featured ? "primary" : "ghost"}
                  className="w-full"
                >
                  Start with {pack.name}
                </Btn>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Btn to="/pricing" variant="quiet">
            Compare every package →
          </Btn>
        </div>
      </Section>

      {/* Samples */}
      <Section className="border-y border-cream/10 bg-ink-2/40">
        <SectionHead
          eyebrow="Sample work"
          title="Six pieces produced in-house to prove the format."
          lead="We built these from public long-form videos before taking on client episodes. Same process, same output you'd get."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {SAMPLE_WORK.slice(0, 3).map((sample) => (
            <Card key={sample.title} className="flex flex-col">
              <p className="text-xs font-medium tracking-wide text-brand uppercase">
                {sample.platform}
              </p>
              <h3 className="mt-2 font-display text-base font-semibold text-cream">
                {sample.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/55">{sample.why}</p>
              <p className="mt-4 text-xs text-cream/40">
                {sample.length} · {sample.spec}
              </p>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Btn to="/samples" variant="ghost">
            See all six samples
          </Btn>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <SectionHead eyebrow="Questions" title="The things people ask before episode one." />
        <FaqList />
      </Section>

      {/* Final CTA */}
      <Section className="pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/15 via-ink-2 to-ink-2 p-8 sm:p-12">
          <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-brand/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl leading-tight font-bold text-cream sm:text-4xl">
              Send one episode. See what comes back.
            </h2>
            <p className="mt-4 text-cream/65">
              Tell us where your episode lives and what you want to post. We'll reply with the scope,
              the price and the day we can deliver.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Btn to="/start">Send an episode brief</Btn>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
