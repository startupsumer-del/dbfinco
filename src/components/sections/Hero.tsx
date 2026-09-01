import { ArrowRight, Phone } from "lucide-react";

import { ReportingPreview } from "@/components/charts/ReportingPreview";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { bookingUrl, site, telHref } from "@/config/site";

const heroPoints = [
  "Accounting, bookkeeping and tax under one roof",
  "Reporting delivered on a schedule you can plan around",
  "A named accountant who knows your business",
];

/**
 * Home hero.
 *
 * Mobile order is deliberate: headline, supporting copy, primary CTA,
 * phone, proof points, then the reporting visual — so the visitor reaches an
 * action before any decoration. Desktop switches to a two-column editorial
 * composition with the reporting panel alongside.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Brand wash. Purely decorative, absolutely positioned, and clipped by
          the section, so it can never create horizontal overflow. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -right-40 -top-56 size-[38rem] rounded-full bg-[radial-gradient(circle,var(--color-purple-50),transparent_66%)]" />
        <div className="absolute -left-52 top-40 size-[30rem] rounded-full bg-[radial-gradient(circle,var(--color-gold-50),transparent_68%)]" />
      </div>

      <Container className="pb-16 pt-7 sm:pb-20 sm:pt-10 lg:pb-28 lg:pt-14">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-14 xl:gap-20">
          <div>
            <Eyebrow className="mb-6">Financial &amp; Accounting Services</Eyebrow>

            <h1 className="text-display-1 text-ink-primary">
              Financial clarity for{" "}
              <span className="text-gradient-gold">every stage</span> of your
              business.
            </h1>

            <p className="measure mt-6 text-lead text-ink-secondary">
              DB FinCo keeps the books accurate, the filings on time and the
              reporting clear enough to act on — so you can make decisions from
              numbers you trust rather than numbers you hope are right.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={bookingUrl} size="lg" fullWidth className="sm:w-auto">
                Schedule a Free Consultation
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
              <Button href="/services" variant="secondary" size="lg" fullWidth className="sm:w-auto">
                Explore Services
              </Button>
            </div>

            <a
              href={telHref}
              className="mt-6 inline-flex min-h-11 items-center gap-2.5 text-[0.9375rem]
                font-semibold text-ink-primary transition-colors hover:text-purple-800"
            >
              <span
                aria-hidden="true"
                className="flex size-9 items-center justify-center rounded-full bg-purple-50 text-purple-700"
              >
                <Phone className="size-4" />
              </span>
              <span>
                <span className="sr-only">Call DB FinCo on </span>
                {site.contact.phoneDisplay}
                <span className="ml-2 font-normal text-ink-muted">
                  {site.contact.hours.days}
                </span>
              </span>
            </a>

            <ul className="mt-10 grid gap-3 border-t border-line pt-8 sm:grid-cols-1">
              {heroPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-ink-secondary">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-600"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Reporting panel. Below lg it sits after the content in the flow. */}
          <div className="relative">
            <ReportingPreview />
          </div>
        </div>
      </Container>
    </section>
  );
}
