import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			default: "light",
			values: [
				{
					name: "light",
					value: "#eff2f5",
				},
				{
					name: "dark",
					value: "#191919",
				},
			],
		},
	},
	decorators: [
		// Storybook for some reason doesn't like their own stuff
		// @ts-ignore
		withThemeByClassName({
			themes: {
				light: "light",
				dark: "dark",
			},
			defaultTheme: "light",
		}),
	],
};

export default preview;
