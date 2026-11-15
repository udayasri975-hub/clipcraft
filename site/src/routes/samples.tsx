import { createFileRoute } from "@tanstack/react-router";
import { Btn, Card, Eyebrow, Section, SectionHead } from "~/components/site";
import { SAMPLE_WORK } from "~/lib/content";

export const Route = createFileRoute("/samples")({
  head: () => ({
    meta: [
      { title: "Sample work — ClipCraft short-form production" },
      {
        name: "description",
        content:
          "Six shorts produced in-house by ClipCraft: two source episodes, four platforms, with the specs and the editorial reasoning behind each cut.",
      },
    ],
  }),
  component: Samples,
});

const SOURCES = [
  {
    name: "A TED-style talk on stress",
    detail:
      "A 14-minute spoken-word talk. Three shorts cut from it: a hot take, an educational reframe and a story beat — one source, three different angles.",
  },
  {
    name: "A 12-hour ambience video",
    detail:
      "Footage with no spoken word at all. Three text-overlay clips proving the same process works for mood and visual content, not just talking heads.",
  },
];

function Samples() {
  return (
    <>
      <Section className="pt-14 pb-8 sm:pt-20">
        <div className="max-w-3xl">
          <Eyebrow>Sample work</Eyebrow>
          <h1 className="font-display text-4xl leading-tight font-bold tracking-tight text-cream sm:text-5xl">
            Six pieces, two source episodes, four platforms.
          </h1>
          <p className="mt-6 text-lg text-cream/65">
            These are production samples we built in-house to demonstrate the format — not client
            engagements. Two public long-form videos went through the same pipeline your episode
            would: moment selection, cutting, captions, branding, platform exports.
          </p>
          <div className="mt-6 rounded-2xl border border-cream/10 bg-cream/[0.03] p-5 text-sm text-cream/55">
            Source videos belong to their original creators; we use them only to show the format of
            the work. Client clips are shown privately, with permission, on request.
          </div>
        </div>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_WORK.map((sample, i) => (
            <Card key={sample.title} className="flex flex-col">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold text-brand/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full border border-cream/15 px-3 py-1 text-[11px] text-cream/60">
                  {sample.category}
                </span>
              </div>
              <h2 className="mt-4 font-display text-lg leading-snug font-semibold text-cream">
                {sample.title}
              </h2>
              <p className="mt-1 text-xs text-cream/40">{sample.source}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-cream/60">{sample.why}</p>
              <dl className="mt-5 space-y-1.5 border-t border-cream/10 pt-4 text-xs text-cream/45">
                <div className="flex justify-between gap-3">
                  <dt>Platforms</dt>
                  <dd className="text-right text-cream/70">{sample.platform}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Length</dt>
                  <dd className="text-right text-cream/70">{sample.length}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Export</dt>
                  <dd className="text-right text-cream/70">{sample.spec}</dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-y border-cream/10 bg-ink-2/40">
        <SectionHead
          eyebrow="Where they came from"
          title="Two very different source episodes."
          lead="Repurposing is not only for interview shows. The same process handles spoken-word talks and silent visual footage."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {SOURCES.map((source) => (
            <Card key={source.name}>
              <h3 className="font-display text-lg font-semibold text-cream">{source.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/55">{source.detail}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-cream/40">
          Want the clips themselves? Ask and we'll send the sample pack — they're large files, so we
          share them by link rather than on the page.
        </p>
      </Section>

      <Section className="pb-24">
        <div className="rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/15 via-ink-2 to-ink-2 p-8 sm:p-12">
          <h2 className="font-display text-3xl leading-tight font-bold text-cream">
            Your episode, through the same pipeline.
          </h2>
          <p className="mt-4 max-w-2xl text-cream/65">
            Send a link and the moments you'd like us to prioritise. We'll watch the whole thing and
            come back with the timestamps we'd cut.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Btn to="/start">Send an episode brief</Btn>
            <Btn to="/pricing" variant="ghost">
              See pricing
            </Btn>
          </div>
        </div>
      </Section>
    </>
  );
}
