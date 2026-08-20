"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { chatUi, greeting, leadFlow, suggestions } from "@/data/chat";
import { site } from "@/data/site";
import { isValidEmail } from "@/lib/chat/validate";
import type { ChatMessage } from "@/lib/chat/types";
import styles from "./ChatWidget.module.css";

/**
 * Steps of the lead capture flow. `null` means ordinary conversation.
 * The composer is reused for each step, so the flow feels like chatting.
 */
type LeadStep = "name" | "email" | "brief" | null;

type Entry = ChatMessage & { error?: boolean };

const initialEntries: Entry[] = [{ role: "assistant", content: greeting }];

const SESSION_KEY = "formulyn_chat_session_id";

/**
 * A stable id for this visitor's conversation, reused across page loads.
 *
 * The Aleesa provider keys the transcript and the inbox thread on it, so a
 * fresh id every turn would leave the bot with no memory and scatter one
 * conversation across many threads. Providers that hold no state ignore it.
 */
function getSessionId(): string {
  try {
    const existing = window.localStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const created = `chat_${crypto.randomUUID()}`;
    window.localStorage.setItem(SESSION_KEY, created);
    return created;
  } catch {
    // Private mode / storage disabled: still usable, just not across reloads.
    return `chat_${crypto.randomUUID()}`;
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [leadStep, setLeadStep] = useState<LeadStep>(null);
  const [lead, setLead] = useState({ name: "", email: "", brief: "" });
  const [leadDone, setLeadDone] = useState(false);

  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  // Minted lazily on the first send: localStorage is browser-only, and doing
  // it in an effect would set state during render for no benefit.
  const sessionIdRef = useRef("");

  const say = useCallback((content: string, error = false) => {
    setEntries((prev) => [...prev, { role: "assistant", content, error }]);
  }, []);

  // Keep the newest message in view.
  useEffect(() => {
    logRef.current?.scrollTo({
      top: logRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [entries, busy]);

  // Focus the composer when the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, leadStep]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /** Ask the API for an answer to the conversation so far. */
  const ask = useCallback(
    async (question: string) => {
      const history: Entry[] = [
        ...entries,
        { role: "user" as const, content: question },
      ];
      setEntries(history);
      setBusy(true);
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history
              .filter((entry) => !entry.error)
              .map(({ role, content }) => ({ role, content })),
            sessionId: (sessionIdRef.current ||= getSessionId()),
            // Sent once the lead flow has collected them, so the CRM contact
            // behind the conversation stops being anonymous mid-chat.
            customerName: lead.name || undefined,
            customerEmail: lead.email || undefined,
            page: window.location.pathname,
          }),
        });
        if (!response.ok) throw new Error(String(response.status));
        const data = (await response.json()) as { content: string };
        say(data.content);
      } catch {
        say(
          `I couldn't reach the assistant just then. Try again, or email ${site.email}.`,
          true,
        );
      } finally {
        setBusy(false);
      }
    },
    [entries, lead.email, lead.name, say],
  );

  /** Submit a completed lead. */
  const submitLead = useCallback(
    async (finished: typeof lead) => {
      setBusy(true);
      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...finished,
            messages: entries
              .filter((entry) => !entry.error)
              .map(({ role, content }) => ({ role, content })),
          }),
        });
        if (!response.ok) throw new Error(String(response.status));
        say(leadFlow.success);
        setLeadDone(true);
      } catch {
        say(leadFlow.failure, true);
      } finally {
        setBusy(false);
        setLeadStep(null);
      }
    },
    [entries, say],
  );

  /** Route the composer's contents based on which step we're in. */
  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const value = draft.trim();
      if (!value || busy) return;
      setDraft("");
      setEntries((prev) => [...prev, { role: "user", content: value }]);

      if (leadStep === "name") {
        setLead((prev) => ({ ...prev, name: value }));
        say(leadFlow.email);
        setLeadStep("email");
        return;
      }

      if (leadStep === "email") {
        if (!isValidEmail(value)) {
          say(leadFlow.invalidEmail);
          return; // stay on this step
        }
        setLead((prev) => ({ ...prev, email: value }));
        say(leadFlow.brief);
        setLeadStep("brief");
        return;
      }

      if (leadStep === "brief") {
        const finished = { ...lead, brief: value };
        setLead(finished);
        void submitLead(finished);
        return;
      }

      // Ordinary question. `ask` re-adds the user turn, so drop ours first.
      setEntries((prev) => prev.slice(0, -1));
      void ask(value);
    },
    [ask, busy, draft, lead, leadStep, say, submitLead],
  );

  const startLead = useCallback(() => {
    say(leadFlow.intro);
    say(leadFlow.name);
    setLeadStep("name");
  }, [say]);

  const showChips = leadStep === null && entries.length === 1 && !busy;
  const showBriefCta = leadStep === null && !leadDone && entries.length > 1;

  return (
    <div className={styles.root}>
      {open ? (
        <div
          ref={panelRef}
          className={styles.panel}
          role="dialog"
          aria-label={chatUi.title}
        >
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>{chatUi.title}</h2>
              <p className={styles.subtitle}>{chatUi.subtitle}</p>
            </div>
            <button
              type="button"
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-label={chatUi.closeLabel}
            >
              ×
            </button>
          </div>

          <div className={styles.log} ref={logRef} aria-live="polite">
            {entries.map((entry, index) => (
              <div
                key={`${index}-${entry.content.slice(0, 12)}`}
                className={[
                  styles.bubble,
                  entry.error
                    ? styles.error
                    : entry.role === "user"
                      ? styles.user
                      : styles.assistant,
                ].join(" ")}
              >
                {entry.content}
              </div>
            ))}

            {busy ? (
              <div className={styles.typing} aria-label="Assistant is typing">
                <span />
                <span />
                <span />
              </div>
            ) : null}

            {showChips ? (
              <div className={styles.starters}>
                {suggestions.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className={styles.starter}
                    onClick={() => void ask(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            ) : null}

            {showBriefCta ? (
              <div className={styles.chips}>
                <button
                  type="button"
                  className={styles.chip}
                  onClick={startLead}
                >
                  {chatUi.briefCta} →
                </button>
              </div>
            ) : null}
          </div>

          <form className={styles.composer} onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              className={styles.input}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={
                leadStep ? "Type your answer…" : chatUi.placeholder
              }
              aria-label={leadStep ? "Your answer" : chatUi.placeholder}
              disabled={busy}
            />
            <button
              type="submit"
              className={styles.send}
              disabled={busy || !draft.trim()}
            >
              {chatUi.sendLabel}
            </button>
          </form>
          <p className={styles.footnote}>{chatUi.disclaimer}</p>
        </div>
      ) : null}

      <button
        type="button"
        className={styles.launcher}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? chatUi.closeLabel : chatUi.launcherAriaLabel}
      >
        <span className={styles.launcherDot} aria-hidden="true" />
        {open ? "Close" : chatUi.launcherLabel}
      </button>
    </div>
  );
}
