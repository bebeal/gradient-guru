'use client'

import { UseFormReturn } from "react-hook-form";
import { Schema } from './Form';
import { FormField } from "./FormField";
import { sortSchema } from "./shared";

// List of `FormField` components
export const FormFields = ({form, schema, prefix = '', labels={}, readOnly: boolean = false, ItemRenderer}: { form: UseFormReturn, schema: Schema, prefix?: string, labels?: Record<string, React.ReactNode | string>, readOnly?: boolean, ItemRenderer?: any }) => {
  const sortedFields = sortSchema(schema);
  return Object.entries(sortedFields).map(([key, fieldSchema]: any) => {
    return (
      <FormField
        ItemRenderer={ItemRenderer}
        key={`${prefix}${key}`}
        name={`${prefix}${key}`}
        schema={fieldSchema}
        label={labels?.[key]}
        readOnly={boolean}
      />
    );
  });
};
