/**
 * Single source of truth for DB FinCo company facts.
 *
 * Every phone number, email address, postal address and social profile used
 * anywhere on the site is read from this file. Nothing here is invented:
 * each value is a verified DB FinCo business detail.
 */

export const site = {
  name: "DB FinCo",
  legalName: "DB FinCo",
  tagline: "Financial Accounting Services",
  /** One-line positioning used for meta descriptions and structured data. */
  description:
    "DB FinCo is a firm of accountants and business advisors providing accounting, bookkeeping, tax, audit and assurance, consulting, risk and financial advisory, analytics and merchant services to small and medium-sized businesses.",

  /** Public origin. Overridden per-environment so previews get correct URLs. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://dbfinco.com",

  contact: {
    /** Primary line, formatted for display. */
    phoneDisplay: "718-559-7748",
    /** E.164 for tel: links. */
    phoneHref: "+17185597748",
    emailEnquiry: "enquiry@dbfinco.com",
    emailSupport: "support@dbfinco.com",
    address: {
      label: "Head Office",
      street: "459 Columbus Ave",
      unit: "Unit 1090",
      locality: "New York",
      region: "NY",
      postalCode: "10024",
      country: "US",
      countryName: "United States",
    },
    hours: {
      label: "Monday – Friday, 9:00 AM – 6:30 PM",
      days: "Monday – Friday",
      opens: "09:00",
      closes: "18:30",
      /** Schema.org dayOfWeek values matching the hours above. */
      schemaDays: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ] as const,
    },
  },

  /**
   * Only profiles confirmed by the business owner appear here.
   * Unverified profiles are deliberately absent rather than guessed.
   */
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/dbfinco",
      label: "DB FinCo on Facebook",
    },
  ],
} as const;

/** Full postal address on one line, for footers and meta tags. */
export const addressOneLine = [
  site.contact.address.street,
  site.contact.address.unit,
  `${site.contact.address.locality}, ${site.contact.address.region} ${site.contact.address.postalCode}`,
].join(", ");

/**
 * Where "Schedule a Free Consultation" points.
 * When no booking tool is configured the CTA falls back to the contact page,
 * which is a real, working destination — never a dead link.
 */
export const bookingUrl =
  process.env.NEXT_PUBLIC_BOOKING_URL && process.env.NEXT_PUBLIC_BOOKING_URL !== ""
    ? process.env.NEXT_PUBLIC_BOOKING_URL
    : "/contact";

/** True when the consultation CTA leaves the site. */
export const bookingIsExternal = bookingUrl.startsWith("http");

export const telHref = `tel:${site.contact.phoneHref}`;
export const mailtoEnquiry = `mailto:${site.contact.emailEnquiry}`;
export const mailtoSupport = `mailto:${site.contact.emailSupport}`;

/** Google Maps directions link built from the verified address. */
export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.contact.address.street} ${site.contact.address.unit}, ${site.contact.address.locality}, ${site.contact.address.region} ${site.contact.address.postalCode}`,
)}`;
