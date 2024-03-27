import { forwardRef, SVGProps } from 'react';
import { defaultIconProps, IconSet, IconSetNames, IconSets } from './IconSet';
import UnknownSprite from '@/assets/icons/201-question.svg';

// just make optional for now to make things run, will make stricter later (I'm never actually gonna fucking do this - feel free to yourself)
export interface IconProps extends SVGProps<SVGSVGElement> {
  set?: IconSetNames;
  icon?: string;
  classNames?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(({ set = 'Custom', icon = 'UnknownSprite', ...rest }, ref) => {
  const fetchIcon = (set: string, icon: string): JSX.Element => {
    const iconSet: IconSet = IconSets[set];
    const mergedIconProps = { ...(iconSet?.iconProps || defaultIconProps), ...rest };
    if (!iconSet) {
      console.error(`Icon set "${set}" not found.`);
      return <UnknownSprite {...mergedIconProps} ref={ref} />;
    }

    const IconComponent = iconSet.icons[icon];
    if (!IconComponent) {
      console.error(`Icon "${icon}" not found in set "${set}".`);
      return <UnknownSprite {...mergedIconProps} ref={ref} />;
    }

    return <IconComponent {...mergedIconProps} ref={ref} />;
  };

  return fetchIcon(set, icon);
});
