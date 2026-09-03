import { expect, test } from "@playwright/test";

import { ROUTES } from "./routes";

/**
 * No heading may be pushed down the page by the column beside it.
 *
 * `items-center` on a two-column section looks harmless until one column is a
 * tall reporting panel and the other is a short heading: the heading then
 * floats to the middle of the row and the first thing in the left column is
 * 200px of nothing. It happened on six pages at once.
 *
 * A column with no heading in it may still be centred — it carries no reading
 * order, and the text beside it starts at the top either way — so this only
 * measures columns that actually contain a heading.
 */
const HEADING_OFFSET_LIMIT = 32;

for (const width of [1440, 1024] as const) {
  test(`no heading column is pushed down at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });

    const offenders: string[] = [];

    for (const route of ROUTES) {
      await page.goto(route);

      const found = await page.evaluate((limit) => {
        const bad: { text: string; offset: number }[] = [];

        for (const grid of Array.from(
          document.querySelectorAll<HTMLElement>("main [class*='grid-cols']"),
        )) {
          if (getComputedStyle(grid).display !== "grid") continue;

          const children = Array.from(grid.children).filter(
            (child) => child.getBoundingClientRect().height > 4,
          );
          if (children.length !== 2) continue;

          const top = Math.min(
            ...children.map((child) => child.getBoundingClientRect().top),
          );

          for (const child of children) {
            const heading = child.querySelector("h1, h2, h3");
            if (!heading) continue;

            const offset = Math.round(child.getBoundingClientRect().top - top);
            if (offset > limit) {
              bad.push({
                text: (heading.textContent ?? "").trim().slice(0, 60),
                offset,
              });
            }
          }
        }

        return bad;
      }, HEADING_OFFSET_LIMIT);

      for (const entry of found) {
        offenders.push(`${route}: "${entry.text}" sits ${entry.offset}px low`);
      }
    }

    expect(
      offenders,
      "a heading should start level with the column beside it",
    ).toEqual([]);
  });
}
