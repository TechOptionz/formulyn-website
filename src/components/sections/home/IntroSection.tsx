import { intro } from "@/data/home";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Stop } from "@/components/ui/Stop";
import styles from "./IntroSection.module.css";

export function IntroSection() {
  return (
    <section className={`${styles.section} edgeSweep`}>
      <div className={`${styles.grid} scrollSettle`}>
        <div>
          <Reveal as="p" className={styles.eyebrow}>
            {intro.eyebrow}
          </Reveal>
          <AnimatedText
            as="h2"
            className={styles.heading}
            text={intro.heading}
            trailing={<Stop />}
            delay={110}
          />
        </div>

        <div>
          <Reveal from="right" delay={140}>
            <p className={styles.lead}>{intro.lead}</p>
            <p className={styles.body}>{intro.body}</p>
          </Reveal>
          <Reveal className={styles.tags} delay={300}>
            {intro.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
