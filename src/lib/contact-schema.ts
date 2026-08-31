import { z } from "zod";

/**
 * Shared contact form schema.
 *
 * Used by the client for inline validation and by the API route for
 * server-side validation, so the two can never drift apart. The server
 * always revalidates — client validation is a convenience, not a control.
 */

export const SERVICE_OPTIONS = [
  "Financial Accounting",
  "Bookkeeping",
  "Tax Services",
  "Audit & Assurance",
  "Consulting",
  "Risk & Financial Advisory",
  "Financial Analytics",
  "Merchant Services",
  "Other",
] as const;

export const BUSINESS_TYPES = [
  "Startup",
  "eCommerce / online retail",
  "Professional services",
  "Retail or hospitality",
  "Business-to-business",
  "Non-profit",
  "Other",
] as const;

export const CONTACT_PREFERENCES = ["Email", "Phone"] as const;

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(254, "Email address is too long.")
    .pipe(z.email("Please enter a valid email address.")),
  phone: z
    .string()
    .trim()
    .max(40, "Phone number is too long.")
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .trim()
    .max(120, "Company name must be 120 characters or fewer.")
    .optional()
    .or(z.literal("")),
  businessType: z.enum(BUSINESS_TYPES).optional().or(z.literal("")),
  service: z.enum(SERVICE_OPTIONS, {
    message: "Please choose the service you’re interested in.",
  }),
  preferredContact: z.enum(CONTACT_PREFERENCES).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more — at least 10 characters.")
    .max(4000, "Message must be 4000 characters or fewer."),
  /** Honeypot. Real users never see this field, so it must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<
  Record<keyof ContactInput, string>
>;

export interface ContactResponse {
  ok: boolean;
  /** "sent" when delivered, "unconfigured" when no mail transport is set up. */
  status?: "sent" | "unconfigured";
  message?: string;
  errors?: ContactFieldErrors;
}
