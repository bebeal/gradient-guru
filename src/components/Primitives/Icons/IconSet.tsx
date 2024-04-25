import { IconProps } from '@/components/Primitives/Icons/Icon';
import { CarbonIconSet } from '@/components/Primitives/Icons/IconSets/Carbon';
import { CodeLanguagesIconSet } from '@/components/Primitives/Icons/IconSets/CodeLanguages';
import { CustomIconSet } from '@/components/Primitives/Icons/IconSets/Custom';
import { LogosIconSet } from '@/components/Primitives/Icons/IconSets/Logos';
import { LucideIconSet } from '@/components/Primitives/Icons/IconSets/Lucide';
import { RadixIconSet } from '@/components/Primitives/Icons/IconSets/Radix';
import { TldrawIconSet } from '@/components/Primitives/Icons/IconSets/Tldraw';

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
  Tldraw: { icons: TldrawIconSet, iconProps: { stroke: 'none', fill: 'none' } },
  CodeLanguages: { icons: CodeLanguagesIconSet },
  Logos: { icons: LogosIconSet },
  Custom: { icons: CustomIconSet },
  Lucide: { icons: LucideIconSet, iconProps: { stroke: 'currentColor', fill: 'none' } },
  Radix: { icons: RadixIconSet },
};
export const IconSetNames: string[] = Object.keys(IconSets) || [];
export type IconSetNames = keyof typeof IconSets;
