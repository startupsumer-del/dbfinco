import { auditServices } from "@/content/audit-services";
import { getService, services } from "@/content/services";
import type { ServiceSummary } from "@/types/content";

export interface NavLink {
  label: string;
  href: string;
}

export interface MegaMenuColumn {
  heading: string;
  /** Optional route for the column heading itself. */
  href?: string;
  items: ServiceSummary[];
}

function summarize(slug: string): ServiceSummary {
  const service = getService(slug);
  if (!service) {
    throw new Error(`Unknown service slug in navigation config: ${slug}`);
  }
  return {
    slug: service.slug,
    href: service.href,
    name: service.name,
    title: service.title,
    summary: service.summary,
    icon: service.icon,
  };
}

/**
 * The Services mega-menu. Four short columns rather than one long list —
 * grouped the way clients describe their own needs.
 */
export const servicesMenu: MegaMenuColumn[] = [
  {
    heading: "Accounting",
    items: [
      summarize("accounting"),
      summarize("bookkeeping"),
      summarize("analytics"),
    ],
  },
  {
    heading: "Tax & Assurance",
    items: [summarize("tax"), summarize("audit-assurance")],
  },
  {
    heading: "Assurance Engagements",
    href: "/services/audit-assurance",
    items: auditServices.map((service) => ({
      slug: service.slug,
      href: service.href,
      name: service.name,
      title: service.title,
      summary: service.summary,
      icon: service.icon,
    })),
  },
  {
    heading: "Advisory & Payments",
    items: [
      summarize("consulting"),
      summarize("risk-advisory"),
      summarize("merchant-services"),
    ],
  },
];

/** Top-level header navigation. */
export const primaryNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Merchant Services", href: "/merchant-services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Footer link groups. Every href resolves to a real route. */
export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "All Services", href: "/services" },
      ...services
        .filter((service) => service.slug !== "merchant-services")
        .map((service) => ({ label: service.name, href: service.href })),
    ],
  },
  {
    heading: "Audit & Assurance",
    links: [
      { label: "Audit & Assurance", href: "/services/audit-assurance" },
      ...auditServices.map((service) => ({
        label: service.name,
        href: service.href,
      })),
    ],
  },
  {
    heading: "Merchant Services",
    links: [
      { label: "Merchant Services", href: "/merchant-services" },
      { label: "Card Acceptance", href: "/merchant-services#payment-methods" },
      { label: "Online Payments", href: "/merchant-services#payment-methods" },
      { label: "In-Person Payments", href: "/merchant-services#payment-methods" },
      { label: "Payment Reporting", href: "/merchant-services#reporting" },
      { label: "Merchant Onboarding", href: "/merchant-services#onboarding" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About DB FinCo", href: "/about" },
      { label: "How We Work", href: "/about#how-we-work" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
];
