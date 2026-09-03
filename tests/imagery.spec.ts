import { expect, test } from "@playwright/test";

/**
 * The photographic portraits are decorative: every claim they echo is made in
 * real text next to them. These tests hold that contract, and check the
 * portraits actually decode rather than silently rendering as a broken box.
 */

const PORTRAIT_PAGES = [
  { path: "/", file: "advisor-explaining" },
  { path: "/about", file: "advisor-partner" },
  { path: "/contact", file: "advisor-consultant" },
] as const;

for (const { path, file } of PORTRAIT_PAGES) {
  test(`${path} renders its portrait, decoded and decorative`, async ({ page }) => {
    await page.goto(path);

    const portrait = page.locator(`img[src*="${file}"]`).first();
    await expect(portrait).toBeVisible();

    // Decorative: an empty alt keeps it out of the accessibility tree.
    await expect(portrait).toHaveAttribute("alt", "");

    // naturalWidth is 0 when the browser failed to decode the file.
    const decoded = await portrait.evaluate(
      (el) => (el as HTMLImageElement).naturalWidth,
    );
    expect(decoded, `${file} should decode`).toBeGreaterThan(0);
  });
}

test("every portrait asset is served", async ({ request }) => {
  const files = [
    "advisor-standing",
    "advisor-explaining",
    "advisor-partner",
    "advisor-manager",
    "advisor-consultant",
  ];

  for (const file of files) {
    const response = await request.get(`/imagery/${file}.webp`);
    expect(response.status(), `${file}.webp should be served`).toBe(200);
    expect(response.headers()["content-type"]).toContain("image");
  }
});

const BANNER_PAGES = [
  "/services",
  "/services/accounting",
  "/services/bookkeeping",
  "/services/tax",
  "/services/audit-assurance",
  "/services/audit-assurance/internal-audit",
  "/services/audit-assurance/agreed-upon-procedures",
  "/services/consulting",
  "/services/risk-advisory",
  "/services/analytics",
  "/merchant-services",
] as const;

/**
 * The /services index is a directory rather than a service page. Its banner
 * carries a portrait like the rest, but the assertions below are about a
 * service's own page, so it sits out.
 */
const SERVICE_PAGES = BANNER_PAGES.filter((p) => p !== "/services");

for (const path of SERVICE_PAGES) {
  test(`${path} opens with a portrait, not a scroll away from one`, async ({
    page,
  }) => {
    await page.goto(path);

    // In the banner: the portrait used to sit beside the process steps, about
    // three and a half screens down, which read as no imagery at all.
    const portrait = page.locator("section").first().locator('img[src*="advisor-"]');
    await expect(portrait).toHaveCount(1);
    await expect(portrait).toBeVisible();
    await expect(portrait).toHaveAttribute("alt", "");

    const top = await portrait.evaluate((el) => el.getBoundingClientRect().top);
    expect(top, "the portrait should be in the first viewport").toBeLessThan(900);
  });
}

test("every portrait supplied is used somewhere on the site", async ({
  page,
  request,
}) => {
  const files = [
    "advisor-standing", "advisor-explaining", "advisor-partner",
    "advisor-manager", "advisor-consultant", "advisor-principal",
    "advisor-lead", "advisor-associate", "advisor-analyst",
    "advisor-specialist", "advisor-adviser", "advisor-director",
    "advisor-manager-2",
  ];

  const routes = [
    "/", "/about", "/contact", "/merchant-services",
    "/services/accounting", "/services/bookkeeping", "/services/tax",
    "/services/audit-assurance", "/services/audit-assurance/external-audit",
    "/services/audit-assurance/internal-audit",
    "/services/audit-assurance/agreed-upon-procedures",
    "/services/consulting", "/services/risk-advisory", "/services/analytics",
  ];

  const found = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    for (const src of await page
      .locator('img[src*="advisor-"]')
      .evaluateAll((els) =>
        els.map((el) => decodeURIComponent(el.getAttribute("src") ?? "")),
      )) {
      const name = src.match(/advisor-[\w-]+/)?.[0];
      if (name) found.add(name);
    }
  }

  const unused = files.filter((f) => !found.has(f));
  expect(unused, "no supplied portrait should sit unused").toEqual([]);

  // And every one is actually served.
  for (const file of files) {
    const response = await request.get(`/imagery/${file}.webp`);
    expect(response.status(), `${file}.webp should be served`).toBe(200);
  }
});

