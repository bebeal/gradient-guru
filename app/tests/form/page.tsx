'use client'

import { useState } from "react";
import { Form, IconSetCache, Separator } from "@/components";
import * as yup from "yup"
import { cn } from "@/utils";

const schema = yup
  .object({
    model: yup.string().min(1, "Model is required").required().label('Model').meta({ type: 'input', disabled: false }),
    age: yup.number().max(50).optional().label('Age').meta({ type: 'input', disabled: false }),
    apiId: yup
      .string()
      .min(1, "The API ID is required")
      .matches(/^[0-9a-z-]+$/, "The API ID must be lowercase alphanumeric with dashes")
      .required()
      .label('API ID')
      .meta({ type: 'input', disabled: false }),
    experimental: yup.boolean().default(true).label('Experimental').meta({ type: 'checkbox', disabled: false }),
    conditional: yup.boolean()
    .label('Conditional')
    .meta({ type: 'checkbox', disabled: (form: any) => !form?.watch('experimental')}),
    noDefault: yup.boolean().label('No Default').meta({ type: 'checkbox', disabled: false }),
    animal: yup.mixed().oneOf(['cat', 'dog', 'bird'] as const).defined().label('Animal').meta({ type: 'select', disabled: false }),
    authors: yup.array(yup.string()).optional().label('Authors').meta({ type: 'input', placeholder: 'Add authors' }),
    Personal_ID: yup.string().max(2).default('').label('Personal ID').meta({ type: 'input', placeholder: 'ID', description: 'Your user ID', label: 'User ID', disabled: false })
  })
  .required();

  const values = {
    age: 100,
    model: '',
    apiId: "api-id",
    experimental: true,
    animal: 'dog',
    randomUnknownField: 'random value',
  };

const labels = {
  experiemental: (<div className="flex items-center gap-1">Experimental <IconSetCache.Carbon.Flag className="w-3.5 h-3.5" /></div>)
}

const FormTestPage = () => {
  const [object, setObject] = useState<any>(schema);

  const onSubmit = (data: any) => {
    console.log('onSubmit', data);
    setObject(data);
  };

  const onError = (errors: any) => {
    console.log('onError', errors);
  };

  return (
    <div className="flex flex-row w-full h-full justify-center items-center overflow-hidden">
      <div className={cn(`shadow-2xl shadow-white border border-white w-auto flex flex-col justify-center items-center`)}>
        <div className={cn(`text-md font-bold text-center p-2 w-full flex justify-center items-center`)}>Form Test Page</div>
        <Separator className={cn(`w-full`)} />
        <Form className={'w-[650px] h-[500px]'} object={object} labels={labels} defaultValues={values} schema={schema} onError={onError} onSubmit={onSubmit} />
      </div>
    </div>
  )
};
export default FormTestPage;


// for zod
// import z from 'zod';
// const experimental = z.boolean().default(true).describe(JSON.stringify({ type: 'checkbox' }));
// export const schema = z.object({
//   model: z.string().min(1, { message: "Model is required" }).describe(JSON.stringify({ type: 'input' })),
//   age: z.coerce.number().max(50).optional().describe(JSON.stringify({ type: 'input' })),
//   apiId: z
//     .string()
//     .min(1, { message: "The API ID is required" })
//     .regex(/^[0-9a-z-]+$/, { message: "The API ID must be lowercase alphanumeric with dashes" })
//     .describe(JSON.stringify({ type: 'input' })),
//   experimental,
//   conditional: z.boolean().default(false).describe(JSON.stringify({ type: 'checkbox' })),
//   animal: z.enum(['cat', 'dog', 'bird']).describe(JSON.stringify({ type: 'select' })),
//   authors: z.array(z.string()).optional().describe(JSON.stringify({ type: 'input', placeholder: 'Add authors' })),
//   Personal_ID: z.string().max(2).default('').describe(JSON.stringify({ type: 'input', placeholder: 'ID', description: 'Your user ID', label: 'User ID' })),
// });