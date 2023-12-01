'use client'

import { useCallback, useMemo, useState } from "react";
import * as yup from "yup";
import { useEditor } from "@tldraw/editor";
import { Accordion, Form, FlowTab, FlowNodeUtil, inferSchemaField, IconSetCache, KeysToIgnore, UnderlinedTitle, Switch } from "@/components";
import { cn, filterObject } from "@/utils";
import { useFlowExtractor } from "@/hooks";

export interface FlowNodesTabProps {};

export const FlowNodesTab = (props: FlowNodesTabProps) => {
  const {} = props;
  const editor = useEditor();
  const flowExtractor = useFlowExtractor();

  const onNodeChange = useCallback((newNodeProperties: any) => {
    if (newNodeProperties.type === 'icon') {
      const icon = IconSetCache[newNodeProperties.props.iconSet]?.[newNodeProperties.props.icon];
      if (!icon) {
        newNodeProperties.props.icon = Object.keys(IconSetCache?.[newNodeProperties.props.iconSet])[0];
      }
    };
    editor.updateShape(newNodeProperties);
  }, [editor]);
  
  const items = useCallback(() => {
    if (!editor) return [];
    const selectedNodes = editor.getSelectedShapes();
    return editor?.getCurrentPageShapesSorted().map((node: any, index: number) => {
      // filter out unnecessary fields
      const filteredNode = filterObject(node, KeysToIgnore);
      // check if node is selected
      const selected = selectedNodes.includes(node);

      // infer schema fields for node
      const schemaFields: { [key: string]: any } = editor.getShapeUtil(filteredNode.type) instanceof FlowNodeUtil ? (editor.getShapeUtil(filteredNode.type) as FlowNodeUtil<any>).getSchema(node) : {};
      Object.keys(node).forEach(key => {
        if (schemaFields[key]) return;
        const value = node[key];
        if (typeof value !== 'object' || typeof value === 'object' && Object.keys(value).length > 0) {
          schemaFields[key] = inferSchemaField(key, value);
        }
      });
      const nodeSchema = yup.object().shape(filterObject(schemaFields, KeysToIgnore));

      const stringName = `${index + 1}:  ${(node.id).replace('shape:', '')} - ${node.type}`;
      return {
        name: (
          <UnderlinedTitle className={cn(`flex w-full relative h-full py-1 pointer-events-auto z-[1000]`)}>
            <Switch
              asChild
              pressed={flowExtractor.nodesConfig.nodesToInclude.includes(node.id)}
              onPressedChange={(pressed: boolean) => flowExtractor.toggleNodeState(node.id)}
              className='absolute left-0'
            ><div/></Switch>
            {stringName}
          </UnderlinedTitle>
        ),
        content: (
          <div className={cn(`w-full h-full flex`)}>
            <Form object={node} schema={nodeSchema} onSubmit={onNodeChange} />
          </div>
        ),
        selected,
      }
    });
  }, [editor, flowExtractor, onNodeChange]);

  return (
    <FlowTab title="Nodes">
      <Accordion 
        spaceBetween={0}
        className="text-xs w-full"
        radius={'xlarge'}
        triggerClassName='w-full flex justify-center items-center'
        items={items()}
      />
    </FlowTab>
  );
};
FlowNodesTab.displayName = 'FlowNodesTab';