const PORTRAIT_PAGES_WITH_CARDS = [
  "/",
  "/about",
  "/contact",
  "/services/accounting",
  "/services/analytics",
  "/services/tax",
  "/services/risk-advisory",
  "/services/audit-assurance",
  "/merchant-services",
] as const;

for (const path of PORTRAIT_PAGES_WITH_CARDS) {
  test(`${path} keeps its float cards clear of the face and hands`, async ({
    page,
  }) => {
    await page.goto(path);

    const boxes = await page.evaluate(() => {
      const results: { top: number; bottom: number }[] = [];
      for (const img of Array.from(
        document.querySelectorAll<HTMLImageElement>('img[src*="advisor-"]'),
      )) {
        const frame = img.parentElement;
        if (!frame) continue;
        const f = frame.getBoundingClientRect();
        if (f.height === 0) continue;
        for (const card of Array.from(
          frame.querySelectorAll<HTMLElement>(":scope > [data-float-card]"),
        )) {
          const c = card.getBoundingClientRect();
          if (c.height === 0) continue;
          results.push({
            top: ((c.top - f.top) / f.height) * 100,
            bottom: ((c.bottom - f.top) / f.height) * 100,
          });
        }
      }
      return results;
    });

    expect(boxes.length, `${path} should render at least one card`).toBeGreaterThan(0);

    for (const box of boxes) {
      // Head and shoulders occupy roughly the top 40% of every cut-out.
      expect(box.top, "a card must never start above the face").toBeGreaterThan(40);
      // Hands — crossed, gesturing or holding something — start around 62%.
      // The bottom edge is pinned there by construction, so the half-point of
      // slack is only for sub-pixel rounding of the percentage inset.
      expect(box.bottom, "a card must never reach the hands").toBeLessThan(62.5);
    }
  });
}

test("portraits declare a blur placeholder and a realistic size", async ({
  page,
}) => {
  await page.goto("/services/accounting");

  const img = page.locator('img[src*="advisor-"]').first();
  await img.scrollIntoViewIfNeeded();
  await expect(img).toBeVisible();

  const sizes = await img.getAttribute("sizes");
  expect(sizes, "each placement declares its real column width").toBeTruthy();

  // `src` is only the no-srcset fallback and always names the largest
  // candidate; `currentSrc` is what the browser actually fetched. A blanket
  // `sizes` had a 304px slot pulling the 1080px source.
  //
  // Poll for it: currentSrc is empty until the browser has picked a candidate,
  // which under load can be after the element is already visible.
  await expect
    .poll(
      async () => img.evaluate((el) => (el as HTMLImageElement).currentSrc),
      { message: "the browser should choose a source" },
    )
    .toContain("?");

  const chosen = await img.evaluate((el) => (el as HTMLImageElement).currentSrc);
  const width = Number(new URLSearchParams(chosen.split("?")[1]).get("w"));
  expect(width, `unexpected source: ${chosen}`).toBeGreaterThan(0);
  expect(width, "the fetched source should be sized to the slot").toBeLessThanOrEqual(640);
});

const HERO_ROUTES = [
  "/about",
  "/services",
  "/services/tax",
  "/services/audit-assurance/external-audit",
  "/merchant-services",
  "/contact",
  "/privacy",
] as const;

for (const path of HERO_ROUTES) {
  test(`${path} starts its hero close under the breadcrumb`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(path);

    const gap = await page.evaluate(() => {
      const crumb = document.querySelector('nav[aria-label="Breadcrumb"]');
      const h1 = document.querySelector("h1");
      if (!crumb || !h1) return null;
      const bottom = crumb.getBoundingClientRect().bottom;
      const eyebrow = Array.from(document.querySelectorAll("p"))
        .map((el) => ({ el, rect: el.getBoundingClientRect() }))
        .filter(
          (x) =>
            getComputedStyle(x.el).textTransform === "uppercase" &&
            x.rect.top >= bottom - 2 &&
            x.rect.bottom <= h1.getBoundingClientRect().top + 2,
        )
        .sort((a, b) => a.rect.top - b.rect.top)[0];
      return Math.round((eyebrow?.rect.top ?? h1.getBoundingClientRect().top) - bottom);
    });

    expect(gap).not.toBeNull();
    // Centring a short text column against a tall portrait used to push this
    // to 118-152px on desktop — the dead band the design brief flagged.
    expect(gap!, "breadcrumb should sit close to the hero content").toBeLessThan(56);
    expect(gap!, "but not collide with it").toBeGreaterThan(12);
  });
}

