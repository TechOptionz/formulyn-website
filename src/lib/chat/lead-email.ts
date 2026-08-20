import { Resend } from "resend";
import { site } from "@/data/site";
import type { Lead } from "./types";

/**
 * Emails a captured lead to Formulyn via Resend.
 *
 * Config (see .env.example):
 *   RESEND_API_KEY     required — without it sendLeadEmail() reports "skipped"
 *   LEADS_EMAIL_TO     defaults to site.email
 *   LEADS_EMAIL_FROM   defaults to Resend's shared sender, which can only
 *                      deliver to the Resend account owner. Point this at a
 *                      verified formulyn.com.au address before launch.
 */

/** Resend's shared sender — works before domain verification, but only ever
 *  delivers to the address that owns the Resend account. */
const FALLBACK_FROM = "Formulyn <onboarding@resend.dev>";

/** Brand tokens, mirrored from globals — email clients cannot read CSS vars. */
const INK = "#0d1310";
const BONE = "#f2ede3";
const GOLD = "#c9963f";
const MUTED = "#6e7a6e";

const SUBJECTS: Record<Lead["source"], string> = {
  chat: "New chat lead",
  "contact-form": "New brief",
  newsletter: "Newsletter signup",
};

/** Lead content is visitor-supplied, so it is escaped before it meets HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toParagraphs(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

function renderTranscript(lead: Lead): string {
  if (!lead.transcript.length) return "";

  const turns = lead.transcript
    .map((message) => {
      const who = message.role === "user" ? "Visitor" : "Assistant";
      const color = message.role === "user" ? INK : MUTED;
      return `
        <tr>
          <td style="padding:0 0 12px;">
            <div style="font:600 11px/1.4 -apple-system,Segoe UI,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:${color};padding-bottom:3px;">${who}</div>
            <div style="font:400 14px/1.6 -apple-system,Segoe UI,sans-serif;color:${INK};">${toParagraphs(message.content)}</div>
          </td>
        </tr>`;
    })
    .join("");

  return `
    <tr><td style="padding:28px 0 0;">
      <div style="font:600 11px/1.4 -apple-system,Segoe UI,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:${MUTED};padding-bottom:12px;">Conversation before capture</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="border-left:2px solid ${BONE};padding-left:16px;">${turns}</table>
    </td></tr>`;
}

function renderRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:0 0 16px;">
        <div style="font:600 11px/1.4 -apple-system,Segoe UI,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:${MUTED};padding-bottom:4px;">${label}</div>
        <div style="font:400 15px/1.6 -apple-system,Segoe UI,sans-serif;color:${INK};">${value}</div>
      </td>
    </tr>`;
}

function renderHtml(lead: Lead): string {
  const mailto = `<a href="mailto:${escapeHtml(lead.email)}" style="color:${GOLD};text-decoration:none;">${escapeHtml(lead.email)}</a>`;

  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:${BONE};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
             style="max-width:560px;background:#ffffff;border-radius:4px;overflow:hidden;">
        <tr><td style="background:${INK};padding:22px 32px;">
          <div style="font:600 15px/1.3 -apple-system,Segoe UI,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:${BONE};">Formulyn</div>
          <div style="font:400 13px/1.4 -apple-system,Segoe UI,sans-serif;color:${GOLD};padding-top:3px;">${SUBJECTS[lead.source]}</div>
        </td></tr>
        <tr><td style="padding:32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${renderRow("Name", escapeHtml(lead.name))}
            ${lead.company ? renderRow("Company", escapeHtml(lead.company)) : ""}
            ${renderRow("Email", mailto)}
            ${lead.category ? renderRow("Category", escapeHtml(lead.category)) : ""}
            ${renderRow("Brief", toParagraphs(lead.brief))}
            ${renderTranscript(lead)}
          </table>
        </td></tr>
        <tr><td style="padding:16px 32px;background:${BONE};font:400 12px/1.5 -apple-system,Segoe UI,sans-serif;color:${MUTED};">
          Reply to this email to reach ${escapeHtml(lead.name)} directly.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function renderText(lead: Lead): string {
  const lines = [
    `${SUBJECTS[lead.source]} — ${site.name}`,
    "",
    `Name:     ${lead.name}`,
    ...(lead.company ? [`Company:  ${lead.company}`] : []),
    `Email:    ${lead.email}`,
    ...(lead.category ? [`Category: ${lead.category}`] : []),
    "",
    "Brief:",
    lead.brief,
  ];

  if (lead.transcript.length) {
    lines.push("", "Conversation before capture:", "");
    for (const message of lead.transcript) {
      lines.push(
        `${message.role === "user" ? "Visitor" : "Assistant"}: ${message.content}`,
      );
    }
  }

  lines.push("", `Reply to this email to reach ${lead.name} directly.`);
  return lines.join("\n");
}

/**
 * Sends the lead. Returns "skipped" when no API key is configured, so callers
 * can fall back to logging in local development instead of failing the form.
 * Throws when Resend is configured but rejects the send.
 */
export async function sendLeadEmail(lead: Lead): Promise<"sent" | "skipped"> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return "skipped";

  const from = process.env.LEADS_EMAIL_FROM || FALLBACK_FROM;
  // LEADS_EMAIL_TO may name several recipients, comma-separated.
  const to = (process.env.LEADS_EMAIL_TO || site.email)
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  if (from === FALLBACK_FROM) {
    console.warn(
      "[lead] LEADS_EMAIL_FROM is unset — sending via onboarding@resend.dev, " +
        "which only delivers to the Resend account owner. Verify formulyn.com.au " +
        "and set a real sender before launch.",
    );
  }

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to,
    replyTo: lead.email,
    subject: `${SUBJECTS[lead.source]} — ${lead.name}`,
    html: renderHtml(lead),
    text: renderText(lead),
  });

  if (error) {
    throw new Error(`Resend rejected the send: ${error.name} — ${error.message}`);
  }

  return "sent";
}
