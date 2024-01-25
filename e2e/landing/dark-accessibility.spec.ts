import AxeBuilder from "@axe-core/playwright";
import test, { expect } from "@playwright/test";

test("landing page", async ({ page }) => {
	await page.goto("/");

	// set dark mode
	await page.evaluate(() => {
		localStorage.setItem("theme", "dark");
	});

	// ignore particles background
	const results = await new AxeBuilder({ page })
		.exclude("#particlesBG")
		.analyze();

	expect(results.violations).toEqual([]);
});
