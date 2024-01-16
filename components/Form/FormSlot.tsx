'use client'

import React from "react";
import { useFormField } from "@/hooks";
import { cn } from "@/utils";
import { Slot } from '@radix-ui/react-slot';

export type FormControlProps = React.ComponentPropsWithoutRef<"div"> & {
};

export const FormSlot = React.forwardRef<HTMLDivElement, FormControlProps>((props, ref) => {
  const {
    children,
    className = "",
    ...rest
  } = props;
  const { field, id, descriptionId, messageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={id}
      aria-describedby={
        !field.error
          ? `${descriptionId}`
          : `${descriptionId} ${messageId}`
      }
      aria-invalid={!!field.error}
      className={cn(`flex`, className)}
      {...rest}
    >{children}</Slot>
  )
})
FormSlot.displayName = "FormSlot"