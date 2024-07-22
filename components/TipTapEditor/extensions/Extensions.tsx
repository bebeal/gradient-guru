
'use client'

import { HocuspocusProvider } from '@hocuspocus/provider'
import InvisibleCharacters, { HardBreakNode } from '@tiptap-pro/extension-invisible-characters';
import { StarterKit } from '@tiptap/starter-kit'
import { Highlight } from '@tiptap/extension-highlight'
import { CharacterCount } from '@tiptap/extension-character-count'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Emoji, gitHubEmojis } from '@tiptap-pro/extension-emoji'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { FontFamily } from '@tiptap/extension-font-family'
import { Typography } from '@tiptap/extension-typography'
import { Color } from '@tiptap/extension-color'
import { FocusClasses as Focus } from '@tiptap/extension-focus'
import { Dropcursor } from '@tiptap/extension-dropcursor'
// import { CollaborationCursor } from '@tiptap/extension-collaboration-cursor'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { Paragraph } from '@tiptap/extension-paragraph'
import { CodeBlock } from '@tiptap/extension-code-block'
import { BulletList } from '@tiptap/extension-bullet-list'
import { OrderedList } from '@tiptap/extension-ordered-list'
// import { Collaboration } from '@tiptap/extension-collaboration'
import { TaskItem } from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import { FileHandler } from '@tiptap-pro/extension-file-handler'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import Youtube from '@tiptap/extension-youtube';
import Code from '@tiptap/extension-code';
import { Markdown as MarkdownExtension } from 'tiptap-markdown';

import {
  EmojiSuggestion,
  FontSize,
  Heading,
  HorizontalRule,
  Link,
  Selection,
  TrailingNode,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Document,
  Column,
  Columns,
  SlashCommand,
  Figcaption,
  BlockquoteFigure,
  ImageUpload,
  ImageBlock,
  TableOfContentsNode,
  TerminalBlock,
  KatexExtension,
  ColorChips,
  Video,
  TextReplacements,
  ReactComponent,
} from './index'
import { Extensions } from '@tiptap/react'
import TableOfContents from '@tiptap-pro/extension-table-of-contents'
import Image from '@tiptap/extension-image';

interface ExtensionTemplateProps {
  provider?: HocuspocusProvider | null
  userId?: string
  userName?: string
  userColor?: string
}

export const ExtensionTemplate = ({ provider, userId, userName = 'Maxi' }: ExtensionTemplateProps): Extensions => [
  Document,
  Columns,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Column,
  Selection,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  HorizontalRule,
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    codeBlock: false,
  }),
  // TerminalBlock,
  TextStyle,
  FontSize,
  FontFamily,
  Color.configure({ 
    types: ["textStyle"],                    // A list of marks to which the color attribute should be applied to.
  }),
  TrailingNode,
  Link.configure({
    openOnClick: false,
  }),
  Highlight.extend({
    priority: 1000,                          
  }).configure({
    multicolor: true  
  }),
  Underline,
  CharacterCount.configure({ limit: 50000 }),
  TableOfContents,
  TableOfContentsNode,
  Youtube.configure({
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
  ImageUpload.configure({
    // clientId: provider?.document?.clientID,
  }),
  ImageBlock,
  FileHandler.configure({
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    onDrop: (currentEditor, files, pos) => {
      files.forEach(async () => {
        // const url = await API.uploadImage()
        const url = 'TODO';

        currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run()
      })
    },
    onPaste: (currentEditor, files) => {
      files.forEach(async () => {
        // const url = await API.uploadImage()
        const url = 'TODO';

        return currentEditor
          .chain()
          .setImageBlockAt({ pos: currentEditor.state.selection.anchor, src: url })
          .focus()
          .run()
      })
    },
  }),
  Emoji.configure({
    enableEmoticons: true,
    suggestion: EmojiSuggestion,
  }),
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {}
    },
  }).configure({
    types: ['heading', 'paragraph'],
  }),
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
  Placeholder.configure({
    emptyEditorClass: 'is-editor-empty',                        // The class that is added to the editor when it’s empty.
    emptyNodeClass: 'is-empty',                          // The added CSS class if the node is empty.
    // Dynamica placeholder
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return 'Title...'
      }
      return 'Write something …'
    },
    showOnlyWhenEditable: true,                  // Show decorations only when editor is editable.
    showOnlyCurrent: true,                       // Show decorations only in currently selected node.
    includeChildren: false,                      // Show decorations also for nested nodes.
  }),
  SlashCommand,
  Focus,
  Figcaption,
  BlockquoteFigure,
  Dropcursor.configure({
    width: 2,
    class: 'border-primary',
  }),
  Video,
  Image.configure({
    inline: true,                                  // Renders the image node inline, for example in a paragraph tag: <p><img src="spacer.gif"></p>. By default images are on the same level as paragraphs.
    allowBase64: true,                             // Allow images to be parsed as base64 strings <img src="data:image/jpg;base64...">.
  }),
  MarkdownExtension.configure({
    html: true,                  // Allow HTML input/output
    tightLists: true,            // No <p> inside <li> in markdown output
    tightListClass: 'tight',     // Add class to <ul> allowing you to remove <p> margins when tight
    bulletListMarker: '-',       // <li> prefix in markdown output
    linkify: true,              // Create links from "https://..." text
    breaks: true,               // New lines (\n) in markdown input are converted to <br>
    transformPastedText: true,   // Allow to paste markdown text in the editor
    transformCopiedText: true,   // Copied text is transformed to markdown
  }),
  KatexExtension,
  ReactComponent,
  TextReplacements,
  TerminalBlock,
  ColorChips,
  InvisibleCharacters.configure({
    visible: true,                                 // Define default visibility.
    builders: [new HardBreakNode()],               // An array of invisible characters – by default it contains: spaces, hard breaks and paragraphs.
    injectCSS: true,                               // By default, the extension injects some CSS. With injectCSS you can disable that.
    injectNonce: undefined,                        // When you use a Content-Security-Policy with nonce, you can specify a nonce to be added to dynamically created elements.
  }),
  Code.configure({
    HTMLAttributes: {
      class: 'text-[#d4d4d4] bg-[#1e1e1e] after:content-none before:content-none px-1 py-[0.5px] rounded',
    },
  }),
];
