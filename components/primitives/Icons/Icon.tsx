'use client';

import { forwardRef, SVGProps, useCallback } from 'react';
import UnknownSprite from '@/assets/icons/201-question.svg';
import { CachedIcons, defaultIconProps } from './IconSet';

// just make optional for now to make things run, will make stricter later (I'm never actually gonna fucking do this - feel free to yourself)
export interface IconProps extends SVGProps<SVGSVGElement> {
  set?: string;
  icon?: string;
  classNames?: string;
  [key: string]: any;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(({ set = 'Custom', icon = 'UnknownSprite', ...rest }, ref?) => {
  const fetchIcon = useCallback((): JSX.Element => {
      // console.log('iconsets: ', IconSets, '\nset: ', set, '\nicon: ', icon)
      const iconSet = CachedIcons[set];
      let error = false;
      if (!iconSet) {
        error = true;
        console.error(`Icon set "${set}" not found.`);
      }

      const IconComponent = iconSet[icon];
      if (!IconComponent) {
        error = true
        console.error(`Icon "${icon}" not found in set "${set}".`);
      }

      if (error) {
        return (<UnknownSprite width="100%" height="64" ref={ref} />);
      }
      return <IconComponent {...rest} ref={ref} />;
  }, [icon, ref, rest, set]);

  return fetchIcon();
});
