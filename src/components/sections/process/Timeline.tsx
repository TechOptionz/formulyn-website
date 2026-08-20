import type { CSSProperties } from "react";
import { timeline } from "@/data/process";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Timeline.module.css";

/** Proportional week bar sitting above the step grid. */
export function Timeline() {
  return (
    <Reveal className={styles.timeline}>
      {timeline.map((segment) => (
        <div
          key={segment.label}
          className={styles.segment}
          style={
            {
              "--segment-flex": segment.flex,
              "--segment-color": segment.color,
            } as CSSProperties
          }
        >
          <div className={styles.bar} />
          <div className={styles.label}>{segment.label}</div>
        </div>
      ))}
    </Reveal>
  );
}
