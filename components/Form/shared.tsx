import React from "react";
import * as yup from 'yup';
import { FormField } from "@/components";
import { sortObject } from "@/utils";

export const formFieldTypes = ['input', 'select', 'checkbox', 'switch', 'array', 'object', 'readonly'] as const;
export type FormFieldType = typeof formFieldTypes[number];

export const mapSchemaToFormFields = (schema: any, form: any, labels: any, prefix: string = '') => {
  const types: Record<string, string> = Object.keys(schema.fields).reduce((acc: Record<string, string>, key: string) => {
    const field: any = schema.fields[key];
    acc[key] = field.spec.meta.type;
    return acc;
  }, {});
  const order = ['readonly', 'checkbox', 'switch', 'select', 'slider', 'input', 'array', 'object'];
  const sortedFields = sortObject(schema.fields, types, order);
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

export const getDefaultValues: React.FC<any> = ( schema: any, defaultValuesFromProps: any) => {
  const yupDefaults = Object.keys(schema.fields).reduce((acc: any, key) => {
    const field = yup.reach(schema, key);
    const defaultValue = (field as any).getDefault();
    if (defaultValue !== undefined) {
      acc[key] = defaultValue;
    }
    return acc;
  }, {});

  const filteredDefaults = Object.fromEntries(
    Object.entries(defaultValuesFromProps).filter(
      ([, value]) => value !== undefined
    )
  );
  
  return { ...yupDefaults, ...filteredDefaults };
};

export const getEnumOptions = (schemaField: any): string[] => {
  if (schemaField.enum) {
    return schemaField.enum;
  }
  if (schemaField.innerType) {
    return getEnumOptions(schemaField.innerType);
  }
  return [];
};
