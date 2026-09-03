/**
 * Small chart maths helpers.
 *
 * Charts are hand-built SVG rather than a charting library: it keeps the
 * client bundle free of a ~100kB dependency, lets every mark inherit the
 * design system directly, and — most importantly — lets the charts be
 * genuinely responsive via viewBox while their labels stay as real HTML
 * text that scales with the root font size and never becomes unreadable.
 */

export interface Point {
  x: number;
  y: number;
}

/** Maps a value from one range to another. */
export function scale(
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number,
): number {
  if (fromMax === fromMin) return toMin;
  return toMin + ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin);
}

/**
 * Builds a smooth cubic path through the given points using a Catmull-Rom
 * spline converted to beziers. Tension is deliberately gentle so financial
 * series never overshoot into implausible dips between real data points.
 */
export function smoothPath(points: Point[], tension = 0.22): string {
  if (points.length === 0) return "";
  const first = points[0];
  if (!first) return "";
  if (points.length === 1) return `M ${first.x} ${first.y}`;

  let path = `M ${first.x} ${first.y}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    if (!p0 || !p1 || !p2 || !p3) continue;

    const c1x = p1.x + (p2.x - p0.x) * tension;
    const c1y = p1.y + (p2.y - p0.y) * tension;
    const c2x = p2.x - (p3.x - p1.x) * tension;
    const c2y = p2.y - (p3.y - p1.y) * tension;

    path += ` C ${round(c1x)} ${round(c1y)}, ${round(c2x)} ${round(c2y)}, ${round(p2.x)} ${round(p2.y)}`;
  }

  return path;
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

/** Closes a line path into a filled area down to the given baseline. */
export function areaFromLine(
  linePath: string,
  points: Point[],
  baselineY: number,
): string {
  const first = points[0];
  const last = points[points.length - 1];
  if (!first || !last) return "";
  return `${linePath} L ${round(last.x)} ${baselineY} L ${round(first.x)} ${baselineY} Z`;
}

/** Formats a whole-dollar amount, e.g. 1900762 → "$1,900,762". */
export function formatCurrency(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

/** Formats a compact dollar amount, e.g. 1900762 → "$1.9M". */
export function formatCompactCurrency(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `$${trim(value / 1_000_000)}M`;
  if (abs >= 1_000) return `$${trim(value / 1_000)}K`;
  return `$${Math.round(value)}`;
}

function trim(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

export function formatPercent(value: number, digits = 1): string {
  return `${value > 0 ? "+" : ""}${value.toFixed(digits)}%`;
}

/**
 * A "nice" upper bound, so gridlines land on readable numbers.
 *
 * The ladder is finer than the usual 1 / 2 / 5 / 10. On a series that tops
 * out at 11 the coarse version returns 20, and the tallest bar then fills
 * barely half the plot — a chart that reads as flat when the data is not.
 * Every rung here is still a number a reader can divide by four in their
 * head, which is all a gridline needs.
 */
const NICE_STEPS = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] as const;

export function niceMax(value: number): number {
  if (value <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const normalized = value / magnitude;
  const step = NICE_STEPS.find((candidate) => normalized <= candidate) ?? 10;
  return step * magnitude;
}
