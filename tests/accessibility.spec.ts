import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

import { ROUTES } from "./routes";

/**
 * Automated accessibility checks against WCAG 2.1/2.2 A and AA rules.
 * Automation cannot cover everything, but any violation it does find is
 * treated as a release blocker.
 */
for (const route of ROUTES) {
  test(`no accessibility violations on ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "load" });

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const summary = results.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.map((node) => node.target.join(" ")),
    }));

    expect(JSON.stringify(summary, null, 2)).toBe("[]");
  });
}

test("mobile drawer is accessible while open", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeVisible();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(JSON.stringify(results.violations.map((v) => v.id))).toBe("[]");
});

test("services mega-menu is accessible while open", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Services" }).click();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(JSON.stringify(results.violations.map((v) => v.id))).toBe("[]");
});

test("contact form errors are accessible", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /Send message/ }).click();
  await expect(page.getByText("Please enter your full name.")).toBeVisible();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  expect(JSON.stringify(results.violations.map((v) => v.id))).toBe("[]");
});
