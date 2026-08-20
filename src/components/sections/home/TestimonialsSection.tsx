import { testimonialsSection } from "@/data/home";
import { site } from "@/data/site";
import { getTestimonials } from "@/lib/reviews";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Stop } from "@/components/ui/Stop";
import styles from "./TestimonialsSection.module.css";

/**
 * Stars are drawn per review rather than hardcoded at five: synced Google
 * reviews are published unfiltered, so a four-star review has to look like
 * one. The empty stars are dimmed rather than dropped so every row of stars
 * occupies the same width.
 */
function Stars({ rating, className }: { rating: number; className: string }) {
  const filled = Number.isFinite(rating)
    ? Math.min(5, Math.max(1, Math.round(rating)))
    : 5;
  return (
    <>
      <div className={className} aria-hidden="true">
        {"★".repeat(filled)}
        {filled < 5 && (
          <span className={styles.starEmpty}>{"★".repeat(5 - filled)}</span>
        )}
      </div>
      <span className="srOnly">Rated {rating} out of 5</span>
    </>
  );
}

export async function TestimonialsSection() {
  const { rating, reviewCount, testimonials } = await getTestimonials();

  return (
    <section className={`${styles.section} edgeSweep`}>
      <div className="shell scrollSettle">
        <div className={styles.head}>
          <div>
            <Reveal as="p" className={styles.eyebrow}>
              {testimonialsSection.eyebrow}
            </Reveal>
            <AnimatedText
              as="h2"
              className={styles.heading}
              text={testimonialsSection.heading}
              trailing={<Stop />}
              delay={110}
            />
          </div>

          <Reveal className={styles.score} from="right" delay={200}>
            <div>
              <div className={styles.scoreValue}>{rating}</div>
              <Stars rating={Number(rating)} className={styles.scoreStars} />
            </div>
            <div className={styles.scoreMeta}>
              <p className={styles.scoreCount}>{reviewCount}</p>
              <a
                href={site.googleReviewsUrl}
                className={styles.scoreLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read on Google →
              </a>
            </div>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <Reveal
              as="figure"
              key={testimonial.attribution + testimonial.quote}
              className={styles.card}
              from="scale"
              delay={index * 100}
            >
              <Stars
                rating={testimonial.rating}
                className={styles.cardStars}
              />
              <blockquote className={styles.quote}>
                {testimonial.quote}
              </blockquote>
              <figcaption className={styles.attribution}>
                {/* Google's terms require a synced review to be attributed and
                    to link back to itself, so the name doubles as that link. */}
                {testimonial.href ? (
                  <a
                    href={testimonial.href}
                    className={styles.attributionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {testimonial.attribution}
                  </a>
                ) : (
                  testimonial.attribution
                )}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
