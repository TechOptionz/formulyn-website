import { demoAnswers, fallbackAnswer } from "@/data/chat";
import type { ChatMessage, ChatProvider, ChatReply } from "./types";

/**
 * Keyword-scored lookup over the demo knowledge base in src/data/chat.ts.
 *
 * Intentionally conservative: if nothing scores, it returns the fallback and
 * points at a call rather than guessing. Placeholder until the live API is
 * connected — see provider.ts.
 */
/**
 * Whole-word (or whole-phrase) match. A plain `includes` would let the
 * keyword "time" match "sometimes" and "own" match "download", handing back
 * a confidently wrong answer.
 */
function mentions(haystack: string, keyword: string): boolean {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, "u").test(
    haystack,
  );
}

function findAnswer(question: string): string {
  const haystack = question.toLowerCase();

  let best: { score: number; answer: string } | null = null;

  for (const entry of demoAnswers) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (mentions(haystack, keyword)) {
        // Longer keyword matches are stronger signals than single words.
        score += keyword.includes(" ") ? 3 : 1;
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { score, answer: entry.answer };
    }
  }

  return best?.answer ?? fallbackAnswer;
}

export const demoProvider: ChatProvider = {
  name: "demo",
  async reply(messages: ChatMessage[]): Promise<ChatReply> {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    return {
      content: findAnswer(lastUser?.content ?? ""),
      demo: true,
    };
  },
};
