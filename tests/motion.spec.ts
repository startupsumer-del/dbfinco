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

/**
 * A chart that draws itself is only worth having if the visitor is looking at
 * it. Left ungated, the line animation starts the moment the element is
 * parsed, so a chart halfway down the page has finished before anyone reaches
 * it. These hold the gate — and, more importantly, hold the failure mode the
 * gate introduces: a *paused* animation whose duration a reduced-motion
 * override has collapsed to nothing sits on its first frame for good, which
 * for a drawn line means a line nobody ever sees.
 */
test("charts below the fold hold their draw until they are scrolled to", async ({
  page,
}) => {
  await page.goto("/merchant-services");

  const before = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll("[data-chart-anim]"));
    const below = els.filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    return {
      total: els.length,
      below: below.length,
      allPaused: below.every(
        (el) => getComputedStyle(el).animationPlayState === "paused",
      ),
    };
  });

  expect(before.total, "the page should carry animated charts").toBeGreaterThan(0);
  expect(before.below, "some charts should start below the fold").toBeGreaterThan(0);
  expect(before.allPaused, "an off-screen chart should not be drawing").toBe(true);

  await page
    .locator("#merchant-reporting-heading")
    .scrollIntoViewIfNeeded();

  await expect
    .poll(
      async () =>
        page.evaluate(() => {
          const section = document
            .getElementById("merchant-reporting-heading")
            ?.closest("section");
          const els = Array.from(
            section?.querySelectorAll("[data-chart-anim]") ?? [],
          );
          return els.every(
            (el) => getComputedStyle(el).animationPlayState === "running",
          );
        }),
      { message: "charts should draw once they are on screen" },
    )
    .toBe(true);
});

test("reduced motion never leaves a chart on its first frame", async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/merchant-services");
  await page.locator("#merchant-reporting-heading").scrollIntoViewIfNeeded();

  const readState = () =>
    page.evaluate(() => {
    const section = document
      .getElementById("merchant-reporting-heading")
      ?.closest("section");
    const els = Array.from(section?.querySelectorAll("[data-chart-anim]") ?? []);
    const bars = els.filter((el) => el.tagName === "rect");
    const arcs = els.filter((el) => el.tagName === "circle");
    return {
      paused: els.some(
        (el) => getComputedStyle(el).animationPlayState === "paused",
      ),
      bars: bars.length,
      drawnBars: bars.filter((el) => el.getBoundingClientRect().height > 2).length,
      arcs: arcs.length,
      drawnArcs: arcs.filter(
        (el) => !getComputedStyle(el).strokeDasharray.startsWith("0px"),
      ).length,
    };
  });

  // Poll: the reveal still has to mark the section before the chart's own
  // (instant) animation resolves, and that is a frame or two away.
  await expect
    .poll(async () => (await readState()).drawnBars, {
      message: "every bar should be drawn",
    })
    .toBe((await readState()).bars);

  const state = await readState();

  expect(state.paused, "nothing should be held paused under reduced motion").toBe(
    false,
  );
  expect(state.bars).toBeGreaterThan(0);
  expect(state.drawnBars, "every bar should be drawn").toBe(state.bars);
  expect(state.arcs).toBeGreaterThan(0);
  expect(state.drawnArcs, "every donut arc should be drawn").toBe(state.arcs);

  await context.close();
});

/**
 * Progress tracks animate on the same gate as the charts, and carry the same
 * risk: a paused `scaleX(0)` under a reduced-motion override is a bar that
 * never appears. The audit page's engagement status is four of them.
 */
test("progress tracks fill when reached, and are full under reduced motion", async ({
  browser,
}) => {
  const normal = await browser.newPage();
  await normal.goto("/services/audit-assurance");

  const trackState = (page: typeof normal) =>
    page.evaluate(() => {
      const tracks = Array.from(
        document.querySelectorAll<HTMLElement>("[data-chart-anim]"),
      ).filter((el) => el.tagName === "DIV");
      return {
        count: tracks.length,
        paused: tracks.filter(
          (el) => getComputedStyle(el).animationPlayState === "paused",
        ).length,
        drawn: tracks.filter((el) => el.getBoundingClientRect().width > 2).length,
      };
    });

  const before = await trackState(normal);
  expect(before.count, "the audit page should show progress tracks").toBeGreaterThan(0);
  expect(before.paused, "an off-screen track should not be filling").toBe(before.count);

  await normal.locator("#audit-progress-heading").scrollIntoViewIfNeeded();
  await expect
    .poll(async () => (await trackState(normal)).drawn, {
      message: "tracks should fill once on screen",
    })
    .toBe(before.count);
  await normal.close();

  const context = await browser.newContext({ reducedMotion: "reduce" });
  const reduced = await context.newPage();
  await reduced.goto("/services/audit-assurance");
  await reduced.locator("#audit-progress-heading").scrollIntoViewIfNeeded();

  await expect
    .poll(async () => (await trackState(reduced)).drawn, {
      message: "every track should be drawn under reduced motion",
    })
    .toBe(before.count);
  expect((await trackState(reduced)).paused).toBe(0);
  await context.close();
});
