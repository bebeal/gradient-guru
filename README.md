# gradient-guru

Developer-oriented playground site which aims to provide a structured, modular, and interactive environment for experimenting with AI models

https://github.com/bebeal/gradient-guru/assets/42706447/fa0f0606-f56d-411d-b2a6-8529ef1b4a71

## Architecture

![gradient-guru-diagram](https://github.com/bebeal/gradient-guru/blob/main/assets/icons/GradientGuru.svg)

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
  * Under the hood this will build tldraw embed in packages/tldraw

```bash
yarn build
```

### Setup API Key For Local Development

1. **Create .env.local file** in root directory

    ```bash
    touch .env.local
    ```

2. **Add API Key**

    ```bash
    # .env.local
    NEXT_PUBLIC_OPENAI_API_KEY='your-api-key-here'
    ```

## Libraries

---

* Infrastructure:
  * [React](https://github.com/facebook/react): JavaScript library for building user interfaces
    * [React Docs](https://react.dev/)
  * [TypeScript](https://github.com/microsoft/TypeScript)
    * [TypeScript Docs](https://www.typescriptlang.org/docs/)
  * [Next.js](https://github.com/vercel/next.js/): React framework and tooling
    * [Next.js Docs](https://nextjs.org/docs)
    * [next-themes](https://github.com/pacocoursey/next-themes): An abstraction for themes in Next.js

* Styling
  * [Radix-UI](https://github.com/radix-ui): Open-source UI component library for building high-quality, modular, themable, accessible components
    * [Radix Primitives](radix-ui.com/docs/primitives): Low-level UI component library
    * [Radix Themes](radix-ui.com/themes/docs): Add integration with radix-ui primitives to make them themable
  * [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss): Utility-first CSS framework
    * [Tailwind CSS Docs](https://tailwindcss.com)
    * Plugins:
      * [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate): For creating animations
      * [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography): Sets typographic defaults for HTML elements
      * [tailwindcss-radix](https://github.com/ecklf/tailwindcss-radix): Utilities and variants for styling radix state
  * [Styled Components](https://github.com/styled-components): CSS-in-JS library
    * [Styled Components Docs](https://styled-components.com/docs)

* Utility:
  * Canvas:
    * [Tldraw](https://github.com/tldraw/tldraw)
      * [Tldraw Docs](https://tldraw.dev/docs)
  * Forms:
    * [react-form-hook](https://github.com/react-hook-form/react-hook-form)
      * [react-form-hook Docs](https://react-hook-form.com/get-started)
  * Schema Validation:
    * [yup](https://github.com/jquense/yup)
      * [yup Docs](https://github.com/jquense/yup)
  * Queries:
    * [react-query](https://github.com/TanStack/query)
      * [react-query Docs](https://tanstack.com/query/v3/docs/react/overview)
  * Data Visualization:
    * [plotly.js](https://github.com/plotly/plotly.js)
      * [plotly.js Docs](https://plotly.com/javascript/)
  * Data Tables:
    * [ag-grid](https://github.com/ag-grid/ag-grid)
      * [ag-grid Docs](https://www.ag-grid.com/)

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
  * [`/tests`](https://gradient-guru.com/tests)
    * [`/fonts`](https://gradient-guru.com/tests/fonts)
    * [`/form`](https://gradient-guru.com/tests/form)
    * [`/icon-sets`](https://gradient-guru.com/tests/icon-sets)
    * [`/palettes`](https://gradient-guru.com/tests/palettes)
    * [`/plotly`](https://gradient-guru.com/tests/plotly)
    * [`/tiptap`](https://gradient-guru.com/tests/tiptap)
    * [`/tldraw`](https://gradient-guru.com/tests/tldraw)
    * [`/primitives`](https://gradient-guru.com/tests/primitives)
      * [`/accordion`](https://gradient-guru.com/tests/primitives/accordion)
      * [`/switch`](https://gradient-guru.com/tests/primitives/switch)
      * [`/side-panel`](https://gradient-guru.com/tests/primitives/side-panel)
      * [`/radix-themed-components`](https://gradient-guru.com/tests/primitives/radix-themed-components)

### TODO

* [ ] make node schemas dynamic
* [ ] fix utils export
* [ ] fix image preview
* [ ] Context Calculator
* [ ] CDN
* [ ] flask backend
* [ ] fix plotly component
