'use client'
import { forwardRef } from "react"
import { Label, LabelProps } from "@/components";
import { useFormField } from "@/hooks";
import { cn } from "@/utils";

export type FormLabelProps = LabelProps & {
};
export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>((props, ref) => {
  const { children, className, ...rest } = props;
  const { fieldState, labelId, id } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn("font-semibold text-primary", className)}
      id={labelId}
      htmlFor={id}
      {...rest}
    >{fieldState.error && <div className="text-error align-top">*</div>}<div className={cn(fieldState.error && "underline decoration-error")}>{typeof children === 'string' ? children?.split('.').pop() : children}</div></Label>
  )
})
FormLabel.displayName = "FormLabel"
