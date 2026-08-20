import Image from "next/image";
import { founder } from "@/data/about";
import { Reveal } from "@/components/ui/Reveal";
import { LinkedIn } from "@/components/ui/icons";
import styles from "./FounderSection.module.css";

/**
 * Founder credit. Kept short by design — the page argues for the practice,
 * this establishes who stands behind it.
 */
export function FounderSection() {
  return (
    <section className={`${styles.section} edgeSweep`}>
      <div className={styles.grid}>
        <Reveal className={styles.aside} from="left">
          <div className={styles.portraitFrame}>
            <Image
              src={founder.photo.src}
              alt={founder.photo.alt}
              width={455}
              height={455}
              sizes="(max-width: 720px) 220px, 320px"
              className={styles.portrait}
            />
          </div>

          {/* Labelled by the person, not by the network — a link reading
              "LinkedIn" tells a screen-reader user nothing about where it
              goes when several sit on one page. */}
          <a
            href={founder.linkedin}
            className={styles.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn className={styles.linkedinMark} />
            {founder.name} on LinkedIn
          </a>
        </Reveal>

        <Reveal from="right" delay={140}>
          <p className={styles.eyebrow}>{founder.eyebrow}</p>
          <h2 className={styles.name}>{founder.name}</h2>
          <p className={styles.role}>{founder.role}</p>

          <p className={styles.bio}>{founder.bio}</p>

          <ul className={styles.credentials}>
            {founder.credentials.map((credential) => (
              <li key={credential} className={styles.credential}>
                {credential}
              </li>
            ))}
          </ul>

          <blockquote className={styles.quote}>{founder.quote}</blockquote>
        </Reveal>
      </div>
    </section>
  );
}
