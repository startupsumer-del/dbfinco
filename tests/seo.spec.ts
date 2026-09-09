import { expect, test } from "@playwright/test";

import { ROUTES } from "./routes";

/**
 * Search and social metadata, checked on every route.
 *
 * The og:image assertion is the one that earns its keep. Next inherits
 * `app/opengraph-image.tsx` down the tree only while a page declares no
 * `openGraph` of its own — and every page here declares one, for the
 * canonical URL and the title pattern. That silently dropped the inherited
 * image, and every route but the home page was sharing with no preview at
 * all. Nothing failed, nothing warned; it was only visible in the head.
 */

/** Google truncates a snippet at roughly this width. */
const DESCRIPTION_MAX = 160;
/** Short enough to be worth writing at all. */
const DESCRIPTION_MIN = 70;
/** A title longer than this is cut in the result. */
const TITLE_MAX = 65;

for (const route of ROUTES) {
  test(`${route} carries complete search and social metadata`, async ({ page }) => {
    await page.goto(route);

    const head = await page.evaluate(() => {
      const meta = (name: string) =>
        document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)?.content ?? "";
      const property = (name: string) =>
        document.querySelector<HTMLMetaElement>(`meta[property="${name}"]`)?.content ?? "";

      return {
        title: document.title,
        description: meta("description"),
        canonical:
          document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? "",
        ogTitle: property("og:title"),
        ogDescription: property("og:description"),
        ogImage: property("og:image"),
        twitterCard: meta("twitter:card"),
        twitterImage: meta("twitter:image"),
        h1Count: document.querySelectorAll("h1").length,
        lang: document.documentElement.lang,
        jsonLd: Array.from(
          document.querySelectorAll('script[type="application/ld+json"]'),
        ).map((node) => node.textContent ?? ""),
      };
    });

    expect(head.title, "a title").toBeTruthy();
    expect(head.title.length, `title is ${head.title.length} characters`)
      .toBeLessThanOrEqual(TITLE_MAX);

    expect(head.description, "a description").toBeTruthy();
    expect(
      head.description.length,
      `description is ${head.description.length} characters: ${head.description}`,
    ).toBeLessThanOrEqual(DESCRIPTION_MAX);
    expect(head.description.length).toBeGreaterThanOrEqual(DESCRIPTION_MIN);

    expect(head.canonical, "a canonical URL").toBeTruthy();
    expect(head.lang, "a document language").toBe("en");

    expect(head.ogTitle).toBeTruthy();
    expect(head.ogDescription).toBeTruthy();
    expect(head.ogImage, "an Open Graph image").toContain("/opengraph-image");
    expect(head.twitterCard).toBe("summary_large_image");
    expect(head.twitterImage, "a Twitter image").toContain("/opengraph-image");

    expect(head.h1Count, "exactly one h1").toBe(1);

    // Structured data has to parse, or a crawler discards it silently.
    expect(head.jsonLd.length, "structured data").toBeGreaterThan(0);
    for (const block of head.jsonLd) {
      expect(() => JSON.parse(block) as unknown).not.toThrow();
    }
  });
}

test("the Open Graph card is generated and is a real image", async ({ request }) => {
  const response = await request.get("/opengraph-image");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("image/");
  expect((await response.body()).length, "a non-empty card").toBeGreaterThan(1000);
});

test("robots and sitemap agree on what is indexable", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  const sitemap = await (await request.get("/sitemap.xml")).text();

  expect(robots).toContain("Sitemap:");

  // Every public route belongs in the sitemap, and nothing in the sitemap may
  // be a route the site does not serve.
  for (const route of ROUTES) {
    expect(sitemap, `${route} should be listed in the sitemap`).toContain(
      route === "/" ? "<loc>" : route,
    );
  }

  const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!);
  expect(listed.length, "sitemap entries").toBeGreaterThanOrEqual(ROUTES.length);

  for (const url of listed) {
    const response = await request.get(new URL(url).pathname);
    expect(response.status(), `${url} is listed but does not resolve`).toBe(200);
  }
});
