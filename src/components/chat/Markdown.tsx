import type { ReactNode } from "react";
import { toBlocks, toTokens, type Token } from "@/lib/chat/markdown";
import styles from "./Markdown.module.css";

/**
 * Renders an assistant reply.
 *
 * The model answers in markdown — "**Discovery Call**", "1. step" — and the
 * bubble used to print that string verbatim, so the asterisks showed and the
 * numbered steps ran together in a wall of text. Parsing lives in
 * src/lib/chat/markdown.ts; this file only turns the result into elements.
 *
 * It builds React elements and never HTML strings, so model output has no
 * innerHTML path into the page.
 */

function span(token: Token, key: string): ReactNode {
  switch (token.kind) {
    case "code":
      return (
        <code key={key} className={styles.code}>
          {token.text}
        </code>
      );
    case "strong":
      return <strong key={key}>{token.text}</strong>;
    case "em":
      return <em key={key}>{token.text}</em>;
    case "link": {
      const external = /^https?:/i.test(token.href);
      return (
        <a
          key={key}
          className={styles.link}
          href={token.href}
          {...(external
            ? { target: "_blank", rel: "noreferrer noopener" }
            : null)}
        >
          {token.text}
        </a>
      );
    }
    default:
      return token.text;
  }
}

function inline(text: string, keyBase: string): ReactNode[] {
  return toTokens(text).map((token, index) =>
    span(token, `${keyBase}-${index}`),
  );
}

export function Markdown({ text }: { text: string }) {
  return (
    <div className={styles.body}>
      {toBlocks(text).map((block, index) => {
        const key = `${block.kind}-${index}`;

        if (block.kind === "heading") {
          return (
            <p key={key} className={styles.heading}>
              {inline(block.text, key)}
            </p>
          );
        }

        if (block.kind === "list") {
          const items = block.items.map((item, itemIndex) => (
            <li key={`${key}-${itemIndex}`} className={styles.item}>
              {inline(item, `${key}-${itemIndex}`)}
            </li>
          ));
          return block.ordered ? (
            <ol key={key} className={styles.ordered} start={block.start}>
              {items}
            </ol>
          ) : (
            <ul key={key} className={styles.unordered}>
              {items}
            </ul>
          );
        }

        return (
          <p key={key} className={styles.paragraph}>
            {inline(block.text, key)}
          </p>
        );
      })}
    </div>
  );
}
