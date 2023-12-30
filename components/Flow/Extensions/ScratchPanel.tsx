'use client'

import { Direction, IconSetCache, Panel } from '@/components';
import { ScratchPanelProvider, ScratchNode, useScratchPanel } from '@/hooks';
import { cn } from '@/utils';
import { TLAnyShapeUtilConstructor, useEditor } from '@tldraw/tldraw';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';

export const ScratchedNode = ({children, onDragStart, onClick, index, className, empty=false}: any) => {
  const editor = useEditor();
  const hoverStyles = `hover:border-[#888] hover:bg-[#363d44] hover:shadow-[0px_1px_2px_#00000029,0px_1px_3px_#00000038,inset_0px_0px_0px_1px_var(--color-panel-contrast),0px_1px_3px_#00000077,0px_2px_6px_#00000055,inset_0px_0px_0px_1px_var(--color-panel-contrast),0px_1px_3px_#00000077,0px_2px_12px_rgba(0,0,0,0.22),inset_0px_0px_0px_1px_var(--color-panel-contrast)]`;
  const emptyStyles = `border-[#888] bg-[#363d44] shadow-[0px_1px_2px_#00000029,0px_1px_3px_#00000038,inset_0px_0px_0px_1px_var(--color-panel-contrast),0px_1px_3px_#00000077,0px_2px_6px_#00000055,inset_0px_0px_0px_1px_var(--color-panel-contrast),0px_1px_3px_#00000077,0px_2px_12px_rgba(0,0,0,0.22),inset_0px_0px_0px_1px_var(--color-panel-contrast)]`
  // no children === empty slot which if, clicked and there are selected nodes, then will add snapshot of selected nodes to panel as a new draggable node
  return (
    <div
      key={`draggable-node-${index}-box`}
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className={cn(`relative pointer-events-auto rounded-lg border bg-[#2c3136] border-secondary [&>*]:pointer-events-none overflow-hidden w-full h-auto flex`, !empty && hoverStyles, empty && editor.getSelectedShapeIds().length > 0 && emptyStyles, className)}
    >
      {children}
    </div>
  )
};

export interface ScratchPanelProps {
  scratchNodeUtils: TLAnyShapeUtilConstructor[];
}

export const ScratchPanel = (props: ScratchPanelProps) => {
  return (
    <ScratchPanelProvider>
      <div className={cn(`absolute right-0 top-[54%] h-[250px] z-[501]`)}>
        <Panel direction={Direction.left} className='h-[250px]'>
          <ScratchPanelInner {...props} />
        </Panel>
      </div>
    </ScratchPanelProvider>
  );
};

export const ScratchPanelInner = (props: ScratchPanelProps) => {
  const {
    scratchNodeUtils,
  } = props;
  const {
    scratchNodes,
    addNodeFromNodeeUtil,
    onDragStart,
    onEmptyNodeInPanelClick,
  } = useScratchPanel();
  const editor = useEditor();
  const [mounted, setMounted] = useState(false);

  const ScratchNodes = useCallback(() => {
    return scratchNodes.map((node: ScratchNode, index: number) => {
      return (
        <ScratchedNode onDragStart={(event: any) => onDragStart(event, node)} index={index} key={`draggable-node-${index}`} className={cn(`cursor-pointer pointer-events-auto`)}>
          {node.panelPreview}
        </ScratchedNode>
      );
    });
  }, [scratchNodes, onDragStart]);

  const EmptyScratchNodes = useCallback(() => {
    // round up to nearest multiple of 3, or set to 3 if already a multiple of 3
    const numEmptyNodes = Math.ceil(scratchNodes.length / 3) * 3 - scratchNodes.length || 3;
    return [...Array(numEmptyNodes)].map((_, index) => {
      return (
        <ScratchedNode onDragStart={() => {}} index={index} key={`empty-node-${index}`} empty={true} className={cn(editor.getSelectedShapeIds().length > 0 && `cursor-pointer pointer-events-auto`)} onClick={onEmptyNodeInPanelClick}>
          <div className={cn(`[background-image:linear-gradient(90deg,transparent,transparent_50%,#ffffff0d_50%,#363d44)] [background-size:200%_100%] bg-secondary rounded-md relative p-1 flex flex-col gap-1 w-full h-full justify-center items-center text-primary text-base overflow-hidden`, editor.getSelectedShapeIds().length > 0 && `animate-move-background`)}>
            <IconSetCache.Carbon.Add stroke="none" className="h-auto" />
          </div>
        </ScratchedNode>
      );
    });
  }, [editor, onEmptyNodeInPanelClick, scratchNodes.length]);

  useEffect(() => {
    if (!mounted) {
      scratchNodeUtils.forEach((node) => {
        addNodeFromNodeeUtil(node);
      });
      setMounted(true);
    }
  }, [scratchNodeUtils, addNodeFromNodeeUtil, mounted]);

  return (
    <div className={cn(`rounded-lg overflow-hidden touch-auto gap-1 grid auto-rows-fr grid-cols-[repeat(3,1fr)] w-[300px] h-full m-0 p-2 rounded-tr-none rounded-br-none border-0`)}>
      <ScratchNodes />
      <EmptyScratchNodes />
    </div>
  )
};
