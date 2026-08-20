import { manifesto } from "@/data/home";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./ManifestoSection.module.css";

export function ManifestoSection() {
  return (
    <section className={styles.section}>
      <div className={`${styles.inner} scrollSettle`}>
        <Reveal as="p" className={styles.eyebrow}>
          {manifesto.eyebrow}
        </Reveal>
        {/* The statement is the loudest type on the page — it sets itself a
            word at a time, and the gold clause lands last. */}
        <AnimatedText
          as="p"
          className={styles.statement}
          parts={[
            { text: manifesto.lead },
            { text: manifesto.highlight, className: styles.highlight },
          ]}
          delay={140}
          stagger={65}
        />
      </div>
    </section>
  );
}
