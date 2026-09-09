import { NextResponse } from "next/server";

import { contactSchema, type ContactFieldErrors } from "@/lib/contact-schema";
import { readOptionalEnv } from "@/lib/env";
import { clientKey, createRateLimiter } from "@/lib/rate-limit";
import { site } from "@/config/site";

export const runtime = "nodejs";

/**
 * Two budgets, because the two things being protected are different.
 *
 * `sendLimiter` guards the paid mail API and the inbox behind it, so it counts
 * only submissions that are actually about to be delivered. Five per address
 * per ten minutes is generous for a person — nobody sends a sixth message
 * about their accounts inside ten minutes.
 *
 * `requestLimiter` guards the endpoint itself against raw volume, and counts
 * everything. It is deliberately looser: a malformed request costs nothing to
 * refuse, and counting rejects against the send budget would let one bad
 * script lock out a real enquiry from the same office.
 *
 * See `lib/rate-limit.ts` for what this does and does not protect.
 */
const sendLimiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });
const requestLimiter = createRateLimiter({ limit: 40, windowMs: 10 * 60 * 1000 });

const tooManyMessage =
  "That is more messages than we can accept from one place at once. " +
  "Please call or email us directly and we will pick it up.";

function tooMany(retryAfterSeconds: number) {
  return NextResponse.json(
    { ok: false, message: tooManyMessage },
    { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
  );
}

/**
 * The largest body worth reading. Every field is capped by the schema and the
 * longest of them is a 4,000-character message, so a valid submission is a
 * few kilobytes. The cap is checked before parsing, because `request.json()`
 * would otherwise pull a multi-megabyte body into memory on its way to being
 * rejected.
 */
const MAX_BODY_BYTES = 32 * 1024;

/** Escapes text before it is placed inside the HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Handles contact form submissions.
 *
 * When no mail transport is configured the route responds honestly with
 * `status: "unconfigured"` so the UI can show real alternative contact
 * routes instead of a false success message.
 */
export async function POST(request: Request) {
  const caller = clientKey(request.headers);

  const volume = requestLimiter.check(caller);
  if (!volume.allowed) return tooMany(volume.retryAfterSeconds);

  // `content-length` can be absent or wrong, so the body is measured after
  // reading as well. Checking the header first is what avoids reading a large
  // body at all in the common case.
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, message: "That message is too large to accept." },
      { status: 413 },
    );
  }

  let payload: unknown;

  try {
    const body = await request.text();
    if (body.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { ok: false, message: "That message is too large to accept." },
        { status: 413 },
      );
    }
    payload = JSON.parse(body) as unknown;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    const errors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !(field in errors)) {
        errors[field as keyof ContactFieldErrors] = issue.message;
      }
    }
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", errors },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Honeypot tripped — respond as success so bots learn nothing, but send
  // nothing, and do not spend the send budget on it either.
  if (data.website) {
    return NextResponse.json({ ok: true, status: "sent" });
  }

  // Past validation, so this one would cost something to deliver.
  const send = sendLimiter.check(caller);
  if (!send.allowed) return tooMany(send.retryAfterSeconds);

  // Read through `readOptionalEnv` so a variable set to an empty string or to
  // whitespace counts as "not configured" — the same trap that `??` alone
  // walks into, which would otherwise address the mail to an empty string.
  const apiKey = readOptionalEnv(process.env.RESEND_API_KEY);
  const fromEmail = readOptionalEnv(process.env.CONTACT_FROM_EMAIL);
  const toEmail =
    readOptionalEnv(process.env.CONTACT_TO_EMAIL) ?? site.contact.emailEnquiry;

  if (!apiKey || !fromEmail) {
    // No transport configured. Never claim the message was delivered.
    return NextResponse.json({ ok: true, status: "unconfigured" });
  }

  const rows: [string, string][] = [
    ["Name", data.fullName],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Company", data.company || "—"],
    ["Business type", data.businessType || "—"],
    ["Service", data.service],
    ["Preferred contact", data.preferredContact || "—"],
  ];

  const html = `
    <h2>New enquiry from ${escapeHtml(site.url)}</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="font-weight:600">${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
    <h3>Message</h3>
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: data.email,
        subject: `Website enquiry — ${data.service} — ${data.fullName}`,
        html,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "We couldn’t send your message just now. Please call or email us directly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, status: "sent" });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message:
          "We couldn’t send your message just now. Please call or email us directly.",
      },
      { status: 502 },
    );
  }
}
