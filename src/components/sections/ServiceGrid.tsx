import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import type { ServiceDetail } from "@/types/content";

/**
 * Service card grid.
 *
 * Column counts step deliberately rather than collapsing straight to one:
 * 1 on phones, 2 on tablet, 3 from laptop up — so cards keep a comfortable
 * measure at every width.
 */
export function ServiceGrid({
  services,
  className,
  columns = 3,
}: {
  services: ServiceDetail[];
  className?: string;
  columns?: 2 | 3 | 4;
}) {
  return (
    <ul
      className={cn(
        "grid gap-5 sm:grid-cols-2 sm:gap-6",
        columns === 4
          ? "lg:grid-cols-3 xl:grid-cols-4"
          : columns === 3
            ? "lg:grid-cols-3"
            : "lg:grid-cols-2",
        className,
      )}
    >
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <Reveal
            key={service.slug}
            as="li"
            className="flex"
            // Capped so a long grid never trails far behind the first card.
            delay={Math.min(index, 5) * 70}
          >
            <Card
              as="div"
              interactive
              className="group flex w-full flex-col overflow-hidden"
            >
              {/* A gold hairline that draws across the top on hover. The card
                  already lifts; this gives the lift somewhere to land. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0
                  bg-[linear-gradient(90deg,var(--color-gold-500),var(--color-purple-700))]
                  transition-transform duration-300 ease-[var(--ease-out-brand)]
                  group-hover:scale-x-100 group-focus-within:scale-x-100"
              />

              <span
                aria-hidden="true"
                className="flex size-12 items-center justify-center rounded-xl text-white
                  shadow-[0_6px_16px_-6px_rgba(86,39,117,0.6)]
                  bg-[linear-gradient(140deg,var(--color-purple-700),var(--color-purple-900))]
                  transition-transform duration-300 ease-[var(--ease-out-brand)]
                  group-hover:-rotate-3 group-hover:scale-105"
              >
                <Icon className="size-5" />
              </span>

              <h3 className="mt-5 text-h4 font-semibold text-ink-primary">
                <Link
                  href={service.href}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {service.name}
                </Link>
              </h3>

              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-secondary">
                {service.summary}
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-800">
                Learn More
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-250
                    ease-[var(--ease-out-brand)] group-hover:translate-x-1"
                />
              </span>
              </Card>
          </Reveal>
        );
      })}
    </ul>
  );
}
