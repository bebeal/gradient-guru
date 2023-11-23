'use client'

import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
  useForm,
} from "react-hook-form";
import { cn, noop } from "@/utils";
import { FormField } from "@/components";
import { getDefaultValues, getReadableValidationErrorMessage } from "./shared";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";

// ***********************
//         Form
// ***********************
export interface FormProps extends UseFormProps {
  object: Record<string, any>;
  labels?: Record<string, React.ReactNode>;
  schema: yup.AnyObjectSchema;
  onSubmit?: SubmitHandler<any>;
  onError?: SubmitErrorHandler<any>;
  className?: string;
};
export const Form = forwardRef<any, FormProps>((props, ref) => {
  const {
    object={},
    labels={},
    schema=yup.object(object),
    onSubmit=noop,
    onError=noop,
    mode='onChange',
    defaultValues: defaultValuesFromProps={},
    className='',
    ...rest 
  } = props;
  const [initialized, setInitialized] = useState(false);
  type FormSchema = yup.InferType<typeof schema>;
  // parse defaults out of schema and merge with defaults from props
  const defaultValues = useMemo(() => getDefaultValues(schema, defaultValuesFromProps), [schema, defaultValuesFromProps]);
  const form = useForm<FormSchema>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
    mode,
    ...rest,
  });

  // run validation on initial mount
  useEffect(() => {
    if (form && !initialized) {
      form.trigger();
      setInitialized(true);
    }
  }, [form, initialized]);

  // uncomment to test re-rendering, should only re-render ~once per change caused by interacting with form (twice if the initial interatction triggers an update to error messgae, description, placeholder, etc)
  // console.log(`form watching - `, form.watch());

  return (
    <FormProvider {...rest} {...form}>
      <FormPrimitive.Root ref={ref} className={cn(`w-full h-full flex flex-col gap-1 p-5 overflow-auto rounded`, className)} onSubmit={form.handleSubmit(onSubmit, onError)}>
        {Object.entries(schema.fields).map(([key, fieldSchema]: any) => {
          return (
            <FormField key={key} name={key} schema={fieldSchema} control={form.control} label={labels?.[key]} />
          );
        })}
      </FormPrimitive.Root>
    </FormProvider>
  )
});
Form.displayName = 'Form';
