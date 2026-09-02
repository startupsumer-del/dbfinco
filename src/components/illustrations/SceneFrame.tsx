import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Shared frame for the service illustrations.
 *
 * Every scene draws inside the same 400×280 viewBox on the same soft brand
 * wash, so the set reads as one art direction rather than eight unrelated
 * drawings. The SVG scales to its container and carries no text, so nothing
 * becomes unreadable at small sizes and there is no fake dashboard copy.
 *
 * Scenes are decorative: the surrounding section always carries the real
 * heading and copy, so each is hidden from assistive technology.
 */
export function SceneFrame({
  children,
  className,
  tone = "violet",
}: {
  children: ReactNode;
  className?: string;
  tone?: "violet" | "gold";
}) {
  return (
    <svg
      viewBox="0 0 400 280"
      className={cn("h-auto w-full", className)}
      style={{ aspectRatio: "400 / 280" }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`wash-${tone}`} x1="0" y1="0" x2="1" y2="1">
          {tone === "gold" ? (
            <>
              <stop offset="0%" stopColor="#f5e5cf" />
              <stop offset="100%" stopColor="#fcf6ee" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#ede4f4" />
              <stop offset="100%" stopColor="#f8f3fb" />
            </>
          )}
        </linearGradient>
      </defs>
      {/* Soft ground, offset so the composition never sits dead-centre */}
      <circle cx="228" cy="132" r="150" fill={`url(#wash-${tone})`} />
      {children}
    </svg>
  );
}

/** A white surface with the site's border treatment, used inside scenes. */
export function Card({
  x,
  y,
  w,
  h,
  r = 12,
  fill = "#ffffff",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  fill?: string;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      fill={fill}
      stroke="#e7e2ee"
      strokeWidth="1.5"
    />
  );
}

/** A neutral text-line placeholder — a bar, never fake lettering. */
export function Line({
  x,
  y,
  w,
  h = 7,
  fill = "#d1c9dd",
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  fill?: string;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />;
}
