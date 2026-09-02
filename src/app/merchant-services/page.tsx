import type { Metadata } from "next";
import {
  ArrowRight,
  Banknote,
  CreditCard,
  FileText,
  Globe,
  Info,
  Link2,
  Lock,
  Phone,
  Repeat,
  Store,
  TrendingUp,
} from "lucide-react";

import { JsonLd } from "@/components/layout/JsonLd";
import {
  CheckoutVisual,
  PaymentCard,
  PaymentTerminal,
  SettlementPanel,
} from "@/components/merchant/PaymentVisuals";
import { MerchantScene } from "@/components/illustrations/ServiceScenes";
import { ServicePortrait } from "@/components/imagery/ServicePortrait";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Breadcrumbs } from "@/components/sections/ServicePageTemplate";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { bookingUrl, site, telHref } from "@/config/site";
import { getService } from "@/content/services";
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo";

const service = getService("merchant-services");

export const metadata: Metadata = buildMetadata({
  title: service?.metaTitle ?? "Merchant Services",
  description:
    service?.metaDescription ??
    "Merchant services support: card acceptance, online and in-person payments, ACH transfers, payment links, invoicing, recurring billing and payment reporting.",
  path: "/merchant-services",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Merchant Services", path: "/merchant-services" },
];

/**
 * Payment acceptance methods.
 *
 * Deliberately neutral: no processor, gateway, acquiring bank or card network
 * is named as a partner anywhere on this page, because no such relationship
 * has been confirmed. Availability language is qualified throughout.
 */
const paymentMethods = [
  {
    icon: CreditCard,
    title: "Card Acceptance",
    body: "Taking card payments from your customers, with the cost of acceptance made visible instead of disappearing into a net deposit.",
  },
  {
    icon: Globe,
    title: "Online Payments",
    body: "Checkout and hosted payment pages so online sales reach your records with enough detail to reconcile them properly.",
  },
  {
    icon: Store,
    title: "In-Person & POS",
    body: "Point-of-sale and payment terminal arrangements for payments taken at a counter, on site or on the move.",
  },
  {
    icon: Banknote,
    title: "ACH & Bank Transfers",
    body: "Bank transfer options for higher-value or recurring business-to-business payments where card costs do not make sense.",
  },
  {
    icon: Link2,
    title: "Payment Links",
    body: "Sending a customer a payable link and matching the receipt against the open invoice when it is paid.",
  },
  {
    icon: FileText,
    title: "Invoicing",
    body: "Raising and tracking invoices so what is outstanding, what is overdue and what has settled is never in doubt.",
  },
  {
    icon: Repeat,
    title: "Recurring Billing",
    body: "Subscription and retainer billing set up so renewals, failed payments and cancellations show up in your reporting.",
  },
  {
    icon: TrendingUp,
    title: "Payment Reporting",
    body: "Settlement, fee, refund and chargeback activity reconciled back to your books, line by line.",
  },
];

const businessTypes = [
  "eCommerce and online retail",
  "Professional services firms",
  "Retail and hospitality",
  "Subscription and membership businesses",
  "Business-to-business suppliers",
  "Service businesses billing on site",
];

export default function MerchantServicesPage() {
  if (!service) return null;

  return (
    <>
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-purple-900">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-44 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(201,154,84,0.22),transparent_68%)]" />
          <div className="absolute -bottom-48 -left-40 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(110,56,145,0.45),transparent_70%)]" />
        </div>

        <Container className="relative pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-22 lg:pt-12">
          <Breadcrumbs crumbs={crumbs} tone="inverse" />

          <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-16">
            <div className="min-w-0">
              <Eyebrow tone="inverse" className="mb-4">
                Merchant Services
              </Eyebrow>
              <h1 className="text-display-2 text-white">
                Accept Payments, and Know What Landed in the Bank
              </h1>
              <p className="measure mt-5 text-lead text-purple-100">
                Support for taking card, online, in-person and ACH payments —
                with settlement, fee and chargeback data reconciled back into
                your books, where it can actually be understood.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={bookingUrl} variant="gold" size="lg" fullWidth className="sm:w-auto">
                  Schedule a Free Consultation
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Button>
                <a
                  href={telHref}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-pill
                    border border-white/25 px-6 py-3.5 text-base font-semibold text-white
                    transition-colors hover:border-white/50 hover:bg-white/10"
                >
                  <Phone aria-hidden="true" className="size-4 text-gold-300" />
                  {site.contact.phoneDisplay}
                </a>
              </div>
            </div>

            <ServicePortrait slug="merchant-services" />
          </div>
        </Container>
      </section>

      {/* Payment methods */}
      <Section tone="subtle" id="payment-methods" ariaLabelledBy="methods-heading">
        <Container>
          <SectionHeading
            id="methods-heading"
            eyebrow="How You Can Get Paid"
            title="The Ways Your Customers Pay"
            lead="Which methods are available to your business depends on the provider you work with and the outcome of its underwriting review."
          />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-4">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <Card key={method.title} as="li">
                  <span
                    aria-hidden="true"
                    className="flex size-11 items-center justify-center rounded-lg border
                      border-purple-100 bg-purple-50 text-purple-700"
                  >
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-h4 font-semibold text-ink-primary">
                    {method.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                    {method.body}
                  </p>
                </Card>
              );
            })}
          </ul>

          {/* Card acceptance and terminal, shown rather than described. */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:gap-8">
            <PaymentCard className="mx-auto w-full sm:max-w-none" />
            <PaymentTerminal className="mx-auto w-full sm:max-w-none" />
          </div>
        </Container>
      </Section>

      {/* Online + in-person split */}
      <Section tone="white" ariaLabelledBy="channels-heading">
        <Container>
          <SectionHeading
            id="channels-heading"
            eyebrow="Online and in Person"
            title="Every Channel, One Set of Books"
            lead="Online checkout, a terminal at the counter and a bank transfer all settle differently. The work is making sure all three reconcile against the same set of books."
          />

          <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-12">
            <div>
              <CheckoutVisual />
              <h3 className="mt-6 text-h3 text-ink-primary">Online Payments</h3>
              <p className="measure mt-3 text-ink-secondary">
                Hosted checkout and payment pages keep card data off your own
                systems while still capturing the order detail needed to match
                each sale to its settlement.
              </p>
            </div>

            <div>
              <SettlementPanel />
              <h3 className="mt-6 text-h3 text-ink-primary">
                Settlement Reconciliation
              </h3>
              <p className="measure mt-3 text-ink-secondary">
                Deposits arrive net of fees, refunds and reversals. We record
                gross sales, fees and adjustments separately so revenue is
                stated correctly and the true cost of acceptance is visible.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Business types */}
      <Section tone="lilac" ariaLabelledBy="types-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
            <SectionHeading
              id="types-heading"
              eyebrow="Who This Suits"
              title="Businesses That Take Money More Than One Way"
              lead="If payments arrive through several channels and none of them reconcile cleanly, that is the problem this service exists to solve."
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {businessTypes.map((type) => (
                <li
                  key={type}
                  className="flex items-center gap-3 rounded-lg border border-line bg-white px-4 py-3.5"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-full bg-gold-600"
                  />
                  <span className="text-sm text-ink-secondary">{type}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Onboarding */}
      <Section tone="white" id="onboarding" ariaLabelledBy="onboarding-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] lg:items-center lg:gap-16">
            <div className="min-w-0">
              <SectionHeading
                id="onboarding-heading"
                eyebrow="Merchant Onboarding"
                title={service.process.heading}
                lead={service.process.intro}
              />
              <ProcessSteps
                steps={service.process.steps}
                className="mt-10 lg:mt-14"
              />
            </div>

            <div className="min-w-0 [&_svg]:drop-shadow-[0_10px_30px_rgba(46,13,68,0.12)]">
              <MerchantScene />
            </div>
          </div>
        </Container>
      </Section>

      {/* Reporting */}
      <Section tone="deep" id="reporting" ariaLabelledBy="reporting-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <Eyebrow tone="inverse" className="mb-4">
                Payment Reporting
              </Eyebrow>
              <h2 id="reporting-heading" className="text-h2 text-white">
                The Part Most Businesses Skip
              </h2>
              <p className="measure mt-5 text-lead text-purple-100">
                Taking the payment is straightforward. Knowing what it actually
                earned you — after fees, refunds and chargebacks, and in the
                right accounting period — is where the work is.
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  "Gross sales, fees and reversals recorded separately",
                  "Settlement batches traced back to the invoices they cover",
                  "Cost of acceptance tracked as a percentage of revenue",
                  "Merchant deposits reconciled to the bank each period",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-purple-100">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-400"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <SettlementPanel />
          </div>
        </Container>
      </Section>

      {/* Security & responsible processing */}
      <Section tone="subtle" ariaLabelledBy="security-heading">
        <Container>
          <SectionHeading
            id="security-heading"
            eyebrow="Responsible Processing"
            title="What We Will and Won’t Tell You"
          />

          <div className="mt-10 grid gap-5 sm:gap-6 lg:grid-cols-3">
            <Card className="bg-white">
              <Lock aria-hidden="true" className="size-6 text-purple-700" />
              <h3 className="mt-4 text-h4 font-semibold text-ink-primary">
                Card Data Stays with the Provider
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                We do not handle or store your customers&apos; card details.
                Hosted checkout and terminal arrangements keep that data with
                the payment provider, where it belongs.
              </p>
            </Card>

            <Card className="bg-white">
              <Info aria-hidden="true" className="size-6 text-purple-700" />
              <h3 className="mt-4 text-h4 font-semibold text-ink-primary">
                No Guarantees on Approval
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                Approval is decided by the provider through its own underwriting
                review. We help you prepare a complete application; nobody
                outside the provider can promise the outcome.
              </p>
            </Card>

            <Card className="bg-white">
              <CreditCard aria-hidden="true" className="size-6 text-purple-700" />
              <h3 className="mt-4 text-h4 font-semibold text-ink-primary">
                We Are Not a Bank or a Processor
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                DB FinCo is an accounting and advisory firm. Payment processing,
                card issuing and banking are carried out by the relevant
                providers and financial institutions, not by us.
              </p>
            </Card>
          </div>

          {/* Merchant services disclaimer */}
          <div className="mt-10 rounded-xl border border-gold-200 bg-gold-50 p-6 sm:p-7">
            <h3 className="text-h4 font-semibold text-ink-primary">
              Important Information
            </h3>
            <p className="measure mt-3 text-sm leading-relaxed text-ink-secondary">
              Payment methods, pricing and service availability may vary by
              provider, business type, underwriting requirements and
              jurisdiction. Acceptance of any merchant application is at the
              sole discretion of the payment provider and its sponsoring
              financial institution. DB FinCo does not guarantee approval,
              processing rates, settlement timing or continued availability of
              any payment service. Commonly supported payment methods may
              include major card networks, digital wallets, ACH and bank
              transfers; exactly which are available to your business depends on
              the provider and the outcome of its review.
            </p>
            <p className="mt-4 text-sm text-ink-secondary">
              Full details are set out in our{" "}
              <a
                href="/disclaimer"
                className="font-medium text-purple-700 underline underline-offset-2 hover:text-purple-900"
              >
                professional services disclaimer
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>

      <FaqSection
        faqs={service.faqs}
        eyebrow="Merchant Questions"
        heading="Merchant Services Questions"
        tone="white"
      />

      <CtaSection heading={service.cta.heading} body={service.cta.body} />

      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={serviceSchema({
          name: "Merchant Services",
          description: service.metaDescription,
          path: "/merchant-services",
        })}
      />
    </>
  );
}
