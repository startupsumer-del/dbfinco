/**
 * Illustrative figures used by the reporting visuals across the site.
 *
 * These are demonstration values for a fictional business, included to show
 * the shape and clarity of DB FinCo reporting. They are not client data and
 * they are not DB FinCo's own results. Every surface that renders them is
 * labelled as an illustrative example.
 */

export const ILLUSTRATIVE_NOTE =
  "Illustrative example. Figures shown are for demonstration only.";

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const revenueSeries = [
  268_000, 281_500, 274_000, 302_800, 318_400, 331_200, 322_900, 349_600,
  368_200, 381_500, 402_300, 428_700,
];

export const expenseSeries = [
  201_400, 209_800, 214_600, 221_300, 229_700, 236_100, 241_800, 248_400,
  257_900, 263_200, 272_600, 284_100,
];

export const cashBalanceSeries = [
  412_000, 431_600, 424_900, 458_300, 486_700, 512_400, 508_900, 547_200,
  586_400, 618_900, 662_500, 714_800,
];

export interface ExpenseCategory {
  label: string;
  amount: number;
  colorVar: string;
}

export const expenseBreakdown: ExpenseCategory[] = [
  { label: "Payroll & benefits", amount: 1_284_600, colorVar: "var(--color-viz-1)" },
  { label: "Software & tools", amount: 486_200, colorVar: "var(--color-viz-2)" },
  { label: "Contractors", amount: 371_400, colorVar: "var(--color-viz-3)" },
  { label: "Facilities", amount: 248_900, colorVar: "var(--color-viz-4)" },
  { label: "Marketing", amount: 196_300, colorVar: "var(--color-viz-5)" },
  { label: "Other operating", amount: 194_500, colorVar: "var(--color-viz-6)" },
];

export const totalExpenses = expenseBreakdown.reduce(
  (sum, category) => sum + category.amount,
  0,
);

/** Rolling 12-month roll-ups used by the KPI tiles. */
export const kpis = {
  revenue: revenueSeries.reduce((a, b) => a + b, 0),
  expenses: expenseSeries.reduce((a, b) => a + b, 0),
  get netIncome() {
    return this.revenue - this.expenses;
  },
  cashBalance: cashBalanceSeries[cashBalanceSeries.length - 1] ?? 0,
  accountsReceivable: 268_400,
  accountsPayable: 147_900,
};

export const grossMarginSeries = [
  58.2, 58.9, 57.4, 59.6, 60.1, 60.8, 59.7, 61.4, 62.0, 62.6, 63.1, 63.8,
];

/** Budget versus actual for the most recent quarter. */
export const budgetVsActual = [
  { label: "Revenue", budget: 1_180_000, actual: 1_212_500 },
  { label: "Cost of sales", budget: 452_000, actual: 441_800 },
  { label: "Operating costs", budget: 386_000, actual: 398_400 },
  { label: "Net income", budget: 342_000, actual: 372_300 },
];

/**
 * Accounts receivable by age. Aging buckets are the standard way this is
 * read, so the visual is a bar per bucket rather than a trend.
 */
export const arAging = [
  { label: "Current", amount: 148_200 },
  { label: "1–30", amount: 71_900 },
  { label: "31–60", amount: 29_400 },
  { label: "61–90", amount: 12_600 },
  { label: "90+", amount: 6_300 },
];

/**
 * Six months of projection following the actuals above. Kept visually
 * distinct from actuals wherever it is charted — a forecast presented as
 * though it were history is the one thing a finance visual must not do.
 */
export const forecastMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] as const;

export const forecastSeries = [
  441_000, 452_800, 468_100, 479_400, 496_200, 512_700,
];

/** How a merchant's customers actually paid, over the last month. */
export const paymentMethodMix = [
  { label: "Card present", share: 38, colorVar: "var(--color-viz-1)" },
  { label: "Online checkout", share: 31, colorVar: "var(--color-viz-2)" },
  { label: "ACH / bank transfer", share: 19, colorVar: "var(--color-viz-3)" },
  { label: "Payment links", share: 12, colorVar: "var(--color-viz-4)" },
];

/** Daily processed volume across the last fortnight. */
export const paymentVolumeSeries = [
  4_820, 5_140, 4_390, 6_210, 7_480, 8_120, 5_960, 5_310, 6_040, 6_880, 7_240,
  8_640, 9_120, 7_530,
];

export const merchantKpis = {
  todaysSales: 7_530,
  transactions: 148,
  get averageTransaction() {
    return Math.round(this.todaysSales / this.transactions);
  },
  settledThisMonth: 168_940,
};
