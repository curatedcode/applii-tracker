import AxeBuilder from "@axe-core/playwright";
import test, { expect } from "@playwright/test";

test("homepage", async ({ page }) => {
  await page.goto("/boards");

  await page.waitForSelector("#loadingHome", { state: "attached" });

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test("create page", async ({ page }) => {
  await page.goto("/boards/applications/create");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test("metrics", async ({ page }) => {
  await page.goto("/boards/applications/metrics");

  await page.waitForSelector("#loadingMetrics", { state: "attached" });

  // exclude nivo chart as most aria is not controlled by me.
  const results = await new AxeBuilder({ page })
    .exclude("#metricsChart")
    .analyze();

  expect(results.violations).toEqual([]);
});
