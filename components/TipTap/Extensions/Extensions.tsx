'use client'

import { nanoid } from '@/utils';
import { SearchAndReplace } from '@sereneinserenade/tiptap-search-and-replace';
import Details from '@tiptap-pro/extension-details';
import DetailsContent from '@tiptap-pro/extension-details-content';
import DetailsSummary from '@tiptap-pro/extension-details-summary';
import Emoji, { gitHubEmojis } from '@tiptap-pro/extension-emoji';
import FileHandler from '@tiptap-pro/extension-file-handler';
import InvisibleCharacters, { HardBreakNode } from '@tiptap-pro/extension-invisible-characters';
import { TableOfContent } from '@tiptap-pro/extension-table-of-content';
import UniqueID from '@tiptap-pro/extension-unique-id';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import BulletList from '@tiptap/extension-bullet-list';
import CharacterCount from '@tiptap/extension-character-count';
import Code from '@tiptap/extension-code';
import { Color } from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import DropCursor from '@tiptap/extension-dropcursor';
import Focus from '@tiptap/extension-focus';
import FontFamily from '@tiptap/extension-font-family';
import Gapcursor from '@tiptap/extension-gapcursor';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import History from '@tiptap/extension-history';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import ListKeymap from '@tiptap/extension-list-keymap';
import Mention from '@tiptap/extension-mention';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { Node } from '@tiptap/pm/model';
import { Markdown as MarkdownExtension } from 'tiptap-markdown';
import { ColorChips } from './ColorChips';
import { EmojiSuggestion } from './EmojiSuggestion';
import { MentionListSuggestion } from './MentionListSuggestion';
import { ReactComponent } from './ReactComponent';
import { Snippets } from './Snippets';
import { TextReplacements } from './TextReplacements';
import { Video } from './Video';
import { TerminalBlock } from './TerminalBlock';
import KatexExtension from './Katex';

import 'katex/dist/katex.min.css';
import 'tiptap-extension-upload-image/dist/upload-image.min.css';

// import { EmojiList } from './EmojiList';
// import { Comments } from './Comments';
// import { TOC } from './TOC';

/**
 * =================================
 *         CUSTOM EXTENSIONS
 * =================================
 * CUSTOM EXTENSIONS: Custom Extensions sourced from this repo
 * - [TextReplacements]: The TextReplacements extension allows you to replace certain characters with others. For example, you can replace three dots with an ellipsis character.
 * - [ColorHighlighter]: Replaces color codes with color chips
 * - [ReactComponent]: The ReactComponent extension allows you to add react components to your editor. It also provides a suggestion dropdown to select a component.
 */
const CustomExtensions = {
  TextReplacements,
  ColorChips,
  ReactComponent,
  TerminalBlock
};

/**
 * =================================
 *     THIRD PARTY EXTENSIONS
 * =================================
 * THIRD PARTY EXTENSIONS: Third party extensions are extensions that are not directly maintained by tiptap.
 * - [SearchAndReplace]: The SearchAndReplace extension allows you to search and replace text in the editor. It’s a simple search and replace functionality.
 * - [Video]: The Video extension allows you to add videos to your editor. It also provides a suggestion dropdown to select a video.
 * - [Snippets]: The Snippets extension allows you to insert snippets into your editor. It also provides a suggestion dropdown to select a snippet.
 * 
 */
const ThirdPartyExtensions = {
  SearchAndReplace: SearchAndReplace.configure({
    searchResultClass: "search-result",
    caseSensitive: false,
    disableRegex: false,
  }),
  Video,
  Snippets,
};

