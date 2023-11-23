'use client'

import { ReactNode, forwardRef, useId } from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import { Control, FieldPath, FieldValues, useController } from "react-hook-form";
import { FormFieldContext } from "@/hooks";
import { FormItem } from "@/components";

export interface FormFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
  name: TName;
  schema: any;
  control?: Control<TFieldValues>;
  label?: ReactNode;
  className?: string;
}
export const FormField = forwardRef<any, FormFieldProps<FieldValues, FieldPath<FieldValues>>>((props, ref) => {
  const {
    name,
    schema,
    control,
    label,
    className='',
    ...rest
  } = props;
  const controller = useController({ name, control });
  const id = `${name}-${useId()}`

  return (
    <FormFieldContext.Provider value={{ name, schema, controller, label, id }}>
      <FormPrimitive.Field ref={ref} name={name} asChild>
        <FormItem {...rest} />
      </FormPrimitive.Field>
    </FormFieldContext.Provider>
  );
});
FormField.displayName = 'FormField';

