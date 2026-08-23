import { mandates, serviceNavItems } from "@/data/services";
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

      {/* The detail pages, linked from their own hub. Without this the only
          route to them is the nav dropdown, and the hub passes them no
          internal link equity at all. */}
      <div className={styles.detail}>
        <h2 className={styles.detailHeading}>Explore in detail</h2>
        <div className={styles.detailGrid}>
          {serviceNavItems.map((item) => (
            <SiteLink
              key={item.href}
              href={item.href}
              className={styles.detailCell}
            >
              <span className={styles.detailTitle}>{item.label}</span>
              <span className={styles.detailBody}>{item.description}</span>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}