/**
 * =================================
 *          PRO EXTENSIONS
 * =================================
 * PRO EXTENSIONS: To install these extension you need access to tiptaps private registry, set this up first.
 * - [Comments]: The Comments extension allows you to add comments to your editor. It also provides a comment bubble to show the number of comments in the editor.
 * - [Details, DetailsContent, DetailsSummary]: The Details extension enables you to use the <details> HTML tag in the editor. This is great to show and hide content.
 * - [Emoji]: The Emoji extension renders emojis as an inline node. All inserted (typed, pasted, etc.) emojis will be converted to this node. The benefit of this is that unsupported emojis can be rendered with a fallback image. As soon as you copy text out of the editor, they will be converted back to plain text.
 * - [FileHandler]: The FileHandler extension allows you to easily handle file drops and pastes in the editor. You can define custom handlers for both events & manage allowed file types.
 * - [InvisibleCharacters]: This extension adds decorators to show non-printable characters and help you increase accessibility.
 * - [Mathematics]: This extension allows you to write and visualize even complex mathematical formulas or equations in your editor. Please note that the current version is still in a very basic stage.
 * - [TableOfContent]: The TableOfContents extension lets you get a list of anchors from your document and passes on important information about each anchor (for example the depth, the content and a unique ID for each heading but also the active state and scroll states for each anchor). This can be used to render the table of content on your own.
 * - [UniqueID]: The UniqueID extension adds unique IDs to all nodes. The extension keeps track of your nodes, even if you split them, merge them, undo/redo changes, crop content, paste content … It just works. (Also, you can configure which node types get an unique ID, and which not, and you can customize how those IDs are generated).
 */
const ProExtensions = {
  Details: Details.configure({
    persist: true,                                 // Specify if the open status should be saved in the document. Defaults to false.
    openClassName: 'is-open',                      // Specifies a CSS class that is set when toggling the content. Defaults to is-open.
  }),
  DetailsContent,
  DetailsSummary,
  Emoji: Emoji.configure({
    enableEmoticons: true,
    emojis: gitHubEmojis,
    forceFallbackImages: false,
    suggestion: EmojiSuggestion,
  }),
  FileHandler: FileHandler.configure({
    onPaste: (editor: any, files: any, htmlContent: any) => {
      console.log('Paste not implemented yet', files, htmlContent);
    },
    onDrop: (editor: any, files: any, pos: any) => {
      console.log('Drop not implemented yet', files, pos);
    },
    allowedMimeTypes: undefined
  }),
  InvisibleCharacters: InvisibleCharacters.configure({
    visible: true,                                 // Define default visibility.
    builders: [new HardBreakNode()],               // An array of invisible characters – by default it contains: spaces, hard breaks and paragraphs.
    injectCSS: true,                               // By default, the extension injects some CSS. With injectCSS you can disable that.
    injectNonce: undefined,                        // When you use a Content-Security-Policy with nonce, you can specify a nonce to be added to dynamically created elements.
  }),
  KatexExtension: KatexExtension.configure({
    katexOptions: undefined,                       // For the math typesetting the extension uses the third party library KaTeX. To adjust its behaviour, you can pass KaTeX options to it. Find all of them https://katex.org/docs/options.html.
  }),
  TableOfContent: TableOfContent.configure({
    headingType: 'heading',                        // The type of the heading node you want to use for your Table of Content. By default this is heading but in case you create your own custom Heading extension OR extend the existing one and use a different name, you can pass that name here.
    getId: () => nanoid(),                         // A builder function that returns a unique ID for each heading. Inside the argument you get access to the headings text content (for example you want to generate IDs based on the text content of the heading).By default this is a function that uses the uuid package to generate a unique ID.
    scrollParent: typeof window !== 'undefined' ? window : undefined,                         // The scroll parent you want to attach to. This is used to determine which heading currently is active or was already scrolled over. By default this is the window but you can pass any HTML element here.
    onUpdate: (content: any) => {                  // The most important option that you must set to use this extension. This is a callback function that gets called whenever the Table of Content updates. You get access to an array of heading data (see below) which you can use to render your own Table of Content. To render the table of content you can render it by any means you want. You can use a framework like Vue, React or Svelte or you can use a simple templating engine like Handlebars or Pug. You can also use a simple document.createElement to render the table of content. You can pass a second argument to get the information whether this is the initial creation step for the ToC data.
      // setItems(content)
    },
  }),
  UniqueID: UniqueID.configure({
    attributeName: 'id',                           // Name of the attribute that is attached to the HTML tag (will be prefixed with data-).
    types: [],                                     // All types that should get a unique ID, for example ['heading', 'paragraph']
    generateID: () => nanoid(),                    // A function that generates and returns a unique ID.
    filterTransaction: null,                       // Ignore some mutations, for example applied from other users through the collaboration plugin.
  }),
};

