/**
 * Server-side check of a Cloudflare Turnstile token.
 *
 * Skipped when TURNSTILE_SECRET_KEY is unset, so the site still runs locally
 * without keys. Set it in every deployed environment — without it the forms
 * are unprotected.
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type VerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export async function verifyTurnstile(
  token: unknown,
  remoteIp?: string | null,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || !token || token.length > 2048) return false;

  const form = new URLSearchParams({ secret, response: token });
  if (remoteIp) form.set("remoteip", remoteIp);

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      body: form,
      signal: AbortSignal.timeout(8000),
    });
    const result = (await response.json()) as VerifyResponse;
    if (!result.success) {
      console.warn("[turnstile] rejected", result["error-codes"]);
    }
    return result.success;
  } catch (error) {
    console.error("[turnstile] verification request failed", error);
    return false;
  }
}
