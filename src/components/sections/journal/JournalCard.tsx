import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import type { JournalEntry } from "@/data/journal";
import styles from "./JournalCard.module.css";

/** Stands in for the picture until one is added to the entry. */
const PLACEHOLDER_LABEL = "Image placeholder";

/** Matches the column steps the grid takes in JournalSection.module.css. */
const IMAGE_SIZES = "(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw";

function isRemote(src: string) {
  return /^https?:\/\//i.test(src);
}

/**
 * One journal note: picture, the post's text, and a single link out to the
 * original. Nothing else in the card is clickable, so the grid holds one link
 * per card.
 *
 * Every part is optional bar the frame — a missing picture falls back to the
 * placeholder box, and a note with no permalink simply has no button.
 */
export function JournalCard({
  entry,
  delay = 0,
}: {
  entry: JournalEntry;
  /** Stagger, in ms, held before the card reveals. */
  delay?: number;
}) {
  const meta = [entry.date, entry.readTime].filter(Boolean).join(" · ");

  return (
    <Reveal as="article" className={styles.card} delay={delay}>
      {/* The well is sized for a photograph. With nothing to frame it drops to
          a band instead — see .thumbEmpty. */}
      <div
        className={
          entry.image === null
            ? `${styles.thumb} ${styles.thumbEmpty}`
            : styles.thumb
        }
      >
        {entry.image === null ? (
          PLACEHOLDER_LABEL
        ) : isRemote(entry.image) ? (
          // eslint-disable-next-line @next/next/no-img-element -- see .thumbImageRaw
          <img
            src={entry.image}
            alt={entry.imageAlt}
            className={styles.thumbImageRaw}
            loading="lazy"
          />
        ) : (
          <Image
            src={entry.image}
            alt={entry.imageAlt}
            className={styles.thumbImage}
            sizes={IMAGE_SIZES}
            fill
          />
        )}
      </div>

      <div className={styles.cardBody}>
        {entry.category ? (
          <p className={styles.cardCategory}>{entry.category}</p>
        ) : null}
        {entry.title ? (
          <h3 className={styles.cardTitle}>{entry.title}</h3>
        ) : null}
        {entry.excerpt ? (
          <p className={styles.cardExcerpt}>{entry.excerpt}</p>
        ) : null}
        {meta ? <div className={styles.cardMeta}>{meta}</div> : null}

        {entry.redirectLink ? (
          <a
            className={styles.link}
            href={entry.redirectLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read on LinkedIn
            {/* Every card carries the same label; name the note for a reader
                moving through the links on their own. */}
            {entry.title ? (
              <span className="srOnly">: {entry.title}</span>
            ) : null}
            {" →"}
          </a>
        ) : null}
      </div>
    </Reveal>
  );
}
