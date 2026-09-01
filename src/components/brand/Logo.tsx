import { site } from "@/config/site";

/**
 * DB FinCo logo.
 *
 * These are the official DB FinCo marks, vectorised from the artwork supplied
 * by the owner (kept at `public/brand/source/`). The supplied file was a
 * 482×166 bitmap wrapped in a PDF, with JPEG compression artefacts and an
 * opaque near-white background; the vector versions here are traced from it,
 * denoised, and have a genuinely transparent background, so they stay crisp
 * at any size and sit correctly on both light and dark grounds.
 *
 * The marks are referenced as static files rather than inlined, so the ~50 KB
 * of path data is fetched and cached once instead of being embedded in the
 * HTML of every page. Explicit width and height reserve the box, so the logo
 * can never cause layout shift while it loads.
 */

/** Intrinsic dimensions of each asset, used to derive the rendered box. */
const ASSETS = {
  full: { src: "/brand/dbfinco-logo.svg", w: 443, h: 123 },
  fullInverse: { src: "/brand/dbfinco-logo-inverse.svg", w: 443, h: 123 },
  wordmark: { src: "/brand/dbfinco-wordmark.svg", w: 441, h: 84 },
  wordmarkInverse: { src: "/brand/dbfinco-wordmark-inverse.svg", w: 441, h: 84 },
} as const;

/** Preload target for the header logo, so it paints without a round-trip wait. */
export const HEADER_LOGO_SRC = ASSETS.full.src;
export const HEADER_WORDMARK_SRC = ASSETS.wordmark.src;

interface LogoProps {
  /** Rendered height in pixels; width follows the artwork's aspect ratio. */
  height?: number;
  /** Include the "Financial Accounting Services" tagline beneath the wordmark. */
  withTagline?: boolean;
  /** Use the light-on-dark artwork, for violet grounds. */
  inverse?: boolean;
  className?: string;
  /** Set on the header logo so it is fetched at high priority. */
  priority?: boolean;
}

export function Logo({
  height = 44,
  withTagline = true,
  inverse = false,
  className,
  priority = false,
}: LogoProps) {
  const asset = withTagline
    ? inverse
      ? ASSETS.fullInverse
      : ASSETS.full
    : inverse
      ? ASSETS.wordmarkInverse
      : ASSETS.wordmark;

  const width = Math.round((height * asset.w) / asset.h);

  return (
    /* SVG artwork needs no raster optimisation, and next/image would require
       relaxing the SVG security policy for no benefit here. */
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset.src}
      alt={`${site.name} — ${site.tagline}`}
      width={width}
      height={height}
      className={className}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      loading={priority ? "eager" : "lazy"}
    />
  );
}

/**
 * Square "DB" monogram on the brand violet, used for the favicon, app icons
 * and any compact placement where the full wordmark would be illegible.
 */
export function LogoMark({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/dbfinco-mark.svg"
      alt={site.name}
      width={size}
      height={size}
      className={className}
      decoding="async"
      loading="lazy"
    />
  );
}
