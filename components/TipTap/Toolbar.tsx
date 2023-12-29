"use client";

import { cn } from "@/utils";
import { Loading } from '@/components';
import { Editor } from "@tiptap/react";
import { IconSetCache, Toolbar } from "@/components";

export type TableAction = {
  id: number;
  name: string;
  action: () => void;
};
export const TableActions = (editor: any): TableAction[] => [
  {
    id: 1,
    name: "Insert Table",
    action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
  },
  {
    id: 2,
    name: "Add Column Before",
    action: () => editor.chain().focus().addColumnBefore().run(),
  },
  {
    id: 3,
    name: "Add Column After",
    action: () => editor.chain().focus().addColumnAfter().run(),
  },
  {
    id: 4,
    name: "Delete Column",
    action: () => editor.chain().focus().deleteColumn().run(),
  },
  {
    id: 5,
    name: "Add Row Before",
    action: () => editor.chain().focus().addRowBefore().run(),
  },
  {
    id: 6,
    name: "Add Row After",
    action: () => editor.chain().focus().addRowAfter().run(),
  },
  {
    id: 7,
    name: "Delete Row",
    action: () => editor.chain().focus().deleteRow().run(),
  },
  {
    id: 8,
    name: "Delete Table",
    action: () => editor.chain().focus().deleteTable().run(),
  },
  {
    id: 9,
    name: "Merge Cells",
    action: () => editor.chain().focus().mergeCells().run(),
  },
  {
    id: 11,
    name: "Toggle Header Column",
    action: () => editor.chain().focus().toggleHeaderColumn().run(),
  },
  {
    id: 12,
    name: "Toggle Header Row",
    action: () => editor.chain().focus().toggleHeaderRow().run(),
  },
  {
    id: 13,
    name: "Toggle Header Cell",
    action: () => editor.chain().focus().toggleHeaderCell().run(),
  },
  {
    id: 14,
    name: "Merge Or Split",
    action: () => editor.chain().focus().mergeOrSplit().run(),
  },
  {
    id: 15,
    name: "Set Cell Attribute",
    action: () => editor.chain().focus().setCellAttribute("colspan", 2).run(),
  },
];

