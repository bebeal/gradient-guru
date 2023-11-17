'use client'

import { CarbonIconSet} from './IconSets';
// import { AcademiconsIconSet, CarbonIconSet, CustomIconSet, DevIconSet, EntypoPlusIconSet, EntypoSocialIconSet, FlagIconSet, FontAudioIconSet, FontAwesomeRegularIconSet, FontGISIconSet, GameIconSet, GeoglyphsIconSet, HeroiconsSolidIconSet, LogosIconSet, LucideIconSet, MapIconSet, MedicalIconSet, MuiLineIconSet, RadixIconSet, SkillIconSet, SpinnerIconSet, TldrawIconSet, VSCodeIconSet } from './IconSets';
import { Icon } from './Icon';
import { MapCache } from "@/utils";

export interface IconSet {
  [iconName: string]: any;
}

export interface IconSetMap {
  [iconSetName: string]: IconSet;
}

const IconSets: IconSetMap = {
  // 'Academicons': {Icons: AcademiconsIconSet},
  'Carbon': {Icons: CarbonIconSet},
  // 'Custom': {Icons: CustomIconSet},
  // 'Dev': {Icons: DevIconSet},
  // 'EntypoPlus': {Icons: EntypoPlusIconSet},
  // 'EntypoSocial': {Icons: EntypoSocialIconSet},
  // 'Flag': {Icons: FlagIconSet},
  // 'FontAudio': {Icons: FontAudioIconSet, overrideDefaultProps: { viewBox: '0 0 256 256' }},
  // 'FontAwesomeRegular': {Icons: FontAwesomeRegularIconSet},
  // 'FontGIS': {Icons: FontGISIconSet, overrideDefaultProps: { viewBox: '0 0 100 100' }},
  // 'Game': {Icons: GameIconSet},
  // 'Geoglyphs': {Icons: GeoglyphsIconSet},
  // 'HeroiconsSolid': {Icons: HeroiconsSolidIconSet},
  // 'Logos': {Icons: LogosIconSet},
  // 'Lucide': {Icons: LucideIconSet, overrideDefaultProps: {fill: 'none', stroke: 'currentColor'}},
  // 'Map': {Icons: MapIconSet },
  // 'Medical': {Icons: MedicalIconSet},
  // 'MuiLine': {Icons: MuiLineIconSet},
  // 'Radix': {Icons: RadixIconSet},
  // 'Skill': {Icons: SkillIconSet},
  // 'Spinner': {Icons: SpinnerIconSet},
  // 'Tldraw': {Icons: TldrawIconSet},
  // 'VSCode': {Icons: VSCodeIconSet},
};
export const IconSetNames = Object.keys(IconSets);

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