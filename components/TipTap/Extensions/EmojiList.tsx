'use client'

import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import Image from "next/image";

export interface EmojiListProps {
  items?: any[];
  onSelect?: any;
}
export const EmojiList = forwardRef((props: EmojiListProps, ref: any) => {
  const {
    items = [],
    onSelect = () => {},
  } = props
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = useCallback((index: number) => {
    const item = items[index]

    if (item) {
      onSelect({ name: item.name })
    }
  }, [items, onSelect])

  const upHandler = useCallback(() => {
    setSelectedIndex(((selectedIndex + items.length) - 1) % items.length)
  }, [items, selectedIndex])

  const downHandler = useCallback(() => {
    setSelectedIndex((selectedIndex + 1) % items.length)
  }, [items, selectedIndex])

  const enterHandler = useCallback(() => {
    selectItem(selectedIndex)
  }, [selectItem, selectedIndex])

  useEffect(() => setSelectedIndex(0), [items])

  useImperativeHandle(ref, () => {
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
  }, [upHandler, downHandler, enterHandler])

  return (
    <div className="flex flex-col gap-1 p-[0.2rem] relative rounded-[0.5rem] bg-primary text-primary text-opacity-80 overflow-hidden text-[0.9rem] shadow-[0_0_0_1px_rgba(0,0,0,0.05),_0px_10px_20px_rgba(0,0,0,0.1)]">
      {items.map((item, index) => (
        <button
          className={`flex m-0 w-full text-left bg-transparent rounded-[0.4rem] border border-transparent p-[0.2rem_0.4rem] ${index === selectedIndex ? 'border-black' : ''}`}
          key={index}
          onClick={() => selectItem(index)}
        >
          { item.fallbackImage
            ? <Image src={item.fallbackImage} alt={item.name} width={12} height={12} className="w-[1em] h-[1em] flex" />
            : item.emoji
          }
          :{item.name}:
        </button>
      ))}
    </div>
  )
});
