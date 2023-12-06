'use client'

import { forwardRef, useEffect, useState } from "react";
import * as FormPrimitive from '@radix-ui/react-form';
import { FormProvider, UseFormProps, UseFormReturn, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { inferSchema, FormFields } from "./shared";
import { cn, noop } from "@/utils";

// Custom meta properties I'm defining for each field to specify how it should be rendered
export type SchemaMeta = {
  item?: string,
}

// Schema is a key-value map where value is its own schema gauranteed to have a meta property
export type Schema = yup.ObjectSchema<any & Record<string, yup.AnySchema & SchemaMeta>>;

export interface FormProps extends UseFormProps {
  object: Record<string, any>;
  schema?: Schema;
  readOnly?: boolean;
  onSubmit?: any;
  onError?: any;
  labels?: Record<string, React.ReactNode | string>;
  className?: string;
}

export const Form = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  const {
    object = {},
    schema: schemaFromProps,
    readOnly = false,
    onSubmit=noop,
    onError=noop,
    mode = 'onChange',
    labels={},
    className = '',
    ...rest
  } = props;
  const [initialized, setInitialized] = useState(false);
  // if schema is not provided, infer it based on types
  const schema = schemaFromProps || inferSchema(object);
  type FormSchema = yup.InferType<typeof schema>;
  const form: UseFormReturn = useForm<FormSchema>({
    resolver: yupResolver(schema),
    // cast initial values to conform to schema
    values: schema.cast(object),
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
  }, [form, initialized]);

    // submit on change
    useEffect(() => {
      const subscription = form.watch(() => form.handleSubmit(onSubmit, onError)());
      return () => subscription.unsubscribe();
    }, [form, onSubmit, onError]);  

  return (
    <FormProvider {...rest} {...form}>
      <FormPrimitive.Root
        ref={ref}
        className={cn(`w-full h-auto px-2 py-4 overflow-auto rounded items-center`, readOnly && 'bg-primary/90', className)}
        onChange={form.handleSubmit(onSubmit, onError)}
      >
        <div className={cn("w-full h-full grid gap-px p-1 rounded items-center", Object.keys(schema.fields)?.length > 1 ? 'grid-cols-2' : 'grid-cols-1')}>
          <FormFields form={form} schema={schema} labels={labels} />
        </div>
      </FormPrimitive.Root>
    </FormProvider>
  )
});
Form.displayName = 'Form';
