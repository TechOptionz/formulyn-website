"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { phases } from "@/data/process";
import styles from "./PhaseNav.module.css";

/**
 * Band across the viewport that decides which step is current: a card counts
 * as current from the moment it crosses a third of the way down until it
 * leaves that line again.
 */
const ACTIVE_BAND = "-32% 0px -58% 0px";

/**
 * Sticky step rail. Tracks which phase card the reader is level with, walks
 * the counter and the progress hairline along with it, and links to each card.
 */
export function PhaseNav() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const targets = phases
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = targets.indexOf(entry.target as HTMLElement);
          if (index !== -1) setActive(index);
        }
      },
      { rootMargin: ACTIVE_BAND, threshold: 0 },
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const current = phases[active];
  const progress = ((active + 1) / phases.length) * 100;

  return (
    <div className={styles.rail}>
      <p className={styles.eyebrow}>Phases</p>

      <p className={styles.counter}>
        {/* Keyed so each change remounts the number and replays its entrance. */}
        <span key={current.number} className={styles.counterNow}>
          {current.number}
        </span>
        <span className={styles.counterTotal}>
          / {phases[phases.length - 1].number}
        </span>
      </p>

      <nav aria-label="Process steps">
        <ol className={styles.list}>
          <span
            aria-hidden="true"
            className={styles.progress}
            style={{ "--progress": `${progress}%` } as CSSProperties}
          />
          {phases.map((phase, index) => (
            <li key={phase.id}>
              <a
                href={`#${phase.id}`}
                className={styles.item}
                aria-current={index === active ? "step" : undefined}
              >
                <span className={styles.badge}>{phase.number}</span>
                <span>
                  <span className={styles.name}>{phase.title}</span>
                  <span className={styles.weeks}>{phase.weeks}</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
