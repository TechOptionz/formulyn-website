import { Fragment, type ReactNode } from "react";
import { featuredPost, journalEmpty, journalEntries } from "@/data/journal";
import { Reveal } from "@/components/ui/Reveal";
import { JournalCard } from "./JournalCard";
import { NewsletterSignup } from "./NewsletterSignup";
import styles from "./JournalSection.module.css";

/**
 * Wraps a title in its LinkedIn permalink when the note has one, and leaves
 * it as plain text while the post is still a placeholder.
 */
function SourceLink({
  href,
  children,
}: {
  href?: string;
  children: ReactNode;
}) {
  if (!href) return <>{children}</>;

  return (
    <a
      href={href}
      className={styles.sourceLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

export function JournalSection() {
  const hasContent = featuredPost !== null || journalEntries.length > 0;

  return (
    <section className={`${styles.section} edgeSweep`}>
      <div className="shell scrollSettle">
        {featuredPost ? (
          <Reveal as="article" className={styles.featured} from="scale">
            <div>
              <p className={styles.featuredEyebrow}>{featuredPost.eyebrow}</p>
              <h2 className={styles.featuredTitle}>
                <SourceLink href={featuredPost.sourceUrl}>
                  {featuredPost.title}
                </SourceLink>
              </h2>
              <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
              <div className={styles.featuredMeta}>
                <span>{featuredPost.date}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredPost.readingTime}</span>
              </div>
            </div>
            <div className={styles.featuredThumb}>
              {featuredPost.imageLabel.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </Fragment>
              ))}
            </div>
          </Reveal>
        ) : null}

        {journalEntries.length > 0 ? (
          <div className={styles.grid}>
            {journalEntries.map((entry, index) => (
              /* Cards land in reading order; the row of three sets the pace. */
              <JournalCard
                key={entry.id}
                entry={entry}
                delay={(index % 3) * 90}
              />
            ))}
          </div>
        ) : null}

        {hasContent ? null : (
          <Reveal className={styles.empty}>
            <h2 className={styles.emptyTitle}>{journalEmpty.heading}</h2>
            <p className={styles.emptyBody}>{journalEmpty.body}</p>
          </Reveal>
        )}

        <NewsletterSignup />
      </div>
    </section>
  );
}
