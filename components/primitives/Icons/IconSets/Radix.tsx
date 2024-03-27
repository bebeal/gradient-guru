import {
  AlignBaselineIcon,
  AlignBottomIcon,
  AlignCenterHorizontallyIcon,
  AlignCenterVerticallyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignTopIcon,
  DashIcon,
  FontBoldIcon,
  FontFamilyIcon,
  FontItalicIcon,
  FontRomanIcon,
  FontSizeIcon,
  FontStyleIcon,
  HeadingIcon,
  LetterCaseCapitalizeIcon,
  LetterCaseLowercaseIcon,
  LetterCaseToggleIcon,
  LetterCaseUppercaseIcon,
  LetterSpacingIcon,
  LineHeightIcon,
  OverlineIcon,
  PilcrowIcon,
  PinBottomIcon,
  PinLeftIcon,
  PinRightIcon,
  PinTopIcon,
  SpaceBetweenHorizontallyIcon,
  SpaceBetweenVerticallyIcon,
  SpaceEvenlyHorizontallyIcon,
  SpaceEvenlyVerticallyIcon,
  StretchHorizontallyIcon,
  StretchVerticallyIcon,
  StrikethroughIcon,
  TextAlignBottomIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignMiddleIcon,
  TextAlignRightIcon,
  TextAlignTopIcon,
  TextIcon,
  TextNoneIcon,
  UnderlineIcon,
} from '@radix-ui/react-icons';
import { IconSet } from '../IconSet';

const LetterIcons = {
  LetterCaseUppercase: LetterCaseUppercaseIcon,
  LetterCaseCapitalize: LetterCaseCapitalizeIcon,
  LetterCaseLowercase: LetterCaseLowercaseIcon,
  LetterCaseToggle: LetterCaseToggleIcon,
  LetterSpacing: LetterSpacingIcon,
};

const FontIcons = {
  FontStyle: FontStyleIcon,
  FontItalic: FontItalicIcon,
  FontRoman: FontRomanIcon,
  FontBold: FontBoldIcon,
  FontSize: FontSizeIcon,
  FontFamily: FontFamilyIcon,
};

const TextIcons = {
  AlignBaseline: AlignBaselineIcon,
  Heading: HeadingIcon,
  Text: TextIcon,
  TextNone: TextNoneIcon,
  LineHeight: LineHeightIcon,
  Underline: UnderlineIcon,
  Strikethrough: StrikethroughIcon,
  Overline: OverlineIcon,
  Pilcrow: PilcrowIcon,
  TextAlignLeft: TextAlignLeftIcon,
  TextAlignCenter: TextAlignCenterIcon,
  TextAlignRight: TextAlignRightIcon,
  TextAlignJustify: TextAlignJustifyIcon,
  TextAlignTop: TextAlignTopIcon,
  TextAlignMiddle: TextAlignMiddleIcon,
  TextAlignBottom: TextAlignBottomIcon,
  Dash: DashIcon,
};

const Typography = {
  ...FontIcons,
  ...LetterIcons,
  ...TextIcons,
};

const Alignment = {
  AlignTop: AlignTopIcon,
  AlignCenterVertically: AlignCenterVerticallyIcon,
  AlignBottom: AlignBottomIcon,
  StretchVertically: StretchVerticallyIcon,
  AlignLeft: AlignLeftIcon,
  AlignCenterHorizontally: AlignCenterHorizontallyIcon,
  AlignRight: AlignRightIcon,
  StretchHorizontally: StretchHorizontallyIcon,
  SpaceBetweenHorizontally: SpaceBetweenHorizontallyIcon,
  SpaceEvenlyHorizontally: SpaceEvenlyHorizontallyIcon,
  SpaceBetweenVertically: SpaceBetweenVerticallyIcon,
  SpaceEvenlyVertically: SpaceEvenlyVerticallyIcon,
  PinLeft: PinLeftIcon,
  PinRight: PinRightIcon,
  PinTop: PinTopIcon,
  PinBottom: PinBottomIcon,
};

export const RadixIconSet: IconSet = {
  ...Typography,
  ...Alignment,
};
export const RadixIconNames = Object.keys(RadixIconSet);
export type RadixIcon = keyof typeof RadixIconSet;
