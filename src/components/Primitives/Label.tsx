import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '@/utils/utils';

export type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ htmlFor, className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} htmlFor={htmlFor} className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;
