import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * "Why DB FinCo" — built from how the firm works rather than from statistics.
 * No client counts, ratings or awards appear anywhere on this site because
 * none have been verified.
 */
const reasons = [
  {
    title: "One team across the whole finance function",
    body: "Bookkeeping, accounting, tax and assurance sit with the same firm, so the tax return is prepared from books we helped keep and the audit request list does not arrive as a surprise.",
  },
  {
    title: "A named accountant, not a queue",
    body: "Your account is handled by people who work on it every month and know its history. Questions go to someone who already has the context.",
  },
  {
    title: "Dates you can plan around",
    body: "Close dates, reporting dates and filing dates are agreed at the start of the engagement and held. Predictability is most of the value.",
  },
  {
    title: "Plain explanations",
    body: "Statements are delivered with commentary in ordinary language. If something needs your attention we say what it is and what we suggest doing.",
  },
  {
    title: "Correct terminology, honestly used",
    body: "An audit, a review and agreed-upon procedures are different engagements. We tell you which one answers your question — including when it is the cheaper one.",
  },
  {
    title: "Scope agreed before work starts",
    body: "Engagements are defined in writing. If something emerges that changes the scope, we come back to you rather than expanding it quietly.",
  },
];

export function WhyDbFinco() {
  return (
    <Section tone="subtle" ariaLabelledBy="why-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <SectionHeading
            id="why-heading"
            eyebrow="Why DB FinCo"
            title="The difference is in how the work is run."
            lead="We would rather be judged on how an engagement actually feels month to month than on claims nobody can verify."
          />

          <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <li key={reason.title}>
                <p
                  aria-hidden="true"
                  className="text-sm font-bold tabular-nums text-gold-800"
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-h4 font-semibold text-ink-primary">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                  {reason.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
