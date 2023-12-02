'use client'
import { forwardRef } from "react"
import { Label, LabelProps } from "@/components";
import { useFormField } from "@/hooks";
import { cn } from "@/utils";

export type FormLabelProps = LabelProps & {
};
export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>((props, ref) => {
  const { children, className, ...rest } = props;
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn("font-semibold text-primary text-xs", className)}
      htmlFor={formItemId}
      {...rest}
    >
      {error && <span className="text-error align-top">*</span>}
      <span className={cn(error && "underline decoration-error")}>{typeof children === 'string' ? children.split('.').pop() : children}</span>
    </Label>
  )
})
FormLabel.displayName = "FormLabel"
