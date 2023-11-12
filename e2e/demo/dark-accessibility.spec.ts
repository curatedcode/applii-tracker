import test, { expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage", async ({ page }) => {
  await page.goto("/demo");

  // close tutorial dialog and set dark mode
  await page.evaluate(() => {
    localStorage.setItem("tutorialStatus", "completed");
    localStorage.setItem("theme", "dark");
  });

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test("create page", async ({ page }) => {
  await page.goto("/demo/applications/create");

  // close tutorial dialog and set dark mode
  await page.evaluate(() => {
    localStorage.setItem("tutorialStatus", "completed");
    localStorage.setItem("theme", "dark");
  });

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test("metrics", async ({ page }) => {
  await page.goto("/demo/applications/metrics");

  // close tutorial dialog and set dark mode
  await page.evaluate(() => {
    localStorage.setItem("tutorialStatus", "completed");
    localStorage.setItem("theme", "dark");
  });

  await page.waitForSelector("#loadingMetrics", { state: "attached" });

  // disable scanning of ChartJS as aria is not controlled by me
  const results = await new AxeBuilder({ page })
    .exclude("#metricsChart")
    .analyze();

  expect(results.violations).toEqual([]);
});
