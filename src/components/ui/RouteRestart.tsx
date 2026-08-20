"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

type RouteRestart = {
  /**
   * Bumped once per re-entry. `PageTransition` folds it into its key, and the
   * remount that follows is what actually replays the route.
   */
  runId: number;
  /** Sends the current route back to the state a first-time visitor lands in. */
  restart: () => void;
};

const RouteRestartContext = createContext<RouteRestart | null>(null);

/**
 * Holds the counter behind "clicking the page you are already on takes you
 * back to the top of it".
 *
 * It wraps the whole document rather than sitting inside `PageTransition`,
 * because the links that ask for a restart — the nav rail, the drawer, the
 * footer columns — live outside the transition wrapper that answers.
 */
export function RouteRestartProvider({ children }: { children: ReactNode }) {
  const [runId, setRunId] = useState(0);

  const restart = useCallback(() => {
    // Scroll first, and synchronously: React does not commit the state update
    // until this handler returns, so the incoming tree's layout effects — a
    // `Reveal` measures itself against the viewport — run from the top of the
    // page, exactly as they would on a real navigation.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setRunId((id) => id + 1);
  }, []);

  const value = useMemo(() => ({ runId, restart }), [runId, restart]);

  return (
    <RouteRestartContext.Provider value={value}>
      {children}
    </RouteRestartContext.Provider>
  );
}

export function useRouteRestart() {
  const value = useContext(RouteRestartContext);
  if (!value) {
    throw new Error(
      "useRouteRestart must be used inside <RouteRestartProvider>",
    );
  }
  return value;
}
