# `assets`/`public` Directory

* static assets such as fonts, images, mdx, csv, etc.

## Fonts

`fonts/` contains various fonts

* [Berkeley Mono](https://berkeleygraphics.com/typefaces/berkeley-mono/)
* [Monaspace](https://github.com/githubnext/monaspace)
  * [Monaspace Docs](https://monaspace.githubnext.com/)
  * Variants:
    * [Argon](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceArgonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)
    * [Krypton](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceKryptonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)
    * [Neon](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceNeonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)
    * [Radon](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceRadonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)
    * [Xenon](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceXenonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)

### Tailwind Fonts

Add the following to your `tailwind.config.js` to use the fonts as tailwindcss classes:

```css
fontFamily: {
  mono: ['Berkeley Mono', 'monospace'],
  argon: ['Argon', 'monospace'],
  krypton: ['Krypton', 'monospace'],
  neon: ['Neon', 'monospace'],
  radon: ['Radon', 'monospace'],
  xenon: ['Xenon', 'monospace']
}
```

Then use the fonts in your components:

```jsx
<p className="font-mono">Berkeley Mono</p>
<p className="font-argon">Argon</p>
<p className="font-krypton">Krypton</p>
<p className="font-neon">Neon</p>
<p className="font-radon">Radon</p>
<p className="font-xenon">Xenon</p>
```

## Icons

`icons/` contains various icons and entire icon sets

* [Carbon](https://github.com/carbon-design-system/carbon)
  * [Carbon Icon Docs](https://github.com/carbon-design-system/carbon)
* [Tldraw](https://github.com/tldraw/tldraw/tree/main/assets/icons/icon)
* [Lucide](https://github.com/lucide-icons/lucide)
  * [Lucide Icon Docs](https://lucide.dev/icons/)
* [Radix](https://github.com/radix-ui/icons)
  * [Radix Icon Docs](https://www.radix-ui.com/icons)
* [Logos](https://github.com/gilbarbara/logos)

## Images

* `images/` contains various images

## MDX

* `mdx/` contains various mdx files. Typically imported and used in app router directory.

## CSV

* `csv/` contains various csv files.
