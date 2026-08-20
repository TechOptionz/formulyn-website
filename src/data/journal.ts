/** Content for the /journal page. */

import rawEntries from "../../content/journal.json";

export const journalHero = {
  eyebrow: "Journal · What we're learning",
  heading: "Notes from the bench",
  body: "Formulation science, regulatory changes, and the unglamorous decisions that decide whether a product works.",
} as const;

export type FeaturedPost = {
  eyebrow: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  imageLabel: string[];
  /** Permalink to the original LinkedIn post, when the note started there. */
  sourceUrl?: string;
};

/**
 * The wide article block above the grid. Left empty while every note runs as a
 * card; fill this in to promote one post to the top of the page.
 */
export const featuredPost: FeaturedPost | null = null;

/**
 * One journal card. Every field bar `id` is allowed to be blank or null — a
 * half-filled entry drops the part it is missing rather than breaking the card.
 */
export type JournalEntry = {
  id: string;
  /** Path under /public, or an absolute URL. Null renders the placeholder box. */
  image: string | null;
  imageAlt: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string | null;
  /** Permalink the "Read on LinkedIn" button opens. Null hides the button. */
  redirectLink: string | null;
};

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Blank strings and non-strings collapse to null, so callers test one thing. */
function optionalText(value: unknown): string | null {
  return text(value) || null;
}

/** Keeps `javascript:` and friends out of an href that comes from a data file. */
function externalUrl(value: unknown): string | null {
  const url = text(value);
  return /^https?:\/\//i.test(url) ? url : null;
}

/**
 * Reads one raw record out of content/journal.json. Anything without an `id` —
 * the instructions block at the top of the file, or an entry that is still
 * being typed — is dropped rather than rendered.
 */
function toEntry(raw: unknown): JournalEntry | null {
  if (typeof raw !== "object" || raw === null) return null;

  const record = raw as Record<string, unknown>;
  const id = text(record.id);
  if (!id) return null;

  return {
    id,
    image: optionalText(record.image),
    imageAlt: text(record.imageAlt),
    category: text(record.category),
    title: text(record.title),
    excerpt: text(record.excerpt),
    date: text(record.date),
    readTime: optionalText(record.readTime),
    redirectLink: externalUrl(record.redirectLink),
  };
}

/** The posts, newest first — the order they are written in the JSON file. */
export const journalEntries: JournalEntry[] = (rawEntries as unknown[])
  .map(toEntry)
  .filter((entry): entry is JournalEntry => entry !== null);

/** Shown in place of the article grid while there is nothing published. */
export const journalEmpty = {
  heading: "New notes are publishing shortly",
  body: "Bench notes from our lab are being brought across now. Subscribe below and the next one reaches you first.",
} as const;

export const newsletter = {
  heading: "Bench notes, monthly",
  body: "One email a month on formulation science and regulatory change. No product pitches.",
  placeholder: "you@company.com",
  submitLabel: "Subscribe",
} as const;
