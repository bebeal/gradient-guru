'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues, UseFormStateReturn, useFormContext } from 'react-hook-form';
import { nanoid } from '@/utils';

// ***********************
//    FormFieldContext
// ***********************
export type FormFieldState<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  schema?: any,
  field: ControllerRenderProps<TFieldValues, TName>;
  formState?: UseFormStateReturn<TFieldValues>;
  fieldState: ControllerFieldState;
  label?: React.ReactNode,
  description?: React.ReactNode,
  placeholder?: React.ReactNode,
  readOnly?: boolean,
};
export const FormFieldContext = createContext<FormFieldState>({} as FormFieldState);

export const useFormField = () => {
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
  const id = `${field.name}`
  const name = field.name;
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
      name,
      id
    },
    fieldState,
    formState,
    schema,
    label,
    labelId: `${id}-label`,
    description,
    descriptionId: `${id}-description`,
    placeholder,
    placeholderId: `${id}-placeholder`,
    messageId: `${id}-message`,
    readOnly,
    form,
    item,
  }
};