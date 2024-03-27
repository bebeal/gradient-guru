// import { AcademiconsIconSet, CarbonIconSet, CustomIconSet, DevIconSet, EntypoPlusIconSet, EntypoSocialIconSet, FlagIconSet, FontAudioIconSet, FontAwesomeRegularIconSet, FontGISIconSet, GameIconSet, GeoglyphsIconSet, HeroiconsSolidIconSet, LogosIconSet, LucideIconSet, MapIconSet, MedicalIconSet, MuiLineIconSet, RadixIconSet, SkillIconSet, SpinnerIconSet, TldrawIconSet, VSCodeIconSet } from './IconSets';
import { CarbonIconSet, TldrawIconSet, CodeLanguagesIconSet, LogosIconSet, CustomIconSet, LucideIconSet, RadixIconSet } from "./IconSets";
import { IconProps } from './Icon';

// IconSetMap: simple mapping from name of the icon to something that can be rendered
// 'example-icon-name': IconComponent (React.FC)
export interface IconSetMap {
  [icon: string]: any; // ElementType but it breakas rn so any
}

export interface IconSet {
  icons: IconSetMap;
  iconProps?: IconProps;
}

export const IconSets: Record<string, IconSet> = {
  'Carbon': {icons: CarbonIconSet},
  'Tldraw': {icons: TldrawIconSet, iconProps: {stroke: 'black'}},
  'CodeLanguages': {icons: CodeLanguagesIconSet},
  'Logos': {icons: LogosIconSet},
  'Custom': {icons: CustomIconSet},
  'Lucide': {icons: LucideIconSet, iconProps: {stroke: 'currentColor', fill: 'none'}},
  'Radix': {icons: RadixIconSet},
};
export const IconSetNames: string[] = Object.keys(IconSets) || [];
export type IconSetNames = keyof typeof IconSets;

export const defaultIconProps = {
  width: '1em',
  height: '100%',
  fill: 'currentColor',
  stroke: 'none'
} satisfies IconProps;
