'use client'

import * as yup from 'yup';
import { Editor, GeoShapeGeoStyle, TLShape } from '@tldraw/tldraw';
import { Box2d, DefaultColorStyle, DefaultDashStyle, DefaultFillStyle, DefaultHorizontalAlignStyle, DefaultSizeStyle, DefaultVerticalAlignStyle, EASINGS, compact, createShapeId } from "@tldraw/editor";
import { DefaultLabelColorStyle } from "@tldraw/tlschema/src/styles/TLColorStyle";
import { FONT_FAMILIES } from "@tldraw/tldraw/src/lib/shapes/shared/default-shape-constants";
import { cn } from '@/utils';
import { PreviewNode } from './PreviewNode';

export const KeysToMakereadOnly: string[] = ['type'] as const;
export const KeysToIgnore: string[] = ['index', 'typeName', 'meta'] as const;

// global schema mappings for all nodes to use
export const NodeSchemaMappings: any = {
  'x': yup.number().meta({ item: 'input', label: 'x' }),
  'y': yup.number().meta({ item: 'input', label: 'y' }),
  'rotation': yup.number().meta({ item: 'input', label: 'Rotation' }),
  'isLocked': yup.boolean().label('Locked').meta({ item: 'checkbox', label: 'Locked' }),
  'opacity': yup.number().min(0.0).max(1.0).meta({ item: 'input', label: 'Opacity' }),
  'id': yup.string().meta({ item: 'readOnly', label: 'ID' }),
  'parentId': yup.string().meta({ item: 'readOnly', label: 'Parent ID' }),
  props: yup.object().shape({
    'font':  yup.string().oneOf(Object.keys(FONT_FAMILIES)).meta({ item: 'select', label: 'Font' }),
    'size': yup.string().oneOf(DefaultSizeStyle.values).meta({ item: 'select', label: 'Size' }),
    'fill': yup.string().oneOf(DefaultFillStyle.values).meta({ item: 'select', label: 'Fill' }),
    'align': yup.string().oneOf(DefaultHorizontalAlignStyle.values).meta({ item: 'select', label: 'Align' }),
    'verticalAlign': yup.string().oneOf(DefaultVerticalAlignStyle.values).meta({ item: 'select', label: 'Vertical Align' }),
    'dash': yup.string().oneOf(DefaultDashStyle.values).meta({ item: 'select', label: 'Dash' }),
    'color': yup.string().oneOf(DefaultColorStyle.values).meta({ item: 'select', label: 'Color' }),
    'labelColor': yup.string().oneOf(DefaultLabelColorStyle.values).meta({ item: 'select', label: 'Label Color' }),
    'geo': yup.string().oneOf(GeoShapeGeoStyle.values).meta({ item: 'select', label: 'Geo', hidden: true }),
    'w': yup.number().meta({ item: 'input', label: 'Width' }),
    'h': yup.number().meta({ item: 'input', label: 'Height' }),
    'url': yup.string().meta({ item: 'input', label: 'URL' }),
    'text': yup.string().meta({ item: 'input', label: 'Text' }),
  }).meta({ item: 'object', label: 'Props' }),
};
KeysToMakereadOnly.forEach(key => {
  NodeSchemaMappings[key] = yup.string().meta({ item: 'readOnly' });
});

export const formatNodeId = (id: string) => {
  return id.replace(/^shape:/, '');
}

export const getNodeId = (node: TLShape) => {
  return formatNodeId(node.id);
}

export const getNodeName = (node: TLShape) => {
  return `[${node.type}] - ${getNodeId(node)}`;
};

export const getNodeNameComponent = (node: TLShape, className: string = '') => {
  return (
    <div className={cn("flex justify-between items-center w-full gap-2", className)}>
      <div className="text-right flex-1">[{node.type}]</div>
      <div className="text-center w-auto">-</div>
      <div className="text-left flex-1">{getNodeId(node)}</div>
    </div>
  );
};


export const makeEmptyResponseShape = (editor: Editor) => {
  // Create the preview shape
  const { maxX = 0, midY = 0 }: any = editor.getCurrentPageBounds();
  const newShapeId = createShapeId()
  editor.createShape<PreviewNode>({
    id: newShapeId,
    type: 'preview',
    x: maxX + 60, // to the right of the selection
    y: midY - (540 * 2) / 3 / 2, // half the height of the preview's initial shape
    props: { html: '', source: '' },
  });
  return newShapeId;
};

export const zoomToFitNewNode = (editor: Editor, animation: any = { duration: 200, easing: EASINGS.easeInOutQuad }) => {
  if (!editor.getInstanceState().canMoveCamera) return this;

  const ids = [...editor.getCurrentPageShapeIds()];
  if (ids.length <= 0) return this;

  const pageBounds = Box2d.Common(compact(ids.map((id) => editor.getShapePageBounds(id))));
  const currentBounds = editor.getCurrentPageBounds();
  if (pageBounds.w < (currentBounds?.w || 0) && pageBounds.h < (currentBounds?.h || 0)) return this;
  
  editor.zoomToBounds(pageBounds, undefined, animation)
};
