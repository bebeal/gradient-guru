# gradient-guru

My personal site which I often change and perterb to learn new libraries, frameworks, and tools.

The plot was lost a long time ago

## Setup

- Clone the repository

```bash
git clone https://github.com/bebeal/gradient-guru
cd gradient-guru
```

- Install dependencies and build the project (cdk + app)

```bash
yarn install
yarn build
```

### CDK Build

```bash
yarn build:cdk
```

### App Build

```bash
yarn build:app
```

### Run Dev Server

- To run the development server on `localhost:3407`

```bash
yarn dev
```

### Clean Artifacts

- Clean up build artifacts

```bash
yarn clean
```

## Info

All the bloat:

- Infrastructure:
  - [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
  - [AWS Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)

- Frameworks:
  - [React 18](https://github.com/facebook/react)
    - [React Docs](https://react.dev/)
  - [TypeScript v5+](https://github.com/microsoft/TypeScript)
    - [TypeScript Docs](https://www.typescriptlang.org/docs/)
  - [Next.js 14 (App Router)](https://github.com/vercel/next.js/): Used for the static site, server-side rendering, API support
    - [Next.js Docs](https://nextjs.org/docs)
  - [Yarn 4](https://github.com/yarnpkg/yarn)
    - [Yarn CLI Docs](https://yarnpkg.com/cli)
  - [Node.js 20](https://github.com/nodejs/node)
    - [Node.js Docs](https://nodejs.org/en/docs/)

- Testing:
  - [Jest](https://github.com/jestjs/jest)

- Linting & Formatting:
  - [ESLint](https://github.com/eslint/eslint)
  - [Prettier](https://github.com/prettier/prettier)

- Components:
  - [Radix Primitives](radix-ui.com/docs/primitives)
  - [Radix Themes](radix-ui.com/themes/docs)

- Styling:
  - [next-themes](https://github.com/pacocoursey/next-themes)
  - [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
    - [Tailwind CSS Docs](https://tailwindcss.com)
    - Plugins:
      - [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)
      - [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)
      - [@tailwindcss/aspect-ratio](https://github.com/tailwindlabs/tailwindcss-aspect-ratio)
      - [tailwindcss-radix](https://github.com/ecklf/tailwindcss-radix)
  - [Styled Components](https://github.com/styled-components)
    - [Styled Components Docs](https://styled-components.com/docs)

- Assets:
  - Icons:
    - [Carbon](https://github.com/carbon-design-system/carbon)
      - [Carbon Icon Docs](https://github.com/carbon-design-system/carbon)
    - [Tldraw](https://github.com/tldraw/tldraw/tree/main/assets/icons/icon)
    - [Lucide](https://github.com/lucide-icons/lucide)
      - [Lucide Icon Docs](https://lucide.dev/icons/)
    - [Radix](https://github.com/radix-ui/icons)
      - [Radix Icon Docs](https://www.radix-ui.com/icons)
    - [Logos](https://github.com/gilbarbara/logos)
    - Weird/Dumb/Custom Icons
  - Fonts:
    - [Berkeley Mono](https://berkeleygraphics.com/typefaces/berkeley-mono/)
    - [Monaspace](https://github.com/githubnext/monaspace)
      - [Monaspace Docs](https://monaspace.githubnext.com/)
      - Variants:
        - [Argon](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceArgonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)
        - [Krypton](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceKryptonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)
        - [Neon](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceNeonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)
        - [Radon](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceRadonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)
        - [Xenon](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceXenonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)
    - ["Tldrawish"](https://github.com/tldraw/tldraw/tree/main/assets/fonts)
    - [Raleway](https://fonts.google.com/specimen/Raleway)

- Features:
  - [tlraw](https://github.com/tldraw/tldraw)
    - [Tldraw Docs](https://tldraw.dev/docs)
  - [tiptap](https://github.com/ueberdosis/tiptap)
    - [tiptap Docs](https://www.tiptap.dev/)
    - [tiptap templates](https://github.com/ueberdosis/tiptap-templates)
    - [sereneinserenade extensions](https://github.com/sereneinserenade?tab=repositories&q=tiptap&type=&language=&sort=)
  - [yup](https://github.com/jquense/yup)
    - [yup Docs](https://github.com/jquense/yup)
  - [react-query](https://github.com/TanStack/query)
    - [react-query Docs](https://tanstack.com/query/v3/docs/react/overview)
  - [zustand](https://github.com/pmndrs/zustand)
    - [zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
  - [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
    - [vscDarkPlus](https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/b0d771441590ff06eda265488bbf011a0140fbf4/src/styles/prism/vsc-dark-plus.js)
  - [plotly.js](https://github.com/plotly/plotly.js)
    - [plotly.js Docs](https://plotly.com/javascript/)
  - [aceternity](https://www.aceternity.com/components)
  - [framer-motion](https://github.com/framer/motion)
    - [framer-motion Docs](https://www.framer.com/motion/)
  - [tsparticles](https://github.com/tsparticles/tsparticles)

### Env Variables

Use `.env.example` as a template to fill out necessary environment variables which are required for various clients and services

## Build Log & Notes

---

- Initialize Next.js project with TypeScript, Tailwind CSS, ESLint, Yarn, and without import alias.

  ```bash
  npx create-next-app@latest nextjs-template --app --no-src-dir --ts --tailwind --eslint --use-yarn --no-import-alias
  cd nextjs-template
  yarn next telemetry disable
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

  - Good Reference: <https://github.com/leerob/leerob.io/tree/main>
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

---

- Add Radix UI Primitives

  - Install packages

    ```bash
    yarn add @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-toolbar @radix-ui/react-tooltip
    ```

  - Implement in `@/components/primitivs/*`

---

- Add NextAuth.js for authentication

  - Install packages

    ```bash
    yarn add next-auth
    ```

  - Add `pages/api/auth/[...nextauth].ts` to handle authentication
  - Add `clients/auth.ts` for auth boilerplate
  - Define Env Variables in `.env.local`

    ```bash
    # next-auth (see https://authjs.dev/reference/nextjs#environment-variable-inferrence)
    PORT=3047
    NEXTAUTH_URL=http://localhost:${PORT}
    NEXTAUTH_SECRET=...
    ```

---

- Add Google OAuthProvider
- Add Env Variables in `.env.local`

  ```bash
  # Google Auth (OAuth 2.0 + APIs)
  GOOGLE_CLIENT_ID=....apps.googleusercontent.com
  GOOGLE_CLIENT_SECRET=...
  GOOGLE_REDIRECT_URI=${NEXTAUTH_URL}/api/auth/callback/google
  ```

- Add GitHub OAuthProvider
- Add Env Variables in `.env.local`

  ```bash
  # Github Auth see https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app
  GITHUB_CLIENT_ID=...
  GITHUB_CLIENT_SECRET=...
  ```

---

- Add GoogleDriveAPI and GoogleDriveUtility Component to interact with Google Drive
- Install packages

  ```bash
  yarn add googleapis
  ```

- Add Env Variables in `.env.local`

  ```bash
  # Google Drive API
  GOOGLE_DRIVE_API_KEY=...
  ```

---

- Add AWS S3 Client
- Install packages

  ```bash
  yarn add @aws-sdk/client-s3
  yarn add @types/aws-sdk -D
  ```

  -- Add Env Variables in `.env.local`

  ```bash
  # _ underscore prefix to prevent collision with aws services (aws-sdk, amplify, etc)
  _AWS_ACCESS_KEY_ID=...
  _AWS_SECRET_ACCESS_KEY=...
  _AWS_REGION=us-west-2
  _AWS_BUCKET=node-...
  ```

---

- Add TipTap component
  - set `TIPTAP_PRO_TOKEN` in `.env.local` to be your personal registry token (see [TipTap Pro Extensions](https://cloud.tiptap.dev/pro-extensions))
  - edit `.yarnrc.yml` to configure TipTap Pro Registry (necessary to install tiptap pro extensions from package registry)

  ```bash
  npmScopes:
    tiptap-pro:
      npmRegistryServer: "https://registry.tiptap.dev/"
      npmAuthToken: "${TIPTAP_PRO_TOKEN}"
  ```

  - Install packages

  ```bash
  yarn add @tiptap-pro/extension-collaboration-history @tiptap-pro/extension-details @tiptap-pro/extension-details-content @tiptap-pro/extension-details-summary @tiptap-pro/extension-emoji @tiptap-pro/extension-file-handler @tiptap-pro/extension-invisible-characters @tiptap-pro/extension-mathematics @tiptap-pro/extension-table-of-content @tiptap-pro/extension-unique-id @tiptap/core @tiptap/extension-blockquote @tiptap/extension-bold @tiptap/extension-bullet-list @tiptap/extension-character-count @tiptap/extension-code-block-lowlight @tiptap/extension-collaboration @tiptap/extension-collaboration-cursor @tiptap/extension-color @tiptap/extension-document @tiptap/extension-focus @tiptap/extension-font-family @tiptap/extension-hard-break @tiptap/extension-heading @tiptap/extension-highlight @tiptap/extension-history @tiptap/extension-image @tiptap/extension-link @tiptap/extension-list-item @tiptap/extension-list-keymap @tiptap/extension-mention @tiptap/extension-ordered-list @tiptap/extension-paragraph @tiptap/extension-placeholder @tiptap/extension-strike @tiptap/extension-subscript @tiptap/extension-superscript @tiptap/extension-table @tiptap/extension-table-cell @tiptap/extension-table-header @tiptap/extension-table-row @tiptap/extension-task-item @tiptap/extension-task-list @tiptap/extension-text @tiptap/extension-text-align @tiptap/extension-text-style @tiptap/extension-typography @tiptap/extension-underline @tiptap/extension-youtube @tiptap/pm @tiptap/react @tiptap/starter-kit @tiptap/suggestion tiptap-markdown katex y-prosemirror yjs @hocuspocus/provider @hocuspocus/transformer prosemirror-model prosemirror-state prosemirror-view y-protocols
  ```

  - Add `TipTap` directory in `@/components/` and export `TipTap` and `TipTapToolbar` components. Use internally onlly `Extensions` to define define custom extensions.
    - TODO: Simplify the above to leverage [tiptap-templates](`https://github.com/ueberdosis/tiptap-templates`) as much as possible instead of custom defined extensions.

---

- Add Jest testing framework
  - Install jest and setup testing environment

  ```bash
  yarn add jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom -D
  ```

  - Setup `jext.setup.js` (this seems kinda useless is it really needed?)

  ```js
  // Learn more: https://github.com/testing-library/jest-dom
  import '@testing-library/jest-dom'
  ```

  - Setup `jest.config.ts` per your needs

---
