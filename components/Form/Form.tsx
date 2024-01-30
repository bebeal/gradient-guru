'use client'

import { ReactNode, forwardRef, memo, useCallback, useEffect, useState } from "react";
import * as FormPrimitive from '@radix-ui/react-form';
import { FormProvider, UseFormProps, UseFormReturn, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { inferSchema } from "./shared";
import { arrayToObject, cn } from "@/utils";
import { FormFields } from "./FormFields";
import { isEqual } from "lodash";

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
  fieldClassName?: string;
}

export const Form = memo(forwardRef<HTMLFormElement, FormProps>((props, ref) => {
  const {
    object: initialObject = {},
    schema: schemaFromProps,
    readOnly = false,
    onSubmit: onSubmitCallback,
    onError: onErrorCallback,
    mode = 'all',
    labels={},
    className = '',
    ItemRenderer,
    SchemaMap,
    criteriaMode='all',
    shouldFocusError=false,
    fieldClassName='',
    ...rest
  } = props;
  const object = Array.isArray(initialObject) ? arrayToObject(initialObject) : initialObject;
  // if schema is not provided, infer it based on types
  const [schema, setSchema]: any = useState(schemaFromProps || inferSchema(object, SchemaMap));
  const fromArray = schema?.spec?.meta?.item === 'from-array';
  type FormSchema = yup.InferType<typeof schema>;
  const [values, setValues] = useState<FormSchema>(schema.cast(object));

  useEffect(() => {
    const newSchema = schemaFromProps || inferSchema(object, SchemaMap);
    setSchema(newSchema);
  }, [object, schemaFromProps, SchemaMap]);

  const form: UseFormReturn = useForm<FormSchema>({
    resolver: yupResolver(schema),
    values: values,
    defaultValues: values,
    mode,
    criteriaMode,
    shouldFocusError,
    ...rest,
  });

  const onError = useCallback((errors: any) => {
    onErrorCallback?.(errors);
  }, [onErrorCallback]);

  const onSubmit = useCallback((data: any) => {
    const castedNewValues = schema.cast(data);
    setValues(castedNewValues);
    onSubmitCallback?.(castedNewValues);
  }, [onSubmitCallback, schema]);

  useEffect(() => {
    const subscription = form.watch((newValues: any) => {
      if (!isEqual(newValues, values)) {
        onSubmit(newValues);
      }
    });
    return () => {
      subscription.unsubscribe();
    }
  }, [form, onSubmit, values]);

  return (
    <FormProvider {...rest} {...form}>
      <FormPrimitive.Root
        ref={ref}
        className={cn(`w-full h-full p-2 rounded items-center`, readOnly && 'bg-primary/90', className)}
        onSubmit={() => form.handleSubmit((data) => onSubmit(data), onError)()}
      > 
        <div className={cn("w-full h-auto grid gap-px rounded items-center", Object.keys(schema.fields)?.length > 1 ? 'grid-cols-2' : 'grid-cols-1', (Array.isArray(initialObject) || fromArray) && `flex flex-col`, fieldClassName)}>
          <FormFields ItemRenderer={ItemRenderer} form={form} schema={schema} labels={labels} readOnly={readOnly} />
        </div>
      </FormPrimitive.Root>
    </FormProvider>
  );
}));
Form.displayName = 'Form';
