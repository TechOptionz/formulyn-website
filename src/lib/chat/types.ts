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
 * Anything that can answer a conversation. Implemented by the demo provider
 * today and by the live API once it is wired up.
 */
export type ChatProvider = {
  name: string;
  reply(messages: ChatMessage[]): Promise<ChatReply>;
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
