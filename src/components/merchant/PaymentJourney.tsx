import Image from "next/image";
import { Banknote, CreditCard, Landmark, Link2, Lock, Wallet } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { ILLUSTRATIVE_NOTE } from "@/content/demo-financials";
import {
  bankLogos,
  cardNetworkLogos,
  logoSrc,
  type BrandLogo,
} from "@/content/logos";

/**
 * What actually happens between a customer paying and the money being
 * accounted for.
 *
 * The middle step is the important one to state plainly: the payment provider
 * the business holds its account with runs the authorisation and the payout.
 * DB FinCo's work is the third step. Writing the sequence out this way is
 * both the clearest explanation and the honest one — nothing here implies the
 * firm processes, acquires or settles anything, and no mark shown implies a
 * partnership.
 *
 * The figures are the same illustrative sale followed through the three
 * stages, so the numbers tie: a $186.00 sale, $180.60 after the provider's
 * fee, recorded as both.
 */

const methods = [
  { icon: CreditCard, label: "Card", detail: "Visa, Mastercard, Discover, Amex" },
  { icon: Wallet, label: "Digital wallet", detail: "Apple Pay, Google Pay and more" },
  { icon: Landmark, label: "Bank transfer", detail: "ACH from any major bank" },
  { icon: Link2, label: "Payment link", detail: "Pay from a link you send" },
] as const;

