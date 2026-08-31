import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Tone = "white" | "subtle" | "lilac" | "gold" | "deep";

const toneClasses: Record<Tone, string> = {
  white: "bg-surface-white text-ink-primary",
  subtle: "bg-surface-subtle text-ink-primary",
  lilac: "bg-surface-lilac text-ink-primary",
  gold: "bg-surface-gold-soft text-ink-primary",
  deep: "bg-purple-900 text-ink-inverse",
};

/**
 * Vertical rhythm for page sections. Padding scales with the viewport so
 * mobile sections stay compact and desktop sections get room to breathe.
 */
export function Section({
  children,
  className,
  tone = "white",
  id,
  size = "default",
  as: Tag = "section",
  ariaLabelledBy,
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  id?: string;
  size?: "default" | "compact" | "roomy";
  as?: "section" | "div" | "article" | "footer";
  ariaLabelledBy?: string;
}) {
  const padding =
    size === "compact"
      ? "py-12 sm:py-16 lg:py-20"
      : size === "roomy"
        ? "py-20 sm:py-28 lg:py-36"
        : "py-16 sm:py-20 lg:py-28";

  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn("relative", toneClasses[tone], padding, className)}
    >
      {children}
    </Tag>
  );
}
