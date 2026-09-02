import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Small uppercase label that sits above a section heading.
 *
 * Deliberately just type: the label carries the hierarchy on its own, and a
 * decorative rule beside it only competed with the heading underneath.
 */
export function Eyebrow({
  children,
  className,
  tone = "purple",
}: {
  children: ReactNode;
  className?: string;
  tone?: "purple" | "gold" | "inverse";
}) {
  const toneClass =
    tone === "gold"
      ? "text-gold-800"
      : tone === "inverse"
        ? "text-gold-300"
        : "text-purple-700";

  return (
    <p
      className={cn(
        "text-eyebrow font-semibold uppercase",
        toneClass,
        className,
      )}
    >
      {children}
    </p>
  );
}
