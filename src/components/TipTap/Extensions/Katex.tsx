import { Extension as TiptapExtension } from '@tiptap/core';
import { Plugin as ProseMirrorPlugin, PluginKey as ProseMirrorPluginKey } from '@tiptap/pm/state';
import { Decoration as ProseMirrorDecoration, DecorationSet as ProseMirrorDecorationSet } from '@tiptap/pm/view';
import katex from 'katex';

import { blockMath, inlineMath } from '@/utils/regex';

// Custom implementation of KaTex based Mathematics extensions which supports LaTex math decorations

import 'katex/dist/katex.min.css';

const KatexEditorClasses = ['text-primary', 'px-2', 'py-[0.2rem]', 'font-mono', 'bg-[#202020]'];
// const KatexRenderClasses = ['cursor-pointer', 'transition-[background]', 'duration-[0.2s]', 'px-1', 'py-0'];

const renderKatex = (editor: any, _node: any, match: any, pos: number, katexOptions: any, displayMode: boolean) => {
  const start = match.index + pos;
  const end = start + match[0].length;
  const expression = match[1];
  const decorations: any[] = [];
  if (expression) {
    decorations.push(
      ProseMirrorDecoration.widget(start, () => {
        const element = document.createElement('span');
        element.classList.add(...KatexEditorClasses);
        editor.isEditable && element.classList.add('rounded', displayMode ? 'block' : 'inline-block');
        try {
          katex.render(expression, element, { ...katexOptions, displayMode });
        } catch (e) {
          element.innerHTML = expression;
        }
        return element;
      }),
    );

    decorations.push(
      ProseMirrorDecoration.inline(start, end, {
        class: `!hidden ${KatexEditorClasses.join(' ')}`,
        style: `${displayMode ? 'display: block;' : 'display: inline-block;'} height: 0; opacity: 0; overflow: hidden; position: absolute; width: 0;`,
      }),
    );
  } else {
    decorations.push(
      ProseMirrorDecoration.inline(start, end, {
        class: KatexEditorClasses.join(' '),
      }),
    );
  }
  return decorations;
};

const createKatexPlugin = (options: any) => {
  const { katexOptions = {}, editor } = options;

  const findMathExpressions = (doc: any) => {
    if (!editor || !editor.state) return ProseMirrorDecorationSet.empty;

    const decorations: any[] = [];
    doc.descendants((node: any, pos: number) => {
      if (node.isText && node.text) {
        const text = node.text;
        let match;

        let matched = false;
        while ((match = blockMath.exec(text)) !== null) {
          decorations.push(...renderKatex(editor, node, match, pos, katexOptions, true));
          matched = true;
        }

        if (!matched) {
          while ((match = inlineMath.exec(text)) !== null) {
            decorations.push(...renderKatex(editor, node, match, pos, katexOptions, false));
            matched = true;
          }
        }
      }
    });

    return decorations.length > 0 ? ProseMirrorDecorationSet.create(doc, decorations) : ProseMirrorDecorationSet.empty;
  };

  return new ProseMirrorPlugin({
    key: new ProseMirrorPluginKey('katex'),
    state: {
      init: () => ProseMirrorDecorationSet.empty,
      apply: (tr, _set) => findMathExpressions(tr.doc),
    },
    props: {
      decorations: (state) => findMathExpressions(state.doc),
    },
  });
};

const KatexExtension = TiptapExtension.create({
  name: 'katex',
  addOptions: () => ({
    katexOptions: undefined,
  }),
  addProseMirrorPlugins() {
    return [createKatexPlugin({ ...this.options, editor: this.editor })];
  },
});

export { KatexExtension as default, KatexExtension as KatexExtension, createKatexPlugin as KatexPlugin };
