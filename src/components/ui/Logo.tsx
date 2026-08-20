"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import styles from "./Logo.module.css";

/**
 * The strapline ring answers a click with a kick and a settle.
 *
 * It cannot travel: the ring's own gap is exactly where the lettering passes
 * through it, which leaves 17 degrees of clearance clockwise and 10 back the
 * other way before the strapline runs into the word. So the ring swings out
 * and returns, overshooting once on the way back rather than coming to rest
 * anywhere new.
 */
const KICK: Keyframe[] = [
  { transform: "rotate(0deg)", offset: 0 },
  { transform: "rotate(14deg)", offset: 0.3 },
  { transform: "rotate(-4deg)", offset: 0.62 },
  { transform: "rotate(0deg)", offset: 1 },
];

const KICK_TIMING: KeyframeAnimationOptions = {
  duration: 720,
  easing: "cubic-bezier(0.33, 1, 0.68, 1)",
};

type LogoProps = {
  className?: string;
  /** Set on the instance in the bar, which is on screen from the first paint. */
  priority?: boolean;
};

/**
 * The Formulyn mark. Sized by `--logo-h` on the element that carries it.
 *
 * The artwork is decorative here — the accessible name comes from the text
 * beside it, so a link wrapping this reads as "Formulyn" rather than by
 * filename.
 */
export function Logo({ className, priority = false }: LogoProps) {
  const ring = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ring.current;
    if (!el) return;

    /*
     * The listener goes on whatever wraps the mark — the home link in the bar —
     * rather than on the image. The mark is not focusable itself, and a
     * keyboard Enter targets the link: events travel up from the target, so a
     * handler sitting inside it would never see one. Falling back to the plate
     * covers the footer, where the mark is not a link at all.
     */
    const host = el.closest("a, button") ?? el.parentElement;
    if (!host) return;

    const kick = () => {
      // The global reduced-motion rule only reaches CSS animation. This one is
      // scripted, so it has to opt out on its own.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // Clicked again mid-swing: restart cleanly rather than compose.
      el.getAnimations().forEach((animation) => animation.cancel());
      el.animate(KICK, KICK_TIMING);
    };

    host.addEventListener("click", kick);
    return () => host.removeEventListener("click", kick);
  }, []);

  return (
    <span className={className ? `${styles.mark} ${className}` : styles.mark}>
      <span className={styles.plate} aria-hidden="true">
        <Image
          src="/logo-wordmark.webp"
          alt=""
          width={1322}
          height={422}
          className={styles.word}
          sizes="200px"
          priority={priority}
        />
        <Image
          ref={ring}
          src="/logo-badge.webp"
          alt=""
          width={422}
          height={422}
          className={styles.ring}
          sizes="64px"
          priority={priority}
        />
      </span>
      <span className="srOnly">{site.name}</span>
    </span>
  );
}
