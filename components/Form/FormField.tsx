'use client'

import { ReactNode, forwardRef, useMemo } from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { FormFieldContext, useFormField } from "@/hooks";
import { Schema } from "./Form";
import { cn, formatDate } from "@/utils";
import { Accordion, Checkbox, Input, Select, Slider, Switch } from '@/components';
import { FormFields } from "./FormFields";
import { FormDescription } from "./FormDescription";
import { FormLabel } from "./FormLabel";
import { FormMessage } from "./FormMessage";
import { FormSlot } from "./FormSlot";

const basicFormItems = ['object', 'select', 'slider', 'boolean', 'text', 'readOnly', 'date'] as const;
export type BasicFormItem = typeof basicFormItems[number];

const basicItems = ['array', 'object', 'from-array', 'select', 'slider', 'boolean', 'checkbox', 'switch', 'number', 'input', 'readOnly', 'date', 'displayDate', 'datetime'] as const;
export type BasicItem = typeof basicItems[number];

export const FormItemToItemMap: Record<BasicFormItem, BasicItem[]> = {
  'object':  ['array', 'object', 'from-array'],
  'select': ['select'],
  'slider': ['slider'],
  'boolean': ['boolean', 'checkbox', 'switch'],
  'text': ['number', 'input'],
  'readOnly': ['readOnly'],
  'date': ['date', 'displayDate', 'datetime'],
};

