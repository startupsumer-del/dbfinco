"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { RefObject } from "react";

import { servicesMenu } from "@/config/navigation";

/**
 * Desktop Services mega-menu panel.
 *
 * Rendered inside the header's relative wrapper and constrained to the page
 * container, so it can never push the document wider than the viewport.
 */
export function ServicesMegaMenu({
  id,
  onNavigate,
  panelRef,
}: {
  id: string;
  onNavigate: () => void;
  panelRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={panelRef}
      id={id}
      className="absolute inset-x-0 top-full z-40 hidden lg:block"
    >
      <div className="container-page pb-6">
        <div
          className="animate-[db-rise_220ms_var(--ease-out-brand)_both] overflow-hidden
            rounded-2xl border border-line bg-white shadow-xl"
        >
          <div className="grid gap-x-8 gap-y-8 p-7 xl:grid-cols-4 lg:grid-cols-2 xl:p-9">
            {servicesMenu.map((column) => (
              <div key={column.heading}>
                <p className="text-eyebrow mb-4 font-semibold uppercase text-gold-800">
                  {column.heading}
                </p>
                <ul className="space-y-1">
                  {column.items.map((service) => {
                    const Icon = service.icon;
                    return (
                      <li key={service.slug}>
                        <Link
                          href={service.href}
                          onClick={onNavigate}
                          className="group flex gap-3 rounded-lg p-2.5 transition-colors
                            duration-200 hover:bg-purple-50 focus-visible:bg-purple-50"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-0.5 flex size-8 shrink-0 items-center justify-center
                              rounded-md border border-purple-100 bg-purple-50 text-purple-700
                              transition-colors duration-200 group-hover:border-gold-200
                              group-hover:bg-gold-50 group-hover:text-gold-800"
                          >
                            <Icon className="size-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-ink-primary">
                              {service.name}
                            </span>
                            <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">
                              {service.summary}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="flex flex-wrap items-center justify-between gap-4 border-t border-line
              bg-surface-subtle px-7 py-4 xl:px-9"
          >
            <p className="text-sm text-ink-secondary">
              Not sure which service fits? We&apos;ll help you work it out.
            </p>
            <Link
              href="/services"
              onClick={onNavigate}
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold
                text-purple-800 transition-colors hover:text-purple-950"
            >
              View all services
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
