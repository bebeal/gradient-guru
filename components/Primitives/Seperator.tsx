import React, {forwardRef} from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { Orientation, OrientationClasses, cn } from '@/utils';

export interface SeparatorProps extends SeparatorPrimitive.SeparatorProps {
  decorative?: boolean;
  orientation?: Orientation;
  color?: string;
  className?: string;
}

export const Separator = forwardRef((props: SeparatorProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { decorative=true, orientation = 'horizontal', color='bg-gray-400', className, ...rest } = props;

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          `leading-none min-h-[1px] min-w-[1px] ${color} overflow-hidden`,
          OrientationClasses(orientation),
          {
            ['horizontal']: 'h-[1px] w-11/12',
            ['vertical']: 'w-[1px] h-11/12',
          }[orientation],
          className
        )}
        {...rest}
      />
    );
});
Separator.displayName = 'Separator';
