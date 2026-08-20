import { footerBlurb, footerPracticeLinks, site } from "@/data/site";
import { SiteLink } from "@/components/ui/SiteLink";
import { Logo } from "@/components/ui/Logo";
import { Instagram, LinkedIn } from "@/components/ui/icons";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={styles.wordmark}>
            <Logo />
          </div>
          <p className={styles.blurb}>{footerBlurb}</p>
          <div className={styles.status}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span className={styles.statusLabel}>{site.availability}</span>
          </div>
        </div>

        <div>
          <h2 className={styles.columnTitle}>Practice</h2>
          <div className={styles.columnList}>
            {footerPracticeLinks.map((link) => (
              <SiteLink
                key={link.href}
                href={link.href}
                className={styles.columnLink}
              >
                {link.label}
              </SiteLink>
            ))}
          </div>
        </div>

        <div>
          <h2 className={styles.columnTitle}>Consultancy</h2>
          <div className={styles.columnList}>
            <span className={styles.columnText}>{site.locationLong}</span>
            <a href={`mailto:${site.email}`} className={styles.goldLink}>
              {site.email}
            </a>
            {/* Anchored on the brief form. The footer is on every route,
                /contact included, where a bare /contact href went nowhere. */}
            <SiteLink href="/contact#brief" className={styles.goldLink}>
              Book a 30-min discovery call →
            </SiteLink>
            {/* Named for the company rather than the network — the founder's
                own profile is linked on /about, and "LinkedIn" alone would not
                tell the two apart out of context. */}
            <a
              href={site.linkedin}
              className={styles.social}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn className={styles.socialMark} />
              {site.name} on LinkedIn
            </a>
            <a
              href={site.instagram}
              className={styles.social}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className={styles.socialMark} />
              {site.name} on Instagram
            </a>
          </div>
        </div>
      </div>

      <div className={styles.legal}>{site.copyright}</div>
    </footer>
  );
}