/**
 * =================================
 *       NODE EXTENSIONS
 * =================================
 * NODE EXTENSIONS: Node extensions are used to add new nodes to the editor. They are usually used to add block level nodes like paragraphs, headings, lists, etc.
 * - [Blockquote]: The Blockquote extension allows you to use the <blockquote> HTML tag in the editor.
 * - [BulletList]: The BulletList extension allows you to use the <ul> HTML tag in the editor.
 * - [CodeBlock]: The CodeBlock extension allows you to use the <pre> and <code> HTML tags in the editor.
 * - [Document]: The Document extension is the root node of your editor. It’s required to create a valid editor.
 * - [HardBreak]: The HardBreak extension allows you to use the <br> HTML tag in the editor.
 * - [Heading]: The Heading extension allows you to use the <h1> to <h6> HTML tags in the editor.
 * - [HorizontalRule]: The HorizontalRule extension allows you to use the <hr> HTML tag in the editor.
 * - [Image]: The Image extension allows you to use the <img> HTML tag in the editor.
 * - [ListItem]: The ListItem extension allows you to use the <li> HTML tag in the editor.
 * - [OrderedList]: The OrderedList extension allows you to use the <ol> HTML tag in the editor.
 * - [Paragraph]: The Paragraph extension allows you to use the <p> HTML tag in the editor.
 * - [Mention]: The Mention extension allows you to insert mentions into your editor. It also provides a suggestion dropdown to select a mention.
 * - [Table]: The Table extension allows you to use the <table> HTML tag in the editor.
 * - [TableCell]: The TableCell extension allows you to use the <td> HTML tag in the editor.
 * - [TableHeader]: The TableHeader extension allows you to use the <th> HTML tag in the editor.
 * - [TableRow]: The TableRow extension allows you to use the <tr> HTML tag in the editor.
 * - [TaskItem]: The TaskItem extension allows you to use the <input type="checkbox"> HTML tag in the editor.
 * - [TaskList]: The TaskList extension allows you to use the <ul> HTML tag in the editor.
 * - [Text]: The Text extension allows you to use the <span> HTML tag in the editor.
 * - [Youtube]: The Youtube extension allows you to use the <iframe> HTML tag in the editor.
 */
