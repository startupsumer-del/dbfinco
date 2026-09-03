import {
  areaFromLine,
  formatCompactCurrency,
  niceMax,
  scale,
  smoothPath,
  type Point,
} from "@/lib/chart";
import { cn } from "@/lib/cn";

/**
 * Responsive area/line chart.
 *
 * The SVG uses a viewBox with `preserveAspectRatio="none"` on the plot only
 * where it is safe; axis and tick labels are rendered as HTML beneath the
 * chart so they scale with the root font size and stay readable at 320px.
 */
export function TrendChart({
  series,
  labels,
  ariaLabel,
  className,
  stroke = "var(--color-viz-1)",
  fillFrom = "rgba(86, 39, 117, 0.18)",
  fillTo = "rgba(86, 39, 117, 0)",
  height = 180,
  showGrid = true,
  showLabels = true,
  zeroBaseline = true,
  animate = true,
}: {
  series: number[];
  labels: readonly string[];
  ariaLabel: string;
  className?: string;
  stroke?: string;
  fillFrom?: string;
  fillTo?: string;
  height?: number;
  showGrid?: boolean;
  /** Drop the month row when the chart is small enough that it would crowd. */
  showLabels?: boolean;
  /**
   * Full-size charts start at zero, because a truncated axis overstates
   * movement and this is a finance site. A sparkline has no axis to read and
   * no room to spend on the empty band below the data, so it may sit on a
   * floating baseline — the caption still names the real range.
   */
  zeroBaseline?: boolean;
  animate?: boolean;
}) {
  const width = 640;
  const padY = 14;
  const seriesMin = Math.min(...series);
  const seriesMax = Math.max(...series);
  const max = zeroBaseline
    ? niceMax(seriesMax * 1.08)
    : seriesMax + (seriesMax - seriesMin) * 0.18;
  const min = zeroBaseline ? 0 : Math.max(0, seriesMin - (seriesMax - seriesMin) * 0.3);

  const points: Point[] = series.map((value, index) => ({
    x: scale(index, 0, Math.max(1, series.length - 1), 6, width - 6),
    y: scale(value, min, max, height - padY, padY),
  }));

  const line = smoothPath(points);
  const area = areaFromLine(line, points, height);
  const gradientId = `trend-${ariaLabel.replace(/\W+/g, "-").toLowerCase()}`;
  const last = points[points.length - 1];

  // Show at most 6 x labels so they never collide on narrow screens.
  const labelStep = Math.max(1, Math.ceil(labels.length / 6));
  const visibleLabels = labels.filter((_, index) => index % labelStep === 0);

  return (
    <figure className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={ariaLabel}
        className="h-auto w-full"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillFrom} />
            <stop offset="100%" stopColor={fillTo} />
          </linearGradient>
        </defs>

        {showGrid
          ? [0.25, 0.5, 0.75, 1].map((fraction) => (
              <line
                key={fraction}
                x1="0"
                x2={width}
                y1={height - fraction * (height - padY * 2) - padY}
                y2={height - fraction * (height - padY * 2) - padY}
                stroke="var(--color-line)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            ))
          : null}

        <path d={area} fill={`url(#${gradientId})`} />
        <path
          d={line}
          fill="none"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className={animate ? "[animation:db-draw_900ms_var(--ease-out-brand)_both]" : undefined}
          style={
            animate
              ? ({ strokeDasharray: 2200, "--db-draw-length": 2200 } as React.CSSProperties)
              : undefined
          }
        />

        {last ? (
          <circle
            cx={last.x}
            cy={last.y}
            r="4"
            fill="var(--color-surface-white)"
            stroke={stroke}
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
        ) : null}
      </svg>

      {showLabels ? (
        <div
          aria-hidden="true"
          className="mt-3 flex justify-between text-[0.6875rem] font-medium text-ink-muted"
        >
          {visibleLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      ) : null}

      <figcaption className="sr-only">
        {ariaLabel}. Values range from {formatCompactCurrency(seriesMin)} to{" "}
        {formatCompactCurrency(seriesMax)}.
      </figcaption>
    </figure>
  );
}
