import { formatCompactCurrency, niceMax, scale } from "@/lib/chart";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

interface BarGroup {
  label: string;
  primary: number;
  secondary: number;
}

/**
 * Grouped bar chart used for revenue against expenses, and for budget
 * against actual. Bars are drawn in a viewBox that stretches to the parent,
 * while the legend and category labels are HTML so they stay legible.
 */
export function BarPairChart({
  groups,
  primaryLabel,
  secondaryLabel,
  ariaLabel,
  className,
  height = 190,
}: {
  groups: BarGroup[];
  primaryLabel: string;
  secondaryLabel: string;
  ariaLabel: string;
  className?: string;
  height?: number;
}) {
  const width = 640;
  const padY = 10;
  const max = niceMax(
    Math.max(...groups.flatMap((group) => [group.primary, group.secondary])) * 1.06,
  );

  const slot = width / Math.max(1, groups.length);
  const barWidth = Math.min(26, slot * 0.28);
  const gap = barWidth * 0.34;

  return (
    <Reveal as="figure" className={cn("reveal-still w-full", className)}>
      <ul className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <li className="flex items-center gap-2 text-xs font-medium text-ink-secondary">
          <span
            aria-hidden="true"
            className="size-2.5 rounded-xs"
            style={{ background: "var(--color-viz-1)" }}
          />
          {primaryLabel}
        </li>
        <li className="flex items-center gap-2 text-xs font-medium text-ink-secondary">
          <span
            aria-hidden="true"
            className="size-2.5 rounded-xs"
            style={{ background: "var(--color-viz-2)" }}
          />
          {secondaryLabel}
        </li>
      </ul>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label={ariaLabel}
        className="h-auto w-full"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        {[0.25, 0.5, 0.75, 1].map((fraction) => (
          <line
            key={fraction}
            x1="0"
            x2={width}
            y1={height - fraction * (height - padY) }
            y2={height - fraction * (height - padY) }
            stroke="var(--color-line)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {groups.map((group, index) => {
          const centre = slot * index + slot / 2;
          const primaryHeight = scale(group.primary, 0, max, 0, height - padY);
          const secondaryHeight = scale(group.secondary, 0, max, 0, height - padY);

          return (
            <g key={group.label}>
              <rect
                x={centre - barWidth - gap / 2}
                y={height - primaryHeight}
                width={barWidth}
                height={primaryHeight}
                rx="3"
                fill="var(--color-viz-1)"
                data-chart-anim=""
                className="origin-bottom [animation:db-grow-y_620ms_var(--ease-out-brand)_both]"
                style={{ animationDelay: `${index * 55}ms` }}
              />
              <rect
                x={centre + gap / 2}
                y={height - secondaryHeight}
                width={barWidth}
                height={secondaryHeight}
                rx="3"
                fill="var(--color-viz-2)"
                data-chart-anim=""
                className="origin-bottom [animation:db-grow-y_620ms_var(--ease-out-brand)_both]"
                style={{ animationDelay: `${index * 55 + 70}ms` }}
              />
            </g>
          );
        })}
      </svg>

      <div
        aria-hidden="true"
        className="mt-3 grid text-[0.6875rem] font-medium text-ink-muted"
        style={{ gridTemplateColumns: `repeat(${groups.length}, minmax(0, 1fr))` }}
      >
        {groups.map((group) => (
          <span key={group.label} className="truncate text-center">
            {group.label}
          </span>
        ))}
      </div>

      <figcaption className="sr-only">
        {ariaLabel}.{" "}
        {groups
          .map(
            (group) =>
              `${group.label}: ${primaryLabel} ${formatCompactCurrency(group.primary)}, ${secondaryLabel} ${formatCompactCurrency(group.secondary)}`,
          )
          .join(". ")}
        .
      </figcaption>
    </Reveal>
  );
}
