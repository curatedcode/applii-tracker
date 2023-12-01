import AxeBuilder from "@axe-core/playwright";
import test, { expect } from "@playwright/test";

test("landing page", async ({ page }) => {
  await page.goto("/");

  // set light mode
  await page.evaluate(() => {
    localStorage.setItem("theme", "light");
  });

  // ignore particles background
  const results = await new AxeBuilder({ page })
    .exclude("#particlesBG")
    .analyze();

  expect(results.violations).toEqual([]);
});