/** The checkout a customer sees, drawn from scratch. */
function MethodPicker() {
  return (
    <div
      aria-hidden="true"
      className="rounded-xl border border-line bg-surface-subtle p-3"
    >
      <p className="px-1 pb-2 text-[0.6875rem] font-semibold text-ink-muted">
        Choose a payment method
      </p>
      <ul className="space-y-1.5">
        {methods.map(({ icon: Icon, label, detail }, index) => (
          <li
            key={label}
            data-chart-anim=""
            className="flex items-center gap-2.5 rounded-lg border border-line bg-white px-2.5 py-2
              [animation:db-rise_420ms_var(--ease-out-brand)_both]"
            style={{ animationDelay: `${180 + index * 90}ms` }}
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-purple-50 text-purple-700">
              <Icon className="size-3.5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[0.75rem] font-semibold leading-tight text-ink-primary">
                {label}
              </span>
              <span className="block truncate text-[0.625rem] leading-tight text-ink-muted">
                {detail}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A row of brand marks at the size they belong in a step card. */
function MarkRow({ logos, columns }: { logos: BrandLogo[]; columns: string }) {
  return (
    <ul className={`grid gap-2 ${columns}`}>
      {logos.map((logo, index) => (
        <li
          key={logo.slug}
          data-chart-anim=""
          className="flex min-h-[2.75rem] items-center justify-center rounded-lg border
            border-line bg-white px-2 py-2 [animation:db-rise_380ms_var(--ease-out-brand)_both]"
          style={{ animationDelay: `${220 + index * 70}ms` }}
        >
          <Image
            src={logoSrc(logo.slug)}
            alt={logo.name}
            width={logo.width}
            height={logo.height}
            style={{ height: Math.round(logo.displayHeight * 0.62), width: "auto" }}
            className="w-auto max-w-full object-contain"
            sizes="120px"
          />
        </li>
      ))}
    </ul>
  );
}

/** The three lines the deposit is broken back into. */
function ReconciliationLedger() {
  const rows = [
    { label: "Gross sale", value: "$186.00", tone: "text-ink-primary" },
    { label: "Processing fee", value: "−$5.40", tone: "text-warning" },
    { label: "Net deposit", value: "$180.60", tone: "text-ink-primary" },
  ] as const;

  return (
    <dl className="mt-3 rounded-lg border border-line bg-surface-subtle px-3.5 py-2.5">
      {rows.map((row, index) => (
        <div
          key={row.label}
          data-chart-anim=""
          className={`flex items-baseline justify-between gap-3 py-1
            [animation:db-rise_380ms_var(--ease-out-brand)_both]
            ${index === rows.length - 1 ? "mt-1 border-t border-line pt-2" : ""}`}
          style={{ animationDelay: `${640 + index * 90}ms` }}
        >
          <dt className="text-xs text-ink-secondary">{row.label}</dt>
          <dd className={`text-xs font-semibold tabular-nums ${row.tone}`}>
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** The moment the money lands. */
function PaymentReceived() {
  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3.5 shadow-sm
        [animation:db-rise_460ms_var(--ease-out-brand)_both]"
      data-chart-anim=""
      style={{ animationDelay: "420ms" }}
    >
      <span
        aria-hidden="true"
        className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e6f2ec]"
      >
        <svg viewBox="0 0 24 24" className="size-5 text-success" fill="none">
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            data-chart-anim=""
            className="[animation:db-draw_520ms_var(--ease-out-brand)_both_560ms]"
            style={{ strokeDasharray: 30, "--db-draw-length": 30 } as React.CSSProperties}
          />
        </svg>
      </span>
      <span className="min-w-0">
        <span className="block text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-ink-primary">
          Payment received
        </span>
        <span className="block text-xs text-ink-secondary">
          Funds credited to your account
        </span>
      </span>
    </div>
  );
}

const steps = [
  {
    step: "Your customer pays",
    body: "At a counter, through a hosted checkout, from a payment link or by bank transfer.",
    figure: { label: "Sale", value: "$186.00", note: "Card present · approved" },
  },
  {
    step: "Your provider settles",
    body: "The payment provider you hold the account with authorises the payment and pays out a batch, net of its fees.",
    figure: { label: "Deposit", value: "$180.60", note: "Batch 4821 · net of $5.40 fee" },
  },
  {
    step: "It lands in your books",
    body: "We match the deposit back to the sale and the fee, so revenue is stated gross and the cost of acceptance is visible.",
    figure: { label: "Recorded", value: "$186.00", note: "Revenue $186.00 · fees $5.40" },
  },
] as const;

export function PaymentJourney() {
  return (
    <div>
      <ol className="grid gap-4 md:grid-cols-3 md:gap-5">
        {steps.map(({ step, body, figure }, index) => (
          <Reveal
            key={step}
            as="li"
            delay={index * 110}
            className="relative flex flex-col rounded-xl border border-line bg-white p-5 shadow-sm sm:p-6"
          >
            {/* Connector between cards. Decorative, and only drawn where the
                cards actually sit in a row. */}
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute -right-3.5 top-1/2 hidden size-7 -translate-y-1/2 items-center
                  justify-center rounded-full bg-purple-700 text-white shadow-sm md:flex"
              >
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none">
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            ) : null}

            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full
                  bg-gold-500 text-[0.8125rem] font-bold text-purple-900"
              >
                {index + 1}
              </span>
              <h3 className="text-h4 text-ink-primary">{step}</h3>
            </div>

            <p className="mt-3 text-sm text-ink-secondary">{body}</p>

            {/* Each step shows the thing it is actually about: the choice, the
                institutions settlement runs through, the money landing. */}
            <div className="mt-5">
              {index === 0 ? <MethodPicker /> : null}
              {index === 1 ? (
                <>
                  {/* Four here, on an even 2x2. The page's own bank section
                      below shows the full set — a fifth tile in this card
                      hangs alone on a third row and unbalances the sequence. */}
                  <MarkRow logos={bankLogos.slice(0, 4)} columns="grid-cols-2" />
                  <p
                    className="mt-2 flex items-start gap-2 rounded-lg bg-purple-50 px-3 py-2.5
                      text-[0.6875rem] leading-snug text-purple-900"
                  >
                    <Lock aria-hidden="true" className="mt-px size-3.5 shrink-0 text-purple-700" />
                    Card details stay with your provider, under the security
                    standards it is certified to. We never handle them.
                  </p>
                </>
              ) : null}
              {index === 2 ? (
                <>
                  <PaymentReceived />
                  <ReconciliationLedger />
                </>
              ) : null}
            </div>

            <div className="mt-4 flex items-end justify-between gap-3 rounded-lg border border-line bg-surface-subtle px-4 py-3">
              <span>
                <span className="block text-[0.6875rem] text-ink-muted">
                  {figure.label}
                </span>
                <span className="mt-0.5 block text-lg font-bold tabular-nums text-ink-primary">
                  {figure.value}
                </span>
              </span>
              <Banknote aria-hidden="true" className="size-4 shrink-0 text-line-strong" />
            </div>
            <p className="mt-2 text-[0.6875rem] text-ink-muted">{figure.note}</p>
          </Reveal>
        ))}
      </ol>

      {/* The card networks a customer chooses between, under the sequence
          rather than inside step one, where four more tiles would bury the
          picker they belong to. */}
      <Reveal className="mt-5 rounded-xl border border-line bg-white p-5 shadow-sm" delay={330}>
        <p className="text-eyebrow font-semibold uppercase text-gold-800">
          Cards your customers carry
        </p>
        <MarkRow logos={cardNetworkLogos} columns="mt-4 grid-cols-2 sm:grid-cols-4" />
      </Reveal>

      <p className="mt-4 text-xs text-ink-muted">
        {ILLUSTRATIVE_NOTE} Card network and bank marks indicate commonly
        supported payment and settlement options; they do not imply a
        partnership with, or endorsement by, those organisations.
      </p>
    </div>
  );
}
