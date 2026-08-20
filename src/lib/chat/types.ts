export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatReply = {
  content: string;
  /** True when the reply came from the demo knowledge base, not a live model. */
  demo: boolean;
};

/**
 * Per-visitor context that travels with a turn.
 *
 * Only stateful providers use it. Aleesa needs `sessionId` to keep the
 * conversation together across turns and to file it in the right inbox
 * thread; the customer fields enrich the contact record it creates.
 */
export type ChatContext = {
  sessionId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  /** Path the visitor was on, so the reply can be read in context. */
  page?: string;
};

/**
 * Anything that can answer a conversation. Implemented by the demo provider,
 * the generic live API adapter, and the Aleesa Web Chat adapter.
 */
export type ChatProvider = {
  name: string;
  reply(messages: ChatMessage[], context?: ChatContext): Promise<ChatReply>;
};

/** Where a lead came from, so the destination can route it. */
export type LeadSource = "chat" | "contact-form" | "newsletter";

export type Lead = {
  name: string;
  email: string;
  brief: string;
  source: LeadSource;
  /** Both optional: only the brief form asks for them. */
  company?: string;
  category?: string;
  /** Conversation leading up to the capture, for context. */
  transcript: ChatMessage[];
};

export const MAX_MESSAGE_LENGTH = 2000;
export const MAX_HISTORY = 20;
