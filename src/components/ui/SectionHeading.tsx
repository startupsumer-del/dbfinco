import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

/**
 * Standard section header: eyebrow, heading, optional lead paragraph.
 * Centred variants keep a tighter measure so lines never run too long.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  id,
  className,
  level = 2,
}: {
  eyebrow?: string;
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
    <div
      className={cn(
        centered && "mx-auto text-center",
        centered ? "max-w-3xl" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow
          tone={tone === "dark" ? "inverse" : "purple"}
          className={cn("mb-4", centered && "flex justify-center")}
        >
          {eyebrow}
        </Eyebrow>
      ) : null}
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
            "mt-5 text-lead",
            centered ? "mx-auto measure" : "measure",
            tone === "dark" ? "text-purple-100" : "text-ink-secondary",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
