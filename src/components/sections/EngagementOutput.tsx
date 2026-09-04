import { FileText, Layers, Scale, Wallet } from "lucide-react";

import { TrendChart } from "@/components/charts/TrendChart";
import {
  FinancePanel,
  MetricTile,
  ReportRow,
  StatusRow,
} from "@/components/finance/FinanceUI";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ILLUSTRATIVE_NOTE,
  kpis,
  months,
  revenueSeries,
} from "@/content/demo-financials";
import { formatCompactCurrency } from "@/lib/chart";

/**
 * What an engagement actually produces, shown on the About page.
 *
 * About is the one page that describes the firm rather than a service, and it
 * had nothing on it but words and two portraits. This is the honest thing to
 * put there: not figures about DB FinCo — there are none the site is willing
 * to invent — but the shape of what a client receives every period, built
 * from the same illustrative accounts the rest of the site uses.
 */
const statements = [
  { icon: FileText, title: "Profit & Loss", period: "Monthly, with commentary" },
  { icon: Scale, title: "Balance Sheet", period: "Monthly, reconciled" },
  { icon: Wallet, title: "Statement of Cash Flows", period: "Monthly" },
  { icon: Layers, title: "Budget vs Actual", period: "Monthly, by department" },
] as const;

export function EngagementOutput() {
  return (
    <Section tone="subtle" ariaLabelledBy="output-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <SectionHeading
            id="output-heading"
            eyebrow="What You Receive"
            title="The Same Pack, Every Period"
            lead="Whatever the engagement, the output is the same shape: statements that reconcile, a comparison against the plan, and a written note on what moved and why."
          />

          <FinancePanel title="Reporting pack" meta="December">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[0.6875rem] text-ink-muted">
                  Revenue · last 12 months
                </p>
                <p className="text-lg font-bold tabular-nums leading-none text-ink-primary">
                  {formatCompactCurrency(kpis.revenue)}
                </p>
              </div>
              <p className="text-[0.6875rem] font-semibold text-success">+8.4%</p>
            </div>

            <TrendChart
              className="mt-2.5"
              series={revenueSeries}
              labels={[...months]}
              ariaLabel="Revenue by month over the last twelve months"
              height={90}
              showLabels={false}
              showGrid={false}
              zeroBaseline={false}
            />

            <div className="mt-4 grid grid-cols-2 gap-2">
              <MetricTile
                label="Net income"
                value={formatCompactCurrency(kpis.netIncome)}
                delta="+4.1%"
                tone="positive"
              />
              <MetricTile
                label="Cash"
                value={formatCompactCurrency(kpis.cashBalance)}
              />
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {statements.map((statement) => (
                <ReportRow
                  key={statement.title}
                  icon={statement.icon}
                  title={statement.title}
                  period={statement.period}
                />
              ))}
            </div>

            <div className="mt-3 border-t border-line pt-1">
              <StatusRow label="Month-end close" status="Completed" />
              <StatusRow label="Written commentary" status="Included" />
            </div>

            <p className="mt-3 text-xs text-ink-muted">{ILLUSTRATIVE_NOTE}</p>
          </FinancePanel>
        </div>
      </Container>
    </Section>
  );
}
