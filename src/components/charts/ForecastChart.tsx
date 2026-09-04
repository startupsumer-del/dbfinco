import {
  formatCompactCurrency,
  niceMax,
  scale,
  smoothPath,
  type Point,
} from "@/lib/chart";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * Actuals followed by a projection.
 *
 * The one thing a chart like this must not do is let a forecast read as
 * history, so the two are separated three ways over: the projected line is
 * dashed, the ground under it is tinted, and a rule marks where the actuals
 * stop. The legend names both, and the caption states the split in words for
 * anyone who is not reading the picture.
 */
export function ForecastChart({
  actuals,
  forecast,
  labels,
  ariaLabel,
  className,
  height = 190,
}: {
  actuals: number[];
  forecast: number[];
  /** One label per point, actuals first. */
  labels: readonly string[];
  ariaLabel: string;
  className?: string;
  height?: number;
}) {
  const width = 640;
  const padY = 14;
  const series = [...actuals, ...forecast];
  const max = niceMax(Math.max(...series) * 1.08);

  const points: Point[] = series.map((value, index) => ({
    x: scale(index, 0, Math.max(1, series.length - 1), 6, width - 6),
    y: scale(value, 0, max, height - padY, padY),
  }));

  // The projection starts at the final actual so the two lines meet.
  const actualPoints = points.slice(0, actuals.length);
  const forecastPoints = points.slice(Math.max(0, actuals.length - 1));
  const boundaryX = actualPoints[actualPoints.length - 1]?.x ?? 0;

  const labelStep = Math.max(1, Math.ceil(labels.length / 6));
  const clipId = `fc-${ariaLabel.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <Reveal as="figure" className={cn("reveal-still w-full", className)}>
      <ul className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <li className="flex items-center gap-2 text-xs font-medium text-ink-secondary">
          <span
            aria-hidden="true"
            className="h-0.5 w-5 rounded-pill bg-[var(--color-viz-1)]"
          />
          Actual
        </li>
        <li className="flex items-center gap-2 text-xs font-medium text-ink-secondary">
          <span
            aria-hidden="true"
            className="h-0.5 w-5 rounded-pill bg-[repeating-linear-gradient(to_right,var(--color-viz-3)_0_5px,transparent_5px_9px)]"
          />
          Forecast
        </li>
      </ul>

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
        <defs>
          {/* The projection is wiped in left to right. A dashed line cannot be
              drawn with a dash offset — that slides the dashes along the path
              rather than extending it — so the clip does the drawing. */}
          <clipPath id={`${clipId}-forecast`}>
            <rect
              x={boundaryX}
              y="0"
              width={Math.max(0, width - boundaryX)}
              height={height}
              data-chart-anim=""
              className="origin-left [animation:db-grow-x_720ms_var(--ease-out-brand)_both_620ms]"
              style={{ transformBox: "fill-box" } as React.CSSProperties}
            />
          </clipPath>
        </defs>

        {/* Tinted ground under the projected months */}
        <rect
          x={boundaryX}
          y="0"
          width={Math.max(0, width - boundaryX)}
          height={height}
          fill="var(--color-surface-muted)"
          data-chart-anim=""
          className="origin-left [animation:db-grow-x_720ms_var(--ease-out-brand)_both_620ms]"
          style={{ transformBox: "fill-box" } as React.CSSProperties}
        />

        {[0.25, 0.5, 0.75, 1].map((fraction) => (
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
        ))}

        <line
          x1={boundaryX}
          x2={boundaryX}
          y1="0"
          y2={height}
          stroke="var(--color-line-strong)"
          strokeWidth="1"
          strokeDasharray="3 3"
          vectorEffect="non-scaling-stroke"
          data-chart-anim=""
          className="origin-bottom [animation:db-grow-y_420ms_var(--ease-out-brand)_both_520ms]"
        />

        <path
          d={smoothPath(actualPoints)}
          fill="none"
          stroke="var(--color-viz-1)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          data-chart-anim=""
          className="[animation:db-draw_900ms_var(--ease-out-brand)_both]"
          style={{ strokeDasharray: 2200, "--db-draw-length": 2200 } as React.CSSProperties}
        />
        <path
          d={smoothPath(forecastPoints)}
          fill="none"
          stroke="var(--color-viz-3)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="7 6"
          vectorEffect="non-scaling-stroke"
          clipPath={`url(#${clipId}-forecast)`}
        />
      </svg>

      <div
        aria-hidden="true"
        className="mt-3 flex justify-between text-[0.6875rem] font-medium text-ink-muted"
      >
        {labels
          .filter((_, index) => index % labelStep === 0)
          .map((label, index) => (
            <span key={`${label}-${index}`}>{label}</span>
          ))}
      </div>

      <figcaption className="sr-only">
        {ariaLabel}. {actuals.length} months of actuals from{" "}
        {formatCompactCurrency(Math.min(...actuals))} to{" "}
        {formatCompactCurrency(Math.max(...actuals))}, followed by{" "}
        {forecast.length} projected months ending at{" "}
        {formatCompactCurrency(forecast[forecast.length - 1] ?? 0)}. The
        projected months are an estimate, not recorded results.
      </figcaption>
    </Reveal>
  );
}
