import { systemPrompt } from "@/data/chat-prompt";
import type { ChatMessage, ChatProvider, ChatReply } from "./types";

/**
 * Adapter for the real chat API.
 *
 * Active as soon as CHAT_API_URL is set (see provider.ts). It POSTs the
 * bot's training (src/data/chat-prompt.ts) on every turn:
 *
 *   {
 *     "system":   "You are the FAQ assistant for Formulyn…",
 *     "messages": [ { "role": "system" | "user" | "assistant", "content": "…" } ]
 *   }
 *
 * The prompt is sent BOTH ways by default because the two conventions
 * disagree: OpenAI-style APIs read only the leading system message,
 * Anthropic-style ones read only the top-level field. Sending both means an
 * API that ignores one still reads the other — the failure being guarded
 * against is a silently untrained bot answering off-script.
 *
 * A strict Anthropic endpoint, though, rejects role:"system" inside
 * `messages` outright. Set CHAT_API_SYSTEM_MODE=system for those (or
 * =message for an API that chokes on the unknown top-level field).
 *
 * Responses are accepted in any of these shapes, so most APIs work unchanged:
 *
 *   { "content": "..." }                                  // preferred
 *   { "reply":   "..." }
 *   { "message": { "content": "..." } }                    // OpenAI-ish
 *   { "content": [ { "type": "text", "text": "..." } ] }   // Anthropic-ish
 *
 * If yours differs, adjust `extractContent` below — that is the only part
 * that should need editing.
 */

const TIMEOUT_MS = 30_000;

type UnknownRecord = Record<string, unknown>;

function extractContent(payload: unknown): string | null {
  if (typeof payload === "string") return payload;
  if (!payload || typeof payload !== "object") return null;

  const body = payload as UnknownRecord;

  if (typeof body.content === "string") return body.content;
  if (typeof body.reply === "string") return body.reply;
  if (typeof body.text === "string") return body.text;

  // { message: { content: "..." } }
  const message = body.message as UnknownRecord | undefined;
  if (message && typeof message.content === "string") return message.content;

  // { content: [ { type: "text", text: "..." } ] }
  if (Array.isArray(body.content)) {
    const text = body.content
      .map((block) =>
        block && typeof block === "object" && "text" in block
          ? String((block as UnknownRecord).text ?? "")
          : "",
      )
      .join("")
      .trim();
    if (text) return text;
  }

  // { choices: [ { message: { content: "..." } } ] }
  if (Array.isArray(body.choices)) {
    const first = body.choices[0] as UnknownRecord | undefined;
    const choiceMessage = first?.message as UnknownRecord | undefined;
    if (choiceMessage && typeof choiceMessage.content === "string") {
      return choiceMessage.content;
    }
  }

  return null;
}

/**
 * Attach the system prompt the way the configured API expects. Defaults to
 * both conventions; see CHAT_API_SYSTEM_MODE in .env.example.
 */
function buildBody(messages: ChatMessage[]) {
  const mode = process.env.CHAT_API_SYSTEM_MODE ?? "both";

  const body: Record<string, unknown> = { messages };
  if (mode !== "message") body.system = systemPrompt;
  if (mode !== "system") {
    body.messages = [{ role: "system", content: systemPrompt }, ...messages];
  }
  return body;
}

export const liveProvider: ChatProvider = {
  name: "live",
  async reply(messages: ChatMessage[]): Promise<ChatReply> {
    const url = process.env.CHAT_API_URL;
    if (!url) throw new Error("CHAT_API_URL is not set");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (process.env.CHAT_API_KEY) {
      headers.Authorization = `Bearer ${process.env.CHAT_API_KEY}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(buildBody(messages)),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`Chat API responded ${response.status}`);
    }

    const content = extractContent(await response.json());
    if (!content) {
      throw new Error("Chat API returned no readable content");
    }

    return { content, demo: false };
  },
};
