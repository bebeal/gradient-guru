'use client'

import { useEditor } from "@tldraw/editor";
import { FlowTab } from "./shared";
import { useMemo } from "react";
import { Accordion } from "@/components";

export interface FlowNodesTabProps {};

export const FlowNodesTab = (props: FlowNodesTabProps) => {
  const editor = useEditor();
  
  const items = useMemo(() => { 
    return editor?.getCurrentPageShapesSorted().map((shape: any, index: number) => {
      const selected = editor?.getSelectedShapes().includes(shape);
      const mutableShape = { ...shape };
      return {
        name: `Node ${index + 1}`,
        content: <div>Node {index + 1}</div>,
        selected,
      }
    });
  }, [editor]);

  return (
    <FlowTab title="Nodes">
      <Accordion 
        spaceBetween={0}
        className="text-xs text-primary font-bold"
        triggerClassName="px-2 py-1 text-xs text-primary font-bold"
        items={items}
      />
    </FlowTab>
  );
};
FlowNodesTab.displayName = 'FlowNodesTab';
