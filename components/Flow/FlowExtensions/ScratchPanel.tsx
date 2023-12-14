'use client'

import { Direction, IconSetCache, Panel } from '@/components';
import { ScratchPanelProvider, ScratchNode, useScratchPanel } from '@/hooks';
import { cn } from '@/utils';
import { TLAnyShapeUtilConstructor, useEditor } from '@tldraw/tldraw';
import React, { useEffect } from 'react';
import { useCallback } from 'react';

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

export const ScratchedNode = ({children, onDragStart, index}: any) => {
  const editor = useEditor();
  const { onEmptyNodeInPanelClick } = useScratchPanel();
  const hoverStyles = `hover:border-[#888] hover:bg-[#363d44] hover:shadow-[0px_1px_2px_#00000029,0px_1px_3px_#00000038,inset_0px_0px_0px_1px_var(--color-panel-contrast),0px_1px_3px_#00000077,0px_2px_6px_#00000055,inset_0px_0px_0px_1px_var(--color-panel-contrast),0px_1px_3px_#00000077,0px_2px_12px_rgba(0,0,0,0.22),inset_0px_0px_0px_1px_var(--color-panel-contrast)]`;
  const emptyStyles = `border-[#888] bg-[#363d44] shadow-[0px_1px_2px_#00000029,0px_1px_3px_#00000038,inset_0px_0px_0px_1px_var(--color-panel-contrast),0px_1px_3px_#00000077,0px_2px_6px_#00000055,inset_0px_0px_0px_1px_var(--color-panel-contrast),0px_1px_3px_#00000077,0px_2px_12px_rgba(0,0,0,0.22),inset_0px_0px_0px_1px_var(--color-panel-contrast)]`
  // no children === empty slot which if, clicked and there are selected nodes, then will add snapshot of selected nodes to panel as a new draggable node
  const numChildren = React.Children.count(children);
  return (
    <div
      key={`draggable-node-${index}-box`}
      draggable
      onDragStart={onDragStart}
      className={cn(`overflow-hidden flex items-center justify-center row-span-1 col-span-1 rounded-lg border bg-[#2c3136] border-secondary`, numChildren > 0 && editor.getSelectedShapeIds().length === 0 && hoverStyles, numChildren === 0 && editor.getSelectedShapeIds().length > 0 && emptyStyles)}
    >
      {numChildren > 0 && children}
      {numChildren === 0 && <div onClick={onEmptyNodeInPanelClick} className={cn(`flex w-full h-full justify-center items-center [background-image:linear-gradient(90deg,transparent,transparent_50%,#ffffff0d_50%,#363d44)] [background-size:200%_100%] bg-secondary pointer-events-none border-0 rounded-md`, editor.getSelectedShapeIds().length > 0 && `animate-move-background cursor-pointer pointer-events-auto`)}><IconSetCache.Carbon.Add stroke="none" width="50%" height="50%" /></div>}
    </div>
  )
};

export const ScratchPanelInner = (props: ScratchPanelProps) => {
  const {
    scratchNodeUtils,
  } = props;
  const {
    scratchNodes,
    addNodeFromNodeeUtil,
    onDragStart,
  } = useScratchPanel();
  const [mounted, setMounted] = React.useState(false);

  const ScratchNodes = useCallback(() => {
    return scratchNodes.map((node: ScratchNode, index: number) => {
      return (
        <ScratchedNode onDragStart={(event: any) => onDragStart(event, node)} index={index} key={`draggable-node-${index}`}>
          <div
            className={cn(`relative flex grow cursor-pointer overflow-hidden items-center justify-center w-full h-full text-[8px] [&>*]:pointer-events-none [&>*]:max-w-full [&>*]:max-h-full [&>*]:overflow-hidden`)}
          >
            {node.panelPreview}
          </div>
        </ScratchedNode>
      );
    });
  }, [scratchNodes, onDragStart]);

  const EmptyScratchNodes = useCallback(() => {
    // round up to nearest multiple of 3, or set to 3 if already a multiple of 3
    const numEmptyNodes = Math.ceil(scratchNodes.length / 3) * 3 - scratchNodes.length || 3;
    return [...Array(numEmptyNodes)].map((_, index) => {
      return (
        <ScratchedNode onDragStart={() => {}} index={index} key={`empty-node-${index}`}>
        </ScratchedNode>
      );
    });
  }, [scratchNodes]);

  useEffect(() => {
    if (!mounted) {
      scratchNodeUtils.forEach((node) => {
        addNodeFromNodeeUtil(node);
      });
      setMounted(true);
    }
  }, [scratchNodeUtils, addNodeFromNodeeUtil, mounted]);

  return (
    <div className={cn(`rounded-lg overflow-hidden touch-auto gap-1 grid grid-cols-[repeat(3,1fr)] w-[300px] h-full m-0 p-2 rounded-tr-none rounded-br-none border-0`)}>
      <ScratchNodes />
      <EmptyScratchNodes />
    </div>
  )
};
