import { NextResponse } from "next/server";
import { deliverLead } from "@/lib/chat/leads";
import { isValidEmail, parseMessages } from "@/lib/chat/validate";
import { MAX_MESSAGE_LENGTH } from "@/lib/chat/types";
import type { LeadSource } from "@/lib/chat/types";

const MAX_NAME = 120;

const SOURCES: LeadSource[] = ["chat", "contact-form", "newsletter"];

function parseSource(value: unknown): LeadSource {
  return SOURCES.includes(value as LeadSource) ? (value as LeadSource) : "chat";
}

/** Company and category are optional, so anything unusable becomes undefined. */
function parseOptional(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  return value.trim().slice(0, MAX_NAME) || undefined;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, brief, source, company, category } = (body ??
    {}) as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (typeof email !== "string" || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "A valid email is required" },
      { status: 400 },
    );
  }
  if (typeof brief !== "string" || !brief.trim()) {
    return NextResponse.json({ error: "Brief is required" }, { status: 400 });
  }

  try {
    await deliverLead({
      name: name.trim().slice(0, MAX_NAME),
      email: email.trim().slice(0, MAX_NAME),
      brief: brief.trim().slice(0, MAX_MESSAGE_LENGTH),
      source: parseSource(source),
      company: parseOptional(company),
      category: parseOptional(category),
      transcript: parseMessages(body) ?? [],
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[leads] delivery failed", error);
    return NextResponse.json(
      { error: "Could not send that through." },
      { status: 502 },
    );
  }
}
