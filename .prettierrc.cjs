/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: 'lf', // end of line sequence, 'lf' - for linux, 'crlf' - for windows
  printWidth: 240, // max 240 chars in line, code is easy to read
  semi: true, // enforce semi-colons at the end of statements
  useTabs: false, // use spaces instead of tabs
  singleQuote: true, // use single quotes instead of double quotes
  arrowParens: 'always', // avoid parentheses when single argument
  tabWidth: 2, // 2 spaces for indentation
  trailingComma: 'all', // avoid trailing commas
  bracketSameLine: false, // put brackets on a new line
  bracketSpacing: true, // put spaces between brackets
  importOrder: [
    // import order
    '^types$',
    '',
    '^react(.*)$',
    '^vite$',
    '^@vitejs(.*)$',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@([^/]+)$',
    '^@/(.*)$',
    '',
    '^(?!.*[.]css$)[./].*$',
    '.css$',
    '^[./]',
  ],
  importOrderSeparation: false, // separate groups with blank lines
  importOrderSortSpecifiers: true, // sort specifiers
  importOrderBuiltinModulesToTop: true, // move built-in modules to the top of the import list
  importOrderParserPlugins: [
    // parser plugins for import order
    'typescript',
    'jsx',
    'decorators-legacy',
  ],
  importOrderMergeDuplicateImports: true, // merge duplicate imports
  importOrderCombineTypeAndValueImports: true, // combine type and value imports
  plugins: ['prettier-plugin-tailwindcss', '@ianvs/prettier-plugin-sort-imports'],
};
