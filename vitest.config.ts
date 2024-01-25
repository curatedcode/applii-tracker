import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { defaultExclude, defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsConfigPaths(), react()],
	test: {
		setupFiles: "./tests/vitest.setup.ts",
		include: ["./tests/**"],
		exclude: [
			...defaultExclude,
			"./e2e/**",
			"./tests/userSetup.ts",
			"./tests/vitest.setup.ts",
		],
		css: true,
		environment: "jsdom",
	},
});
