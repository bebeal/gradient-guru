
'use client'

import { HocuspocusProvider } from '@hocuspocus/provider'

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

import { lowlight } from 'lowlight'

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

interface ExtensionTemplateProps {
  provider?: HocuspocusProvider | null
  userId?: string
  userName?: string
  userColor?: string
}

export const ExtensionTemplate = ({ provider, userId, userName = 'Maxi' }: ExtensionTemplateProps): Extensions => [
  Video,
  KatexExtension,
  ReactComponent,
  TextReplacements,
  TerminalBlock,
  ColorChips,
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
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: null,
  }),
  // TerminalBlock,
  TextStyle,
  FontSize,
  FontFamily,
  Color,
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
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => '',
  }),
  SlashCommand,
  Focus,
  Figcaption,
  BlockquoteFigure,
  Dropcursor.configure({
    width: 2,
    class: 'border-primary',
  }),
];
