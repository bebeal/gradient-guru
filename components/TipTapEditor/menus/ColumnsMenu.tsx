import { Icon } from '@/components/Primitives/Icons/Icon';
import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react';
import { useCallback } from 'react';
import { sticky } from 'tippy.js';
import { v4 as uuid } from 'uuid';
import { ColumnLayout } from '../extensions/Columns';
import { TipTapToolbar } from '../TipTapToolbar';
import { getRenderContainer, MenuProps } from '../utils';

export const ColumnsMenu = ({ editor, appendTo }: MenuProps) => {
  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, 'columns')
    const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)

    return rect
  }, [editor])

  const shouldShow = useCallback(() => {
    const isColumns = editor.isActive('columns')
    return isColumns
  }, [editor])

  const onColumnLeft = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run()
  }, [editor])

  const onColumnRight = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run()
  }, [editor])

  const onColumnTwo = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run()
  }, [editor])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`columnsMenu-${uuid()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        getReferenceClientRect,
        appendTo: () => appendTo?.current,
        plugins: [sticky],
        sticky: 'popper',
      }}
    >
      <TipTapToolbar.Wrapper>
        <TipTapToolbar.Button
          tooltip="Sidebar left"
          active={editor.isActive('columns', { layout: ColumnLayout.SidebarLeft })}
          onClick={onColumnLeft}
        >
          <Icon set="Lucide" icon="PanelLeft" />
        </TipTapToolbar.Button>
        <TipTapToolbar.Button
          tooltip="Two columns"
          active={editor.isActive('columns', { layout: ColumnLayout.TwoColumn })}
          onClick={onColumnTwo}
        >
          <Icon set="Lucide" icon="Columns" />
        </TipTapToolbar.Button>
        <TipTapToolbar.Button
          tooltip="Sidebar right"
          active={editor.isActive('columns', { layout: ColumnLayout.SidebarRight })}
          onClick={onColumnRight}
        >
          <Icon set="Lucide" icon="PanelRight" />
        </TipTapToolbar.Button>
      </TipTapToolbar.Wrapper>
    </BaseBubbleMenu>
  )
};
