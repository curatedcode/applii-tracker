import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { defaultExclude, defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsConfigPaths(), react()],
	test: {
		include: ["./tests/**"],
		exclude: [...defaultExclude, "./e2e/**"],
		css: true,
		environment: "jsdom",
	},
});
