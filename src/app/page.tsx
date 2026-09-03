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
import { PlatformMarquee } from "@/components/sections/PlatformMarquee";
import { PricingSection } from "@/components/sections/PricingSection";
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
    title: "Free Consultation",
    description:
      "We learn how your business runs, what your current setup looks like and what is prompting the conversation. No cost, no obligation.",
  },
  {
    title: "Scope and Proposal",
    description:
      "You get a written scope covering exactly which services are included, what you will receive and when, and what it costs.",
  },
  {
    title: "Onboarding",
    description:
      "We take over the records, correct what needs correcting, set up systems and access, and agree the reporting and filing calendar.",
  },
  {
    title: "Ongoing Service",
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
              eyebrow="What We Do"
              title="A Complete Finance Function, Delivered by One Firm"
              lead="Each service stands on its own, and they work better together — the tax return is prepared from books we keep."
            />
            <Link
              href="/services"
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-semibold
                text-purple-800 transition-colors hover:text-purple-950"
            >
              View All Services
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <ServiceGrid services={services} columns={4} className="mt-10 lg:mt-14" />
        </Container>
      </Section>

      <PlatformMarquee />

      <ReportingSection />

      <Section tone="white" ariaLabelledBy="how-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:items-center lg:gap-16">
            <div className="min-w-0">
              <SectionHeading
                id="how-heading"
                eyebrow="How It Works"
                title="Four Steps to a Finance Function That Runs"
                lead="Nothing starts until the scope is agreed in writing. After that, the work settles into a monthly rhythm."
              />
              <ProcessSteps steps={howItWorks} className="mt-10 lg:mt-14" />
            </div>

            <PortraitScene
              portrait="standing"
              tone="lilac"
              sizes="(min-width: 1024px) 21rem, (min-width: 640px) 24rem, 90vw"
            />
          </div>
        </Container>
      </Section>

      <PricingSection />

      <FeatureStory
        eyebrow="Bookkeeping"
        heading="Books That Close on the Date We Agreed"
        body="Transactions categorized against a documented policy, every account reconciled, and a close checklist completed before the period is called done."
        points={[
          "Transaction Categorization",
          "Bank & Card Reconciliation",
          "Accounts Receivable & Payable",
          "Month-End Close Checklist",
          "Financial Statements Each Period",
          "Catch-Up Work Scoped up Front",
        ]}
        href="/services/bookkeeping"
        linkLabel="Bookkeeping Services"
        visual={<CloseChecklistVisual />}
        tone="lilac"
      />

      <FeatureStory
        eyebrow="Tax &amp; Compliance"
        heading="Filing Deadlines That Never Arrive as a Surprise"
        body="We map every federal, state and local obligation, build the calendar around it, and prepare returns from books already closed."
        points={[
          "Federal & State Business Returns",
          "Sales Tax Across Jurisdictions",
          "Form 1099 Information Reporting",
          "Multi-State Registration Support",
          "Tax Notice Response",
          "Year-Round Coordination",
        ]}
        href="/services/tax"
        linkLabel="Tax Services"
        visual={<FilingCalendarVisual />}
        reverse
        tone="white"
      />

      <FeatureStory
        eyebrow="Advisory &amp; Analytics"
        heading="Analysis That Turns Reporting Into a Decision"
        body="Margin analysis, cash forecasting and risk review — built from your own data, with the assumptions open to challenge."
        points={[
          "Margin & Profitability Analysis",
          "Cash Flow Forecasting",
          "Budget vs Actual Variance",
          "Financial Risk Assessment",
          "Internal Control Design",
          "Board & Lender Reporting",
        ]}
        href="/services/analytics"
        linkLabel="Financial Analytics"
        visual={<AdvisoryVisual />}
        tone="subtle"
      />

      <MerchantTeaser />
      <IndustriesSection />
      <WhyDbFinco />

      <FaqSection
        faqs={homeFaqs}
        lead="If your question isn’t here, call or send a message. We answer before there is an engagement."
        tone="white"
      />

      <CtaSection
        heading="Let’s Talk About Where Your Finances Stand"
        body="A free consultation is a straight conversation about your current setup. You will leave knowing what we would recommend, whether or not you engage us."
      />
    </>
  );
}