const NodeExtensions = {
  Blockquote: Blockquote,
  BulletList: BulletList.configure({
    itemTypeName: "listItem",                      // Specify the list item name
    keepMarks: true,                               // Decides whether to keep the marks from a previous line after toggling the list either using inputRule or using the button
    keepAttributes: false,                         // Decides whether to keep the attributes from a previous line after toggling the list either using inputRule or using the button
  }),
  Document: Document,
  HardBreak: HardBreak.configure({
    keepMarks: false,                              // Decides whether to keep marks after a line break. Based on the keepOnSplit option for marks.
  }),
  Heading: Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],                    // Specifies which heading levels are supported.
  }),
  HorizontalRule: HorizontalRule.configure({
    HTMLAttributes: {
      class: 'm-0 mb-[1.25em]',  
    },
  }),
  Image: Image.configure({
    inline: true,                                  // Renders the image node inline, for example in a paragraph tag: <p><img src="spacer.gif"></p>. By default images are on the same level as paragraphs.
    allowBase64: true,                             // Allow images to be parsed as base64 strings <img src="data:image/jpg;base64...">.
  }),
  ListItem: ListItem,
  OrderedList: OrderedList.configure({
    HTMLAttributes: {
      class: 'marker:text-xs',
    },
    itemTypeName: "listItem",                      // Specify the list item name
    keepMarks: true,                               // Decides whether to keep the marks from a previous line after toggling the list either using inputRule or using the button
    keepAttributes: false,                         // Decides whether to keep the attributes from a previous line after toggling the list either using inputRule or using the button
  }),
  Paragraph,
  Mention: Mention.configure({
    renderLabel({ options, node }) {               // Define how a mention label should be rendered.
      return `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`
    },
    suggestion: MentionListSuggestion
  }),
  Table: Table.configure({
    resizable: true,
    handleWidth: 5,
    cellMinWidth: 25,
    lastColumnResizable: true,
    allowTableNodeSelection: false
  }),
  TableCell,
  TableHeader,
  TableRow,
  TaskItem: TaskItem.configure({
    HTMLAttributes: {
      class: 'flex flex-row items-center justify-center gap-2 w-auto h-auto m-0 p-0 [&>p]:m-0 [&>div]:m-0 [&>label]:m-0 [&>p]:flex [&>div]:flex [&>label]:flex'
    },
    nested: true,                                  // Whether the task items are allowed to be nested within each other.
    onReadOnlyChecked: (node: Node, checked: boolean): boolean => {
      return false;                                // A handler for when the task item is checked or unchecked while the editor is set to readOnly. If this is not supplied, the task items are immutable while the editor is readOnly. If this function returns false, the check state will be preserved (readOnly).
    },
  }),
  TaskList: TaskList.configure({
    HTMLAttributes: {
      class: `flex flex-col gap-1 items-start w-auto h-auto justify-center m-0 p-0`
    },
    itemTypeName: 'taskItem',                     // Specify the list item name
  }),
  Text,
  Youtube: Youtube.configure({
    inline: false,                                 // Controls if the node should be handled inline or as a block.
    width: 480,                                    // Controls the default width of added videos
    height: 320,                                   // Controls the default height of added videos
    controls: true,                                // Enables or disables YouTube video controls
    nocookie: false,                               // Enables the nocookie mode for YouTube embeds
    allowFullscreen: true,                         // Allows the iframe to be played in fullscreen
    autoplay: false,                               // Allows the iframe to to start playing after the player is loaded,
    ccLanguage: undefined,                         // Specifies the default language that the player will use to display closed captions. Set the parameter's value to an ISO 639-1 two-letter language code. For example, setting it to es will cause the captions to be in spanish
    ccLoadPolicy: false,                           // Setting this parameter's value to true causes closed captions to be shown by default, even if the user has turned captions off
    disableKBcontrols: false,                      // Disables the keyboards controls for the iframe player
    enableIFrameApi: false,                        // Enables the player to be controlled via IFrame Player API calls
    origin: '',                                    // This parameter provides an extra security measure for the IFrame API and is only supported for IFrame embeds. If you are using the IFrame API, which means you are setting the enableIFrameApi parameter value to true, you should always specify your domain as the origin parameter value.
    endTime: 0,                                    // This parameter specifies the time, measured in seconds from the start of the video, when the player should stop playing the video. For example, setting it to 15 will make the video stop at the 15 seconds mark
    interfaceLanguage: undefined,                  // Sets the player's interface language. The parameter value is an ISO 639-1 two-letter language code. For example, setting it to fr will cause the interface to be in french
    ivLoadPolicy: 0,                               // Setting this to 1 causes video annotations to be shown by default, whereas setting to 3 causes video annotations to not be shown by default
    loop: false,                                   // This parameter has limited support in IFrame embeds. To loop a single video, set the loop parameter value to true and set the playlist parameter value to the same video ID already specified in the Player API URL.
    playlist: '',                                  // This parameter specifies a comma-separated list of video IDs to play.
    modestBranding: false,                         // Disables the Youtube logo on the control bar of the player. Note that a small YouTube text label will still display in the upper-right corner of a paused video when the user's mouse pointer hovers over the player
    progressBarColor: undefined,                   // This parameter specifies the color that will be used in the player's video progress bar. Note that setting the color parameter to white will disable the modestBranding parameter
  }),
};

/**
 * =================================
 *      MARK EXTENSIONS
 * =================================
 * MARK EXTENSIONS: Mark extensions are used to add new marks to the editor. They are usually used to add inline styles like bold, italic, underline, etc.
 * - [Bold]: The Bold extension allows you to use the <strong> HTML tag in the editor.
 * - [Code]: The Code extension allows you to use the <code> HTML tag in the editor.
 * - [Highlight]: The Highlight extension allows you to highlight text with a color. You can define a list of colors and use them to highlight text.
 * - [Italic]: The Italic extension allows you to use the <em> HTML tag in the editor.
 * - [Link]: The Link extension allows you to use the <a> HTML tag in the editor.
 * - [Strike]: The Strike extension allows you to use the <s> HTML tag in the editor.
 * - [Subscript]: The Subscript extension allows you to use the <sub> HTML tag in the editor.
 * - [Superscript]: The Superscript extension allows you to use the <sup> HTML tag in the editor.
 * - [TextStyle]: The TextStyle extension allows you to use the <span> HTML tag in the editor.
 * - [Underline]: The Underline extension allows you to use the <u> HTML tag in the editor.
 * 
 */
