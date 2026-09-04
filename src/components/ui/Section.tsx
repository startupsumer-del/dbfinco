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
 *
 * Tinted sections also carry a soft brand wash behind their content.
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
      // `overflow-clip`, not `overflow-hidden`: hidden makes the section a
      // scroll container and a `position: sticky` child inside it — the
      // contact page's summary column — stops sticking. Clip trims the wash
      // to the section without creating one.
      className={cn("relative overflow-clip", toneClasses[tone], padding, className)}
    >
      {/* Brand wash. Two soft radials, the same device the hero uses, so the
          tinted bands read as lit rather than as flat fill. Decorative,
          absolutely positioned and clipped by the section, so it can never
          create horizontal overflow or intercept a click. */}
      {tone === "subtle" || tone === "lilac" || tone === "deep" ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className={cn(
              "absolute -right-40 -top-48 size-[34rem] rounded-full",
              tone === "deep"
                ? "bg-[radial-gradient(circle,rgba(201,154,84,0.18),transparent_68%)]"
                : "bg-[radial-gradient(circle,var(--color-gold-100),transparent_66%)] opacity-70",
            )}
          />
          <div
            className={cn(
              "absolute -bottom-52 -left-44 size-[30rem] rounded-full",
              tone === "deep"
                ? "bg-[radial-gradient(circle,rgba(110,56,145,0.45),transparent_70%)]"
                : "bg-[radial-gradient(circle,var(--color-purple-100),transparent_68%)] opacity-70",
            )}
          />
        </div>
      ) : null}

      <div className="relative">{children}</div>
    </Tag>
  );
}
