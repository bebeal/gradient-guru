'use client';

import { EditorContent, PureEditorContent } from '@tiptap/react'
import React, { createContext, Suspense, useMemo, useRef } from 'react'
import { useTipTap as useTipTap } from './hooks/useTipTap';
import { TiptapEditorProps } from './constants';
import { EditorHeader } from './components/EditorHeader';
import { Sidebar } from './components/Sidebar';
import { ContentItemMenu } from './components/ContentItemMenu';
import { TextMenu } from './menus/TextMenu';
import { TableColumnMenu, TableRowMenu } from './menus';
import { LinkMenu } from './menus/LinkMenu';
import { ColumnsMenu } from './menus/ColumnsMenu';
import { ImageBlockMenu } from './menus/ImageBlockMenu';
import { Loading } from '../Primitives/Loading';
import './TipTap.css';

interface IEditorContext {
  isAiLoading: boolean
  aiError?: string | null
  setIsAiLoading: Function
  setAiError: Function
}
const defaultEditorContext: IEditorContext = {
  isAiLoading: false,
  aiError: null,
  setIsAiLoading: () => {},
  setAiError: () => {},
};

export const EditorContext = createContext<IEditorContext>({
  ...defaultEditorContext,
})

// import '@/styles/index.css'

export const TipTapEditor = ({ provider, content, sidebar=true, toolbar=true }: TiptapEditorProps) => {
  // const aiState = useAIState()
  const menuContainerRef = useRef(null)
  const editorRef = useRef<HTMLDivElement | null>(null)

  // const { editor, users, characterCount, collabState, leftSidebar } = useBlockEditor({ aiToken, ydoc, provider })
  const { editor, users, characterCount, leftSidebar } = useTipTap({ provider, content });

  const displayedUsers = users?.slice(0, 3) || [];

  // const providerValue = useMemo(() => {
  //   return {
  //     isAiLoading: aiState.isAiLoading,
  //     aiError: aiState.aiError,
  //     setIsAiLoading: aiState.setIsAiLoading,
  //     setAiError: aiState.setAiError,
  //   }
  // }, [aiState])
  const providerValue = useMemo(() => {
    return defaultEditorContext
  }, []);

  // const aiLoaderPortal = createPortal(<Loader label="AI is now doing its job." />, document.body)

  if (!editor) {
    return <Loading />;
  }
  return (
    <div className="w-full h-full">
      <EditorContext.Provider value={providerValue}>
        <Suspense fallback={<Loading />}>
            <div className="flex h-full" ref={menuContainerRef}>
              {sidebar && <Sidebar isOpen={leftSidebar.isOpen} onClose={leftSidebar.close} editor={editor} />}
              <div className="relative flex flex-col flex-1 h-full overflow-hidden">
                {toolbar && <EditorHeader
                  characters={characterCount.characters()}
                  // collabState={collabState}
                  users={displayedUsers}
                  words={characterCount.words()}
                  isSidebarOpen={leftSidebar.isOpen}
                  toggleSidebar={leftSidebar.toggle}
                />}
                <EditorContent editor={editor} ref={editorRef} className="flex-1 overflow-y-auto" />
                <ContentItemMenu editor={editor} />
                <LinkMenu editor={editor} appendTo={menuContainerRef} />
                <TextMenu editor={editor} />
                <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
                <TableRowMenu editor={editor} appendTo={menuContainerRef} />
                <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
                <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
              </div>
            </div>
        </Suspense>
      </EditorContext.Provider>
    </div>
  )
};
