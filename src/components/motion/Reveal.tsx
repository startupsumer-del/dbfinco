"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Gentle reveal on first entry into the viewport.
 *
 * One IntersectionObserver is shared by every Reveal on the page rather than
 * one per element, and each element is unobserved the moment it has played,
 * so the observer empties itself as the visitor scrolls.
 *
 * The offset state lives in CSS behind `.js-reveal` (see globals.css), which a
 * script at the end of the body adds before first paint. The reveal moves
 * position only and never touches opacity, so text is legible at full contrast
 * throughout — including in the failure cases. If this component never runs
 * (hydration fails, the bundle 404s, no IntersectionObserver) the worst
 * outcome is a block sitting 16px low, never content that cannot be read.
 */

let observer: IntersectionObserver | null = null;

function reveal(el: Element) {
  el.setAttribute("data-reveal", "in");
}

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === "undefined") return null;
  observer ??= new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target);
        obs.unobserve(entry.target);
      }
    },
    // The bottom margin is deliberately positive: it reveals slightly before
    // an element reaches the fold, and — more importantly — it can never
    // create a band at the bottom of the document where an element is on
    // screen but does not count as intersecting, which would leave the last
    // blocks on the page invisible forever.
    { rootMargin: "0px 0px 10% 0px", threshold: 0 },
  );
  return observer;
}

export function Reveal({
  children,
  as: Tag = "div",
  className,
  /** Milliseconds of stagger, for cards revealed as a group. */
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Nothing to do if the document was never marked, or a reader has asked
    // for reduced motion — in both cases the CSS already shows the content.
    if (!document.documentElement.classList.contains("js-reveal")) return;
    // The pre-paint script already settled everything that was on screen.
    if (el.getAttribute("data-reveal") === "ready") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal(el);
      return;
    }

    const io = getObserver();
    if (!io) {
      reveal(el);
      return;
    }

    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
