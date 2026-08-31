import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
  tone = "purple",
}: {
  children: ReactNode;
  className?: string;
  tone?: "purple" | "gold" | "inverse";
}) {
  const tones = {
    purple: "border-purple-100 bg-purple-50 text-purple-800",
    gold: "border-gold-200 bg-gold-50 text-gold-800",
    inverse: "border-white/20 bg-white/10 text-purple-50",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
