'use client'

import { ReactNode, forwardRef, useEffect, useState } from "react";
import * as FormPrimitive from '@radix-ui/react-form';
import { FormProvider, UseFormProps, UseFormReturn, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { inferSchema } from "./shared";
import { arrayToObject, cn, noop } from "@/utils";
import { FormFields } from "./FormFields";

// Custom meta properties I'm defining for each field to specify how it should be rendered
export type SchemaMeta = {
  item?: string,
}

// Schema is a key-value map where value is its own schema gauranteed to have a meta property
export type Schema = yup.ObjectSchema<any & Record<string, yup.AnySchema & SchemaMeta>>;

export interface FormProps extends UseFormProps {
  object: any;
  schema?: Schema;
  readOnly?: boolean;
  onSubmit?: any;
  onError?: any;
  labels?: Record<string, ReactNode | string>;
  className?: string;
  ItemRenderer?: any;
  SchemaMap?: Record<string, any>;
}

export const Form = forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  const {
    object: initialObject = {},
    schema: schemaFromProps,
    readOnly = false,
    onSubmit=noop,
    onError=noop,
    mode = 'onSubmit',
    labels={},
    className = '',
    ItemRenderer,
    SchemaMap,
    criteriaMode='all',
    shouldFocusError=false,
    ...rest
  } = props;
  // hack 
  const [initialized, setInitialized] = useState(false);
  const object = Array.isArray(initialObject) ? arrayToObject(initialObject) : initialObject;
  // if schema is not provided, infer it based on types
  const schema: any = schemaFromProps || inferSchema(object, SchemaMap);
  const fromArray = schema?.spec?.meta?.item === 'from-array';
  type FormSchema = yup.InferType<typeof schema>;
  const form: UseFormReturn = useForm<FormSchema>({
    resolver: yupResolver(schema),
    // cast initial values to conform to schema
    values: schema.cast(object),
    mode,
    criteriaMode,
    shouldFocusError,
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

  useEffect(() => {
    form.watch((value) => {
      form.handleSubmit(onSubmit, onError)()
    });
  }, [form, onError, onSubmit]);

  return (
    <FormProvider {...rest} {...form}>
      <FormPrimitive.Root
        ref={ref}
        className={cn(`w-full h-auto p-2 overflow-auto rounded items-center`, readOnly && 'bg-primary/90', className)}
        onChange={(value: any) =>  {
          form.handleSubmit(onSubmit, onError)();
        }}
      > 
        <div className={cn("w-full h-auto grid gap-px rounded items-center", Object.keys(schema.fields)?.length > 1 ? 'grid-cols-2' : 'grid-cols-1', (Array.isArray(initialObject) || fromArray) && `flex flex-col`)}>
          <FormFields ItemRenderer={ItemRenderer} form={form} schema={schema} labels={labels} readOnly={readOnly} />
        </div>
      </FormPrimitive.Root>
    </FormProvider>
  )
});
Form.displayName = 'Form';