const MarkExtensions = {
  Bold,
  Code: Code.configure({
    HTMLAttributes: {
      class: 'text-[#d4d4d4] bg-[#1e1e1e] after:content-none before:content-none px-1 py-[0.5px] rounded',
    },
  }),
  Highlight: Highlight.extend({
    priority: 1000,                          
  }).configure({
    multicolor: true  
  }),
  Italic: Italic,
  Link: Link.configure({
    autolink: true,                           // If enabled, it adds links as you type.
    protocols: [                              // Additional custom protocols you would like to be recognized as links.
      'ftp', 
      'mailto',     
      { 
        scheme: 'tel',                        // By default, linkify adds // to the end of a protocol
        optionalSlashes: true                 // however this behavior can be changed by passing optionalSlashes option
      }
    ],
    openOnClick: true,                        // If enabled, links will be opened on click.
    linkOnPaste: true,                        // Adds a link to the current selection if the pasted content only contains an url.
    HTMLAttributes: {           
      rel: 'noopener noreferrer',             // Change rel to different value. Allow search engines to follow links(remove nofollow)
      target: "_blank",                       // Remove target entirely so links open in current tab
      class: 'cursor-pointer decoration-[0.5px] underline-offset-2',                // Adds a class to the link element.
    },
    // A function that validates every autolinked link. If it exists, it will be called with the link href as argument. If it returns false, the link will be removed. Can be used to set rules for example excluding or including certain domains, tlds, etc.
    validate: (href: string) => /^https?:\/\//.test(href),
  }),
  Strike,
  Subscript,
  Superscript,
  TextStyle,
  Underline,
};

/**
 * =================================
 *   FUNCTIONALITY EXTENSIONS
 * =================================
 * FUNCTIONALITY EXTENSIONS: Functionality extensions are used to add new functionality to the editor. They are usually used to add new features like a bubble menu, a character counter, etc.
 * - [BubbleMenu]: The BubbleMenu extension adds a bubble menu to the editor. It’s a context menu that shows up when you select text.
 * - [CharacterCount]: The CharacterCount extension adds a character counter to the editor. It counts the characters in the editor and shows the current count and the maximum count.
 * - [Color]: The Color extension allows you to add a color attribute to your text. You can define a list of colors and use them to color your text.
 * - [DropCursor]: The DropCursor extension adds a drop cursor to the editor. It’s a cursor that shows up when you drag and drop content into the editor.
 * - [Focus]: The Focus extension adds a focus class to the editor. It’s useful to style the editor when it’s focused.
 * - [FontFamily]: The FontFamily extension allows you to add a font family attribute to your text. You can define a list of font families and use them to style your text.
 * - [Gapcursor]: The Gapcursor extension adds a gap cursor to the editor. It’s a cursor that shows up when you move your cursor over empty areas in the editor.
 * - [History]: The History extension adds undo and redo functionality to the editor.
 * - [ListKeymap]: The ListKeymap extension adds keyboard shortcuts for lists to the editor. For example, you can use Cmd-Shift-7 to toggle an ordered list.
 * - [Markdown]: The Markdown extension adds markdown support to the editor. It allows you to paste markdown content into the editor and convert it to ProseMirror nodes.
 * - [Placeholder]: The Placeholder extension adds a placeholder to the editor. It’s a text that shows up when the editor is empty.
 * - [TextAlign]: The TextAlign extension allows you to add a text align attribute to your text. You can define a list of alignments and use them to align your text.
 * - [Typography]: The Typography extension allows you to add a typography attribute to your text. You can define a list of typography styles and use them to style your text.
 */
