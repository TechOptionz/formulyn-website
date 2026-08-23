/**
 * The markdown subset the chat assistant actually produces, parsed into a
 * plain data structure. No React here on purpose — rendering lives in
 * src/components/chat/Markdown.tsx, so this half can be reasoned about (and
 * exercised) on its own.
 *
 * Scope is deliberately narrow: paragraphs, ordered and unordered lists,
 * small headings, bold, italic, inline code and links. Anything it doesn't
 * recognise stays plain text rather than being guessed at.
 */

const HEADING = /^(#{1,4})\s+(.*)$/;
const ORDERED = /^(\d{1,2})[.)]\s+(.*)$/;
const BULLET = /^[-*•]\s+(.*)$/;

export type Block =
  | { kind: "p"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "list"; ordered: boolean; start: number; items: string[] };

export type Token =
  | { kind: "text"; text: string }
  | { kind: "code"; text: string }
  | { kind: "strong"; text: string }
  | { kind: "em"; text: string }
  | { kind: "link"; text: string; href: string };

/**
 * Some models return a whole numbered list on one line:
 * "Our workflow follows five steps: 1. Discovery 2. Formulation 3. …".
 * Split those back onto their own lines — but only when the numbers really
 * do count up from the first, so prose like "see section 4. Then 9." is left
 * alone.
 */
export function splitRunOn(line: string): string[] {
  const marks = [...line.matchAll(/(?:^|\s)(\d{1,2})[.)]\s+/g)];
  if (marks.length < 2) return [line];

  const numbers = marks.map((mark) => Number(mark[1]));
  if (!numbers.every((value, index) => value === numbers[0] + index)) {
    return [line];
  }

  const starts = marks.map(
    (mark) => (mark.index ?? 0) + (/^\s/.test(mark[0]) ? 1 : 0),
  );
  const lead = line.slice(0, starts[0]).trim();
  const items = starts.map((start, index) =>
    line.slice(start, starts[index + 1] ?? line.length).trim(),
  );

  // Nothing marks the end of the last item, so any closing remark ("The
  // whole process typically takes…") lands inside it. Cut it loose at the
  // first sentence boundary and let it be its own paragraph.
  const tail = /^(.*?[.!?])\s+(\p{Lu}.{20,})$/su.exec(items[items.length - 1]);
  if (tail) {
    items[items.length - 1] = tail[1];
    return [...(lead ? [lead] : []), ...items, "", tail[2]];
  }

  return lead ? [lead, ...items] : items;
}

export function toBlocks(source: string): Block[] {
  const lines = source
    .replace(/\r\n?/g, "\n")
    // "**1. Discovery**" → "1. **Discovery**". Models often pull the number
    // inside the bold run, which hides the marker from every pattern below
    // and leaves the whole list stranded as one paragraph. Moving the
    // opening delimiter past the number keeps the closing one in place.
    .replace(/(^|\s)(\*\*|__)(\d{1,2})([.)])\s+/g, "$1$3$4 $2")
    // Bullets get packed inline too, but only "•" is safe to split on — a
    // bare "-" is just as often a dash in the middle of a sentence.
    .replace(/\s+•\s+/g, "\n• ")
    .split("\n")
    .flatMap(splitRunOn);

  const blocks: Block[] = [];
  let paragraph: string[] = [];

  const flush = () => {
    if (paragraph.length) {
      blocks.push({ kind: "p", text: paragraph.join("\n") });
      paragraph = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }

    const heading = HEADING.exec(line);
    if (heading) {
      flush();
      blocks.push({ kind: "heading", text: heading[2] });
      continue;
    }

    const ordered = ORDERED.exec(line);
    const bullet = ordered ? null : BULLET.exec(line);
    if (ordered || bullet) {
      const isOrdered = Boolean(ordered);
      const text = (ordered ? ordered[2] : bullet![1]).trim();
      const last = blocks[blocks.length - 1];
      // Continue the list above only when nothing interrupted it.
      if (
        !paragraph.length &&
        last?.kind === "list" &&
        last.ordered === isOrdered
      ) {
        last.items.push(text);
      } else {
        flush();
        blocks.push({
          kind: "list",
          ordered: isOrdered,
          start: ordered ? Number(ordered[1]) : 1,
          items: [text],
        });
      }
      continue;
    }

    paragraph.push(line);
  }

  flush();
  return blocks;
}

/*
 * One pass over a block's text. Capture groups, in order:
 *   1 `code`   2 **bold**   3 __bold__   4 *italic*
 *   5,6 [text](href)   7 bare url   8 bare email
 * Order matters: code first so backticked markdown stays literal, and bold
 * before italic so "**x**" isn't read as an empty italic.
 */
const INLINE =
  /`([^`]+)`|\*\*([^*]+)\*\*|__([^_]+)__|\*([^*\n]+)\*|\[([^\]]+)\]\(([^)\s]+)\)|((?:https?:\/\/|www\.)[^\s<>]*[^\s<>.,;:!?)])|([\w.+-]+@[\w-]+\.[\w.-]*\w)/g;

/**
 * Only ever produce a link the site would have written itself. Returns null
 * for anything else — including `javascript:` and other schemes — and the
 * caller then renders the label as plain text.
 */
export function safeHref(raw: string): string | null {
  const href = raw.trim();
  if (/^(https?:\/\/|mailto:)/i.test(href)) return href;
  if (/^www\./i.test(href)) return `https://${href}`;
  if (/^[\w.+-]+@[\w-]+\.[\w.-]*\w$/.test(href)) return `mailto:${href}`;
  if (href.startsWith("/")) return href;
  return null;
}

/** Split one block's text into inline spans. */
export function toTokens(text: string): Token[] {
  const tokens: Token[] = [];
  let cursor = 0;

  const push = (token: Token) => {
    if (token.kind === "text" && !token.text) return;
    tokens.push(token);
  };

  INLINE.lastIndex = 0;
  for (
    let match = INLINE.exec(text);
    match !== null;
    match = INLINE.exec(text)
  ) {
    push({ kind: "text", text: text.slice(cursor, match.index) });
    const [, code, bold, boldAlt, italic, label, href, url, email] = match;

    if (code !== undefined) {
      push({ kind: "code", text: code });
    } else if (bold !== undefined || boldAlt !== undefined) {
      push({ kind: "strong", text: (bold ?? boldAlt)! });
    } else if (italic !== undefined) {
      push({ kind: "em", text: italic });
    } else {
      const [linkText, linkHref] =
        label !== undefined
          ? [label, href]
          : url !== undefined
            ? [url, url]
            : [email!, email!];
      const safe = safeHref(linkHref);
      push(
        safe
          ? { kind: "link", text: linkText, href: safe }
          : { kind: "text", text: match[0] },
      );
    }

    cursor = match.index + match[0].length;
  }

  push({ kind: "text", text: text.slice(cursor) });
  return tokens;
}
