# TipTap

## Components

### TipTap

### TipTapToolbar

### Extensions

* Extensions add functionality to TipTap in the form of `nodes`, `marks`, or `commands`. See [Extension documentation](https://tiptap.dev/docs/editor/api/extensions) for more info.

#### Custom

* Extensions explicitly defined in `TipTap/Extensions/`

* `ColorHighlighter`: Custom extension which replaces colors in text with a simple tailwind vscode chip-like component
* [`Comments`](https://github.com/sereneinserenade/tiptap-comment-extension): Google-Doc/Quip like commenting
* `Emoji`: Custom implementation of [`@tiptap-pro/extension-emoji`](https://tiptap.dev/docs/editor/api/nodes/emoji)
  * `EmojiList`: Custom extension renders a list of emojis with keyboard navigation
  * `EmojiSuggestion`: Custom extension which adds an emoji picker as a panel popup which appears when an emoji is typed
* `MentionList`:
* `MentionListSuggestion`:
* `TextReplacements`: 
* `TOC`

#### Library

* Extensions imported from package registry

* [`name`](package link): Description
* [`Video`](https://github.com/sereneinserenade/tiptap-extension-video): Video embeds
