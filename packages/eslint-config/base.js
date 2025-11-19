import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import onlyWarn from 'eslint-plugin-only-warn';
import eslintPluginPreferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';
import prettierConfig from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  prettierConfig,
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      // Turn off rules that have issues with Yarn PnP
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/export': 'error',
      'import/no-duplicates': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-in modules (e.g., 'fs', 'path')
            'external', // External packages from node_modules
            'internal', // Internal workspace packages (@playground/*)
            ['parent', 'sibling'], // Relative imports (../, ./)
            'index', // Index imports (./)
            'object', // Object imports (import log = console.log)
            'type', // Type imports (import type { } from)
          ],
          pathGroups: [
            {
              // React should be first among external imports
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              // React-dom should be second among external imports
              pattern: 'react-dom',
              group: 'external',
              position: 'before',
            },
            {
              // Internal workspace packages
              pattern: '@playground/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          warnOnUnassignedImports: true,
        },
      ],
    },
  },
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          bracketSpacing: true,
          arrowParens: 'always',
          printWidth: 100,
          tabWidth: 2,
          semi: true,
          endOfLine: 'lf',
        },
      ],
    },
  },
  ...tseslint.configs.recommended,
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    plugins: {
      'prefer-arrow-functions': eslintPluginPreferArrowFunctions,
    },
    rules: {
      'prefer-arrow-functions/prefer-arrow-functions': [
        'warn',
        {
          allowedNames: [],
          allowNamedFunctions: false,
          allowObjectProperties: false,
          classPropertiesAllowed: false,
          disallowPrototype: false,
          returnStyle: 'unchanged',
          singleReturnOnly: false,
        },
      ],
    },
  },
  {
    ignores: ['dist/**'],
  },
];
