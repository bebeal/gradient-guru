'use client';

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
      className={cn("font-semibold text-sm text-secondary", className)}
      htmlFor={formItemId}
      {...rest}
    >
      <span className={cn(error && "underline decoration-error")}>{children}</span>
      {error && <span className="text-error align-top text-xs">*</span>}
    </Label>
  )
})
FormLabel.displayName = "FormLabel"
