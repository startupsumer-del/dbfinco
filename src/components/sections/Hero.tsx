import { ArrowRight, Phone } from "lucide-react";

import { HomeHeroVisual } from "@/components/sections/HomeHeroVisual";
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
 * composition with the portrait alongside.
 *
 * The entrance staggers in that same reading order. It moves position only —
 * a fade would hold the largest text on the page below full contrast and push
 * the LCP paint back for nothing anyone can see.
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

      <Container className="pb-12 pt-7 sm:pb-16 sm:pt-10 lg:pb-22 lg:pt-14">
        {/* Two columns at xl, not lg. The visual needs ~34rem before the
            panel beside the portrait stops squeezing, and at 1024 taking
            that much left the headline four narrow lines with the buttons
            wrapped underneath. Below xl the visual goes under the copy at
            its own comfortable width instead.

            Top-aligned, and the proof points moved out from under the copy to
            a full-width row below — with them in the column the copy ran
            180px taller than the visual, and neither alignment was right:
            top-aligning left a hole under the cards, centring left one above
            them. Taking them out makes the two columns almost the same
            height, so there is no hole to place. */}
        <div className="grid items-start gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,36rem)] xl:gap-16">
          <div>
            <Eyebrow className="db-lift mb-4">Financial &amp; Accounting Services</Eyebrow>

            <h1
              className="db-lift text-display-1 text-ink-primary"
              style={{ "--db-lift-delay": "70ms" } as React.CSSProperties}
            >
              Financial Clarity for{" "}
              <span className="text-gradient-gold">Every Stage</span> of Your
              Business
            </h1>

            <p
              className="db-lift measure mt-5 text-lead text-ink-secondary"
              style={{ "--db-lift-delay": "140ms" } as React.CSSProperties}
            >
              Accurate books, filings on time and reporting clear enough to act
              on — so you decide from numbers you trust.
            </p>

            <div
              className="db-lift mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ "--db-lift-delay": "210ms" } as React.CSSProperties}
            >
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
              className="db-lift mt-5 inline-flex min-h-11 items-center gap-2.5
                text-[0.9375rem] font-semibold text-ink-primary transition-colors
                hover:text-purple-800"
              style={{ "--db-lift-delay": "280ms" } as React.CSSProperties}
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
              </span>
            </a>

          </div>

          {/* Portrait plus the reporting it produces. Below xl it sits after
              the content in the flow, so a visitor reaches an action first. */}
          <div
            className="db-lift relative"
            style={{ "--db-lift-delay": "340ms" } as React.CSSProperties}
          >
            <HomeHeroVisual />
          </div>
        </div>

        {/* The proof points close the hero across its full width. Three short
            lines read better side by side than stacked down one column, and
            keeping them out of the grid is what lets both columns start and
            end at about the same place. */}
        <ul
          className="db-lift mt-10 grid gap-3 border-t border-line pt-7 sm:grid-cols-3
            sm:gap-x-8 lg:mt-12"
          style={{ "--db-lift-delay": "410ms" } as React.CSSProperties}
        >
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
      </Container>
    </section>
  );
}
