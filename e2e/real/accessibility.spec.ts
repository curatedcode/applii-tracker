import { expect, test } from "../axe-test";

test("homepage", async ({ page, axeBuilder }) => {
	await page.goto("/boards");

	await page.waitForSelector("#loadingHome", { state: "attached" });

	const accessibilityResults = await axeBuilder().analyze();

	expect(accessibilityResults.violations).toEqual([]);
});

test("create page", async ({ page, axeBuilder }) => {
	await page.goto("/boards/applications/create");

	const accessibilityResults = await axeBuilder().analyze();

	expect(accessibilityResults.violations).toEqual([]);
});

test("metrics", async ({ page, axeBuilder }) => {
	await page.goto("/boards/applications/metrics");

	await page.waitForSelector("#loadingMetrics", { state: "attached" });

	const accessibilityResults = await axeBuilder().analyze();

	expect(accessibilityResults.violations).toEqual([]);
});
