import type { Metadata } from "next";

import { addressOneLine, site } from "@/config/site";

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, `${site.url}/`).toString();
}

/**
 * Builds page metadata with a consistent title pattern, canonical URL and
 * complete Open Graph / Twitter cards so Facebook shares render correctly.
 */
export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: fullTitle,
      description,
      url,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** Organization / ProfessionalService node describing DB FinCo. */
export function organizationSchema() {
  const { address, hours } = site.contact;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    telephone: site.contact.phoneHref,
    email: site.contact.emailEnquiry,
    logo: absoluteUrl("/brand/dbfinco-logo.svg"),
    image: absoluteUrl("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.street}, ${address.unit}`,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: hours.schemaDays.map((day) => `https://schema.org/${day}`),
        opens: hours.opens,
        closes: hours.closes,
      },
    ],
    sameAs: site.social.map((profile) => profile.href),
    areaServed: { "@type": "Country", name: "United States" },
    knowsAbout: [
      "Financial accounting",
      "Bookkeeping",
      "Business tax preparation",
      "Audit and assurance",
      "Business consulting",
      "Risk and financial advisory",
      "Financial analytics",
      "Merchant services",
    ],
  };
}

/** Service node for an individual service page. */
export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: name,
    provider: {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#organization`,
      name: site.name,
      telephone: site.contact.phoneHref,
      address: addressOneLine,
    },
    areaServed: { "@type": "Country", name: "United States" },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
