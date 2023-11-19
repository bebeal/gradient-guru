'use client'

import { Button as ThemedButton } from "@radix-ui/themes";
import { Variant, noop, cn, GradientDiv, GradientSvg, isDefaultVariant, Radius, RadiusClasses, VariantClasses, getEncodedSVGUrl, isSVG } from "@/utils";
import { useRippleEffect } from '@/hooks'
import { forwardRef, useEffect, useRef, useState } from "react";

export interface ButtonProps {
  children?: any;
  className?: string;
  onClick?: () => {};
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
    colors=['#FF1834', '#FFC900', '#00E0D9', '#0074E0', '#7F00DE', '#FF007E'],
    radius='medium',
    ripple=true,
    type='button',
    ...rest
  } = props;
  const isGradientVariant: boolean = variant === 'gradient';
  const { createRippleEffect } = useRippleEffect();
  const [isHovered, setIsHovered] = useState(false);

  const onClick = (event: any) => {
    ripple && createRippleEffect(event);
    onClickCallback?.(event);
  }

  return isDefaultVariant(variant) ? (
    <ThemedButton ref={ref} className={cn(RadiusClasses(radius), className)} onClick={onClick} variant={variant} {...rest}>{children}</ThemedButton>
  ) : (
    <div className="relative">
      <button
        ref={ref}
        type={type}
        className={cn(
          `flex w-auto h-auto box-border select-none align-top cursor-pointer overflow-hidden relative`,
          `m-0 text-base leading-none`,
          RadiusClasses(radius),
          VariantClasses(variant),
          className
        )}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isGradientVariant && (
          <>
          <div className={cn( `font-bold w-full h-full bg-primary text-transparent py-[8px] px-[10px] m-[1px]`, RadiusClasses(radius))}>
            {/* For sizing the div properly since the gradient is an absolutely positioned div and this parent div needs to size as if its child is relative */}
            <div className={cn(`invisible flex w-auto h-auto gap-1 justify-center items-center font-bold`)}>{children}</div>
            {/* This is 2 absolutely positioned divs with a linear-gradient backgrounds. 
                One is used with a large blur affect to make the backglow.
                The other is used to apply gradients to the child components
            */}
            <GradientDiv backglow={false} isHovered={isHovered} colors={colors} radius={radius}>{children}</GradientDiv>
          </div>
          </>
        )}
      </button>
      {/* Border Gradient, backglow to true which will apply large blur to the gradients tranistioning which are in sync with the gradients inside of the buttons */}
      {isGradientVariant && (
        <div className={cn("absolute inset-x-0 inset-y-0 z-[-1] grid grid-cols-[1fr]")}>
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
