'use client'
import { ReactRenderer } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import tippy from 'tippy.js';
import { EmojiList } from './EmojiList';
import { SuggestionKeyDownProps, SuggestionProps } from '@tiptap/suggestion';

// Uses tippy to display a popup, which appears when typing out an emoji, which contains a list of suggestions based on the text typed so far

export const EmojiSuggestion = {
  items: ({ editor, query }: { editor: Editor; query: string }) =>
    editor.storage.emoji.emojis.filter(({ shortcodes, tags }: { shortcodes: string[]; tags: string[] }) =>
      shortcodes.find(shortcode => shortcode.startsWith(query.toLowerCase())) ||
      tags.find(tag => tag.startsWith(query.toLowerCase())),
    ).slice(0, 250),

  allowSpaces: false,

  render: () => {
    let component: any;
    let popup: any;

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(EmojiList, {
          ...props,          
        })

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props: SuggestionProps<any>) {
        component?.updateProps(props)

        popup?.[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props: SuggestionKeyDownProps) {
        if (props.event.key === 'Escape') {
          popup?.[0].hide()
          component?.destroy()

          return true
        }

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup?.[0].destroy()
        component?.destroy()
      },
    }
  },
}