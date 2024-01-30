import { expect, test } from "../axe-test";

test("homepage", async ({ page, axeBuilder }) => {
	await page.goto("/boards");

	// set dark mode
	await page.evaluate(() => {
		localStorage.setItem("theme", "dark");
	});

	await page.waitForSelector("#loadingHome", { state: "attached" });

	const accessibilityResults = await axeBuilder().analyze();

	expect(accessibilityResults.violations).toEqual([]);
});

test("create page", async ({ page, axeBuilder }) => {
	await page.goto("/boards/applications/create");

	// set dark mode
	await page.evaluate(() => {
		localStorage.setItem("theme", "dark");
	});

	const accessibilityResults = await axeBuilder().analyze();

	expect(accessibilityResults.violations).toEqual([]);
});

test("metrics", async ({ page, axeBuilder }) => {
	await page.goto("/boards/applications/metrics");

	// set dark mode
	await page.evaluate(() => {
		localStorage.setItem("theme", "dark");
	});

	await page.waitForSelector("#loadingMetrics", { state: "attached" });

	const accessibilityResults = await axeBuilder().analyze();

	expect(accessibilityResults.violations).toEqual([]);
});
