'use client';

import React, { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// field configuration:
// - name: unique identifier for the field
// - component: React component to render the field (controls the field value)
// - schema: zod schema for validation
// - label: optional label for the field
// - any other props to pass through to the component
export interface FieldConfig {
  name: string;
  component: React.ComponentType<any>;
  schema: z.ZodType<any, any>;
  label?: string;
  [key: string]: any;
}

// AutoForm component props:
// - fields: array of field configurations
// - values: binded state values for the form (the source of truth)
// - onSubmit: callback function when the form is submitted
export interface AutoFormProps {
  fields: FieldConfig[];
  values: Record<string, any>;
  onSubmit: (data: any) => void;
}

// automatic form with validation
export const AutoForm: React.FC<AutoFormProps> = ({ fields, values, onSubmit }) => {
  // extract full object schema from fields
  const schema = useMemo(() => z.object(Object.fromEntries(fields.map((field) => [field.name, field.schema]))), [fields]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    values: values,
  });

  const onSubmitHandler = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <form onSubmit={onSubmitHandler} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          {field.label && (
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
          )}
          <Controller name={field.name} control={control} render={({ field: { onChange, value, ref } }) => <field.component {...field} onChange={onChange} value={value} ref={ref} error={errors[field.name]} />} />
          {errors[field.name] && <p className="text-sm text-red-600">{errors[field.name]?.message as string}</p>}
        </div>
      ))}
      <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50">
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
