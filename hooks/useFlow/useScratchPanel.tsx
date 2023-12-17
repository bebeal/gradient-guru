'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { createShapeId, TLAnyShapeUtilConstructor, TLShape, useEditor } from '@tldraw/tldraw';
import { FlowNodeUtil } from '@/components';
import { getExportedImageBlob } from '@/utils';
import { ImageExtractorConfig } from './useContentExtractor';

export interface ScratchNode {
  panelPreview: React.ReactNode;
  type?: string;
  nodesToAdd?: TLShape[];
}

export const ScratchPanelContext = createContext(
  {} as {
    scratchNodes: ScratchNode[];
    addNodeFromNodeeUtil: (Shape: TLAnyShapeUtilConstructor) => void;
    addNodeFromSelectedNodes?: () => void;
    onDragStart: (event: any, node: ScratchNode) => void;
    onEmptyNodeInPanelClick?: () => void;
  }
);

export const ScratchPanelProvider = ({ children }: { children: React.ReactNode }) => {
  const editor = useEditor();
  const [scratchNodes, setScratchNodes] = useState<ScratchNode[]>([]);

  const addNodeFromSelectedNodes = useCallback(() => {
    const nodesToAdd = editor.getSelectedShapes();
    const ids = nodesToAdd.map((s: any) => s.id);
    // get image for panel
    getExportedImageBlob(editor, ids, { type: 'png', background: false } as ImageExtractorConfig).then((imageBlob) => {
      if (imageBlob) {
        const objectURL = URL.createObjectURL(imageBlob);
        const nodeToAdd: ScratchNode = {
          panelPreview: <img src={objectURL} alt="shape" />,
          nodesToAdd,
        };
        setScratchNodes((prevScratchNodes) => [...prevScratchNodes, nodeToAdd]);
      }
    });
  }, [editor]);

  const addNodeFromNodeeUtil = useCallback(
    (Shape: TLAnyShapeUtilConstructor) => {
      const id = `${Shape.type}-${createShapeId()}`;
      const defaultProps = new Shape(editor).getDefaultProps();
      const shape = {
        type: Shape.type,
        id: id,
        props: defaultProps,
      } as unknown as TLShape;
      const shapeUtil: any = editor.getShapeUtil(Shape.type);
      const panelPreview = (shapeUtil as FlowNodeUtil<any>).panelPreview(shape);
      const nodeToAdd: ScratchNode = {
        panelPreview,
        type: Shape.type,
      };
      // ensure node in panel with type doesn't already exist, if it does overwrite it
      setScratchNodes((prevScratchNodes) => {
        // Check if node of this type already exists, if so, replace it
        const existingNodeIndex = prevScratchNodes.findIndex((node) => node.type === Shape.type);
        if (existingNodeIndex > -1) {
          const newscratchNodes = [...prevScratchNodes];
          newscratchNodes[existingNodeIndex] = nodeToAdd;
          return newscratchNodes;
        } else {
          return [...prevScratchNodes, nodeToAdd];
        }
      });
    },
    [editor]
  );

  const onDragStart = useCallback((event: any, node: ScratchNode) => {
    const { type, nodesToAdd } = node;
    event.dataTransfer.setData('application/tldraw', JSON.stringify({ type, nodesToAdd }));
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  const onEmptyNodeInPanelClick = useCallback(() => {
    if (editor.getSelectedShapeIds().length > 0) {
      addNodeFromSelectedNodes();
    }
  }, [addNodeFromSelectedNodes, editor]);

  return <ScratchPanelContext.Provider value={{ scratchNodes, addNodeFromNodeeUtil, addNodeFromSelectedNodes, onDragStart, onEmptyNodeInPanelClick }}>{children}</ScratchPanelContext.Provider>;
};

export const useScratchPanel = () => {
  const ctx = useContext(ScratchPanelContext);

  if (!ctx) {
    throw new Error('useScratchPanel must be used within a ScratchPanelProvider');
  }

  return {
    ...ctx,
  };
};
