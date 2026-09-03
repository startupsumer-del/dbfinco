import { formatCompactCurrency, niceMax, scale } from "@/lib/chart";
import { cn } from "@/lib/cn";

export interface Bar {
  /** Shown under the bar. May repeat — two weeks of weekdays, say. */
  label: string;
  value: number;
  /**
   * What the caption calls this bar, when the visible label is too terse to
   * stand alone out of context ("M" for the eighth day of a fortnight).
   */
  srLabel?: string;
}

/**
 * Single-series categorical bar chart.
 *
 * Used where the reading is "how much in each bucket" rather than "which way
 * is it moving" — receivables by age, processed volume by day. Bars start at
 * zero, always: this is the one chart type where a clipped baseline turns a
 * 6% difference into a 60% one.
 *
 * The bars live in a stretching viewBox; the category labels are HTML
 * underneath so they stay at the root font size and never squash.
 */
export function BarChart({
  bars,
  ariaLabel,
  className,
  height = 170,
  fill = "var(--color-viz-1)",
  highlightLast = false,
  maxLabels = 7,
}: {
  bars: Bar[];
  ariaLabel: string;
  className?: string;
  height?: number;
  fill?: string;
  /** Draw the final bar in the accent colour — "today", "current period". */
  highlightLast?: boolean;
  maxLabels?: number;
}) {
  const width = 640;
  const padY = 8;
  const max = niceMax(Math.max(...bars.map((bar) => bar.value)) * 1.06);

  const slot = width / Math.max(1, bars.length);
  const barWidth = Math.min(46, slot * 0.62);

  const labelStep = Math.max(1, Math.ceil(bars.length / maxLabels));

  return (
    <figure className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={ariaLabel}
        // The viewBox stretches to the column, so the drawn height falls out
        // of the width. On a phone that left the plot about 80px tall; the
        // floor keeps it readable without changing anything on desktop.
        className="h-auto min-h-[8.5rem] w-full"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <line
          x1="0"
          x2={width}
          y1={height - padY}
          y2={height - padY}
          stroke="var(--color-line)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {bars.map((bar, index) => {
          const top = scale(bar.value, 0, max, height - padY, padY);
          const x = slot * index + (slot - barWidth) / 2;
          const isLast = index === bars.length - 1;
          return (
            <rect
              key={index}
              x={x}
              y={top}
              width={barWidth}
              height={Math.max(1, height - padY - top)}
              rx="3"
              fill={highlightLast && isLast ? "var(--color-gold-500)" : fill}
              className="origin-bottom [animation:db-grow-y_620ms_var(--ease-out-brand)_both]"
              style={{ animationDelay: `${index * 45}ms` }}
            />
          );
        })}
      </svg>

      <div
        aria-hidden="true"
        className="mt-2.5 grid text-[0.6875rem] font-medium text-ink-muted"
        style={{ gridTemplateColumns: `repeat(${bars.length}, minmax(0, 1fr))` }}
      >
        {bars.map((bar, index) => (
          <span key={index} className="truncate text-center">
            {index % labelStep === 0 ? bar.label : ""}
          </span>
        ))}
      </div>

      <figcaption className="sr-only">
        {ariaLabel}.{" "}
        {bars
          .map(
            (bar) =>
              `${bar.srLabel ?? bar.label}: ${formatCompactCurrency(bar.value)}`,
          )
          .join(", ")}
        .
      </figcaption>
    </figure>
  );
}
