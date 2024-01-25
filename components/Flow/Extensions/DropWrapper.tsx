'use client'

import { TLShape, createShapeId, useEditor } from "@tldraw/tldraw";
import React, { useCallback } from "react";
import styled from "styled-components";
import { zoomToFitNewNode } from "..";

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

  const dropNode = useCallback((node: TLShape) => {
    editor.createShape(node);
    setTimeout(() => {
      zoomToFitNewNode(editor);
    }, 0);
  }, [editor]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const point = editor.screenToPage({ x: event.clientX, y: event.clientY });
    const nodeData = event.dataTransfer.getData("application/tldraw");
    const parsedData = JSON.parse(nodeData);
    const type = parsedData?.type;

    if (type) {
      if (editor.shapeUtils[type] === undefined) return;
      const defaultProps = editor.getShapeUtil(type).getDefaultProps();
      const node: TLShape = {
        ...parsedData,
        id: createShapeId(),
        x: point.x - (defaultProps?.w / 2 || 0),
        y: point.y - (defaultProps?.h / 2 || 0),
      };
      dropNode(node);
    } else {
      const nodesToAdd = parsedData?.nodesToAdd;

      // Calculate collective bounds
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      nodesToAdd.forEach((node: any) => {
        const bounds = editor.getShapePageBounds(node)!;
        minX = Math.min(minX, bounds.minX);
        minY = Math.min(minY, bounds.minY);
        maxX = Math.max(maxX, bounds.maxX);
        maxY = Math.max(maxY, bounds.maxY);
      });

      const center = { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
      const offset = { x: point.x - center.x, y: point.y - center.y };

      nodesToAdd.forEach((node: any) => {
        const adjustedNode: TLShape = {
          ...node,
          id: createShapeId(),
          x: node.x + offset.x,
          y: node.y + offset.y,
        };
        dropNode(adjustedNode);
      });
    }

  }, [dropNode, editor]);

  return <DropWrapperContainer onDrop={handleDrop}>{children}</DropWrapperContainer>;
};