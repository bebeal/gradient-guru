'use client'

import React from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { reach, MixedSchema } from 'yup';

export const getReadableValidationErrorMessage = <T extends FieldValues>(errors: FieldErrors<T>) => {
  let validationMessage = '';
  for (const [fieldName, value] of Object.entries(errors)) {
    validationMessage += `${fieldName}: ${getErrorMessageFromObjectRecursively(
      value
    )}\n\n`;
  }
  return validationMessage.trim();
};
export const getErrorMessageFromObjectRecursively = (o: any) => {
  if ('message' in o) {
    return o.message;
  } else {
    let message;
    Object.keys(o).forEach((objKey) => {
      if ('message' in o[objKey]) {
        message = o[objKey].message;
      } else {
        message = getErrorMessageFromObjectRecursively(o[objKey]);
      }
    });
    return message;
  }
};

export const getDefaultValues: React.FC<any> = ( schema: any, defaultValuesFromProps: any) => {

  const yupDefaults = Object.keys(schema.fields).reduce((acc, key) => {
    const field = reach(schema, key);
    const defaultValue = (field as MixedSchema).getDefault();

    if (defaultValue !== undefined) {
      acc[key] = defaultValue;
    }
    return acc;
  }, {} as any);

  const filteredDefaults = Object.fromEntries(
    Object.entries(defaultValuesFromProps).filter(
      ([, value]) => value !== undefined
    )
  );

  return { ...yupDefaults, ...filteredDefaults };
};

export const getEnumOptions = (schemaField: any): string[] => {
  console.log('getEnumOptions', schemaField);
  if (schemaField.enum) {
    return schemaField.enum;
  }
  if (schemaField.innerType) {
    return getEnumOptions(schemaField.innerType);
  }
  return [];
};
