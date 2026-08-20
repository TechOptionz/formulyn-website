import type { ServiceDetail } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import styles from "./ServiceDetailSections.module.css";

/** Body of a single service detail page: lead, inclusions, process, audience. */
export function ServiceDetailSections({ detail }: { detail: ServiceDetail }) {
  return (
    <>
      <section className={styles.leadSection}>
        <Reveal>
          <p className={styles.lead}>{detail.lead}</p>
        </Reveal>
      </section>

      <section className={`${styles.includes} edgeSweep`}>
        <div className="shell scrollSettle">
          <SectionHeading
            eyebrow="Scope"
            heading={detail.includesHeading}
            tone="light"
          />
          <div className={styles.grid}>
            {detail.includes.map((item, index) => (
              <Reveal
                as="article"
                key={item.title}
                className={styles.cell}
                delay={(index % 3) * 90}
              >
                <h3 className={styles.cellTitle}>{item.title}</h3>
                <p className={styles.cellBody}>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.process} edgeSweep`}>
        <div className="shell scrollSettle">
          <SectionHeading
            eyebrow="Protocol"
            heading={detail.processHeading}
            tone="dark"
          />
          <ol className={styles.steps}>
            {detail.process.map((step, index) => (
              <Reveal
                as="li"
                key={step.step}
                className={styles.step}
                from="left"
                delay={index * 80}
              >
                <span className={styles.stepIndex}>{step.step}</span>
                <div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepBody}>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <p className={styles.audience}>{detail.audience}</p>
          </Reveal>
        </div>
      </section>

      {/*
        Native <details> rather than a scripted accordion: it opens without
        JavaScript, carries its own expanded state for assistive technology,
        and is what the browser's find-in-page can open on a match.
      */}
      <section className={`${styles.faq} edgeSweep`}>
        <div className="shell scrollSettle">
          <SectionHeading
            eyebrow="Questions"
            heading={detail.faqHeading}
            tone="light"
          />
          <div className={styles.faqList}>
            {detail.faqs.map((faq, index) => (
              <Reveal
                as="details"
                key={faq.question}
                className={styles.faqItem}
                delay={index * 60}
              >
                <summary className={styles.faqQuestion}>{faq.question}</summary>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
