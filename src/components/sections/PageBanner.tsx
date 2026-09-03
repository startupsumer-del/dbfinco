import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/sections/ServicePageTemplate";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Crumb } from "@/lib/seo";

/**
 * Branded page banner.
 *
 * The same deep-purple band that opens every service page, so listing pages
 * and service pages share one masthead treatment. The illustration is
 * decorative; the heading and lead carry the meaning.
 */
export function PageBanner({
  crumbs,
  eyebrow,
  title,
  lead,
  visual,
  actions,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead?: string;
  visual?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-purple-900">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-44 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(201,154,84,0.20),transparent_68%)]" />
        <div className="absolute -bottom-48 -left-40 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(110,56,145,0.45),transparent_70%)]" />
      </div>

      <Container className="relative pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-22 lg:pt-12">
        <Breadcrumbs crumbs={crumbs} tone="inverse" />

        <div
          className={
            visual
              ? "mt-7 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start lg:gap-14"
              : "mt-8 max-w-3xl"
          }
        >
          <div className="min-w-0">
            <Eyebrow tone="inverse" className="mb-4">
              {eyebrow}
            </Eyebrow>
            <h1 className="text-display-2 text-white">{title}</h1>
            {lead ? (
              <p className="measure mt-5 text-lead text-purple-100">{lead}</p>
            ) : null}
            {actions ? <div className="mt-9">{actions}</div> : null}
          </div>

          {visual ? (
            <div className="min-w-0 [&_svg]:drop-shadow-[0_18px_44px_rgba(12,4,20,0.45)]">
              {visual}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
