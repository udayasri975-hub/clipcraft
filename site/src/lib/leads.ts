import { appendFile, mkdir, readFile } from "node:fs/promises";
import { dirname } from "node:path";
import { createServerFn } from "@tanstack/react-start";

/**
 * Episode brief intake.
 *
 * Written as a POST server function (never GET) so a page refresh or a proxy
 * retry can't duplicate a submission.
 *
 * Storage: an append-only JSONL file (one JSON object per line, with a
 * timestamp) at LEADS_FILE. The team reads it directly; nothing is ever
 * rewritten or deleted, so a lead can't be lost to a failed update.
 */

const LEADS_FILE = process.env.CLIPCRAFT_LEADS_FILE || "/home/team/shared/leads/leads.jsonl";

export type LeadInput = {
  name: string;
  email: string;
  pkg: string;
  episodeLink: string;
  episodeLength: string;
  deadline: string;
  notes: string;
};

export type LeadResult =
  | { ok: true; reference: string }
  | {
      ok: false;
      reason: "invalid-name" | "invalid-email" | "invalid-episode" | "storage-error";
      message: string;
    };

const clean = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);

// Serialise appends so two submissions can't interleave a line or reuse a
// sequence number.
let queue: Promise<unknown> = Promise.resolve();

function enqueue<T>(work: () => Promise<T>): Promise<T> {
  const next = queue.then(work, work);
  queue = next.catch(() => undefined);
  return next;
}

async function nextSequence(): Promise<number> {
  try {
    const existing = await readFile(LEADS_FILE, "utf8");
    return existing.split("\n").filter((line) => line.trim().length > 0).length + 1;
  } catch {
    return 1;
  }
}

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: LeadInput) => input)
  .handler(async ({ data }): Promise<LeadResult> => {
    const name = clean(data?.name, 120);
    const email = clean(data?.email, 200);
    const pkg = clean(data?.pkg, 80);
    const episodeLink = clean(data?.episodeLink, 500);
    const episodeLength = clean(data?.episodeLength, 60);
    const deadline = clean(data?.deadline, 120);
    const notes = clean(data?.notes, 2000);

    if (name.length < 2) {
      return { ok: false, reason: "invalid-name", message: "Please tell us your name." };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return {
        ok: false,
        reason: "invalid-email",
        message: "That email address doesn't look right — check it and try again.",
      };
    }
    if (episodeLink.length < 4) {
      return {
        ok: false,
        reason: "invalid-episode",
        message: "Add a link to the episode (or type 'email' if you'll send it separately).",
      };
    }

    try {
      const reference = await enqueue(async () => {
        const sequence = await nextSequence();
        const ref = `CC-${String(sequence).padStart(4, "0")}`;
        const record = {
          timestamp: new Date().toISOString(),
          reference: ref,
          name,
          email,
          pkg,
          episodeLink,
          episodeLength,
          deadline,
          notes,
        };
        await mkdir(dirname(LEADS_FILE), { recursive: true });
        await appendFile(LEADS_FILE, `${JSON.stringify(record)}\n`, "utf8");
        return ref;
      });

      return { ok: true, reference };
    } catch (error) {
      console.error("[clipcraft-lead] append failed", error);
      return {
        ok: false,
        reason: "storage-error",
        message:
          "We couldn't save that just now. Your details are still in the form — copy them below and we'll pick it up.",
      };
    }
  });
