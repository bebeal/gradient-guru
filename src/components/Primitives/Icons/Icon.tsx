import React, { forwardRef, Suspense, SVGProps, useCallback } from 'react';
import UnknownSprite from '@/assets/icons/201-question.svg';
import AddIcon from '@/assets/icons/Carbon/Add.svg';
import { IconCache } from '@/components/Primitives/Icons/IconCache';
import { Loading } from '@/components/Primitives/Loading';

const defaultProps = { width: '1em', height: '100%', fill: 'currentColor', stroke: 'none' };

export interface IconProps extends SVGProps<SVGSVGElement> {
  set?: string;
  icon?: string;
  classNames?: string;
  [key: string]: any;
}
export const Icon = forwardRef<SVGSVGElement, IconProps>(({ set = 'Custom', icon = 'UnknownSprite', ...rest }, ref?) => {
  const key = `${set}.${icon}`;

  const IconComponent = IconCache.get(key, () =>
    React.lazy(async () => {
      const path = `../../../assets/icons/${set}/${icon}.svg`;
      try {
        return await import(/* @vite-ignore */ path);
      } catch (error) {
        console.warn(`Icon not found: ${set}.${icon}`);
        return Promise.resolve({ default: UnknownSprite });
      }
    }),
  );

  // make fallback have a sane default size to aid in avoiding layout shift
  return (
    <Suspense fallback={<Loading className="min-w-[1em] min-h-[1em]" />}>
      <IconComponent ref={ref} {...defaultProps} {...rest} />
    </Suspense>
  );
});
