'use client'

import { useCallback } from 'react';
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
  ToggleTitle,
  inferSchemaField,
} from '@/components';
import { useFlowExtractor } from '@/hooks';
import { cn, filterObject } from '@/utils';

export interface NodesTabProps {}

export const NodesTab = () => {
  const editor = useEditor();
  const flowExtractor = useFlowExtractor();

  const onNodeChange = useCallback((newNodeProperties: any) => {
    if (newNodeProperties.type === 'icon') {
      const icon = IconSetCache[newNodeProperties.props.iconSet]?.[newNodeProperties.props.icon];
      if (!icon) {
        const newIcon = Object.keys(IconSetCache?.[newNodeProperties.props.iconSet])[0];
        newNodeProperties.props.icon = newIcon;
      }
    }
    editor.updateShape(newNodeProperties);
  }, [editor]);

  const buildNodeSchemas = useCallback(() => {
    const newNodeSchema: any = {};
    editor?.getCurrentPageShapesSorted().map((node: any, index: number) => {
      // filter out unnecessary fields
      const filteredNode = filterObject(node, KeysToIgnore);
      // infer schema fields for node
      const schemaFields: { [key: string]: any } =
      editor.getShapeUtil(filteredNode.type) instanceof FlowNodeUtil
        ? (editor.getShapeUtil(filteredNode.type) as FlowNodeUtil<any>).getSchema({...node})
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
    return newNodeSchema;
  }, [editor]);

  const items = useCallback(() => {
    if (!editor) return [];
    const nodeSchemas = buildNodeSchemas();
    const selectedNodes = editor.getSelectedShapes();
    return editor?.getCurrentPageShapesSorted().map((node: any, index: number) => {
      // check if node is selected
      const selected = selectedNodes.includes(node);
      const stringName = `${node.type} - ${node.id.replace('shape:', '')}`;
      return {
        name: <ToggleTitle title={stringName} pressed={!flowExtractor.nodesConfig.nodesToExclude.includes(node.id)} onPressedChange={(pressed: boolean) => flowExtractor.toggleNodeState(node.id)} />,
        content: (
          <div className={cn(`w-full h-full flex flex-col justify-stretch items-center`)}>
            <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
              <TabTitle className={cn(`text-md w-full`)}>Properties</TabTitle>
              <Form object={{...node}} schema={nodeSchemas[node.id]} onSubmit={onNodeChange} />
            </div>
          </div>
        ),
        selected,
      };
    });
  }, [editor, buildNodeSchemas, flowExtractor, onNodeChange]);

  return (
    <FlowTab title="Nodes">
      <div className="w-full flex justify-around items-center">
        <Switch offLabel={"Include Nodes (JSON)"} onLabel={"Don't Include Nodes"} pressed={flowExtractor.nodesConfig.enabled} onPressedChange={(pressed: boolean) => flowExtractor.setNodesConfig({ ...flowExtractor.nodesConfig, enabled: pressed})} />
        <Switch offLabel={"All Nodes"} onLabel={"Selected Nodes"} pressed={flowExtractor.nodesConfig.filterSelected} onPressedChange={(pressed: boolean) => flowExtractor.setNodesConfig({ ...flowExtractor.nodesConfig, filterSelected: pressed})} />
      </div>
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
