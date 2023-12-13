'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import CharacterCount from '@tiptap/extension-character-count';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import { Color } from '@tiptap/extension-color';
import Details from '@tiptap-pro/extension-details';
import DetailsSummary from '@tiptap-pro/extension-details-summary';
import DetailsContent from '@tiptap-pro/extension-details-content';
import Document from '@tiptap/extension-document';
import DropCursor from '@tiptap/extension-dropcursor';
import Emoji, { gitHubEmojis } from '@tiptap-pro/extension-emoji';
import FileHandler from '@tiptap-pro/extension-file-handler'
import Focus from '@tiptap/extension-focus';
import FontFamily from '@tiptap/extension-font-family'
import Gapcursor from '@tiptap/extension-gapcursor';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import History from '@tiptap/extension-history';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import InvisibleCharacters, { HardBreakNode } from '@tiptap-pro/extension-invisible-characters';
import Image from '@tiptap/extension-image';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import ListKeymap from '@tiptap/extension-list-keymap'
import { Mathematics } from '@tiptap-pro/extension-mathematics';
import Mention from '@tiptap/extension-mention';
import { Node } from '@tiptap/pm/model';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import { TableOfContent } from '@tiptap-pro/extension-table-of-content'
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import UniqueID from '@tiptap-pro/extension-unique-id';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { ColorHighlighter, TextReplacements, EmojiSuggestion, MentionListSuggestion, TOC, Comments } from './Extensions';
import { TipTapToolbar } from './TipTapToolbar';
import { Loading, nanoid } from '@/utils';

import 'katex/dist/katex.min.css'

// Y.js document to make the editor collaborative
// const ydoc = new Y.Doc()
// const provider = new WebrtcProvider('tiptap-collaboration-extension', ydoc)

interface Comment {
  id: string
  content: string
  replies: Comment[]
  createdAt: Date
}

const getNewComment = (content: string): Comment => {
  return {
    id: `a${nanoid()}a`,
    content,
    replies: [],
    createdAt: new Date()
  }
}

