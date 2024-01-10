'use client';

import { forwardRef } from 'react';
import { DefaultFormItem, FormFields } from "@/components";
import { cn } from "@/utils";

export const FlowFormItem = forwardRef<any, any>((props, ref) => {
  const { field, schema, placeholder, readOnly, form, item, className='' } = props;

  if (item === 'node-schema') {
    return (
      <div className={cn("w-full h-full grid grid-cols-1 col-span-2 gap-1 overflow-auto rounded items-center")}><FormFields form={form} schema={schema} prefix={`${field?.name}.`} readOnly={readOnly} ItemRenderer={FlowFormItem} /></div>
    );
  }
 return <DefaultFormItem ref={ref} {...props} />;
});
FlowFormItem.displayName = 'FlowFormItem';
