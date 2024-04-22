import { Extension } from '@tiptap/core';
import { DOMParser } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';

// Snippets extension altered from source: https://github.com/sereneinserenade/tiptap-snippets-extension
// Adds drag n droppable snippets which can be created ad-hoc for frequently repeated content

function wrapHtmlInTemplate(value: string): HTMLSpanElement {
  const element = document.createElement('span');
  element.innerHTML = `${value.trim()}`;
  return element;
}

export const Snippets = Extension.create({
  name: 'snippet',
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleDrop(view, event: DragEvent | any): boolean {
            if (!event) return false;

            event.preventDefault();

            const coordinates = view.posAtCoords({
              left: event.clientX,
              top: event.clientY,
            });

            const snippetContent = event.dataTransfer.getData('snippet');

            const parsedContent = DOMParser.fromSchema(view.state.schema).parseSlice(wrapHtmlInTemplate(snippetContent));

            if (coordinates) {
              const dropTransaction = view.state.tr.insert(coordinates.pos, parsedContent.content);

              dropTransaction.setMeta('isSnippetDropTransaction', true);

              view.dispatch(dropTransaction);
            }

            return false;
          },
        },
      }),
    ];
  },
});
