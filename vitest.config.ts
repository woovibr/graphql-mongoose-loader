import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    globalSetup: ['./testutils/globalSetup.ts'],
    setupFiles: ['./testutils/setupFiles.ts'],
    include: ['./src/**/*.spec.ts'],
    environment: './testutils/vitestEnvironment.ts',
    // reporters: ['default', 'hanging-process'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
