import { sendLeadEmail } from "./lead-email";
import type { Lead } from "./types";

/**
 * THE DESTINATION FOR CAPTURED LEADS.
 *
 * Every capture point — the brief form on /contact, the chat widget, and the
 * newsletter signup on /journal — routes through here, so there is one place
 * to maintain.
 *
 * Primary delivery is email via Resend (see ./lead-email). LEADS_WEBHOOK_URL
 * stays supported as an optional extra hop for a CRM or automation tool; it is
 * fire-and-forget, so a webhook outage can never cost us the lead.
 *
 * With neither configured the lead is logged server-side so the flow is
 * testable end to end — logs are not durable storage, so set RESEND_API_KEY
 * before launch.
 */
export async function deliverLead(lead: Lead): Promise<void> {
  const delivered = await sendLeadEmail(lead);

  if (delivered === "skipped") {
    console.info("[lead] captured (no RESEND_API_KEY configured)", {
      source: lead.source,
      name: lead.name,
      email: lead.email,
      brief: lead.brief,
      messages: lead.transcript.length,
    });
  }

  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) return;

  // Deliberately not awaited: the email above is the delivery that matters,
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
