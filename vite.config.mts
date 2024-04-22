import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    restoreMocks: true,
    setupFiles: ['./vitest.setup.ts']
  },
  plugins: []
});
