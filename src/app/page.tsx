import { AdvisoryVisual, CloseChecklistVisual, FilingCalendarVisual } from "@/components/sections/StoryVisuals";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeatureStory } from "@/components/sections/FeatureStory";
import { PortraitScene } from "@/components/imagery/PortraitScene";
import { Hero } from "@/components/sections/Hero";
import {
  CapabilityStrip,
  IndustriesSection,
  MerchantTeaser,
  ProblemSection,
  ReportingSection,
} from "@/components/sections/HomeSections";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { WhyDbFinco } from "@/components/sections/WhyDbFinco";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/services";
import { homeFaqs } from "@/content/home-faqs";

const howItWorks = [
  {
    title: "Free consultation",
    description:
      "We learn how your business runs, what your current setup looks like and what is prompting the conversation. No cost, no obligation.",
  },
  {
    title: "Scope and proposal",
    description:
      "You get a written scope covering exactly which services are included, what you will receive and when, and what it costs.",
  },
  {
    title: "Onboarding",
    description:
      "We take over the records, correct what needs correcting, set up systems and access, and agree the reporting and filing calendar.",
  },
  {
    title: "Ongoing service",
    description:
      "Books are kept current, periods close on schedule, filings are made on time, and you have a named contact for anything in between.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <ProblemSection />

      <Section tone="subtle" ariaLabelledBy="services-heading">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <SectionHeading
              id="services-heading"
              eyebrow="What we do"
              title="A complete finance function, delivered by one firm."
              lead="Each service stands on its own, and they work better together — the tax return is prepared from books we keep, and the advisory work draws on reporting we build."
            />
            <Link
              href="/services"
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-semibold
                text-purple-800 transition-colors hover:text-purple-950"
            >
              View all services
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <ServiceGrid services={services} columns={4} className="mt-12 lg:mt-16" />
        </Container>
      </Section>

      <ReportingSection />

      <Section tone="white" ariaLabelledBy="how-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:items-center lg:gap-16">
            <div className="min-w-0">
              <SectionHeading
                id="how-heading"
                eyebrow="How it works"
                title="Four steps from first conversation to a finance function that runs."
                lead="Nothing starts until the scope is written down and agreed. After that, the work settles into a predictable monthly rhythm."
              />
              <ProcessSteps steps={howItWorks} className="mt-14 lg:mt-16" />
            </div>

            <PortraitScene portrait="standing" tone="lilac" />
          </div>
        </Container>
      </Section>

      <FeatureStory
        eyebrow="Bookkeeping"
        heading="Books that close on the date we agreed."
        body="Transactions categorized against a documented policy, every bank, card and merchant account reconciled, and a close checklist completed before the period is called done."
        points={[
          "Transaction categorization",
          "Bank & card reconciliation",
          "Accounts receivable & payable",
          "Month-end close checklist",
          "Financial statements each period",
          "Catch-up work scoped up front",
        ]}
        href="/services/bookkeeping"
        linkLabel="Bookkeeping services"
        visual={<CloseChecklistVisual />}
        tone="lilac"
      />

      <FeatureStory
        eyebrow="Tax & compliance"
        heading="Filing deadlines that never arrive as a surprise."
        body="We map every federal, state and local obligation that applies to your business, build the calendar around it, and prepare returns from books that are already closed."
        points={[
          "Federal & state business returns",
          "Sales tax across jurisdictions",
          "Form 1099 information reporting",
          "Multi-state registration support",
          "Tax notice response",
          "Year-round coordination",
        ]}
        href="/services/tax"
        linkLabel="Tax services"
        visual={<FilingCalendarVisual />}
        reverse
        tone="white"
      />

      <FeatureStory
        eyebrow="Advisory & analytics"
        heading="Analysis that turns reporting into a decision."
        body="Margin and profitability analysis, cash forecasting and risk review — built from your own data, with the assumptions written down and open to challenge."
        points={[
          "Margin & profitability analysis",
          "Cash flow forecasting",
          "Budget vs actual variance",
          "Financial risk assessment",
          "Internal control design",
          "Board & lender reporting",
        ]}
        href="/services/analytics"
        linkLabel="Financial analytics"
        visual={<AdvisoryVisual />}
        tone="subtle"
      />

      <MerchantTeaser />
      <IndustriesSection />
      <WhyDbFinco />

      <FaqSection
        faqs={homeFaqs}
        lead="If your question isn’t here, call us or send a message — we answer questions before there’s an engagement."
        tone="white"
      />

      <CtaSection
        heading="Let’s talk about where your finances stand."
        body="A free consultation is a straight conversation about your current setup, what is working and what is not. You will leave it knowing what we would recommend, whether or not you engage us."
      />
    </>
  );
}
