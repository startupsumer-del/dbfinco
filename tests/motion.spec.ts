import { expect, test } from "@playwright/test";

/**
 * The scroll reveal must never leave content unreadable or displaced. It
 * animates transform only — never opacity — precisely so that text stays at
 * full contrast even before it has been scrolled to. These tests hold that,
 * plus the three ways a reveal could otherwise strand content: the element
 * never enters the viewport, JavaScript never runs, or the reader prefers
 * reduced motion.
 */

test("no revealed block is ever below full opacity", async ({ page }) => {
  await page.goto("/");

  // Walk the page the way a visitor would, so every observer entry fires.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    const bottom = () =>
      Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let y = 0; y < bottom(); y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, bottom());
  });

  // Poll rather than guess at a duration: the last cards carry up to 350ms of
  // stagger on top of a 420ms transition, and a fixed wait races that.
  await expect
    .poll(
      async () =>
        page.evaluate(() =>
          Array.from(document.querySelectorAll("[data-reveal]"))
            .filter((el) => {
              const t = getComputedStyle(el).transform;
              return t !== "none" && t !== "matrix(1, 0, 0, 1, 0, 0)";
            })
            .map(
              (el) =>
                `${el.getAttribute("data-reveal") || "unrevealed"}: ` +
                `${el.textContent?.trim().slice(0, 40) ?? "(empty)"}`,
            ),
        ),
      { timeout: 8000, message: "every block should settle at its final position" },
    )
    .toEqual([]);

  const faded = await page.evaluate(() =>
    Array.from(document.querySelectorAll("[data-reveal]"))
      .filter((el) => Number(getComputedStyle(el).opacity) < 0.99)
      .map((el) => el.textContent?.trim().slice(0, 60) ?? "(empty)"),
  );

  expect(faded, "the reveal must never fade text").toEqual([]);

});

test("reveal targets exist and the document is marked", async ({
  page,
}) => {
  await page.goto("/");

  const total = await page.locator("[data-reveal]").count();
  expect(total, "the homepage should have reveal targets").toBeGreaterThan(3);

  // The marker class is what gates the offset; without it nothing moves.
  await expect(page.locator("html")).toHaveClass(/js-reveal/);
});

test("content sits in place with JavaScript disabled", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");

  // The marker script never runs, so the offset never applies.
  await expect(page.locator("html")).not.toHaveClass(/js-reveal/);

  const faded = await page.evaluate(() =>
    Array.from(document.querySelectorAll("[data-reveal]")).filter(
      (el) => Number(getComputedStyle(el).opacity) < 0.99,
    ).length,
  );
  expect(faded).toBe(0);

  await expect(
    page.getByRole("heading", { name: "Plans Built for Business Growth" }),
  ).toBeVisible();

  await context.close();
});

test("reduced motion shows every section immediately", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await page.waitForTimeout(400);

  const faded = await page.evaluate(() =>
    Array.from(document.querySelectorAll("[data-reveal]"))
      .filter((el) => Number(getComputedStyle(el).opacity) < 0.99)
      .map((el) => el.textContent?.trim().slice(0, 60) ?? "(empty)"),
  );
  expect(faded, "reduced motion must not fade anything").toEqual([]);

  await context.close();
});
