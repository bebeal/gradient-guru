'use client';

import React from "react";
import { Slot } from "@radix-ui/themes";
import { useFormField } from "@/hooks";
import { cn } from "@/utils";

export type FormControlProps = React.ComponentPropsWithoutRef<"div"> & {
};

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>((props, ref) => {
  const {
    children,
    className = "",
    ...rest
  } = props;
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      className={cn(`flex`, className)}
      {...rest}
    >{children}</Slot>
  )
})
FormControl.displayName = "FormControl"
