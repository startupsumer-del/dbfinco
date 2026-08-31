"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { cn } from "@/lib/cn";
import type { FaqItem } from "@/types/content";

/**
 * FAQ accordion.
 *
 * Built on real buttons with aria-expanded / aria-controls rather than
 * <details>, so the open/close transition can be animated and controlled.
 * Content uses a grid-rows transition, which animates smoothly to the
 * content's natural height without needing a measured pixel value.
 */
export function Accordion({
  items,
  tone = "light",
  className,
}: {
  items: FaqItem[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div
      className={cn(
        "divide-y rounded-xl border",
        tone === "dark"
          ? "divide-white/10 border-white/15 bg-white/[0.04]"
          : "divide-line border-line bg-white",
        className,
      )}
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={cn(
                  "flex w-full items-start justify-between gap-4 px-5 py-5 text-left",
                  "min-h-11 text-h4 font-semibold transition-colors duration-200",
                  "sm:px-6",
                  tone === "dark"
                    ? "text-white hover:text-gold-300"
                    : "text-ink-primary hover:text-purple-800",
                )}
              >
                <span className="flex-1">{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 size-5 shrink-0 transition-transform duration-250 ease-[var(--ease-out-brand)]",
                    isOpen && "rotate-180",
                    tone === "dark" ? "text-gold-300" : "text-purple-600",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="grid grid-rows-[1fr]"
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    "measure px-5 pb-6 leading-relaxed sm:px-6",
                    tone === "dark" ? "text-purple-100" : "text-ink-secondary",
                  )}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
