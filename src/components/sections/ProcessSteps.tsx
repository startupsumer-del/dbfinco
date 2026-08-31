import { cn } from "@/lib/cn";
import type { ProcessStep } from "@/types/content";

/**
 * Numbered process timeline.
 *
 * Mobile renders a vertical rail with the connector drawn behind the markers;
 * from laptop up it becomes a four-across row with a horizontal rule. The
 * connector is decorative and never overlaps text at any width.
 */
export function ProcessSteps({
  steps,
  className,
  tone = "light",
}: {
  steps: ProcessStep[];
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <ol className={cn("relative grid gap-8 lg:grid-cols-4 lg:gap-6", className)}>
      {/* Horizontal connector, desktop only */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 right-0 top-5 hidden h-px lg:block",
          tone === "dark" ? "bg-white/15" : "bg-line",
        )}
      />
      {steps.map((step, index) => (
        <li key={step.title} className="relative flex gap-4 lg:block">
          {/* Vertical connector, mobile and tablet only */}
          {index < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-5 top-11 h-[calc(100%+2rem)] w-px lg:hidden",
                tone === "dark" ? "bg-white/15" : "bg-line",
              )}
            />
          ) : null}

          <span
            aria-hidden="true"
            className={cn(
              "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full",
              "text-sm font-bold tabular-nums lg:size-10",
              tone === "dark"
                ? "bg-gold-500 text-purple-950"
                : "border border-purple-100 bg-purple-800 text-white",
            )}
          >
            {index + 1}
          </span>

          <div className="min-w-0 lg:mt-5">
            <h3
              className={cn(
                "text-h4 font-semibold",
                tone === "dark" ? "text-white" : "text-ink-primary",
              )}
            >
              {step.title}
            </h3>
            <p
              className={cn(
                "mt-2 text-sm leading-relaxed",
                tone === "dark" ? "text-purple-100" : "text-ink-secondary",
              )}
            >
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
