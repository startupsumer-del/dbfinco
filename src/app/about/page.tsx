import type { Metadata } from "next";
import {
  ArrowRight,
  Building2,
  CircleCheck,
  Compass,
  Handshake,
  ScrollText,
  UserRound,
} from "lucide-react";

import { JsonLd } from "@/components/layout/JsonLd";
import { CtaSection } from "@/components/sections/CtaSection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Breadcrumbs } from "@/components/sections/ServicePageTemplate";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { WhyDbFinco } from "@/components/sections/WhyDbFinco";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  CardIcon,
  FloatCard,
  PortraitScene,
} from "@/components/imagery/PortraitScene";
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
    title: "Accuracy Before Presentation",
    body: "Reporting is only worth producing if the underlying records are right. We fix the foundation first, even when that is the less exciting piece of work.",
  },
  {
    icon: ScrollText,
    title: "Precise Terminology",
    body: "An audit, a review and agreed-upon procedures are different engagements. We use the correct term for what we are actually doing, and explain the difference before you commit.",
  },
  {
    icon: Handshake,
    title: "Scope Agreed in Writing",
    body: "Every engagement is defined before it starts. If the work uncovers something that changes the scope, we come back to you rather than expanding it quietly.",
  },
  {
    icon: Building2,
    title: "Privately Held Focus",
    body: "Our assurance practice works exclusively with privately held companies, which keeps engagements clear of public company regulation and reporting deadlines.",
  },
];

const howWeWork = [
  {
    title: "We Learn the Business First",
    description:
      "Before recommending anything we understand how money moves through your organisation — how you sell, how you get paid and where the costs sit.",
  },
  {
    title: "We Fix the Foundation",
    description:
      "Chart of accounts, opening balances, reconciliations and accounting policy come before reporting. Analysis built on unreliable books produces confident wrong answers.",
  },
  {
    title: "We Set a Rhythm",
    description:
      "Close dates, reporting dates and filing dates are agreed and held, so the finance function becomes predictable rather than reactive.",
  },
  {
    title: "We Stay Available",
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

        <Container className="pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-22 lg:pt-12">
          <Breadcrumbs crumbs={crumbs} />

          <div className="mt-7 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-start lg:gap-16">
            <div>
              <Eyebrow className="mb-4">About DB FinCo</Eyebrow>
              <h1 className="text-display-2 text-ink-primary">
                A Firm of Accountants and Business Advisors
              </h1>
              <p className="measure mt-5 text-lead text-ink-secondary">
                DB FinCo works with small and medium-sized businesses to improve
                their financial outlook — keeping the books accurate, the
                filings on time and the reporting clear enough to act on. We
                offer a complete suite of outsourced financial services so that
                accounting, tax, assurance and advisory work sit with one team
                rather than four.
              </p>

              <Button href="/contact" size="lg" className="mt-9">
                Talk to Us
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </div>

            <PortraitScene
              portrait="partner"
              tone="lilac"
              priority
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 26rem, 90vw"
              cards={
                <>
                  <FloatCard
                    at="mid-left"
                    icon={
                      <CardIcon tone="violet">
                        <UserRound className="size-4" />
                      </CardIcon>
                    }
                    title="A named accountant"
                    detail="Not a shared inbox"
                  />
                  <FloatCard
                    at="low-right"
                    icon={
                      <CardIcon tone="success">
                        <CircleCheck className="size-4" />
                      </CardIcon>
                    }
                    title="Scope agreed in writing"
                    detail="Before any work starts"
                  />
                </>
              }
            />
          </div>
        </Container>
      </section>

      <Section tone="subtle" ariaLabelledBy="principles-heading">
        <Container>
          <SectionHeading
            id="principles-heading"
            eyebrow="What We Hold To"
            title="Four Things That Shape How We Work"
            lead="We would rather be specific about how we operate than make claims about ourselves that nobody can check."
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-14">
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
            eyebrow="How We Work"
            title="The Same Approach on Every Engagement"
            align="center"
          />
          <ProcessSteps steps={howWeWork} className="mt-10 lg:mt-14" />
        </Container>
      </Section>

      <WhyDbFinco />

      <Section tone="white" ariaLabelledBy="about-services-heading">
        <Container>
          <SectionHeading
            id="about-services-heading"
            eyebrow="What We Offer"
            title="The Full Range of Services"
          />
          <ServiceGrid services={coreServices} className="mt-10" />
        </Container>
      </Section>

      <CtaSection
        heading="Start with a Conversation"
        body="Tell us where your finances stand today. We will tell you what we would recommend and what it would take — whether or not you engage us."
      />

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
