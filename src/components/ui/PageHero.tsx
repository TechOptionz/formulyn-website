import type { CSSProperties } from "react";
import { AnimatedText } from "./AnimatedText";
import { Stop } from "./Stop";
import styles from "./PageHero.module.css";

type PageHeroProps = {
  eyebrow: string;
  heading: string;
  body?: string;
  /** Heading measure in `ch`, matching the design per page. */
  headingMeasure?: number;
};

/**
 * The dark masthead shared by every interior page
 * (process, industries, journal, about).
 */
export function PageHero({
  eyebrow,
  heading,
  body,
  headingMeasure = 16,
}: PageHeroProps) {
  return (
    <header className={`${styles.hero} motionScene`}>
      <div className={`${styles.inner} scrollExit`}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <AnimatedText
          as="h1"
          className={styles.heading}
          style={{ "--heading-measure": `${headingMeasure}ch` } as CSSProperties}
          text={heading}
          trailing={<Stop />}
          delay={120}
          stagger={60}
          eager
        />
        {body ? <p className={styles.body}>{body}</p> : null}
      </div>
    </header>
  );
}
