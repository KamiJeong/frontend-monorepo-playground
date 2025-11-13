import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';
import onlyWarn from 'eslint-plugin-only-warn';
import eslintPluginPreferArrowFunctions from 'eslint-plugin-prefer-arrow-functions';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    plugins: {
      "prefer-arrow-functions": eslintPluginPreferArrowFunctions,
    },
    rules: {
      "prefer-arrow-functions/prefer-arrow-functions": [
        "warn",
        {
          "allowedNames": [],
          "allowNamedFunctions": false,
          "allowObjectProperties": false,
          "classPropertiesAllowed": false,
          "disallowPrototype": false,
          "returnStyle": "unchanged",
          "singleReturnOnly": false
        }
      ]
    }
  },
  {
    ignores: ["dist/**"],
  },
];
