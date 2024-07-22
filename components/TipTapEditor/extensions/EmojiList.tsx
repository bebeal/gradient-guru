'use client'
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import { Panel } from '@/components/Primitives/Panel';
import { Button } from '@/components/Primitives/Button';
import { EmojiItem } from '@tiptap-pro/extension-emoji'

// Renders emojis as an inline node - See https://tiptap.dev/docs/editor/api/nodes/emoji
// Syntax for emojis is :emoji-name:
// `:computer`: 💻

export interface EmojiCommand {
  name: string
}

export interface EmojiListProps {
  command: (command: EmojiCommand) => void
  items: EmojiItem[]
}
export const EmojiList = forwardRef((props: EmojiListProps, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => setSelectedIndex(0), [props.items])

  const selectItem = useCallback(
    (index: number) => {
      const item = props.items[index]

      if (item) {
        props.command({ name: item.name })
      }
    },
    [props],
  )

  useImperativeHandle(ref, () => {
    const scrollIntoView = (index: number) => {
      const item = props.items[index]

      if (item) {
        const node = document.querySelector(`[data-emoji-name="${item.name}"]`)

        if (node) {
          node.scrollIntoView({ block: 'nearest' })
        }
      }
    }

    const upHandler = () => {
      const newIndex = (selectedIndex + props.items.length - 1) % props.items.length
      setSelectedIndex(newIndex)
      scrollIntoView(newIndex)
    }

    const downHandler = () => {
      const newIndex = (selectedIndex + 1) % props.items.length
      setSelectedIndex(newIndex)
      scrollIntoView(newIndex)
    }

    const enterHandler = () => {
      selectItem(selectedIndex)
    }
    return {
      onKeyDown: (x: any) => {
        if (x.event.key === 'ArrowUp') {
          upHandler()
          return true
        }

        if (x.event.key === 'ArrowDown') {
          downHandler()
          return true
        }

        if (x.event.key === 'Enter') {
          enterHandler()
          return true
        }

        return false
      },
    }
  }, [props.items, selectItem, selectedIndex])

  const createClickHandler = useCallback((index: number) => () => selectItem(index), [selectItem])

  if (!props.items || !props.items.length) {
    return null
  }

  return (
    <Panel className="overflow-y-auto max-w-[18rem] max-h-[18rem]">
      {props.items.map((item: EmojiItem, index: number) => (
        <Button
          active={index === selectedIndex}
          variant="ghost"
          className="justify-start w-full"
          key={item.name}
          onClick={createClickHandler(index)}
          data-emoji-name={item.name}
        >
          {item.fallbackImage ? <img src={item.fallbackImage} className="w-5 h-5" alt="emoji" /> : item.emoji}{' '}
          <span className="truncate text-ellipsis">:{item.name}:</span>
        </Button>
      ))}
    </Panel>
  )
});