export interface ToolbarAction {
  id: number;
  name: string;
  icon: any;
  onClick: () => void;
  disable: boolean;
  isActive: string;
  hover?: boolean;
}
const ToolbarActions = (editor: any): ToolbarAction[] => [
  {
    id: 1,
    name: "bold",
    icon: <IconSetCache.Radix.FontBold className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().toggleBold().run(),
    disable: !editor.can().chain().focus().toggleBold().run(),
    isActive: editor.isActive("bold") ? "is-active text-accent-700" : "",
    hover: false,
  },
  {
    id: 2,
    name: "italic",
    icon: <IconSetCache.Radix.FontItalic className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().toggleItalic().run(),
    disable: !editor.can().chain().focus().toggleItalic().run(),
    isActive: editor.isActive("italic") ? "is-active text-accent-700" : "",
    hover: false,
  },
  {
    id: 21,
    name: "underline",
    icon: <IconSetCache.Radix.Underline className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().toggleUnderline().run(),
    disable: false,
    isActive: editor.isActive("underline") ? "is-active text-accent-700" : "",
    hover: false,
  },
  {
    id: 3,
    name: "strike",
    icon: <IconSetCache.Radix.Strikethrough className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().toggleStrike().run(),
    disable: !editor.can().chain().focus().toggleStrike().run(),
    isActive: editor.isActive("strike") ? "is-active text-accent-700" : "",
    hover: false,
  },
  {
    id: 4,
    name: "code",
    icon: <IconSetCache.Carbon.Code className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().toggleCode().run(),
    disable: !editor.can().chain().focus().toggleCode().run(),
    isActive: editor.isActive("code") ? "is-active text-accent-700" : "",
    hover: false,
  },
  {
    id: 5,
    name: "heading1",
    icon: <IconSetCache.Lucide.Heading1 className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    disable: false,
    isActive: editor.isActive("heading", { level: 1 }) ? "is-active text-accent-700" : "",
    hover: false,
  },
  {
    id: 6,
    name: "heading2",
    icon: <IconSetCache.Lucide.Heading2 className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    disable: false,
    isActive: editor.isActive("heading", { level: 2 }) ? "is-active text-accent-700" : "",
    hover: false,
  },
  {
    id: 13,
    name: "heading3",
    icon: <IconSetCache.Lucide.Heading3 className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    disable: false,
    isActive: editor.isActive("heading", { level: 3 }) ? "is-active text-accent-700" : "",
    hover: false,
  },
  {
    id: 14,
    name: "heading4",
    icon: <IconSetCache.Lucide.Heading4 className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    disable: false,
    isActive: editor.isActive("heading", { level: 4 }) ? "is-active text-accent-700" : "",
    hover: false,
  },
  {
    id: 15,
    name: "heading5",
    icon: <IconSetCache.Lucide.Heading5 className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
    disable: false,
    isActive: editor.isActive("heading", { level: 5 }) ? "is-active text-accent-700" : "",
    hover: false,
  },
  {
    id: 7,
    name: "paragraph",
    icon: <IconSetCache.Carbon.Paragraph className={cn("h-full w-auto stroke-current fill-current")} />,
    onClick: () => editor.chain().focus().setParagraph().run(),
    disable: false,
    isActive: editor.isActive("paragraph") ? "is-active text-accent-700" : "",
    hover: false,
  },
  {
    id: 8,
    name: "bullet list",
    icon: <IconSetCache.Carbon.List className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().toggleBulletList().run(),
    disable: false,
    isActive: editor.isActive("bulletList") ? "is-active text-accent-700 list-disc" : "",
    hover: false,
  },
  {
    id: 9,
    name: "ordered list",
    icon: <IconSetCache.Carbon.ListNumbered className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().toggleOrderedList().run(),
    disable: false,
    isActive: editor.isActive("orderedList") ? "is-active text-accent-700 list-decimal" : "",
    hover: false,
  },
  {
    id: 20,
    name: "highlight",
    icon: <IconSetCache.Carbon.TextHighlight className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().toggleHighlight().run(),
    disable: false,
    isActive: editor.isActive("highlight") ? "is-active text-accent-700" : "",
    hover: false,
  },
  {
    id: 16,
    name: "align left",
    icon: <IconSetCache.Radix.TextAlignLeft className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().setTextAlign("left").run(),
    disable: false,
    isActive: editor.isActive({ textAlign: "left" }) ? "is-active" : "",
    hover: false,
  },
  {
    id: 17,
    name: "align center",
    icon: <IconSetCache.Radix.TextAlignCenter className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().setTextAlign("center").run(),
    disable: false,
    isActive: editor.isActive({ textAlign: "center" }) ? "is-active text-accent-700 text-center" : "",
    hover: false,
  },
  {
    id: 18,
    name: "align right",
    icon: <IconSetCache.Radix.TextAlignRight className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().setTextAlign("right").run(),
    disable: false,
    isActive: editor.isActive({ textAlign: "right" }) ? "is-active" : "",
    hover: false,
  },
  {
    id: 19,
    name: "align justify",
    icon: <IconSetCache.Radix.TextAlignJustify className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().setTextAlign("justify").run(),
    disable: false,
    isActive: editor.isActive({ textAlign: "justify" }) ? "is-active" : "",
    hover: false,
  },
  {
    id: 10,
    name: "code block",
    icon: <IconSetCache.Carbon.Terminal className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().toggleCodeBlock().run(),
    disable: false,
    isActive: editor.isActive("codeBlock") ? "is-active text-accent-700" : "",
    hover: false,
  },
  {
    id: 11,
    name: "blockquote",
    icon: <IconSetCache.Carbon.Quotes className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().toggleBlockquote().run(),
    disable: false,
    isActive: editor.isActive("blockquote") ? "is-active text-accent-700" : "",
    hover: false,
  },
  {
    id: 12,
    name: "table",
    icon: <IconSetCache.Carbon.Table className={cn("h-full w-auto")} />,
    onClick: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    disable: false,
    isActive: editor.isActive("table") ? "is-active text-accent-700" : "",
    hover: true,
  },
];
export const ToolbarActionNames = (editor: Editor): string[] => ToolbarActions(editor).map((item) => item.name);

export interface TipTapToolbarProps {
  editor: Editor;
  actions?: string[]
}
export const TipTapToolbar = (props: TipTapToolbarProps) => {
  const { editor, actions = ToolbarActionNames(editor) } = props;

  const ToolbarItems = ToolbarActions(editor)
    .filter((item) => actions.includes(item.name))
    .map((item: any) => {
      return {
        type: "button",
        variant: 'none',
        children: item.icon,
        onClick: item.onClick,
        className: cn(`flex items-center justify-center text-primary bg-secondary rounded-sm border border-transparent hover:bg-tertiary hover:border-accent hover:text-accent p-1`, item.isActive),
      };
    });

  if (!editor) {
    return <Loading />;
  }
  return (
    <Toolbar
      items={ToolbarItems}
      className="flex w-auto h-auto items-center gap-1 rounded-sm [background-image:linear-gradient(to_bottom,rgb(var(--background-secondary)/1),rgb(var(--background-secondary)/1))] shadow-2xl shadow-black border-b border-primary"
    />
  );
};
