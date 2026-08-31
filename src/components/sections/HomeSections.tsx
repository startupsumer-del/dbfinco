import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CircleCheck,
  CreditCard,
  FileSpreadsheet,
  Landmark,
  MessagesSquare,
  Receipt,
  ShoppingBag,
  Store,
  UserRound,
  Wrench,
} from "lucide-react";

import { BarPairChart } from "@/components/charts/BarPairChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { TrendChart } from "@/components/charts/TrendChart";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ILLUSTRATIVE_NOTE,
  budgetVsActual,
  cashBalanceSeries,
  expenseBreakdown,
  months,
  revenueSeries,
  totalExpenses,
} from "@/content/demo-financials";
import { formatCompactCurrency } from "@/lib/chart";

/* -------------------------------------------------------------------------
   Capability strip — sits directly under the hero
   ------------------------------------------------------------------------- */

const capabilities = [
  { label: "Accounting", href: "/services/accounting" },
  { label: "Bookkeeping", href: "/services/bookkeeping" },
  { label: "Tax", href: "/services/tax" },
  { label: "Audit & Assurance", href: "/services/audit-assurance" },
  { label: "Consulting", href: "/services/consulting" },
  { label: "Risk Advisory", href: "/services/risk-advisory" },
  { label: "Analytics", href: "/services/analytics" },
  { label: "Merchant Services", href: "/merchant-services" },
];

