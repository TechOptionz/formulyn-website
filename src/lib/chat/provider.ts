import { aleesaProvider } from "./aleesa-provider";
import { demoProvider } from "./demo-provider";
import { liveProvider } from "./live-provider";
import type { ChatProvider } from "./types";

/**
 * THE SWAP POINT. First match wins:
 *
 *   1. Aleesa Web Chat — ALEESA_WEBHOOK_URL + ALEESA_WEBCHAT_API_KEY.
 *      The bot is trained in the Aleesa dashboard (Knowledge Base + Chat
 *      Agent) and every conversation lands in the Aleesa inbox.
 *   2. Generic live API — CHAT_API_URL. Trained by src/data/chat-prompt.ts.
 *   3. Demo knowledge base — src/data/chat.ts. No configuration needed.
 *
 * Nothing else in the app changes with the choice: the UI and the API route
 * only know about the ChatProvider interface.
 *
 * See .env.example for the variables.
 */
export function getChatProvider(): ChatProvider {
  if (process.env.ALEESA_WEBHOOK_URL && process.env.ALEESA_WEBCHAT_API_KEY) {
    return aleesaProvider;
  }
  return process.env.CHAT_API_URL ? liveProvider : demoProvider;
}
