import { cn } from "./basic";

export const DisabledClasses = cn(`disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none`);

// Default variants from radix ui
export const defaultVariants = ['classic', 'solid', 'soft', 'surface', 'outline', 'ghost'] as const;
export type DefaultVariant = (typeof defaultVariants)[number];

// Custom variants
export const customVariants = ['gradient', 'glow', 'none', 'normal'] as const;
export type CustomVariant = (typeof customVariants)[number];

// Merged variants
export type Variant = CustomVariant | DefaultVariant;

// Reference tailwindcss border-radius
export const radius = ['none', 'small', 'base', 'medium', 'large', 'xlarge', 'full'] as const;
export type Radius = (typeof radius)[number];

export const orientation = ['horizontal', 'vertical'] as const;
export type Orientation = (typeof orientation)[number];

export const isDefaultVariant = (variant: string): variant is DefaultVariant => {
  return defaultVariants.includes(variant as DefaultVariant);
};

export const isCustomVariant = (variant: string): variant is CustomVariant => {
  return customVariants.includes(variant as CustomVariant);
};

export const isRadius = (radius: string): radius is Radius => {
  return radius.includes(radius as Radius);
};

export const isOrientation = (orientation: string): orientation is Orientation => {
  return orientation.includes(orientation as Orientation);
};

export const VariantClasses = (variant: CustomVariant = 'gradient') => {
  return {
    gradient: cn(`outline-0 bg-transparent focus:shadow-[0_0_0_1px_#FFFFFF]`),
    glow: cn(),
    none: cn(`outline-0 bg-transparent text-primary`),
    normal: cn(),
  }[variant];
};

export const RadiusClasses = (radius: Radius = 'medium') => {
  return {
    none: cn(`rounded-none`),
    small: cn(`rounded-sm`),
    base: cn(`rounded`),
    medium: cn(`rounded-md`),
    large: cn(`rounded-lg`),
    xlarge: cn(`rounded-xl`),
    full: cn(`rounded-full`),
  }[radius];
};

export const ConvertRadiusClass = (radius: Radius = 'medium') => {
  return {
    none: 'none',
    small: 'sm',
    base: '',
    medium: 'md',
    large: 'lg',
    xlarge: 'xl',
    full: 'full',
  }[radius];
};

export const OrientationClasses = (orientation: Orientation = 'horizontal') => {
  return {
    horizontal: cn(`flex-row w-full`),
    vertical: cn(`flex-col h-full`),
  }[orientation];
};
