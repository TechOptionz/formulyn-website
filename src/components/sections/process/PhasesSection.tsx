import { phases, processNote } from "@/data/process";
import { Reveal } from "@/components/ui/Reveal";
import { Timeline } from "./Timeline";
import { PhaseNav } from "./PhaseNav";
import styles from "./PhasesSection.module.css";

export function PhasesSection() {
  return (
    <section className={`${styles.section} edgeSweep`}>
      <div className="shell">
        <Timeline />

        <div className={styles.layout}>
          <aside className={styles.aside}>
            <PhaseNav />
          </aside>

          <div className={styles.stack}>
            {phases.map((phase) => (
              <Reveal
                key={phase.id}
                as="article"
                id={phase.id}
                className={styles.card}
                from="left"
                eager
              >
                <div className={styles.cardHead}>
                  <span className={styles.step}>Step [{phase.number}]</span>
                  <span className={styles.weeks}>{phase.weeks}</span>
                </div>

                <h2 className={styles.title}>{phase.title}</h2>
                <p className={styles.body}>{phase.body}</p>

                <div className={styles.split}>
                  <div>
                    <p className={styles.splitHead}>Includes</p>
                    <ul className={styles.includes}>
                      {phase.includes.map((item) => (
                        <li key={item} className={styles.include}>
                          <span className={styles.diamond} aria-hidden="true">
                            ◆
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.deliverableBox}>
                    <p className={styles.splitHead}>Deliverable</p>
                    <p className={styles.deliverable}>{phase.deliverable}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal as="p" className={styles.note}>
              {processNote}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
