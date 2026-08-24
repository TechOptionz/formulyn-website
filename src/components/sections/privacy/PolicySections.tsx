import { policyClauses, privacyUpdated } from "@/data/privacy";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./PolicySections.module.css";

/**
 * The policy document itself: numbered clauses on the dark canvas, set as a
 * hairline-divided list. Same 72px index column the protocol steps on the
 * service pages use, at a reading measure rather than the full shell width.
 */
export function PolicySections() {
  return (
    <section className={`${styles.section} edgeSweep`}>
      <div className="shell scrollSettle">
        <p className={styles.updated}>
          <span>Last updated</span>
          <time className={styles.updatedDate} dateTime={privacyUpdated.iso}>
            {privacyUpdated.label}
          </time>
        </p>

        <article className={styles.doc}>
          {policyClauses.map((clause, index) => (
            <Reveal
              as="section"
              key={clause.index}
              className={styles.clause}
              delay={(index % 3) * 90}
            >
              <p className={styles.index}>{clause.index}</p>
              <div className={styles.content}>
                <h2 className={styles.title}>{clause.title}</h2>
                {clause.body.map((paragraph) => (
                  <p key={paragraph} className={styles.body}>
                    {paragraph}
                  </p>
                ))}
                {clause.points ? (
                  <ul className={styles.points}>
                    {clause.points.map((point) => (
                      <li key={point} className={styles.point}>
                        <span className={styles.diamond} aria-hidden="true">
                          ◆
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Reveal>
          ))}
        </article>
      </div>
    </section>
  );
}
