import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Small uppercase label that sits above a section heading. */
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
      <span className="inline-flex items-center gap-2">
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-6",
            tone === "inverse" ? "bg-gold-400/70" : "bg-gold-600",
          )}
        />
        {children}
      </span>
    </p>
  );
}
