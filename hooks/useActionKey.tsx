'use client'

import { isAppleDevice } from '@/utils'
import { useState, useEffect } from 'react'

const ACTION_KEY_DEFAULT: [string, string] = ['Ctrl ', 'Control']
const ACTION_KEY_APPLE: [string, string]  = ['⌘', 'Command']

export const useActionKey = () => {
  const [actionKey, setActionKey] = useState<[string, string]>()

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      if (isAppleDevice()) {
        setActionKey(ACTION_KEY_APPLE)
      } else {
        setActionKey(ACTION_KEY_DEFAULT)
      }
    }
  }, [])

  return actionKey
}
