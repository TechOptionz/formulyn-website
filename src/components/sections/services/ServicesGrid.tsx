import { mandates } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import { SiteLink } from "@/components/ui/SiteLink";
import styles from "./ServicesGrid.module.css";

/** The four mandates. Cards with a detail page link through to it. */
export function ServicesGrid() {
  return (
    <section className={`${styles.section} edgeSweep`}>
      <div className={`${styles.grid} scrollSettle`}>
        {mandates.map((mandate, index) => (
          <Reveal
            as="article"
            key={mandate.index}
            className={styles.cell}
            delay={(index % 2) * 110}
          >
            <p className={styles.index}>{mandate.index}</p>
            <h2 className={styles.title}>{mandate.title}</h2>
            <p className={styles.tagline}>{mandate.tagline}</p>
            <p className={styles.body}>{mandate.body}</p>
            {mandate.href ? (
              <SiteLink href={mandate.href} className={styles.link}>
                Read the detail →
              </SiteLink>
            ) : null}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
