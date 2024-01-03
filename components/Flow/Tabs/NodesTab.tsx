'use client'

import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { useEditor } from '@tldraw/editor';
import {
  Accordion,
  FlowTab,
  Form,
  NodeSchemaMappings,
  IconSetCache,
  KeysToIgnore,
  getNodeNameComponent,
  FlowNodeUtil,
} from '@/components';
import { cn, filterObject } from '@/utils';

const buildNodeSchema = (editor: any, node: any) => {
  const nodeSchema =
    editor.getShapeUtil(node.type) instanceof FlowNodeUtil
      ? (editor.getShapeUtil(node.type) as FlowNodeUtil<any>).getSchema(node)
      : NodeSchemaMappings;
    return yup.object().shape(nodeSchema).meta({ item: 'object' });
};

const buildNodeSchemas = (editor: any) => {
  if (!editor) return {};
  const newNodeSchema: any = {};
  editor?.getCurrentPageShapesSorted().map((node: any, index: number) => {
    newNodeSchema[node.id] = buildNodeSchema(editor, node);
  });
  return newNodeSchema;
};

export interface NodesTabProps {}

export const NodesTab = () => {
  const editor = useEditor();
  const [mounted, setMounted] = useState(false);
  const [nodesSchemas, setNodesSchemas] = useState<any>({});

  useEffect(() => {
    if (!mounted) {
      const schemas = buildNodeSchemas(editor);
      setNodesSchemas(schemas);
      setMounted(true);
    }
  }, [editor, mounted, nodesSchemas]);

  const onNodeChange = useCallback((newNodeProperties: any) => {
    if (newNodeProperties.type === 'icon') {
      const id = newNodeProperties.id;
      const currentNode: any = editor.getShape(id);
      if (currentNode.props.iconSet !== newNodeProperties.props.iconSet) {
        // update icon if iconSet has changed
        newNodeProperties.props.icon = Object.keys(IconSetCache?.[newNodeProperties.props.iconSet])[0];
      }
    }
    editor.updateShape({...newNodeProperties});
    setNodesSchemas((oldSchemas: any) => {
      const newNodeSchema = buildNodeSchema(editor, newNodeProperties);
      return {...oldSchemas, [newNodeProperties.id]: newNodeSchema};
    })
  }, [editor]);

  const items = useCallback(() => {
    const selectedShapes = editor.getSelectedShapeIds();
    return editor.getCurrentPageShapesSorted().map((node: any, index: number) => {
      // check if node is selected
      const selected = selectedShapes.includes(node.id);
      return {
        key: `${node.id}-${index}-${selected}`,
        name: getNodeNameComponent(node, selected ? `text-accent`: ``),
        content: (
          <div className={cn(`w-full h-full flex flex-col justify-stretch items-center p-1`)}>
            <Form object={filterObject(node, KeysToIgnore)} schema={nodesSchemas?.[node.id]} SchemaMap={NodeSchemaMappings} onSubmit={onNodeChange} />
          </div>
        ),
      };
    }) ?? []
  }, [editor, nodesSchemas, onNodeChange]);

  return (
    <FlowTab title="Nodes">
      <Accordion
        spaceBetween={0}
        className="w-full text-xs p-1"
        triggerClassName="w-full flex justify-center items-center"
        items={items()}
      />
    </FlowTab>
  );
};
NodesTab.displayName = 'NodesTab';
