import type { Metadata } from "next";

import Link from "next/link";

import { JsonLd } from "@/components/layout/JsonLd";
import { CtaSection } from "@/components/sections/CtaSection";
import { ServicePortrait } from "@/components/imagery/ServicePortrait";
import { PageBanner } from "@/components/sections/PageBanner";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { auditServices } from "@/content/audit-services";
import { coreServices, getService, services } from "@/content/services";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Services",
  description:
    "Accounting, bookkeeping, tax, audit and assurance, consulting, risk advisory, financial analytics and merchant services for small and medium-sized businesses.",
  path: "/services",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  const merchant = getService("merchant-services");

  return (
    <>
      <PageBanner
        crumbs={crumbs}
        eyebrow="Our Services"
        title="A Complete Finance Function, Delivered by One Firm"
        lead="Every service below can be engaged on its own. Most clients combine two or three, and they work better together — the tax return is prepared from books we keep, and the advisory work draws on reporting we build."
        visual={<ServicePortrait slug="services" />}
        actions={
          /* Jump links to every service on the page. They earn their place
             twice: a directory should let you go straight to the one you came
             for, and the copy column runs shorter than the portrait beside it,
             which without them ends in a band of empty banner. */
          <nav aria-label="Services on this page">
            <ul className="flex flex-wrap gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={service.href}
                    className="inline-flex min-h-9 items-center rounded-pill border
                      border-white/25 bg-white/[0.06] px-3.5 py-1.5 text-sm font-medium
                      text-purple-50 transition-colors duration-200
                      hover:border-white/50 hover:bg-white/15 hover:text-white
                      focus-visible:outline-2 focus-visible:outline-offset-2
                      focus-visible:outline-gold-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      <Section tone="subtle" ariaLabelledBy="core-heading">
        <Container>
          <SectionHeading
            id="core-heading"
            eyebrow="Core Services"
            title="Accounting, Tax and Advisory"
            lead="Each one shares the same books and the same chart of accounts, so the work compounds instead of being repeated."
          />

          <ServiceGrid services={coreServices} className="mt-10 lg:mt-14" />
        </Container>
      </Section>

      <Section tone="white" ariaLabelledBy="assurance-heading">
        <Container>
          <SectionHeading
            id="assurance-heading"
            eyebrow="Assurance Engagements"
            title="Three Distinct Engagements, Not Three Names for One Thing"
            lead="An audit, an internal audit and an agreed-upon procedures engagement are performed under different standards and produce different reports. We will tell you which one answers your question."
          />
          <ServiceGrid services={auditServices} className="mt-10" />
        </Container>
      </Section>

      {merchant ? (
        <Section tone="lilac" ariaLabelledBy="payments-heading">
          <Container>
            <SectionHeading
              id="payments-heading"
              eyebrow="Payments"
              title="Merchant Services"
              lead="Support for accepting card, online, in-person and ACH payments — and for reconciling every settlement, fee and reversal back into your books."
            />
            <ServiceGrid services={[merchant]} className="mt-10" columns={3} />
          </Container>
        </Section>
      ) : null}

      <CtaSection
        heading="Not Sure Which Services You Need?"
        body="Describe your situation in a free consultation and we will tell you what we would recommend — including where you need less than you thought."
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
