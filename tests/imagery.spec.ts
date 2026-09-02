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
