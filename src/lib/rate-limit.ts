/**
 * A fixed-window rate limiter held in the process.
 *
 * What this is for: the contact route calls a paid third-party mail API on
 * every accepted submission. Without a limit, one script can run up a bill and
 * bury the real enquiries in the inbox it is meant to protect.
 *
 * What this is not: a distributed control. Serverless platforms run several
 * instances of a route and recycle them, so a caller spread across instances
 * gets a fresh allowance on each one, and every allowance resets on a cold
 * start. It raises the cost of casual abuse and nothing more.
 *
 * If the site starts attracting real abuse, move the counter to a shared store
 * — Vercel KV, Upstash, Redis — behind this same interface. Everything the
 * route needs is `check()`, so the swap touches one file.
 */

export interface RateLimitResult {
  allowed: boolean;
  /** Attempts left in the current window once this one is counted. */
  remaining: number;
  /** Seconds until the window resets. Sent as `Retry-After` on a refusal. */
  retryAfterSeconds: number;
}

interface Window {
  count: number;
  /** Epoch milliseconds at which this window expires. */
  expiresAt: number;
}

export interface RateLimitOptions {
  /** Attempts permitted per window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

/**
 * Creates a limiter. Each caller gets its own map, so two limiters with
 * different budgets never share counts.
 *
 * `now` is injectable so the behaviour at a window boundary can be tested
 * without waiting for real time to pass.
 */
export function createRateLimiter({ limit, windowMs }: RateLimitOptions) {
  const windows = new Map<string, Window>();

  /**
   * Drops expired windows. Called on each check, which is enough: the map only
   * grows while requests arrive, and every entry is removed one window after
   * its last use. Without this a long-lived instance would hold a key for
   * every address that ever submitted the form.
   */
  function prune(now: number): void {
    for (const [key, window] of windows) {
      if (window.expiresAt <= now) windows.delete(key);
    }
  }

  return {
    check(key: string, now: number = Date.now()): RateLimitResult {
      prune(now);

      const existing = windows.get(key);

      if (!existing || existing.expiresAt <= now) {
        windows.set(key, { count: 1, expiresAt: now + windowMs });
        return {
          allowed: true,
          remaining: limit - 1,
          retryAfterSeconds: Math.ceil(windowMs / 1000),
        };
      }

      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((existing.expiresAt - now) / 1000),
      );

      if (existing.count >= limit) {
        return { allowed: false, remaining: 0, retryAfterSeconds };
      }

      existing.count += 1;
      return {
        allowed: true,
        remaining: limit - existing.count,
        retryAfterSeconds,
      };
    },

    /** Test seam: forget every window. */
    reset(): void {
      windows.clear();
    },
  };
}

/**
 * The caller's address, as far as it can be known behind a proxy.
 *
 * `x-forwarded-for` is a client-settable header that the platform's proxy
 * overwrites — Vercel puts the real client first. Anything in front of an
 * untrusted proxy could forge it, which is another reason this limiter is a
 * speed bump rather than a control.
 *
 * When no address is available at all, every such request shares one bucket.
 * That is deliberate: an unattributable flood is exactly what should be
 * throttled together.
 */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  if (first) return first;

  return headers.get("x-real-ip")?.trim() || "unknown";
}
