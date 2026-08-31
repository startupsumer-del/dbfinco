import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Sparkline } from "@/components/charts/Sparkline";
import { cn } from "@/lib/cn";

/**
 * A single reporting metric: label, value, period-on-period change and an
 * optional sparkline. `direction` states whether the movement is favourable,
 * because a rise in expenses is not the same kind of news as a rise in revenue.
 */
export function KpiTile({
  label,
  value,
  change,
  direction = "up-good",
  series,
  seriesColor,
  className,
}: {
  label: string;
  value: string;
  change?: string;
  direction?: "up-good" | "up-bad";
  series?: number[];
  seriesColor?: string;
  className?: string;
}) {
  const isPositiveMovement = change?.startsWith("+") ?? true;
  const favourable =
    direction === "up-good" ? isPositiveMovement : !isPositiveMovement;
  const Icon = isPositiveMovement ? ArrowUpRight : ArrowDownRight;

  return (
    <div
      className={cn(
        "rounded-lg border border-line bg-white p-4 sm:p-5",
        className,
      )}
    >
      <p className="text-xs font-medium text-ink-muted">{label}</p>
      {/* Values are kept on one line: a wrapped "$714.8 K" reads as broken. */}
      <p className="mt-1.5 whitespace-nowrap text-h3 font-bold tabular-nums text-ink-primary">
        {value}
      </p>
      {change ? (
        <p
          className={cn(
            "mt-1.5 flex flex-wrap items-center gap-x-1 text-xs font-semibold",
            favourable ? "text-success" : "text-warning",
          )}
        >
          <span className="inline-flex items-center gap-0.5 whitespace-nowrap">
            <Icon aria-hidden="true" className="size-3.5" />
            {change}
          </span>
          <span className="whitespace-nowrap font-normal text-ink-muted">
            vs prior period
          </span>
        </p>
      ) : null}
      {series ? (
        <Sparkline series={series} stroke={seriesColor} className="mt-4 h-8 w-full" />
      ) : null}
    </div>
  );
}
