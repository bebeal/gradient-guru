import { EmojiList } from './EmojiList';
import { ReactRenderer } from '@tiptap/react';
import tippy from 'tippy.js';

// Uses tippy to display a popup, which appears when typing out an emoji, which contains a list of suggestions based on the text typed so far

export const EmojiSuggestion = {
  items: ({ editor, query }: any) => {
    return editor.storage.emoji.emojis
      .filter(({ shortcodes, tags }: any) => {
        return shortcodes.find((shortcode: any) => shortcode.startsWith(query.toLowerCase())) || tags.find((tag: any) => tag.startsWith(query.toLowerCase()));
      })
      .slice(0, 5);
  },

  allowSpaces: false,

  render: () => {
    let component: any;
    let popup: any;

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(EmojiList, {
          ...props,
        });

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        });
      },

      onUpdate(props: any) {
        component?.updateProps(props);

        popup?.[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props: any) {
        if (props.event.key === 'Escape') {
          popup?.[0].hide();
          component?.destroy();

          return true;
        }

        return component.ref?.onKeyDown(props);
      },

      onExit() {
        popup?.[0].destroy();
        component?.destroy();
      },
    };
  },
};
