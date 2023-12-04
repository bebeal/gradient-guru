'use client'

import { forwardRef, useEffect, useMemo, useState } from 'react';
import * as FormPrimitive from '@radix-ui/react-form';
import { FormProvider, UseFormProps, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { cn } from '@/utils';
import { getDefaultValues, mapSchemaToFormFields } from './shared';

const getSchema = (object: Record<string, any>, schemaFromProps?: yup.AnyObjectSchema): any => {
  if (!schemaFromProps) {
    const inferredSchema: any = {};
    for (const key in object) {
      const value = object[key];
      if (typeof value === 'string') {
        inferredSchema[key] = yup.string().meta({ type: 'input', disabled: false });
      } else if (typeof value === 'number') {
        inferredSchema[key] = yup.number().meta({ type: 'input', disabled: false });
      } else if (typeof value === 'boolean') {
        inferredSchema[key] = yup.boolean().meta({ type: 'checkbox', disabled: false });
      } else if (Array.isArray(value)) {
        inferredSchema[key] = yup.array().meta({ type: 'array', disabled: false });
      } else if (typeof value === 'object') {
        inferredSchema[key] = yup.object().shape(getSchema(value));
      }
    }
  }
  return schemaFromProps;
};

// ***********************
//         Form
// ***********************
export interface FormProps extends UseFormProps {
  object: Record<string, any>;
  labels?: Record<string, React.ReactNode>;
  schema: yup.AnyObjectSchema;
  onSubmit?: any;
  onError?: any;
  className?: string;
}
export const Form = forwardRef<any, FormProps>((props, ref) => {
  const {
    object = {},
    labels = {},
    schema: schemaFromProps,
    onSubmit,
    onError,
    mode = 'onChange',
    defaultValues: defaultValuesFromProps = object,
    className = '',
    ...rest
  } = props;
  const [initialized, setInitialized] = useState(false);
  const [schema, setSchema] = useState(getSchema(object, schemaFromProps));
  type FormSchema = yup.InferType<typeof schema>;
  // parse defaults out of schema and merge with defaults from props
  const defaultValues: any = useMemo(() => getDefaultValues(schema, defaultValuesFromProps), [defaultValuesFromProps, schema]);
  const form: any = useForm<FormSchema>({
    resolver: yupResolver(schema),
    // cast initial values to schema
    values: schema.cast({ ...defaultValues, ...object }),
    mode,
    ...rest,
  });

  // run validation on initial mount
  useEffect(() => {
    if (form && !initialized) {
      setTimeout(() => {
        form.trigger();
        setInitialized(true);
      }, 0);
    }
  }, [form, initialized, defaultValues]);

  // submit on change
  useEffect(() => {
    const subscription = form.watch(() => form.handleSubmit(onSubmit, onError)());
    return () => subscription.unsubscribe();
  }, [form, onSubmit, onError]);

  return (
    <FormProvider {...rest} {...form}>
      <FormPrimitive.Root
        ref={ref}
        className={cn(`w-auto h-auto px-2 py-4 overflow-auto rounded items-center`, className)}
        onChange={form.handleSubmit(onSubmit, onError)}
      >
        <div className={cn("w-auto h-full grid gap-1 p-1 overflow-auto rounded items-center", Object.keys(schema.fields)?.length > 1 ? 'grid-cols-2' : 'grid-cols-1')}>
          {mapSchemaToFormFields(schema, form, labels)}
        </div>
      </FormPrimitive.Root>
    </FormProvider>
  );
});
Form.displayName = 'Form';
