'use client'

import styled from "styled-components";
import { getEncodedSVGUrl, isSVG } from "./svg";
import { cn } from "./utils";

// Default variants from radix ui
const defaultVariants = ['classic', 'solid', 'soft', 'surface', 'outline', 'ghost'] as const;
export type DefaultVariant = typeof defaultVariants[number];

// Custom variants
const customVariants = ['gradient', 'glow'] as const;
export type CustomVariant = typeof customVariants[number];

// Merged variants
export type Variant = CustomVariant | DefaultVariant;

// Reference tailwindcss border-radius
const radius = ['none', 'small', 'base', 'medium', 'large', 'full'] as const;
export type Radius = typeof radius[number];

export const isDefaultVariant = (variant: string): variant is DefaultVariant => {
  return defaultVariants.includes(variant as DefaultVariant);
};

export const isCustomVariant = (variant: string): variant is CustomVariant => {
  return customVariants.includes(variant as CustomVariant);
};

export const isRadius = (radius: string): radius is Radius => {
  return radius.includes(radius as Radius);
};

export const VariantClasses = (variant: CustomVariant = "gradient") => {
  return {
    'gradient': cn(
      `outline-0 bg-transparent focus:shadow-[0_0_0_1px_#FFFFFF]`,
    ),
    'glow': cn(

    ),
  }[variant];
};

export const RadiusClasses = (radius: Radius = "medium") => {
  return {
    'none': cn(`rounded-none`),
    'small': cn(`rounded-sm`),
    'base': cn(`rounded`),
    'medium': cn(`rounded-md`),
    'large': cn(`rounded-lg`),
    'full': cn(`rounded-full`),
  }[radius];
};

export const DynamicGradients = ($colors: string[], $direction: string) => {
  return `
    background-image: linear-gradient(${$direction}, ${$colors.join(',')});
    background-size: ${$colors.length * 100}%;
    animation: gradient-transition ${$colors.length * 2}s ease infinite;
  `;
};

export const DynamicGradientBackground = styled.div<{$colors: string[], $direction: string, $onDiv: boolean, $onPsuedoAfter: boolean}>`
  @keyframes gradient-transition {
    0% { background-position: 0% 50% },
    50% { background-position: 100% 50% },
    100% { background-position: 0% 50% },
  }
  ${props => props.$onDiv && DynamicGradients(props.$colors, props.$direction)}
  ${props => props.$onPsuedoAfter && `
    &::after {
      ${DynamicGradients(props.$colors, props.$direction)}
      position: absolute;
      width: 100%;
      height: 100%;
      content: "";
      z-index: -1;
    }
  `}
`;
export interface GradientDivProps {
  colors?: string[];
  radius?: Radius;
  backglow?: boolean;
  isHovered?: boolean;
  direction?: string;
  className?: string;
  children?: any;
};
export const GradientDiv = (props: GradientDivProps) => {
  const { 
    colors=['#FF1834', '#FFC900', '#00E0D9', '#0074E0', '#7F00DE', '#FF007E'],
    radius='medium',
    backglow=true,
    isHovered=false,
    direction='to left',
    className="",
    children,
    ...rest 
  } = props;

  // This is an absolutely positioned div with a linear-gradient background and a pseudo after element with the same linear-gradient background.
  return (
    <DynamicGradientBackground
      $onDiv={true}
      $onPsuedoAfter={backglow}
      $colors={colors}
      $direction={direction}
      className={cn(`w-full h-full flex gap-1 justify-center items-center absolute left-0 top-0 brightness-125 pointer-events-none`,
                    backglow && cn(`after:left-0 after:top-0 after:blur-xl after:opacity-60 after:brightness-100`),
                    // when hovered: invert the colors everywhere instead of showing gradient through the svg/text show as background:
                    // 1. Change the svg and text children to primary (black/white) color
                    // 2. Drop the background clip so that the gradient shows as the background now of the outer div
                    isHovered ? 'text-primary' : 'bg-clip-text text-transparent',
                    RadiusClasses(radius), 
                    className
                  )}
      {...rest}
    >
      {children?.map((child: any, index: number) => {
        // The children are parsed into 2 groups to seperate the svg elements from the text elements.
        if (isSVG(child)) {
          // To get the linaer gradient background to show through a transparent svg element, encode the svg as a data url and use it as a mask
          return (
            <DynamicGradientBackground
              $onDiv={false}
              $onPsuedoAfter={true}
              $colors={colors}
              $direction={direction}
              key={`svg-child-${index}`} 
              style={{ 
                WebkitMask: `${getEncodedSVGUrl(child)} 0 0 / 100% 100% no-repeat`,
                mask:`${getEncodedSVGUrl(child)} 0 0 / 100% 100% no-repeat`
              }}
              className={cn(`w-auto h-auto justify-center items-center flex`, 
                            `after:w-4/5 after:h-4/5 after:brightness-125`)}
            >{child}</DynamicGradientBackground>
          );
        } else {
          // To get the linear gradient background to show through the text elements background-clip the text
          return (
            <div 
              key={`text-child-${index}`} 
              className={cn(`w-auto h-auto justify-center items-center flex`)}
            >{child}</div>
          );
        }
      })}
    </DynamicGradientBackground>
  )
};
