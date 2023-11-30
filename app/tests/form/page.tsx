'use client'

import { useEffect, useState } from "react";
import { CarbonIconNames, Form, IconSetCache, Separator } from "@/components";
import * as yup from "yup"
import { cn } from "@/utils";

const schema = yup.object({
    longList: yup.string().oneOf(CarbonIconNames, 'Invalid value').default(CarbonIconNames[0]).label('icon list').meta({ type: 'select', disabled: false }),
    model: yup.string().min(1, "Model is required").required().label('Model').meta({ type: 'input', disabled: false }),
    age: yup.number().min(0).max(50).label('Age').meta({ type: 'input', disabled: false }),
    apiId: yup
      .string()
      .min(1, "The API ID is required")
      .matches(/^[0-9a-z-]+$/, "The API ID must be lowercase alphanumeric with dashes")
      .label('API ID')
      .meta({ type: 'input', disabled: false }),
    coordinatesArray: yup.array(yup.number()).label('Coordinates Array').meta({ type: 'array', disabled: false }),
    experimental: yup.boolean().default(true).label('Experimental').meta({ type: 'checkbox', disabled: false }),
    conditional: yup.boolean().label('Conditional').meta({ type: 'checkbox', disabled: (form: any) => !form?.watch('experimental')}),
    immutable: yup.string().default('this is readonly').label('Immutable').meta({ type: 'readonly', disabled: false, readonly: true }),
    immutable2: yup.string().default('this is readonly').label('Immutable2').meta({ type: 'readonly', disabled: false, readonly: true }),
    noDefault: yup.boolean().label('No Default').meta({ type: 'checkbox', disabled: false }),
    animal: yup.mixed().oneOf(['cat', 'dog', 'bird'] as const).label('Animal').meta({ type: 'select', disabled: false }),
    authors: yup.array(yup.string()).optional().label('Authors').meta({ type: 'input', placeholder: 'Add authors' }),
    Personal_ID: yup.string().max(2).default('').label('Personal ID').meta({ type: 'input', placeholder: 'ID', description: 'Your user ID', label: 'User ID', disabled: false }),
    nestedObject: yup.object({
      nestedField: yup.string().default('').label('Nested Field').meta({ type: 'input', disabled: false }),
      nestedCheckbox: yup.boolean().default(false).label('Nested Checkbox').meta({ type: 'checkbox', disabled: false }),
    }).label('Nested Object').meta({ type: 'object', disabled: false }),
}).required();

  const values = {
    age: -100,
    model: '',
    apiId: "api-id",
    coordinatesArray: [1, 2, 3],
    experimental: true,
    animal: 'dog',
    randomUnknownField: 'random value',
  };

const labels = {
  experiemental: (<div className="flex items-center gap-1">Experimental <IconSetCache.Carbon.Flag className="w-3.5 h-3.5" /></div>)
}

const FormTestPage = () => {
  const [object, setObject] = useState(values);

  const onSubmit = (data: any) => {
    console.log('onSubmit', data);
    setObject(data);
  };

  const onError = (errors: any) => {
    console.log('onError', errors);
  };

  return (
    <div className="flex flex-row w-full h-full justify-center items-center overflow-hidden">
      <div className={cn(`shadow-2xl shadow-white border border-white bg-primary w-auto flex flex-col justify-center items-center`)}>
        <div className={cn(`text-md font-bold text-center p-2 w-full flex justify-center items-center`)}>Form Test Page</div>
        <Separator className={cn(`w-full`)} />
        <Form className={'w-[650px] h-[500px]'} object={object} labels={labels} defaultValues={values} schema={schema} onError={onError} onSubmit={onSubmit} />
      </div>
    </div>
  )
};
export default FormTestPage;
