'use client'

import { useCallback, useMemo } from "react";
import * as yup from "yup";
import { useEditor } from "@tldraw/editor";
import { Accordion, Form, FlowTab, FlowShapeUtil, inferSchemaField, filterNode, IconSetCache } from "@/components";
import { noop } from "@/utils";

export interface FlowNodesTabProps {};

export const FlowNodesTab = (props: FlowNodesTabProps) => {
  const {} = props;
  const editor = useEditor();

  const onNodeChange = useCallback((newNodeProperties: any) => {
    if (newNodeProperties.type === 'icon') {
      const icon = IconSetCache[newNodeProperties.props.iconSet]?.[newNodeProperties.props.icon];
      if (!icon) {
        newNodeProperties.props.icon = Object.keys(IconSetCache?.[newNodeProperties.props.iconSet])[0];
      }
    };
    editor.updateShape(newNodeProperties);
  }, [editor]);
  
  const items = () => { 
    const selectedNodes = editor.getSelectedShapes();
    return editor?.getCurrentPageShapesSorted().map((node: any, index: number) => {
      // filter out unnecessary fields
      const filteredNode = filterNode(node);
      // check if node is selected
      const selected = selectedNodes.includes(node);

      // infer schema fields for node
      const schemaFields: { [key: string]: any } = editor.getShapeUtil(filteredNode.type) instanceof FlowShapeUtil ? (editor.getShapeUtil(filteredNode.type) as FlowShapeUtil).getSchema(node) : {};
      Object.keys(node).forEach(key => {
        if (schemaFields[key]) return;
        const value = node[key];
        if (typeof value !== 'object' || typeof value === 'object' && Object.keys(value).length > 0) {
          schemaFields[key] = inferSchemaField(key, value);
        }
      });
      const nodeSchema = yup.object().shape(filterNode(schemaFields));

      return {
        name: `${index + 1}:  ${(node.id).replace('shape:', '')} - ${node.type}`,
        content: <Form object={node} schema={nodeSchema} onSubmit={onNodeChange} />,
        selected,
      }
    });
  };

  return (
    <FlowTab title="Nodes">
      <Accordion 
        spaceBetween={0}
        className="text-xs w-full"
        triggerClassName="px-2 py-1 text-xs text-primary font-bold"
        items={items()}
      />
    </FlowTab>
  );
};
FlowNodesTab.displayName = 'FlowNodesTab';
