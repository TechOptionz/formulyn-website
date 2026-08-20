import { NextResponse } from "next/server";
import { getChatProvider } from "@/lib/chat/provider";
import { parseChatContext, parseMessages } from "@/lib/chat/validate";

/** Answers a conversation turn. Provider is chosen in lib/chat/provider.ts. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages) {
    return NextResponse.json(
      { error: "Expected { messages: [{ role, content }] }" },
      { status: 400 },
    );
  }

  // Optional; only stateful providers (Aleesa) read it.
  const context = parseChatContext(body);

  try {
    const reply = await getChatProvider().reply(messages, context);
    return NextResponse.json(reply);
  } catch (error) {
    // Never surface provider internals to the browser.
    console.error("[chat] provider failed", error);
    return NextResponse.json(
      { error: "The assistant is unavailable right now." },
      { status: 502 },
    );
  }
}
