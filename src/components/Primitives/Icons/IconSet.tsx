import { ComponentType, forwardRef } from 'react';
import { MapCache } from '@/utils/MapCache';
import { defaultProps, IconProps } from './Icon';
import { CarbonIconSet, CodeLanguagesIconSet, CustomIconSet, LogosIconSet, LucideIconSet, RadixIconSet, TldrawIconSet } from './IconSets';

// IconSetMap: simple mapping from name of the icon to something that can be rendered
// 'example-icon-name': IconComponent (React.FC)
export interface IconSetMap {
  [icon: string]: any; // ElementType but it breakas rn so any
}

export interface IconSet {
  icons: IconSetMap;
  iconProps?: IconProps;
}

// IconSets object containing all available icon sets
export const IconSets: Record<string, IconSet> = {
  Carbon: { icons: CarbonIconSet },
  Tldraw: { icons: TldrawIconSet, iconProps: { stroke: 'none', fill: 'none' }},
  CodeLanguages: { icons: CodeLanguagesIconSet },
  Logos: { icons: LogosIconSet },
  Custom: { icons: CustomIconSet },
  Lucide: { icons: LucideIconSet, iconProps: { stroke: 'currentColor', fill: 'none' } },
  Radix: { icons: RadixIconSet },
};
export const IconSetNames: string[] = Object.keys(IconSets) || [];
export type IconSetNames = keyof typeof IconSets;

// IconCache: A cache to store and reuse icon component instances.
// This prevents re-creating icon components on every render, which can
// improve performance in scenarios where icons are dynamically chosen
// and rendered throughout the application.
const Cache = new MapCache<string, ComponentType<any>>();
export const IconCache: IconSetMap = IconSetNames.reduce((iconSetsMap: any, IconSetName: string) => {
  const { icons, iconProps } = IconSets[IconSetName];
  iconSetsMap[IconSetName] = Object.keys(icons).reduce((iconSetMap: any, icon: string) => {
    const iconDisplayName = `Icon.${IconSetName}.${icon}`;
    iconSetMap[icon] = Cache.get(iconDisplayName, () => forwardRef((props: any, ref: any) => {
      const IconComponent = icons[icon];
      return <IconComponent {...defaultProps} {...iconProps} {...props} ref={ref} />;
    }));
    iconSetMap[icon].displayName = iconDisplayName;
    return iconSetMap;
  }, {} as IconSet);
  return iconSetsMap;
}, {} as IconSetMap);
