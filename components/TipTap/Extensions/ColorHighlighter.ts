import { Extension } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state'
import { Node } from '@tiptap/pm/model'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

export const findColors = (doc: Node): DecorationSet => {
  const hexColor = /(#[0-9a-f]{3,6})\b/gi
  const decorations: Decoration[] = []

  doc.descendants((node, position) => {
    if (!node.text) {
      return
    }

    Array.from(node.text.matchAll(hexColor)).forEach(match => {
      const color = match[0]
      const index = match.index || 0
      const from = position + index
      const to = from + color.length
      const decoration = Decoration.inline(from, to, {
        class: `whitespace-nowrap before:inline-flex before:items-baseline before:content-[""] before:border before:border-[rgba(128, 128, 128, 0.3)] before:rounded-sm before:bg-[${color}] before:h-[0.75em] before:w-[0.75em] before:mb-[0.15em] before:mr-[0.1em] before:align-middle`,
      })

      decorations.push(decoration)
    })
  })

  return DecorationSet.create(doc, decorations)
}

export const ColorHighlighter = Extension.create({
  name: 'colorHighlighter',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        state: {
          init(_, { doc }) {
            return findColors(doc)
          },
          apply(transaction, oldState) {
            return transaction.docChanged ? findColors(transaction.doc) : oldState
          },
        },
        props: {
          decorations(state) {
            return this.getState(state)
          },
        },
      }),
    ]
  },
})
