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
 * Vertical rhythm for page sections.
 *
 * One scale for the whole site: 48 / 64 / 88px by default, 40 / 48 / 64 when
 * compact, 56 / 72 / 96 when roomy. Every section on every page uses one of
 * the three, so vertical spacing never drifts page to page.
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
      ? "py-10 sm:py-12 lg:py-16"
      : size === "roomy"
        ? "py-14 sm:py-18 lg:py-24"
        : "py-12 sm:py-16 lg:py-22";

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
