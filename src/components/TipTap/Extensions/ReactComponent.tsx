import { mergeAttributes, Node } from '@tiptap/core';
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';

// Lightweight wrapper for rendering arbitrary React components

export const ReactComponent = Node.create({
  name: 'reactComponent',

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [
      {
        tag: 'react-component',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['react-component', mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(
      <NodeViewWrapper className="relative mx-0 my-4 rounded-lg border-[3px] border-solid border-[#0D0D0D]">
        <span className="bg-[#0D0D0D] text-[0.6rem] tracking-[1px] font-[bold] uppercase text-white absolute ml-4 px-3 py-1 rounded-[0_0_0.5rem_0.5rem] top-0" contentEditable={false}>
          React Component
        </span>

        <NodeViewContent className="mt-10 mb-4 mx-4 p-2 rounded-lg border-2 border-dashed border-[#0D0D0D20]" />
      </NodeViewWrapper>,
    );
  },
});
