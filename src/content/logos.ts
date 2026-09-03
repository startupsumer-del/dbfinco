/**
 * Third-party brand logos supplied by the business.
 *
 * Two things about the numbers here. `width`/`height` are the real intrinsic
 * pixels of the optimized asset, so next/image reserves the right box and
 * nothing shifts on load. `displayHeight` is separate and hand-set per logo,
 * because a single CSS height does not make these look balanced: a circular
 * mark at 40px reads far heavier than a five-times-wider wordmark at 40px.
 * The values below normalise apparent weight rather than measurement.
 *
 * Nothing here is recoloured, redrawn or restretched — each is the official
 * mark, trimmed of its surrounding empty canvas and scaled proportionally.
 * Originals are kept in `assets/logo-source/`, outside the served directory.
 */

export interface BrandLogo {
  slug: string;
  /** The brand's own name, used as the accessible label. */
  name: string;
  width: number;
  height: number;
  /** Rendered height in px, tuned so the row reads evenly. */
  displayHeight: number;
}

const logo = (
  slug: string,
  name: string,
  width: number,
  displayHeight: number,
): BrandLogo => ({ slug, name, width, height: 96, displayHeight });

/** Accounting and business platforms businesses commonly already run. */
export const platformLogos: BrandLogo[] = [
  logo("quickbooks", "QuickBooks", 480, 26),
  logo("xero", "Xero", 97, 44),
  logo("zoho-books", "Zoho Books", 276, 38),
  logo("gusto", "Gusto", 262, 30),
  logo("sage", "Sage", 257, 32),
];

/** Card networks a merchant's customers commonly pay with. */
export const cardNetworkLogos: BrandLogo[] = [
  logo("visa", "Visa", 305, 28),
  logo("mastercard", "Mastercard", 159, 34),
  logo("american-express", "American Express", 100, 48),
  logo("discover", "Discover", 556, 22),
];

/** Banks a merchant's settlement may be deposited with. */
export const bankLogos: BrandLogo[] = [
  logo("chase", "Chase", 115, 40),
  logo("bank-of-america", "Bank of America", 170, 38),
  logo("wells-fargo", "Wells Fargo", 192, 34),
  logo("citi", "Citi", 159, 32),
  logo("us-bank", "U.S. Bank", 364, 26),
];

export const logoSrc = (slug: string) => `/logos/${slug}.webp`;
