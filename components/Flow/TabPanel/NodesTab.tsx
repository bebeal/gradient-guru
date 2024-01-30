'use client'

import { useCallback } from 'react';
import * as yup from 'yup';
import { Editor, useEditor, useValue } from '@tldraw/tldraw';
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

export interface NodesTabProps {}

export const NodesTab = () => {
  const editor: Editor = useEditor();
  const currentPageShapesSorted: any = useValue('current page shapes', () => editor.getCurrentPageShapesSorted(), [editor]);
  const selectedShapeIds: any = useValue('selected shape ids', () => editor.getSelectedShapeIds(), [editor]);

  const onNodeChange = useCallback((newNodeProperties: any) => {
    if (!editor) return;
    if (newNodeProperties.type === 'icon') {
      const id = newNodeProperties.id;
      const currentNode: any = currentPageShapesSorted.find((node: any) => node.id === id);
      if (currentNode.props.iconSet !== newNodeProperties.props.iconSet) {
        // update icon if iconSet has changed
        const newIcon = Object.keys(IconSetCache?.[newNodeProperties.props.iconSet])[0];
        newNodeProperties.props.icon = newIcon;
      }
    }
    editor.updateShape({...newNodeProperties});
  }, [currentPageShapesSorted, editor]);

  const buildNodeSchema = useCallback((node: any) => {
    const nodeSchema = editor.getShapeUtil(node.type) instanceof FlowNodeUtil
      ? (editor.getShapeUtil(node.type) as FlowNodeUtil<any>).getSchema(node)
      : NodeSchemaMappings;
    return yup.object().shape(nodeSchema).meta({ item: 'object' });
  }, [editor]);

  const items = useCallback(() => {
    return currentPageShapesSorted.map((node: any, index: number) => {
      // check if node is selected
      const selected = selectedShapeIds.includes(node.id);
      const obj = filterObject(node, KeysToIgnore);
      return {
        name: getNodeNameComponent(node, selected ? `text-accent`: ``),
        content: (
          <div className={cn(`w-full flex flex-col justify-stretch items-center p-1`)}>
            <Form object={obj} schema={buildNodeSchema(obj)} SchemaMap={NodeSchemaMappings} onSubmit={(newNodeProperties: any) => onNodeChange(newNodeProperties)} />
          </div>
        ),
      };
    }) ?? [];
  }, [currentPageShapesSorted, selectedShapeIds, buildNodeSchema, onNodeChange]);

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
