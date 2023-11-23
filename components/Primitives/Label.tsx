"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/utils";

const labelVariants = cn(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

export type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants, className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName
