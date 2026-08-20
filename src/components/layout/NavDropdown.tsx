"use client";

/**
 * Nav disclosure for any `NavLink` that carries `children` — the Services
 * item today, anything else tomorrow. `NavDropdown` is the desktop rail's
 * hover/keyboard menu; `NavAccordion` is the same content as an expanding
 * block in the mobile drawer. Both render the shared `ServiceRow`, so a row
 * only has to be styled once.
 *
 * Accessibility follows the WAI-ARIA disclosure navigation pattern: a button
 * with `aria-expanded` / `aria-controls` revealing a plain list of links, so
 * screen readers announce real links rather than menu items. Arrow keys,
 * Home / End and Escape are handled on top of that.
 */

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { NavChild } from "@/data/site";
import { Caret, serviceIcons } from "@/components/ui/icons";
import { SiteLink } from "@/components/ui/SiteLink";
import styles from "./NavDropdown.module.css";

/** Grace period for crossing the gap between the trigger and the panel. */
const CLOSE_DELAY_MS = 180;

/** True on the section's own page and on anything beneath it. */
function inSection(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

type RowProps = {
  item: NavChild;
  /** Extra class for the variant that owns the row's box metrics. */
  variantClass?: string;
  current: boolean;
  onSelect: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLAnchorElement>) => void;
  registerRef?: (node: HTMLAnchorElement | null) => void;
};

function ServiceRow({
  item,
  variantClass = "",
  current,
  onSelect,
  onKeyDown,
  registerRef,
}: RowProps) {
  const Icon = serviceIcons[item.icon];

  return (
    <li className={styles.row}>
      <SiteLink
        ref={registerRef}
        href={item.href}
        className={`${styles.rowLink} ${variantClass}`}
        aria-current={current ? "page" : undefined}
        onClick={onSelect}
        onKeyDown={onKeyDown}
      >
        <span className={styles.rowIcon}>
          <Icon />
        </span>
        <span className={styles.rowBody}>
          <span className={styles.rowTitle}>{item.label}</span>
          <span className={styles.rowText}>{item.description}</span>
        </span>
        <span className={styles.rowArrow} aria-hidden="true">
          →
        </span>
      </SiteLink>
    </li>
  );
}

type DropdownProps = {
  label: string;
  /** The section's own index page. */
  href: string;
  items: NavChild[];
  overviewLabel?: string;
};

export function NavDropdown({
  label,
  href,
  items,
  overviewLabel,
}: DropdownProps) {
  const pathname = usePathname();
  const panelId = useId();
  const [open, setOpen] = useState(false);

  // A navigation that happened elsewhere — a browser back, say — should
  // leave the menu behind, adjusted during render rather than in an effect.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const closeTimer = useRef<number | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const close = useCallback(
    (returnFocus = false) => {
      cancelClose();
      // Focus first: once React commits, the panel is inert.
      if (returnFocus) triggerRef.current?.focus();
      setOpen(false);
    },
    [cancelClose],
  );

  const openWithFocus = useCallback(
    (index: number | null) => {
      cancelClose();
      setOpen(true);
      // Panel links are unfocusable while the panel is hidden, so focus has
      // to wait for the frame that reveals it.
      if (index !== null) {
        window.requestAnimationFrame(() => itemRefs.current[index]?.focus());
      }
    },
    [cancelClose],
  );

  useEffect(() => cancelClose, [cancelClose]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const focusItem = (index: number) => {
    const wrapped = (index + items.length) % items.length;
    itemRefs.current[wrapped]?.focus();
  };

  const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openWithFocus(0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openWithFocus(items.length - 1);
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      close();
    }
  };

  const onItemKeyDown =
    (index: number) => (event: React.KeyboardEvent<HTMLAnchorElement>) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          focusItem(index + 1);
          break;
        case "ArrowUp":
          event.preventDefault();
          focusItem(index - 1);
          break;
        case "Home":
          event.preventDefault();
          focusItem(0);
          break;
        case "End":
          event.preventDefault();
          focusItem(items.length - 1);
          break;
        case "Escape":
          event.preventDefault();
          close(true);
          break;
        default:
          break;
      }
    };

  // Tabbing or clicking past the whole disclosure closes it.
  const onBlurCapture = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!wrapRef.current?.contains(event.relatedTarget)) close();
  };

  return (
    <div
      ref={wrapRef}
      className={styles.wrap}
      onMouseEnter={() => openWithFocus(null)}
      onMouseLeave={() => {
        cancelClose();
        closeTimer.current = window.setTimeout(
          () => setOpen(false),
          CLOSE_DELAY_MS,
        );
      }}
      onBlur={onBlurCapture}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? close() : openWithFocus(null))}
        onKeyDown={onTriggerKeyDown}
      >
        {label}
        <Caret className={styles.caret} />
      </button>

      <div
        id={panelId}
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        inert={!open}
      >
        <div className={styles.panelHead}>
          <span className={styles.panelEyebrow}>{label}</span>
          <SiteLink
            href={href}
            className={styles.panelAll}
            aria-current={pathname === href ? "page" : undefined}
            onClick={() => close()}
          >
            {overviewLabel ?? `All ${label}`} →
          </SiteLink>
        </div>

        <ul className={styles.list}>
          {items.map((item, index) => (
            <ServiceRow
              key={item.href}
              item={item}
              current={pathname === item.href}
              onSelect={() => close()}
              onKeyDown={onItemKeyDown(index)}
              registerRef={(node) => {
                itemRefs.current[index] = node;
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

type AccordionProps = DropdownProps & {
  /** Closes the drawer that owns this accordion. */
  onNavigate: () => void;
};

export function NavAccordion({
  label,
  href,
  items,
  overviewLabel,
  onNavigate,
}: AccordionProps) {
  const pathname = usePathname();
  const panelId = useId();
  // Already expanded when the drawer is opened from inside the section.
  const [open, setOpen] = useState(() => inSection(pathname, href));

  return (
    <div className={styles.acc}>
      <button
        type="button"
        className={styles.accTrigger}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <Caret className={`${styles.caret} ${open ? styles.caretOpen : ""}`} />
      </button>

      <div
        id={panelId}
        className={`${styles.accPanel} ${open ? styles.accPanelOpen : ""}`}
        inert={!open}
      >
        <div className={styles.accClip}>
          <ul className={styles.list}>
            {items.map((item) => (
              <ServiceRow
                key={item.href}
                item={item}
                variantClass={styles.accRowLink}
                current={pathname === item.href}
                onSelect={onNavigate}
              />
            ))}
          </ul>
          <SiteLink
            href={href}
            className={styles.accOverview}
            aria-current={pathname === href ? "page" : undefined}
            onClick={onNavigate}
          >
            {overviewLabel ?? `All ${label}`} →
          </SiteLink>
        </div>
      </div>
    </div>
  );
}
