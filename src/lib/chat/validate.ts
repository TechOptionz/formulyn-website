import { MAX_HISTORY, MAX_MESSAGE_LENGTH } from "./types";
import type { ChatMessage } from "./types";

/** Accepts unknown JSON and returns a safe message list, or null if invalid. */
export function parseMessages(input: unknown): ChatMessage[] | null {
  if (!input || typeof input !== "object") return null;
  const raw = (input as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const messages: ChatMessage[] = [];
  // Only the most recent turns are trusted, to cap payload size.
  for (const item of raw.slice(-MAX_HISTORY)) {
    if (!item || typeof item !== "object") return null;
    const { role, content } = item as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    const trimmed = content.trim();
    if (!trimmed) continue;
    messages.push({ role, content: trimmed.slice(0, MAX_MESSAGE_LENGTH) });
  }

  return messages.length ? messages : null;
}

/** Deliberately permissive — enough to catch typos, not to police addresses. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}
