import { CircleCheck, Clock3, FileCheck2, Landmark } from "lucide-react";

import { TrendChart } from "@/components/charts/TrendChart";
import { ILLUSTRATIVE_NOTE, grossMarginSeries, months } from "@/content/demo-financials";

/* Bookkeeping: a month-end close checklist with reconciled accounts. */
export function CloseChecklistVisual() {
  const accounts = [
    { name: "Operating account", detail: "342 transactions", status: "Reconciled" },
    { name: "Business credit card", detail: "118 transactions", status: "Reconciled" },
    { name: "Merchant settlements", detail: "64 batches", status: "Reconciled" },
    { name: "Payroll clearing", detail: "12 entries", status: "Reconciled" },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-subtle px-5 py-3.5">
        <p className="text-sm font-semibold text-ink-primary">Month-end close</p>
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-success/10 px-2.5 py-1 text-[0.6875rem] font-semibold text-success">
          <CircleCheck aria-hidden="true" className="size-3.5" />
          Closed
        </span>
      </div>

      <ul className="divide-y divide-line">
        {accounts.map((account) => (
          <li key={account.name} className="flex items-center gap-3 px-5 py-4">
            <CircleCheck aria-hidden="true" className="size-5 shrink-0 text-success" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-ink-primary">
                {account.name}
              </span>
              <span className="block truncate text-xs text-ink-muted">
                {account.detail}
              </span>
            </span>
            <span className="shrink-0 text-xs font-semibold text-success">
              {account.status}
            </span>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-3 divide-x divide-line border-t border-line">
        {[
          { label: "Profit & loss", value: "Ready" },
          { label: "Balance sheet", value: "Ready" },
          { label: "Cash flow", value: "Ready" },
        ].map((item) => (
          <div key={item.label} className="px-3 py-4 text-center">
            <p className="text-[0.6875rem] text-ink-muted">{item.label}</p>
            <p className="mt-1 text-xs font-semibold text-ink-primary">{item.value}</p>
          </div>
        ))}
      </div>

      <p className="border-t border-line bg-surface-subtle px-5 py-2.5 text-[0.6875rem] text-ink-muted">
        {ILLUSTRATIVE_NOTE}
      </p>
    </div>
  );
}

/* Tax: a forward-looking filing calendar. */
export function FilingCalendarVisual() {
  const filings = [
    { name: "Sales tax — New York", period: "Monthly", status: "Filed", tone: "done" as const },
    { name: "Form 1099-NEC", period: "Annual", status: "Filed", tone: "done" as const },
    { name: "Federal business return", period: "Annual", status: "In preparation", tone: "active" as const },
    { name: "State business return", period: "Annual", status: "Scheduled", tone: "queued" as const },
  ];

  const toneStyles = {
    done: "bg-success/10 text-success",
    active: "bg-gold-100 text-gold-800",
    queued: "bg-purple-50 text-purple-800",
  };

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-subtle px-5 py-3.5">
        <p className="text-sm font-semibold text-ink-primary">Filing calendar</p>
        <p className="text-xs text-ink-muted">Current year</p>
      </div>

      <ul className="divide-y divide-line">
        {filings.map((filing) => (
          <li key={filing.name} className="flex items-center gap-3 px-5 py-4">
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg
                border border-line bg-surface-subtle text-purple-700"
            >
              {filing.tone === "done" ? (
                <FileCheck2 className="size-4" />
              ) : (
                <Clock3 className="size-4" />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-ink-primary">
                {filing.name}
              </span>
              <span className="block text-xs text-ink-muted">{filing.period}</span>
            </span>
            <span
              className={`shrink-0 rounded-pill px-2.5 py-1 text-[0.6875rem] font-semibold ${toneStyles[filing.tone]}`}
            >
              {filing.status}
            </span>
          </li>
        ))}
      </ul>

      <p className="border-t border-line bg-surface-subtle px-5 py-2.5 text-[0.6875rem] text-ink-muted">
        {ILLUSTRATIVE_NOTE}
      </p>
    </div>
  );
}

/* Advisory / analytics: margin trend with a control observation. */
export function AdvisoryVisual() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white shadow-md">
      <div className="border-b border-line bg-surface-subtle px-5 py-3.5">
        <p className="text-sm font-semibold text-ink-primary">Gross margin</p>
        <p className="mt-0.5 text-xs text-ink-muted">Rolling 12 months, percent</p>
      </div>

      <div className="p-5">
        <p className="text-h2 font-bold tabular-nums text-ink-primary">63.8%</p>
        <p className="mt-1 text-xs font-semibold text-success">
          +5.6 points <span className="font-normal text-ink-muted">over 12 months</span>
        </p>
        <TrendChart
          className="mt-5"
          series={grossMarginSeries}
          labels={months}
          ariaLabel="Gross margin percentage by month over the last twelve months"
          stroke="var(--color-viz-2)"
          fillFrom="rgba(192, 145, 46, 0.18)"
          fillTo="rgba(192, 145, 46, 0)"
          height={140}
        />
      </div>

      <div className="flex items-start gap-3 border-t border-line bg-gold-50 px-5 py-4">
        <Landmark aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-800" />
        <p className="text-xs leading-relaxed text-ink-secondary">
          <span className="font-semibold text-ink-primary">Observation:</span>{" "}
          two customers now represent a share of revenue worth monitoring. Review
          concentration before committing to fixed costs.
        </p>
      </div>

      <p className="border-t border-line bg-surface-subtle px-5 py-2.5 text-[0.6875rem] text-ink-muted">
        {ILLUSTRATIVE_NOTE}
      </p>
    </div>
  );
}
