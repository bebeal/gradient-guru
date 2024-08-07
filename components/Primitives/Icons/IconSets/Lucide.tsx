import { AlignCenter, AlignHorizontalDistributeCenter, AlignHorizontalDistributeEnd, AlignHorizontalDistributeStart, AlignJustify, AlignLeft, AlignRight, ArrowDown, ArrowDownToLine, ArrowLeft, ArrowLeftToLine, ArrowRight, ArrowRightToLine, ArrowUp, ArrowUpToLine, Bold, Book, Camera, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, CircleSlash, Clipboard, Code, Code2, Columns, Copy, Eraser, GripVertical, Heading, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Highlighter, Image, Italic, Languages, Link, List, ListOrdered, ListTodo, LucideAlignHorizontalDistributeEnd, Mic, MoreHorizontal, MoreVertical, Palette, PanelLeft, PanelLeftClose, PanelRight, Pen, PenLine, Pilcrow, Plus, Quote, Redo, RemoveFormatting, SmilePlus, SquareCode, Strikethrough, Subscript, Superscript, Table, TextQuote, Trash, Trash2, Underline, Undo, Upload } from 'lucide-react';
import { IconSetMap } from '../IconSet';

export const LucideIconSet: IconSetMap = {
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Camera,
  Plus,
  GripVertical,
  RemoveFormatting,
  Clipboard,
  Copy,
  Trash,
  Trash2,
  Pilcrow,
  Columns,
  PanelLeftClose,
  PanelLeft,
  PanelRight,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Code2,
  Highlighter,
  Palette,
  MoreVertical,
  MoreHorizontal,
  Subscript,
  Superscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Image,
  Upload,
  ListTodo,
  List,
  ListOrdered,
  Undo,
  Redo,
  AlignHorizontalDistributeCenter,
  AlignHorizontalDistributeEnd,
  AlignHorizontalDistributeStart,
  ArrowLeftToLine,
  ArrowRightToLine,
  ArrowUpToLine,
  ArrowDownToLine,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  SquareCode,
  Quote,
  TextQuote,
  Table,
  Book,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Mic,
  Pen,
  PenLine,
  CircleSlash,
  Eraser,
  SmilePlus,
  Languages,
  Link,

};
export const LucideIconNames = Object.keys(LucideIconSet);
export type LucideIcon = keyof typeof LucideIconSet;
