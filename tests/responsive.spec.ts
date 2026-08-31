import { expect, test } from "@playwright/test";

import { ROUTES, VIEWPORTS } from "./routes";

/**
 * Page-level horizontal overflow is a release blocker, so every route is
 * checked at every target viewport. A 1px tolerance absorbs sub-pixel
 * rounding; anything beyond that is a genuine layout bug.
 */
for (const viewport of VIEWPORTS) {
  test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
    for (const route of ROUTES) {
      test(`no horizontal overflow on ${route}`, async ({ page }) => {
        await page.setViewportSize({
          width: viewport.width,
          height: viewport.height,
        });
        await page.goto(route, { waitUntil: "load" });

        const metrics = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));

        expect(
          metrics.scrollWidth,
          `${route} at ${viewport.width}px overflows by ${metrics.scrollWidth - metrics.clientWidth}px`,
        ).toBeLessThanOrEqual(metrics.clientWidth + 1);
      });
    }
  });
}
