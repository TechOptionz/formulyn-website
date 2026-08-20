import Image from "next/image";
import { caseStudies, caseStudiesSection } from "@/data/home";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./CaseStudiesSection.module.css";

export function CaseStudiesSection() {
  return (
    <section className={`${styles.section} edgeSweep`}>
      <div className="shell scrollSettle">
        <SectionHeading
          tone="dark"
          eyebrow={caseStudiesSection.eyebrow}
          heading={caseStudiesSection.heading}
          intro={caseStudiesSection.intro}
          headingSize="clamp(32px, 4.2vw, 56px)"
          headingMax="16ch"
          introMax="360px"
        />

        <div className={styles.grid}>
          {caseStudies.map((study, index) => (
            <Reveal
              as="article"
              key={study.title}
              className={styles.card}
              from="scale"
              /* Cards land in reading order; the row of three sets the pace. */
              delay={(index % 3) * 110}
            >
              <div className={styles.thumb}>
                <Image
                  src={study.image.src}
                  alt={study.image.alt}
                  className={styles.thumbImage}
                  sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
                  fill
                />
                <div className={styles.thumbVeil} aria-hidden="true" />
              </div>
              <div className={styles.content}>
                <p className={styles.category}>{study.category}</p>
                <h3 className={styles.title}>{study.title}</h3>
                <p className={styles.body}>{study.body}</p>
                <div className={styles.metrics}>
                  {study.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className={styles.metricValue}>{metric.value}</div>
                      <div className={styles.metricLabel}>{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
