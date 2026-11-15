import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Btn, Card, Eyebrow, Section } from "~/components/site";
import { BUSINESS, PACKS, STEPS } from "~/lib/content";
import { submitLead } from "~/lib/leads";

export const Route = createFileRoute("/start")({
  head: () => ({
    meta: [
      { title: "Send an episode brief — ClipCraft" },
      {
        name: "description",
        content:
          "Tell us where your episode lives and what you want to post. We reply with the scope, the price and the day we can deliver.",
      },
    ],
  }),
  component: Start,
});

const PACKAGE_OPTIONS = [
  ...PACKS.map((pack) => `${pack.name} — ${pack.price}${pack.priceNote ? ` ${pack.priceNote}` : ""}`),
  "Not sure yet — recommend one for me",
];

const LENGTHS = ["Under 15 minutes", "15–45 minutes", "45–90 minutes", "90+ minutes"];

type Values = {
  name: string;
  email: string;
  pkg: string;
  episodeLink: string;
  episodeLength: string;
  deadline: string;
  notes: string;
};

const EMPTY: Values = {
  name: "",
  email: "",
  pkg: PACKAGE_OPTIONS[1],
  episodeLink: "",
  episodeLength: LENGTHS[1],
  deadline: "",
  notes: "",
};

type Outcome =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; reference: string }
  | { kind: "fallback"; message: string };

function Start() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [outcome, setOutcome] = useState<Outcome>({ kind: "idle" });
  const [copied, setCopied] = useState(false);

  const set = (key: keyof Values) => (event: { target: { value: string } }) =>
    setValues((current) => ({ ...current, [key]: event.target.value }));

  const summary = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Package: ${values.pkg}`,
    `Episode: ${values.episodeLink}`,
    `Length: ${values.episodeLength}`,
    values.deadline ? `Needed by: ${values.deadline}` : "",
    values.notes ? `Notes: ${values.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOutcome({ kind: "sending" });
    try {
      const result = await submitLead({ data: values });
      if (result.ok) {
        setOutcome({ kind: "sent", reference: result.reference });
      } else {
        setOutcome({ kind: "fallback", message: result.message });
      }
    } catch {
      setOutcome({
        kind: "fallback",
        message:
          "The form couldn't reach our server just now. Your details are still here — copy them below. We reply to the email you give us within one business day.",
      });
    }
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      <Section className="pt-14 pb-6 sm:pt-20">
        <div className="max-w-3xl">
          <Eyebrow>Episode brief</Eyebrow>
          <h1 className="font-display text-4xl leading-tight font-bold tracking-tight text-cream sm:text-5xl">
            Tell us about the episode.
          </h1>
          <p className="mt-5 text-lg text-cream/65">
            Two minutes here saves a week of editing. We'll come back with the scope, the price and
            the day we can deliver — and we'll say so if a smaller package does the job.
          </p>
        </div>
      </Section>

      <Section className="pt-2 pb-24">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-6 sm:p-8">
            {outcome.kind === "sent" ? (
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-full bg-brand/15 text-2xl text-brand">
                  ✓
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold text-cream">
                  Brief received — {outcome.reference}
                </h2>
                <p className="mt-3 text-cream/60">
                  It's with us. We'll email <span className="text-cream">{values.email}</span> with
                  the scope, the price and your delivery day.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Btn to="/samples" variant="ghost">
                    Browse sample work
                  </Btn>
                  <button
                    type="button"
                    onClick={() => {
                      setValues(EMPTY);
                      setOutcome({ kind: "idle" });
                    }}
                    className="text-sm font-medium text-cream/60 underline-offset-4 hover:text-cream hover:underline"
                  >
                    Send another episode
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your name" htmlFor="name">
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      value={values.name}
                      onChange={set("name")}
                      placeholder="Sam Rivera"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Email" htmlFor="email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={values.email}
                      onChange={set("email")}
                      placeholder="sam@show.com"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field label="Which package?" htmlFor="pkg">
                  <select
                    id="pkg"
                    name="pkg"
                    value={values.pkg}
                    onChange={set("pkg")}
                    className={inputClass}
                  >
                    {PACKAGE_OPTIONS.map((option) => (
                      <option key={option} value={option} className="bg-ink-2">
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Link to the episode"
                  htmlFor="episodeLink"
                  hint="YouTube, podcast RSS, Drive or Dropbox link. Type 'email' if you'd rather send the file separately."
                >
                  <input
                    id="episodeLink"
                    name="episodeLink"
                    required
                    value={values.episodeLink}
                    onChange={set("episodeLink")}
                    placeholder="https://youtube.com/watch?v=…"
                    className={inputClass}
                  />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="How long is it?" htmlFor="episodeLength">
                    <select
                      id="episodeLength"
                      name="episodeLength"
                      value={values.episodeLength}
                      onChange={set("episodeLength")}
                      className={inputClass}
                    >
                      {LENGTHS.map((option) => (
                        <option key={option} value={option} className="bg-ink-2">
                          {option}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="When do you need it?" htmlFor="deadline" hint="Optional.">
                    <input
                      id="deadline"
                      name="deadline"
                      value={values.deadline}
                      onChange={set("deadline")}
                      placeholder="Friday, or 'no rush'"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <Field
                  label="Brand notes"
                  htmlFor="notes"
                  hint="Colours, logo, handles to tag, moments you already know you want, anything to avoid."
                >
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={values.notes}
                    onChange={set("notes")}
                    placeholder="Dark theme, orange accents. Please use the clip where I talk about the 30,000-person study. Skip the intro music."
                    className={`${inputClass} resize-y`}
                  />
                </Field>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={outcome.kind === "sending"}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-ink transition hover:bg-brand-400 disabled:opacity-60"
                  >
                    {outcome.kind === "sending" ? "Sending…" : "Send episode brief"}
                  </button>
                  <p className="text-xs text-cream/40">
                    No payment now. We confirm scope and price first.
                  </p>
                </div>

                {outcome.kind === "fallback" ? (
                  <div className="rounded-xl border border-brand/30 bg-brand/[0.07] p-5">
                    <p className="text-sm text-cream/80">{outcome.message}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={copySummary}
                        className="rounded-full border border-cream/20 px-5 py-2.5 text-sm font-medium text-cream/80 hover:border-cream/40"
                      >
                        {copied ? "Copied ✓" : "Copy the details"}
                      </button>
                    </div>
                  </div>
                ) : null}
              </form>
            )}
          </div>

          <aside className="space-y-5">
            <Card>
              <h2 className="font-display text-base font-semibold text-cream">What happens next</h2>
              <ol className="mt-4 space-y-4">
                {STEPS.map((step) => (
                  <li key={step.n} className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/15 text-[11px] font-bold text-brand">
                      {step.n}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-cream">{step.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-cream/50">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
            <Card>
              <h2 className="font-display text-base font-semibold text-cream">Reply time</h2>
              <p className="mt-2 text-sm text-cream/55">
                We reply to the email you give us within one business day — with the scope, the price
                and your delivery day.
              </p>
              <p className="mt-4 text-xs text-cream/40">
                {BUSINESS.handle} · Shorts, Reels, LinkedIn and X from one recording.
              </p>
            </Card>
          </aside>
        </div>
      </Section>
    </>
  );
}

const inputClass =
  "w-full rounded-xl border border-cream/15 bg-ink-2 px-4 py-3 text-sm text-cream placeholder:text-cream/25 transition focus:border-brand/60 focus:outline-none";

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-cream/80">
        {label}
      </label>
      {children}
      {hint ? <p className="mt-1.5 text-xs leading-relaxed text-cream/35">{hint}</p> : null}
    </div>
  );
}
