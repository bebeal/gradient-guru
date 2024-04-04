'use client'

import React, { forwardRef, useEffect, useImperativeHandle, useState, } from 'react'

// List of possible mentions (pulled from some db) to display in a popup

export interface MentionListProps {
  command: any;
  items: any;
}
export const MentionList = forwardRef((props: MentionListProps, ref) => {
  const {
    command,
    items,
  } = props
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: number) => {
    const item = items[index]

    if (item) {
      command({ id: item })
    }
  }

  const upHandler = () => {
    setSelectedIndex((selectedIndex + items.length - 1) % items.length)
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % items.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => setSelectedIndex(0), [items])

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: any) => {
      if (event.key === 'ArrowUp') {
        upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        downHandler()
        return true
      }

      if (event.key === 'Enter') {
        enterHandler()
        return true
      }

      return false
    },
  }))

  return (
    <div className="bg-white rounded-lg shadow text-black text-opacity-80 text-sm overflow-hidden p-1 relative">
      {items.length
        ? items.map((item: any, index: number) => (
          <button
            className={`bg-transparent border border-transparent rounded-md block m-0 py-1 px-2 text-left w-full ${index === selectedIndex ? 'border-black' : ''}`}
            key={index}
            onClick={() => selectItem(index)}
          >
            {item}
          </button>
        ))
        : <div className="bg-transparent border border-transparent rounded-md block m-0 py-1 px-2 text-left w-full">No result</div>
      }
    </div>
  )
});
