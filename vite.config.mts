import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		restoreMocks: true,
		setupFiles: ["./vitest.setup.ts"],
		globalSetup: ["./vitest.global-setup.ts"],
		coverage: {
			exclude: [
				...(configDefaults.coverage.exclude as string[]),
				"src/index.ts",
				"src/lib/db/**/*",
				"src/lib/zod-openapi/**/*",
				"src/lib/env.ts",
				"src/lib/pino-logger.ts",
				"drizzle.config.ts",
				"vitest.global-setup.ts",
			],
		},
	},
	plugins: [],
});
