'use client'

import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { useEditor, useValue } from '@tldraw/tldraw';
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

export interface NodesTabProps {}

export const NodesTab = () => {
  const editor = useEditor();
  const currentPageShapesSorted: any = useValue('current page shapes', () => editor.getCurrentPageShapesSorted(), [editor]);
  const selectedShapeIds: any = useValue('selected shape ids', () => editor.getSelectedShapeIds(), [editor]);

  const onNodeChange = useCallback((newNodeProperties: any) => {
    if (!editor) return;
    if (newNodeProperties.type === 'icon') {
      const id = newNodeProperties.id;
      const currentNode: any = editor.getShape(id);
      if (currentNode.props.iconSet !== newNodeProperties.props.iconSet) {
        console.log('iconSet changed', currentNode.props.iconSet, newNodeProperties.props.iconSet);
        // update icon if iconSet has changed
        newNodeProperties.props.icon = Object.keys(IconSetCache?.[newNodeProperties.props.iconSet])[0];
      }
    }
    editor.updateShape({...newNodeProperties});
  }, [editor]);

  const items = useMemo(() => {
    return currentPageShapesSorted.map((node: any, index: number) => {
      // check if node is selected
      const selected = selectedShapeIds.includes(node.id);
      return {
        key: `${node.id}-${index}-${selected}`,
        name: getNodeNameComponent(node, selected ? `text-accent`: ``),
        content: (
          <div className={cn(`w-full h-full flex flex-col justify-stretch items-center p-1`)}>
            <Form object={filterObject(node, KeysToIgnore)} schema={buildNodeSchema(editor, node)} SchemaMap={NodeSchemaMappings} onSubmit={onNodeChange} />
          </div>
        ),
      };
    }) ?? []
  }, [onNodeChange, currentPageShapesSorted, selectedShapeIds]);

  return (
    <FlowTab title="Nodes">
      <Accordion
        spaceBetween={0}
        className="w-full text-xs p-1"
        triggerClassName="w-full flex justify-center items-center"
        items={items}
      />
    </FlowTab>
  );
};
NodesTab.displayName = 'NodesTab';
