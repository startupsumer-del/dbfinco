import Link from "next/link";
import { ArrowRight, ChevronRight, CircleCheck, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { bookingUrl, site, telHref } from "@/config/site";
import type { ServiceDetail } from "@/types/content";
import type { Crumb } from "@/lib/seo";

/**
 * Shared structure for service pages.
 *
 * Every service supplies its own headline, problem framing, capabilities,
 * deliverables, process and FAQs, and can inject a bespoke visual into the
 * hero and an extra section below the deliverables — so the pages share a
 * spine without reading as the same page eight times.
 */
export function ServicePageTemplate({
  service,
  crumbs,
  heroVisual,
  deliverableVisual,
  extraSection,
  related,
}: {
  service: ServiceDetail;
  crumbs: Crumb[];
  /** Illustration shown inside the hero banner. */
  heroVisual?: ReactNode;
  /** Data-rich preview shown above the deliverables grid. */
  deliverableVisual?: ReactNode;
  extraSection?: ReactNode;
  related: ServiceDetail[];
}) {
  return (
    <>
      {/* Hero banner — branded ground, with the service's own illustration */}
      <section className="relative overflow-hidden bg-purple-900">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-44 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(201,154,84,0.20),transparent_68%)]" />
          <div className="absolute -bottom-48 -left-40 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(110,56,145,0.45),transparent_70%)]" />
        </div>

        <Container className="relative pb-14 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12">
          <Breadcrumbs crumbs={crumbs} tone="inverse" />

          <div
            className={
              heroVisual
                ? "mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center lg:gap-14"
                : "mt-8"
            }
          >
            <div className="min-w-0">
              <Eyebrow tone="inverse" className="mb-5">
                {service.eyebrow}
              </Eyebrow>
              <h1 className="text-display-2 text-white">{service.headline}</h1>
              <p className="measure mt-6 text-lead text-purple-100">
                {service.intro}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={bookingUrl} variant="gold" size="lg" fullWidth className="sm:w-auto">
                  Schedule a Free Consultation
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Button>
                <a
                  href={telHref}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-pill
                    border border-white/25 px-6 py-3.5 text-base font-semibold text-white
                    transition-colors hover:border-white/50 hover:bg-white/10"
                >
                  <Phone aria-hidden="true" className="size-4 text-gold-300" />
                  {site.contact.phoneDisplay}
                </a>
              </div>
            </div>

            {heroVisual ? (
              <div className="min-w-0 [&_svg]:drop-shadow-[0_18px_44px_rgba(12,4,20,0.45)]">
                {heroVisual}
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {/* Problem */}
      <Section tone="subtle" ariaLabelledBy="problem-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
            <SectionHeading
              id="problem-heading"
              eyebrow="The problem"
              title={service.problem.heading}
              lead={service.problem.body}
            />
            <ul className="space-y-4 self-center">
              {service.problem.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 rounded-lg border border-line bg-white p-4"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-600"
                  />
                  <span className="text-sm leading-relaxed text-ink-secondary">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Capabilities */}
      <Section tone="white" ariaLabelledBy="capabilities-heading">
        <Container>
          <SectionHeading
            id="capabilities-heading"
            eyebrow="What’s included"
            title={`What ${service.name.toLowerCase()} covers`}
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3">
            {service.features.map((feature) => (
              <Card key={feature.title} as="li" className="bg-surface-subtle">
                <h3 className="text-h4 font-semibold text-ink-primary">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                  {feature.description}
                </p>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Deliverables */}
      <Section tone="lilac" ariaLabelledBy="deliverables-heading">
        <Container>
          {deliverableVisual ? (
            <div className="mb-12 lg:mb-16">{deliverableVisual}</div>
          ) : null}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
            <SectionHeading
              id="deliverables-heading"
              eyebrow="What you receive"
              title="Exactly what gets handed over."
              lead="Engagements are defined by their outputs, so you can tell whether you are getting what you agreed."
            />
            <div className="grid gap-6 sm:grid-cols-2">
              {service.deliverables.map((group) => (
                <div
                  key={group.title}
                  className="rounded-xl border border-line bg-white p-6"
                >
                  <h3 className="text-eyebrow font-semibold uppercase text-gold-800">
                    {group.title}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                        <CircleCheck
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-success"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {extraSection}

      {/* Process */}
      <Section tone="white" ariaLabelledBy="process-heading">
        <Container>
          <SectionHeading
            id="process-heading"
            eyebrow="How it works"
            title={service.process.heading}
            lead={service.process.intro}
            align="center"
          />
          <ProcessSteps steps={service.process.steps} className="mt-14 lg:mt-16" />
        </Container>
      </Section>

      <FaqSection faqs={service.faqs} tone="subtle" />

      {/* Related services */}
      {related.length > 0 ? (
        <Section tone="white" size="compact" ariaLabelledBy="related-heading">
          <Container>
            <SectionHeading
              id="related-heading"
              eyebrow="Related services"
              title="Often needed alongside this."
              level={2}
            />
            <ServiceGrid services={related} className="mt-10" />
          </Container>
        </Section>
      ) : null}

      <CtaSection heading={service.cta.heading} body={service.cta.body} />
    </>
  );
}

/** Breadcrumb trail. The final crumb is the current page and is not a link. */
export function Breadcrumbs({
  crumbs,
  tone = "default",
}: {
  crumbs: Crumb[];
  tone?: "default" | "inverse";
}) {
  const inverse = tone === "inverse";
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs",
          inverse ? "text-purple-200" : "text-ink-muted",
        )}
      >
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight
                  aria-hidden="true"
                  className={cn("size-3.5", inverse ? "text-purple-400" : "text-line-strong")}
                />
              ) : null}
              {isLast ? (
                <span
                  aria-current="page"
                  className={cn("font-medium", inverse ? "text-white" : "text-ink-secondary")}
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className={cn(
                    "transition-colors",
                    inverse ? "hover:text-white" : "hover:text-purple-800",
                  )}
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
