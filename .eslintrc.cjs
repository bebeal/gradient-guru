module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "plugin:@tanstack/eslint-plugin-query/recommended",
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'unused-imports'],
  rules: {
    'react-refresh/only-export-components': 'off',
    'no-case-declarations': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
  settings: {
    react: {
      version: "detect"
    },
  },
};
