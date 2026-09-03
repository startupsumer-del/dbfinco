import { FileText } from "lucide-react";

import { TrendChart } from "@/components/charts/TrendChart";
import {
  FinanceCard,
  FinancePanel,
  MetricTile,
  ReportRow,
  StatusRow,
} from "@/components/finance/FinanceUI";
import { PortraitScene } from "@/components/imagery/PortraitScene";
import {
  ILLUSTRATIVE_NOTE,
  kpis,
  months,
  revenueSeries,
} from "@/content/demo-financials";
import { formatCompactCurrency } from "@/lib/chart";

/**
 * The homepage hero visual: a person, and the reporting they hand over.
 *
 * The person leads. The reporting is the supporting note beside her — a
 * revenue line, the two figures a founder actually asks for, and the
 * statement they receive — kept small on purpose. A full-size chart here
 * reads as a dashboard product; a small one reads as evidence.
 *
 * The two sit side by side, never stacked. An earlier version floated the
 * panel over the composition and it buried the person: at this column width
 * anything wide enough to read covers most of her. Side by side, the only
 * thing the panel can overlap is empty space, and `tests/imagery.spec.ts`
 * holds that — the portrait box and every finance surface box must not
 * intersect on any page.
 *
 * Below sm the cards drop under the portrait and go full width, because two
 * columns in a 390px viewport is unreadable.
 */
export function HomeHeroVisual() {
  return (
    <div
      className="mx-auto grid w-full max-w-[26rem] gap-5 sm:max-w-[36rem]
        sm:grid-cols-[minmax(0,0.76fr)_minmax(0,1fr)] sm:items-center sm:gap-4
        xl:max-w-none"
    >
      <div className="order-2 space-y-3 sm:order-1">
        {/* No `meta` on the header: at this width "Reporting summary" and a
            date range on one row both wrap to two lines. The period belongs
            with the figure it qualifies anyway. */}
        <FinancePanel title="Reporting summary">
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

          {/* `height` is viewBox units and the SVG stretches to the column
              width at that ratio, so this renders as a shallow 8:1 band — a
              sparkline, not a chart. It floats its baseline because there is
              no axis here to read a truncated one against, and on a zero
              baseline the whole year flattens into a straight rule. */}
          <TrendChart
            className="mt-2.5"
            series={revenueSeries}
            labels={[...months]}
            ariaLabel="Revenue by month over the last twelve months"
            height={80}
            showLabels={false}
            showGrid={false}
            zeroBaseline={false}
          />

          <div className="mt-3 grid grid-cols-2 gap-2">
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

          <p className="mt-3 text-[0.625rem] leading-snug text-ink-muted">
            {ILLUSTRATIVE_NOTE}
          </p>
        </FinancePanel>

        {/* Satellite card. Two facts the panel would only have made taller,
            given their own surface so the column reads as a composition
            rather than one long block. */}
        <FinanceCard>
          <ReportRow icon={FileText} title="Profit &amp; Loss" period="December" />
          <div className="mt-1 px-1">
            <StatusRow label="Month-end close" status="Completed" />
          </div>
        </FinanceCard>
      </div>

      <div className="order-1 sm:order-2">
        <PortraitScene
          portrait="explaining"
          tone="gold"
          priority
          frame="tall"
          sizes="(min-width: 1280px) 21rem, (min-width: 640px) 19rem, 88vw"
          className="mx-auto max-w-[20rem] sm:max-w-none"
        />
      </div>
    </div>
  );
}
