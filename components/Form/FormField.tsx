'use client'
import { ReactNode, forwardRef, useMemo } from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import { Control, FieldPath, FieldValues, useController } from "react-hook-form";
import { FormFieldContext, useFormField } from "@/hooks";
import { Schema } from "./Form";
import { FormControl } from "./FormControl";
import { FormDescription } from "./FormDescription";
import { FormLabel } from "./FormLabel";
import { cn } from "@/utils";
import { FormMessage } from "./FormMessage";
import { Accordion, Checkbox, FormFields, Input, Select, Slider, Switch } from '@/components';

export type FormItemProps = {
  className?: string;
};
export const FormItem = forwardRef<HTMLDivElement, FormItemProps>((props, ref) => {
  const { className: classNameFromProps = '' } = props;
  const { field, fieldState, formState, schema, label, description, placeholder, readOnly, form, item } = useFormField();
  const isObject = item === 'object';
  const className=cn('text-xs w-full placeholder:text-secondary/80 disabled:cursor-not-allowed disabled:opacity-50', fieldState.error && 'border-error',  
                     classNameFromProps)
  const hasMin = schema?.exclusiveTests?.min;
  const hasMax = schema?.exclusiveTests?.max;
  let min = Infinity;
  let max = -Infinity;
  if (hasMin) {
    min = schema?.tests?.find((test: any) => test.OPTIONS.name === 'min').OPTIONS?.params?.min;
  }
  if (hasMax) {
    max = schema?.tests?.find((test: any) => test.OPTIONS.name === 'max').OPTIONS?.params?.max;
  }
  const step = schema?.spec?.meta?.step;
  if (typeof field.value === 'number') {
    field.value = field.value.toFixed(2);
  }

  const Item = useMemo(() => {
    switch (item) {
      case 'object':
      case 'array':
        if (item === 'array' || Array.isArray(field.value)) {
          return (
            <div className="flex flex-row w-full flex-wrap items-center gap-1">
              {field.value?.map((nestedItem: any, index: any) => (
                <div key={index} className="flex flex-row items-center">
                  <Input
                    {...field}
                    value={nestedItem}
                    className={className}
                    onChange={(e) => {
                      const newArray = [...field.value];
                      newArray[index] = e.target.value;
                      field?.onChange(newArray);
                    }}
                  />
                  {index < field.value?.length - 1 && (
                    <div className="flex items-center justify-center mx-1 text-primary/80">,</div>
                  )}
                </div>
              ))}
            </div>
          );
        } else {
          const content = <div className="w-auto h-full grid grid-cols-2 col-span-2 gap-1 p-2 overflow-auto rounded items-center"><FormFields form={form} schema={schema} prefix={`${field?.name}.`} /></div>;
          return (
            <Accordion 
              highlightActive={false}
              className="text-xs w-full h-full overflow-hidden"
              triggerClassName="px-2 py-1 font-semibold text-xs text-primary"
              items={[ 
                {name: field?.name, open: true, content: content} 
              ]} 
            />
          );
        }
      case 'select':
        const items: string[] = Array.from(schema?._whitelist)
        return (<Select className={className} items={items} {...field} />);
      case 'slider':
        return (<Slider thumbSize={10} className={className} min={min} max={max} step={step} {...field} />);
      case 'boolean':
      case 'checkbox':
      case 'switch':
        const value: boolean = field?.value;
        return (item === 'switch') ? (
          <Switch className={className} {...field} pressed={value} />
        ) : (
          <Checkbox className={className} {...field} checked={value} />
        );
      case 'number':
      case 'input':
        return (<Input placeholder={placeholder} className={className} extraCharWidth={0} {...field} />);
      case 'readOnly':
      default:
        return ( <Input extraCharWidth={0} placeholder={placeholder} readOnly className={cn(className, `p-0 cursor-text bg-transparent border-transparent text-primary/80 ring-transparent hover:border-transparent hover:bg-transparent hover:cursor-text hover:text-primary/80 hover:ring-transparent focus:border-transparent focus:bg-transparent focus:cursor-text focus:text-primary/80 focus:ring-transparent`)} {...field} />);
    }
  }, [item, field, schema, className, min, max, step, placeholder, form]);

  return (
    <div ref={ref} className={cn(`w-full h-full grid overflow-auto rounded items-end p-1 gap-px`, isObject && 'col-span-2')}>
      {(description || !isObject) && (<div className="flex flex-col text-left h-auto w-auto flex-wrap self-justify-left self-start">
        {!isObject && (<FormLabel className="text-xs">{label}:</FormLabel>)}
        {description && (<FormDescription>{description}</FormDescription>)}
      </div>)}
      <div className={cn("flex-col flex w-full h-auto justify-center items-center px-1.5", isObject && 'col-span-2')}>
        <FormControl>
          {Item}
        </FormControl>
        {!isObject && (<FormMessage />)}
      </div>
    </div>
  );
});
FormItem.displayName = 'FormItem';


export interface FormFieldProps<
TFieldValues extends FieldValues = FieldValues,
TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  schema: Schema;
  control: Control<TFieldValues, TName>;
  label?: ReactNode | string;
  description?: ReactNode;
  placeholder?: ReactNode;
  readOnly?: boolean;
  className?: string;
}
export const FormField = forwardRef<any, FormFieldProps<FieldValues, FieldPath<FieldValues>>>((props, ref) => {
  const {
    name,
    schema,
    control,
    label,
    description,
    placeholder,
    readOnly=false,
    className='',
    ...rest
  } = props;
  const {
    field,
    fieldState,
    formState
  } = useController({ name, control });

  return (
    <FormFieldContext.Provider value={{ schema, field, fieldState, formState, label, description, placeholder, readOnly }}>
      <FormPrimitive.Field name={name} asChild>
        <FormItem {...rest} className={className} />
      </FormPrimitive.Field>
    </FormFieldContext.Provider>
  );
});
FormField.displayName = 'FormField';

