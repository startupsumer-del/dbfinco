import { expect, test } from "@playwright/test";

/**
 * The photographic portraits and the service illustrations are decorative:
 * every claim they echo is made in real text next to them. These tests hold
 * that contract, and check the portraits actually decode rather than
 * silently rendering as a broken box.
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

for (const path of BANNER_PAGES) {
  test(`${path} banner carries an illustration hidden from assistive tech`, async ({
    page,
  }) => {
    await page.goto(path);

    const banner = page.locator("section").first();
    const scene = banner.locator("svg[viewBox='0 0 400 280']").first();

    await expect(scene).toBeVisible();
    await expect(scene).toHaveAttribute("aria-hidden", "true");

    // No lettering inside the artwork: nothing there can become unreadable.
    expect(await scene.locator("text").count()).toBe(0);
  });
}

test("service illustrations differ from one another", async ({ page }) => {
  const markup = new Set<string>();

  for (const path of BANNER_PAGES) {
    await page.goto(path);
    const scene = page
      .locator("section")
      .first()
      .locator("svg[viewBox='0 0 400 280']")
      .first();
    markup.add(await scene.innerHTML());
  }

  expect(
    markup.size,
    "each service banner should carry its own illustration",
  ).toBe(BANNER_PAGES.length);
});

const PORTRAIT_PAGES_WITH_CARDS = [
  "/",
  "/about",
  "/contact",
  "/services/accounting",
  "/services/analytics",
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
