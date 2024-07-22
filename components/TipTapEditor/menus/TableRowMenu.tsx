import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import React, { useCallback } from 'react'
import { isRowGripSelected, MenuProps, ShouldShowProps } from '../utils'
import { TipTapToolbar } from '../TipTapToolbar'
import { Item } from './PopoverMenu'

export const TableRowMenu = React.memo(({ editor, appendTo }: MenuProps): JSX.Element => {
  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!state || !from) {
        return false
      }

      return isRowGripSelected({ editor, view, state, from })
    },
    [editor],
  )

  const onAddRowBefore = useCallback(() => {
    editor.chain().focus().addRowBefore().run()
  }, [editor])

  const onAddRowAfter = useCallback(() => {
    editor.chain().focus().addRowAfter().run()
  }, [editor])

  const onDeleteRow = useCallback(() => {
    editor.chain().focus().deleteRow().run()
  }, [editor])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="tableRowMenu"
      updateDelay={0}
      tippyOptions={{
        appendTo: () => {
          return appendTo?.current
        },
        placement: 'left',
        offset: [0, 15],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
      }}
      shouldShow={shouldShow}
    >
      <TipTapToolbar.Wrapper isVertical>
        <Item set="Lucide" icon="ArrowUpToLine"
          close={false}
          label="Add row before"
          onClick={onAddRowBefore}
        />
        <Item set="Lucide" icon="ArrowDownToLine"
          close={false}
          label="Add row after"
          onClick={onAddRowAfter}
        />
        <Item set="Lucide" icon="Trash" close={false} label="Delete row" onClick={onDeleteRow} />
      </TipTapToolbar.Wrapper>
    </BaseBubbleMenu>
  )
});
TableRowMenu.displayName = 'TableRowMenu'
