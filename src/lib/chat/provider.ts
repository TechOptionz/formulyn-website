import { demoProvider } from "./demo-provider";
import { liveProvider } from "./live-provider";
import type { ChatProvider } from "./types";

/**
 * THE SWAP POINT.
 *
 * Set CHAT_API_URL in the environment and the live provider takes over;
 * leave it unset and the demo knowledge base answers. Nothing else in the
 * app needs to change — the UI and the API route only know about the
 * ChatProvider interface.
 *
 * See live-provider.ts for the request/response shape to implement, and
 * .env.example for the variables.
 */
export function getChatProvider(): ChatProvider {
  return process.env.CHAT_API_URL ? liveProvider : demoProvider;
}
