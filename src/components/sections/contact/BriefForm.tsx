"use client";

import { useState } from "react";
import { briefForm } from "@/data/contact";
import { site } from "@/data/site";
import { CategorySelect } from "./CategorySelect";
import styles from "./ContactSection.module.css";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Brief intake. Posts to /api/leads — the same destination as the chat
 * widget's capture flow, so there is one place to maintain.
 *
 * Brand and category are sent as their own fields; the lead email renders a
 * labelled row for each. Both are optional, so either may be omitted.
 */
export function BriefForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  /** Bumped alongside form.reset() to clear the category picker's state. */
  const [resetToken, setResetToken] = useState(0);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const company = String(data.get("company") ?? "").trim();
    const category = String(data.get("category") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!data.get(briefForm.consent.name)) {
      setError("Please confirm the follow-up consent so we can reply.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          brief: message,
          company,
          category,
          source: "contact-form",
        }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? "Could not send that through.");
      }

      form.reset();
      setResetToken((token) => token + 1);
      setStatus("sent");
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Could not send that through.",
      );
      setStatus("error");
    }
  }

  const disabled = status === "sending";

  return (
    // The target of every "book the call" CTA on the site. Without an anchor
    // to aim at, those links resolved to /contact itself, which is a no-op for
    // anyone already on this page — the click simply did nothing.
    <form id="brief" className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formHead}>
        <h2 className={styles.formTitle}>{briefForm.title}</h2>
        <span className={styles.availability}>
          <span className={styles.availabilityDot} aria-hidden="true" />
          {site.availability}
        </span>
      </div>

      <div className={styles.fields}>
        {briefForm.fields.map((field) => (
          <label key={field.name} className={styles.fieldRow}>
            <span className={styles.fieldLabel}>
              {field.label}
              {field.required ? (
                <span className={styles.required} aria-hidden="true">
                  *
                </span>
              ) : (
                <span className={styles.optional}>optional</span>
              )}
            </span>
            <input
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              className={styles.field}
              required={field.required}
              disabled={disabled}
            />
          </label>
        ))}

        {/* A div rather than a label: the control is a button, which a
            wrapping label would not caption. */}
        <div className={styles.fieldRow}>
          <span className={styles.fieldLabel}>
            {briefForm.category.label}
            <span className={styles.optional}>optional</span>
          </span>
          <CategorySelect
            name={briefForm.category.name}
            label={briefForm.category.label}
            placeholder={briefForm.category.placeholder}
            options={briefForm.category.options}
            disabled={disabled}
            resetToken={resetToken}
          />
        </div>

        <label className={`${styles.fieldRow} ${styles.fieldFull}`}>
          <span className={styles.fieldLabel}>
            {briefForm.message.label}
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          </span>
          <textarea
            name={briefForm.message.name}
            rows={briefForm.message.rows}
            className={styles.textarea}
            required
            disabled={disabled}
          />
          <span className={styles.help}>{briefForm.message.help}</span>
        </label>
      </div>

      <label className={styles.consent}>
        <input
          type="checkbox"
          name={briefForm.consent.name}
          className={styles.checkbox}
          disabled={disabled}
        />
        <span className={styles.consentText}>{briefForm.consent.label}</span>
      </label>

      <button type="submit" className={styles.submit} disabled={disabled}>
        {status === "sending" ? "Sending…" : `${briefForm.submitLabel} →`}
      </button>

      <p className={styles.formStatus} role="status" aria-live="polite">
        {status === "sent"
          ? "Thank you — we'll be in touch within one business day."
          : status === "error"
            ? `${error} Email ${site.email} and it'll reach the same place.`
            : ""}
      </p>

      <p className={styles.footnote}>{briefForm.footnote}</p>
    </form>
  );
}
