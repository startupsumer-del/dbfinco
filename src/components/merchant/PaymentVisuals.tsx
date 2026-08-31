import { ILLUSTRATIVE_NOTE } from "@/content/demo-financials";

/**
 * Original payment visuals.
 *
 * Everything here is drawn from scratch. No card-network marks, bank
 * branding or processor logos are used anywhere, because DB FinCo has no
 * confirmed relationship with any of them and displaying their marks would
 * imply one.
 */

/** A generic, unbranded payment card. Deliberately carries no network mark. */
export function PaymentCard({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative aspect-[1.586/1] w-full max-w-[19rem] overflow-hidden rounded-xl
        bg-[linear-gradient(135deg,var(--color-purple-900),var(--color-purple-700)_58%,var(--color-purple-800))]
        p-5 shadow-xl sm:p-6 ${className ?? ""}`}
    >
      <div className="absolute -right-10 -top-16 size-48 rounded-full bg-[radial-gradient(circle,rgba(224,188,99,0.28),transparent_66%)]" />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-purple-200">
            Business
          </span>
          {/* Contactless indicator */}
          <svg viewBox="0 0 24 24" className="size-6 text-gold-300" fill="none">
            <path
              d="M8.5 8.5a5 5 0 0 1 0 7M11.5 5.5a9 9 0 0 1 0 13M5.5 11a1.4 1.4 0 0 1 0 2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div>
          {/* Chip */}
          <div className="mb-4 h-7 w-10 rounded-[5px] bg-[linear-gradient(135deg,var(--color-gold-300),var(--color-gold-600))]" />
          <p className="font-mono text-[0.9375rem] tracking-[0.14em] text-white sm:text-base">
            •••• •••• •••• 4271
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <span className="text-[0.6875rem] uppercase tracking-[0.12em] text-purple-200">
            Valid thru 09/29
          </span>
          <span className="text-xs font-semibold text-gold-300">DB FinCo</span>
        </div>
      </div>
    </div>
  );
}

/** Countertop payment terminal showing an approved sale. */
export function PaymentTerminal({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto w-full max-w-[15rem] ${className ?? ""}`}
    >
      <div className="rounded-2xl border border-line bg-white p-3 shadow-xl">
        {/* Screen */}
        <div className="rounded-xl bg-purple-950 p-4 text-center">
          <p className="text-[0.625rem] uppercase tracking-[0.12em] text-purple-300">
            Amount due
          </p>
          <p className="mt-1.5 text-2xl font-bold tabular-nums text-white">
            $248.00
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-pill bg-success/20 px-2.5 py-1">
            <span className="size-1.5 rounded-full bg-success" />
            <span className="text-[0.625rem] font-semibold text-white">Approved</span>
          </div>
        </div>

        {/* Keypad */}
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((key) => (
            <span
              key={key}
              className="flex h-7 items-center justify-center rounded-md bg-surface-muted
                text-[0.625rem] font-semibold text-ink-secondary"
            >
              {key}
            </span>
          ))}
        </div>

        {/* Card slot */}
        <div className="mt-3 h-1.5 rounded-full bg-surface-muted" />
      </div>
    </div>
  );
}

/** Settlement reconciliation panel: gross sales, fees, net deposit. */
export function SettlementPanel({ className }: { className?: string }) {
  const rows = [
    { label: "Gross card sales", value: "$42,918.60", tone: "normal" as const },
    { label: "Refunds", value: "−$1,204.00", tone: "negative" as const },
    { label: "Chargebacks", value: "−$318.40", tone: "negative" as const },
    { label: "Processing fees", value: "−$1,186.72", tone: "negative" as const },
  ];

  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-white shadow-md ${className ?? ""}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-subtle px-5 py-3.5">
        <p className="text-sm font-semibold text-ink-primary">
          Settlement reconciliation
        </p>
        <p className="text-xs text-ink-muted">Month to date</p>
      </div>

      <ul className="divide-y divide-line">
        {rows.map((row) => (
          <li
            key={row.label}
            className="flex items-center justify-between gap-4 px-5 py-3.5"
          >
            <span className="text-sm text-ink-secondary">{row.label}</span>
            <span
              className={`shrink-0 text-sm font-semibold tabular-nums ${
                row.tone === "negative" ? "text-warning" : "text-ink-primary"
              }`}
            >
              {row.value}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-4 border-t-2 border-line-strong bg-surface-subtle px-5 py-4">
        <span className="text-sm font-semibold text-ink-primary">
          Net deposited to bank
        </span>
        <span className="shrink-0 text-h4 font-bold tabular-nums text-success">
          $40,209.48
        </span>
      </div>

      <p className="border-t border-line bg-white px-5 py-2.5 text-[0.6875rem] text-ink-muted">
        {ILLUSTRATIVE_NOTE}
      </p>
    </div>
  );
}

/** Hosted checkout mock used in the online payments section. */
export function CheckoutVisual({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden rounded-xl border border-line bg-white shadow-md ${className ?? ""}`}
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface-muted px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="ml-2 truncate rounded-md bg-white px-2.5 py-1 text-[0.625rem] text-ink-muted">
          Secure checkout
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm text-ink-secondary">Order total</span>
          <span className="text-h4 font-bold tabular-nums text-ink-primary">
            $186.00
          </span>
        </div>

        <div className="space-y-2.5">
          <div className="h-10 rounded-lg border border-line bg-surface-subtle" />
          <div className="grid grid-cols-2 gap-2.5">
            <div className="h-10 rounded-lg border border-line bg-surface-subtle" />
            <div className="h-10 rounded-lg border border-line bg-surface-subtle" />
          </div>
        </div>

        <div className="flex h-11 items-center justify-center rounded-pill bg-purple-800 text-sm font-semibold text-white">
          Pay $186.00
        </div>

        <p className="text-center text-[0.625rem] text-ink-muted">
          Payments are processed by your payment provider
        </p>
      </div>
    </div>
  );
}
