import { Direction, IconSetCache, Panel } from '@/components';
import { NodePanelProvider, PanelNode, useNodePanel } from '@/hooks';
import { cn } from '@/utils';
import { TLAnyShapeUtilConstructor, useEditor } from '@tldraw/tldraw';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';

export interface NodePanelProps {
  shapeUtils: TLAnyShapeUtilConstructor[];
}

export const NodePanel = (props: NodePanelProps) => {
  return (
    <NodePanelProvider>
      <div className={cn(`absolute right-0 top-[47%] h-[302px] z-[501]`)}>
        <Panel direction={Direction.left} className='h-[302px]'>
          <NodePanelInner {...props} />
        </Panel>
      </div>
    </NodePanelProvider>
  );
};

export const NodeInPanel = ({children, onDragStart, index}: any) => {
  const editor = useEditor();
  const { onEmptyNodeInPanelClick } = useNodePanel();
  const hoverStyles = `hover:border-[#888] hover:bg-[#363d44] hover:shadow-[0px_1px_2px_#00000029,0px_1px_3px_#00000038,inset_0px_0px_0px_1px_var(--color-panel-contrast),0px_1px_3px_#00000077,0px_2px_6px_#00000055,inset_0px_0px_0px_1px_var(--color-panel-contrast),0px_1px_3px_#00000077,0px_2px_12px_rgba(0,0,0,0.22),inset_0px_0px_0px_1px_var(--color-panel-contrast)]`;
  // no children === empty slot which if, clicked and there are selected nodes, then will add snapshot of selected nodes to panel as a new draggable node
  const numChildren = React.Children.count(children);
  return (
    <div
      key={`draggable-node-${index}-box`}
      draggable
      onDragStart={onDragStart}
      className={cn(`overflow-hidden block items-center justify-center row-span-1 col-span-1 rounded-lg border bg-[#2c3136] border-secondary`, (numChildren > 0 || editor.getSelectedShapeIds().length > 0) && hoverStyles)}
    >
      {numChildren > 0 && children}
      {numChildren === 0 && <div onClick={onEmptyNodeInPanelClick} className={cn(`flex w-full h-full justify-center items-center [background-image:linear-gradient(90deg,transparent,transparent_50%,#ffffff0d_50%,#ffffff0d)] [background-size:200%_100%] bg-secondary shadow-[0px_1px_2px_#00000029,0px_1px_3px_#00000038,inset_0px_0px_0px_1px_var(--color-panel-contrast)] pointer-events-none`, editor.getSelectedShapeIds().length > 0 && `animate-move-background cursor-pointer pointer-events-auto`)}><IconSetCache.Carbon.Add stroke="none" width="50%" height="50%" /></div>}
    </div>
  )
}

export const NodePanelInner = (props: NodePanelProps) => {
  const {
    shapeUtils,
  } = props;
  const {
    nodesInPanel,
    addNodeFromShapeUtil,
    onDragStart,
  } = useNodePanel();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      shapeUtils.map((Shape) => {
        addNodeFromShapeUtil(Shape);
      });
      setMounted(true);
    }
  }, [shapeUtils, addNodeFromShapeUtil, mounted]);

  const NodeList = useCallback(() => {
    return nodesInPanel.map((node: PanelNode, index: number) => {
      return (
        <NodeInPanel onDragStart={(event: any) => onDragStart(event, node)} index={index} key={`draggable-node-${index}`}>
          <div
            className={cn(`relative flex grow cursor-pointer overflow-hidden items-center justify-center w-full h-full text-[8px] [&>*]:pointer-events-none [&>*]:max-w-full [&>*]:max-h-full [&>*]:overflow-hidden`)}
          >
            {node.panelPreview}
          </div>
        </NodeInPanel>
      );
    });
  }, [nodesInPanel, onDragStart]);

  const EmptyNodeList = useCallback(() => {
    // round up to nearest multiple of 3, or set to 3 if already a multiple of 3
    const numEmptyNodes = Math.ceil(nodesInPanel.length / 3) * 3 - nodesInPanel.length || 3;
    return [...Array(numEmptyNodes)].map((_, index) => {
      return (
        <NodeInPanel onDragStart={() => {}} index={index} key={`empty-node-${index}`}>
        </NodeInPanel>
      );
    });
  }, [nodesInPanel]);

  return (
    <div className={cn(`rounded-lg overflow-hidden touch-auto gap-1 grid grid-cols-[repeat(3,1fr)] w-[300px] h-[300px] m-0 p-2 rounded-tr-none rounded-br-none border-0`)}>
      <NodeList />
      <EmptyNodeList />
    </div>
  )
};
