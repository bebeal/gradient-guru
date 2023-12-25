'use client'

import { cn, nanoid } from '@/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useEditor } from '@tiptap/react';
import { MarkdownTipTapExtensions } from '@/components/TipTap/Extensions';

interface Comment {
  id: string
  content: string
  replies: Comment[]
  createdAt: Date
}

const getNewComment = (content: string): Comment => {
  return {
    id: `a${nanoid()}a`,
    content,
    replies: [],
    createdAt: new Date()
  }
}

export interface useTipTapProps {
  children?: any;
  content?: any;
  className?: string;
  extensions?: any;
}
export const useTipTap = (props: useTipTapProps) => {
  const {
    children,
    content='',
    className,
    extensions=MarkdownTipTapExtensions,
  } = props;
  const [items, setItems] = useState<any[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const commentsSectionRef = useRef<HTMLDivElement | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [replaceTerm, setReplaceTerm] = useState<string>("");

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: cn("prose prose-sm prose-zinc dark:prose-invert focus:outline-none", className),
      }
    },
    extensions,
    content: children || content,
    autofocus: false,
  });

  const updateContent = useCallback((content: string) => {
    editor?.commands.setContent(content);
  }, [editor]);

  const updateSearchReplace = useCallback(() => {
    editor?.commands?.setSearchTerm(searchTerm);
    editor?.commands?.setReplaceTerm(replaceTerm);
  }, [editor, searchTerm, replaceTerm]);

  const focusCommentWithActiveId = useCallback((id: string) => {
    if (!commentsSectionRef.current) return
    const commentInput = commentsSectionRef.current.querySelector<HTMLInputElement>(`input#${id}`)
    if (!commentInput) return
    commentInput.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    })
  }, []);

  const addVideo = (videoUrl: string) => editor?.commands.setVideo(videoUrl);

  const setComment = useCallback(() => {
    const newComment = getNewComment('')

    setComments([...comments, newComment])

    editor?.commands.setComment(newComment.id)

    setActiveCommentId(newComment.id)

    setTimeout(focusCommentWithActiveId)
  }, [comments, editor?.commands, focusCommentWithActiveId]);

  const setColor = useCallback((color: string = "#FFFFFF") => {
    editor?.commands.setColor(color);
  }, [editor]);

  useEffect(() => {
    if (!activeCommentId) return;
    focusCommentWithActiveId(activeCommentId);
  }, [activeCommentId, focusCommentWithActiveId]);

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
    comments,
    activeCommentId,
    commentsSectionRef,
    items,
    addVideo,
    updateContent,
    updateSearchReplace,
    setComment,
    setComments,
    setActiveCommentId,
    setItems,
    setColor,
    getCounts,
    getLinkAttributes,
    getText,
    getHTML,
    getJSON,
    getAll,
  }
};
