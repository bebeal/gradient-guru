'use client'

import { UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';
import { sortObject } from '@/utils';
import { FormField } from './FormField';
import { Schema, SchemaMeta } from './Form';

// infer yup schema from object types
export const inferSchema = (object: Record<string, any>): Schema => {
  return yup.object().shape(
    Object.entries(object).reduce((acc: Record<string, yup.AnySchema & { meta: SchemaMeta }>, [key, value]) => {
      if (typeof value === 'string') {
        acc[key] = yup.string().meta({ item: 'readOnly' });
      } else if (typeof value === 'number') {
        acc[key] = yup.number().meta({ item: 'readOnly' });
      } else if (typeof value === 'boolean') {
        acc[key] = yup.boolean().meta({ item: 'checkbox' });
      } else if (Array.isArray(value)) {
        acc[key] = yup.array().meta({ item: 'array' });
      } else if (typeof value === 'object') {
        acc[key] = inferSchema(value).meta({ item: 'object' });
      }
      return acc;
    }, {})
  );
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
  order = ['checkbox', 'switch', 'slider', 'select', 'readOnly', 'input', 'array', 'object']
) => {
  const item = extractFromMeta(schema, 'item');
  return sortObject(schema.fields, item, order);
};

// make form fields per schema
export const FormFields = ({form, schema, prefix = '', labels={}}: { form: UseFormReturn, schema: Schema, prefix?: string, labels?: Record<string, React.ReactNode | string> }) => {
  const sortedFields = sortSchema(schema);
  return Object.entries(sortedFields).map(([key, fieldSchema]: any) => {
        return (
            <FormField
            key={`${prefix}${key}`}
              name={`${prefix}${key}`}
              schema={fieldSchema}
              control={form.control}
              label={labels?.[key]}
            />
        );
      });
};
