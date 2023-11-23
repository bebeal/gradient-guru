'use client'

import React, { createContext, useContext } from "react";
import { FieldErrors, FieldPath, FieldValues, UseFormReturn, useController, useFormContext } from "react-hook-form";
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

// for zod
// import { ZodEnum, ZodNullable, ZodObject, ZodOptional, ZodSchema, ZodTypeAny, z } from "zod";
// export const getDefaultValues = (schema: ZodObject<any>, defaultValuesFromProps: any) => {
//   const zodDefaults = Object.fromEntries(Object.entries(schema.shape).map(([key, value]) => {
//       try {
//         const defaultValue = (value as ZodTypeAny).parse(undefined);
//         if (defaultValue !== undefined) {
//           return [key, defaultValue];
//         }
//       } catch {}
//       return [key, undefined];
//     }).filter(([key, value]) => value !== undefined)
//   );
//   const filteredDefaults = Object.fromEntries(Object.entries(defaultValuesFromProps).filter(([key, value]) => value !== undefined));
//   // If the two share keys, the properties of defaultValuesFromProps overrides the property of schema. The returned schema also inherits the "unknownKeys" policy (strip/strict/passthrough) and the catchall schema of B.
//   return {...zodDefaults, ...filteredDefaults};
// };

// export const getEnumOptions = (schemaField: ZodTypeAny): string[] => {
//   if (schemaField instanceof ZodEnum) {
//     return schemaField.options;
//   }
//   if (schemaField instanceof ZodOptional || schemaField instanceof ZodNullable) {
//     return getEnumOptions(schemaField.unwrap());
//   }
//   return [];
// };