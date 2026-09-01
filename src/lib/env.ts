/**
 * Environment-variable helpers.
 *
 * Every environment variable this project reads is documented as optional in
 * `.env.example`, and the site must build and run with none of them set. That
 * contract is easy to break with `??`, which only falls back on `null` and
 * `undefined` — an empty string passes straight through it. Vercel supplies an
 * empty string for any variable added with a blank value, so
 * `process.env.X ?? fallback` silently yields `""` and the fallback never runs.
 *
 * These helpers treat missing, empty and whitespace-only values as identical:
 * all of them mean "not configured".
 */

/** The origin used whenever `NEXT_PUBLIC_SITE_URL` is not usefully configured. */
export const DEFAULT_SITE_URL = "https://dbfinco.com";

/**
 * Normalises a raw environment value.
 *
 * @returns the trimmed value, or `undefined` when the variable is missing,
 * empty, or contains only whitespace.
 */
export function readOptionalEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/** Emits a build-time warning. Server-side only, so browsers stay quiet. */
function warn(message: string): void {
  if (typeof window === "undefined") {
    console.warn(`[db-finco] ${message}`);
  }
}

/**
 * Resolves the public site origin.
 *
 * Guarantees a valid absolute `http(s)` URL, so callers such as
 * `new URL(site.url)` in `metadataBase` can never receive an empty or
 * malformed string. A non-empty but unusable value is reported and replaced
 * rather than being allowed to fail the build.
 *
 * Normalisation drops any query string, fragment and redundant trailing
 * slash, so every consumer composes URLs from the same canonical origin.
 */
export function resolveSiteUrl(value: string | undefined): string {
  const raw = readOptionalEnv(value);

  // Missing, empty or whitespace-only: not configured, use the default.
  if (!raw) return DEFAULT_SITE_URL;

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    warn(
      `NEXT_PUBLIC_SITE_URL is set to ${JSON.stringify(raw)}, which is not a ` +
        `valid absolute URL. Falling back to ${DEFAULT_SITE_URL}. ` +
        `Set it to an absolute origin such as https://example.com.`,
    );
    return DEFAULT_SITE_URL;
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    warn(
      `NEXT_PUBLIC_SITE_URL uses the "${parsed.protocol}" scheme, which is ` +
        `not supported. Falling back to ${DEFAULT_SITE_URL}. ` +
        `Use http:// or https://.`,
    );
    return DEFAULT_SITE_URL;
  }

  // Compose from the parsed parts so the result is always canonical:
  // origin + path, without a trailing slash, query or fragment.
  const path = parsed.pathname.replace(/\/+$/, "");
  return `${parsed.origin}${path}`;
}

/**
 * Resolves an optional absolute URL, such as an external booking link.
 *
 * Falls back to an in-app route when the variable is not configured or is not
 * a usable absolute `http(s)` URL, so a CTA can never render a dead link.
 */
export function resolveOptionalUrl(
  value: string | undefined,
  fallback: string,
  name: string,
): string {
  const raw = readOptionalEnv(value);
  if (!raw) return fallback;

  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      warn(
        `${name} uses the "${parsed.protocol}" scheme, which is not ` +
          `supported. Falling back to ${fallback}.`,
      );
      return fallback;
    }
    return parsed.toString();
  } catch {
    warn(
      `${name} is set to ${JSON.stringify(raw)}, which is not a valid ` +
        `absolute URL. Falling back to ${fallback}.`,
    );
    return fallback;
  }
}