export interface TipTapEditorProps { 
  content?: any;
}
export const TipTapEditor = (props: TipTapEditorProps) => {
  const { 
    content="",
  } = props;

  const [items, setItems] = useState<any[]>([]);
  const [comments, setComments] = useState<Comment[]>([])
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null)
  const commentsSectionRef = useRef<HTMLDivElement | null>(null)

  const focusCommentWithActiveId = (id: string) => {
    if (!commentsSectionRef.current) return
    const commentInput = commentsSectionRef.current.querySelector<HTMLInputElement>(`input#${id}`)
    if (!commentInput) return
    commentInput.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    })
  }

  const setComment = () => {
    const newComment = getNewComment('')

    setComments([...comments, newComment])

    editor?.commands.setComment(newComment.id)

    setActiveCommentId(newComment.id)

    setTimeout(focusCommentWithActiveId)
  }

  useEffect(() => {
    if (!activeCommentId) return;
    focusCommentWithActiveId(activeCommentId);
  }, [activeCommentId])

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert prose-slate prose-base focus:outline-none",
      }
    },
    extensions: [
      // Collaboration.configure({
      //   document: ydoc,                       // Y.js document
      //   field: "title",                       // Name of a Y.js fragment, can be changed to sync multiple fields with one Y.js document
      //   // fragment: new Y.Doc().getXmlFragment('body'), // A raw Y.js fragment, can be used instead of document and field.
      // }),
      // CollaborationCursor.configure({
      //   provider,
      //   user: {
      //     name: "Carl Friedrich Gauss",
      //     color: "#f783ac",
      //   },
      // }),
      // CollabHistory.configure({
      //   provider,
      //   onUpdate(payload) {
      //     currentVersion = payload.currentVersion
      //     latestVersion = payload.latestVersion
      //     versions = payload.versions
      //     autoversioningEnabled = payload.autoVersioning
      //   }
      // })
      Blockquote,
      Bold,
      BulletList.configure({
        itemTypeName: "listItem",               // Specify the list item name
        keepMarks: false,                       // Decides whether to keep the marks from a previous line after toggling the list either using inputRule or using the button
        keepAttributes: false,                  // Decides whether to keep the attributes from a previous line after toggling the list either using inputRule or using the button
      }),
      CharacterCount.configure({
        mode: "textSize",                       // textSize: counts the characters in the text, nodeSize: counts the nodes in the document
      }),
      Code,
      CodeBlock.configure({
        languageClassPrefix: "language-",       // Adds a prefix to language classes that are applied to code tags.
        exitOnTripleEnter: true,                // Define whether the node should be exited on triple enter.
        exitOnArrowDown: true,                  // Define whether the node should be exited on arrow down if there is no node after it.
      }),
      Color.configure({ 
        types: ["textStyle"],                    // A list of marks to which the color attribute should be applied to.
      }),
      ColorHighlighter,
      Comments.configure({
        HTMLAttributes: {
          class: "",
        },
        onCommentActivated: (commentId: any) => {
          setActiveCommentId(commentId);
    
          if (commentId) setTimeout(() => focusCommentWithActiveId(commentId));
        },
      }),
      Details.configure({
        persist: true,                           // Specify if the open status should be saved in the document. Defaults to false.
        openClassName: 'is-open',                // Specifies a CSS class that is set when toggling the content. Defaults to is-open.
      }),
      DetailsSummary,
      DetailsContent,
      Document,
      DropCursor.configure({
        color: 'currentColor',                   // Color of the dropcursor.
        width: 1,                                // Width of the dropcursor.
        class: '',                               // One or multiple CSS classes that should be applied to the dropcursor.
      }),
      Emoji.configure({
        enableEmoticons: true,
        emojis: gitHubEmojis,
        forceFallbackImages: false,
        suggestion: EmojiSuggestion,
      }),
      FileHandler.configure({
        onPaste: (editor: any, files: any, htmlContent: any) => {
          // do something with the files
          // and insert the file into the editor
      
          // in some cases (for example copy / pasted gifs from other apps) you should probably not use the file directly
          // as the file parser will only have a single gif frame as png
          // in this case, you can extract the url from the htmlContent and use it instead, let other inputRules handle insertion
          // or do anything else with the htmlContent pasted into here
        },
        onDrop: (editor: any, files: any, pos: any) => {
          // do something with the files
          // and insert the file into the editor
        },
        allowedMimeTypes: undefined
      }),
      Focus.configure({
        className: 'focus',                      // The class that is applied to the focused element.
        mode: 'all',                             // Apply the class to 'all', the 'shallowest' or the 'deepest' node.
      }),
      FontFamily.configure({
        types: ['textStyle', 'listItem'],        // A list of marks to which the font family attribute should be applied to.
      }),
      Gapcursor,
      HardBreak.configure({
        keepMarks: false,                        // Decides whether to keep marks after a line break. Based on the keepOnSplit option for marks.
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],              // Specifies which heading levels are supported.
      }),
      Highlight.extend({
        priority: 1000,                          // The priority of the extension. The higher the priority, the later the extension is applied.
      }).configure({
        multicolor: true 
      }),
      History.configure({
        depth: 100,                              // The amount of history events that are collected before the oldest events are discarded. Defaults to 100.
        newGroupDelay: 500,                      // The delay between changes after which a new group should be started (in milliseconds). When changes aren’t adjacent, a new group is always started.
      }),
      HorizontalRule.configure({
        HTMLAttributes: {
          class: 'm-0 mb-[1.25em]',  
        },
      }),
      InvisibleCharacters.configure({
        visible: true,                                                              // Define default visibility.
        builders: [new HardBreakNode()],                                            // An array of invisible characters – by default it contains: spaces, hard breaks and paragraphs.
        injectCSS: true,                                                            // By default, the extension injects some CSS. With injectCSS you can disable that.
        injectNonce: undefined,                                                     // When you use a Content-Security-Policy with nonce, you can specify a nonce to be added to dynamically created elements.
      }),
      Image.configure({
        inline: true,                            // Renders the image node inline, for example in a paragraph tag: <p><img src="spacer.gif"></p>. By default images are on the same level as paragraphs.
        allowBase64: true,                       // Allow images to be parsed as base64 strings <img src="data:image/jpg;base64...">.
      }),
      Italic,
      Link.configure({
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
      ListItem,
      ListKeymap.configure({
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
      Mathematics.configure({
        regex: /\$([^$]*)\$/gi,                   // Tiptap needs to know when the text is mathematical. Therefor a regular expression pattern allows us to define this shorthand. E.g. using the TeX shorthand $ … $ (see default below). Matches become decorated – they are not stored as own nodes or marks!
        katexOptions: undefined,                  // For the math typesetting the extension uses the third party library KaTeX. To adjust its behaviour, you can pass KaTeX options to it. Find all of them https://katex.org/docs/options.html.
      }),
      Mention.configure({
        // Define how a mention label should be rendered.
        renderLabel({ options, node }) {
          return `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`
        },
        suggestion: MentionListSuggestion
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'marker:text-xs',
        },
        itemTypeName: "listItem",                    // Specify the list item name
        keepMarks: false,                            // Decides whether to keep the marks from a previous line after toggling the list either using inputRule or using the button
        keepAttributes: false,                       // Decides whether to keep the attributes from a previous line after toggling the list either using inputRule or using the button
      }),
      Paragraph,
      Placeholder.configure({
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
      Strike,
      Subscript,
      Superscript,
      TableOfContent.configure({
        headingType: 'heading',                       // The type of the heading node you want to use for your Table of Content. By default this is heading but in case you create your own custom Heading extension OR extend the existing one and use a different name, you can pass that name here.
        getId: () => nanoid(),                        // A builder function that returns a unique ID for each heading. Inside the argument you get access to the headings text content (for example you want to generate IDs based on the text content of the heading).By default this is a function that uses the uuid package to generate a unique ID.
        scrollParent: window,                         // The scroll parent you want to attach to. This is used to determine which heading currently is active or was already scrolled over. By default this is the window but you can pass any HTML element here.
        onUpdate: (content: any) => {                 // The most important option that you must set to use this extension. This is a callback function that gets called whenever the Table of Content updates. You get access to an array of heading data (see below) which you can use to render your own Table of Content. To render the table of content you can render it by any means you want. You can use a framework like Vue, React or Svelte or you can use a simple templating engine like Handlebars or Pug. You can also use a simple document.createElement to render the table of content. You can pass a second argument to get the information whether this is the initial creation step for the ToC data.
          // setItems(content)
        },
      }),
      Table.configure({
        resizable: true,
        handleWidth: 5,
        cellMinWidth: 25,
        lastColumnResizable: true,
        allowTableNodeSelection: false
      }),
      TableCell,
      TableHeader,
      TableRow,
      TaskList.configure({
        HTMLAttributes: {
          class: `[&>*]:flex [&>*]:items-baseline [&>li]:gap-1 [&>*]:h-auto [&>*]:w-auto [&>*]:m-[0px_!important] [&>*]:p-0 m-[0px_!important]`
        },
        itemTypeName: 'taskItem',                     // Specify the list item name
      }),
      TaskItem.configure({
        nested: true,                                  // Whether the task items are allowed to be nested within each other.
        // A handler for when the task item is checked or unchecked while the editor is set to readOnly. If this is not supplied, the task items are immutable while the editor is readOnly. If this function returns false, the check state will be preserved (readOnly).
        onReadOnlyChecked: (node: Node, checked: boolean): boolean => {
          return false;
        },
      }),
      Text,
      TextAlign.configure({
        types: ['heading', 'paragraph'],                      // A list of nodes where the text align attribute should be applied to. Usually something like ['heading', 'paragraph'].
        alignments: ['left', 'center', 'right', 'justify'],   // A list of available options for the text align attribute.
        defaultAlignment: 'left',                             // The default alignment for the text align attribute.
      }),
      TextStyle,
      TextReplacements,
      Typography,
      Underline,
      UniqueID.configure({
        attributeName: 'id',                          // Name of the attribute that is attached to the HTML tag (will be prefixed with data-).
        types: [],                                    // All types that should get a unique ID, for example ['heading', 'paragraph']
        generateID: () => nanoid(),                   // A function that generates and returns a unique ID.
        filterTransaction: null,                      // Ignore some mutations, for example applied from other users through the collaboration plugin.
      }),
      Youtube.configure({
        inline: false,                                // Controls if the node should be handled inline or as a block.
        width: 640,                                   // Controls the default width of added videos
        height: 480,                                  // Controls the default height of added videos
        controls: true,                               // Enables or disables YouTube video controls
        nocookie: false,                              // Enables the nocookie mode for YouTube embeds
        allowFullscreen: true,                        // Allows the iframe to be played in fullscreen
        autoplay: false,                              // Allows the iframe to to start playing after the player is loaded,
        ccLanguage: undefined,                        // Specifies the default language that the player will use to display closed captions. Set the parameter's value to an ISO 639-1 two-letter language code. For example, setting it to es will cause the captions to be in spanish
        ccLoadPolicy: false,                          // Setting this parameter's value to true causes closed captions to be shown by default, even if the user has turned captions off
        disableKBcontrols: false,                     // Disables the keyboards controls for the iframe player
        enableIFrameApi: false,                       // Enables the player to be controlled via IFrame Player API calls
        origin: '',                                   // This parameter provides an extra security measure for the IFrame API and is only supported for IFrame embeds. If you are using the IFrame API, which means you are setting the enableIFrameApi parameter value to true, you should always specify your domain as the origin parameter value.
        endTime: 0,                                   // This parameter specifies the time, measured in seconds from the start of the video, when the player should stop playing the video. For example, setting it to 15 will make the video stop at the 15 seconds mark
        interfaceLanguage: undefined,                 // Sets the player's interface language. The parameter value is an ISO 639-1 two-letter language code. For example, setting it to fr will cause the interface to be in french
        ivLoadPolicy: 0,                              // Setting this to 1 causes video annotations to be shown by default, whereas setting to 3 causes video annotations to not be shown by default
        loop: false,                                  // This parameter has limited support in IFrame embeds. To loop a single video, set the loop parameter value to true and set the playlist parameter value to the same video ID already specified in the Player API URL.
        playlist: '',                                 // This parameter specifies a comma-separated list of video IDs to play.
        modestBranding: false,                        // Disables the Youtube logo on the control bar of the player. Note that a small YouTube text label will still display in the upper-right corner of a paused video when the user's mouse pointer hovers over the player
        progressBarColor: undefined,                  // This parameter specifies the color that will be used in the player's video progress bar. Note that setting the color parameter to white will disable the modestBranding parameter
      }),
    ],
    content
  });

  const setColor = useCallback((color: string = "#FFFFFF") => {
    editor?.commands.setColor(color);
  }, [editor]);

  const getCounts = useCallback(() => {
    const characters = editor?.storage.characterCount.characters();
    const words = editor?.storage.characterCount.words();

    return {
      characters,
      words,
    };
  }, [editor]);

  const setImage = useCallback((url: string) => {
    editor?.commands.setImage({ src: 'https://example.com/foobar.png', alt: 'A boring example image', title: 'An example' })
  }, [editor]);

  const getLinkAttributes = useCallback(() => {
    editor?.getAttributes('link').href
  }, [editor]);

  const getText = useCallback(() => {
    editor?.getText();
  }, [editor]);

  const getHTML = useCallback(() => {
    editor?.getHTML();
  }, [editor]);

  const getJSON = useCallback(() => {
    editor?.getJSON();
  }, [editor]);

  if (!editor) {
    return <Loading />;
  }
  return (
    <div className="relative flex flex-col w-auto h-full border border-primary rounded-sm bg-secondary">
      <TipTapToolbar editor={editor}/>
      <div className="relative flex w-auto h-full p-4 overflow-y-auto overflow-x-hidden justify-center">
        <TOC editor={editor} items={items} />
        <EditorContent editor={editor}/>
      </div>
    </div>
  );
};
