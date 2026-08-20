import type { CSSProperties } from "react";
import { AnimatedText } from "./AnimatedText";
import { Reveal } from "./Reveal";
import { Stop } from "./Stop";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  intro?: string;
  /** Colour set for the surface the heading sits on. */
  tone: "light" | "dark";
  /** Per-section design values, passed straight through as CSS lengths. */
  headingSize?: string;
  headingMax?: string;
  introMax?: string;
  gap?: string;
};

export function SectionHeading({
  eyebrow,
  heading,
  intro,
  tone,
  headingSize,
  headingMax,
  introMax,
  gap,
}: SectionHeadingProps) {
  const vars = {
    "--heading-size": headingSize,
    "--heading-max": headingMax,
    "--intro-max": introMax,
    "--head-gap": gap,
  } as CSSProperties;

  /*
   * The three parts enter in reading order — eyebrow, then the heading setting
   * itself word by word, then the supporting paragraph — rather than the block
   * arriving in one piece.
   */
  return (
    <div className={`${styles.head} ${styles[tone]}`} style={vars}>
      <div>
        <Reveal as="p" className={styles.eyebrow}>
          {eyebrow}
        </Reveal>
        <AnimatedText
          as="h2"
          className={styles.heading}
          text={heading}
          trailing={<Stop />}
          delay={110}
        />
      </div>
      {intro ? (
        <Reveal as="p" className={styles.intro} delay={260}>
          {intro}
        </Reveal>
      ) : null}
    </div>
  );
}