export const DefaultFormItem = forwardRef<any, any>((props, ref) => {
  const { field, schema, placeholder, readOnly, form, item, className, } = props;
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

  if (!item) {
    return null;
  }
  if (item === 'array' || Array.isArray(field.value)) {
    return (
      <div ref={ref} className="flex flex-row w-full flex-wrap items-center gap-1">
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
  } else if (FormItemToItemMap['object'].includes(item)) {
    return (
      <Accordion
        id={field.id}
        highlightActive={false}
        className="text-xs w-full"
        triggerClassName="px-2 py-1 font-semibold text-xs text-primary"
        items={[ 
          {name: field?.label || field?.name, open: false, content: (
            <div ref={ref} className="w-auto h-full grid grid-cols-2 col-span-2 gap-1 p-2 overflow-auto rounded items-center">
              <FormFields form={form} schema={schema} prefix={`${field?.name}.`} readOnly={readOnly} />
            </div>
          )} 
        ]} 
      />
    );
  } else if (item === 'slider') {
    const step = schema?.spec?.meta?.step;
    if (typeof field.value === 'number') {
      if (step) {
        // match the same precision as the step
        const decimalPlaces = (step.toString().split('.')[1] || '').length;
        field.value = parseFloat(field.value.toFixed(decimalPlaces));
      } else {
        field.value = parseFloat(field.value.toFixed(2));
      }
    }
    // if step is 1 then we can assume it's an integer
    if (step === 1) {
      field.value = parseInt(field.value);
    }
    return (
      <Slider ref={ref} thumbSize={10} showValue="value" className={className} min={min} max={max} step={step} {...field} />
    )
  } else if (item === 'select') {
    return (
      <Select ref={ref} className={cn(`text-xs`, className)} items={Array.from(schema?._whitelist)} {...field} readOnly={readOnly} />
    )
  } else if (FormItemToItemMap['boolean'].includes(item)) {
    
    const value: boolean = field?.value;
    return (item === 'switch') ? (
      <Switch ref={ref} className={className} {...field} pressed={value} readOnly={readOnly} />
    ) : (
      <Checkbox ref={ref} className={className} {...field} checked={value} readOnly={readOnly} />
    );
  } else if (FormItemToItemMap['text'].includes(item)) {
    let value = field.value;
    if (typeof field.value === 'number') {
      value = parseFloat(field.value.toFixed(2));
    }
    if (item === 'input' || item === 'number') {
      return ( <Input ref={ref} placeholder={placeholder} className={className} extraCharWidth={0} readOnly={readOnly} value={value} onChange={field?.onChange} /> );
    }
  } else if (FormItemToItemMap['date'].includes(item)) {
    // TODO: add date picker for `date` and date-time picker for `datetime`. displayDate will be a read-only input
    let value = field.value;
    if (typeof field.value === 'number') {
      // interpret as epoch
      value = formatDate(field.value);
    }
    return (<Input ref={ref} extraCharWidth={0} placeholder={placeholder} readOnly={true} className={cn(className, `p-0 cursor-text bg-transparent border-transparent text-primary/80 ring-transparent hover:border-transparent hover:bg-transparent hover:cursor-text hover:text-primary/80 hover:ring-transparent focus:border-transparent focus:bg-transparent focus:cursor-text focus:text-primary/80 focus:ring-transparent`)} value={value} />);
  } else {
    let value = field.value;
    if (typeof field.value === 'number') {
      value = parseFloat(field.value.toFixed(2));
    }
    // default readOnly
    return (<Input ref={ref} extraCharWidth={0} placeholder={placeholder} readOnly={true} className={cn(className, `p-0 cursor-text bg-transparent border-transparent text-primary/80 ring-transparent hover:border-transparent hover:bg-transparent hover:cursor-text hover:text-primary/80 hover:ring-transparent focus:border-transparent focus:bg-transparent focus:cursor-text focus:text-primary/80 focus:ring-transparent`)} value={value} />);
  }
});
DefaultFormItem.displayName = 'DefaultFormItem';

export type FormItemProps = {
  className?: string;
  ItemRenderer: React.ComponentType<any>;
};
export const FormItem = forwardRef<HTMLDivElement, FormItemProps>((props, ref) => {
  const { className, ItemRenderer=DefaultFormItem } = props;
  const useForm = useFormField();
  const { fieldState, label, description, schema, item } = useForm;
  const shouldSpan2 = item === 'model' || item === 'apiKey';
  const isBoolean = item === 'boolean' || item === 'checkbox' || item === 'switch';
  const isObject = item === 'object' || item === 'from-array' || item === 'node-schema';
  const selected = schema?.spec?.meta?.selected || false;
  const noLabel = schema?.spec?.meta?.noLabel || false;

  const Label = useMemo(() => {
    // if label is a react fucntional component, call it to render
    if (typeof label === 'function') {
      return <div className="flex w-auto justify-start items-center">{label()}:</div>;
    } else if (typeof label === 'string') {
      return `${label}:`;
    }
    return label;
  }, [label]);

  return (
    <div ref={ref} className={cn(`w-full h-full grid overflow-auto rounded items-center p-1 gap-px`, isObject && 'col-span-2', shouldSpan2 && 'col-span-2', isBoolean && `grid-cols-[auto_1fr] items-center`)}>
      {(description || !isObject) && (<div className={cn("flex flex-col text-left h-auto w-auto flex-wrap self-justify-left self-start")}>
        {!isObject && !noLabel && (<FormLabel className={cn("text-xs", selected && `text-accent`)}>{Label}</FormLabel>)}
        {description && (<FormDescription>{description}</FormDescription>)}
      </div>)}
      <div className={cn("flex-col flex w-full h-auto justify-center items-center px-1.5", isObject && 'col-span-2', isBoolean && 'w-auto justify-self-end')}>
        <FormSlot>
          <ItemRenderer {...props} {...useForm} className={cn(className, 'text-xs placeholder:text-secondary/80 disabled:cursor-not-allowed disabled:opacity-50', fieldState.error && 'border-error' )} />
        </FormSlot>
      </div>
      {!isObject && (<FormMessage />)}
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
  label?: ReactNode | string;
  description?: ReactNode;
  placeholder?: ReactNode;
  readOnly?: boolean;
  className?: string;
  ItemRenderer: React.ComponentType<any>;
}

export const FormField = (props: FormFieldProps) => {
  const {
    name,
    schema,
    label,
    description,
    placeholder,
    readOnly=false,
    className='',
    ItemRenderer,
    ...rest
  } = props;
  const {
    field,
    fieldState,
    formState, 
  } = useController({ name });

  return (
    <FormFieldContext.Provider value={{ schema, field, fieldState, formState, label, description, placeholder, readOnly }}>
      <FormPrimitive.Field name={field?.name} asChild>
        <FormItem ItemRenderer={ItemRenderer} className={className} />
      </FormPrimitive.Field>
    </FormFieldContext.Provider>
  );
};
FormField.displayName = 'FormField';

