import React from 'react';
import styled from 'styled-components';
import { Radius, RadiusClasses } from './styles';
import { getEncodedSVGUrl, isSVG } from './svg';
import { cn } from './utils';

export type Color =
  | 'ruby'
  | 'tomato'
  | 'red'
  | 'crimson'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'violet'
  | 'iris'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'jade'
  | 'green'
  | 'grass'
  | 'brown'
  | 'orange'
  | 'sky'
  | 'mint'
  | 'lime'
  | 'yellow'
  | 'amber'
  | 'gold'
  | 'bronze'
  | 'gray'
  | undefined;

// Convert an RGB color to hex (e.g. rgb(255 255 255) => #ffffff)
export const stringToColor = (string: string): string => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

export const spectrum = ['#FF1834', '#FFC900', '#00E0D9', '#0074E0', '#7F00DE', '#FF007E'];

export const DynamicGradients = ($colors: string[], $direction: string) => {
  return `
    @keyframes gradient-transition {
      0% { background-position: 0% 50% },
      50% { background-position: 100% 50% },
      100% { background-position: 0% 50% },
    }
    background-image: linear-gradient(${$direction}, ${$colors.join(',')});
    background-size: ${$colors.length * 100}%;
    animation: gradient-transition ${$colors.length * 2}s ease infinite;
  `;
};

export const DynamicGradientBackground = styled.div<{
  $colors: string[];
  $direction: string;
  $onDiv: boolean;
  $onPsuedoAfter: boolean;
}>`
  ${(props) => props.$onDiv && DynamicGradients(props.$colors, props.$direction)}
  ${(props) =>
    props.$onPsuedoAfter &&
    `
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
}

export const GradientDiv = (props: GradientDivProps) => {
  const { colors = ['#FF1834', '#FFC900', '#00E0D9', '#0074E0', '#7F00DE', '#FF007E'], radius = 'medium', backglow = true, isHovered = false, direction = 'to left', className = '', children, ...rest } = props;

  // This is an absolutely positioned div with a linear-gradient background and a pseudo after element with the same linear-gradient background.
  return (
    <DynamicGradientBackground
      $onDiv={true}
      $onPsuedoAfter={backglow}
      $colors={colors}
      $direction={direction}
      className={cn(
        `w-full h-full flex gap-2 justify-center items-center absolute left-0 top-0 brightness-125 pointer-events-none`,
        backglow && cn(`after:left-0 after:top-0 after:blur-xl after:opacity-60 after:brightness-100`),
        // when hovered: invert the colors everywhere instead of showing gradient through the svg/text show as background:
        // 1. Change the svg and text children to primary (black/white) color
        // 2. Drop the background clip so that the gradient shows as the background now of the outer div
        isHovered ? 'text-[rgb(var(--background-primary))]' : 'bg-clip-text text-transparent',
        RadiusClasses(radius),
        className,
      )}
      {...rest}
    >
      {React.Children.map(children, (child, index) => {
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
                mask: `${getEncodedSVGUrl(child)} 0 0 / 100% 100% no-repeat`,
              }}
              className={cn(`w-auto h-auto justify-center items-center flex text-inherit`, `after:w-4/5 after:h-4/5 after:brightness-125`)}
            >
              {child}
            </DynamicGradientBackground>
          );
        } else {
          // To get the linear gradient background to show through the text elements background-clip the text
          return (
            <div key={`text-child-${index}`} className={cn(`w-auto h-auto justify-center items-center flex`)}>
              {child}
            </div>
          );
        }
      })}
    </DynamicGradientBackground>
  );
};
