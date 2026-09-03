import { BarChart } from "@/components/charts/BarChart";
import { DonutChart } from "@/components/charts/DonutChart";
import {
  FinancePanel,
  MetricTile,
  ProgressRow,
} from "@/components/finance/FinanceUI";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  auditPhases,
  bookkeepingMonths,
  closeChecklist,
  filingMix,
  filingQuarters,
  filingsByQuarter,
  riskTreatment,
  risksBySeverity,
  transactionsByMonth,
} from "@/content/demo-engagements";
import { ILLUSTRATIVE_NOTE } from "@/content/demo-financials";

/**
 * The work itself, shown rather than described.
 *
 * Every service page argues that the work gets done properly. These panels
 * are what "properly" looks like as a picture — a month's transaction volume,
 * a close checklist that is actually finished, an audit part way through its
 * phases, a risk register split by severity.
 *
 * The figures are counts of work, not money, and they are illustrative. Each
 * panel says so, and `tests/reporting.spec.ts` holds that it keeps saying so.
 */

/** Shared shell: a heading beside a single reporting panel. */
function VisualSection({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <Section tone="white" ariaLabelledBy={id}>
      <Container>
        {/* Top-aligned, never centred. Centring a short heading against a
            tall panel pushes the heading down the page and opens a band of
            empty space above it, so the first thing in the left column is
            nothing at all. `tests/layout.spec.ts` measures this everywhere. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <SectionHeading id={id} eyebrow={eyebrow} title={title} lead={lead} />
          {children}
        </div>
      </Container>
    </Section>
  );
}

/* ---------------------------------------------------------------- Bookkeeping */

export function BookkeepingVolumeSection() {
  const latest = transactionsByMonth[transactionsByMonth.length - 1] ?? 0;
  const total = transactionsByMonth.reduce((sum, value) => sum + value, 0);

  return (
    <VisualSection
      id="volume-heading"
      eyebrow="The Month's Work"
      title="What a Month of Bookkeeping Actually Moves"
      lead="Volume is the part nobody sees until it slips. Every transaction is categorised, matched and reconciled before the close is signed off."
    >
      <div className="grid gap-5 xl:grid-cols-2 xl:items-start">
        <FinancePanel title="Transactions processed" meta="Last six months">
          <div className="grid grid-cols-2 gap-3">
            <MetricTile label="This month" value={latest.toLocaleString("en-US")} />
            <MetricTile
              label="Six-month total"
              value={total.toLocaleString("en-US")}
            />
          </div>

          <BarChart
            className="mt-6"
            bars={bookkeepingMonths.map((label, index) => ({
              label,
              value: transactionsByMonth[index] ?? 0,
            }))}
            ariaLabel="Transactions categorised and reconciled, by month"
            height={150}
            valueLabel="count"
          />

          <p className="mt-4 text-xs text-ink-muted">{ILLUSTRATIVE_NOTE}</p>
        </FinancePanel>

        <FinancePanel title="Month-end close" meta="December">
          <div className="space-y-1">
            {closeChecklist.map((item) => (
              <ProgressRow
                key={item.label}
                label={item.label}
                percent={item.percent}
                detail={item.detail}
              />
            ))}
          </div>
          <p className="mt-5 text-xs text-ink-muted">{ILLUSTRATIVE_NOTE}</p>
        </FinancePanel>
      </div>
    </VisualSection>
  );
}

/* ---------------------------------------------------------------------- Tax */

export function FilingActivitySection() {
  const total = filingsByQuarter.reduce((sum, value) => sum + value, 0);

  return (
    <VisualSection
      id="filings-heading"
      eyebrow="The Year's Filings"
      title="More Deadlines Than Anyone Keeps in Their Head"
      lead="Business returns are only part of it. Sales tax, payroll-related filings and information returns each have their own calendar, and each one is a penalty if it slips."
    >
      <div className="grid gap-5 xl:grid-cols-2 xl:items-start">
        <FinancePanel title="Filings prepared" meta="By quarter">
          <div className="grid grid-cols-2 gap-3">
            <MetricTile label="Across the year" value={String(total)} />
            <MetricTile label="Busiest quarter" value="Q4" />
          </div>

          <BarChart
            className="mt-6"
            bars={filingQuarters.map((label, index) => ({
              label,
              value: filingsByQuarter[index] ?? 0,
            }))}
            ariaLabel="Returns and filings prepared, by quarter"
            height={140}
            valueLabel="count"
          />

          <p className="mt-4 text-xs text-ink-muted">{ILLUSTRATIVE_NOTE}</p>
        </FinancePanel>

        <FinancePanel title="What they were" meta="Across the year">
          <DonutChart
            categories={filingMix}
            total={total}
            centerLabel="filings"
            centerValue={String(total)}
            ariaLabel="Filings prepared across the year, by type"
            size={150}
          />
          <p className="mt-5 text-xs text-ink-muted">{ILLUSTRATIVE_NOTE}</p>
        </FinancePanel>
      </div>
    </VisualSection>
  );
}

/* -------------------------------------------------------------------- Audit */

export function AuditProgressSection() {
  return (
    <VisualSection
      id="audit-progress-heading"
      eyebrow="Where It Stands"
      title="You Should Never Have to Ask How the Audit Is Going"
      lead="An engagement runs in phases, and each one either is or is not finished. Status is reported against the plan rather than summarised as a feeling about it."
    >
      <FinancePanel title="Engagement status" meta="Current period">
        <div className="space-y-1">
          {auditPhases.map((phase) => (
            <ProgressRow
              key={phase.label}
              label={phase.label}
              percent={phase.percent}
              detail={phase.detail}
            />
          ))}
        </div>
        <p className="mt-5 text-xs text-ink-muted">{ILLUSTRATIVE_NOTE}</p>
      </FinancePanel>
    </VisualSection>
  );
}

/* --------------------------------------------------------------------- Risk */

/**
 * The same two readings serve a risk register and a set of rated internal
 * audit findings — how severe, and what is being done — so the section takes
 * its framing from the page rather than duplicating the panel.
 */
export function RiskProfileSection({
  eyebrow,
  title,
  lead,
  panelTitle,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  panelTitle: string;
}) {
  const total = risksBySeverity.reduce((sum, item) => sum + item.count, 0);
  const urgent = risksBySeverity
    .filter((item) => item.label === "Critical" || item.label === "High")
    .reduce((sum, item) => sum + item.count, 0);

  return (
    <VisualSection id="risk-profile-heading" eyebrow={eyebrow} title={title} lead={lead}>
      <div className="grid gap-5 xl:grid-cols-2 xl:items-start">
        <FinancePanel title={panelTitle} meta="By severity">
          <div className="grid grid-cols-2 gap-3">
            <MetricTile label="Open items" value={String(total)} />
            <MetricTile label="Critical or high" value={String(urgent)} />
          </div>

          <BarChart
            className="mt-6"
            bars={risksBySeverity.map((item) => ({
              label: item.label,
              value: item.count,
            }))}
            ariaLabel="Open items by severity rating"
            height={140}
            valueLabel="count"
          />

          <p className="mt-4 text-xs text-ink-muted">{ILLUSTRATIVE_NOTE}</p>
        </FinancePanel>

        <FinancePanel title="What is being done about them" meta="Current status">
          <DonutChart
            categories={riskTreatment}
            total={total}
            centerLabel="items"
            centerValue={String(total)}
            ariaLabel="Open items by how they are being treated"
            size={150}
          />
          <p className="mt-5 text-xs text-ink-muted">{ILLUSTRATIVE_NOTE}</p>
        </FinancePanel>
      </div>
    </VisualSection>
  );
}
