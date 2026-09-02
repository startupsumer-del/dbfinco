import { Check } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  pricingCtaHref,
  pricingCtaLabel,
  pricingPlans,
} from "@/content/pricing";
import { cn } from "@/lib/cn";

/**
 * Homepage pricing.
 *
 * Three monthly packages, no billing toggle — only monthly prices exist.
 *
 * Two layout details are deliberate:
 *
 *  - The "Most Popular" badge sits in the normal flow rather than absolutely
 *    positioned, so it can never overlap the plan name. Cards without a badge
 *    render an empty row of the same height, which keeps every plan name,
 *    price and divider on the same baseline across the row.
 *  - The feature list takes the remaining height, so the CTA sits on the
 *    bottom edge of all three cards even though the lists differ in length.
 *    Nothing is scaled down to force that.
 */
export function PricingSection() {
  return (
    <Section tone="subtle" id="pricing" ariaLabelledBy="pricing-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="pricing-heading"
            eyebrow="Transparent Pricing"
            title="Plans Built for Business Growth"
            lead="Three monthly packages covering bookkeeping, reporting and filing — each one scoped and agreed with you before any work begins."
            align="center"
          />
        </Reveal>

        <ul className="mt-10 grid items-stretch gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-7">
          {pricingPlans.map((plan, index) => {
            const featured = Boolean(plan.badge);
            return (
              <Reveal key={plan.id} as="li" className="flex" delay={index * 70}>
                <div
                  className={cn(
                    "flex w-full flex-col rounded-2xl bg-white p-6 sm:p-7 lg:p-8",
                    // Both borders are 2px so the plan names, prices and
                    // dividers sit on the same baseline across the row.
                    featured
                      ? "border-2 border-purple-800 shadow-xl"
                      : "border-2 border-line shadow-sm",
                  )}
                >
                  {/* The badge sits in the flow, so it can never overlap the
                      plan name. Cards without one reserve the same height —
                      but only from lg, where the three sit side by side and
                      the baselines have to match. Stacked on mobile that
                      reserved row would just be a gap. */}
                  {plan.badge ? (
                    <p className="mb-5 flex min-h-7 items-center">
                      <span
                        className="inline-flex items-center rounded-pill bg-purple-900 px-3 py-1.5
                          text-eyebrow font-semibold uppercase text-gold-300"
                      >
                        {plan.badge}
                      </span>
                    </p>
                  ) : (
                    <p aria-hidden="true" className="mb-5 hidden min-h-7 lg:block" />
                  )}

                  <h3
                    id={`plan-${plan.id}`}
                    className="text-h3 font-semibold text-ink-primary"
                  >
                    {plan.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-gold-800">
                    {plan.packageLabel}
                  </p>

                  <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
                    <span className="text-display-2 font-bold tabular-nums text-ink-primary">
                      {plan.price}
                    </span>
                    <span className="text-sm text-ink-muted">{plan.period}</span>
                  </p>

                  <Button
                    href={pricingCtaHref}
                    variant={featured ? "primary" : "secondary"}
                    size="lg"
                    fullWidth
                    className="mt-7"
                    aria-describedby={`plan-${plan.id}`}
                  >
                    {pricingCtaLabel}
                  </Button>

                  <hr className="mt-8 border-line" />

                  <ul className="mt-6 flex-1 space-y-3.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-secondary"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-success"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-ink-muted">
          Work outside these packages — catch-up bookkeeping, assurance
          engagements, advisory projects — is scoped and quoted separately.
        </p>
      </Container>
    </Section>
  );
}
