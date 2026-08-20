import { mandates, practiceSection } from "@/data/home";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteLink } from "@/components/ui/SiteLink";
import styles from "./PracticeSection.module.css";

export function PracticeSection() {
  return (
    <section className={`${styles.section} edgeSweep`}>
      <div className="shell scrollSettle">
        <SectionHeading
          tone="light"
          eyebrow={practiceSection.eyebrow}
          heading={practiceSection.heading}
          intro={practiceSection.intro}
          introMax="400px"
          gap="clamp(28px, 3.5vw, 44px)"
        />

        <div className={styles.grid}>
          {mandates.map((mandate, index) => (
            <Reveal
              key={mandate.index}
              className={styles.cell}
              delay={index * 90}
            >
              <p className={styles.index}>{mandate.index}</p>
              <h3 className={styles.title}>{mandate.title}</h3>
              <p className={styles.body}>{mandate.body}</p>
            </Reveal>
          ))}
        </div>

        {/* One way out of the section, in place of a link on every card: the
            three led to the same page, and read identically to a screen
            reader without a card-specific suffix to tell them apart. */}
        <Reveal className={styles.moreRow} delay={mandates.length * 90}>
          <SiteLink href={practiceSection.more.href} className={styles.more}>
            {practiceSection.more.label}
            <span aria-hidden="true"> →</span>
          </SiteLink>
        </Reveal>
      </div>
    </section>
  );
}
