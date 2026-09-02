/**
 * Homepage pricing packages.
 *
 * Prices and inclusions are exactly as supplied by the business. Nothing is
 * inferred: there are no setup fees, annual discounts, free trials or
 * guarantees here because none were provided, and only monthly prices exist,
 * so the section carries no billing-period toggle.
 */

export interface PricingPlan {
  /** Stable id, also used as the DOM id for the plan's heading. */
  id: string;
  name: string;
  /** The package label the business uses alongside the plan name. */
  packageLabel: string;
  price: string;
  period: string;
  features: string[];
  /** Exactly one plan carries this. */
  badge?: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "start-up",
    name: "Start Up",
    packageLabel: "Basic Package Service",
    price: "$349",
    period: "per month",
    features: [
      "Weekly Bookkeeping",
      "Custom Financial Reporting",
      "Monthly Reconciliation Report",
      "P&L and Balance Sheet Reports",
      "QuickBooks Setup & Management",
      "Sales Tax Filings",
    ],
  },
  {
    id: "small-business",
    name: "Small Business",
    packageLabel: "Pro Package Service",
    price: "$599",
    period: "per month",
    badge: "Most Popular",
    features: [
      "Weekly Bookkeeping",
      "Custom Financial Reporting",
      "Monthly Reconciliation Report",
      "P&L and Balance Sheet Reports",
      "Month-End Close by the 7th",
      "One-on-One Monthly Financial Zoom Call",
      "Dedicated Bookkeeping Experts",
      "Unlimited Client Support",
      "Federal & State Business Tax Filings",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    packageLabel: "Enterprise Package Service",
    price: "$799",
    period: "per month",
    features: [
      "Everything in the Small Business Package",
      "Business and Personal Tax Preparation",
      "IRS Tax Notice Resolution",
      "1099 Form Filing for Vendors",
    ],
  },
];

export const pricingCtaLabel = "Get Started";

/** Every plan CTA points at the real contact route. */
export const pricingCtaHref = "/contact";
