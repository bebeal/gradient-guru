'use client'

import * as yup from 'yup';
import { Editor, GeoShapeGeoStyle, TLShape } from '@tldraw/tldraw';
import { DefaultColorStyle, DefaultDashStyle, DefaultFillStyle, DefaultHorizontalAlignStyle, DefaultSizeStyle, DefaultVerticalAlignStyle, createShapeId } from "@tldraw/editor";
import { DefaultLabelColorStyle } from "@tldraw/tlschema/src/styles/TLColorStyle";
import { FONT_FAMILIES } from "@tldraw/tldraw/src/lib/shapes/shared/default-shape-constants";
import { cn } from '@/utils';
import { PreviewNode } from './PreviewNode';

export const KeysToMakereadOnly: string[] = ['type'] as const;
export const KeysToIgnore: string[] = ['index', 'typeName'] as const;

// global schema mappings for all nodes to use
export const GlobalSchemaMappings: any = {
  'font':  yup.string().oneOf(Object.keys(FONT_FAMILIES)).label('Font').meta({ item: 'select' }),
  'size': yup.string().oneOf(DefaultSizeStyle.values).label('Size').meta({ item: 'select' }),
  'fill': yup.string().oneOf(DefaultFillStyle.values).label('Fill').meta({ item: 'select' }),
  'align': yup.string().oneOf(DefaultHorizontalAlignStyle.values).label('H-Align').meta({ item: 'select' }),
  'verticalAlign': yup.string().oneOf(DefaultVerticalAlignStyle.values).label('V-Align').meta({ item: 'select' }),
  'dash': yup.string().oneOf(DefaultDashStyle.values).label('Dash').meta({ item: 'select' }),
  'color': yup.string().oneOf(DefaultColorStyle.values).label('Color').meta({ item: 'select' }),
  'labelColor': yup.string().oneOf(DefaultLabelColorStyle.values).label('Text Color').meta({ item: 'select' }),
  'geo': yup.string().oneOf(GeoShapeGeoStyle.values).label('Geo').meta({ item: 'select' }),
  'id': yup.string().label('ID').meta({ item: 'readOnly' }),
  'parentId': yup.string().label('Parent').meta({ item: 'readOnly' }),
  'opacity': yup.number().min(0.0).max(1.0).label('Opacity').meta({ item: 'input' }),
  'isLocked': yup.boolean().label('Locked').meta({ item: 'checkbox' }),
};

// infer schema field from key and value
// 1. if key is in GlobalSchemaMappings, use that
// 2. if key is in KeysToMakereadOnly, make it readOnly
// 3. Infer schema field from type of value
export const inferSchemaField = (key: any, value: any) => {
  if (Object.keys(GlobalSchemaMappings).includes(key)) {
    return GlobalSchemaMappings[key];
  }
  if (KeysToMakereadOnly.includes(key)) {
    return yup.string().meta({ item: 'readOnly' });
  }
  switch (typeof value) {
    case 'string':
      return yup.string().meta({ item: 'input' });
    case 'number':
      return yup.number().meta({ item: 'input' });
    case 'boolean':
      return yup.boolean().meta({ item: 'checkbox' });
    case 'object':
      if (Array.isArray(value)) {
        return yup.array().meta({ item: 'array' });
      } else {
        return yup.object({
          ...Object.keys(value).reduce((acc: any, key: any) => {
            acc[key] = inferSchemaField(key, value[key]);
            return acc;
          }, {}),
        }).meta({ item: 'object' });
      }
    default:
      return yup.string().meta({ item: 'readOnly' });
  }
};

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
  setTimeout(() => {
    editor.zoomToFit();
  }, 0);
  return newShapeId;
};
