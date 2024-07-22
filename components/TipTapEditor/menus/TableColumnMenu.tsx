import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import React, { useCallback } from 'react'
import { isColumnGripSelected, MenuProps, ShouldShowProps } from '../utils'
import { TipTapToolbar } from '../TipTapToolbar'
import { Item } from './PopoverMenu'

export const TableColumnMenu = React.memo(({ editor, appendTo }: MenuProps): JSX.Element => {
  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!state) {
        return false
      }

      return isColumnGripSelected({ editor, view, state, from: from || 0 })
    },
    [editor],
  )

  const onAddColumnBefore = useCallback(() => {
    editor.chain().focus().addColumnBefore().run()
  }, [editor])

  const onAddColumnAfter = useCallback(() => {
    editor.chain().focus().addColumnAfter().run()
  }, [editor])

  const onDeleteColumn = useCallback(() => {
    editor.chain().focus().deleteColumn().run()
  }, [editor])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="tableColumnMenu"
      updateDelay={0}
      tippyOptions={{
        appendTo: () => {
          return appendTo?.current
        },
        offset: [0, 15],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
      }}
      shouldShow={shouldShow}
    >
      <TipTapToolbar.Wrapper isVertical>
        <Item
          set="Lucide" icon="ArrowLeftToLine"
          close={false}
          label="Add column before"
          onClick={onAddColumnBefore}
        />
        <Item
          set="Lucide" icon="ArrowRight"
          close={false}
          label="Add column after"
          onClick={onAddColumnAfter}
        />
        <Item set="Lucide" icon="Trash" close={false} label="Delete column" onClick={onDeleteColumn} />
      </TipTapToolbar.Wrapper>
    </BaseBubbleMenu>
  )
});
TableColumnMenu.displayName = 'TableColumnMenu'
