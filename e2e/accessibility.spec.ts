import test, { expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage", async ({ page }) => {
  await page.goto("/");

  // disable that rule due to h1 not being recognized but it is present
  const results = await new AxeBuilder({ page })
    .disableRules(["page-has-heading-one"])
    .analyze();

  await page.waitForSelector("#loadingHome", { state: "attached" });

  expect(results.violations).toEqual([]);
});

test("create page", async ({ page }) => {
  await page.goto("/applications/create");

  // disable that rule due to h1 not being recognized but it is present
  const results = await new AxeBuilder({ page })
    .disableRules(["page-has-heading-one"])
    .analyze();

  expect(results.violations).toEqual([]);
});

test("metrics", async ({ page }) => {
  await page.goto("/applications/metrics");

  // disable that rule due to h1 not being recognized but it is present
  // disable scanning of ChartJS as aria is not controlled by me
  const results = await new AxeBuilder({ page })
    .disableRules(["page-has-heading-one"])
    .exclude("#metricsChart")
    .analyze();

  await page.waitForSelector("#loadingMetrics", { state: "attached" });

  expect(results.violations).toEqual([]);
});