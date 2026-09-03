import { BarChart } from "@/components/charts/BarChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { FinancePanel, MetricTile } from "@/components/finance/FinanceUI";
import {
  ILLUSTRATIVE_NOTE,
  merchantKpis,
  paymentMethodMix,
  paymentVolumeSeries,
} from "@/content/demo-financials";
import { formatCompactCurrency, formatCurrency } from "@/lib/chart";

/**
 * What a merchant's payment reporting looks like once the settlement data is
 * back in the books.
 *
 * Three readings, because they answer different questions: the day's takings,
 * how volume has moved over the fortnight, and which methods the money
 * actually arrived by — the last being the one that decides whether the cost
 * of acceptance is worth changing anything about.
 */
/**
 * Two weeks of trading. Weekday initials because fourteen three-letter labels
 * collide on a phone, and single letters read as two weeks at a glance; the
 * caption names each day in full so nothing depends on that shorthand.
 */
const weekdayInitials = ["M", "T", "W", "T", "F", "S", "S"] as const;
const weekdayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const volumeBars = paymentVolumeSeries.map((value, index) => {
  const day = index % 7;
  return {
    label: weekdayInitials[day] ?? "",
    srLabel: `Week ${Math.floor(index / 7) + 1} ${weekdayNames[day] ?? ""}`,
    value,
  };
});

export function MerchantReporting() {
  return (
    /* `items-start`: the mix panel is genuinely shorter than the activity
       panel, and stretching it just adds white space under the legend. */
    <div className="grid gap-5 lg:grid-cols-5 lg:items-start">
      <FinancePanel
        title="Payment activity"
        meta="Last 14 days"
        className="lg:col-span-3"
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MetricTile
            label="Today's sales"
            value={formatCurrency(merchantKpis.todaysSales)}
          />
          <MetricTile
            label="Transactions"
            value={String(merchantKpis.transactions)}
          />
          <MetricTile
            label="Average sale"
            value={formatCurrency(merchantKpis.averageTransaction)}
          />
          <MetricTile
            label="Settled this month"
            value={formatCompactCurrency(merchantKpis.settledThisMonth)}
          />
        </div>

        <BarChart
          className="mt-6"
          bars={volumeBars}
          ariaLabel="Processed payment volume by day over the last fortnight"
          height={150}
          highlightLast
          maxLabels={14}
        />

        <p className="mt-4 text-xs text-ink-muted">{ILLUSTRATIVE_NOTE}</p>
      </FinancePanel>

      {/* The centre carries the settled total the shares are shares *of*.
          A donut whose middle reads "100%" tells the reader nothing. */}
      <FinancePanel
        title="How customers paid"
        meta="This month"
        className="lg:col-span-2"
      >
        <DonutChart
          categories={paymentMethodMix}
          total={100}
          centerLabel="settled"
          centerValue={formatCompactCurrency(merchantKpis.settledThisMonth)}
          ariaLabel="Share of payments by method this month"
          size={150}
        />
        <p className="mt-5 text-xs text-ink-muted">{ILLUSTRATIVE_NOTE}</p>
      </FinancePanel>
    </div>
  );
}
