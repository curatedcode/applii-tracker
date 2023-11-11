import test, { expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage", async ({ page }) => {
  await page.goto("/demo");

  // close tutorial dialog
  await page.evaluate(() =>
    localStorage.setItem("tutorialStatus", "completed"),
  );

  // disable that rule due to h1 not being recognized but it is present
  const results = await new AxeBuilder({ page })
    .disableRules(["page-has-heading-one"])
    .analyze();

  expect(results.violations).toEqual([]);
});

test("create page", async ({ page }) => {
  await page.goto("/demo/applications/create");

  // close tutorial dialog
  await page.evaluate(() =>
    localStorage.setItem("tutorialStatus", "completed"),
  );

  // disable that rule due to h1 not being recognized but it is present
  const results = await new AxeBuilder({ page })
    .disableRules(["page-has-heading-one"])
    .analyze();

  expect(results.violations).toEqual([]);
});

test("metrics", async ({ page }) => {
  await page.goto("/demo/applications/metrics");

  // close tutorial dialog
  await page.evaluate(() =>
    localStorage.setItem("tutorialStatus", "completed"),
  );

  // disable that rule due to h1 not being recognized but it is present
  // disable scanning of ChartJS as aria is not controlled by me
  const results = await new AxeBuilder({ page })
    .disableRules(["page-has-heading-one"])
    .exclude("#metricsChart")
    .analyze();

  await page.waitForSelector("#loadingMetrics", { state: "attached" });

  expect(results.violations).toEqual([]);
});
