import { scale, smoothPath, type Point } from "@/lib/chart";

/** Compact trend indicator used inside KPI tiles. Purely decorative. */
export function Sparkline({
  series,
  stroke = "var(--color-viz-1)",
  className,
}: {
  series: number[];
  stroke?: string;
  className?: string;
}) {
  const width = 120;
  const height = 32;
  const max = Math.max(...series);
  const min = Math.min(...series);

  const points: Point[] = series.map((value, index) => ({
    x: scale(index, 0, Math.max(1, series.length - 1), 2, width - 2),
    y: scale(value, min, max, height - 4, 4),
  }));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <path
        d={smoothPath(points)}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        data-chart-anim=""
        className="[animation:db-draw_700ms_var(--ease-out-brand)_both]"
        style={{ strokeDasharray: 400, "--db-draw-length": 400 } as React.CSSProperties}
      />
    </svg>
  );
}