export function CapabilityStrip() {
  return (
    <section className="border-y border-line bg-surface-subtle py-6">
      <Container>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
          <p className="text-eyebrow shrink-0 font-semibold uppercase text-ink-muted">
            What we handle
          </p>
          <ul className="flex flex-wrap gap-x-2 gap-y-2">
            {capabilities.map((capability) => (
              <li key={capability.href}>
                <Link
                  href={capability.href}
                  className="inline-flex min-h-11 items-center rounded-pill border border-line
                    bg-white px-4 py-2 text-sm font-medium text-ink-secondary
                    transition-colors duration-200 hover:border-purple-200
                    hover:bg-purple-50 hover:text-purple-900"
                >
                  {capability.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------
   The problem DB FinCo solves
   ------------------------------------------------------------------------- */

const problems = [
  {
    icon: CalendarClock,
    title: "The numbers arrive too late",
    body: "By the time last month’s statements are ready, the decisions they should have informed have already been made.",
  },
  {
    icon: FileSpreadsheet,
    title: "Nobody fully trusts them",
    body: "Balances that never quite reconcile mean every discussion starts with whether the figures are right instead of what to do about them.",
  },
  {
    icon: Receipt,
    title: "Deadlines drive everything",
    body: "Filings are handled at the last possible moment, which leaves no room to plan and turns routine compliance into a scramble.",
  },
  {
    icon: MessagesSquare,
    title: "There’s no one to ask",
    body: "A question about margin, cash or a tax notice goes unanswered because nobody owns the finances end to end.",
  },
];

export function ProblemSection() {
  return (
    <Section tone="white" ariaLabelledBy="problem-heading">
      <Container>
        <SectionHeading
          id="problem-heading"
          eyebrow="Why this matters"
          title="Most businesses don’t have a data problem. They have a clarity problem."
          lead="The information already exists somewhere — in the bank feed, the invoicing system, the payment processor. What is usually missing is someone making it accurate, timely and readable."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-4">
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <Card key={problem.title} as="li" className="bg-surface-subtle">
                <Icon aria-hidden="true" className="size-6 text-gold-800" />
                <h3 className="mt-4 text-h4 font-semibold text-ink-primary">
                  {problem.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                  {problem.body}
                </p>
              </Card>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Reporting showcase
   ------------------------------------------------------------------------- */

export function ReportingSection() {
  return (
    <Section tone="lilac" ariaLabelledBy="reporting-heading">
      <Container>
        <SectionHeading
          id="reporting-heading"
          eyebrow="Financial reporting"
          title="Reporting that shows you what changed, and why."
          lead="Every engagement includes a reporting pack built from your own books — performance, position and cash, with written commentary rather than a file dropped in your inbox."
        />

        <div className="mt-12 grid gap-5 sm:gap-6 lg:mt-16 lg:grid-cols-3">
          <div className="rounded-xl border border-line bg-white p-5 sm:p-6 lg:col-span-2">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-ink-primary">
                  Revenue and expenses
                </p>
                <p className="mt-1 text-xs text-ink-muted">Quarterly comparison</p>
              </div>
              <p className="text-xs font-semibold text-success">
                Gross margin 63.8%
              </p>
            </div>
            <BarPairChart
              className="mt-6"
              groups={budgetVsActual.map((row) => ({
                label: row.label,
                primary: row.budget,
                secondary: row.actual,
              }))}
              primaryLabel="Budget"
              secondaryLabel="Actual"
              ariaLabel="Budget compared with actual results for the most recent quarter"
            />
          </div>

          <div className="rounded-xl border border-line bg-white p-5 sm:p-6">
            <p className="text-sm font-semibold text-ink-primary">Cash balance</p>
            <p className="mt-1 text-xs text-ink-muted">Rolling 12 months</p>
            <p className="mt-4 text-h2 font-bold tabular-nums text-ink-primary">
              {formatCompactCurrency(cashBalanceSeries[cashBalanceSeries.length - 1] ?? 0)}
            </p>
            <TrendChart
              className="mt-4"
              series={cashBalanceSeries}
              labels={months}
              ariaLabel="Cash balance by month over the last twelve months"
              stroke="var(--color-viz-4)"
              fillFrom="rgba(18, 101, 68, 0.18)"
              fillTo="rgba(18, 101, 68, 0)"
              height={150}
            />
          </div>

          <div className="rounded-xl border border-line bg-white p-5 sm:p-6 lg:col-span-2">
            <p className="text-sm font-semibold text-ink-primary">
              Where the money goes
            </p>
            <p className="mt-1 text-xs text-ink-muted">
              Expense breakdown, last 12 months
            </p>
            <DonutChart
              className="mt-6"
              categories={expenseBreakdown}
              total={totalExpenses}
              centerLabel="Total expenses"
              ariaLabel="Expense breakdown by category"
              size={190}
            />
          </div>

          <div className="rounded-xl border border-line bg-white p-5 sm:p-6">
            <p className="text-sm font-semibold text-ink-primary">Revenue trend</p>
            <p className="mt-1 text-xs text-ink-muted">Rolling 12 months</p>
            <TrendChart
              className="mt-6"
              series={revenueSeries}
              labels={months}
              ariaLabel="Revenue by month over the last twelve months"
              height={150}
            />
            <ul className="mt-6 space-y-2.5">
              {[
                "Profit & loss",
                "Balance sheet",
                "Cash flow statement",
                "Budget vs actual",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-ink-secondary">
                  <CircleCheck aria-hidden="true" className="size-4 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 text-xs text-ink-muted">{ILLUSTRATIVE_NOTE}</p>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Merchant Services teaser
   ------------------------------------------------------------------------- */

const paymentMethods = [
  "Card acceptance",
  "Online payments",
  "In-person & POS",
  "ACH & bank transfers",
  "Payment links",
  "Invoicing",
  "Recurring billing",
  "Payment reporting",
];

export function MerchantTeaser() {
  return (
    <Section tone="deep" ariaLabelledBy="merchant-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-32 top-1/4 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(224,188,99,0.16),transparent_68%)]" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <Eyebrow tone="inverse" className="mb-5">
              Merchant Services
            </Eyebrow>
            <h2 id="merchant-heading" className="text-h2 text-white">
              Accept payments, and know exactly what landed in the bank.
            </h2>
            <p className="measure mt-5 text-lead text-purple-100">
              Support for taking card, online, in-person and ACH payments — with
              the settlement, fee and chargeback data reconciled back into your
              books, where it can actually be understood.
            </p>

            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {paymentMethods.map((method) => (
                <li key={method} className="flex items-center gap-2.5 text-sm text-purple-100">
                  <CircleCheck aria-hidden="true" className="size-4 shrink-0 text-gold-400" />
                  {method}
                </li>
              ))}
            </ul>

            <Button href="/merchant-services" variant="gold" size="lg" className="mt-9">
              Explore Merchant Services
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>

          <div className="rounded-xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-7">
            <div className="space-y-3">
              {[
                { icon: CreditCard, label: "Card payment", detail: "Settled — net of fees", amount: "$2,480.00" },
                { icon: Landmark, label: "ACH transfer", detail: "Received", amount: "$14,250.00" },
                { icon: Store, label: "In-person / POS", detail: "Batch closed", amount: "$1,932.40" },
                { icon: ShoppingBag, label: "Online checkout", detail: "Settled", amount: "$6,715.80" },
              ].map((row) => {
                const Icon = row.icon;
                return (
                  <div
                    key={row.label}
                    className="flex items-center gap-3 rounded-lg border border-white/10
                      bg-purple-950/40 p-3.5 sm:gap-4 sm:p-4"
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-10 shrink-0 items-center justify-center rounded-lg
                        bg-white/10 text-gold-300"
                    >
                      <Icon className="size-[1.125rem]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-white">
                        {row.label}
                      </span>
                      <span className="block truncate text-xs text-purple-200">
                        {row.detail}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold tabular-nums text-white">
                      {row.amount}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-[0.6875rem] text-purple-300">{ILLUSTRATIVE_NOTE}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Industries
   ------------------------------------------------------------------------- */

const industries = [
  { icon: UserRound, title: "Startups & founders", body: "Getting the financial foundation right before it becomes expensive to fix." },
  { icon: ShoppingBag, title: "eCommerce", body: "Multi-channel sales, payment processor settlements and sales tax across states." },
  { icon: Wrench, title: "Professional services", body: "Project profitability, utilisation and receivables that fund the next month." },
  { icon: Store, title: "Retail & hospitality", body: "Daily takings, POS reconciliation and margin visibility by location." },
  { icon: Landmark, title: "Established SMBs", body: "Reporting, controls and assurance that keep pace with a growing organisation." },
  { icon: CreditCard, title: "Merchants", body: "Payment acceptance arranged and accounted for properly from day one." },
];

export function IndustriesSection() {
  return (
    <Section tone="white" ariaLabelledBy="industries-heading">
      <Container>
        <SectionHeading
          id="industries-heading"
          eyebrow="Who we work with"
          title="Built for the businesses that need a finance function, not a filing service."
          lead="We work with small and medium-sized businesses across the United States, and with international founders operating US entities."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-3">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <li
                key={industry.title}
                className="flex gap-4 rounded-xl border border-line bg-white p-5 sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg
                    border border-gold-100 bg-gold-50 text-gold-800"
                >
                  <Icon className="size-[1.125rem]" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-h4 font-semibold text-ink-primary">
                    {industry.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
                    {industry.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
