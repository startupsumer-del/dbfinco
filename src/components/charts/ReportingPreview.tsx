import { TrendChart } from "@/components/charts/TrendChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { KpiTile } from "@/components/charts/KpiTile";
import {
  ILLUSTRATIVE_NOTE,
  cashBalanceSeries,
  expenseBreakdown,
  kpis,
  months,
  netIncomeSeries,
  receivablesSeries,
  revenueSeries,
  totalExpenses,
} from "@/content/demo-financials";
import { formatCompactCurrency } from "@/lib/chart";
import { cn } from "@/lib/cn";

/**
 * The DB FinCo reporting preview used in the hero and on service pages.
 *
 * Module order and count are chosen per breakpoint rather than scaled down:
 *
 *   mobile  — Revenue trend, then Cash balance and Net income tiles
 *   tablet  — adds the expense breakdown donut
 *   desktop — full four-module layout
 *
 * Nothing is a screenshot; every mark is rendered from the data above.
 */
export function ReportingPreview({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "brand-rule overflow-hidden rounded-xl border border-line bg-white shadow-lg",
        className,
      )}
    >
      {/* Panel header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-subtle px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-success"
          />
          <p className="text-xs font-semibold text-ink-primary">
            Financial reporting summary
          </p>
        </div>
        <p className="text-[0.6875rem] font-medium text-ink-muted">
          Last 12 months
        </p>
      </div>

      <div className="space-y-4 p-4 sm:space-y-5 sm:p-5">
        {/* Revenue trend — always first, on every screen */}
        <div className="rounded-lg border border-line p-4 sm:p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-ink-muted">Revenue</p>
              <p className="mt-1 whitespace-nowrap text-h3 font-bold tabular-nums text-ink-primary">
                {formatCompactCurrency(kpis.revenue)}
              </p>
            </div>
            <p className="whitespace-nowrap text-xs font-semibold text-success">
              +12.4%
              <span className="ml-1 font-normal text-ink-muted">vs prior year</span>
            </p>
          </div>
          <TrendChart
            series={revenueSeries}
            labels={months}
            ariaLabel="Revenue by month over the last twelve months"
            className="mt-4"
            height={compact ? 130 : 160}
          />
        </div>

        {/* Metric tiles: 2 across on mobile, 3 from tablet */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          <KpiTile
            label="Cash balance"
            value={formatCompactCurrency(kpis.cashBalance)}
            change="+8.6%"
            series={cashBalanceSeries}
            seriesColor="var(--color-viz-4)"
          />
          {/* All three carry a sparkline. With it on one tile only, the row
              read as two empty boxes beside a full one. */}
          <KpiTile
            label="Net income"
            value={formatCompactCurrency(kpis.netIncome)}
            change="+15.2%"
            series={netIncomeSeries}
          />
          {/* Third tile is additive on larger screens rather than a squeeze */}
          <KpiTile
            label="Accounts receivable"
            value={formatCompactCurrency(kpis.accountsReceivable)}
            change="-4.1%"
            direction="up-bad"
            series={receivablesSeries}
            seriesColor="var(--color-viz-3)"
            className="col-span-2 lg:col-span-1"
          />
        </div>

        {/* Expense breakdown — introduced at tablet and above, where the
            donut and its legend both have room to stay legible */}
        <div className="hidden rounded-lg border border-line p-4 sm:block sm:p-5">
          <p className="text-xs font-medium text-ink-muted">Expense breakdown</p>
          <DonutChart
            categories={expenseBreakdown}
            total={totalExpenses}
            centerLabel="Total expenses"
            ariaLabel="Expense breakdown by category over the last twelve months"
            className="mt-4"
            size={168}
          />
        </div>
      </div>

      <p className="border-t border-line bg-surface-subtle px-4 py-2.5 text-[0.6875rem] text-ink-muted sm:px-5">
        {ILLUSTRATIVE_NOTE}
      </p>
    </div>
  );
}
