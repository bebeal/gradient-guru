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

export interface DropWrapperProps {
  children: React.ReactNode;
}

export const DropWrapper = (props: DropWrapperProps) => {
  const { children } = props;
  const editor = useEditor();

  const handleDrop = useCallback((event: any) => {
    event.preventDefault();

    const shapeData = event.dataTransfer.getData('application/tldraw');
    const type = JSON.parse(shapeData).type;
    const rect = editor.getShapeUtil(type).getDefaultProps();
    const point = editor.screenToPage({ x: event.clientX, y: event.clientY });
    
    const shape = {
      type: type,
      id: createShapeId(),
      props: {
        ...editor.getShapeUtil(type).getDefaultProps(),
      },
      x: point.x - rect.w/2,
      y: point.y - rect.h/2,
    } as TLShape;

    editor.createShape(shape);

  }, [editor]);

  return (
    <DropWrapperContainer onDrop={handleDrop}>
      {children}
    </DropWrapperContainer>
  );
};
