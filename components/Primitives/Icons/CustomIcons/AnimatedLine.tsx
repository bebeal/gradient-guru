'use client';

import { cn, DynamicGradientBackground, getEncodedSVGUrl } from "@/utils";
import { useEffect, useRef } from "react";
import styled from "styled-components";

// Animate a continuous dashed path of an svg
export const AnimatedDashedPath = styled.div<any>`
display: flex;
height: 100%;
width: auto;

path {
  z-index: 1;
  stroke-dasharray: 50;
  animation: dash 5s linear infinite;
  @keyframes dash {
    to {
      stroke-dashoffset: 100;
    }
  }
}
`;
// Animate a single path of an svg as if it were being drawn
export const AnimatedLinePath = styled.div<any>`
  display: flex;
  height: 100%;
  width: auto;

  path {
    fill: none;
    fill-rule: evenodd;

    stroke: currentColor;
    z-index: 1;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;

    --pathLength: 100;
    stroke-dasharray: var(--pathLength);
    animation: dash-stroke 6s linear forwards alternate infinite;
    @keyframes dash-stroke {
      to {
        stroke-dashoffset: 500;
      }
    }
  }
`;
export const AnimatedLineSVG = (props: any) => {
  const { children, width = '100%', height = '100%', type='line', className, ...rest } = props;

  // set pathLength on all path children
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const paths = ref.current.querySelectorAll('path');
      paths.forEach((path: any) => {
        path.setAttribute('style', '--pathLength: ' + path.getTotalLength());
      });
    }
  }, [ref]);

  const colors = ['#38C9EA', '#db258f', '#FFA93A', '#6D3DFC'];
  const AnimatedPath = type === 'dashed' ? AnimatedDashedPath : AnimatedLinePath;

  return (
    <DynamicGradientBackground
      $onDiv={false}
      $onPsuedoAfter={true}
      $colors={colors}
      $direction={'to left'}
      style={{
        WebkitMask: `${getEncodedSVGUrl(children)} 0 0 / ${width} ${height} no-repeat`,
        mask: `${getEncodedSVGUrl(children)} 0 0 / ${width} ${height} no-repeat`,
      }}
      className={cn(`relative w-auto h-full justify-center items-center flex after:w-auto after:h-auto after:flex after:items-center after:justify-center`, className)}
    >
      <AnimatedPath ref={ref} className={className} {...rest}>
        {children}
      </AnimatedPath>
    </DynamicGradientBackground>
  );
};
