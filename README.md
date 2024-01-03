# gradient-guru

Developer-oriented playground site which aims to provide a structured, modular, and interactive environment for experimenting with AI models

https://github.com/bebeal/gradient-guru/assets/42706447/fa0f0606-f56d-411d-b2a6-8529ef1b4a71

## Architecture

![gradient-guru-diagram](https://github.com/bebeal/gradient-guru/blob/main/assets/icons/GradientGuruArchitecture.svg)

## Build

* To run the development server on `localhost:3407`

```bash
yarn install
yarn dev
```

* Clean node_modules and .next directories

```bash
yarn clean
```

* Build for deployment
  * Under the hood this will build tldraw embed in `packages/tldraw`

```bash
yarn build
```

### Setup API Key For Local Development

**Create .env.local file** in root directory

```bash
touch .env.local
echo 'NEXT_PUBLIC_OPENAI_API_KEY=<your-api-key-here>' >> .env.local
```

## Deployement

* Deployed using [AWS Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)
  * Will probably switch to Vercel cause amplify is a bit of a pain

## Libraries

---

* Infrastructure:
  * [React](https://github.com/facebook/react)
    * [React Docs](https://react.dev/)
  * [TypeScript](https://github.com/microsoft/TypeScript)
    * [TypeScript Docs](https://www.typescriptlang.org/docs/)
  * [Next.js](https://github.com/vercel/next.js/)
    * [Next.js Docs](https://nextjs.org/docs)
    * [next-themes](https://github.com/pacocoursey/next-themes)

* Styling
  * [Radix-UI](https://github.com/radix-ui)
    * [Radix Primitives](radix-ui.com/docs/primitives)
    * [Radix Themes](radix-ui.com/themes/docs)
  * [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
    * [Tailwind CSS Docs](https://tailwindcss.com)
    * Plugins:
      * [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)
      * [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)
      * [tailwindcss-radix](https://github.com/ecklf/tailwindcss-radix)
  * [Styled Components](https://github.com/styled-components)
    * [Styled Components Docs](https://styled-components.com/docs)

* Utility:
  * Canvas/Whiteboard:
    * [Tldraw](https://github.com/tldraw/tldraw)
      * [Tldraw Docs](https://tldraw.dev/docs)
  * Schema Validation:
    * [yup](https://github.com/jquense/yup)
      * [yup Docs](https://github.com/jquense/yup)
  * Queries:
    * [react-query](https://github.com/TanStack/query)
      * [react-query Docs](https://tanstack.com/query/v3/docs/react/overview)
  * State Management:
    * [zustand](https://github.com/pmndrs/zustand)
      * [zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
  * Data Visualization:
    * [plotly.js](https://github.com/plotly/plotly.js)
      * [plotly.js Docs](https://plotly.com/javascript/)

---

### Fonts

* [Berkeley Mono](https://berkeleygraphics.com/typefaces/berkeley-mono/)
* [Monaspace](https://github.com/githubnext/monaspace)
  * [Monaspace Docs](https://monaspace.githubnext.com/)
  * Variants:
    * [Argon](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceArgonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)
    * [Krypton](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceKryptonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)
    * [Neon](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceNeonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)
    * [Radon](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceRadonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)
    * [Xenon](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceXenonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)

---

### IconSets

* [Carbon](https://github.com/carbon-design-system/carbon)
* [Tldraw](https://github.com/tldraw/tldraw)
* Custom

### Pages

* Domain Aliases:
  * https://gradient-guru.com
  * https://gradient-guru.org
  * https://gradient-guru.net
  * https://gradient-guru.dev

* [`/`](https://gradient-guru.com)
  * [`/compute`](https://gradient-guru.com/compute)
  * [`/demo`](https://gradient-guru.com/demo)
    * [`/make-a-ui`](https://gradient-guru.com/demo/make-a-ui)
    * [`/make-a-game`](https://gradient-guru.com/demo/make-a-game)
    * [`/system-architect`](https://gradient-guru.com/demo/system-architect)
    * [`/canvas-controller`](https://gradient-guru.com/demo/canvas-controller)
    * [`/ai-art`](https://gradient-guru.com/demo/ai-art)
    * [`/learn`](https://gradient-guru.com/demo/learn)
    * [`/bots`](https://gradient-guru.com/demo/bots)
  * [`/tests`](https://gradient-guru.com/tests)
    * [`/fonts`](https://gradient-guru.com/tests/fonts)
    * [`/form`](https://gradient-guru.com/tests/form)
    * [`/icon-sets`](https://gradient-guru.com/tests/icon-sets)
    * [`/palettes`](https://gradient-guru.com/tests/palettes)
    * [`/plotly`](https://gradient-guru.com/tests/plotly)
    * [`/primitives`](https://gradient-guru.com/tests/primitives)
      * [`/accordion`](https://gradient-guru.com/tests/primitives/accordion)
      * [`/checkbox`](https://gradient-guru.com/tests/primitives/checkbox)
      * [`/flip-card`](https://gradient-guru.com/tests/primitives/flip-card)
      * [`/kbd`](https://gradient-guru.com/tests/primitives/kbd)
      * ['/menubar'](https://gradient-guru.com/tests/primitives/menubar)
      * [`/radix-themed-components`](https://gradient-guru.com/tests/primitives/radix-themed-components)
      * [`/side-panel`](https://gradient-guru.com/tests/primitives/side-panel)
      * [`/slider`](https://gradient-guru.com/tests/primitives/slider)
      * [`/switch`](https://gradient-guru.com/tests/primitives/switch)
    * [`/tldraw`](https://gradient-guru.com/tests/tldraw)
