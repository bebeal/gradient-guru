# nextjs-template

A feature rich Nextjs project template.

## Features

* Next.js 14 Framework with App Router
* React
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

## Build Log

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

