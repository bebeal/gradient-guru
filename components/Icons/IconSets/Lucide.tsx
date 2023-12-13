import { 
  Camera,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  
} from 'lucide-react';

const HeadingIcons = {
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
}

const TextIcons = {
  ...HeadingIcons,
}

const ObjectIcons = {
  Camera,
}

import { IconSet } from '@/components';
export const LucideIconSet: IconSet = {
  ...TextIcons,
  ...ObjectIcons,
};
export const LucideIconNames = Object.keys(LucideIconSet);
export type LucideIcon = keyof typeof LucideIconSet;
