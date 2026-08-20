"use client";

/**
 * Category picker for the brief form.
 *
 * A native <select> draws its option list with the platform's own widget —
 * light canvas, system-blue highlight — which no stylesheet can reach. This
 * is the same control built as a WAI-ARIA combobox + listbox so the panel
 * carries the site's dark menu surface, and a hidden input so the value still
 * arrives in the form's FormData under the same name.
 */

import { useEffect, useId, useRef, useState } from "react";
import { Caret } from "@/components/ui/icons";
import styles from "./ContactSection.module.css";

type Props = {
  name: string;
  label: string;
  placeholder: string;
  options: readonly string[];
  disabled?: boolean;
  /** Bumped by the form after a successful send, to clear the selection. */
  resetToken: number;
};

export function CategorySelect({
  name,
  label,
  placeholder,
  options,
  disabled = false,
  resetToken,
}: Props) {
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  // form.reset() cannot reach React state, so the form signals the reset by
  // changing the token. Adjusted during render rather than in an effect.
  const [renderedToken, setRenderedToken] = useState(resetToken);
  if (renderedToken !== resetToken) {
    setRenderedToken(resetToken);
    setValue("");
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the highlighted option in view when arrowing through a list that
  // has scrolled.
  useEffect(() => {
    if (!open) return;
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const selectedIndex = options.indexOf(value);

  function openList(index: number) {
    setActive(index);
    setOpen(true);
  }

  function commit(index: number) {
    setValue(options[index] ?? "");
    setOpen(false);
    buttonRef.current?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const last = options.length - 1;
    const from = selectedIndex >= 0 ? selectedIndex : 0;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (open) setActive((i) => (i >= last ? 0 : i + 1));
        else openList(from);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (open) setActive((i) => (i <= 0 ? last : i - 1));
        else openList(selectedIndex >= 0 ? selectedIndex : last);
        break;
      case "Home":
        if (!open) break;
        event.preventDefault();
        setActive(0);
        break;
      case "End":
        if (!open) break;
        event.preventDefault();
        setActive(last);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) commit(active);
        else openList(from);
        break;
      case "Escape":
        if (!open) break;
        event.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.selectWrap} ref={wrapRef}>
      <input type="hidden" name={name} value={value} />

      <button
        ref={buttonRef}
        type="button"
        className={`${styles.selectTrigger} ${open ? styles.selectOpen : ""}`}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={label}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        disabled={disabled}
        onClick={() =>
          open ? setOpen(false) : openList(selectedIndex >= 0 ? selectedIndex : 0)
        }
        onKeyDown={onKeyDown}
      >
        <span className={value ? undefined : styles.selectPlaceholder}>
          {value || placeholder}
        </span>
        <Caret className={`${styles.caret} ${open ? styles.caretOpen : ""}`} />
      </button>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-label={label}
        className={`${styles.selectPanel} ${open ? styles.selectPanelOpen : ""}`}
        inert={!open}
      >
        {options.map((option, index) => (
          <li
            key={option}
            id={`${listId}-${index}`}
            role="option"
            aria-selected={option === value}
            className={[
              styles.selectOption,
              index === active ? styles.selectOptionActive : "",
              option === value ? styles.selectOptionSelected : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onPointerEnter={() => setActive(index)}
            onClick={() => commit(index)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
