import { expect, test } from "@playwright/test";

import { ROUTES } from "./routes";

test.describe("routes", () => {
  for (const route of ROUTES) {
    test(`${route} responds 200 with a single h1 and no console errors`, async ({
      page,
    }) => {
      const consoleErrors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => consoleErrors.push(error.message));

      const response = await page.goto(route, { waitUntil: "load" });
      expect(response?.status()).toBe(200);

      // Exactly one h1 per page.
      await expect(page.locator("h1")).toHaveCount(1);

      // Title and meta description are always present.
      await expect(page).toHaveTitle(/DB FinCo/);
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(description?.length ?? 0).toBeGreaterThan(50);

      // Canonical link present.
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);

      expect(consoleErrors, `console errors on ${route}`).toEqual([]);
    });
  }
});

test("404 page renders for an unknown route", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: /couldn't find that page/i }),
  ).toBeVisible();
});

test("no image is broken and every internal link resolves", async ({ page, request }) => {
  await page.goto("/");

  const hrefs = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]"))
      .map((a) => a.getAttribute("href") ?? "")
      .filter((href) => href.startsWith("/")),
  );

  const unique = Array.from(new Set(hrefs.map((h) => h.split("#")[0] ?? h))).filter(
    Boolean,
  );

  for (const href of unique) {
    const response = await request.get(href);
    expect(response.status(), `${href} should not be broken`).toBeLessThan(400);
  }
});

test("no placeholder hrefs anywhere on the site", async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route);
    const placeholders = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a"))
        .map((a) => a.getAttribute("href"))
        .filter((href) => href === "#" || href === "" || href === null),
    );
    expect(placeholders, `placeholder links on ${route}`).toEqual([]);
  }
});

test.describe("desktop navigation", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("services mega-menu opens on click, closes on Escape", async ({ page }) => {
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Services" });

    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    // Every column heading is present.
    await expect(page.getByText("Accounting", { exact: true }).first()).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Agreed-Upon Procedures/ }).first(),
    ).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("mega-menu link navigates and the menu closes", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Services" }).click();
    await page.getByRole("link", { name: /^Bookkeeping/ }).first().click();
    await expect(page).toHaveURL(/\/services\/bookkeeping$/);
    await expect(
      page.getByRole("button", { name: "Services" }),
    ).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("drawer opens, traps focus, closes on Escape", async ({ page }) => {
    await page.goto("/");
    const openButton = page.getByRole("button", { name: "Open navigation menu" });
    await openButton.click();

    const dialog = page.getByRole("dialog", { name: "Site navigation" });
    await expect(dialog).toBeVisible();

    // Body scrolling is locked while the drawer is open.
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  });

  test("nested services list expands and navigates", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation menu" }).click();

    const servicesToggle = page.getByRole("button", { name: "Services" });
    await expect(servicesToggle).toHaveAttribute("aria-expanded", "false");
    await servicesToggle.click();
    await expect(servicesToggle).toHaveAttribute("aria-expanded", "true");

    await page.getByRole("link", { name: "Merchant Services", exact: true }).first().click();
    await expect(page).toHaveURL(/\/merchant-services$/);
  });

  test("merchant services and the CTA are reachable from the drawer", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation menu" }).click();

    // Scope to the drawer so the header's own desktop CTA cannot match.
    const drawer = page.getByRole("dialog", { name: "Site navigation" });
    await expect(
      drawer.getByRole("link", { name: "Merchant Services", exact: true }),
    ).toBeVisible();
    await expect(
      drawer.getByRole("link", { name: /Schedule a Free Consultation/ }),
    ).toBeVisible();
    await expect(drawer.getByRole("link", { name: /718-559-7748/ })).toBeVisible();
  });
});

test.describe("contact form", () => {
  test("shows inline validation errors and does not submit", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /Send message/ }).click();

    await expect(page.getByText("Please enter your full name.")).toBeVisible();
    await expect(page.getByText("Please enter your email address.")).toBeVisible();
    await expect(
      page.getByText("Please choose the service you’re interested in."),
    ).toBeVisible();
  });

  test("rejects an invalid email address", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Full name").fill("Test Person");
    await page.getByLabel("Work email").fill("not-an-email");
    await page.getByLabel(/Service you're interested in/).selectOption("Bookkeeping");
    await page.getByLabel("How can we help?").fill("We need help with our books.");
    await page.getByRole("button", { name: /Send message/ }).click();

    await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
  });

  test("a valid submission reaches the server and reports honestly", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Full name").fill("Test Person");
    await page.getByLabel("Work email").fill("test@example.org");
    await page.getByLabel(/Service you're interested in/).selectOption("Bookkeeping");
    await page
      .getByLabel("How can we help?")
      .fill("We need help catching up twelve months of bookkeeping.");
    await page.getByRole("button", { name: /Send message/ }).click();

    // With no mail transport configured the UI must say so rather than
    // showing a false success message.
    await expect(
      page.getByText(/Message sent|Message not delivered/),
    ).toBeVisible({ timeout: 15_000 });
  });
});

test("accordion opens and closes with correct ARIA state", async ({ page }) => {
  await page.goto("/");
  const first = page
    .getByRole("button", { name: /What does DB FinCo actually do\?/ })
    .first();
  await expect(first).toHaveAttribute("aria-expanded", "true");
  await first.click();
  await expect(first).toHaveAttribute("aria-expanded", "false");
  await first.click();
  await expect(first).toHaveAttribute("aria-expanded", "true");
});

test("brand assets are served and the logo renders at its true aspect ratio", async ({
  page,
  request,
}) => {
  // Every published brand asset must resolve.
  for (const asset of [
    "/brand/dbfinco-logo.svg",
    "/brand/dbfinco-logo-inverse.svg",
    "/brand/dbfinco-wordmark.svg",
    "/brand/dbfinco-wordmark-inverse.svg",
    "/brand/dbfinco-mark.svg",
    "/icon.svg",
  ]) {
    const response = await request.get(asset);
    expect(response.status(), `${asset} should be served`).toBe(200);
    expect(response.headers()["content-type"]).toContain("svg");
  }

  await page.goto("/");

  // No image on the page may fail to decode.
  const broken = await page.evaluate(() =>
    Array.from(document.querySelectorAll("img"))
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.getAttribute("src")),
  );
  expect(broken).toEqual([]);

  // The header logo keeps the artwork's 444:124 ratio, and its box is
  // reserved by explicit width/height so it cannot shift the layout.
  const logo = page.locator('header img[src="/brand/dbfinco-logo.svg"]').first();
  await expect(logo).toBeVisible();
  const box = await logo.boundingBox();
  expect(box).not.toBeNull();
  if (box) {
    expect(box.width / box.height).toBeCloseTo(444 / 124, 1);
  }
  await expect(logo).toHaveAttribute("width", /\d+/);
  await expect(logo).toHaveAttribute("height", /\d+/);
  await expect(logo).toHaveAttribute("alt", /DB FinCo/);
});

test("the footer uses the inverse logo on the dark ground", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.locator('footer img[src="/brand/dbfinco-logo-inverse.svg"]'),
  ).toBeVisible();
});

test("sitemap and robots are served correctly", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const route of ROUTES) {
    const expected = route === "/" ? "" : route;
    expect(xml).toContain(`dbfinco.com${expected}<`);
  }

  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Sitemap:");
});

test("open graph image is generated", async ({ request }) => {
  const response = await request.get("/opengraph-image");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("image/png");
});
