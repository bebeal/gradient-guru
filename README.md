# gradient-guru

idk

## Dependencies

---

* [React](https://github.com/facebook/react): JavaScript library for building user interfaces
  * [React Docs](https://react.dev/)
* [Next.js](https://github.com/vercel/next.js/): React framework and tooling
  * [Next.js Docs](https://nextjs.org/docs)
  * [next-themes](https://github.com/pacocoursey/next-themes): An abstraction for themes in Next.js

---

* [Radix-UI](https://github.com/radix-ui): Open-source UI component library for building high-quality, modular, themable, accessible components
  * [Radix Primitives](radix-ui.com/docs/primitives): Low-level UI component library
  * [Radix Themes](radix-ui.com/themes/docs): Add integration with radix-ui primitives to make them themable
* [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss): Utility-first CSS framework
  * [Tailwind CSS Docs](https://tailwindcss.com)
  * Plugins:
    * [radix-ui-themes-with-tailwind](https://github.com/needim/radix-ui-themes-with-tailwind): Integrates radix-ui themes with tailwindcss
    * [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate): For creating animations
    * [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography): Sets typographic defaults for HTML elements
    * [tailwindcss-radix](https://github.com/ecklf/tailwindcss-radix): Utilities and variants for styling radix state
* [Styled Components](https://github.com/styled-components): CSS-in-JS library
  * [Styled Components Docs](https://styled-components.com/docs)

---

* [react-form-hook](https://github.com/react-hook-form/react-hook-form)
  * [react-form-hook Docs](https://react-hook-form.com/get-started)
* [zod](https://github.com/colinhacks/zod)
  * [zod Docs](https://zod.dev/)

---

* [react-query](https://github.com/TanStack/query)
  * [react-query Docs](https://tanstack.com/query/v3/docs/react/overview)

---

* [Tldraw](https://github.com/tldraw/tldraw)

---

* [TypeScript](https://github.com/microsoft/TypeScript)
  * [TypeScript Docs](https://www.typescriptlang.org/docs/)

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

### IconSets

* [Academicons](https://github.com/jpswalsh/academicons )
* [Carbon](https://github.com/carbon-design-system/carbon)
* [Dev](https://github.com/devicons/devicon)
* [EntypoPlus](https://github.com/chancancode/entypo-plus)
* [EntypoSocial](https://github.com/chancancode/entypo-plus/tree/master/source/Entypo%2B%20Social%20Extension)
* [Flag](https://github.com/lipis/flag-icons)
* [Font Audio](https://github.com/fefanto/fontaudio)
* [FontAwesome - Regular](https://github.com/FortAwesome/Font-Awesome)
* [FontGIS](https://github.com/Viglino/font-gis)
* [Game](https://github.com/game-icons/icons)
* [Geoglyphs](https://github.com/cugos/geoglyphs)
* [Heroicons - Solid](https://github.com/tailwindlabs/heroicons)
* [Logos](https://github.com/gilbarbara/logos)
* [Lucide](https://github.com/lucide-icons/lucide)
* [Map](https://github.com/scottdejonge/map-icons)
* [Medical](https://github.com/samcome/webfont-medical-icons)
* [MUI - Line](https://github.com/cyberalien/line-md)
* [Radix](https://github.com/radix-ui/icons)
* [Skill](https://github.com/tandpfun/skill-icons)
* [Spinner](https://github.com/n3r4zzurr0/svg-spinners)
* [Tldraw](https://github.com/tldraw/tldraw)
* [VSCode](https://github.com/vscode-icons/vscode-icons)

### Structure

* `app/`
* `assets/`
  * `fonts/`
  * `icons/`
* `components/`
* `constants/`
* `hooks/`
* `utils/`
* `scripts/`

### Pages

* `https://gradient-guru.com`
  * [`/fonts`](https://gradient-guru.com/fonts)
  * [`/icon-sets`](https://gradient-guru.com/icon-sets)
  * [`/primitives`](https://gradient-guru.com/primitives)
  * [`/tests`](https://gradient-guru.com/tests)
  * [`/flow`](https://gradient-guru.com/flow)

## Build

* Install dependencies and start development server

```bash
npm install
npm run dev
```

* Clean node_modules and .next directories

```bash
npm run clean
```

* Generate iconset assets and ts files

```bash
npm run generate-iconsets
```

* Build for deployment

```bash
npm run build
```
