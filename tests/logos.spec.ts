import { expect, test } from "@playwright/test";

import { bankLogos, cardNetworkLogos, platformLogos } from "../src/content/logos";

const ALL = [...platformLogos, ...cardNetworkLogos, ...bankLogos];

test("every supplied logo asset is served", async ({ request }) => {
  for (const logo of ALL) {
    const response = await request.get(`/logos/${logo.slug}.webp`);
    expect(response.status(), `${logo.slug}.webp should be served`).toBe(200);
    expect(response.headers()["content-type"]).toContain("image");
  }
});

test("the marquee loop cannot show a gap at any offset", async ({ page }) => {
  for (const width of [390, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.locator("section:has(#platforms-heading)").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const worstGap = await page.evaluate(() => {
      const track = document.querySelector<HTMLElement>(".marquee-track");
      const view = document.querySelector(".marquee-viewport");
      if (!track || !view) return null;
      const band = view.getBoundingClientRect();
      const half = track.firstElementChild!.getBoundingClientRect().width;

      const previous = track.style.animation;
      track.style.animation = "none";
      let worst = 0;
      // Step a whole cycle: the track travels exactly one half's width.
      for (let i = 0; i <= 60; i += 1) {
        track.style.transform = `translate3d(${-(half * i) / 60}px,0,0)`;
        const tiles = Array.from(track.querySelectorAll("li"))
          .map((li) => li.getBoundingClientRect())
          .filter((r) => r.right > band.left && r.left < band.right);
        const right = tiles.length ? Math.max(...tiles.map((r) => r.right)) : band.left;
        const left = tiles.length ? Math.min(...tiles.map((r) => r.left)) : band.right;
        worst = Math.max(worst, band.right - right, left - band.left, 0);
      }
      track.style.transform = "";
      track.style.animation = previous;
      return Math.round(worst);
    });

    // A half narrower than the viewport leaves an empty band every cycle.
    expect(worstGap, `${width}px should never uncover the strip`).toBe(0);
  }
});

test("each brand is announced exactly once, never zero times", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("section:has(#platforms-heading)");
  await section.scrollIntoViewIfNeeded();

  // The strip repeats each logo six times to fill the track. Hiding the whole
  // viewport would leave a screen reader with the heading and no brand names,
  // because the static row is display:none unless reduced motion is on — so
  // exactly one pass stays in the accessibility tree.
  for (const logo of platformLogos) {
    await expect(
      section.getByRole("img", { name: logo.name }),
      `${logo.name} should be announced once`,
    ).toHaveCount(1);
  }

  // And the repeats really are hidden, not just visually offscreen.
  const total = await section.locator('img[alt]').count();
  expect(total, "the strip should render more copies than it exposes").toBeGreaterThan(
    platformLogos.length,
  );
});

test("reduced motion replaces the marquee with a static row", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  const section = page.locator("section:has(#platforms-heading)");
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  await expect(section.locator(".marquee-viewport")).toBeHidden();

  const visible = await page.evaluate(() => {
    const imgs = Array.from(
      document.querySelectorAll<HTMLImageElement>('img[alt][src*="logos"]'),
    );
    return imgs.filter((i) => i.getBoundingClientRect().height > 0).map((i) => i.alt);
  });
  for (const logo of platformLogos) {
    expect(visible, `${logo.name} must stay visible`).toContain(logo.name);
  }

  await context.close();
});

test("merchant page shows card and bank marks with no partnership claim", async ({
  page,
}) => {
  await page.goto("/merchant-services");
  const section = page.locator("section:has(#networks-heading)");
  await section.scrollIntoViewIfNeeded();

  for (const logo of [...cardNetworkLogos, ...bankLogos]) {
    await expect(section.getByRole("img", { name: logo.name })).toHaveCount(1);
  }

  const text = (await section.innerText()).toLowerCase();
  for (const phrase of [
    "our partners",
    "official partner",
    "banking partner",
    "certified",
    "endorsed by",
    "in partnership with",
  ]) {
    expect(text, `must not claim "${phrase}"`).not.toContain(phrase);
  }
  // And it says so explicitly.
  expect(text).toContain("does not imply any partnership");
});

test("logos are fetched at a sane size, not the full source", async ({ page }) => {
  await page.goto("/merchant-services");
  const section = page.locator("section:has(#networks-heading)");
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);

  const widths = await page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLImageElement>('img[src*="logos"]'))
      .map((i) => i.currentSrc)
      .filter((s) => s.includes("?"))
      .map((s) => Number(new URLSearchParams(s.split("?")[1]).get("w")))
      .filter((n) => Number.isFinite(n) && n > 0),
  );

  expect(widths.length).toBeGreaterThan(0);
  for (const w of widths) {
    expect(w, "a logo should not pull an oversized source").toBeLessThanOrEqual(640);
  }
});
