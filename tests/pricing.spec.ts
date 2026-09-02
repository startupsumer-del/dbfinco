import { expect, test } from "@playwright/test";

import { pricingPlans } from "../src/content/pricing";

/**
 * The pricing figures are business facts, so these tests assert the exact
 * prices and inclusions rather than "a price is shown". They also hold the
 * two layout rules that are easy to break: the badge must not overlap the
 * plan name, and every CTA must reach the real contact route.
 */

test("pricing section renders all three plans with exact prices", async ({
  page,
}) => {
  await page.goto("/");

  const section = page.locator("#pricing");
  await expect(section).toBeVisible();
  await expect(section.getByRole("heading", { level: 2 })).toHaveText(
    "Plans Built for Business Growth",
  );

  for (const plan of pricingPlans) {
    const card = section.locator("li").filter({
      has: page.getByRole("heading", { name: plan.name, exact: true }),
    }).first();

    await expect(card).toBeVisible();
    await expect(card).toContainText(plan.price);
    await expect(card).toContainText(plan.period);
    await expect(card).toContainText(plan.packageLabel);

    for (const feature of plan.features) {
      await expect(card).toContainText(feature);
    }
  }
});

test("exactly one plan is highlighted, and its badge clears the plan name", async ({
  page,
}) => {
  await page.goto("/");
  const section = page.locator("#pricing");

  const badges = section.getByText("Most Popular", { exact: true });
  await expect(badges).toHaveCount(1);

  const badge = badges.first();
  const heading = section.getByRole("heading", {
    name: "Small Business",
    exact: true,
  });

  const badgeBox = await badge.boundingBox();
  const headingBox = await heading.boundingBox();
  expect(badgeBox).not.toBeNull();
  expect(headingBox).not.toBeNull();

  // The badge sits entirely above the plan name — no overlap at any width.
  expect(badgeBox!.y + badgeBox!.height).toBeLessThanOrEqual(headingBox!.y);
});

test("every plan CTA resolves to the real contact route", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const ctas = page.locator("#pricing").getByRole("link", { name: "Get Started" });

  await expect(ctas).toHaveCount(pricingPlans.length);

  for (let i = 0; i < pricingPlans.length; i += 1) {
    const href = await ctas.nth(i).getAttribute("href");
    expect(href).toBe("/contact");
  }

  const response = await request.get("/contact");
  expect(response.status()).toBe(200);
});

test("pricing has no billing toggle, and no fee or trial language", async ({
  page,
}) => {
  await page.goto("/");
  const text = (await page.locator("#pricing").innerText()).toLowerCase();

  for (const phrase of [
    "annually",
    "billed yearly",
    "free trial",
    "setup fee",
    "guarantee",
    "save 20",
  ]) {
    expect(text, `pricing must not mention "${phrase}"`).not.toContain(phrase);
  }
});

test("the pricing anchor is reachable from the header navigation", async ({
  page,
}) => {
  await page.goto("/about");

  const link = page
    .getByRole("navigation")
    .first()
    .getByRole("link", { name: "Pricing", exact: true });
  await expect(link).toHaveAttribute("href", "/#pricing");

  await link.click();
  await expect(page.locator("#pricing")).toBeVisible();
});

test("business hours appear nowhere in the public UI", async ({ page }) => {
  const routes = ["/", "/about", "/contact", "/services", "/merchant-services"];

  for (const route of routes) {
    await page.goto(route);
    const body = await page.locator("body").innerText();

    for (const phrase of [
      "Monday – Friday",
      "Monday - Friday",
      "Mon–Fri",
      "9:00 AM",
      "6:30 PM",
      "Business hours",
    ]) {
      expect(body, `${route} must not show "${phrase}"`).not.toContain(phrase);
    }
  }
});

test("opening hours are gone from the structured data", async ({ page }) => {
  await page.goto("/");

  const blocks = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();

  expect(blocks.length).toBeGreaterThan(0);
  for (const block of blocks) {
    expect(block).not.toContain("openingHours");
    expect(block).not.toContain("OpeningHoursSpecification");
  }
});
