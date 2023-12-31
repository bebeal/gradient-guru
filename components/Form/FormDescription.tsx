'use client'
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useFormField } from "@/hooks";
import { cn } from "@/utils";

export type FormDescriptionProps = ComponentPropsWithoutRef<"p"> & {
  children?: React.ReactNode,
  className?: string
};
export const FormDescription = forwardRef<HTMLParagraphElement, FormDescriptionProps>((props, ref) => {
  const {
    children,
    className = "",
    ...rest
  } = props;
  const { descriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn("text-xs text-muted", className)}
      {...rest}
    >{children}</p>
  );
})
FormDescription.displayName = "FormDescription"
