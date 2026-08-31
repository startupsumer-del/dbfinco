import type { Metadata } from "next";
import { ArrowRight, Building2, Compass, Handshake, ScrollText } from "lucide-react";

import { JsonLd } from "@/components/layout/JsonLd";
import { ReportingPreview } from "@/components/charts/ReportingPreview";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Breadcrumbs } from "@/components/sections/ServicePageTemplate";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { WhyDbFinco } from "@/components/sections/WhyDbFinco";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { coreServices } from "@/content/services";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About DB FinCo",
  description:
    "DB FinCo is a firm of accountants and business advisors focused on improving the financial outlook of small and medium-sized businesses through accounting, tax, assurance and advisory services.",
  path: "/about",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const principles = [
  {
    icon: Compass,
    title: "Accuracy before presentation",
    body: "Reporting is only worth producing if the underlying records are right. We fix the foundation first, even when that is the less exciting piece of work.",
  },
  {
    icon: ScrollText,
    title: "Precise terminology",
    body: "An audit, a review and agreed-upon procedures are different engagements. We use the correct term for what we are actually doing, and explain the difference before you commit.",
  },
  {
    icon: Handshake,
    title: "Scope agreed in writing",
    body: "Every engagement is defined before it starts. If the work uncovers something that changes the scope, we come back to you rather than expanding it quietly.",
  },
  {
    icon: Building2,
    title: "Privately held focus",
    body: "Our assurance practice works exclusively with privately held companies, which keeps engagements clear of public company regulation and reporting deadlines.",
  },
];

const howWeWork = [
  {
    title: "We learn the business first",
    description:
      "Before recommending anything we understand how money moves through your organisation — how you sell, how you get paid and where the costs sit.",
  },
  {
    title: "We fix the foundation",
    description:
      "Chart of accounts, opening balances, reconciliations and accounting policy come before reporting. Analysis built on unreliable books produces confident wrong answers.",
  },
  {
    title: "We set a rhythm",
    description:
      "Close dates, reporting dates and filing dates are agreed and held, so the finance function becomes predictable rather than reactive.",
  },
  {
    title: "We stay available",
    description:
      "A named accountant who knows your history handles your account. Questions between reporting cycles get answered by someone with the context.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-48 -top-44 size-[34rem] rounded-full bg-[radial-gradient(circle,var(--color-purple-50),transparent_68%)]" />
        </div>

        <Container className="pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-12">
          <Breadcrumbs crumbs={crumbs} />

          <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-center lg:gap-16">
            <div>
              <Eyebrow className="mb-5">About DB FinCo</Eyebrow>
              <h1 className="text-display-2 text-ink-primary">
                A firm of accountants and business advisors.
              </h1>
              <p className="measure mt-6 text-lead text-ink-secondary">
                DB FinCo works with small and medium-sized businesses to improve
                their financial outlook — keeping the books accurate, the
                filings on time and the reporting clear enough to act on. We
                offer a complete suite of outsourced financial services so that
                accounting, tax, assurance and advisory work sit with one team
                rather than four.
              </p>

              <Button href="/contact" size="lg" className="mt-9">
                Talk to us
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </div>

            <ReportingPreview compact />
          </div>
        </Container>
      </section>

      <Section tone="subtle" ariaLabelledBy="principles-heading">
        <Container>
          <SectionHeading
            id="principles-heading"
            eyebrow="What we hold to"
            title="Four things that shape how we work."
            lead="We would rather be specific about how we operate than make claims about ourselves that nobody can check."
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-16">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <Card key={principle.title} as="li">
                  <Icon aria-hidden="true" className="size-6 text-gold-800" />
                  <h3 className="mt-4 text-h4 font-semibold text-ink-primary">
                    {principle.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                    {principle.body}
                  </p>
                </Card>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section tone="white" id="how-we-work" ariaLabelledBy="howwework-heading">
        <Container>
          <SectionHeading
            id="howwework-heading"
            eyebrow="How we work"
            title="The same approach on every engagement."
            align="center"
          />
          <ProcessSteps steps={howWeWork} className="mt-14 lg:mt-16" />
        </Container>
      </Section>

      <WhyDbFinco />

      <Section tone="white" ariaLabelledBy="about-services-heading">
        <Container>
          <SectionHeading
            id="about-services-heading"
            eyebrow="What we offer"
            title="The full range of services."
          />
          <ServiceGrid services={coreServices} className="mt-12" />
        </Container>
      </Section>

      <CtaSection
        heading="Start with a conversation."
        body="Tell us where your finances stand today. We will tell you what we would recommend and what it would take — whether or not you engage us."
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
