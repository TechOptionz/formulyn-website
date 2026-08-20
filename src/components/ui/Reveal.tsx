"use client";

import { useRef, useState } from "react";
import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ReactNode,
} from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import styles from "./Reveal.module.css";

/** Elements the reveal wrapper is allowed to render as. */
type RevealTag =
  | "div"
  | "section"
  | "article"
  | "figure"
  | "aside"
  | "p"
  | "li"
  | "details";

/** Direction the element travels in from. */
type RevealFrom = "up" | "left" | "right" | "scale";

type RevealProps<T extends RevealTag> = {
  as?: T;
  className?: string;
  style?: CSSProperties;
  /** Stagger, in ms, held before this element starts its reveal. */
  delay?: number;
  /** Where the element enters from. Defaults to a lift from below. */
  from?: RevealFrom;
  /**
   * Reveal even when the element is already on screen at first paint. Use for
   * the leading elements of a section that should animate in on load rather
   * than sit there finished.
   */
  eager?: boolean;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "className" | "children" | "style">;

/** Comfortably longer than the longest entrance in Reveal.module.css. */
const ANIMATION_MS = 1000;

/**
 * Fades + lifts its child into view on first scroll past. `from` swaps that
 * for a slide in from either side — de-blurring and settling from a hair under
 * full scale — or for a straight rise out of scale.
 *
 * Content that is already within the first viewport renders untouched unless
 * `eager` is set, so the top of the page never flashes empty. Respects
 * `prefers-reduced-motion`.
 */
export function Reveal<T extends RevealTag = "div">({
  as,
  className,
  delay = 0,
  from = "up",
  eager = false,
  style,
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    // Already on screen (or above it) — leave it alone unless asked otherwise.
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
      { threshold: 0, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [eager]);

  // Drop the animation class once it has run so the element's own hover
  // transitions are no longer overridden. The stagger delays the finish.
  useIsomorphicLayoutEffect(() => {
    if (state !== "shown") return;
    const timer = window.setTimeout(
      () => setState("idle"),
      ANIMATION_MS + delay,
    );
    return () => window.clearTimeout(timer);
  }, [state, delay]);

  const revealClass =
    state === "hidden"
      ? styles.hidden
      : state === "shown"
        ? styles.shown
        : undefined;

  const fromClass =
    from === "left"
      ? styles.fromLeft
      : from === "right"
        ? styles.fromRight
        : from === "scale"
          ? styles.fromScale
          : undefined;

  return (
    <Tag
      ref={ref}
      className={[className, revealClass, fromClass].filter(Boolean).join(" ")}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms`, ...style } as CSSProperties)
          : style
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
