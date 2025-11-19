import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import { config } from '@playground/eslint-config/react-internal';

export default defineConfig([
  ...config,
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      'import/resolver': {
        // Avoid problematic TS resolver; rely on node and PnP
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      },
    },
  },
  // Globally relax import plugin rules in docs workspace to avoid PnP/resolver noise
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    rules: {
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/default': 'off',
      'import/namespace': 'off',
      'import/no-duplicates': 'off',
      'import/order': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
    },
  },
  // Storybook and Vite config specific tweaks
  {
    files: ['.storybook/**/*.{js,ts,tsx}', 'vite.config.ts'],
    rules: {
      // Keep minimal checks here if needed
    },
  },
  // Story files: allow hooks in story render functions
  {
    files: ['src/stories/**/*.{ts,tsx}'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
    },
  },
]);
