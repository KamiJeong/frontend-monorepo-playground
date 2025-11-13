import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import reactRefresh from 'eslint-plugin-react-refresh';
import { config as baseConfig } from './base.js';
import { globalIgnores } from 'eslint/config';

import storybook from 'eslint-plugin-storybook';

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config[]} */
export const storybookConfig = [
  ...baseConfig,
  globalIgnores(['dist']),
  ...storybook.configs['flat/recommended'],
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
];
