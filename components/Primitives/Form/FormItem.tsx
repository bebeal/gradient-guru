'use client';

import { HTMLAttributes, forwardRef, memo, useId } from "react"
import { Checkbox, FormControl, FormDescription, FormLabel, FormMessage, Input, Select, getEnumOptions } from "@/components";
import { cn } from "@/utils";
import { useFormField } from "@/hooks";

export const formFieldTypes = ['input', 'select', 'checkbox'] as const;
export type FormFieldType = typeof formFieldTypes[number];

const FormFieldRender = memo(({ type, placeholder, disabled, schema, controller, className, ...rest }: any) => {
  switch (type) {
    case 'select':
      // for zod
      // const options = schema && getEnumOptions(schema) || [];
      const options = Array.from(schema?._whitelist) || [];
      return <Select placeholder={placeholder} items={options} {...controller?.field} disabled={disabled} className={className} {...rest} />
    case 'checkbox':
      const checked = controller?.field?.value;
      return <Checkbox checked={checked} placeholder={placeholder} {...controller?.field} disabled={disabled} className={className} {...rest} />
    case 'input':
    default:
      return <Input placeholder={placeholder} {...controller?.field} disabled={disabled} className={className} {...rest} />
  }
});

export type FormItemProps = HTMLAttributes<HTMLDivElement> & {
  className?: string
};
export const FormItem = forwardRef<HTMLDivElement, FormItemProps>((props, ref) => {
  const {
    className = "",
    ...rest
  } = props;
  const {type, placeholder, label, description, disabled, schema, controller, error } = useFormField();

  return (
    <div ref={ref} className={cn("flex flex-row w-auto gap-4 p-1", className)} {...rest}>
      <div className="flex flex-col w-full">
        <FormLabel>{label}</FormLabel>
        <FormDescription>{description}</FormDescription>
      </div>
      <div className="flex-col flex w-full">
        <FormControl>
          <FormFieldRender 
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            schema={schema}
            controller={controller}
            className={cn('text-primary placeholder:text-secondary/80 disabled:cursor-not-allowed disabled:opacity-50', error && 'border-error')} 
          />
        </FormControl>
        <FormMessage />
      </div>
    </div>
  )
})
FormItem.displayName = "FormItem"
