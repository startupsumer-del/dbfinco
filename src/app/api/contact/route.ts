import { NextResponse } from "next/server";

import { contactSchema, type ContactFieldErrors } from "@/lib/contact-schema";
import { site } from "@/config/site";

export const runtime = "nodejs";

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
  let payload: unknown;

  try {
    payload = await request.json();
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

  // Honeypot tripped — respond as success so bots learn nothing, but send nothing.
  if (data.website) {
    return NextResponse.json({ ok: true, status: "sent" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? site.contact.emailEnquiry;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

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
