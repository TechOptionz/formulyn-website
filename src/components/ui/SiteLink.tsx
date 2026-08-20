"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { useRouteRestart } from "./RouteRestart";

type SiteLinkProps = ComponentProps<typeof Link>;

/** Trailing slashes are cosmetic: "/services/" and "/services" are one page. */
function normalize(path: string) {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

/**
 * Internal navigation link. `next/link` with one addition: clicking through to
 * the page you are already on re-enters it — scrolled back to the top with its
 * entrance replayed — instead of doing nothing at all, which is what a plain
 * `Link` to the current route does.
 *
 * Use this for every in-site href, in the chrome and in the page body alike.
 * A `next/link` leaves the nav item, footer link or CTA for the current page
 * dead under the cursor.
 */
export function SiteLink({ href, onNavigate, ...rest }: SiteLinkProps) {
  const pathname = usePathname();
  const { restart } = useRouteRestart();

  const handleNavigate: NonNullable<SiteLinkProps["onNavigate"]> = (event) => {
    onNavigate?.(event);

    // Next only fires this for the unmodified same-origin clicks it would
    // route itself — new tabs, downloads and external hrefs never arrive here.
    // What is left to rule out is a link with somewhere of its own to go: a
    // hash to scroll to, a query to apply, or simply another route.
    if (typeof href !== "string" || /[#?]/.test(href)) return;
    if (normalize(href) !== normalize(pathname)) return;

    // Cancels the router's own no-op navigation in favour of the remount.
    event.preventDefault();
    restart();
  };

  return <Link {...rest} href={href} onNavigate={handleNavigate} />;
}
