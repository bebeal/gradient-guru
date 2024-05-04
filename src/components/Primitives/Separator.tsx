import React, { forwardRef } from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { Orientation, OrientationClasses } from '@/utils/styles';
import { cn } from '@/utils/utils';

export interface SeparatorProps extends SeparatorPrimitive.SeparatorProps {
  decorative?: boolean;
  orientation?: Orientation;
  color?: string;
  className?: string;
}

export const Separator = forwardRef((props: SeparatorProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { decorative = true, orientation = 'horizontal', color = 'bg-[rgb(var(--text-primary))]', className, ...rest } = props;

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        `leading-none min-h-[0.5px] min-w-[0.5px] overflow-hidden`,
        OrientationClasses(orientation),
        {
          ['horizontal']: 'h-[0.5px] w-11/12',
          ['vertical']: 'w-[0.5px] h-11/12',
        }[orientation],
        className,
        color,
      )}
      {...rest}
    />
  );
});
Separator.displayName = 'Separator';
