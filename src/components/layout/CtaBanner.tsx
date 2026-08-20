import { ctaBanner } from "@/data/contact";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { SiteLink } from "@/components/ui/SiteLink";
import { Stop } from "@/components/ui/Stop";
import styles from "./CtaBanner.module.css";

/**
 * Closing call-to-action. Rendered at the foot of every page except
 * /contact, where it would only repeat the page itself.
 */
export function CtaBanner() {
  return (
    <section className={`${styles.section} edgeSweep`}>
      <div className={`${styles.inner} scrollSettle`}>
        <Reveal as="p" className={styles.eyebrow}>
          {ctaBanner.eyebrow}
        </Reveal>
        <AnimatedText
          as="h2"
          className={styles.heading}
          text={ctaBanner.heading}
          trailing={<Stop />}
          delay={110}
          stagger={60}
        />
        <Reveal as="p" className={styles.body} delay={260}>
          {ctaBanner.body}
        </Reveal>
        {/* Last thing to arrive, so the eye finishes on the button. */}
        <Reveal delay={380} from="scale">
          <SiteLink href={ctaBanner.cta.href} className={styles.cta}>
            {ctaBanner.cta.label}
          </SiteLink>
        </Reveal>
      </div>
    </section>
  );
}
