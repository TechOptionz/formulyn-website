import type { ChatContext, ChatMessage, ChatProvider, ChatReply } from "./types";

/**
 * Adapter for Aleesa Web Chat.
 *
 * Active as soon as ALEESA_WEBHOOK_URL and ALEESA_WEBCHAT_API_KEY are set
 * (see provider.ts). Unlike the generic live provider, Aleesa is *stateful*:
 * it keeps the transcript, the knowledge base and the agent's persona on its
 * own side, keyed by `sessionId`. So this sends the latest visitor turn, not
 * the history, and not a system prompt — the bot's training lives in the
 * Aleesa dashboard (Knowledge Base + Chat Agent), not in src/data/chat-prompt.ts.
 *
 *   POST {ALEESA_WEBHOOK_URL}/webhooks/web-chat
 *   {
 *     "apiKey":    "…",            // tenant Web Chat API key, server-side only
 *     "sessionId": "chat_…",       // stable per visitor; groups the conversation
 *     "text":      "Hello",
 *     "customerName":  "…",        // optional, enriches the Aleesa contact
 *     "customerEmail": "…",
 *     "customerPhone": "…",
 *     "metadata":  { "page": "/pricing", "source": "website-widget" }
 *   }
 *
 *   -> { "success": true, "sessionId": "chat_…", "reply": "…" }
 *
 * Every turn also lands in the Aleesa inbox, so a human can take over the
 * conversation from the dashboard.
 */

const TIMEOUT_MS = 30_000;

/** The visitor's newest turn — the only part Aleesa needs from us. */
function latestUserMessage(messages: ChatMessage[]): string | null {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message.role === "user" && message.content.trim()) {
      return message.content.trim();
    }
  }
  return null;
}

const PATH = "/webhooks/web-chat";

function endpoint(): string {
  const configured = (process.env.ALEESA_WEBHOOK_URL ?? "").replace(/\/+$/, "");
  if (!configured) throw new Error("ALEESA_WEBHOOK_URL is not set");

  // The Aleesa setup guide prints the *full* endpoint, so the variable is
  // easily pasted with the path already on it. Appending blindly would then
  // POST to /webhooks/web-chat/webhooks/web-chat and 404 — from Vercel, with
  // nothing but a 502 in the browser to debug it by.
  const base = configured.endsWith(PATH)
    ? configured.slice(0, -PATH.length)
    : configured;

  return `${base}${PATH}`;
}

export const aleesaProvider: ChatProvider = {
  name: "aleesa",
  async reply(messages: ChatMessage[], context?: ChatContext): Promise<ChatReply> {
    const apiKey = process.env.ALEESA_WEBCHAT_API_KEY;
    if (!apiKey) throw new Error("ALEESA_WEBCHAT_API_KEY is not set");

    const text = latestUserMessage(messages);
    if (!text) throw new Error("No visitor message to send");

    // Without a session id Aleesa would start a fresh conversation on every
    // turn, so the bot would lose the thread. The widget supplies one; this
    // is only a backstop for callers that don't.
    const sessionId = context?.sessionId ?? `chat_${crypto.randomUUID()}`;

    const response = await fetch(endpoint(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey,
        sessionId,
        text,
        customerName: context?.customerName,
        customerEmail: context?.customerEmail,
        customerPhone: context?.customerPhone,
        metadata: {
          source: "website-widget",
          site: "formulyn.com.au",
          page: context?.page,
        },
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`Aleesa Web Chat responded ${response.status}`);
    }

    const body = (await response.json()) as {
      success?: boolean;
      reply?: unknown;
      message?: unknown;
    };

    // Aleesa can answer 200 with success:false (bad key, chat disabled for the
    // tenant). Treat that as a failure rather than echoing an empty bubble.
    if (body.success === false) {
      throw new Error(
        typeof body.message === "string"
          ? `Aleesa Web Chat rejected the request: ${body.message}`
          : "Aleesa Web Chat rejected the request",
      );
    }

    const reply = typeof body.reply === "string" ? body.reply.trim() : "";
    if (!reply) throw new Error("Aleesa Web Chat returned no reply");

    return { content: reply, demo: false };
  },
};
