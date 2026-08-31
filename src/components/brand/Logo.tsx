import { site } from "@/config/site";

/**
 * DB FinCo wordmark.
 *
 * Reconstructed as vector from the official DB FinCo logo: a gold-to-violet
 * "D", a deep violet "B", the gold-gradient "FINCO" wordmark, and the
 * letterspaced violet tagline beneath.
 *
 * `textLength` with `lengthAdjust="spacingAndGlyphs"` pins the geometry, so
 * the mark occupies exactly the same box whether or not the display webfont
 * has loaded. That removes any possibility of layout shift in the header.
 */

interface LogoProps {
  /** Rendered height in pixels; width follows the 480:140 aspect ratio. */
  height?: number;
  /** Drop the tagline — used in tight spots such as the mobile header. */
  withTagline?: boolean;
  /** Render in reversed (light-on-dark) colours. */
  inverse?: boolean;
  className?: string;
  /** Unique per instance so gradient ids never collide in one document. */
  idPrefix?: string;
}

export function Logo({
  height = 44,
  withTagline = true,
  inverse = false,
  className,
  idPrefix = "dbfinco-logo",
}: LogoProps) {
  // Geometry derived from measured Plus Jakarta Sans metrics at 88px:
  // "DB" is 122.2 units wide and "FINCO" 284.5, with a 14-unit gap between
  // them, so the wordmark spans x = 4 → 424.5. The tagline is sized to finish
  // at the same point, matching the lockup in the official logo.
  const viewBoxWidth = 430;
  const viewBoxHeight = withTagline ? 132 : 90;
  const width = Math.round((height * viewBoxWidth) / viewBoxHeight);

  const violet = inverse ? "#ffffff" : "#2a1747";
  const taglineFill = inverse ? "#d6c8ec" : "#2a1747";

  const gradD = `${idPrefix}-d`;
  const gradFinco = `${idPrefix}-finco`;

  return (
    <svg
      role="img"
      aria-label={`${site.name} — ${site.tagline}`}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      width={width}
      height={height}
      className={className}
      focusable="false"
    >
      <title>{`${site.name} — ${site.tagline}`}</title>
      <defs>
        <linearGradient id={gradD} gradientUnits="userSpaceOnUse" x1="4" y1="0" x2="67" y2="0">
          <stop offset="0%" stopColor={inverse ? "#f3e2ba" : "#c8992f"} />
          <stop offset="40%" stopColor={inverse ? "#e0bc63" : "#a87c22"} />
          <stop offset="100%" stopColor={inverse ? "#ffffff" : "#2a1747"} />
        </linearGradient>
        <linearGradient
          id={gradFinco}
          gradientUnits="userSpaceOnUse"
          x1="140"
          y1="0"
          x2="425"
          y2="0"
        >
          <stop offset="0%" stopColor={inverse ? "#c0912e" : "#a87c22"} />
          <stop offset="45%" stopColor={inverse ? "#e0bc63" : "#c8992f"} />
          <stop offset="100%" stopColor={inverse ? "#f3e2ba" : "#e6c476"} />
        </linearGradient>
      </defs>

      {/* Wordmark. Glyphs flow at their natural widths — no textLength — so
          the letterforms are never stretched or compressed. */}
      <text
        y="76"
        fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
        fontSize="88"
        fontWeight="800"
        letterSpacing="-0.02em"
      >
        <tspan x="4" fill={`url(#${gradD})`}>
          D
        </tspan>
        <tspan fill={violet}>B</tspan>
      </text>

      <text
        y="76"
        fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
        fontSize="88"
        fontWeight="700"
        letterSpacing="-0.005em"
      >
        <tspan x="140" fill={`url(#${gradFinco})`}>
          FINCO
        </tspan>
      </text>

      {withTagline ? (
        <text
          y="118"
          fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
          fontSize="21"
          fontWeight="400"
          letterSpacing="0.09em"
          fill={taglineFill}
        >
          <tspan x="5">FINANCIAL ACCOUNTING SERVICES</tspan>
        </text>
      ) : null}
    </svg>
  );
}

/**
 * Square "DB" monogram, drawn as paths so it renders identically without any
 * webfont. Used for the favicon, app icons and compact placements.
 */
export function LogoMark({
  size = 40,
  className,
  idPrefix = "dbfinco-mark",
}: {
  size?: number;
  className?: string;
  idPrefix?: string;
}) {
  const grad = `${idPrefix}-grad`;
  return (
    <svg
      role="img"
      aria-label={site.name}
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      focusable="false"
    >
      <title>{site.name}</title>
      <defs>
        <linearGradient id={grad} gradientUnits="userSpaceOnUse" x1="8" y1="12" x2="30" y2="52">
          <stop offset="0%" stopColor="#e0bc63" />
          <stop offset="55%" stopColor="#c0912e" />
          <stop offset="100%" stopColor="#a87c22" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#2a1747" />
      {/* D */}
      <path
        d="M12 17h10.2c8.9 0 14.6 5.7 14.6 15s-5.7 15-14.6 15H12V17Zm9.9 23.4c4.7 0 7.6-3.1 7.6-8.4s-2.9-8.4-7.6-8.4h-2.6v16.8h2.6Z"
        fill={`url(#${grad})`}
      />
      {/* B */}
      <path
        d="M38.4 17h11.1c5.6 0 8.9 2.7 8.9 7.3 0 2.9-1.5 5.1-4 6.1 3.1.9 4.9 3.3 4.9 6.7 0 5.2-3.6 8.2-9.7 8.2H38.4V17Zm10.2 11.7c2 0 3.2-1 3.2-2.7s-1.2-2.7-3.2-2.7h-3.5v5.4h3.5Zm.6 12c2.2 0 3.5-1.1 3.5-3s-1.3-3-3.5-3h-4.1v6h4.1Z"
        fill="#ffffff"
      />
    </svg>
  );
}
