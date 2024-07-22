import DragHandle from '@tiptap-pro/extension-drag-handle-react';
import { Editor } from '@tiptap/react';

import { Icon } from '@/components/Primitives/Icons/Icon';
import * as Popover from '@radix-ui/react-popover';
import { useEffect, useState } from 'react';
import { DropdownButton } from '../extensions/MenuList';
import useContentItemActions from '../hooks/useContentItemActions';
import { useData } from '../hooks/useData';
import { TipTapToolbar } from '../TipTapToolbar';

export type ContentItemMenuProps = {
  editor: Editor;
};

export const ContentItemMenu = ({ editor }: ContentItemMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const data = useData()
  const actions = useContentItemActions(editor, data.currentNode, data.currentNodePos)

  useEffect(() => {
    if (menuOpen) {
      editor.commands.setMeta('lockDragHandle', true)
    } else {
      editor.commands.setMeta('lockDragHandle', false)
    }
  }, [editor, menuOpen])

  return (
    <DragHandle
      pluginKey="ContentItemMenu"
      editor={editor}
      onNodeChange={data.handleNodeChange}
      tippyOptions={{
        offset: [4, 16],
        zIndex: 99,
      }}
    >
      <div className="flex items-center gap-2 w-full">
        <TipTapToolbar.Button onClick={actions.handleAdd}>
          <Icon set="Lucide" icon="Plus" width="16" />
        </TipTapToolbar.Button>
        <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
          <Popover.Trigger asChild>
            <TipTapToolbar.Button>
              <Icon set="Lucide" icon="GripVertical" width="16" />
            </TipTapToolbar.Button>
          </Popover.Trigger>
          <Popover.Content side="bottom" align="start" sideOffset={8}>
            <div className="bg-white rounded-lg dark:bg-black p-2 flex flex-col min-w-[16rem]">
              <Popover.Close>
                <DropdownButton onClick={actions.resetTextFormatting}>
                  <Icon set="Lucide" icon="RemoveFormatting" width="16" />
                  Clear formatting
                </DropdownButton>
              </Popover.Close>
              <Popover.Close>
                <DropdownButton onClick={actions.copyNodeToClipboard}>
                  <Icon set="Lucide" icon="Clipboard" width="16" />
                  Copy to clipboard
                </DropdownButton>
              </Popover.Close>
              <Popover.Close>
                <DropdownButton onClick={actions.duplicateNode}>
                  <Icon set="Lucide" icon="Copy" width="16" />
                  Duplicate
                </DropdownButton>
              </Popover.Close>
              <TipTapToolbar.Divider horizontal />
              <Popover.Close>
                <DropdownButton
                  onClick={actions.deleteNode}
                  className="text-red-500 bg-red-500 dark:text-red-500 hover:bg-red-500 dark:hover:text-red-500 dark:hover:bg-red-500 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-20"
                >
                  <Icon set="Lucide" icon="Trash2" width="16" />
                  Delete
                </DropdownButton>
              </Popover.Close>
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>
    </DragHandle>
  )
}
