'use client';

import React, { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Terminal } from '@/components';
import { cn } from '@/utils/utils';

type FormInputs = {
  name: string;
  email: string;
};

const FormSchema = z.object({
  name: z.string().min(3).max(10),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .refine((email) => email.endsWith('@example.com'), {
      message: 'Only example.com email addresses are allowed',
    }),
});

const FormLayout = ({ register, formState, onSubmit }: UseFormReturn<FormInputs, any, undefined> & { onSubmit: any }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Registration Form</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input {...register('name')} id="name" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
          {formState.errors.name && <p className="mt-1 text-red-500 text-sm">{formState?.errors?.name?.message?.toString()}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input {...register('email')} id="email" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
          {formState.errors.email && <p className="mt-1 text-red-500 text-sm">{formState.errors.email.message?.toString()}</p>}
        </div>
        {/* <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium transition-colors"
            >
              Submit
            </button> */}
      </form>
    </div>
  );
};

const TouchedFormResults = ({ formState }: UseFormReturn<FormInputs, any, undefined>) => {
  const touched = Object.keys(formState.touchedFields || {});
  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Touched Form</h2>
      <pre>{JSON.stringify(touched, null, 2)}</pre>
    </div>
  );
};

const ErrorsFormResults = ({ formState }: UseFormReturn<FormInputs, any, undefined>) => {
  const errors = formState.errors;
  return (
    <div className="flex flex-col gap-2 w-full h-auto justify-center items-center p-4 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Errors Form</h2>
      <pre>
        {Object.keys(errors).length > 0 &&
          JSON.stringify(
            Object.entries(errors).reduce((previous, [key, { ref, ...rest }]) => {
              // @ts-ignore
              previous[key] = rest;
              return previous;
            }, {}),
            null,
            2,
          )}
      </pre>
    </div>
  );
};

const WatchFormResults = ({ watch }: UseFormReturn<FormInputs, any, undefined>) => {
  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Watch Form</h2>
      <pre className="whitespace-pre-wrap break-words overflow-x-auto">{JSON.stringify(watch(), null, 2)}</pre>
    </div>
  );
};

const AutoFormPage = () => {
  const [formValues, setFormValues] = React.useState<FormInputs>({
    name: '',
    email: '',
  });

  const useFormReturn: UseFormReturn<FormInputs, any, undefined> = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: formValues,
  });
  const onSubmit = (data: FormInputs) => console.log('submitted data:', data);

  const fullCode = `
'use client'

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormInputs = {
  name: string;
  email: string;
};

const FormSchema = z.object({
  name: z.string().min(3).max(10),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email format')
    .refine((email) => email.endsWith('@example.com'), {
      message: 'Only example.com email addresses are allowed',
    }),
});

const AutoFormPage = () => {
  const [formValues, setFormValues] = React.useState<FormInputs>({
    name: '',
    email: '',
  });

  const useFormReturn = useForm({
    resolver: zodResolver(FormSchema),
    values: formValues,
  });
  
  const onSubmit = (data: FormInputs) => console.log('submitted data:', data);

  return (
    // ... (component JSX)
  );
};

export default AutoFormPage;
  `;

  return (
    <div className="bg-primary text-primary p-6 min-h-screen">
      <div className={cn('grid grid-cols-5 gap-4', 'transition-all duration-500')}>
        <div className="col-span-2 row-span-2">
          <Terminal language="tsx">{fullCode}</Terminal>
        </div>
        <div className="col-span-3 flex flex-col">
          <div className="mb-4">
            <FormLayout {...useFormReturn} onSubmit={useFormReturn.handleSubmit(onSubmit)} />
          </div>
          <div className="grid grid-cols-3 gap-4 flex-grow">
            <div>
              <WatchFormResults {...useFormReturn} />
            </div>
            <div>
              <ErrorsFormResults {...useFormReturn} />
            </div>
            <div>
              <TouchedFormResults {...useFormReturn} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoFormPage;
