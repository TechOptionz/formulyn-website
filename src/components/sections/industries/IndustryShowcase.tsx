import Image from "next/image";
import { industries, industriesCta } from "@/data/industries";
import { Reveal } from "@/components/ui/Reveal";
import { SiteLink } from "@/components/ui/SiteLink";
import styles from "./IndustryShowcase.module.css";

/**
 * The seven categories, one card each: photography on one flank, the copy and
 * its capability pills on the other, alternating down the page so the eye is
 * handed across rather than dropped straight down a column.
 *
 * Cards whose photo has not landed yet render a labelled placeholder frame in
 * its place — same footprint, so nothing reflows when the file arrives.
 */
export function IndustryShowcase() {
  return (
    <section className={`${styles.section} edgeSweep`}>
      <div className={`${styles.stack} scrollSettle`}>
        {industries.map((industry, index) => {
          const flipped = index % 2 === 1;

          return (
            <Reveal
              as="article"
              key={industry.index}
              className={`${styles.row} ${flipped ? styles.flipped : ""}`}
              from={flipped ? "right" : "left"}
            >
              <figure className={styles.figure}>
                {industry.image.src ? (
                  <>
                    <Image
                      src={industry.image.src}
                      alt={industry.image.alt}
                      className={styles.photo}
                      sizes="(max-width: 860px) 100vw, 34vw"
                      fill
                    />
                    <span className={styles.photoVeil} aria-hidden="true" />
                    <span
                      className={`${styles.index} ${styles.indexOnPhoto}`}
                      aria-hidden="true"
                    >
                      {industry.index}
                    </span>
                  </>
                ) : (
                  /* Placeholder: states where the file goes, so swapping in
                     the photography is a one-line change in the data file. */
                  <span className={styles.placeholder}>
                    <span className={styles.index} aria-hidden="true">
                      {industry.index}
                    </span>
                    <span className={styles.placeholderLabel}>Image</span>
                    <span className={styles.placeholderPath}>
                      /industries/{industry.slug}.webp
                    </span>
                  </span>
                )}
              </figure>

              <div className={styles.content}>
                <h2 className={styles.title}>{industry.title}</h2>
                <p className={styles.body}>{industry.body}</p>
                <ul className={styles.tags}>
                  {industry.tags.map((tag) => (
                    <li key={tag} className={styles.tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}

        <Reveal className={styles.ctaRow} from="scale" delay={120}>
          <div>
            <p className={styles.ctaIndex}>{industriesCta.index}</p>
            <h2 className={styles.ctaTitle}>{industriesCta.title}</h2>
          </div>
          <div className={styles.ctaSide}>
            <p className={styles.ctaBody}>{industriesCta.body}</p>
            <SiteLink href={industriesCta.cta.href} className={styles.ctaLink}>
              {industriesCta.cta.label}
            </SiteLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
