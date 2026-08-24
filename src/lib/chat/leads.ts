import { sendLeadToAleesa } from "./aleesa-leads";
import { sendLeadEmail } from "./lead-email";
import type { Lead } from "./types";

/**
 * THE DESTINATION FOR CAPTURED LEADS.
 *
 * Every capture point — the brief form on /contact, the chat widget, and the
 * newsletter signup on /journal — routes through here, so there is one place
 * to maintain.
 *
 * There are two primary deliveries, and they are independent: email via Resend
 * (see ./lead-email) and the Aleesa CRM (see ./aleesa-leads). Both run, and
 * either one landing is enough to consider the lead captured — configuring
 * only one of them is a supported setup, and an outage in one must not cost us
 * a lead the other accepted. LEADS_WEBHOOK_URL stays supported on top of both
 * as an optional extra hop for another CRM or automation tool.
 *
 * With none configured the lead is logged server-side so the flow is testable
 * end to end — logs are not durable storage, so set RESEND_API_KEY or
 * ALEESA_WEBSITE_FORM_API_KEY before launch.
 */
export async function deliverLead(lead: Lead): Promise<void> {
  // Settled rather than all: a rejected email must not skip the CRM write,
  // and vice versa. Both are awaited — a serverless function is frozen the
  // moment it responds, so a floating promise here would simply be dropped.
  const results = await Promise.allSettled([
    sendLeadEmail(lead),
    sendLeadToAleesa(lead),
  ]);

  const failures = results.filter((result) => result.status === "rejected");
  const sent = results.filter(
    (result) => result.status === "fulfilled" && result.value === "sent",
  );

  for (const failure of failures) {
    console.error("[lead] delivery failed", failure.reason);
  }

  // Every configured destination rejected, so nothing has the lead. Surface it
  // to the visitor — the form tells them to email us instead.
  if (failures.length > 0 && sent.length === 0) {
    throw failures[0].reason;
  }

  if (results.length === failures.length + sent.length && sent.length === 0) {
    console.info("[lead] captured (no delivery destination configured)", {
      source: lead.source,
      name: lead.name,
      email: lead.email,
      brief: lead.brief,
      messages: lead.transcript.length,
    });
  }

  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) return;

  // Deliberately not awaited: the deliveries above are the ones that matter,
  // and a slow or broken webhook must not fail the visitor's submission.
  void postWebhook(url, lead).catch((error) => {
    console.error("[lead] webhook failed", error);
  });
}

async function postWebhook(url: string, lead: Lead): Promise<void> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (process.env.LEADS_WEBHOOK_SECRET) {
    headers.Authorization = `Bearer ${process.env.LEADS_WEBHOOK_SECRET}`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`Lead webhook responded ${response.status}`);
  }
}
