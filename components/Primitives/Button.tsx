'use client'

import { Button as ThemedButton } from "@radix-ui/themes";
import { Variant, noop, cn, GradientDiv, GradientSvg, isDefaultVariant, Radius, RadiusClasses, VariantClasses, getEncodedSVGUrl, isSVG, isCustomVariant } from "@/utils";
import { useRippleEffect } from '@/hooks'
import { forwardRef, useEffect, useRef, useState } from "react";

export interface ButtonProps {
  children?: any;
  className?: string;
  onClick?: (event: any) => void;
  variant?: Variant;
  colors?: string[];
  radius?: Radius;
  ripple?: boolean;
  type?: any;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, externalRef) => {
  const internalRef = useRef<HTMLButtonElement>(null);
  const ref: any = externalRef || internalRef;
  const {
    children,
    className='',
    onClick: onClickCallback=noop,
    variant='gradient',
    colors= ['#7F00DE', '#C81BBD', '#FF007E', '#FF1834', '#FF0000', '#FFDA16', '#7FDC4D', '#00E0D9', '#00CDAC', '#02AAB0', '#0074E0'],
    radius='medium',
    ripple=true,
    type='button',
    ...rest
  } = props;
  const isGradientVariant: boolean = variant === 'gradient';
  const { createRippleEffect } = useRippleEffect();
  const [isHovered, setIsHovered] = useState(false);

  const onClick = (event: any) => {
    ripple && isCustomVariant(variant) && createRippleEffect(event);
    onClickCallback?.(event);
  }

  return isDefaultVariant(variant) ? (
    <ThemedButton ref={ref} className={cn(RadiusClasses(radius))} onClick={onClick} variant={variant} {...rest}>{children}</ThemedButton>
  ) : (
    <div className="relative">
      <button
        ref={ref}
        type={type}
        className={cn(
          `relative w-auto h-auto flex overflow-hidden select-none align-top cursor-pointer text-base leading-none z-[2]`,
          RadiusClasses(radius),
          VariantClasses(variant),
          className
        )}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isGradientVariant && (
          <div className={cn( `w-full h-full bg-primary text-transparent font-bold py-2 px-2.5 m-px`, RadiusClasses(radius))}>
            {/* For sizing the div properly since the gradient is an absolutely positioned div and this parent div needs to size as if its child is relative */}
            <div className={cn(`invisible w-auto h-auto flex gap-1 justify-center items-center`)}>{children}</div>
            {/* This is 1 out of 2 absolutely positioned divs with a linear-gradient backgrounds and is used to apply gradients to the child components */}
            <GradientDiv backglow={false} isHovered={isHovered} colors={colors} radius={radius}>{children}</GradientDiv>
          </div>
        )}
      </button>
      {/* Border Gradient, backglow to true which will apply large blur to the gradients tranistioning which are in sync with the gradients inside of the buttons */}
      {isGradientVariant && (
        <div className={cn("absolute grid grid-cols-1 inset-0 z-[1]")}>
          <GradientDiv backglow={true} isHovered={true} colors={colors} radius={radius} />
        </div>
      )}
    </div>
  )
});
Button.displayName = 'Button';

// const [mouse, setMouse] = useState({x: 0, y: 0});

// const onMouseMove = (event: any, target: any) => {
//   const rect = target.getBoundingClientRect();
//   const x = Math.round((event.clientX - rect.left) / target.clientWidth * 100);
//   const y = Math.round((event.clientY - rect.top) / target.clientHeight * 100);
//   setMouse({x, y});
// }
// onMouseMove={(event: any) => onMouseMove(event, ref?.current)}
{/* Hover shimmer-glow */}
{/* <GradientDiv colors={colors} className={cn(`pointer-events-none z-[100] blur-md absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 [background:radial-gradient(circle_closest-side_at_center,white,transparent)] opacity-0 left-[${mouse.x}%] top-[${mouse.y}%] bg-clip-text`, isHovered && `opacity-[0.75]`)} /> */}
