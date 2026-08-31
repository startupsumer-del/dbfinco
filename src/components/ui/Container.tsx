import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  as: Tag = "div",
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  width?: "default" | "narrow";
}) {
  return (
    <Tag
      className={cn(
        width === "narrow" ? "container-narrow" : "container-page",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
