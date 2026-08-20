import { newsletter } from "@/data/journal";
import { Reveal } from "@/components/ui/Reveal";
import { NewsletterForm } from "./NewsletterForm";
import styles from "./NewsletterSignup.module.css";

/**
 * Monthly bench-notes signup. The form itself is a client component so it
 * can post to /api/leads.
 */
export function NewsletterSignup() {
  return (
    <Reveal className={styles.panel}>
      <div>
        <h2 className={styles.heading}>{newsletter.heading}</h2>
        <p className={styles.body}>{newsletter.body}</p>
      </div>

      <NewsletterForm />
    </Reveal>
  );
}
