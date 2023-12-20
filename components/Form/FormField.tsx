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
import { Accordion, Checkbox, IconSetCache, Input, Select, Slider, Switch } from '@/components';
import { FormFields, DataModalityBadge } from "./shared";
import { Models } from "@/clients";

export type FormItemProps = {
  className?: string;
};
export const FormItem = forwardRef<HTMLDivElement, FormItemProps>((props, ref) => {
  const { className: classNameFromProps = '' } = props;
  const { field, fieldState, formState, schema, label, description, placeholder, readOnly, form, item } = useFormField();
  const isBoolean = item === 'boolean' || item === 'checkbox' || item === 'switch';
  const isObject = item === 'object' || item === 'from-array' || item === 'node-schema';
  const isModel = item === 'model';
  const isModelConfig = item === 'model' || item === 'client';
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

  const Item = useMemo(() => {
    switch (item) {
      case 'node-schema':
        return (
          <div className="w-full h-full grid grid-cols-1 col-span-2 gap-1 overflow-auto rounded items-center"><FormFields form={form} schema={schema} prefix={`${field?.name}.`} readOnly={readOnly} /></div>
        );
      case 'from-array':
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
          const content = <div className="w-auto h-full grid grid-cols-2 col-span-2 gap-1 p-2 overflow-auto rounded items-center"><FormFields form={form} schema={schema} prefix={`${field?.name}.`} readOnly={readOnly} /></div>;
          return (
            <Accordion 
              highlightActive={false}
              className="text-xs w-full"
              triggerClassName="px-2 py-1 font-semibold text-xs text-primary"
              items={[ 
                {name: field?.label || field?.name, open: true, content: content} 
              ]} 
            />
          );
        }
      case 'select':
      case 'model':
        const items: string[] = Array.from(schema?._whitelist)
        if (item === 'model') {
          const values = form.getValues();
          const client_name = values?.client_name;
          if (client_name === 'Open AI') {
            // iterate through array of strings nad replace with { value: string, children: custom component with client logo }
            const betterItems = items.map((model: string) => {
              const modelFromMap = Models[model as any];
              const modalities = modelFromMap?.modalities || [];
              const DataModalitiesBadges = (<div className="grid grid-cols-2 grid-rows-2 gap-3 ml-2">
              {modalities?.map((modality: any) => {
                return (<DataModalityBadge key={modality} modality={modality as any} compact={true} />);
              })}
            </div>);
              return { 
                value: model,
                children: (
                  <div className="flex flex-row justify-start items-center text-center text-primary gap-2 w-auto h-full p-3"><IconSetCache.Logos.OpenAI height={"auto"} width={"100%"} className={cn("flex p-[3px] rounded w-[24px] h-[24px]", model.includes('gpt-3') && 'bg-[#19c37d]', model.includes('gpt-4') && 'bg-[#ab68ff]' )}/> <div className={cn(`flex h-full w-auto leading-none items-center`)}>{model}{DataModalitiesBadges}</div></div>
                ),
                className: 'justify-start'
              }
            });
            return (<Select className={className} items={betterItems} {...field} readOnly={readOnly} />);
          }
        }
        return (<Select className={className} items={items} {...field} readOnly={readOnly} />);
      case 'slider':
        return (<Slider thumbSize={10} showValue="value" className={className} min={min} max={max} step={step} {...field} />);
      case 'boolean':
      case 'checkbox':
      case 'switch':
        const value: boolean = field?.value;
        return (item === 'switch') ? (
          <Switch className={className} {...field} pressed={value} readOnly={readOnly} />
        ) : (
          <Checkbox className={className} {...field} checked={value} readOnly={readOnly} />
        );
      case 'number':
      case 'input':
        return (<Input placeholder={placeholder} className={className} extraCharWidth={0} {...field} readOnly={readOnly} />);
      case 'readOnly':
      case 'client':
      case 'modality':
      default:
        if (item === 'modality') {
          const values = form.getValues();
          const modalities = values?.modalities;
          // for the content I want compact versions for teh trigger I want the full version
          const compact = schema?.spec?.meta?.compact || false;
          // console.log('compact', compact, '\nmodalities', modalities);
          if (compact) {
            // 4x4 GRID
            return (
              <div className="grid grid-cols-2 grid-rows-2 gap-1 w-auto h-auto p-1">
                {modalities?.map((modality: any) => {
                  return (<DataModalityBadge key={modality} modality={modality as any} compact={true} />);
                })}
              </div>
            )
          } else {
            // 2x2 GRID
            return (
              <div className="grid grid-cols-2 grid-rows-2 gap-1 w-auto h-auto p-1">
                {modalities?.map((modality: any) => {
                  return (<DataModalityBadge key={modality} modality={modality as any} />);
                })}
              </div>
            )
          }
        }
        if (item === 'client') {
          const values = form.getValues();
          const client_name = values?.client_name;
          if (client_name === 'Open AI') {
            return (<div className="flex flex-row items-center justify-center text-primary gap-1 w-full h-full p-3"><IconSetCache.Logos.OpenAI height={"auto"} className={cn("flex p-[3px] rounded w-[24px] h-[24px] text-primary")}/> <div className={cn(`flex h-auto w-auto leading-none `)}>Open AI</div></div>);
          }
        }
        return ( <Input extraCharWidth={0} placeholder={placeholder} readOnly className={cn(className, `p-0 cursor-text bg-transparent border-transparent text-primary/80 ring-transparent hover:border-transparent hover:bg-transparent hover:cursor-text hover:text-primary/80 hover:ring-transparent focus:border-transparent focus:bg-transparent focus:cursor-text focus:text-primary/80 focus:ring-transparent`)} {...field} />);
    }
  }, [item, field, schema, className, min, max, step, readOnly, placeholder, form]);

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
    <div ref={ref} className={cn(`w-full h-full grid overflow-auto rounded items-end p-1 gap-px`, isObject && 'col-span-2', isModel && 'col-span-2', isBoolean && `grid-cols-[auto_1fr] items-center`)}>
      {(description || !isObject) && (<div className={cn("flex flex-col text-left h-auto w-auto flex-wrap self-justify-left self-start")}>
        {!isObject && (<FormLabel className="text-xs">{Label}</FormLabel>)}
        {description && (<FormDescription>{description}</FormDescription>)}
      </div>)}
      <div className={cn("flex-col flex w-full h-auto justify-center items-center px-1.5", isObject && 'col-span-2', isBoolean && 'w-auto justify-self-end')}>
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

