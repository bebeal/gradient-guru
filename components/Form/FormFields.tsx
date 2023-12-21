import { UseFormReturn } from "react-hook-form";
import { sortSchema } from "./shared";
import { Schema } from './Form';
import { FormField } from "./FormField";

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
        control={form.control}
        label={labels?.[key]}
        readOnly={boolean}
      />
    );
  });
};
