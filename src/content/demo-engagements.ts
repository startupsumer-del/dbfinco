/**
 * Illustrative engagement figures — counts of work done rather than money.
 *
 * These sit apart from `demo-financials` deliberately: nothing here is a
 * client's money, and nothing here is DB FinCo's own record. They exist so a
 * service page can *show* the shape of the work — how many transactions a
 * month of bookkeeping actually moves, what an audit's phases look like part
 * way through — instead of describing it in another paragraph.
 *
 * Every surface that renders them carries the illustrative note, exactly as
 * the financial figures do.
 */

/** Transactions categorised and reconciled, by month. */
export const bookkeepingMonths = [
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const transactionsByMonth = [1_180, 1_264, 1_209, 1_347, 1_402, 1_538];

export const closeChecklist = [
  { label: "Bank and card accounts reconciled", percent: 100, detail: "12 of 12" },
  { label: "Accounts payable matched to bills", percent: 100, detail: "Complete" },
  { label: "Accruals and prepayments posted", percent: 100, detail: "Complete" },
  { label: "Review and sign-off", percent: 100, detail: "Complete" },
];

/** Returns and filings prepared, by quarter of the year. */
export const filingQuarters = ["Q1", "Q2", "Q3", "Q4"] as const;

export const filingsByQuarter = [9, 6, 6, 11];

export const filingMix = [
  { label: "Sales tax", amount: 12, colorVar: "var(--color-viz-1)" },
  { label: "Payroll-related", amount: 8, colorVar: "var(--color-viz-2)" },
  { label: "Federal and state income", amount: 6, colorVar: "var(--color-viz-3)" },
  { label: "Information returns", amount: 6, colorVar: "var(--color-viz-4)" },
];

/** Where an assurance engagement stands, phase by phase. */
export const auditPhases = [
  { label: "Planning and risk assessment", percent: 100, detail: "Complete" },
  { label: "Controls walkthroughs", percent: 100, detail: "Complete" },
  { label: "Substantive testing", percent: 72, detail: "72%" },
  { label: "Completion and reporting", percent: 15, detail: "15%" },
];

/** Open risks on a register, counted by severity. */
export const risksBySeverity = [
  { label: "Critical", count: 2 },
  { label: "High", count: 6 },
  { label: "Medium", count: 14 },
  { label: "Low", count: 21 },
];

/** How those risks are being handled. */
export const riskTreatment = [
  { label: "Controls in place", amount: 27, colorVar: "var(--color-viz-1)" },
  { label: "Remediation under way", amount: 11, colorVar: "var(--color-viz-2)" },
  { label: "Accepted and monitored", amount: 5, colorVar: "var(--color-viz-3)" },
];
