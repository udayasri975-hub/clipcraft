import { createFileRoute } from "@tanstack/react-router";
import { Btn, Card, Container, Eyebrow, FaqList, Section, SectionHead } from "~/components/site";
import { ADDONS, PACKS } from "~/lib/content";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — ClipCraft episode repurposing" },
      {
        name: "description",
        content:
          "Single Short $79, Episode Repurpose Pack $249, Monthly Retainer $749. What's included, add-ons, revisions and what we need from you.",
      },
    ],
  }),
  component: Pricing,
});

const COMPARISON: { row: string; values: [string, string, string] }[] = [
  { row: "Captioned shorts", values: ["1", "3", "12 (3 × 4 episodes)"] },
  { row: "LinkedIn post draft", values: ["—", "1", "4"] },
  { row: "X thread (5–8 tweets)", values: ["—", "1", "4"] },
  { row: "Moment selection with timestamps", values: ["1 moment", "Full episode", "Full episodes"] },
  { row: "Burned-in captions", values: ["✓", "✓", "✓"] },
  { row: "SRT subtitle files", values: ["On request", "✓", "✓"] },
  { row: "Brand overlay (logo / handle)", values: ["✓", "✓", "✓"] },
  { row: "Revision rounds per clip", values: ["1", "1", "1"] },
  { row: "Queue priority", values: ["Standard", "Standard", "Priority"] },
  { row: "Content calendar", values: ["—", "—", "✓"] },
];

const NEED = [
  "A link or file for the episode (unlisted is fine)",
  "Your logo, if you want it on the clips",
  "Brand colours and font, if you have them",
  "Handles to tag, and any hashtags you always use",
  "Anything to avoid — topics, names, music",
];

const POLICY = [
  {
    title: "You own everything",
    body: "The content you send us stays yours, and so does every clip, post and thread we deliver. We only show your work publicly as a sample if you tell us we can.",
  },
  {
    title: "One revision round per clip",
    body: "Don't like a cut? Ask for a different moment, a tighter edit or new captions. That first round is included — most clips don't need it.",
  },
  {
    title: "Scope before work",
    body: "We confirm what you're getting and what it costs before we start. Nothing is invoiced that you didn't agree to first.",
  },
  {
    title: "Turnaround",
    body: "Our target is 24 hours from the moment we have your episode and brand assets. Long recordings with a lot of clip-worthy moments can take up to 48 hours — we'll say which when we accept the brief.",
  },
];

function Pricing() {
  return (
    <>
      <Section className="pt-14 pb-8 sm:pt-20">
        <div className="max-w-3xl">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="font-display text-4xl leading-tight font-bold tracking-tight text-cream sm:text-5xl">
            One episode, five pieces, one clear price.
          </h1>
          <p className="mt-6 text-lg text-cream/65">
            Start with a single short to test the work, or hand us the whole episode and get
            everything at once. Agencies and weekly shows move to the retainer.
          </p>
        </div>
      </Section>

      <Section className="pt-4">
        <div className="grid gap-5 lg:grid-cols-3">
          {PACKS.map((pack) => (
            <div
              key={pack.id}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                pack.featured
                  ? "border-brand bg-brand/[0.06] shadow-2xl shadow-brand/10"
                  : "border-cream/10 bg-cream/[0.03]"
              }`}
            >
              {pack.featured ? (
                <span className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-[11px] font-bold tracking-wide text-ink uppercase">
                  Most popular
                </span>
              ) : null}
              <h2 className="font-display text-xl font-semibold text-cream">{pack.name}</h2>
              <p className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-5xl font-bold text-cream">{pack.price}</span>
                <span className="text-sm text-cream/45">{pack.priceNote}</span>
              </p>
              <p className="mt-2 text-sm text-cream/50">Best for: {pack.bestFor}</p>
              <p className="mt-4 text-sm leading-relaxed text-cream/65">{pack.summary}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {pack.includes.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-cream/70">
                    <span className="mt-0.5 text-brand">✓</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs tracking-wide text-cream/40 uppercase">{pack.turnaround}</p>
              <div className="mt-5">
                <Btn to="/start" variant={pack.featured ? "primary" : "ghost"} className="w-full">
                  Start with {pack.name}
                </Btn>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-cream/40">
          All prices in USD. We confirm scope and price before any work begins.
        </p>
      </Section>

      {/* Comparison */}
      <Section className="border-y border-cream/10 bg-ink-2/40">
        <SectionHead eyebrow="Side by side" title="What's in each package." />
        <div className="overflow-x-auto rounded-2xl border border-cream/10">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="bg-cream/[0.04] text-left">
                <th className="px-5 py-4 font-medium text-cream/50">Included</th>
                {PACKS.map((pack) => (
                  <th key={pack.id} className="px-5 py-4 font-semibold text-cream">
                    {pack.name}
                    <span className="block text-xs font-normal text-brand">
                      {pack.price} {pack.priceNote}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.row} className={i % 2 ? "bg-cream/[0.02]" : ""}>
                  <td className="px-5 py-3.5 text-cream/60">{row.row}</td>
                  {row.values.map((value, j) => (
                    <td key={j} className="px-5 py-3.5 text-cream/85">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Add-ons */}
      <Section>
        <SectionHead
          eyebrow="Add-ons"
          title="Extras when the episode gives you more."
          lead="Nothing here is required. Add them when your episode, your brand or your client needs it — priced per project before we start."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {ADDONS.map((addon) => (
            <Card key={addon.name}>
              <h3 className="font-display text-lg font-semibold text-cream">{addon.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/55">{addon.detail}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* What we need + policy */}
      <Section className="border-y border-cream/10 bg-ink-2/40">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Before we start" title="What we need from you." />
            <ul className="space-y-3">
              {NEED.map((line) => (
                <li key={line} className="flex gap-3 text-sm text-cream/65">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/15 text-[11px] text-brand">
                    ✓
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-cream/45">
              Only the episode itself is truly required. Everything else shapes the styling.
            </p>
          </div>
          <div>
            <SectionHead eyebrow="How we work" title="Rights, revisions, turnaround." />
            <div className="space-y-4">
              {POLICY.map((item) => (
                <div key={item.title} className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-5">
                  <h3 className="font-medium text-cream">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/55">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHead eyebrow="Questions" title="Before you send an episode." />
        <FaqList />
      </Section>

      <Section className="pb-24">
        <Container className="rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/15 via-ink-2 to-ink-2 p-8 sm:p-12">
          <h2 className="font-display text-3xl leading-tight font-bold text-cream">
            Not sure which package fits?
          </h2>
          <p className="mt-4 max-w-2xl text-cream/65">
            Send the episode and what you're trying to grow. We'll recommend the smallest package
            that gets you there — and say so when a $79 single short is enough.
          </p>
          <div className="mt-7">
            <Btn to="/start">Send an episode brief</Btn>
          </div>
        </Container>
      </Section>
    </>
  );
}
