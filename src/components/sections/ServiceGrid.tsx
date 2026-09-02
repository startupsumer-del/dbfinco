import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <Card key={service.slug} as="li" interactive className="flex flex-col">
            <span
              aria-hidden="true"
              className="flex size-11 items-center justify-center rounded-lg border
                border-purple-100 bg-purple-50 text-purple-700"
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
              <ArrowRight aria-hidden="true" className="size-4" />
            </span>
          </Card>
        );
      })}
    </ul>
  );
}
