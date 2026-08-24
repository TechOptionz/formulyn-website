import Image from "next/image";
import type { Leader } from "@/data/about";
import { leaders, leadershipSection } from "@/data/about";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkedIn } from "@/components/ui/icons";
import styles from "./LeadershipSection.module.css";

/**
 * The people behind the practice. The page argues for the practice first;
 * this establishes who stands behind it.
 *
 * Rendered straight off the `leaders` array so the row is a data edit rather
 * than a layout one — see the note on that export before adding a third.
 */
export function LeadershipSection() {
  return (
    <section className={`${styles.section} edgeSweep`}>
      <div className="shell scrollSettle">
        <SectionHeading
          eyebrow={leadershipSection.eyebrow}
          heading={leadershipSection.heading}
          intro={leadershipSection.intro}
          tone="light"
          align="center"
          headingSize="clamp(27px, 3.4vw, 44px)"
          gap="clamp(44px, 5.5vw, 76px)"
        />

        <div className={styles.leaders}>
          {leaders.map((leader, index) => (
            <LeaderProfile key={leader.name} leader={leader} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** One person: portrait and link on the left, the credit on the right. */
function LeaderProfile({ leader, index }: { leader: Leader; index: number }) {
  return (
    <Reveal as="article" className={styles.leader} delay={index * 140}>
      <div className={styles.top}>
        <div className={styles.aside}>
          <div className={styles.portraitFrame}>
            <Image
              src={leader.photo.src}
              alt={leader.photo.alt}
              width={456}
              height={456}
              sizes="(max-width: 560px) 60vw, (max-width: 1100px) 280px, 22vw"
              className={styles.portrait}
            />
          </div>

          {/* Labelled by the person, not by the network — a link reading
              "LinkedIn" tells a screen-reader user nothing about where it
              goes when several sit on one page. */}
          <a
            href={leader.linkedin}
            className={styles.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn className={styles.linkedinMark} />
            {leader.name} on LinkedIn
          </a>
        </div>

        <div className={styles.credit}>
          <p className={styles.role}>{leader.role}</p>
          <h3 className={styles.name}>{leader.name}</h3>
          <p className={styles.bio}>{leader.bio}</p>

          <ul className={styles.credentials}>
            {leader.credentials.map((credential) => (
              <li key={credential} className={styles.credential}>
                {credential}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.quoteBlock}>
        <span className={styles.quoteMark} aria-hidden="true">
          &ldquo;
        </span>
        <blockquote className={styles.quote}>{leader.quote}</blockquote>
      </div>
    </Reveal>
  );
}
