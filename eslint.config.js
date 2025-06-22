// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', '.expo/*', 'node_modules/*', 'coverage/*', 'build/*', '.vscode/*', 'storybook-static/*'],
    files: [
      "**/*.js",
      "**/*.cjs",
      "**/*.mjs",
      "**/*.ts",
      "**/*.tsx",
      "**/*.jsx",
    ],
		rules: {
			"prefer-const": "warn",
			"no-constant-binary-expression": "error",
		},
  },
]);
