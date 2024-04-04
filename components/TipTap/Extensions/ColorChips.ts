'use client'

import { Extension } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state'
import { Node } from '@tiptap/pm/model'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { colorRegex } from '@/utils'

// Replaces text color codes with vscode-like color chips

export const findColors = (doc: Node): DecorationSet => {
  const decorations: Decoration[] = []

  doc.descendants((node, position) => {
    if (!node.text) {
      return
    }

    Array.from(node.text.matchAll(colorRegex.source as any)).forEach(match => {
      const color = match[0]
      const index = match.index || 0
      const from = position + index
      const to = from + color.length
      const decoration = Decoration.inline(from, to, {
        style: `--color-chip: ${color}`,
        class: `whitespace-nowrap before:inline-flex before:items-baseline before:content-[""] before:border before:border-[rgba(128, 128, 128, 0.3)] before:rounded-sm before:bg-[var(--color-chip)] before:h-[0.75em] before:w-[0.75em] before:mb-[0.15em] before:mr-[0.1em] before:align-middle`,
      })

      decorations.push(decoration)
    })
  })

  return DecorationSet.create(doc, decorations)
}

export const ColorChips = Extension.create({
  name: 'colorChips',

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
