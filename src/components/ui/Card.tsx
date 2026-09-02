import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Neutral surface card used across service grids and feature lists. */
export function Card({
  children,
  className,
  as: Tag = "div",
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  interactive?: boolean;
}) {
  return (
    <Tag
      className={cn(
        "relative rounded-xl border border-line bg-white p-5 sm:p-6 lg:p-7",
        interactive &&
          "transition-[border-color,box-shadow,transform] duration-250 " +
            "ease-[var(--ease-out-brand)] hover:-translate-y-0.5 " +
            "hover:border-purple-200 hover:shadow-lg " +
            "focus-within:border-purple-300 focus-within:shadow-lg",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
