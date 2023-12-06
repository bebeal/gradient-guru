'use client'

import { useState } from "react";
import { CarbonIconNames, Form, IconSetCache, Separator } from "@/components";
import * as yup from "yup"
import { cn } from "@/utils";

const schema: yup.ObjectSchema<any> = yup.object({
    longList: yup.string().oneOf(CarbonIconNames, 'Invalid value').default(CarbonIconNames[0]).label('icon list').meta({ item: 'select' }),
    model: yup.string().min(1, "Model is required").required().label('Model').meta({ item: 'input' }),
    decimalSlider: yup.number().min(0).max(1).label('Decimal Slider').meta({ item: 'slider', step: 0.1 }),
    age: yup.number().min(0).max(50).default(0).label('Age').meta({ item: 'slider' }),
    age2: yup.number().min(0).max(50).default(-100).label('Age2').meta({ item: 'input' }),
    apiId: yup
      .string()
      .min(1, "The API ID is required")
      .matches(/^[0-9a-z-]+$/, "The API ID must be lowercase alphanumeric with dashes")
      .label('API ID')
      .meta({ item: 'input' }),
    coordinatesArray: yup.array(yup.number()).label('Coordinates Array').meta({ item: 'array' }),
    experimental: yup.boolean().default(true).label('Experimental').meta({ item: 'checkbox' }),
    conditional: yup.boolean().label('Conditional').meta({ item: 'checkbox', disabled: (form: any) => !form?.watch('experimental')}),
    experimental2: yup.boolean().default(true).label('Experimental2').meta({ item: 'switch' }),
    conditional2: yup.boolean().label('Conditional2').meta({ item: 'switch', disabled: (form: any) => !form?.watch('experimental')}),
    immutable: yup.string().default('this is readOoly').label('Immutable').meta({ item: 'readOnly' }),
    immutable2: yup.string().default('this is readonly').label('Immutable2').meta({ item: 'readOnly' }),
    default: yup.boolean().label('default').default(false).meta({ item: 'checkbox' }),
    default2: yup.boolean().label('default2').default(false).meta({ item: 'switch' }),
    animal: yup.mixed().oneOf(['cat', 'dog', 'bird'] as const).label('Animal').meta({ item: 'select' }),
    authors: yup.array(yup.string()).optional().label('Authors').meta({ item: 'input', placeholder: 'Add authors' }),
    Personal_ID: yup.string().max(2).default('').label('Personal ID').meta({ item: 'input', placeholder: 'ID', description: 'Your user ID', label: 'User ID' }),
    nestedObject: yup.object({
      nestedField: yup.string().default('').label('Nested Field').meta({ item: 'input' }),
      nestedCheckbox: yup.boolean().default(false).label('Nested Checkbox').meta({ item: 'checkbox' }),
    }).label('Nested Object').meta({ item: 'object' }),
}).required();

const values = {
  age2: -100,
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
        <Form className={'w-[650px] h-[500px]'} object={object} labels={labels} schema={schema} onError={onError} onSubmit={onSubmit} />
      </div>
    </div>
  )
};
export default FormTestPage;
