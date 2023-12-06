# gradient-guru

Developer-oriented playground site which aims to provide a structural, modular, and interactive environment for experimenting with AI models

* Domain Aliases:
  * https://gradient-guru.com
  * https://gradient-guru.org
  * https://gradient-guru.net
  * https://gradient-guru.dev

## Build

* To run the development server

server on `localhost:3407`

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
  * Canvas Whiteboard + Nodes:
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

### Pages

* [`/`](https://gradient-guru.com)
  * [`/compute`](https://gradient-guru.com/compute)
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
* [ ] fix way image preview gets generated to not spam network tab
* [ ] Custom functions to give to LLM to manipulate editor
* [ ] Add ability to add custom fonts/iconsets easily
* [ ] Way to persist boards
* [ ] yjs

* [ ] Add my other llm exampels and notebooks
* [ ] Add the hardcoded demo
* [ ] Add flask backend env back in
* [ ] Add Context Calculator to track context length used/left over time, show estimate at all times for estimate of what will be added to context length is query was executed now

### Setup your API key for all projects

Open Terminal: You can find it in the Applications folder or search for it using Spotlight (Command + Space).

Edit bash profile: Use the command nano ~/.bash_profile or nano ~/.zshrc (for newer MacOS versions) to open the profile file in a text editor.

Add Environment Variable: In the editor, add the line below, replacing your-api-key-here with your actual API key:

export OPENAI_API_KEY='your-api-key-here'
Save and exit: Press Ctrl+O to write the changes, followed by Ctrl+X to close the editor.

Load your profile: Use the command source ~/.bash_profile or source ~/.zshrc to load the updated profile.

Verification: Verify the setup by typing echo $OPENAI_API_KEY in the terminal. It should display your API key.
