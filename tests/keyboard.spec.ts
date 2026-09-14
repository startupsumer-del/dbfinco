import { expect, test, type Page } from "@playwright/test";

/**
 * The keyboard path, which axe does not check.
 *
 * axe reads a rendered snapshot; it cannot tab. A control that is hidden from
 * sight but still in the tab order strands a keyboard user on nothing, and
 * this site has three places that could regress into it — the mega-menu panel,
 * the mobile drawer, and the responsive swap between the desktop nav and the
 * hamburger, where both sets of controls exist in the DOM at once.
 */

interface Stop {
  id: string;
  tag: string;
  text: string;
  width: number;
  height: number;
  srOnly: boolean;
  inAriaHidden: boolean;
}

/**
 * Walks the tab order and returns every stop.
 *
 * Identity is positional rather than textual: a page with eight "Learn More"
 * links would otherwise look like it had wrapped after the first one, and the
 * walk would stop a tenth of the way down the page reporting success.
 */
async function walkTabOrder(page: Page, limit = 300): Promise<Stop[]> {
  await page.evaluate(() => {
    document.querySelectorAll("*").forEach((el, index) => {
      el.setAttribute("data-kbd", String(index));
    });
    document.body.focus();
  });

  const stops: Stop[] = [];
  const seen = new Set<string>();
  let first: string | null = null;

  for (let step = 0; step < limit; step++) {
    await page.keyboard.press("Tab");

    const stop = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body || el === document.documentElement) return null;
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return {
        id: el.getAttribute("data-kbd") ?? "",
        tag: el.tagName,
        text: (el.textContent ?? "").trim().slice(0, 40),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        // Visually hidden until focused — correct for a skip link.
        srOnly:
          style.clipPath === "inset(50%)" || style.clip.startsWith("rect(0px"),
        inAriaHidden: !!el.closest('[aria-hidden="true"]'),
      };
    });

    if (!stop) break;
    if (first === null) first = stop.id;
    else if (stop.id === first) break; // wrapped back to the start
    if (seen.has(stop.id)) continue;
    seen.add(stop.id);
    stops.push(stop);
  }

  return stops;
}

const ROUTES = ["/", "/contact"] as const;
const WIDTHS = [
  { width: 1440, name: "desktop" },
  { width: 390, name: "mobile" },
] as const;

for (const { width, name } of WIDTHS) {
  for (const route of ROUTES) {
    test(`${route} has no stranded focus stop on ${name}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);

      const stops = await walkTabOrder(page);

      expect(stops.length, "the page should be navigable by keyboard")
        .toBeGreaterThan(20);

      const stranded = stops.filter(
        (stop) => !stop.srOnly && (stop.width === 0 || stop.height === 0),
      );
      expect(
        stranded.map((s) => `${s.tag} "${s.text}"`),
        "a focus stop with no box puts the caret on nothing",
      ).toEqual([]);

      const hidden = stops.filter((stop) => stop.inAriaHidden);
      expect(
        hidden.map((s) => `${s.tag} "${s.text}"`),
        "a control hidden from assistive tech must not be focusable",
      ).toEqual([]);
    });
  }
}

test("the skip link is first and moves focus to the main content", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.evaluate(() => document.body.focus());

  await page.keyboard.press("Tab");
  const skip = page.locator(":focus");
  await expect(skip, "the first stop should be the skip link").toHaveText(
    /skip to main content/i,
  );

  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);

  // The target has to be able to take focus, or the link moves the scroll
  // position and leaves the caret back in the header.
  const targetIsFocusable = await page.evaluate(() => {
    const main = document.getElementById("main");
    return main !== null && main.tabIndex >= -1;
  });
  expect(targetIsFocusable).toBe(true);
});

test("the nav for the other breakpoint is not left in the tab order", async ({
  page,
}) => {
  // Both navigations exist in the DOM at every width; only one is displayed.
  // If the hidden one stays focusable, a keyboard user tabs through a second
  // copy of the whole menu that they cannot see.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const onDesktop = await walkTabOrder(page, 40);
  expect(
    onDesktop.some((s) => /open navigation menu/i.test(s.text)),
    "the hamburger should not be reachable on desktop",
  ).toBe(false);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const onMobile = await walkTabOrder(page, 40);
  expect(
    onMobile.some((s) => /open navigation menu/i.test(s.text)),
    "the hamburger should be reachable on mobile",
  ).toBe(true);
});
