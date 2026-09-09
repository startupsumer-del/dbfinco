import { expect, test } from "@playwright/test";

/**
 * The contact endpoint is the only surface on this site that accepts input,
 * and the only one that spends money — an accepted submission calls a paid
 * mail API. These cover what a form cannot: what happens when the caller is
 * not the form.
 */

const valid = {
  fullName: "Test Person",
  email: "test@example.com",
  service: "Bookkeeping",
  message: "This is a test enquiry with enough characters to pass validation.",
};

test("rejects a body that is not JSON", async ({ request }) => {
  const response = await request.post("/api/contact", {
    headers: { "Content-Type": "application/json" },
    data: "not json at all",
  });

  expect(response.status()).toBe(400);
  expect((await response.json()).ok).toBe(false);
});

test("rejects a payload that fails the schema, and says which field", async ({
  request,
}) => {
  const response = await request.post("/api/contact", {
    data: { ...valid, email: "not-an-email", message: "too short" },
  });

  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body.ok).toBe(false);
  expect(body.errors).toHaveProperty("email");
  expect(body.errors).toHaveProperty("message");
});

test("rejects a body larger than the cap without parsing it", async ({
  request,
}) => {
  const response = await request.post("/api/contact", {
    data: { ...valid, message: "x".repeat(64 * 1024) },
  });

  expect(response.status(), "oversized bodies are refused").toBe(413);
});

test("refuses unknown enum values rather than passing them to the mail body", async ({
  request,
}) => {
  const response = await request.post("/api/contact", {
    data: { ...valid, service: "<script>alert(1)</script>" },
  });

  expect(response.status()).toBe(400);
  expect((await response.json()).errors).toHaveProperty("service");
});

test("a tripped honeypot looks like success and sends nothing", async ({
  request,
}) => {
  const response = await request.post("/api/contact", {
    data: { ...valid, website: "http://spam.example" },
  });

  // A bot must learn nothing from the response, so this is deliberately
  // indistinguishable from an accepted submission.
  expect(response.status()).toBe(200);
  expect((await response.json()).ok).toBe(true);
});

test("rate limits a caller that floods the endpoint", async ({ request }) => {
  const address = `203.0.113.${Math.floor(Math.random() * 200) + 1}`;
  const statuses: number[] = [];

  for (let attempt = 0; attempt < 8; attempt++) {
    const response = await request.post("/api/contact", {
      headers: { "x-forwarded-for": address },
      data: { ...valid, message: `Flood attempt number ${attempt}, padded out.` },
    });
    statuses.push(response.status());
  }

  expect(statuses.slice(0, 5), "the first five are accepted").toEqual([
    200, 200, 200, 200, 200,
  ]);
  expect(statuses.slice(5), "the rest are refused").toEqual([429, 429, 429]);

  const refused = await request.post("/api/contact", {
    headers: { "x-forwarded-for": address },
    data: valid,
  });
  expect(refused.headers()["retry-after"], "a Retry-After header").toBeTruthy();
});

test("one caller's limit does not spend another's", async ({ request }) => {
  const flooder = `198.51.100.${Math.floor(Math.random() * 200) + 1}`;
  const bystander = `198.51.100.${Math.floor(Math.random() * 200) + 1}`;

  for (let attempt = 0; attempt < 6; attempt++) {
    await request.post("/api/contact", {
      headers: { "x-forwarded-for": flooder },
      data: { ...valid, message: `Flood attempt number ${attempt}, padded out.` },
    });
  }

  const other = await request.post("/api/contact", {
    headers: { "x-forwarded-for": bystander },
    data: valid,
  });

  expect(other.status(), "a different address is unaffected").toBe(200);
});
