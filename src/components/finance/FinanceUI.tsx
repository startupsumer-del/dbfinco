import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ChevronRight } from "lucide-react";

import { cn } from "@/lib/cn";

/**
 * The financial UI kit.
 *
 * Small, believable pieces of an accounting product — a report row, a metric,
 * a status line — that compose into the panels shown beside the portraits.
 * They exist so the site can *show* what the firm delivers rather than
 * describing it in another paragraph.
 *
 * Every figure they render comes from `demo-financials`, and every surface
 * that assembles them carries the illustrative note. Nothing here is styled to
 * look like live client data.
 */

/** The white surface these pieces sit on. */
export function FinancePanel({
  title,
  meta,
  children,
  className,
}: {
  title: string;
  meta?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      // Marks a reporting surface for `tests/imagery.spec.ts`, which holds
      // that none of them ever covers a portrait.
      data-finance-surface=""
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-white shadow-lg",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-subtle px-4 py-3">
        <p className="flex items-center gap-2.5 text-xs font-semibold text-ink-primary">
          <span aria-hidden="true" className="size-2 rounded-full bg-success" />
          {title}
        </p>
        {meta ? (
          <p className="text-[0.6875rem] font-medium text-ink-muted">{meta}</p>
        ) : null}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

/**
 * The same surface without a header row — for the small satellite cards that
 * sit beside a full panel and carry a single fact.
 */
export function FinanceCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-finance-surface=""
      className={cn(
        "rounded-xl border border-line bg-white p-3 shadow-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** A statement the client receives — the row reads like a report index. */
export function ReportRow({
  icon: Icon,
  title,
  period,
}: {
  icon: LucideIcon;
  title: string;
  period: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-line px-3 py-2.5">
      <span
        aria-hidden="true"
        className="flex size-8 shrink-0 items-center justify-center rounded-md bg-purple-50 text-purple-700"
      >
        <Icon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.8125rem] font-semibold text-ink-primary">
          {title}
        </span>
        <span className="block text-[0.6875rem] text-ink-muted">{period}</span>
      </span>
      <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-line-strong" />
    </div>
  );
}

/** A headline number with its movement. */
export function MetricTile({
  label,
  value,
  delta,
  tone = "neutral",
  className,
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: "neutral" | "positive";
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-line px-3 py-2.5", className)}>
      <p className="text-[0.6875rem] text-ink-muted">{label}</p>
      <p className="mt-1 text-[1.0625rem] font-bold tabular-nums leading-none text-ink-primary">
        {value}
      </p>
      {delta ? (
        <p
          className={cn(
            "mt-1.5 flex items-center gap-1 text-[0.6875rem] font-semibold",
            tone === "positive" ? "text-success" : "text-ink-muted",
          )}
        >
          {tone === "positive" ? (
            <ArrowUpRight aria-hidden="true" className="size-3" />
          ) : null}
          {delta}
        </p>
      ) : null}
    </div>
  );
}

/** A piece of work that is either done or not — the close, a filing, a review. */
export function StatusRow({
  label,
  status,
  tone = "done",
}: {
  label: string;
  status: string;
  tone?: "done" | "progress";
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="min-w-0 text-[0.8125rem] leading-snug text-ink-secondary">
        {label}
      </span>
      <span
        className={cn(
          "shrink-0 rounded-pill px-2.5 py-1 text-[0.6875rem] font-semibold",
          tone === "done"
            ? "bg-[#e6f2ec] text-success"
            : "bg-gold-100 text-gold-800",
        )}
      >
        {status}
      </span>
    </div>
  );
}

/** A slim progress track, used for close and audit progress. */
export function ProgressRow({
  label,
  percent,
  detail,
}: {
  label: string;
  percent: number;
  detail?: string;
}) {
  return (
    <div className="py-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="truncate text-[0.8125rem] text-ink-secondary">{label}</span>
        <span className="shrink-0 text-[0.6875rem] font-semibold tabular-nums text-ink-primary">
          {detail ?? `${percent}%`}
        </span>
      </div>
      <div
        aria-hidden="true"
        className="mt-2 h-1.5 overflow-hidden rounded-pill bg-purple-100"
      >
        <div
          className="h-full rounded-pill bg-purple-700"
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
    </div>
  );
}
