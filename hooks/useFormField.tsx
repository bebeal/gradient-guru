'use client'

import { createContext, useContext } from 'react';
import { ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues, UseFormStateReturn, useFormContext } from 'react-hook-form';

// ***********************
//    FormFieldContext
// ***********************
export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  schema?: any,
  field: ControllerRenderProps<TFieldValues, TName>;
  formState: UseFormStateReturn<TFieldValues>;
  fieldState: ControllerFieldState;
  label?: React.ReactNode,
  description?: React.ReactNode,
  placeholder?: React.ReactNode,
  readOnly?: boolean,
};
export const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

export const useFormField = () => {
  // unpack everything
  const context = useContext(FormFieldContext);
  const {
    schema,
    field,
    fieldState,
    formState,
    label: labelRenderer,
    description,
    placeholder,
    readOnly=false,
  } = context;
  const form = useFormContext();
  const name = field.name;
  const id = name;
  const meta = schema.spec.meta || {};
  const item = meta.item || 'input';
  const label = labelRenderer || meta?.label || schema?.spec?.label || name;
  let disabled = field?.disabled || meta?.disabled || false;
  // if disabled is a function then call it and pass form context
  if (typeof disabled === 'function') {
    disabled = disabled(form);
  }

  if (!context) {
    throw new Error("useFormField should be used within <FormField>");
  }
  return {
    id,
    field: {
      ...field,
      ...meta,
      disabled,
    },
    fieldState,
    formState,
    schema,
    label,
    labelId: `${name}-label`,
    description,
    descriptionId: `${name}-description`,
    placeholder,
    placeholderId: `${name}-placeholder`,
    messageId: `${name}-message`,
    readOnly,
    form,
    item,
  }
};