"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useRouteRestart } from "./RouteRestart";
import styles from "./PageTransition.module.css";

/**
 * Fades each route in as it mounts, so a nav click resolves into the new page
 * instead of snapping to it. Keyed on the path: the tree remounts on
 * navigation, which also restarts every scroll reveal on the incoming page.
 *
 * The run id is the second half of that key. Re-entering the route you are
 * already on cannot change the path, so it bumps the id instead and gets the
 * same remount — the page arrives as it did the first time.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { runId } = useRouteRestart();

  return (
    <div key={`${pathname}#${runId}`} className={styles.page}>
      {children}
    </div>
  );
}
