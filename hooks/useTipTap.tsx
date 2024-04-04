'use client'

import { cn } from '@/utils';
import { useCallback } from 'react';
import { useEditor } from '@tiptap/react';
import { TipTapProps } from '@/components';
import { MarkdownTipTapExtensions } from '@/components/TipTap/Extensions/Extensions';

export interface useTipTapProps extends Partial<TipTapProps> {
}

export const useTipTap = (props: useTipTapProps) => {
  const {
    children,
    content='',
    className,
    extensions=MarkdownTipTapExtensions,
    ...rest
  } = props;
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: cn("prose prose-sm prose-zinc dark:prose-invert w-full h-full p-4 focus:outline-none !max-w-full", className),
      }
    },
    extensions,
    content: children || content,
    ...rest
  });

  const updateContent = useCallback((content: string) => {
    editor?.commands.setContent(content);
  }, [editor]);

  const setColor = useCallback((color: string = "#FFFFFF") => {
    editor?.commands.setColor(color);
  }, [editor]);

  const addVideo = (videoUrl: string) => editor?.commands.setVideo(videoUrl);

  const getCounts = useCallback(() => {
    const characters = editor?.storage?.characterCount?.characters();
    const words = editor?.storage?.characterCount?.words();

    return {
      characters,
      words,
    }
  }, [editor]);

  const getLinkAttributes = useCallback(() => {
    return editor?.getAttributes('link').href
  }, [editor]);

  const getText = useCallback(() => {
    return editor?.getText();
  }, [editor]);

  const getHTML = useCallback(() => {
    return editor?.getHTML();
  }, [editor]);

  const getJSON = useCallback(() => {
    return editor?.getJSON();
  }, [editor]);

  const getMarkdown = useCallback(() => {
    return editor?.storage?.markdown?.getMarkdown();
  }, [editor]);

  const getAll = useCallback(() => {
    return { ...editor?.storage, meta: { counts: getCounts(), linkAttributes: getLinkAttributes(), text: getText(), html: getHTML(), json: getJSON(), markdown: getMarkdown() } };
  }, [editor?.storage, getCounts, getHTML, getJSON, getLinkAttributes, getMarkdown, getText]);

  return {
    editor,
    updateContent,
    setColor,
    addVideo,
    getCounts,
    getLinkAttributes,
    getText,
    getHTML,
    getJSON,
    getAll,
  }
};
