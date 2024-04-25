import { ComponentType } from 'react';
import { CodeLanguage } from '@/components/Primitives/Icons/CustomIcons/CodeLanguages';
import { IconProps } from '@/components/Primitives/Icons/Icon';
import { CodeLanguagesIconSet } from '@/components/Primitives/Icons/IconSets/CodeLanguages';
import { CustomIconSet } from '@/components/Primitives/Icons/IconSets/Custom';
import { LogosIcon, LogosIconSet } from '@/components/Primitives/Icons/IconSets/Logos';
import { LucideIcon, LucideIconSet } from '@/components/Primitives/Icons/IconSets/Lucide';
import { RadixIcon, RadixIconSet } from '@/components/Primitives/Icons/IconSets/Radix';
import { MapCache } from '@/utils/MapCache';

export const IconCache = new MapCache<string, ComponentType<IconProps>>();

// export const iconSets = ['Custom', 'Carbon', 'Tldraw', 'CodeLanguages', 'Logos', 'Lucide', 'Radix'] as const;
// export type IconSet = (typeof iconSets)[number];

// pre initialize
Object.keys(CustomIconSet).forEach((icon) => {
  !IconCache.has(`Custom.${icon}`) && IconCache.get(`Custom.${icon}`, () => CustomIconSet[icon]);
});
Object.keys(CodeLanguagesIconSet).forEach((icon) => {
  !IconCache.has(`CodeLanguages.${icon}`) && IconCache.get(`CodeLanguages.${icon}`, () => CodeLanguagesIconSet[icon as CodeLanguage] as ComponentType<IconProps>);
});
Object.keys(LogosIconSet).forEach((icon) => {
  !IconCache.has(`Logos.${icon}`) && IconCache.get(`Logos.${icon}`, () => LogosIconSet[icon as LogosIcon] as ComponentType<IconProps>);
});
Object.keys(LucideIconSet).forEach((icon) => {
  !IconCache.has(`Lucide.${icon}`) && IconCache.get(`Lucide.${icon}`, () => LucideIconSet[icon as LucideIcon] as ComponentType<IconProps>);
});
Object.keys(RadixIconSet).forEach((icon) => {
  !IconCache.has(`Radix.${icon}`) && IconCache.get(`Radix.${icon}`, () => RadixIconSet[icon as RadixIcon] as ComponentType<IconProps>);
});
