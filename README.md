# gradient-guru

<div style="display: flex; align-items: center; justify-content: center; gap:4px; height:100%;">

[![Buy Me A Coffee](https://img.buymeacoffee.com/button-api/?text=Buy%20me%20compute&emoji=🧠&slug=bebeal&button_colour=008cff&font_colour=ffffff&font_family=Inter&outline_colour=ffffff&coffee_colour=FFDD00)](https://www.buymeacoffee.com/bebeal)

 <a href="https://github.com/sponsors/bebeal">
    <img src="https://img.shields.io/badge/sponsor-30363D?style=for-the-badge&logo=GitHub-Sponsors&logoColor=#white" />        
  </a>

</div>

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

* Clean `node_modules` and `.next` directories

```bash
yarn clean
```

### Setup Env Variables (optional)

* These are optional for local development, but required for some features to work.
* For prod deployment the `amplify.yml` build script will use the env variables defined in the Amplify App Console and inject them into `.env.production`

**Create .env.local file**

```bash
touch .env.local
```

#### Add OpenAI API Key

* For interacting with OpenAI API
* `NEXT_PUBLIC_` is required for the key to be accessible on the client side

```bash
echo 'NEXT_PUBLIC_OPENAI_API_KEY=<your-api-key-here>' >> .env.local
```

#### Add TipTap Pro Extension Registry

* For using TipTap Pro Extensions
* Used by `.npmrc` to link to the pro registry which requires a tiptap account: https://cloud.tiptap.dev/pro-extensions

```bash
echo 'TIPTAP_PRO_REGISTRY=<your-registry-here>' >> .env.local
```

#### Add AWS Keys

* Needed for AWS Clients (S3)
* Not exposed to the client side, only accessed by the server side api routes

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

```bash
.env.local                                 # Local Environment Variables
.npmrc                                     # NPM Config needed to link TipTap Pro Extensions Registry
amplify.yml                                # Amplify Config for site deployment
next.config.js                             # Next.js Config with every option customized or set to what their default values are per the docs
tailwind.config.js                         # Tailwind Config
|-- app/                                   # Nextjs App Router (Note: By default, components inside app are React Server Components.)
|   |-- api/                               # Server Side API Routes
|   |  |-- getS3/                          # Route for fetching content from S3
|   |  |-- putS3/                          # Route for uploading content to S3
|   |-- compute/                           # `/compute` Route
|   |-- demos/                             # `/demos` Route
|   |-- share/                             # `/share` Route
|   |-- tests/                             # `/tests` Route
|   |-- global.css                         # Global CSS injected at the top level of the app
|   |-- layout.tsx                         # defines the top level layout of the app
|   |-- page.tsx                           # `/` Route
|   |-- providers.tsx                      # defines the top level providers of the app injected into the layout
|-- assets/                                # Static Assets
|   |-- fonts/                             # Fonts
|   |-- icons/                             # Icons
|   |-- images/                            # Images
|-- clients/                               # Client APIs
|  |-- AWS/                                # AWS Clients
|  |  |-- S3.ts                            # S3
|  |-- Model/                              # AI/ML Model Clients
|  |  |-- BaseClient.ts                    # Base Client which all other clients extend to inherit from
|  |  |-- OpenAI.ts                        # OpenAI Client
|-- components/                            # All Components
|  |-- Buttons/                            # Generic commonly used buttons
|  |  |-- BuyMeComputeButton.tsx
|  |  |-- CopyButton.tsx
|  |  |-- DownloadButton.tsx
|  |  |-- ThemeToggle.tsx
|  |-- Chat/                               # Chat and Chat-related components (ChatMessage, ChatBubble, etc.)
|  |  |-- Chat.tsx
|  |  |-- ChatBubble.tsx
|  |  |-- ChatList.tsx
|  |  |-- ChatMessage.tsx
|  |  |-- ChatStatus.tsx
|  |-- Flow/                               # "Flow" is an arbitrary alias for Tldraw to avoid (lol...) confusion from naming conflicts with tldraw
|  |  |-- Extensions/                     # All "Flow"-related components used in Flow/FlowUI
|  |  |  |-- DropWrapper.tsx              # Wrapper around the canvas that provides drag'n'drop functionality for ScratchPanel
|  |  |  |-- FlowCursor.tsx               # Cursor used by the "bot" (BotController) to interact with Flow
|  |  |  |-- FlowFormItem.tsx             # Overrides for what to render in the Form component
|  |  |  |-- ScratchPanel.tsx             # Panel that provides drag'n'drop functionality for adding custom nodes to Flow
|  |  |  |-- shared.ts                    # Shared types, constants, functions, etc. used by all "Flow"-related components
|  |  |  |-- TestButtons.tsx              # Buttons added to the debug panel dropdown to test various features
|  |  |  |-- TimelineScrubber             # TimelineScrubber is a slider which allows the user to scrub through the history of changes of Flow
|  |  |-- Nodes/                          # Custom nodes (aka "shapes") for Flow
|  |  |  |-- PreviewNode/                 # PreviewNode is a special node which is used to generate share links and embed html content generated from Models
|  |  |  |  |-- PreviewNode.tsx
|  |  |  |  |-- PreviewNodeDropdown.tsx   # Dropdown menu for the preview node for external links, copy link, etc
|  |  |  |-- FlowNode.tsx                 # Abstract Node which all other custom nodes extend from, adds default functionality for previewing nodes in the ScratchPanel, ability to define custom schemas, etc
|  |  |  |-- IconNode.tsx                 # Icon Node which leverages IconSetCache to render a single icon from any iconset
|  |  |  |-- PlotlyNode.tsx               # Node which renders `Plotly` component
|  |  |  |-- TerminalNode.tsx             # Node which renders `Terminal` component
|  |  |  |-- TipTapNode.tsx               # Node which renders `Tiptap` component
|  |  |-- FlowSidePanel/                  # SidePanel for Flow which is a vertically tabbed vscode-like panel 
|  |  |  |-- ExtractionTab.tsx
|  |  |  |-- FlowSidePanel.tsx
|  |  |  |-- HistoryTab.tsx
|  |  |  |-- ModelTab.tsx
|  |  |  |-- NodesTab.tsx
|  |  |-- Flow.css                        # Overrides for default Tldraw styles
|  |  |-- Flow.tsx                        # "Flow" which parallels Tldraws "Tldraw" component (composed of the TldrawEditor + FlowUi)
|  |  |-- FlowUI.tsx                      # "FlowUI" component which parallels Tldraws "TldrawUI" component
|  |-- Fun/                                # Random Fun components
|  |  |-- Aceternity/                      # Modified components originally from https://www.aceternity.com/components
|  |  |-- Custom/
|  |-- Highlighter/                        # Code Syntax Highlighter components
|  |  |-- SyntaxStyles/
|  |  |  |-- CustomSyntaxStyle             # Modified version of vscDarkPlus
|  |  |-- Highlighter.tsx                  # Wrapper component for react-syntax-highlighter
|  |-- Icons/                              # Icons and Icon-related components
|  |  |-- CustomIcons/                     # JSX SVGs
|  |  |-- IconSets/                        # All Icon Sets loaded into IconSetCache
|  |  |  |-- Carbon.tsx
|  |  |  |-- CodeLanguages.tsx
|  |  |  |-- Custom.tsx
|  |  |  |-- Logos.tsx
|  |  |  |-- Lucide.tsx
|  |  |  |-- Radix.tsx
|  |  |  |-- Tldraw.tsx
|  |  |-- Icon.tsx                         # Generic Icon component
|  |  |-- IconSetCache.ts                  # IconSetCache which loads all Icon Sets and is the main interface for Icon components (example use is <IconSetCache.Carbon.MachineLearning {...props} />)
|  |-- PageLink/                           # Page/ID related components used for `share/[id]` route
|  |  |-- PageLink.tsx                     # Fetches content from S3 based on the given id and version and passes the content to PageId
|  |  |-- PageId.tsx                       # Renders the content passed to it in an iframe
|  |-- Plotly/                             # Plotly wrapper component
|  |  |-- Plotly.tsx
|  |-- Primitives/                         # Radix and other low level primitives which serve as buildling blocks for other components
|  |  |-- Toast/
|  |  |  |-- Toast.tsx
|  |  |  |-- Toasts.tsx
|  |  |  |-- ToastsViewport.tsx
|  |  |-- Accordion.tsx
|  |  |-- Button.tsx
|  |  |-- Checkbox.tsx
|  |  |-- Dropdown.tsx
|  |  |-- FlipCard.tsx
|  |  |-- HoverCard.tsx
|  |  |-- Input.tsx
|  |  |-- Kbd.tsx
|  |  |-- Label.tsx
|  |  |-- Menubar.tsx
|  |  |-- Panel.tsx
|  |  |-- Progress.tsx
|  |  |-- Select.tsx
|  |  |-- Separator.tsx
|  |  |-- SidePanel.tsx
|  |  |-- Slider.tsx
|  |  |-- Switch.tsx
|  |  |-- Textarea.tsx
|  |  |-- Toolbar.tsx
|  |  |-- Tooltip.tsx
|  |-- Terminal/                           # Terminal-like code block component
|  |  |-- Terminal.tsx
|  |-- Tiptap/                             # All Tiptap-related components
|  |  |-- Extensions/                      # Configures all of the publicly available extensions for Tiptap + defines custom extensions
|  |  |  |-- ColorChips.ts                 # Converts hex color codes to color chips
|  |  |  |-- Comments.tsx                  # Adds commenting functionality to the editor
|  |  |  |-- EmojiList.tsx                 # Used in EmojiSuggestions
|  |  |  |-- EmojiSuggestions.tsx          # Adds emoji suggestions/search
|  |  |  |-- Extensions.ts                 # All extensions loaded into `Extensions` object
|  |  |  |-- Katex.tsx                     # Adds mathematical typesetting via Katex
|  |  |  |-- MentionList.tsx               # Used in MentionSuggestions
|  |  |  |-- MentionListSuggestions.tsx    # Adds @mention suggestions/search
|  |  |  |-- ReactComponent.tsx            # Adds React Component Node for embedding React Components in the tiptap editor
|  |  |  |-- Snippets.tsx                  # Adds snippets functionality which 
|  |  |  |-- TerminalBlock.tsx             # Adds terminal-like code block functionality which leverage `Terminal` component
|  |  |  |-- TextReplacements.tsx          # Adds text replacement functionality which will automatically replace specifically defined input sequences with glyphs and/or emojis
|  |  |  |-- TOC.tsx                       # Adds table of contents functionality
|  |  |  |-- Video.tsx                     # Sereneinserenade's Video extension which adds video embed functionality
|  |  |-- Tiptap.tsx                       # Wrapper component for Tiptap
|  |  |-- TiptapToolbar.tsx                # Toolbar component optionally stickied to the top of `Tiptap` component
|-- hooks/                                 # React Hooks
|  |-- useChat/                            # For managing `Chat` component
|  |  |-- useChat.ts
|  |-- useFlow/                            # "Flow"-related hooks
|  |  |-- useBotController.tsx             # Controls a bot which interacts with Flow by acting as an external user with its own cursor, messages, etc.
|  |  |-- useContentExtractor.tsx          # Extracts content from Flow (Used as input to model)
|  |  |-- useContentRecorder.tsx           # Records content from Flow (the current `uiState` which is essentially the current tool state, `canvasEvent` which is the last emitted canvas event, and `historyRecords` which records document changes made by the user and is used to undo/redo, within the TimelineScrubber, etc.)
|  |  |-- useImagePreview.tsx              # Fetches a "preview" version of the image which would be extracted from Flow and used as input to the model
|  |  |-- useNodesPreview.tsx              # Fetches a "preview" version of the JSON properties of nodes which would be extracted from Flow and used as input to the model
|  |  |-- useScratchPanel.tsx              # Controls the ScratchPanel component which is a panel that provides drag'n'drop functionality for adding custom nodes to Flow. Nodes can customized what their preview inside the panel is by overriding the `panelPreview` function.
|  |-- useModel/                           # AI/ML Model-related hooks
|  |  |-- useModel.tsx
|  |  |-- shared.ts                        # Shared types, constants, functions, etc. used by all models
|  |-- useActionKey.ts                     # Implements a global action key hook which allows for global keybindings
|  |-- useApi.ts                           # API for interacting with server side (apis defined in `app/api`)
|  |-- useDebugger.ts                      # Debugger hook provided at the top level of the app
|  |-- useDownloader.ts                    # Controls DownloadButton functionality
|  |-- useFormField.ts                     # Controls fields in Form component
|  |-- useIsomorphicLayoutEffect.tsx       # Generic useLayoutEffect hook which works on both client and server side
|  |-- useMounted.ts                       # Generic useMounted hook which returns whether or not a component has been mounted
|  |-- usePlotly.ts                        # Controls Plotly component
|  |-- usePosition.ts                      # Flexible and Customizable hook to track mouse/pointer position
|  |-- useRippleEffect.ts                  # Ripple effect mimics MUI ripple click effect
|  |-- useThemePanel.ts                    # Controls radix-theme ThemePanel component
|  |-- useTiptap.ts                        # Controls Tiptap component
|  |-- useToasts.ts                        # Controls Toasts component provided at the top level of the app
|  |-- useViewport.ts                      # Generic useViewport hook which returns the current viewport dimensions
|-- packages/                              # Third Party Packages which are embed
|  |-- tldraw/                             # Emebed Tldraw Package
|-- public/                                # Public Assets
|-- scripts/                               # Random/Misc Scripts Directory
|-- utils/                                 # Utility (Codedump) Directory
|  |-- prompts/                            # Prompts for working with LLMs
|  |  |-- MakeReal.tsx                     # "Make Real" prompt from https://github.com/tldraw/make-real
|  |  |-- GenericCanvasAgent.tsx           # Generic Canvas Agent prompt
|  |  |-- shared.ts                        # Shared types, constants, functions, etc. used by all prompts
|  |-- tests/                              # Jest Unit Tests
|  |-- animate-tailwindcss.js              # Modified version of `tailwindcss-animate` from https://github.com/jamiebuilds/tailwindcss-animate/blob/main/index.js
|  |-- colors.ts                           # Generic color utils
|  |-- constants.ts                        # Global Constants
|  |-- device.ts                           # Defines functions to determine info about the client device
|  |-- export.ts                           # Generic export utils originally based on https://github.com/tldraw/tldraw/blob/main/packages/tldraw/src/lib/utils/export/export.ts
|  |-- filesystem.ts                       # For interacting with a filesystem (calculating size and other meta data)
|  |-- host.ts                             # Defines static info about the host (e.g. environment, port, etc.)
|  |-- keymap.ts                           # Defines keybinding mappings
|  |-- links.ts                            # For generating links to external sites (Codepen, CodeSandbox, Replit, StackBlitz, etc)
|  |-- MapCache.ts                         # Simple weakmap cache for objects 
|  |-- math.ts                             # Generic Math utils
|  |-- png.ts                              # Generic png utils from https://github.com/tldraw/tldraw/blob/01ab3604d0d1ce8772e671f15d0bb4c329443c4c/packages/utils/src/lib/png.ts#L61
|  |-- regex.ts                            # Generic regex definitions
|  |-- StyledComponentsRegistry            # StyledComponentsRegistry used to integrate styled-components with NextJS, injected at the top level of the app
|  |-- svg.ts                              # Generic svg utils
|  |-- utils.ts                            # Generic utils
```
