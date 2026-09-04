import { expect, test } from "@playwright/test";

import { ROUTES } from "./routes";

/**
 * The reporting visuals show figures for a business that does not exist.
 *
 * That is fine — it is how you show what a report looks like without using a
 * client's numbers — but only while every surface carrying those figures says
 * so on the page, and while a projection is never presented as a result.
 * These tests hold both.
 */

const NOTE = "Illustrative example";

test("every page showing demo figures says they are illustrative", async ({
  page,
}) => {
  const seen: string[] = [];

  for (const route of ROUTES) {
    await page.goto(route);

    const surfaces = await page.locator("[data-finance-surface]").count();
    if (surfaces === 0) continue;

    seen.push(route);
    await expect(
      page.getByText(NOTE).first(),
      `${route} shows reporting figures without the illustrative note`,
    ).toBeVisible();
  }

  // If the selector ever stops matching, the loop above would pass by
  // checking nothing at all.
  expect(seen.length, "some pages should carry reporting surfaces").toBeGreaterThan(0);
});

test("the forecast is labelled as an estimate, not a result", async ({ page }) => {
  await page.goto("/services/analytics");

  const chart = page.getByRole("img", {
    name: /twelve months actual followed by six months projected/i,
  });
  await chart.scrollIntoViewIfNeeded();
  await expect(chart).toBeVisible();

  // Visible on the page, not only inside the SVG caption — so the exact
  // wording of the note under the panel, which the caption does not repeat.
  await expect(
    page.getByText("Projected months are an estimate, not results.", {
      exact: false,
    }),
  ).toBeVisible();
});

test("the payment journey names the provider as the party that settles", async ({
  page,
}) => {
  await page.goto("/merchant-services");

  await expect(
    page.getByRole("heading", { name: "Your customer pays" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Your provider settles" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "It lands in your books" }),
  ).toBeVisible();
  // The authorisation and the payout belong to the provider, and the page has
  // to keep saying so.
  await expect(
    page.getByText(/provider you hold the account with authorises the payment/i),
  ).toBeVisible();

  // Brand marks appear in the sequence now, so the caveat that goes with them
  // has to appear with it — not only in the logo section further down.
  await expect(
    page.getByText(/do not imply a partnership with, or endorsement by/i),
  ).toBeVisible();

  // And the security line must keep attributing the certification to the
  // provider rather than to DB FinCo.
  await expect(
    page.getByText(/Card details stay with your provider/i),
  ).toBeVisible();
});
