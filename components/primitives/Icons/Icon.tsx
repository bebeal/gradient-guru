'use client';

import { forwardRef, SVGProps, useCallback } from 'react';
import UnknownSprite from '@/assets/icons/201-question.svg';
import { CachedIcons } from './IconSet';

// just make optional for now to make things run, will make stricter later (I'm never actually gonna fucking do this - feel free to yourself)
export interface IconProps extends SVGProps<SVGSVGElement> {
  set?: string;
  icon?: string;
  classNames?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(({ set = 'Custom', icon = 'UnknownSprite', ...rest }, ref?) => {
  const fetchIcon = useCallback((): JSX.Element => {
      // console.log('iconsets: ', IconSets, '\nset: ', set, '\nicon: ', icon)
      const iconSet = CachedIcons[set];
      if (!iconSet) {
        console.error(`Icon set "${set}" not found.`);
        return <UnknownSprite {...rest} ref={ref} />;
      }

      const IconComponent = iconSet[icon];
      if (!IconComponent) {
        console.error(`Icon "${icon}" not found in set "${set}".`);
        return <UnknownSprite {...rest} ref={ref} />;
      }

      return <IconComponent {...rest} ref={ref} />;
  }, [icon, ref, rest, set]);

  return fetchIcon();
});
