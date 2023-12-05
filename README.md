# gradient-guru

idk

## Build

* To run the development server

server on `localhost:3000`

```bash
yarn install
yarn dev
```

* Clean node_modules and .next directories

```bash
yarn clean
```

* Generate iconset assets and ts files

```bash
yarn generate-iconsets
```

* Build for deployment
  * Under the hood this will build tldraw embed in packages/tldraw

```bash
yarn build
```

## Libraries

---

* [React](https://github.com/facebook/react): JavaScript library for building user interfaces
  * [React Docs](https://react.dev/)
* [TypeScript](https://github.com/microsoft/TypeScript)
  * [TypeScript Docs](https://www.typescriptlang.org/docs/)
* [Next.js](https://github.com/vercel/next.js/): React framework and tooling
  * [Next.js Docs](https://nextjs.org/docs)
  * [next-themes](https://github.com/pacocoursey/next-themes): An abstraction for themes in Next.js
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
* [Tldraw](https://github.com/tldraw/tldraw)
  * [Tldraw Docs](https://tldraw.dev/docs)
* [react-form-hook](https://github.com/react-hook-form/react-hook-form)
  * [react-form-hook Docs](https://react-hook-form.com/get-started)
* [yup](https://github.com/jquense/yup)
  * [yup Docs](https://github.com/jquense/yup)
* [react-query](https://github.com/TanStack/query)
  * [react-query Docs](https://tanstack.com/query/v3/docs/react/overview)

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

### Pages

* [`/`](https://gradient-guru.com)
  * [`/tests`](https://gradient-guru.com/tests)
    * [`/fonts`](https://gradient-guru.com/tests/fonts)
    * [`/form`](https://gradient-guru.com/tests/form)
    * [`/icon-sets`](https://gradient-guru.com/tests/icon-sets)
    * [`/palettes`](https://gradient-guru.com/tests/palettes)
    * [`/form`](https://gradient-guru.com/tests/palettes)
    * [`/tldraw`](https://gradient-guru.com/tests/tldraw)
    * [`/primitives`](https://gradient-guru.com/tests/primitives)
      * [`/accordion`](https://gradient-guru.com/tests/primitives/accordion)
      * [`/switch`](https://gradient-guru.com/tests/primitives/switch)
      * [`/side-panel`](https://gradient-guru.com/tests/primitives/side-panel)
      * [`/radix-themed-components`](https://gradient-guru.com/tests/primitives/radix-themed-components)

### TODO

* [ ] Setup CDN for icons/fonts distribution
* [ ] Cleanup schema related stuff
* [ ] Calculate stats on context length used/left
* [ ] fix way image preview gets generated to not spam network tab
* [ ] Custom functions to give to LLM to manipulate editor
* [ ] Add ability to add custom fonts/iconsets easily
* [ ] Way to persist boards
* [ ] yjs