/**
 * A reporting panel must never sit on top of a person.
 *
 * The first version of the home hero floated the panel over the portrait and
 * it buried her behind it. The fix was structural — the two are separate grid
 * columns now — but nothing stopped a later absolute position from putting a
 * chart back over a face, so this measures it.
 *
 * Widths span the two-column and stacked arrangements, plus the point just
 * under the breakpoint where the columns are narrowest and any overlap would
 * appear first.
 */
const SURFACE_ROUTES = ["/"] as const;
const SURFACE_WIDTHS = [390, 640, 768, 1024, 1279, 1440, 1920] as const;

for (const path of SURFACE_ROUTES) {
  test(`${path} never lays a reporting surface over a portrait`, async ({
    page,
  }) => {
    for (const width of SURFACE_WIDTHS) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);

      const result = await page.evaluate(() => {
        const portraits = Array.from(
          document.querySelectorAll<HTMLImageElement>('img[src*="advisor-"]'),
        ).map((el) => el.getBoundingClientRect());
        const surfaces = Array.from(
          document.querySelectorAll<HTMLElement>("[data-finance-surface]"),
        ).map((el) => el.getBoundingClientRect());

        const hits: string[] = [];
        for (const p of portraits) {
          if (p.width === 0 || p.height === 0) continue;
          for (const s of surfaces) {
            if (s.width === 0 || s.height === 0) continue;
            const overlaps =
              p.right > s.left &&
              s.right > p.left &&
              p.bottom > s.top &&
              s.bottom > p.top;
            if (overlaps) {
              hits.push(
                `portrait ${Math.round(p.left)},${Math.round(p.top)} ` +
                  `${Math.round(p.width)}x${Math.round(p.height)} ` +
                  `vs surface ${Math.round(s.left)},${Math.round(s.top)} ` +
                  `${Math.round(s.width)}x${Math.round(s.height)}`,
              );
            }
          }
        }
        return { portraits: portraits.length, surfaces: surfaces.length, hits };
      });

      expect(result.portraits, `${path} at ${width}px should show a portrait`)
        .toBeGreaterThan(0);
      expect(
        result.surfaces,
        `${path} at ${width}px should show a reporting surface`,
      ).toBeGreaterThan(0);
      expect(
        result.hits,
        `at ${width}px a reporting surface covers a portrait`,
      ).toEqual([]);
    }
  });
}

/**
 * A hero's two columns must end at roughly the same place.
 *
 * The copy column on a service page runs about 330px; the portrait beside it
 * runs 520. Top-aligning them — which the breadcrumb spacing above requires —
 * left 160 to 190px of empty banner under the buttons on every one of these
 * pages. The fix was content rather than alignment (the deliverables strip),
 * and this is what stops the hole coming back the next time that strip moves.
 */
const TWO_COLUMN_HERO_ROUTES = [
  "/services/accounting",
  "/services/bookkeeping",
  "/services/tax",
  "/services/audit-assurance",
  "/services/audit-assurance/external-audit",
  "/services/consulting",
  "/services/risk-advisory",
  "/services/analytics",
  "/merchant-services",
] as const;

for (const path of TWO_COLUMN_HERO_ROUTES) {
  test(`${path} hero columns end at about the same height`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(path);

    const measured = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      const grid = h1?.closest("[class*='grid-cols']");
      if (!grid) return null;

      const columns = Array.from(grid.children)
        .map((el) => el.getBoundingClientRect())
        .filter((rect) => rect.height > 0);
      if (columns.length !== 2) return null;

      const [a, b] = columns as [DOMRect, DOMRect];
      return { difference: Math.round(Math.abs(a.height - b.height)) };
    });

    expect(measured, `${path} should lay its hero out in two columns`).not.toBeNull();
    expect(
      measured!.difference,
      "one hero column should not tower over the other",
    ).toBeLessThan(90);
  });
}
