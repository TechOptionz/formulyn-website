import { situations, situationsSection } from "@/data/home";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./SituationsSection.module.css";

export function SituationsSection() {
  return (
    <section className={`${styles.section} edgeSweep`}>
      <div className="shell scrollSettle">
        <SectionHeading
          tone="light"
          eyebrow={situationsSection.eyebrow}
          heading={situationsSection.heading}
          intro={situationsSection.intro}
          headingMax="640px"
          introMax="380px"
          gap="clamp(36px, 4.5vw, 64px)"
        />

        <div className={styles.grid}>
          {situations.map((situation, index) => (
            <Reveal
              key={situation.quote}
              className={styles.card}
              from="scale"
              delay={index * 110}
            >
              <p className={styles.head}>
                <span className={styles.index}>{situation.index}</span>
                <span className={styles.label}>The situation</span>
              </p>
              <h3 className={styles.quote}>{situation.quote}</h3>
              <p className={styles.problem}>{situation.problem}</p>
              <div className={styles.response}>
                <p className={styles.responseLabel}>What we do</p>
                <p className={styles.responseBody}>{situation.response}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
