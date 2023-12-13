import {
  LetterCaseUppercaseIcon,
  LetterCaseCapitalizeIcon,
  LetterCaseLowercaseIcon,
  LetterCaseToggleIcon,
  LetterSpacingIcon,
  FontStyleIcon,
  FontItalicIcon,
  FontRomanIcon,
  FontBoldIcon,
  FontSizeIcon,
  FontFamilyIcon,
  AlignBaselineIcon,
  HeadingIcon,
  TextIcon,
  TextNoneIcon,
  LineHeightIcon,
  UnderlineIcon,
  StrikethroughIcon,
  OverlineIcon,
  PilcrowIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  TextAlignJustifyIcon,
  TextAlignTopIcon,
  TextAlignMiddleIcon,
  TextAlignBottomIcon,
  DashIcon,
  AlignTopIcon,
  AlignCenterVerticallyIcon,
  AlignBottomIcon,
  StretchVerticallyIcon,
  AlignLeftIcon,
  AlignCenterHorizontallyIcon,
  AlignRightIcon,
  StretchHorizontallyIcon,
  SpaceBetweenHorizontallyIcon,
  SpaceEvenlyHorizontallyIcon,
  SpaceBetweenVerticallyIcon,
  SpaceEvenlyVerticallyIcon,
  PinLeftIcon,
  PinRightIcon,
  PinTopIcon,
  PinBottomIcon,
} from "@radix-ui/react-icons";

const LetterIcons = {
  LetterCaseUppercase: LetterCaseUppercaseIcon,
  LetterCaseCapitalize: LetterCaseCapitalizeIcon,
  LetterCaseLowercase: LetterCaseLowercaseIcon,
  LetterCaseToggle: LetterCaseToggleIcon,
  LetterSpacing: LetterSpacingIcon,
}

const FontIcons = {
  FontStyle: FontStyleIcon,
  FontItalic: FontItalicIcon,
  FontRoman: FontRomanIcon,
  FontBold: FontBoldIcon,
  FontSize: FontSizeIcon,
  FontFamily: FontFamilyIcon,
}


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
}

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
}

import { IconSet } from '@/components';
export const RadixIconSet: IconSet = {
  ...Typography,
  ...Alignment,
};
export const RadixIconNames = Object.keys(RadixIconSet);
export type RadixIcon = keyof typeof RadixIconSet;
