import { expect, test } from "../axe-test";

test("landing page", async ({ page, axeBuilder }) => {
	await page.goto("/");

	// set light mode
	await page.evaluate(() => {
		localStorage.setItem("theme", "light");
	});

	const accessibilityResults = await axeBuilder().analyze();

	expect(accessibilityResults.violations).toEqual([]);
});
