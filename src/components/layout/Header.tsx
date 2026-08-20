"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navCta, navLinks } from "@/data/site";
import { SiteLink } from "@/components/ui/SiteLink";
import { Logo } from "@/components/ui/Logo";
import { NavAccordion, NavDropdown } from "./NavDropdown";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Collapse the drawer when the viewport widens back to the full nav.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1100px)");
    const sync = () => {
      if (query.matches) setMenuOpen(false);
    };
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const isCurrent = (href: string) => pathname === href;

  return (
    <nav className={styles.nav}>
      <SiteLink href="/" className={styles.wordmark} onClick={closeMenu}>
        <Logo priority />
      </SiteLink>

      <div className={styles.desktop}>
        {navLinks.map((link) =>
          link.children ? (
            <NavDropdown
              key={link.href}
              label={link.label}
              href={link.href}
              items={link.children}
              overviewLabel={link.overviewLabel}
            />
          ) : (
            <SiteLink
              key={link.href}
              href={link.href}
              className={styles.link}
              aria-current={isCurrent(link.href) ? "page" : undefined}
            >
              {link.label}
            </SiteLink>
          ),
        )}
        <SiteLink href={navCta.href} className={styles.cta}>
          {navCta.label}
        </SiteLink>
      </div>

      <div className={styles.mobile}>
        <SiteLink
          href={navCta.href}
          className={styles.ctaCompact}
          onClick={closeMenu}
        >
          {navCta.label}
        </SiteLink>
        <button
          type="button"
          className={styles.burger}
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={styles.progress} aria-hidden="true">
        <span className={styles.progressBar} />
      </div>

      {menuOpen ? (
        <div className={styles.drawer}>
          {navLinks.map((link) =>
            link.children ? (
              <NavAccordion
                key={link.href}
                label={link.label}
                href={link.href}
                items={link.children}
                overviewLabel={link.overviewLabel}
                onNavigate={closeMenu}
              />
            ) : (
              <SiteLink
                key={link.href}
                href={link.href}
                className={styles.drawerLink}
                aria-current={isCurrent(link.href) ? "page" : undefined}
                onClick={closeMenu}
              >
                {link.label}
              </SiteLink>
            ),
          )}
        </div>
      ) : null}
    </nav>
  );
}
