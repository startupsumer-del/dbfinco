import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * Standard section header: heading and an optional lead paragraph.
 *
 * There is no kicker above the heading. A small uppercase label there repeated
 * in shorthand what the heading said in full, and every section opening with
 * one made the page read as a list of labels rather than a sequence of
 * statements. Centred variants keep a tighter measure so lines never run long.
 */
export function SectionHeading({
  title,
  lead,
  align = "left",
  tone = "light",
  id,
  className,
  level = 2,
}: {
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
  className?: string;
  level?: 2 | 3;
}) {
  const Heading = level === 2 ? "h2" : "h3";
  const centered = align === "center";

  return (
    <Reveal
      className={cn("max-w-3xl", centered && "mx-auto text-center", className)}
    >
      <Heading
        id={id}
        className={cn(
          "text-h2",
          tone === "dark" ? "text-white" : "text-ink-primary",
        )}
      >
        {title}
      </Heading>
      {lead ? (
        <p
          className={cn(
            "mt-4 text-lead",
            centered ? "mx-auto measure" : "measure",
            tone === "dark" ? "text-purple-100" : "text-ink-secondary",
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
