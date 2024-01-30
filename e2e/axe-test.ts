import AxeBuilder from "@axe-core/playwright";
import { test as base } from "@playwright/test";

type AxeFixture = {
	axeBuilder: () => AxeBuilder;
};

export const test = base.extend<AxeFixture>({
	axeBuilder: async ({ page }, use, _testInfo) => {
		const axeBuilder = () =>
			new AxeBuilder({ page }).exclude("[data-axe-ignore=true]");

		await use(axeBuilder);
	},
});
export { expect } from "@playwright/test";
