# nextjs-template

A feature rich Nextjs project template.

## Features

* Next.js 14 Framework with App Router
* React 18
* Node.js 20
* TypeScript
* Tailwind CSS
* ESLint
* Yarn 4 Package Manager

## Usage

```bash
git clone https://github.com/bebeal/nextjs-template
cd nextjs-template
yarn
yarn build
yarn dev
```

## Build Log & Notes

---

* Initialize Next.js project with TypeScript, Tailwind CSS, ESLint, Yarn, and without import alias.

  ```bash
  npx create-next-app@latest nextjs-template --app --no-src-dir --ts --tailwind --eslint --use-yarn --no-import-alias
  cd nextjs-template
  ```

---

* Update [Yarn](https://yarnpkg.com/cli)

  * Enable [Corepack](https://yarnpkg.com/corepack)

  ```bash
  corepack enable
  ```

  * Set the the the package manager in `package.json`:

  ```json
  "packageManager": "yarn@4.1.1"
  ```

  * Create `.yarnrc.yml` file:

  ```yaml
  nodeLinker: node-modules
  ```

---

* Add bundle analyzer

  * Install packages

  ```bash
  yarn add @next/bundle-analyzer -D
  ```

  * Wrap next config with bundle analyzer

  ```mjs
  const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  });
  export default withBundleAnalyzer(nextConfig);
  ```

  * Add script to `package.json`

  ```json
  "build:analyze": "ANALYZE=true next build",
  ```

---

* Build chores:
  * Add clean, linting, port, and other scripts to `package.json`
  * Add optimizations, experiementals and other things to `next.config.mjs`
    * Install packages

    ```bash
    yarn add critters sharp @swc/core webpack json5 fs-extra encoding -D
    ```

  * Configure `.eslintrc.json`, `.eslintignore`
    * Install packages

    ```bash
    yarn add @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react-hooks eslint-plugin-react eslint-config-next eslint-plugin-unused-imports -D
    ```

  * Configure `prettier.config.cjs`, `.prettierignore`
    * Install packages

    ```bash
    yarn add prettier prettier-plugin-organize-imports eslint-config-prettier @ianvs/prettier-plugin-sort-imports prettier-plugin-organize-imports prettier-plugin-tailwindcss -D
    ```

---

* Add basic structure for app
  * Setup top level directories for `hooks`, `utils`, `public`
    * Add generic utils
    * Add `useDynamicDocTitle.tsx` hook
  * Setup [tailwind preflights](https://tailwindcss.com/docs/preflight)
  * Setup global app provider, layout, and styles

---
