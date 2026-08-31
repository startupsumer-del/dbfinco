import { formatCompactCurrency } from "@/lib/chart";
import { cn } from "@/lib/cn";
import type { ExpenseCategory } from "@/content/demo-financials";

/**
 * Expense breakdown donut.
 *
 * Segments are drawn with stroke-dasharray on circles, which keeps the SVG
 * tiny and lets every segment animate independently. The legend is HTML with
 * both the label and the value shown, so no information depends on hovering.
 */
export function DonutChart({
  categories,
  total,
  centerLabel,
  ariaLabel,
  className,
  size = 200,
}: {
  categories: ExpenseCategory[];
  total: number;
  centerLabel: string;
  ariaLabel: string;
  className?: string;
  size?: number;
}) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  // Each segment starts where the previous one ended. Offsets are derived by
  // summing the preceding arc lengths rather than by mutating an accumulator,
  // which keeps this component a pure function of its props.
  const arcLengths = categories.map((category) =>
    total > 0 ? (category.amount / total) * circumference : 0,
  );

  const segments = categories.map((category, index) => {
    const length = arcLengths[index] ?? 0;
    const startOffset = arcLengths
      .slice(0, index)
      .reduce((sum, value) => sum + value, 0);

    return {
      ...category,
      fraction: total > 0 ? category.amount / total : 0,
      dashArray: `${length} ${circumference - length}`,
      dashOffset: -startOffset,
    };
  });

  return (
    <figure className={cn("flex flex-col gap-6 sm:flex-row sm:items-center", className)}>
      <div className="relative mx-auto shrink-0 sm:mx-0" style={{ width: size, maxWidth: "100%" }}>
        <svg
          viewBox="0 0 100 100"
          role="img"
          aria-label={ariaLabel}
          className="h-auto w-full -rotate-90"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="var(--color-surface-muted)"
            strokeWidth="13"
          />
          {segments.map((segment) => (
            <circle
              key={segment.label}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={segment.colorVar}
              strokeWidth="13"
              strokeDasharray={segment.dashArray}
              strokeDashoffset={segment.dashOffset}
              strokeLinecap="butt"
            />
          ))}
        </svg>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-h4 font-bold text-ink-primary">
            {formatCompactCurrency(total)}
          </span>
          <span className="mt-0.5 text-[0.6875rem] font-medium text-ink-muted">
            {centerLabel}
          </span>
        </div>
      </div>

      <ul className="min-w-0 flex-1 space-y-2.5">
        {segments.map((segment) => (
          <li
            key={segment.label}
            className="flex items-baseline justify-between gap-3 text-sm"
          >
            <span className="flex min-w-0 items-baseline gap-2.5">
              <span
                aria-hidden="true"
                className="size-2.5 shrink-0 translate-y-px rounded-full"
                style={{ background: segment.colorVar }}
              />
              <span className="truncate text-ink-secondary">{segment.label}</span>
            </span>
            <span className="shrink-0 font-semibold tabular-nums text-ink-primary">
              {Math.round(segment.fraction * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
