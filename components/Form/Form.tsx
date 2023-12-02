'use client'

import { forwardRef, useEffect, useMemo, useState } from 'react';
import * as FormPrimitive from '@radix-ui/react-form';
import { FormProvider, UseFormProps, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { cn } from '@/utils';
import { getDefaultValues, mapSchemaToFormFields } from './shared';

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
    schema,
    onSubmit,
    onError,
    mode = 'onChange',
    defaultValues: defaultValuesFromProps = object,
    className = '',
    ...rest
  } = props;
  const [initialized, setInitialized] = useState(false);
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

  return (
    <FormProvider {...rest} {...form}>
      <FormPrimitive.Root
        ref={ref}
        className={cn(`w-auto h-auto px-2 py-4 overflow-auto rounded items-center`, className)}
        onChange={form.handleSubmit(onSubmit, onError)}
      >
        <div className="w-auto h-full grid grid-cols-2 gap-1 p-1 overflow-auto rounded items-center">
          {mapSchemaToFormFields(schema, form, labels)}
        </div>
      </FormPrimitive.Root>
    </FormProvider>
  );
});
Form.displayName = 'Form';
