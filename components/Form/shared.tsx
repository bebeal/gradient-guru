'use client';

import * as yup from 'yup';
import { Schema, SchemaMeta } from './Form';
import { sortObject } from '@/utils';


export const inferSchemaField = (key: string, value: any, SchemaMap: Record<string, any> = {}) => {
  if (Object.keys(SchemaMap).includes(key)) {
    return SchemaMap[key];
  } else if (typeof value === 'string') {
    return yup.string().meta({ item: 'readOnly' });
  } else if (typeof value === 'number') {
    return yup.number().meta({ item: 'readOnly' });
  } else if (typeof value === 'boolean') {
    return yup.boolean().meta({ item: 'checkbox' });
  } else if (Array.isArray(value)) {
    return yup.array().meta({ item: 'array' });
  } else if (typeof value === 'object') {
    return inferSchema(value, SchemaMap[key] || {});
  }
  return yup.string().meta({ item: 'readOnly' });
}

// infer yup schema from object types
export const inferSchema = (object: Record<string, any>, SchemaMap: Record<string, any> = {}) => {
  const schemaFields = Object.entries(object).reduce((acc: Record<string, yup.AnySchema & { meta: SchemaMeta }>, [key, value]) => {
    acc[key] = inferSchemaField(key, value, SchemaMap);
    return acc;
  }, {});
  return yup.object().shape(schemaFields).meta({ item: 'object' });
};

// extract meta property from schema
export const extractFromMeta = (schema: Schema, property: string) => {
  return Object.keys(schema.fields).reduce((acc: Record<string, any>, key: string) => {
    const field: any = schema.fields[key];
    if (field.spec.meta && field.spec.meta[property]) {
      acc[key] = field.spec.meta[property];
    }
    return acc;
  }, {});
};

// sort schema based on item meta property
export const sortSchema = (
  schema: Schema,
  order = ['model', 'modalities', 'checkbox', 'switch', 'slider', 'select', 'readOnly', 'input', 'array', 'object']
) => {
  const item = extractFromMeta(schema, 'item');
  return sortObject(schema.fields, item, order);
};
