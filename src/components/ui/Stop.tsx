import styles from "./Stop.module.css";

/**
 * The gold full stop that closes every Formulyn heading and the wordmark.
 * Decorative — hidden from assistive tech so headings read cleanly.
 */
export function Stop() {
  return (
    <span className={styles.stop} aria-hidden="true">
      .
    </span>
  );
}
