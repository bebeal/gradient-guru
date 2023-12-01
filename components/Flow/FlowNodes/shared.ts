
import * as yup from 'yup';
import { ShapeUtil, TLUnknownShape } from "@tldraw/editor";
import { DefaultColorStyle, DefaultDashStyle, DefaultFillStyle, DefaultHorizontalAlignStyle, DefaultSizeStyle, DefaultVerticalAlignStyle, GeoShapeGeoStyle, useEditor } from "@tldraw/editor";
import { DefaultLabelColorStyle } from "@tldraw/tlschema/src/styles/TLColorStyle";
import { FONT_FAMILIES } from "@tldraw/tldraw/src/lib/shapes/shared/default-shape-constants";
import { filterObject } from '@/utils';

export const KeysToMakeReadOnly: string[] = ['type'] as const;
export const KeysToIgnore: string[] = ['index', 'typeName'] as const;

// global schema mappings for all nodes to use
export const GlobalSchemaMappings: any = {
  'font':  yup.string().oneOf(Object.keys(FONT_FAMILIES)).label('Font').meta({ type: 'select', disabled: false }),
  'size': yup.string().oneOf(DefaultSizeStyle.values).label('Size').meta({ type: 'select', disabled: false }),
  'fill': yup.string().oneOf(DefaultFillStyle.values).label('Fill').meta({ type: 'select', disabled: false }),
  'align': yup.string().oneOf(DefaultHorizontalAlignStyle.values).label('H-Align').meta({ type: 'select', disabled: false }),
  'verticalAlign': yup.string().oneOf(DefaultVerticalAlignStyle.values).label('V-Align').meta({ type: 'select', disabled: false }),
  'dash': yup.string().oneOf(DefaultDashStyle.values).label('Dash').meta({ type: 'select', disabled: false }),
  'color': yup.string().oneOf(DefaultColorStyle.values).label('Color').meta({ type: 'select', disabled: false }),
  'labelColor': yup.string().oneOf(DefaultLabelColorStyle.values).label('Text Color').meta({ type: 'select', disabled: false }),
  'geo': yup.string().oneOf(GeoShapeGeoStyle.values).label('Geo').meta({ type: 'select', disabled: false }),
  'id': yup.string().label('ID').meta({ type: 'readonly', disabled: true }),
  'parentId': yup.string().label('Parent-ID').meta({ type: 'readonly', disabled: true }),
  'opacity': yup.number().min(0.0).max(1.0).label('Opacity').meta({ type: 'input', disabled: false }),
};

// infer schema field from key and value
// 1. if key is in GlobalSchemaMappings, use that
// 2. if key is in KeysToMakeReadOnly, make it readonly
// 3. Infer schema field from type of value
export const inferSchemaField = (key: any, value: any) => {
  if (Object.keys(GlobalSchemaMappings).includes(key)) {
    return GlobalSchemaMappings[key];
  }
  if (KeysToMakeReadOnly.includes(key)) {
    return yup.string().meta({ disabled: true, type: 'readonly' });
  }
  switch (typeof value) {
    case 'string':
      return yup.string().meta({ type: 'input', disabled: false });
    case 'number':
      return yup.number().meta({ type: 'input', disabled: false });
    case 'boolean':
      return yup.boolean().meta({ type: 'checkbox', disabled: false });
    case 'object':
      if (Array.isArray(value)) {
        return yup.array().meta({ type: 'array', disabled: false });
      } else {
        return yup.object({
          ...Object.keys(value).reduce((acc: any, key: any) => {
            acc[key] = inferSchemaField(key, value[key]);
            return acc;
          }, {}),
        }).meta({ type: 'object', disabled: false });
      }
    default:
      return yup.string().meta({ type: 'readonly', disabled: false });
  }
};