const FunctionalityExtensions = {
  BubbleMenu: BubbleMenu.configure({
    shouldShow: ({ editor, view, state, oldState, from, to }) => {
      // only show the bubble menu for images and links
      return editor.isActive('image') || editor.isActive('link')
    },
  }),
  CharacterCount: CharacterCount.configure({
    mode: "textSize",                       // textSize: counts the characters in the text, nodeSize: counts the nodes in the document
  }),
  Color: Color.configure({ 
    types: ["textStyle"],                    // A list of marks to which the color attribute should be applied to.
  }),
  DropCursor: DropCursor.configure({
    color: 'currentColor',                   // Color of the dropcursor.
    width: 1,                                // Width of the dropcursor.
    class: '',                               // One or multiple CSS classes that should be applied to the dropcursor.
  }),
  Focus: Focus.configure({
    className: 'focus',                      // The class that is applied to the focused element.
    mode: 'all',                             // Apply the class to 'all', the 'shallowest' or the 'deepest' node.
  }),
  FontFamily: FontFamily.configure({
    types: ['textStyle', 'listItem'],        // A list of marks to which the font family attribute should be applied to.
  }),
  Gapcursor,
  History: History.configure({
    depth: 100,                              // The amount of history events that are collected before the oldest events are discarded. Defaults to 100.
    newGroupDelay: 500,                      // The delay between changes after which a new group should be started (in milliseconds). When changes aren’t adjacent, a new group is always started.
  }),
  ListKeymap: ListKeymap.configure({
    listTypes: [                              // A array of list items and their parent wrapper node types.
      {
        itemName: 'listItem',
        wrapperNames: ['bulletList', 'orderedList'],
      },
      {
        itemName: 'taskItem',
        wrapperNames: ['taskList'],
      },
    ]
  }),
  Markdown: MarkdownExtension.configure({
    html: true,                  // Allow HTML input/output
    tightLists: true,            // No <p> inside <li> in markdown output
    tightListClass: 'tight',     // Add class to <ul> allowing you to remove <p> margins when tight
    bulletListMarker: '-',       // <li> prefix in markdown output
    linkify: true,              // Create links from "https://..." text
    breaks: true,               // New lines (\n) in markdown input are converted to <br>
    transformPastedText: true,   // Allow to paste markdown text in the editor
    transformCopiedText: true,   // Copied text is transformed to markdown
  }),
  Placeholder: Placeholder.configure({
    emptyEditorClass: '',                        // The class that is added to the editor when it’s empty.
    emptyNodeClass: '',                          // The added CSS class if the node is empty.
    // Dynamica placeholder
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return 'Title...'
      }
      return 'QED'
    },
    showOnlyWhenEditable: true,                  // Show decorations only when editor is editable.
    showOnlyCurrent: true,                       // Show decorations only in currently selected node.
    includeChildren: false,                      // Show decorations also for nested nodes.
  }),
  TextAlign: TextAlign.configure({
    types: ['heading', 'paragraph'],                      // A list of nodes where the text align attribute should be applied to. Usually something like ['heading', 'paragraph'].
    alignments: ['left', 'center', 'right', 'justify'],   // A list of available options for the text align attribute.
    defaultAlignment: 'left',                             // The default alignment for the text align attribute.
  }),
  Typography,
};

export const AllExtensions: any = {
  ...ThirdPartyExtensions,
  ...CustomExtensions,
  ...ProExtensions,
  ...NodeExtensions,
  ...MarkExtensions,
  ...FunctionalityExtensions
};

export const StarterKitExtensions = [
  // Nodes
  'Blockquote',
  'BulletList',
  'TerminalBlock', // replacement for code block
  'Document', // required doc
  'HardBreak',
  'Heading',
  'HorizontalRule',
  'ListItem',
  'OrderedList',
  'Paragraph',
  'Text',
  'Link',
  // Marks
  'Bold',
  'Code',
  'Italic',
  'Strike',
  // Extensions
  'Markdown',
  'DropCursor',
  'Gapcursor',
  'History',
  'TextAlign',
  'Typography',
];

export const BaseMarkdownExtensions = [
  ...StarterKitExtensions,
  // Nodes
  'Image',
  'Table',
  'TableCell',
  'TableHeader',
  'TableRow',
  'Youtube',
  'TaskItem',
  'TaskList',
  // Marks
  'TextStyle',
  'Highlight',
  'Subscript',
  'Superscript',
  'Underline',
  // Extensions
  'BubbleMenu',
  'CharacterCount',
  'Focus',
  'FontFamily',
  'ListKeymap',
  'Placeholder',
  'FileHandler',

];

export const GfmExtensions = [
  ...BaseMarkdownExtensions,
  'KatexExtension',
  'Emoji',
  'Mention',
  'TextReplacements',
  'ColorChips',
  
];

export const EditorMarkdownExtensions = [
  ...GfmExtensions,
  'BubbleMenu',
  'CharacterCount',
  'Focus',
];

export const MarkdownTipTapExtensions = EditorMarkdownExtensions.map((extension) => AllExtensions[extension]);
