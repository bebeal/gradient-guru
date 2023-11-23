'use client'

import { FormFieldType } from '@/components';
import React from 'react';
import { createContext, useContext } from 'react';
import { FieldPath, FieldValues, UseControllerReturn, useFormContext } from 'react-hook-form';

// ***********************
//    FormFieldContext
// ***********************
export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName,
  schema?: any,
  controller: UseControllerReturn<TFieldValues, TName>,
  label?: React.ReactNode,
  id: string
};
export const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

// ***********************
//      useFormField
// ***********************
export const useFormField = () => {
  const { name, schema, controller, label: labelRenderer, id } = useContext(FormFieldContext);
  const formContext = useFormContext();
  const fieldState = formContext?.getFieldState(name, formContext?.formState);
  const meta = schema?.spec?.meta || {};
  const type = meta?.type as FormFieldType || 'input';
  const placeholder = meta?.placeholder || '';
  const label = labelRenderer || meta?.label || name;
  const description = meta?.description || '';
  let disabled = meta?.disabled || false;
  // if disabled is a function then call it and pass form context
  if (typeof disabled === 'function') {
    disabled = disabled(formContext);
  }

  if (!name || !schema) {
    throw new Error("useFormField should be used within <FormField>");
  }

  return {
    id,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    type,
    placeholder,
    label,
    description,
    disabled,
    name,
    schema,
    controller,
    ...fieldState,
  };
};
