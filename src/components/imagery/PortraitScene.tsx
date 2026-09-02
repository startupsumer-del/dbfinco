import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The portrait compositions used across the site.
 *
 * Each one layers three things: a brand-coloured ground, a cut-out portrait
 * that breaks out over the top of it, and small status cards that float at
 * the edges. The portraits are decorative — every claim on the page is made
 * in real text beside them — so they carry an empty alt and the cards are
 * hidden from assistive technology.
 *
 * Card positions are percentages of the frame, so the whole composition
 * scales smoothly from 320px to desktop without a separate mobile layout.
 */

export const portraits = {
  standing: {
    src: "/imagery/advisor-standing.webp",
    width: 900,
    height: 1302,
  },
  explaining: {
    src: "/imagery/advisor-explaining.webp",
    width: 900,
    height: 1219,
  },
  partner: {
    src: "/imagery/advisor-partner.webp",
    width: 900,
    height: 1357,
  },
  manager: {
    src: "/imagery/advisor-manager.webp",
    width: 900,
    height: 1230,
  },
  consultant: {
    src: "/imagery/advisor-consultant.webp",
    width: 900,
    height: 1298,
  },
} as const;

export type PortraitName = keyof typeof portraits;

export function PortraitScene({
  portrait,
  tone = "violet",
  cards,
  className,
  priority = false,
}: {
  portrait: PortraitName;
  tone?: "violet" | "gold" | "lilac";
  /** Floating status cards, positioned with the `at` prop. */
  cards?: ReactNode;
  className?: string;
  priority?: boolean;
}) {
  const image = portraits[portrait];

  return (
    <div className={cn("relative mx-auto w-full max-w-[26rem] lg:max-w-none", className)}>
      {/* 4:5 frame keeps the composition stable at every width. */}
      <div className="relative aspect-[4/5]">
        {/* Coloured ground the portrait stands on */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-x-[7%] bottom-0 top-[14%] rounded-[1.75rem] sm:rounded-[2.25rem]",
            tone === "gold" &&
              "bg-[linear-gradient(150deg,var(--color-gold-300),var(--color-gold-100))]",
            tone === "lilac" &&
              "bg-[linear-gradient(150deg,var(--color-purple-200),var(--color-purple-50))]",
            tone === "violet" &&
              "bg-[linear-gradient(150deg,var(--color-purple-700),var(--color-purple-900))]",
          )}
        />
        {/* Soft halo behind the head, so the cut-out never floats unsupported */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute left-1/2 top-[4%] size-[62%] -translate-x-1/2 rounded-full",
            tone === "gold"
              ? "bg-[radial-gradient(circle,var(--color-gold-100),transparent_70%)]"
              : "bg-[radial-gradient(circle,var(--color-purple-100),transparent_70%)]",
          )}
        />

        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt=""
          priority={priority}
          sizes="(min-width: 1024px) 30rem, (min-width: 640px) 26rem, 90vw"
          className="absolute inset-x-0 bottom-0 mx-auto h-full w-auto max-w-none object-contain object-bottom"
        />

        {cards}
      </div>
    </div>
  );
}

/** Anchor points for floating cards, as percentage insets of the frame. */
const anchors = {
  // Every anchor sits below 40% of the frame. The head and shoulders occupy
  // the top third of each cut-out, and a card must never cover the face.
  "top-left": "left-[-4%] top-[42%]",
  "top-right": "right-[-4%] top-[42%]",
  "mid-left": "left-[-5%] top-[56%]",
  "mid-right": "right-[-5%] top-[56%]",
  "bottom-left": "bottom-[8%] left-[-4%]",
  "bottom-right": "bottom-[8%] right-[-4%]",
} as const;

/**
 * A small floating card. Decorative: it restates, in miniature, something the
 * surrounding copy already says, so nothing is lost when it is skipped.
 */
export function FloatCard({
  at,
  icon,
  title,
  detail,
  className,
}: {
  at: keyof typeof anchors;
  icon?: ReactNode;
  title: string;
  detail?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute z-10 flex w-max max-w-[76%] items-center gap-2.5 rounded-xl border border-line",
        "bg-white/95 px-3 py-2.5 shadow-lg backdrop-blur-sm sm:gap-3 sm:px-3.5 sm:py-3",
        anchors[at],
        className,
      )}
    >
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span className="min-w-0">
        <span className="block text-[0.6875rem] font-semibold leading-tight text-ink-primary sm:text-xs">
          {title}
        </span>
        {detail ? (
          <span className="mt-0.5 block text-[0.625rem] leading-tight text-ink-muted sm:text-[0.6875rem]">
            {detail}
          </span>
        ) : null}
      </span>
    </div>
  );
}

/** Round icon chip used inside FloatCard. */
export function CardIcon({
  children,
  tone = "success",
}: {
  children: ReactNode;
  tone?: "success" | "violet" | "gold";
}) {
  return (
    <span
      className={cn(
        "flex size-7 items-center justify-center rounded-full sm:size-8",
        tone === "success" && "bg-[#e6f2ec] text-success",
        tone === "violet" && "bg-purple-100 text-purple-700",
        tone === "gold" && "bg-gold-100 text-gold-800",
      )}
    >
      {children}
    </span>
  );
}
