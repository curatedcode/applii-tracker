import { expect, test } from "../axe-test";

test("landing page", async ({ page, axeBuilder }) => {
	await page.goto("/");

	// set dark mode
	await page.evaluate(() => {
		localStorage.setItem("theme", "dark");
	});

	const accessibilityResults = await axeBuilder().analyze();

	expect(accessibilityResults.violations).toEqual([]);
});
