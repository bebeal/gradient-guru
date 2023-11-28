'use client'

// import { AcademiconsIconSet, CarbonIconSet, CustomIconSet, DevIconSet, EntypoPlusIconSet, EntypoSocialIconSet, FlagIconSet, FontAudioIconSet, FontAwesomeRegularIconSet, FontGISIconSet, GameIconSet, GeoglyphsIconSet, HeroiconsSolidIconSet, LogosIconSet, LucideIconSet, MapIconSet, MedicalIconSet, MuiLineIconSet, RadixIconSet, SkillIconSet, SpinnerIconSet, TldrawIconSet, VSCodeIconSet } from './IconSets';
import { memo } from 'react';
import { CarbonIconSet, CustomIconSet } from './IconSets';
import { Icon } from './Icon';
import { MapCache } from "@/utils";

export interface IconSet {
  [iconName: string]: any;
}

export interface IconSetMap {
  [iconSetName: string]: IconSet;
}

export const IconSets: IconSetMap = {
  'Carbon': {Icons: CarbonIconSet},
  'Custom': {Icons: CustomIconSet},
};
export const IconSetNames: string[] = Object.keys(IconSets) || [];
export type SetNames = keyof typeof IconSets;

// Will map entire sets and individual icons to their respective render functions;
// IconSetCache['Carbon']['Upload'] = (props, ref) => Icon or IconSetCache['Carbon']['Download'] = (props, ref) => Icon
// IconSetCache['Custom']['Upload'] = (props, ref) => Icon or IconSetCache['Custom']['Download'] = (props, ref) => Icon
const IconCache = new MapCache<{iconName: string}, React.ComponentType<any>>();
export const IconSetCache: IconSetMap = IconSetNames.reduce((iconSetsMap: any, IconSetName: string) => {
  const { Icons, overrideDefaultProps} = IconSets[IconSetName];
  iconSetsMap[IconSetName] = Object.keys(Icons).reduce((iconSetMap: any, IconName: string) => {
    const iconDisplayName = `IconSetCache.${IconSetName}.${IconName}`;
    iconSetMap[IconName] = IconCache.get({iconName: iconDisplayName}, () => Icon(Icons[IconName], iconDisplayName, overrideDefaultProps));
    iconSetMap[IconName].displayName = iconDisplayName;
    return iconSetMap;
  }, {} as IconSet);
  return iconSetsMap;
}, {} as IconSetMap);

// Example Use Case as JSX component:
// <IconSetCache.Carbon.Upload /> or <IconSetCache.Carbon.Download className="text-red" width="64px" />
// <IconSetCache.Custom.Upload /> or <IconSetCache.Custom.Download className="text-red" width="64px" />
