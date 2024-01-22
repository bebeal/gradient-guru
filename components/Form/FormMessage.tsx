'use client'

import { forwardRef } from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import { cn } from "@/utils";
import { useFormField } from "@/hooks";

export type FormMessageProps = FormPrimitive.FormMessageProps & {
};
export const FormMessage = forwardRef<HTMLDivElement, FormMessageProps>((props, ref) => {
  const {
    children,
    className = "",
    ...rest
  } = props;
  const { fieldState, messageId } = useFormField();
  const body = fieldState.error ? String(fieldState.error?.message) : children;

  if (!body) return null;
  return (
    <FormPrimitive.FormMessage
      ref={ref}
      id={messageId}
      className={cn("text-[10px] font-medium text-muted flex overflow-auto w-full h-auto max-h-[18px] leading-none pt-1 px-2 !cursor-text !select-text !pointer-events-auto !z-[100]", fieldState.error && `text-error`, className)}
      {...rest}
    >{body}</FormPrimitive.FormMessage>
  );
})
FormMessage.displayName = "FormMessage"
