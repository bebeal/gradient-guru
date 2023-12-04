'use client'

import { useCallback, useEffect, useState } from 'react';
import { useEditor } from '@tldraw/editor';
import * as yup from 'yup';
import {
  Accordion,
  FlowNodeUtil,
  FlowTab,
  Form,
  IconSetCache,
  KeysToIgnore,
  Switch,
  TabTitle,
  inferSchemaField,
} from '@/components';
import { useFlowExtractor } from '@/hooks';
import { cn, filterObject } from '@/utils';

export interface FlowNodesTabProps {}

export const FlowNodesTab = () => {
  const editor = useEditor();
  const flowExtractor = useFlowExtractor();
  const [nodeSchemas, setNodeSchemas] = useState<{ [key: string]: any }>({});

  const onNodeChange = useCallback((newNodeProperties: any) => {
    if (newNodeProperties.type === 'icon') {
      const icon = IconSetCache[newNodeProperties.props.iconSet]?.[newNodeProperties.props.icon];
      if (!icon) {
        newNodeProperties.props.icon = Object.keys(IconSetCache?.[newNodeProperties.props.iconSet])[0];
      }
    }
    editor.updateShape(newNodeProperties);
  }, [editor]);

  useEffect(() => {
    const newNodeSchema: any = {};
    editor?.getCurrentPageShapesSorted().map((node: any, index: number) => {
      // filter out unnecessary fields
      const filteredNode = filterObject(node, KeysToIgnore);
      // infer schema fields for node
      const schemaFields: { [key: string]: any } =
      editor.getShapeUtil(filteredNode.type) instanceof FlowNodeUtil
        ? (editor.getShapeUtil(filteredNode.type) as FlowNodeUtil<any>).getSchema(node)
        : {};
      Object.keys(node).forEach((key) => {
        if (schemaFields[key]) return;
        const value = node[key];
        if (typeof value !== 'object' || (typeof value === 'object' && Object.keys(value).length > 0)) {
          schemaFields[key] = inferSchemaField(key, value);
        }
      });
      const nodeSchema = yup.object().shape(filterObject(schemaFields, KeysToIgnore));
      newNodeSchema[node.id] = nodeSchema;
    });
    setNodeSchemas(newNodeSchema);
  }, [editor]);

  const items = useCallback(() => {
    if (!editor) return [];
    const selectedNodes = editor.getSelectedShapes();
    return editor?.getCurrentPageShapesSorted().map((node: any, index: number) => {
      // check if node is selected
      const selected = selectedNodes.includes(node);
      

      const stringName = `${node.type} - ${node.id.replace('shape:', '')}`;
      return {
        name: (
          <div className={cn(`pointer-events-auto relative z-[1000] flex h-full w-full py-0.5 gap-1 justify-center items-center`)}>
            <Switch
              asChild
              pressed={!flowExtractor.nodesConfig.nodesToExclude.includes(node.id)}
              onPressedChange={(pressed: boolean) => flowExtractor.toggleNodeState(node.id)}
              className="absolute left-0"
            ><div /></Switch>
            <div className="text-primary/80 text-xs font-bold">{stringName}</div>
          </div>
        ),
        content: (
          <div className={cn(`w-full h-full flex flex-col justify-center items-center`)}>
            <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
              <TabTitle className={cn(`text-md w-full`)}>Properties</TabTitle>
              <Form object={node} schema={nodeSchemas[node.id]} onSubmit={onNodeChange} />
            </div>
          </div>
        ),
        selected,
      };
    });
  }, [editor, flowExtractor, nodeSchemas, onNodeChange]);

  return (
    <FlowTab title="Nodes">
      <Accordion
        spaceBetween={0}
        className="w-full text-xs"
        triggerClassName="w-full flex justify-center items-center"
        items={items()}
      />
    </FlowTab>
  );
};
FlowNodesTab.displayName = 'FlowNodesTab';
