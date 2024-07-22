import { Icon } from '@/components/Primitives/Icons/Icon'
import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import { useCallback, useRef } from 'react'
import { Instance, sticky } from 'tippy.js'
import { v4 as uuid } from 'uuid'
import { ImageBlockWidth } from '../extensions/ImageBlock/components/ImageBlockWidth'
import { TipTapToolbar } from '../TipTapToolbar'
import { getRenderContainer, MenuProps } from '../utils'

export const ImageBlockMenu = ({ editor, appendTo }: MenuProps): JSX.Element => {
  const menuRef = useRef<HTMLDivElement>(null)
  const tippyInstance = useRef<Instance | null>(null)

  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, 'node-imageBlock')
    const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)

    return rect
  }, [editor])

  const shouldShow = useCallback(() => {
    const isActive = editor.isActive('imageBlock')

    return isActive
  }, [editor])

  const onAlignImageLeft = useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('left').run()
  }, [editor])

  const onAlignImageCenter = useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('center').run()
  }, [editor])

  const onAlignImageRight = useCallback(() => {
    editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign('right').run()
  }, [editor])

  const onWidthChange = useCallback(
    (value: number) => {
      editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockWidth(value).run()
    },
    [editor],
  )

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`imageBlockMenu-${uuid()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        getReferenceClientRect,
        onCreate: (instance: Instance) => {
          tippyInstance.current = instance
        },
        appendTo: () => {
          return appendTo?.current
        },
        plugins: [sticky],
        sticky: 'popper',
      }}
    >
      <TipTapToolbar.Wrapper shouldShowContent={shouldShow()} ref={menuRef}>
        <TipTapToolbar.Button
          tooltip="Align image left"
          active={editor.isActive('imageBlock', { align: 'left' })}
          onClick={onAlignImageLeft}
        >
          <Icon set="Lucide" icon="AlignHorizontalDistributeStart" />
        </TipTapToolbar.Button>
        <TipTapToolbar.Button
          tooltip="Align image center"
          active={editor.isActive('imageBlock', { align: 'center' })}
          onClick={onAlignImageCenter}
        >
          <Icon set="Lucide" icon="AlignHorizontalDistributeCenter" />
        </TipTapToolbar.Button>
        <TipTapToolbar.Button
          tooltip="Align image right"
          active={editor.isActive('imageBlock', { align: 'right' })}
          onClick={onAlignImageRight}
        >
          <Icon set="Lucide" icon="AlignHorizontalDistributeEnd" />
        </TipTapToolbar.Button>
        <TipTapToolbar.Divider />
        <ImageBlockWidth onChange={onWidthChange} value={parseInt(editor.getAttributes('imageBlock').width)} />
      </TipTapToolbar.Wrapper>
    </BaseBubbleMenu>
  )
};
