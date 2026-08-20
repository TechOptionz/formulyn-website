import Image from "next/image";
import type { CSSProperties } from "react";
import { hero, heroStats, marqueeItems } from "@/data/home";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { SiteLink } from "@/components/ui/SiteLink";
import { Stop } from "@/components/ui/Stop";
import styles from "./HeroSection.module.css";

/** One pass of the marquee, duplicated below to make the loop seamless. */
const marqueeText = `${marqueeItems.join(" · ")} · `;

export function HeroSection() {
  return (
    <header className={`${styles.hero} motionScene`}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={`${styles.grid} scrollExit`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            <span className={styles.eyebrowLabel}>{hero.eyebrow}</span>
          </p>

          <AnimatedText
            as="h1"
            className={styles.heading}
            text={hero.headingLines}
            trailing={<Stop />}
            delay={140}
            stagger={65}
            eager
          />

          <p className={styles.body}>{hero.body}</p>

          <div className={styles.actions}>
            <SiteLink href={hero.primaryCta.href} className={styles.ctaPrimary}>
              {hero.primaryCta.label}
            </SiteLink>
            <SiteLink href={hero.secondaryCta.href} className={styles.ctaSecondary}>
              {hero.secondaryCta.label}
            </SiteLink>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.frame} aria-hidden="true" />
          <div className={styles.imageWrap}>
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              className={`${styles.image} scrollZoom`}
              sizes="(max-width: 900px) 100vw, 50vw"
              fill
              priority
            />
          </div>
          <div className={styles.badge}>
            <div className={styles.badgeValue}>{hero.badge.value}</div>
            <div className={styles.badgeLabel}>{hero.badge.label}</div>
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        {heroStats.map((stat, index) => (
          <div
            key={stat.label}
            className={styles.stat}
            style={{ "--stat-index": index } as CSSProperties}
          >
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          <span className={styles.marqueeItem}>{marqueeText}</span>
          <span className={styles.marqueeItem}>{marqueeText}</span>
        </div>
      </div>
    </header>
  );
}
