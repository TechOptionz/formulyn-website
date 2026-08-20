import { briefSteps, contactChannels, contactHero } from "@/data/contact";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Stop } from "@/components/ui/Stop";
import { contactIcons } from "@/components/ui/icons";
import { BriefForm } from "./BriefForm";
import styles from "./ContactSection.module.css";

/**
 * Contact masthead, brief intake form and the contact rail beside it. The
 * form itself is a client component (BriefForm) so it can post to /api/leads.
 *
 * The email and the location live in the rail rather than under the
 * masthead — they are two of the four facts a prospect checks before
 * sending anything sensitive, so they read as a set with the reply window
 * and the NDA.
 */
export function ContactSection() {
  return (
    <header className={styles.hero}>
      <div className={styles.shell}>
        <div className={styles.masthead}>
          <p className={styles.eyebrow}>{contactHero.eyebrow}</p>
          <AnimatedText
            as="h1"
            className={styles.heading}
            text={contactHero.heading}
            trailing={<Stop />}
            delay={120}
            stagger={60}
            eager
          />
          <p className={styles.body}>{contactHero.body}</p>
        </div>

        <div className={styles.grid}>
          <BriefForm />

          <aside className={styles.rail}>
            {contactChannels.map((channel) => {
              const Icon = contactIcons[channel.icon];
              return (
                <div key={channel.label} className={styles.channel}>
                  <span className={styles.channelIcon}>
                    <Icon width="17" height="17" />
                  </span>
                  <div className={styles.channelText}>
                    <p className={styles.channelLabel}>{channel.label}</p>
                    {channel.href ? (
                      <a href={channel.href} className={styles.channelValue}>
                        {channel.value}
                      </a>
                    ) : (
                      <p className={styles.channelValue}>{channel.value}</p>
                    )}
                    {channel.meta ? (
                      <p className={styles.channelMeta}>{channel.meta}</p>
                    ) : null}
                  </div>
                </div>
              );
            })}

            <div className={styles.steps}>
              <p className={styles.stepsTitle}>What happens next</p>
              <ol className={styles.stepList}>
                {briefSteps.map((step, index) => (
                  <li key={step.title} className={styles.step}>
                    <span className={styles.stepIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className={styles.stepText}>
                      <p className={styles.stepTitle}>{step.title}</p>
                      <p className={styles.stepBody}>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </header>
  );
}
