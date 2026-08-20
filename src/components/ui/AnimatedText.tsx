"use client";

import { Fragment, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import styles from "./AnimatedText.module.css";

/** Elements the animated heading is allowed to render as. */
type AnimatedTextTag = "h1" | "h2" | "h3" | "p" | "div" | "span";

/**
 * A run of copy inside the same block. `break` starts a new line — the
 * equivalent of the `<br />` the static markup used to carry.
 */
export type TextPart = {
  text: string;
  /** Class applied to every word of this run — used for the gold highlight. */
  className?: string;
  break?: boolean;
};

type AnimatedTextProps = {
  /** A single string, or one string per hard line. */
  text?: string | readonly string[];
  /** Mixed runs, when part of the line needs its own colour. */
  parts?: readonly TextPart[];
  as?: AnimatedTextTag;
  className?: string;
  style?: CSSProperties;
  /** ms held before the first word rises. */
  delay?: number;
  /** ms between consecutive words. */
  stagger?: number;
  /**
   * Play on mount instead of waiting to be scrolled to. For copy that sits in
   * the first viewport — heroes — which would otherwise never animate.
   */
  eager?: boolean;
  /** Rides inside the last word's mask, so the gold stop lands with it. */
  trailing?: ReactNode;
};

/** Matches the word entrance in AnimatedText.module.css. */
const WORD_MS = 950;

/**
 * Longest the stagger is allowed to run from first word to last. A short
 * heading keeps the requested spacing; a long passage tightens it to fit
 * rather than trickling in for several seconds.
 */
const STAGGER_BUDGET_MS = 900;

function toParts(
  text: string | readonly string[] | undefined,
  parts: readonly TextPart[] | undefined,
): readonly TextPart[] {
  if (parts) return parts;
  if (typeof text === "string") return [{ text }];
  if (text) return text.map((line, index) => ({ text: line, break: index > 0 }));
  return [];
}

/** Flattens the runs into lines of words, each word keeping its run's class. */
function toLines(parts: readonly TextPart[]) {
  const lines: { word: string; className?: string }[][] = [];
  let line: { word: string; className?: string }[] = [];

  for (const part of parts) {
    if (part.break && line.length) {
      lines.push(line);
      line = [];
    }
    for (const word of part.text.split(/\s+/).filter(Boolean)) {
      line.push({ word, className: part.className });
    }
  }
  if (line.length) lines.push(line);

  return lines;
}

/**
 * Sets copy word by word: each word is clipped at its baseline and rises into
 * place on a stagger, so a heading types itself in as it is scrolled to.
 *
 * Renders as plain, selectable text on the server and for anyone on
 * `prefers-reduced-motion` — the masking is applied by the client only once it
 * has decided the entrance should play.
 */
export function AnimatedText({
  text,
  parts,
  as,
  className,
  style,
  delay = 0,
  stagger = 55,
  eager = false,
  trailing,
}: AnimatedTextProps) {
  const Tag = (as ?? "span") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  const lines = toLines(toParts(text, parts));
  const wordCount = lines.reduce((total, line) => total + line.length, 0);
  const step =
    wordCount > 1
      ? Math.min(stagger, STAGGER_BUDGET_MS / (wordCount - 1))
      : stagger;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    // Already on screen at first paint — leave it be unless asked otherwise,
    // so the top of the page never flashes empty.
    if (!eager && el.getBoundingClientRect().top < window.innerHeight) return;

    setState("hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            setState("shown");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [eager]);

  // Hand the words back as untouched text once the last one has landed.
  useIsomorphicLayoutEffect(() => {
    if (state !== "shown") return;
    const last = delay + Math.max(wordCount - 1, 0) * step;
    const timer = window.setTimeout(() => setState("idle"), last + WORD_MS);
    return () => window.clearTimeout(timer);
  }, [state, delay, step, wordCount]);

  const stateClass =
    state === "hidden"
      ? styles.hidden
      : state === "shown"
        ? styles.shown
        : undefined;

  let index = 0;

  return (
    <Tag
      ref={ref}
      className={[className, stateClass].filter(Boolean).join(" ")}
      style={style}
    >
      {lines.map((line, lineIndex) => (
        <span className={styles.line} key={lineIndex}>
          {line.map((token, wordIndex) => {
            const position = index++;
            const isLast =
              lineIndex === lines.length - 1 && wordIndex === line.length - 1;

            return (
              <Fragment key={`${lineIndex}-${wordIndex}`}>
                <span
                  className={styles.word}
                  style={
                    {
                      "--word-delay": `${Math.round(delay + position * step)}ms`,
                    } as CSSProperties
                  }
                >
                  <span
                    className={[styles.inner, token.className]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {token.word}
                    {isLast && trailing ? trailing : null}
                  </span>
                </span>
                {isLast ? null : " "}
              </Fragment>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
