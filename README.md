[![Buy Me A Coffee](https://img.buymeacoffee.com/button-api/?text=Buy me compute&emoji=🧠&slug=bebeal&button_colour=008cff&font_colour=ffffff&font_family=Inter&outline_colour=ffffff&coffee_colour=FFDD00)](https://www.buymeacoffee.com/bebeal)

# gradient-guru

https://github.com/bebeal/gradient-guru/assets/42706447/fa0f0606-f56d-411d-b2a6-8529ef1b4a71

## Architecture

![gradient-guru-diagram](https://github.com/bebeal/gradient-guru/blob/main/assets/icons/GradientGuruArchitecture.svg)

## Build

* One time initial setup

```bash
yarn install
yarn build
```

* To run the development server on `localhost:3407`

```bash
yarn dev
```

* Clean node_modules and .next directories

```bash
yarn clean
```

### Setup Env Variables (optional)

These are optional for local development, but required for some features to work.

**Create .env.local file**

```bash
touch .env.local
```

#### OpenAI API Key

~ For interacting with OpenAI API

```bash
echo 'NEXT_PUBLIC_OPENAI_API_KEY=<your-api-key-here>' >> .env.local
```

#### TipTap Pro Extension Registry

~ For using TipTap Pro Extensions

```bash
echo 'TIPTAP_PRO_REGISTRY=<your-registry-here>' >> .env.local
```

#### AWS Keys

~ For S3 Bucket

```bash
echo '_AWS_ACCESS_KEY=<your-access-key-here>' >> .env.local
echo '_AWS_SECRET_ACCESS_KEY=<your-secret-access-key-here>' >> .env.local
echo '_AWS_REGION=us-west-2' >> .env.local
echo '_AWS_BUCKET=node-previews' >> .env.local
```

## Deployement

* Deployed using [AWS Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)

## Relevant Libraries

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
  * Rich Node/Canvas/Content Editor:
    * [Tldraw](https://github.com/tldraw/tldraw)
      * [Tldraw Docs](https://tldraw.dev/docs)
  * Rich Text/Content Editor:
    * [tiptap](https://github.com/ueberdosis/tiptap)
      * [tiptap Docs](https://www.tiptap.dev/)
      * [tiptap templates](https://github.com/ueberdosis/tiptap-templates)
      * [sereneinserenade extensions](https://github.com/sereneinserenade?tab=repositories&q=tiptap&type=&language=&sort=)
  * Schema Validation:
    * [yup](https://github.com/jquense/yup)
      * [yup Docs](https://github.com/jquense/yup)
  * Queries:
    * [react-query](https://github.com/TanStack/query)
      * [react-query Docs](https://tanstack.com/query/v3/docs/react/overview)
  * State Management:
    * [zustand](https://github.com/pmndrs/zustand)
      * [zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
  * Code Syntax Highlighting:
    * [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
    * [vscDarkPlus](https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/b0d771441590ff06eda265488bbf011a0140fbf4/src/styles/prism/vsc-dark-plus.js)
  * Data Visualization:
    * [plotly.js](https://github.com/plotly/plotly.js)
      * [plotly.js Docs](https://plotly.com/javascript/)

---

* Fun:
  * [aceternity](https://www.aceternity.com/components)
  * [framer-motion](https://github.com/framer/motion)
    * [framer-motion Docs](https://www.framer.com/motion/)
  * [tsparticles](https://github.com/tsparticles/tsparticles)
* Fonts:
  * [Berkeley Mono](https://berkeleygraphics.com/typefaces/berkeley-mono/)
  * [Monaspace](https://github.com/githubnext/monaspace)
    * [Monaspace Docs](https://monaspace.githubnext.com/)
    * Variants:
      * [Argon](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceArgonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)
      * [Krypton](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceKryptonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)
      * [Neon](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceNeonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)
      * [Radon](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceRadonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)
      * [Xenon](https://github.com/githubnext/monaspace/blob/main/fonts/variable/MonaspaceXenonVarVF%5Bwght%2Cwdth%2Cslnt%5D.ttf)
  * ["Tldrawish"](https://github.com/tldraw/tldraw/tree/main/assets/fonts)
  * [Raleway](https://fonts.google.com/specimen/Raleway)
* Icons:
  * [Carbon](https://github.com/carbon-design-system/carbon)
    * [Carbon Icon Docs](https://github.com/carbon-design-system/carbon)
  * [Tldraw](https://github.com/tldraw/tldraw/tree/main/assets/icons/icon)
  * [Lucide](https://github.com/lucide-icons/lucide)
    * [Lucide Icon Docs](https://lucide.dev/icons/)
  * [Radix](https://github.com/radix-ui/icons)
    * [Radix Icon Docs](https://www.radix-ui.com/icons)
  * [Logos](https://github.com/gilbarbara/logos)

---

### Pages

**Domain Aliases:**
* https://gradient-guru.com
* https://gradient-guru.org
* https://gradient-guru.net
* https://gradient-guru.dev

**Routes**

* [`/`](https://gradient-guru.com)
  * [`/compute`](https://gradient-guru.com/compute)
  * [`/demos`](https://gradient-guru.com/demos)
    * [`/make-a-ui`](https://gradient-guru.com/demo/make-a-ui)
    * [`/make-a-game`](https://gradient-guru.com/demo/make-a-game)
    * [`/learn-something-new`](https://gradient-guru.com/demo/learn-something-new)
  * [`/share`](https://gradient-guru.com/share) redirects to [`/`](https://gradient-guru.com/)
    * [`[id]`](https://gradient-guru.com/share/aaaaa): where `[id]`  is the `id` of a `PreviewNode`. `PreviewNode`s are generated every forward pass of the model where html is generated. The content is saved in s3, associated by the id of the node which is used to generate the share link. The share link page itself simply retrieves the content from s3 and renders it on the page. The `PreviewNode` when in the tldraw whiteboard iframes embeds the share link page hence the name `PreviewNode`.

**Testing Routes**

Used for the initial testing of components and features. Just leaving these in cause why not

* [`/tests`](https://gradient-guru.com/tests)
  * [`/buttons`](https://gradient-guru.com/tests/buttons)
  * [`/chat`](https://gradient-guru.com/tests/chat)
  * [`/fonts`](https://gradient-guru.com/tests/fonts)
  * [`/form`](https://gradient-guru.com/tests/form)
  * [`/fun`](https://gradient-guru.com/tests/fun)
  * [`/icon-sets`](https://gradient-guru.com/tests/icon-sets)
  * [`/palettes`](https://gradient-guru.com/tests/palettes)
  * [`/plotly`](https://gradient-guru.com/tests/plotly)
  * [`/primitives`](https://gradient-guru.com/tests/primitives)
    * [`/accordion`](https://gradient-guru.com/tests/primitives/accordion)
    * [`/checkbox`](https://gradient-guru.com/tests/primitives/checkbox)
    * [`/dropdown`](https://gradient-guru.com/tests/primitives/dropdown)
    * [`/flip-card`](https://gradient-guru.com/tests/primitives/flip-card)
    * [`/kbd`](https://gradient-guru.com/tests/primitives/kbd)
    * [`/menubar`](https://gradient-guru.com/tests/primitives/menubar)
    * [`/progress`](https://gradient-guru.com/tests/primitives/progress)
    * [`/radix-themed-components`](https://gradient-guru.com/tests/primitives/radix-themed-components)
    * [`/side-panel`](https://gradient-guru.com/tests/primitives/side-panel)
    * [`/slider`](https://gradient-guru.com/tests/primitives/slider)
    * [`/switch`](https://gradient-guru.com/tests/primitives/switch)
    * [`/textarea`](https://gradient-guru.com/tests/primitives/textarea)
    * [`/tooltip`](https://gradient-guru.com/tests/primitives/tooltip)
  * [`/syntax-highlighter`](https://gradient-guru.com/tests/syntax-highlighter)
  * [`/terminal`](https://gradient-guru.com/tests/terminal)
  * [`/tiptap`](https://gradient-guru.com/tests/tiptap)
  * [`/tldraw`](https://gradient-guru.com/tests/tldraw)

### Directory Structure

TODO: Finish filling this out

Structured as a standard Next.js app (app router):

```
.env.local                        # Local Environment Variables
.npmrc                            # NPM Config needed to link TipTap Pro Extensions Registry
amplify.yml                       # Amplify Config for site deployment
next.config.js                    # Next.js Config with every option customized or set to what their default values are per the docs
tailwind.config.js                # Tailwind Config
|-- app/                          # Nextjs App Router (Note: By default, components inside app are React Server Components.)
|-- assets/                       # Static Assets
|   |-- fonts/                    # Fonts
|   |-- icons/                    # Icons
|   |-- images/                   # Images
|-- clients/                      # Client APIs
|  |-- AWS                        # AWS Clients
|  |  |-- S3                      # S3
|  |-- Model                      # AI/ML Model Clients
|  |  |-- BaseClient              # Base Client which all other clients extend to inherit from
|  |  |-- OpenAI                  # OpenAI Client
|-- components/                   # React Components
|  |-- Buttons/                   # Generic commonly used buttons
|  |-- Chat/                      # Chat and Chat-related components (ChatMessage, ChatBubble, etc.)
|  |-- Flow/                      # "Flow" is an arbitrary alias for Tldraw to avoid confusion from name conflicts with tldraw
|  |-- Fun/                       # Random Fun components
|  |-- Icons/                     # Icons and Icon-related components
|  |-- PageLink/                  # PageLink component
|  |-- Plotly/                    # Plotly wrapper component
|  |-- Primitives/                # Radix and other low level primitives which serve as buildling blocks for other components
|  |-- Terminal/                  # Terminal-like code block component
|  |-- Tiptap/                    # Top level Tiptap component which integrates most of the publicly available extensions + some custom ones
|-- hooks/                        # React Hooks
|  |-- useChat/                   # Chat-related hooks
|  |-- useFlow/                   # "Flow"-related hooks
|  |-- useModel/                  # AI/ML Model-related hooks
|  |-- useActionKey/              # Implements a global action key hook which allows for global keybindings
|  |-- useApi/                    # API for interacting with server side (apis defined in `app/api`)
|  |-- useDebugger/               # Debugger hook provided at the top level of the app
|  |-- useDownloader/             # Controls DownloadButton functionality
|  |-- useFormField/              # Controls fields in Form component
|  |-- useIsoMorphicLayoutEffect/ # Generic useLayoutEffect hook which works on both client and server side
|  |-- useMounted/                # Generic useMounted hook which returns whether or not a component has been mounted
|  |-- usePlotly/                 # Controls Plotly component
|  |-- usePosition/               # Flexible and Customizable hook to track mouse/pointer position
|  |-- useRippleEffect/           # Ripple effect mimics MUI ripple click effect
|  |-- useThemePanel/             # Controls radix-theme ThemePanel component
|  |-- useTiptap/                 # Controls Tiptap component
|  |-- useToasts/                 # Controls Toasts component provided at the top level of the app
|  |-- useViewport/               # Generic useViewport hook which returns the current viewport dimensions
|-- packages/                     # Third Party Packages which are embed
|  |-- tldraw/                    # Emebed Tldraw Package
|-- public/                       # Public Assets
|-- scripts/                      # Random/Misc Scripts Directory
|-- utils/                        # Utility (Codedump) Directory
``````
