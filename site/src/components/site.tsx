import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BUSINESS, FAQS } from "~/lib/content";

/** Shared chrome and primitives for every page. */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-brand uppercase">{children}</p>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  const alignment = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl";
  return (
    <div className={`${alignment} mb-12`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="font-display text-3xl leading-tight font-bold text-cream sm:text-4xl">
        {title}
      </h2>
      {lead ? <p className="mt-4 text-base text-cream/60 sm:text-lg">{lead}</p> : null}
    </div>
  );
}

type BtnProps = {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "quiet";
  className?: string;
};

export function Btn({ to, href, children, variant = "primary", className = "" }: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition";
  const styles = {
    primary: "bg-brand text-ink hover:bg-brand-400 shadow-lg shadow-brand/20",
    ghost: "border border-cream/20 text-cream hover:border-cream/40 hover:bg-cream/5",
    quiet: "text-cream/70 hover:text-cream",
  }[variant];
  const cls = `${base} ${styles} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href ?? "#"} className={cls}>
      {children}
    </a>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-cream/10 bg-cream/[0.03] p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-xl font-bold tracking-tight text-cream ${className}`}>
      Clip<span className="text-brand">Craft</span>
    </span>
  );
}

const NAV = [
  { label: "How it works", href: "/#how" },
  { label: "What you get", href: "/#deliverables" },
  { label: "Pricing", href: "/pricing" },
  { label: "Samples", href: "/samples" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-cream/10 bg-ink/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2" aria-label="ClipCraft home">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-ink">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M4 4h9a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5H8l-4 4V4Z" />
            </svg>
          </span>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-cream/65 transition hover:text-cream"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Btn to="/start" className="px-4 py-2.5 text-xs sm:text-sm">
            Start a pack
          </Btn>
          <details className="relative md:hidden">
            <summary className="grid h-9 w-9 cursor-pointer list-none place-items-center rounded-full border border-cream/15 text-cream/70">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </summary>
            <div className="absolute right-0 mt-3 w-52 rounded-xl border border-cream/10 bg-ink-2 p-2 shadow-xl">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm text-cream/75 hover:bg-cream/5 hover:text-cream"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </details>
        </div>
      </Container>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-cream/10 bg-ink-2 py-12">
      <Container>
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-cream/55">{BUSINESS.tagline}</p>
            <p className="mt-4 text-sm text-cream/55">YouTube Shorts · Instagram Reels · LinkedIn · X</p>
          </div>
          <div className="text-sm">
            <p className="mb-3 font-semibold text-cream">Explore</p>
            <ul className="space-y-2 text-cream/55">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition hover:text-cream">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/start" className="transition hover:text-cream">
                  Send an episode brief
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-sm">
            <p className="mb-3 font-semibold text-cream">Start an episode</p>
            <p className="text-cream/55">
              Send a brief and we'll come back with a quote and next steps.
            </p>
            <div className="mt-4">
              <Btn to="/start" variant="ghost" className="px-4 py-2.5 text-xs">
                Send a brief
              </Btn>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ClipCraft. Short-form production studio.</p>
          <p>Sample work shown on this site is our own demo production, not client work.</p>
        </div>
      </Container>
    </footer>
  );
}

/** A 9:16 phone mock with captions — stands in for a video preview on the landing page. */
export function ClipMock({
  hook,
  caption,
  platform,
  length,
}: {
  hook: string;
  caption: string;
  platform: string;
  length: string;
}) {
  return (
    <div className="relative w-full max-w-[280px]">
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-brand/20 blur-3xl" />
      <div className="rounded-[2rem] border border-cream/15 bg-ink-2 p-2 shadow-2xl">
        <div className="relative aspect-[9/16] overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-[#2a1409] via-[#160c07] to-[#08080b]">
          <div className="absolute top-4 left-1/2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-cream/20" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/85 to-transparent" />
          <div className="absolute top-6 left-4 flex items-center gap-2">
            <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-ink">
              {platform}
            </span>
            <span className="rounded-full border border-cream/25 px-2 py-0.5 text-[10px] font-medium text-cream/80">
              {length}
            </span>
          </div>
          <p className="absolute top-1/3 left-1/2 w-[85%] -translate-x-1/2 text-center font-display text-lg leading-snug font-bold text-cream">
            {hook}
          </p>
          <p className="absolute bottom-12 left-1/2 w-[86%] -translate-x-1/2 text-center text-[11px] leading-relaxed font-semibold text-cream">
            <span className="bg-ink/70 px-1">{caption}</span>
          </p>
          <div className="absolute inset-x-5 bottom-6 h-0.5 rounded-full bg-cream/20">
            <div className="h-full w-2/5 rounded-full bg-brand" />
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-cream/40">
        How a finished clip looks — captions burned in, your colours.
      </p>
    </div>
  );
}

export function FaqList({ items = FAQS }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-cream/10 overflow-hidden rounded-2xl border border-cream/10 bg-cream/[0.03]">
      {items.map((item) => (
        <details key={item.q} className="group px-5 py-4 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
            <span className="font-medium text-cream">{item.q}</span>
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-cream/20 text-cream/60 transition group-open:rotate-45">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cream/60">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
