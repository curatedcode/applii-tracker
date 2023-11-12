import test, { expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage", async ({ page }) => {
  await page.goto("/");

  // close tutorial dialog
  await page.evaluate(() =>
    localStorage.setItem("tutorialStatus", "completed"),
  );

  await page.waitForSelector("#loadingHome", { state: "attached" });

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test("create page", async ({ page }) => {
  await page.goto("/applications/create");

  // close tutorial dialog
  await page.evaluate(() =>
    localStorage.setItem("tutorialStatus", "completed"),
  );

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test("metrics", async ({ page }) => {
  await page.goto("/applications/metrics");

  // close tutorial dialog
  await page.evaluate(() =>
    localStorage.setItem("tutorialStatus", "completed"),
  );

  await page.waitForSelector("#loadingMetrics", { state: "attached" });

  // disable scanning of ChartJS as aria is not controlled by me
  const results = await new AxeBuilder({ page })
    .exclude("#metricsChart")
    .analyze();

  expect(results.violations).toEqual([]);
});
