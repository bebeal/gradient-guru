import { useContext, useEffect, useMemo, useState } from 'react'

import { Editor, Extensions, useEditor } from '@tiptap/react'
// import Collaboration from '@tiptap/extension-collaboration'
// import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { TiptapCollabProvider } from '@hocuspocus/provider'
// import type { Doc as YDoc } from 'yjs'

import { useSidebar } from './useSidebar';
import { EditorUser } from '../constants';
import { cn } from '@/utils/utils';
import { ExtensionTemplate } from '../extensions/Extensions';

declare global {
  interface Window {
    editor: Editor | null
  }
}

const editorClassNames = cn(
                            'prose prose-base prose-gray dark:prose-invert w-full max-w-full',
                          );
// const editorClassNames = cn('min-h-full');

export const useTipTap = ({
  // aiToken,
  // ydoc,
  provider,
  content,
}: {
  // aiToken: string
  // ydoc: YDoc
  provider?: TiptapCollabProvider | null | undefined
  content?: any
}) => {
  const leftSidebar = useSidebar();
   // const { setIsAiLoading, setAiError } = useContext(EditorContext)
  const extensions: Extensions = ExtensionTemplate({
    provider,
  })

  const editor = useEditor(
    {
      // Tiptap Error: SSR has been detected, please set `immediatelyRender` explicitly to `false` to avoid hydration mismatches.
      immediatelyRender: false,
      autofocus: false,
      content,
      // onCreate: ({ editor }) => {
      //   provider?.on('synced', () => {
      //     if (editor.isEmpty) {
      //       editor.commands.setContent(initialContent)
      //     }
      //   })
      // },
      extensions,
        // Collaboration.configure({
        //   document: ydoc,
        // }),
        // CollaborationCursor.configure({
        //   provider,
        //   user: {
        //     name: randomElement(userNames),
        //     color: randomElement(userColors),
        //   },
        // }),
        // Ai.configure({
        //   appId: TIPTAP_AI_APP_ID,
        //   token: aiToken,
        //   baseUrl: TIPTAP_AI_BASE_URL,
        //   autocompletion: true,
        //   onLoading: () => {
        //     setIsAiLoading(true)
        //     setAiError(null)
        //   },
          // onSuccess: () => {
          //   setIsAiLoading(false)
          //   setAiError(null)
          // },
          // onError: error => {
          //   setIsAiLoading(false)
          //   setAiError(error.message)
          // },
        // }),
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: editorClassNames,
        },
      },
    }, [provider],
    // [ydoc, provider],
  )

  const users = useMemo(() => {
    if (!editor?.storage.collaborationCursor?.users) {
      return []
    }

    return editor.storage.collaborationCursor?.users.map((user: EditorUser) => {
      const names = user.name?.split(' ')
      const firstName = names?.[0]
      const lastName = names?.[names.length - 1]
      const initials = `${firstName?.[0] || '?'}${lastName?.[0] || '?'}`

      return { ...user, initials: initials.length ? initials : '?' }
    })
  }, [editor?.storage.collaborationCursor?.users])

  const characterCount = editor?.storage.characterCount || { characters: () => 0, words: () => 0 }

  // useEffect(() => {
  //   // provider?.on('status', (event: { status: WebSocketStatus }) => {
  //   //   setCollabState(event.status)
  //   // })
  //   console.log('provider', provider)
  // }, [provider])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.editor = editor
    }
  }, [editor]);

  return { editor, users, characterCount, leftSidebar }
  // return { editor, users, characterCount, collabState, leftSidebar }
}
