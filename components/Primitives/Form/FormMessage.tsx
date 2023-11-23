
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
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children;

  if (!body) return null;
  return (
    <FormPrimitive.FormMessage
      ref={ref}
      id={formMessageId}
      className={cn("text-xs font-medium text-muted flex flex-wrap overflow-hidden w-full leading-none mt-1", error && `text-error`, className)}
      {...rest}
    >{body}</FormPrimitive.FormMessage>
  );
})
FormMessage.displayName = "FormMessage"
