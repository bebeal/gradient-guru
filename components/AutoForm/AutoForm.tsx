'use client';

import React from 'react';
import 'zod-metadata/register';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodSchema } from 'zod';
import { cn } from '@/utils/utils';

export interface AutoFormProps<T extends FieldValues> {
  schema: z.ZodObject<T>;
  values: T;
  onSubmit: (data: T) => void;
}

export const AutoForm = <T extends FieldValues>({ schema, values, onSubmit }: AutoFormProps<T>) => {
  const useFormReturn: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    values: values || schema.parse(undefined), // zod has the concept of defaults, to extract them parsed undefined on the schema https://zod.dev/?id=default
    mode: 'onChange',
  });

  const { register, formState, handleSubmit } = useFormReturn;
  const schemaFields = Object.keys(schema.shape);
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold mb-6">Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* {schemaFields.map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm font-medium mb-1 capitalize">
              {field}
            </label>
            <input
              {...register(field)}
              id={field}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <p className={`mt-1 text-red-500 text-sm h-5 ${formState.errors[field] ? 'visible' : 'invisible'}`}>
              {formState.errors[field]?.message?.toString()}
            </p>
          </div>
        ))} */}
      </form>
    </div>
  );
};
