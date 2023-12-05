'use client'
import { HTMLAttributes, forwardRef, useCallback } from "react"
import { Accordion, Checkbox, FormControl, FormDescription, FormLabel, FormMessage, Input, Select, Slider, Switch, mapSchemaToFormFields } from "@/components";
import { cn } from "@/utils";
import { useFormField } from "@/hooks";


export type FormItemProps = HTMLAttributes<HTMLDivElement> & {
  className?: string
};
export const FormItem = forwardRef<HTMLDivElement, FormItemProps>((props, ref) => {
  const {
    className = "",
    ...rest
  } = props;
  const {type, placeholder, label, description, disabled, readonly, form, schema, controller, error } = useFormField();

  const FormFieldRender = useCallback(({className}: any) => {
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
      switch (type) {
        case 'input':
          if (typeof controller?.field?.value === 'number') {
            return (<Input placeholder={placeholder} {...controller?.field} value={controller?.field?.value.toFixed(2)} disabled={disabled} className={className} {...rest} />);
          }
          return (<Input placeholder={placeholder} {...controller?.field} disabled={disabled} className={className} {...rest} />);
        case 'checkbox':
          const checked: boolean = controller?.field?.value;
          return (<Checkbox checked={checked} placeholder={placeholder} {...controller?.field} disabled={disabled} className={className} {...rest} />);
        case 'switch':
          const pressed: boolean = controller?.field?.value;
          return (<Switch pressed={pressed} placeholder={placeholder} {...controller?.field} disabled={disabled} className={className} {...rest} />);
        case 'select':
          const options: string[] = Array.from(schema?._whitelist);
          return (<Select placeholder={placeholder} items={options} disabled={disabled} className={className} {...controller?.field} {...rest} />);
        case 'slider':
          if (hasMin && hasMax) {
            const step = schema?.spec?.meta?.step;
            return (<Slider min={min} max={max} step={step} showValue={'value'} thumbSize={10} className={className} disabled={disabled} {...controller?.field} {...rest} />);
          }
          break;
        case 'array':
          const arrayValues = controller?.field?.value || [];
          return (
            <div className="flex flex-row w-full flex-wrap items-center gap-1">
              {arrayValues?.map((item: any, index: any) => (
                <div key={index} className="flex flex-row items-center">
                  <Input
                    defaultValue={item}
                    disabled={disabled}
                    className={className}
                    {...rest}
                    onChange={(e) => {
                      const newArray = [...arrayValues];
                      newArray[index] = e.target.value;
                      controller?.field?.onChange(newArray);
                    }}
                  />
                  {index < arrayValues?.length - 1 && <div className="flex items-center justify-center mx-1 text-primary/80">,</div>}
                </div>
              ))}
            </div>
          );
        case 'object':
          const content = <div className="w-auto h-full grid grid-cols-2 col-span-2 gap-1 p-2 overflow-auto rounded items-center">{mapSchemaToFormFields(schema, form, {}, `${controller?.field?.name}.`)}</div>;
          return (
            <Accordion 
              highlightActive={false}
              className="text-xs w-full h-full overflow-hidden"
              triggerClassName="px-2 py-1 font-semibold text-xs text-primary"
              items={[ 
                {name: controller?.field?.name, open: true, content: content} 
              ]} 
            />
          );
        case 'readonly':
        default:
          return (
            <Input extraCharWidth={0} placeholder={placeholder} {...controller?.field} readOnly className={cn(className, `p-0 w-auto font-normal cursor-text bg-transparent border-transparent text-primary/80 ring-transparent hover:border-transparent hover:bg-transparent hover:cursor-text hover:text-primary/80 hover:ring-transparent focus:border-transparent focus:bg-transparent focus:cursor-text focus:text-primary/80 focus:ring-transparent`,)} {...rest} />
          );
      }
    }, [type, placeholder, controller, disabled, rest, schema, form]);

  return (
    <div className={cn(`w-full h-full grid overflow-auto rounded items-end p-1 gap-px`, type !== 'object' ? '' : 'col-span-2')}>
     {(description || type !== 'object') && (<div className="flex flex-col text-left h-auto w-auto flex-wrap self-justify-left self-start">
        {type !== 'object' && <FormLabel className="text-xs">{label}:</FormLabel>}
        {description && <FormDescription>{description}</FormDescription>}
      </div>)}
      <div className={cn("flex-col flex w-full h-auto justify-center items-center px-1.5", type === 'object' && 'col-span-2')}>
        <FormControl>
          <FormFieldRender className={cn('text-xs w-full placeholder:text-secondary/80 disabled:cursor-not-allowed disabled:opacity-50', error && 'border-error')} />
        </FormControl>
        {type !== 'object' && <FormMessage />}
      </div>
      </div>
  )
})
FormItem.displayName = "FormItem"
