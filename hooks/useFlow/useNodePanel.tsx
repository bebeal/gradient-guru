import { FlowNodeUtil } from "@/components";
import { getExportedImageBlob } from "@/utils";
import { TLAnyShapeUtilConstructor, TLShape, createShapeId, useEditor } from "@tldraw/tldraw";
import { createContext, useCallback, useContext, useState } from "react";

export interface PanelNode {
  panelPreview: React.ReactNode;
  type?: string;
  nodesToAdd?: TLShape[];
}

export const NodePanelContext = createContext(
  {} as {
  nodesInPanel: PanelNode[];
  addNodeFromShapeUtil: (Shape: TLAnyShapeUtilConstructor) => void;
  addNodeFromSelectedNodes?: () => void;
  onDragStart: (event: any, node: PanelNode) => void;
  onEmptyNodeInPanelClick?: () => void;
});

export const NodePanelProvider = ({ children }: { children: React.ReactNode }) => {
  const editor = useEditor();
  const [nodesInPanel, setNodesInPanel] = useState<PanelNode[]>([]);

  const addNodeFromSelectedNodes = useCallback(() => {
    const nodesToAdd = editor.getSelectedShapes();
    const ids = nodesToAdd.map((s: any) => s.id);
    // get image for panel
    getExportedImageBlob(editor, ids, {type: 'png', background: false}).then(imageBlob => {
      if (imageBlob) {
        const objectURL = URL.createObjectURL(imageBlob);
        const nodeToAdd: PanelNode = {
          panelPreview: <img src={objectURL} alt="shape" />,
          nodesToAdd,
        };
        setNodesInPanel([...nodesInPanel, nodeToAdd]);
      }
    });
  }, [editor, nodesInPanel]);

  const addNodeFromShapeUtil = (Shape: TLAnyShapeUtilConstructor) => {
    const id = `${Shape.type}-${createShapeId()}`
    const defaultProps = (new Shape(editor)).getDefaultProps();
    const shape = {
      type: Shape.type,
      id: id,
      props: defaultProps,
    } as unknown as TLShape;
    const shapeUtil: any = editor.getShapeUtil(Shape.type);
    const panelPreview = (shapeUtil as FlowNodeUtil).panelPreview(shape);
    const nodeToAdd: PanelNode = {
      panelPreview,
      type: Shape.type,
    };
    // ensure node in panel with type doesn't already exist, if it does overwrite it
    const nodeIndex = nodesInPanel.findIndex((node: PanelNode) => node.type === Shape.type);
    if (nodeIndex > -1) {
      const newNodesInPanel = [...nodesInPanel];
      newNodesInPanel[nodeIndex] = nodeToAdd;
      setNodesInPanel(newNodesInPanel);
    } else {
      setNodesInPanel([...nodesInPanel, nodeToAdd]);
    }
  }

  const onDragStart = useCallback((event: any, node: PanelNode) => {
    const { type, nodesToAdd } = node;
    event.dataTransfer.setData('application/tldraw', JSON.stringify({type, nodesToAdd}));      
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  const onEmptyNodeInPanelClick = useCallback(() => {
    if (editor.getSelectedShapeIds().length > 0) {
      addNodeFromSelectedNodes();
    }
  }, [addNodeFromSelectedNodes, editor]);


  return (
    <NodePanelContext.Provider value={{ nodesInPanel, addNodeFromShapeUtil, addNodeFromSelectedNodes, onDragStart, onEmptyNodeInPanelClick }}>
      {children}
    </NodePanelContext.Provider>
  );
}

export const useNodePanel = () => {
  const ctx = useContext(NodePanelContext);

  if (!ctx) {
    throw new Error('useNodePanel must be used within a NodePanelProvider');
  }

  return {
    ...ctx,
  }
};





