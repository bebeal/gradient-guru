'use client'

import { TLShape, createShapeId, useEditor } from "@tldraw/tldraw";
import React, { useCallback } from "react";
import styled from "styled-components";

export const DropWrapperContainer = styled.div<any>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface DropWrapperProps {
  children: React.ReactNode;
}

// Used with ScratchPad to drag n drop nodes from and to the panel and canvas
export const DropWrapper = (props: DropWrapperProps) => {
  const { children } = props;
  const editor = useEditor();

  const zoomOut = useCallback(() => {
    editor.zoomToFit();
    const zoom = editor.getZoomLevel();
    editor.setCamera({ ...editor.getCamera(), z: zoom * 0.75 });
  }, [editor]);

  const dropNode = useCallback((point: any, parsedData: any, defaultProps: any) => {
    const node = {
      ...parsedData,
      id: createShapeId(),
      x: point.x - (defaultProps?.w / 2 || 0),
      y: point.y - (defaultProps?.h / 2 || 0),
    } as TLShape;
    editor.createShape(node);
    setTimeout(() => {
      zoomOut();
    }, 0);
  }, [editor, zoomOut]);

  const handleDrop = useCallback((event: any) => {
    event.preventDefault();

    const point = editor.screenToPage({ x: event.clientX, y: event.clientY });
    const nodeData = event.dataTransfer.getData("application/tldraw");
    const parsedData = JSON.parse(nodeData);
    const type = parsedData?.type;
    // is either a single node indicated by type
    if (type) {
      if (editor.shapeUtils[type] === undefined) return;
      const defaultProps = editor.getShapeUtil(parsedData?.type).getDefaultProps();
      dropNode(point, parsedData, defaultProps);
    } else {
      // or a group of nodes indicated by nodesToAdd
      const nodesToAdd = parsedData?.nodesToAdd;
      nodesToAdd.forEach((node: any) => {
        dropNode(point, node, node.props);
      });
    }

  }, [dropNode, editor] );

  return ( <DropWrapperContainer onDrop={handleDrop}>{children}</DropWrapperContainer> );
};
