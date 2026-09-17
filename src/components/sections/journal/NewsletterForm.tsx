"use client";

import { useRef, useState } from "react";
import {
  Turnstile,
  TURNSTILE_SITE_KEY,
  type TurnstileHandle,
} from "@/components/ui/Turnstile";
import { newsletter } from "@/data/journal";
import styles from "./NewsletterSignup.module.css";

type Status = "idle" | "sending" | "sent" | "error" | "captcha";

/**
 * Bench-notes signup. Posts to /api/leads tagged `newsletter`, so there is
 * one destination to maintain alongside the brief form and the chat widget.
 */
export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<TurnstileHandle>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();

    if (TURNSTILE_SITE_KEY && !captchaToken) {
      setStatus("captcha");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter subscriber",
          email,
          brief: "Subscribed to bench notes",
          source: "newsletter",
          turnstileToken: captchaToken,
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    } finally {
      // A token is single-use, so every attempt needs a fresh one.
      captchaRef.current?.reset();
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <input
        name="email"
        type="email"
        className={styles.input}
        placeholder={newsletter.placeholder}
        aria-label="Email address"
        required
        disabled={status === "sending"}
      />
      <button
        type="submit"
        className={styles.submit}
        disabled={status === "sending"}
      >
        {status === "sending" ? "…" : newsletter.submitLabel}
      </button>

      <Turnstile
        ref={captchaRef}
        onToken={setCaptchaToken}
        action="newsletter"
        appearance="interaction-only"
        className={styles.captcha}
      />

      <p className={styles.formStatus} role="status" aria-live="polite">
        {status === "sent"
          ? "You're on the list."
          : status === "captcha"
            ? "Please complete the security check, then try again."
            : status === "error"
              ? "That didn't go through. Try again shortly."
              : ""}
      </p>
    </form>
  );
}
