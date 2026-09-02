"use client";

import { CircleAlert, CircleCheck, Loader2, Send } from "lucide-react";
import { useId, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { mailtoEnquiry, site, telHref } from "@/config/site";
import {
  BUSINESS_TYPES,
  CONTACT_PREFERENCES,
  SERVICE_OPTIONS,
  contactSchema,
  type ContactFieldErrors,
  type ContactResponse,
} from "@/lib/contact-schema";
import { cn } from "@/lib/cn";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "unconfigured" }
  | { kind: "error"; message: string };

const labelClass = "block text-sm font-medium text-ink-primary";
const fieldClass =
  "mt-2 block w-full min-h-11 rounded-lg border bg-white px-3.5 py-2.5 text-base " +
  "text-ink-primary placeholder:text-ink-muted transition-colors " +
  "focus:outline-2 focus:outline-offset-2 focus:outline-purple-700";

export function ContactForm() {
  const formId = useId();
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const statusRef = useRef<HTMLDivElement>(null);

  const fieldId = (name: string) => `${formId}-${name}`;
  const errorId = (name: string) => `${formId}-${name}-error`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const raw = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      company: String(formData.get("company") ?? ""),
      businessType: String(formData.get("businessType") ?? ""),
      service: String(formData.get("service") ?? ""),
      preferredContact: String(formData.get("preferredContact") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    const parsed = contactSchema.safeParse(raw);

    if (!parsed.success) {
      const nextErrors: ContactFieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !(field in nextErrors)) {
          nextErrors[field as keyof ContactFieldErrors] = issue.message;
        }
      }
      setErrors(nextErrors);
      setStatus({ kind: "idle" });

      // Move focus to the first field with an error.
      const firstField = Object.keys(nextErrors)[0];
      if (firstField) {
        document.getElementById(fieldId(firstField))?.focus();
      }
      return;
    }

    setErrors({});
    setStatus({ kind: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const result = (await response.json()) as ContactResponse;

      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {});
        setStatus({
          kind: "error",
          message:
            result.message ??
            "We couldn't send your message just now. Please call or email us directly.",
        });
        statusRef.current?.focus();
        return;
      }

      setStatus({ kind: result.status === "sent" ? "sent" : "unconfigured" });
      form.reset();
      statusRef.current?.focus();
    } catch {
      setStatus({
        kind: "error",
        message:
          "We couldn't reach the server. Please call or email us directly and we'll pick it up straight away.",
      });
      statusRef.current?.focus();
    }
  }

  const submitting = status.kind === "submitting";

  return (
    <div>
      {/* Live region for the submission outcome */}
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={cn(status.kind === "idle" || submitting ? "sr-only" : "mb-8")}
      >
        {status.kind === "sent" ? (
          <div className="rounded-xl border border-success/30 bg-success/5 p-5 sm:p-6">
            <p className="flex items-center gap-2.5 text-h4 font-semibold text-ink-primary">
              <CircleCheck aria-hidden="true" className="size-5 shrink-0 text-success" />
              Message sent
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
              Thank you for getting in touch. We&apos;ve received your message
              and will respond as soon as we can.
            </p>
          </div>
        ) : null}

        {status.kind === "unconfigured" ? (
          <div className="rounded-xl border border-warning/30 bg-warning/5 p-5 sm:p-6">
            <p className="flex items-center gap-2.5 text-h4 font-semibold text-ink-primary">
              <CircleAlert aria-hidden="true" className="size-5 shrink-0 text-warning" />
              Message not delivered
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
              This form isn&apos;t connected to our mail system yet, so your
              message wasn&apos;t sent. Please reach us directly — we&apos;ll
                respond the same way we would to any enquiry.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={telHref}
                  className="font-semibold text-purple-800 underline underline-offset-2"
                >
                  Call {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={mailtoEnquiry}
                  className="font-semibold break-all text-purple-800 underline underline-offset-2"
                >
                  Email {site.contact.emailEnquiry}
                </a>
              </li>
            </ul>
          </div>
        ) : null}

        {status.kind === "error" ? (
          <div className="rounded-xl border border-danger/30 bg-danger/5 p-5 sm:p-6">
            <p className="flex items-center gap-2.5 text-h4 font-semibold text-ink-primary">
              <CircleAlert aria-hidden="true" className="size-5 shrink-0 text-danger" />
              Something went wrong
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
              {status.message}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={telHref}
                  className="font-semibold text-purple-800 underline underline-offset-2"
                >
                  Call {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={mailtoEnquiry}
                  className="font-semibold break-all text-purple-800 underline underline-offset-2"
                >
                  Email {site.contact.emailEnquiry}
                </a>
              </li>
            </ul>
          </div>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            id={fieldId("fullName")}
            errorId={errorId("fullName")}
            name="fullName"
            label="Full name"
            required
            autoComplete="name"
            error={errors.fullName}
          />
          <Field
            id={fieldId("email")}
            errorId={errorId("email")}
            name="email"
            label="Work email"
            type="email"
            inputMode="email"
            required
            autoComplete="email"
            error={errors.email}
          />
          <Field
            id={fieldId("phone")}
            errorId={errorId("phone")}
            name="phone"
            label="Phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            optional
            error={errors.phone}
          />
          <Field
            id={fieldId("company")}
            errorId={errorId("company")}
            name="company"
            label="Company name"
            autoComplete="organization"
            optional
            error={errors.company}
          />

          <div>
            <label htmlFor={fieldId("businessType")} className={labelClass}>
              Business type{" "}
              <span className="font-normal text-ink-muted">(optional)</span>
            </label>
            <select
              id={fieldId("businessType")}
              name="businessType"
              defaultValue=""
              className={cn(fieldClass, "border-line")}
            >
              <option value="">Select an option</option>
              {BUSINESS_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={fieldId("service")} className={labelClass}>
              Service you&apos;re interested in{" "}
              <span className="text-danger" aria-hidden="true">
                *
              </span>
            </label>
            <select
              id={fieldId("service")}
              name="service"
              defaultValue=""
              required
              aria-invalid={errors.service ? true : undefined}
              aria-describedby={errors.service ? errorId("service") : undefined}
              className={cn(
                fieldClass,
                errors.service ? "border-danger" : "border-line",
              )}
            >
              <option value="">Select a service</option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.service ? (
              <FieldError id={errorId("service")}>{errors.service}</FieldError>
            ) : null}
          </div>
        </div>

        <fieldset>
          <legend className={labelClass}>
            Preferred contact method{" "}
            <span className="font-normal text-ink-muted">(optional)</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {CONTACT_PREFERENCES.map((preference) => (
              <label
                key={preference}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-pill
                  border border-line bg-white px-4 py-2.5 text-sm text-ink-secondary
                  transition-colors hover:border-purple-300 hover:bg-purple-50
                  has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50
                  has-[:checked]:text-purple-900"
              >
                <input
                  type="radio"
                  name="preferredContact"
                  value={preference}
                  className="size-4 accent-[var(--color-purple-700)]"
                />
                {preference}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor={fieldId("message")} className={labelClass}>
            How can we help?{" "}
            <span className="text-danger" aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            id={fieldId("message")}
            name="message"
            rows={6}
            required
            placeholder="Tell us about your business, where your finances stand today, and what's prompting you to get in touch."
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? errorId("message") : undefined}
            className={cn(
              fieldClass,
              "resize-y",
              errors.message ? "border-danger" : "border-line",
            )}
          />
          {errors.message ? (
            <FieldError id={errorId("message")}>{errors.message}</FieldError>
          ) : null}
        </div>

        {/* Honeypot — hidden from users and assistive technology alike. */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor={fieldId("website")}>Website</label>
          <input
            id={fieldId("website")}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-ink-muted sm:max-w-sm">
            We use your details only to respond to this enquiry. See our{" "}
            <a
              href="/privacy"
              className="text-purple-700 underline underline-offset-2 hover:text-purple-900"
            >
              privacy policy
            </a>
            .
          </p>
          <Button type="submit" size="lg" disabled={submitting} className="sm:w-auto" fullWidth>
            {submitting ? (
              <>
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send message
                <Send aria-hidden="true" className="size-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({
  id,
  errorId,
  name,
  label,
  type = "text",
  inputMode,
  autoComplete,
  required = false,
  optional = false,
  error,
}: {
  id: string;
  errorId: string;
  name: string;
  label: string;
  type?: string;
  inputMode?: "email" | "tel" | "text";
  autoComplete?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}{" "}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            *
          </span>
        ) : null}
        {optional ? (
          <span className="font-normal text-ink-muted">(optional)</span>
        ) : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(fieldClass, error ? "border-danger" : "border-line")}
      />
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm text-danger">
      <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      {children}
    </p>
  );
}
