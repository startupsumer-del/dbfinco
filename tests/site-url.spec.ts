import { expect, test } from "@playwright/test";

import {
  DEFAULT_SITE_URL,
  readOptionalEnv,
  resolveOptionalUrl,
  resolveSiteUrl,
} from "../src/lib/env";

/**
 * Regression cover for the Vercel build failure: `metadataBase: new URL(site.url)`
 * threw `TypeError: Invalid URL` because the previous implementation used `??`,
 * which does not fall back on an empty string. Vercel supplies an empty string
 * for any variable added with a blank value.
 */

test.describe("resolveSiteUrl — treated as not configured", () => {
  for (const [label, value] of [
    ["undefined", undefined],
    ["empty string", ""],
    ["single space", " "],
    ["whitespace only", "   \t\n  "],
  ] as const) {
    test(`${label} falls back to the default`, () => {
      expect(resolveSiteUrl(value)).toBe(DEFAULT_SITE_URL);
    });
  }
});

test.describe("resolveSiteUrl — malformed values fall back, never throw", () => {
  for (const [label, value] of [
    ["bare hostname", "dbfinco.com"],
    ["missing scheme", "//dbfinco.com"],
    ["unsupported scheme", "ftp://dbfinco.com"],
    ["javascript scheme", "javascript:alert(1)"],
    ["file scheme", "file:///etc/passwd"],
    ["relative path", "/some/path"],
    ["nonsense", "not a url at all"],
  ] as const) {
    test(`${label} falls back to the default`, () => {
      expect(() => resolveSiteUrl(value)).not.toThrow();
      expect(resolveSiteUrl(value)).toBe(DEFAULT_SITE_URL);
    });
  }
});

test.describe("resolveSiteUrl — valid values are normalised", () => {
  for (const [input, expected] of [
    ["https://dbfinco.com", "https://dbfinco.com"],
    ["https://dbfinco.com/", "https://dbfinco.com"],
    ["https://dbfinco.com///", "https://dbfinco.com"],
    ["  https://dbfinco.com/  ", "https://dbfinco.com"],
    ["http://localhost:3000", "http://localhost:3000"],
    ["https://preview.vercel.app/", "https://preview.vercel.app"],
    ["https://dbfinco.com/?utm=x", "https://dbfinco.com"],
    ["https://dbfinco.com/#top", "https://dbfinco.com"],
    ["https://dbfinco.com/base/", "https://dbfinco.com/base"],
  ] as const) {
    test(`${JSON.stringify(input)} -> ${expected}`, () => {
      expect(resolveSiteUrl(input)).toBe(expected);
    });
  }
});

test("every resolved value is safe to pass to new URL()", () => {
  const inputs = [
    undefined, "", "   ", "dbfinco.com", "ftp://x", "not a url",
    "https://dbfinco.com/", "http://localhost:3000",
  ];
  for (const input of inputs) {
    const resolved = resolveSiteUrl(input);
    expect(() => new URL(resolved), `new URL(${JSON.stringify(resolved)})`).not.toThrow();
    // And the composition pattern used by lib/seo.ts absoluteUrl().
    expect(() => new URL("/contact", `${resolved}/`)).not.toThrow();
  }
});

test("resolved values never end in a trailing slash", () => {
  for (const input of ["https://dbfinco.com/", "https://x.com///", undefined, ""]) {
    expect(resolveSiteUrl(input).endsWith("/")).toBe(false);
  }
});

test.describe("readOptionalEnv", () => {
  test("blank-ish values become undefined", () => {
    for (const v of [undefined, "", " ", "\t", "\n", "  \t \n "]) {
      expect(readOptionalEnv(v)).toBeUndefined();
    }
  });
  test("real values are trimmed", () => {
    expect(readOptionalEnv("  hello  ")).toBe("hello");
    expect(readOptionalEnv("hello")).toBe("hello");
  });
});

test.describe("resolveOptionalUrl", () => {
  test("blank-ish values use the fallback", () => {
    for (const v of [undefined, "", "   "]) {
      expect(resolveOptionalUrl(v, "/contact", "TEST_VAR")).toBe("/contact");
    }
  });
  test("malformed values use the fallback without throwing", () => {
    for (const v of ["not a url", "ftp://x.com", "/relative"]) {
      expect(() => resolveOptionalUrl(v, "/contact", "TEST_VAR")).not.toThrow();
      expect(resolveOptionalUrl(v, "/contact", "TEST_VAR")).toBe("/contact");
    }
  });
  test("valid absolute URLs pass through", () => {
    expect(resolveOptionalUrl("https://cal.example.com/db", "/contact", "TEST_VAR"))
      .toBe("https://cal.example.com/db");
  });
});
