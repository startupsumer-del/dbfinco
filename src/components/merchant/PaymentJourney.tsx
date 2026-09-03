import { Banknote, BookOpenCheck, CreditCard } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { ILLUSTRATIVE_NOTE } from "@/content/demo-financials";

/**
 * What actually happens between a customer paying and the money being
 * accounted for.
 *
 * The middle step is the important one to state plainly: the payment provider
 * the business holds its account with runs the authorisation and the payout.
 * DB FinCo's work is the third step. Writing the sequence out this way is
 * both the clearest explanation and the honest one — nothing here implies the
 * firm processes, acquires or settles anything.
 *
 * The figures are the same illustrative sale followed through the three
 * stages, so the numbers tie: a $186.00 sale, $180.60 after the provider's
 * fee, recorded as both.
 */
const steps = [
  {
    icon: CreditCard,
    step: "Your customer pays",
    body: "At a counter, through a hosted checkout, from a payment link or by bank transfer.",
    figure: { label: "Sale", value: "$186.00", note: "Card present · approved" },
  },
  {
    icon: Banknote,
    step: "Your provider settles",
    body: "The payment provider you hold the account with authorises the payment and pays out a batch, net of its fees.",
    figure: { label: "Deposit", value: "$180.60", note: "Batch 4821 · net of $5.40 fee" },
  },
  {
    icon: BookOpenCheck,
    step: "It lands in your books",
    body: "We match the deposit back to the sale and the fee, so revenue is stated gross and the cost of acceptance is visible.",
    figure: { label: "Recorded", value: "$186.00", note: "Revenue $186.00 · fees $5.40" },
  },
] as const;

export function PaymentJourney() {
  return (
    <div>
      <ol className="grid gap-4 md:grid-cols-3 md:gap-5">
        {steps.map(({ icon: Icon, step, body, figure }, index) => (
          <Reveal
            key={step}
            as="li"
            delay={index * 90}
            className="relative flex flex-col rounded-xl border border-line bg-white p-5 shadow-sm sm:p-6"
          >
            {/* Connector between cards. Decorative, and only drawn where the
                cards actually sit in a row. */}
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 items-center
                  justify-center rounded-full border border-line bg-white text-line-strong md:flex"
              >
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none">
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            ) : null}

            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-700"
              >
                <Icon className="size-5" />
              </span>
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                Step {index + 1}
              </span>
            </div>

            <h3 className="mt-4 text-h4 text-ink-primary">{step}</h3>
            <p className="mt-2 flex-1 text-sm text-ink-secondary">{body}</p>

            <div className="mt-5 rounded-lg border border-line bg-surface-subtle px-4 py-3">
              <p className="text-[0.6875rem] text-ink-muted">{figure.label}</p>
              <p className="mt-0.5 text-lg font-bold tabular-nums text-ink-primary">
                {figure.value}
              </p>
              <p className="mt-1 text-[0.6875rem] text-ink-muted">{figure.note}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <p className="mt-4 text-xs text-ink-muted">{ILLUSTRATIVE_NOTE}</p>
    </div>
  );
}
