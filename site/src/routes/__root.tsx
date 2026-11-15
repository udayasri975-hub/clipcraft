import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "~/components/site";
import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#08080b" },
      {
        title: "ClipCraft — Turn one recording into a week of short-form content",
      },
      {
        name: "description",
        content:
          "ClipCraft turns your podcast or long video into captioned YouTube Shorts, Instagram Reels, a LinkedIn post and an X thread — branded, platform-sized and ready to post.",
      },
      { property: "og:title", content: "ClipCraft — one recording in, a week of content out" },
      {
        property: "og:description",
        content:
          "Three captioned shorts, a LinkedIn post and an X thread from one episode. $249 per episode, 24-hour target turnaround.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">404</p>
      <h1 className="font-display text-3xl font-bold text-cream">That page got cut</h1>
      <p className="text-cream/60">
        The link you followed doesn't exist. Try the samples, the pricing, or send us an episode.
      </p>
      <a
        href="/"
        className="mt-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-ink"
      >
        Back to the home page
      </a>
    </main>
  ),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <div className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
