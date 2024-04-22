import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    restoreMocks: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      exclude: [...configDefaults.coverage.exclude, 'src/index.ts']
    }
  },
  plugins: []
});
