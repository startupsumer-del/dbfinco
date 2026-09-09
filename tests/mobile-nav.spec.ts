import { expect, test } from "@playwright/test";

import { servicesMenu } from "../src/config/navigation";

/**
 * Geometry, not just the accessibility tree.
 *
 * The drawer used to render inside the header, which carries `backdrop-blur`.
 * An element with a backdrop-filter forms the containing block for its
 * `position: fixed` descendants, so the drawer's `inset-0` sized it to the
 * 64px header instead of the viewport and clipped away every service link.
 * Every query-based test still passed, because the links were present and
 * reachable in the DOM — they were simply not on screen. These tests assert
 * where things actually are.
 */

test.use({ viewport: { width: 390, height: 844 } });

async function openDrawer(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.getByRole("button", { name: /menu|navigation/i }).first().click();
  await page.waitForTimeout(400);
}

test("the drawer fills the viewport rather than the header", async ({ page }) => {
  await openDrawer(page);

  const box = await page.getByRole("dialog").boundingBox();
  expect(box).not.toBeNull();

  const viewport = page.viewportSize()!;
  expect(box!.height).toBeGreaterThan(viewport.height * 0.9);
  expect(box!.width).toBeGreaterThan(viewport.width * 0.5);
});

test("expanding Services puts real links on screen", async ({ page }) => {
  await openDrawer(page);

  const services = page.getByRole("button", { name: "Services", exact: true });
  await expect(services).toHaveAttribute("aria-expanded", "false");

  await services.click();
  await expect(services).toHaveAttribute("aria-expanded", "true");
  await page.waitForTimeout(450);

  const panel = page.locator("#mobile-services-panel");
  const panelBox = await panel.boundingBox();
  expect(panelBox, "the expanded panel must have height").not.toBeNull();
  expect(panelBox!.height).toBeGreaterThan(100);

  // Every service in the shared navigation data is reachable, and the first
  // few are on screen without scrolling.
  const viewport = page.viewportSize()!;
  const names = servicesMenu.flatMap((column) =>
    column.items.map((item) => item.name),
  );
  expect(names.length).toBeGreaterThan(4);

  for (const name of names) {
    const link = panel.getByRole("link", { name, exact: true });
    await expect(link).toHaveCount(1);
  }

  const firstLink = panel.getByRole("link", { name: names[0]!, exact: true });
  const linkBox = await firstLink.boundingBox();
  expect(linkBox).not.toBeNull();
  expect(linkBox!.y).toBeGreaterThanOrEqual(0);
  expect(linkBox!.y).toBeLessThan(viewport.height);
  expect(linkBox!.height).toBeGreaterThanOrEqual(44);
});

test("collapsed service links are off the page entirely", async ({ page }) => {
  await openDrawer(page);

  const panel = page.locator("#mobile-services-panel");
  await expect(panel).toBeHidden();

  // Not merely unreachable: `hidden` takes the links out of layout, the tab
  // order and the accessibility tree, so nothing can focus or match them.
  const reachable = await page.evaluate(() => {
    const link = document.querySelector<HTMLElement>("#mobile-services-panel a");
    if (!link) return null;
    link.focus();
    return document.activeElement === link;
  });
  expect(reachable).toBe(false);

  const drawer = page.getByRole("dialog", { name: "Site navigation" });
  await expect(
    drawer.getByRole("link", { name: "Merchant Services", exact: true }),
  ).toHaveCount(1);
});

test("the accordion animates open rather than snapping", async ({ page }) => {
  await openDrawer(page);
  await page.getByRole("button", { name: "Services", exact: true }).click();

  // The grid row is what animates. Measure that rather than the bounding box:
  // the panel is inside a scrolling container, so its box clips to the
  // container's height well before the transition finishes.
  const row = () =>
    page.evaluate(() =>
      parseFloat(
        getComputedStyle(document.querySelector("#mobile-services-panel")!)
          .gridTemplateRows,
      ),
    );

  // Read the contract from CSS rather than racing the clock. Sampling the row
  // at a fixed 90ms and asserting it had not finished passed alone and failed
  // under parallel load, because the sample can land after the transition ends
  // when four workers are competing for the main thread. What the test is
  // actually for — that the panel eases open instead of snapping — is stated
  // in the transition itself, and that can be read without any timing window.
  const transition = await page.evaluate(() => {
    const style = getComputedStyle(
      document.querySelector("#mobile-services-panel")!,
    );
    return {
      property: style.transitionProperty,
      duration: style.transitionDuration,
    };
  });

  expect(transition.property, "the grid row is what animates").toContain(
    "grid-template-rows",
  );
  const seconds = Math.max(
    ...transition.duration.split(",").map((value) => parseFloat(value)),
  );
  expect(seconds, "a transition long enough to read as motion").toBeGreaterThanOrEqual(0.2);

  // And it does open, all the way.
  await expect.poll(row, { message: "the panel should open" }).toBeGreaterThan(400);
});

test("every drawer link resolves", async ({ page, request }) => {
  await openDrawer(page);
  await page.getByRole("button", { name: "Services", exact: true }).click();
  await page.waitForTimeout(450);

  const hrefs = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[role="dialog"] a[href^="/"]')).map(
      (a) => a.getAttribute("href")!,
    ),
  );
  expect(hrefs.length).toBeGreaterThan(8);

  for (const href of Array.from(new Set(hrefs))) {
    const response = await request.get(href.split("#")[0] || "/");
    expect(response.status(), `${href} should not 404`).toBeLessThan(400);
  }
});
