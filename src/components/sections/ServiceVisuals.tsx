import Link from "next/link";
import { ArrowRight, ShieldAlert, ShieldCheck, TriangleAlert } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ILLUSTRATIVE_NOTE } from "@/content/demo-financials";

/* -------------------------------------------------------------------------
   Assurance: what each engagement provides
   ------------------------------------------------------------------------- */

const engagements = [
  {
    name: "External Audit",
    href: "/services/audit-assurance/external-audit",
    assurance: "Reasonable assurance",
    output: "An opinion on whether the financial statements are fairly presented",
    basis: "Substantive testing, inspection, observation and independent confirmation",
  },
  {
    name: "Internal Audit",
    href: "/services/audit-assurance/internal-audit",
    assurance: "Internal reporting",
    output: "Findings and recommendations on controls and processes",
    basis: "Control design assessment and testing of operating effectiveness",
  },
  {
    name: "Agreed-Upon Procedures",
    href: "/services/audit-assurance/agreed-upon-procedures",
    assurance: "No assurance conclusion",
    output: "A factual report of findings from the procedures you specify",
    basis: "Only the specific procedures agreed in writing by all parties",
  },
];

/**
 * Comparison of the three assurance engagements.
 *
 * On mobile this becomes a stack of cards rather than a horizontally
 * scrolling table, so nothing is cut off and no page-level overflow occurs.
 */
export function EngagementComparison() {
  return (
    <Section tone="white" ariaLabelledBy="engagements-heading">
      <Container>
        <SectionHeading
          id="engagements-heading"
          eyebrow="Choosing an Engagement"
          title="Three Engagements, Three Different Answers"
          lead="These terms are often used interchangeably. They should not be — the standards, the work and the report differ in each case."
        />

        <div className="mt-10 grid gap-5 sm:gap-6 lg:grid-cols-3">
          {engagements.map((engagement) => (
            <div
              key={engagement.name}
              className="flex flex-col rounded-xl border border-line bg-surface-subtle p-6"
            >
              <h3 className="text-h4 font-semibold text-ink-primary">
                {engagement.name}
              </h3>
              <p className="mt-3 inline-flex w-fit rounded-pill border border-purple-100 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-800">
                {engagement.assurance}
              </p>

              <dl className="mt-6 flex-1 space-y-4">
                <div>
                  <dt className="text-eyebrow font-semibold uppercase text-gold-800">
                    What you get
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
                    {engagement.output}
                  </dd>
                </div>
                <div>
                  <dt className="text-eyebrow font-semibold uppercase text-gold-800">
                    Based on
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
                    {engagement.basis}
                  </dd>
                </div>
              </dl>

              <Link
                href={engagement.href}
                className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold
                  text-purple-800 transition-colors hover:text-purple-950"
              >
                {engagement.name} details
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* -------------------------------------------------------------------------
   Risk register visual
   ------------------------------------------------------------------------- */

const risks = [
  {
    icon: TriangleAlert,
    label: "Payment approval and release held by one person",
    rating: "High",
    tone: "high" as const,
  },
  {
    icon: ShieldAlert,
    label: "Two customers represent a large share of revenue",
    rating: "Medium",
    tone: "medium" as const,
  },
  {
    icon: ShieldAlert,
    label: "Cash monitored by bank balance rather than forecast",
    rating: "Medium",
    tone: "medium" as const,
  },
  {
    icon: ShieldCheck,
    label: "Bank reconciliations reviewed independently each month",
    rating: "Controlled",
    tone: "low" as const,
  },
];

const riskTones = {
  high: "bg-danger/10 text-danger",
  medium: "bg-warning/10 text-warning",
  low: "bg-success/10 text-success",
};

export function RiskRegisterVisual() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-subtle px-5 py-3.5">
        <p className="text-sm font-semibold text-ink-primary">Risk register</p>
        <p className="text-xs text-ink-muted">Current assessment</p>
      </div>

      <ul className="divide-y divide-line">
        {risks.map((risk) => {
          const Icon = risk.icon;
          return (
            <li key={risk.label} className="flex items-start gap-3 px-5 py-4">
              <Icon
                aria-hidden="true"
                className={`mt-0.5 size-4 shrink-0 ${
                  risk.tone === "high"
                    ? "text-danger"
                    : risk.tone === "medium"
                      ? "text-warning"
                      : "text-success"
                }`}
              />
              <span className="min-w-0 flex-1 text-sm leading-relaxed text-ink-secondary">
                {risk.label}
              </span>
              <span
                className={`shrink-0 rounded-pill px-2.5 py-1 text-[0.6875rem] font-semibold ${riskTones[risk.tone]}`}
              >
                {risk.rating}
              </span>
            </li>
          );
        })}
      </ul>

      <p className="border-t border-line bg-surface-subtle px-5 py-2.5 text-[0.6875rem] text-ink-muted">
        {ILLUSTRATIVE_NOTE}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Audit evidence visual
   ------------------------------------------------------------------------- */

const evidenceMethods = [
  { method: "Inquiry", detail: "Structured questioning of management and staff" },
  { method: "Analytical assessment", detail: "Testing relationships and trends in the data" },
  { method: "Physical inspection", detail: "Examination of assets and documentation" },
  { method: "Observation", detail: "Watching processes as they are performed" },
  { method: "Independent confirmation", detail: "Direct corroboration from third parties" },
];

export function AuditEvidenceVisual() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white shadow-md">
      <div className="border-b border-line bg-surface-subtle px-5 py-3.5">
        <p className="text-sm font-semibold text-ink-primary">
          How audit evidence is gathered
        </p>
      </div>
      <ul className="divide-y divide-line">
        {evidenceMethods.map((item, index) => (
          <li key={item.method} className="flex items-start gap-3.5 px-5 py-4">
            <span
              aria-hidden="true"
              className="flex size-7 shrink-0 items-center justify-center rounded-full
                border border-purple-100 bg-purple-50 text-xs font-bold tabular-nums text-purple-800"
            >
              {index + 1}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-ink-primary">
                {item.method}
              </span>
              <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">
                {item.detail}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
