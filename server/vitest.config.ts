import {	defineConfig	} from 'vitest/config';

export default	defineConfig({
  test: {
    globalSetup: ['./src/tests/setup.ts '], 
    reporters: ['default', 'html'],
		coverage: {
			enabled: true,
      reporter: ['text', 'json', 'html'],
			reportsDirectory: './src/tests/coverage',
			exclude:	['build/**','src/migrations/**','html/**'],
    },
  },
});