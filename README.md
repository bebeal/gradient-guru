# gradient-guru

My personal site which I often change and perterb to learn new things and paradigms. 

Currently, this is a Next.js 14 project with (way too fucking much tbh) ...

## Features

- Next.js 14 Framework with App Router
- React 18
- Node.js 20
- TypeScript
- Yarn 4 Package Manager
- ESLint
- Prettier
- Tailwind CSS
- Styled Components
- Radix UI Themes
- Radix UI Primitives
- Radix UI Icons
- Carbon Icons
- Lucide Icons
- Tldraw Icons
- Logo Icons
- Weird/Dumb/Custom Icons
- Code Language Icons
- Berkeley Mono Font
- Monaspace Font
- Bundle Analyzer
- React Query
- MDX support
- 

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

- Initialize Next.js project with TypeScript, Tailwind CSS, ESLint, Yarn, and without import alias.

  ```bash
  npx create-next-app@latest nextjs-template --app --no-src-dir --ts --tailwind --eslint --use-yarn --no-import-alias
  cd nextjs-template
  ```

---

- Update [Yarn](https://yarnpkg.com/cli)

  - Enable [Corepack](https://yarnpkg.com/corepack)

  ```bash
  corepack enable
  ```

  - Set the the the package manager in `package.json`:

  ```json
  "packageManager": "yarn@4.1.1"
  ```

  - Create `.yarnrc.yml` file:

  ```yaml
  nodeLinker: node-modules
  ```

---

- Add bundle analyzer

  - Install packages

  ```bash
  yarn add @next/bundle-analyzer -D
  ```

  - Wrap next config with bundle analyzer

  ```mjs
  const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  });
  export default withBundleAnalyzer(nextConfig);
  ```

  - Add script to `package.json`

  ```json
  "build:analyze": "ANALYZE=true next build",
  ```

---

- Build chores:

  - Add clean, linting, port, and other scripts to `package.json`
  - Add optimizations, experiementals and other things to `next.config.mjs`

    - Install packages

    ```bash
    yarn add critters sharp @swc/core webpack json5 fs-extra encoding @types/lodash -D
    yarn add lodash
    ```

  - Configure `.eslintrc.json`, `.eslintignore`

    - Install packages

    ```bash
    yarn add @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react-hooks eslint-plugin-react eslint-config-next eslint-plugin-unused-imports -D
    ```

  - Configure `prettier.config.cjs`, `.prettierignore`

    - Install packages

    ```bash
    yarn add prettier prettier-plugin-organize-imports eslint-config-prettier @ianvs/prettier-plugin-sort-imports prettier-plugin-organize-imports prettier-plugin-tailwindcss -D
    ```

---

- Add basic structure for app
  - Setup top level directories for `hooks`, `utils`, `public`
    - Add generic utils
    - Add `useDynamicDocTitle.tsx` hook
  - Setup [tailwind preflights](https://tailwindcss.com/docs/preflight)
  - Setup global app provider, layout, and styles

---

- Add basic structure for components

  - Setup top level directories for `components`
    - Add `LinkList` component
  - Setup `styled-components` for components

    - Install packages

    ```bash
    yarn add styled-components -D
    ```

    - Update `next.config.js`:

    ```mjs
    compiler: {
      styledComponents: true,
    }
    ```

    - Add `StyledComponentRegistry` to `providers` (See [Next.js: Configuring CSS-in-JS in](https://nextjs.org/docs/app/building-your-application/styling/css-in-js#configuring-css-in-js-in-app))

---

- Extend tailwind with plugins

  - Install packages

  ```bash
  yarn add clsx tailwind-merge tailwindcss-typography tailwindcss-aspect-ratio tailwindcss-container-queries -D
  ```

  - Add plugins to `tailwind.config.ts`

  ```ts
  import aspectRatioPlugin from '@tailwindcss/aspect-ratio';
  import containerQueriesPlugin from '@tailwindcss/container-queries';
  import typographyPlugin from '@tailwindcss/typography';
  import type { Config } from 'tailwindcss';

  const config: Config = {
    plugins: [typographyPlugin, aspectRatioPlugin, containerQueriesPlugin],
  };

  export default config;
  ```

- Extend tailwind theme

  - Support for `transparent`, `current`, `muted`, `success`, `error` colora
  - Support for `(bg|text|border)-(primary|secondary|tertiary)` colors
    - Map `(fill|stroke|outline|ring)-(primary|secondary|tertiary)` colors using the same `(bg|text|border)` colors
  - Define css vars in `globals.css` so we can eventually extend with other themes (e.g. dark mode)

  ```css
  :root {
    --muted: 85 85 85;
    ...
  }
  ```

  - Add theme to `tailwind.config.ts`
    - `/ <alpha-value>` is what allows for adding alpha to the color via `bg-red-500/50`

  ```ts
  import type { Config } from 'tailwindcss';

  const config: Config = {
    theme: {
      extend: {
        colors: {
          muted: 'rgb(var(--muted) / <alpha-value>)',
          ...
        },
      },
    },
  };
  ```

---

- Adding light, dark, system themes with `next-themes`, and radix-ui themes with `@radix-ui/themes`

  - Install packages

  ```bash
  yarn add next-themes @radix-ui/themes @radix-ui/icons radix-themes-tw dlv -D
  ```

  - Add dark mode support, and radix tokens from (`radix-themes-tw`) to `tailwind.config.ts`

  ```ts
  import { radixThemePreset } from 'radix-themes-tw';

  const config: Config = {
    darkMode: ['class'],
    presets: [radixThemePreset],
    ...
  };
  ```

  - Import Radix Theme CSS

  ```tsx
  import '@radix-ui/themes/styles.css';
  ```

  - Define a `ThemeProvider` in `hooks/useTheme.tsx` and use it in `providers.tsx`.
    - Consolidates theming for `next-themes`, `@radi-ui/themes` to serve a single source of truth for theming for the app.
    - This also sets up the native radix theme panel as a popup controlled via shortcut: `Ctrl + C` by default.

---

- Add assets and support to import svgs as react components with `@svgr/webpack`

  - Install packages

  ```bash
  yarn add @svgr/webpack -D
  ```

  - Define `SVGR.mjs` in `utils` which is a simple wrapper for `next.config.js` to enable `@svgr/webpack`
  - Wrap next config with `withSVGR`

  ```mjs
  import withSVGR from './utils/SVGR.mjs';

  export default withSVGR(nextConfig);
  ```

---

- Add `assets` directory to support larger sets of `fonts`, `icons`, `images`, etc.
  - Deliberately not using `public` since I don't want to load all assets on every page load (nextjs maybe does this already, but idc to look)
  - Add icons, icon-sets
  - Add images
  - Add fonts

---

- Add new asset `fonts`
  - Add `Berkely Mono` (tailwind: `font-mono`)
  - Add `Monaspace` fonts
    - `Argon` family (tailwind: `font-argon`)
    - `Krypton` family (tailwind: `font-krypton`)
    - `Neon` family (tailwind: `font-neon`)
    - `Radon` family (tailwind: `font-radon`)
    - `Xenon` family (tailwind: `font-xenon`)

---

- Adding React Query & Devtools

  - Install packages

  ```bash
  yarn add @tanstack/react-query
  yarn add @tanstack/eslint-plugin-query -D
  ```

---

- Adding React Query Devtools and App Debugger

  - Install packages

  ```bash
  yarn add @tanstack/react-query-devtools
  ```

  - Define a `DevToolsProvider` in `hooks/useDevTools.tsx` and use it in `providers.tsx`.
    - Consolidates debugging for `@tanstack/react-query-devtools` to serve a single source of truth for debugging for the app.
    - This sets up various dev tools, all which can be optionally enabled/disabled and for dev tools with components optionally visible/hidden.
    - Add `ReactQueryDevtools`.
      - Overwrites the native button with a custom one.

---

- Add [`react-geiger`](https://github.com/kristiandupont/react-geiger) as a non-serious debugging tool to `DevToolsProvider`

  - Install packages

  ```bash
  yarn add react-geiger lodash
  ```

  - Add `GeigerProvider` to `DebugToolsProvider`

---

- Adding MDX Support to handle `.md` and `.mdx` files. [`MDX`](https://nextjs.org/docs/app/building-your-application/configuring/mdx#:~:text=%3E%3C/p%3E-,MDX,-is%20a%20superset) is a superset of markdown that lets you write [`JSX`](https://react.dev/learn/writing-markup-with-jsx) directly in your markdown files.
  - Good Reference: https://github.com/leerob/leerob.io/tree/main
  - Install packages

  ```bash
  yarn add next-mdx-remote remark-gfm remark-directive remark-math rehype-katex
  yarn add @types/mdx -D
  ```

  - Add `mdx-options.mjs` to specify mdx options

  ```bash
  const mdxOptions = {
    remarkPlugins: [
      remarkGfm,
      remarkMath
    ],
    rehypePlugins: [
      rehypeKatex
    ],
  };
  ```

  - Use like so:

  ```tsx
  import MDXOptions from '@/mdx-options.mjs';
  ...
   <MDXRemote source={content} components={components} options={{mdxOptions: MDXOptions}} />
   ```

---

- Add Radix UI Primitives
  - Install packages

    ```bash
    yarn add @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-toolbar @radix-ui/react-tooltip
    ```

  - Implement in `@/components/primitivs/*`

---
