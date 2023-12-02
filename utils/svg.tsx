'use client'
import { ReactElement, isValidElement, useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import styled from "styled-components";
import { cn } from "./utils";

// Check if a react element is an svg in various ways
export const isSVG = (svg: ReactElement): boolean => {
  if (!svg || !svg?.props) return false;
  return (isValidElement(svg) && (svg.type === 'svg' || (typeof svg.type === 'function' && svg.type.name.includes('Svg'))))
      || (svg.type as any)?.displayName?.includes('IconSetCache')
      || 'viewBox' in svg.props || 'd' in svg.props || 'fill' in svg.props || 'stroke' in svg.props;
};

// Encode svg given as a react functional component as a data url encoded string
export const getURISVG = (svg: ReactElement): string => {
  // TODO: fix the renderToStaticMarkup method broken in nextjs14
  return encodeURIComponent(ReactDOMServer.renderToStaticMarkup(svg));
};

// Encode svg given as a react functional component as a data url encoded string, and add css url markup to it
export const getEncodedSVGUrl = (svg: ReactElement): string => {
  const element: string = getURISVG(svg);
  return `url("data:image/svg+xml,${element}")`;
};

// svg version of linear-gradient using id #svg-gradient-<colors> (e.g. #svg-gradient-38C9EA,db258f,FFA93A,6D3DFC)
export const GradientSvg = (props: any) => {
  const { colors, backglow=true, direction='to left', ...rest } = props;
  // translate directions specified in css linear-gradient to svg linearGradient positions
  const directionMap: any = {
    'to left': {x1: "0%", y1: "0%", x2: `${colors.length * 100}%`, y2: "0%"},
    'to right': {x1: `${colors.length * 100}%`, y1: "0%", x2: "0%", y2: "0%"},
    'to top': {x1: "0%", y1: "0%", x2: "0%", y2: `${colors.length * 100}%`},
    'to bottom': {x1: "0%", y1: `${colors.length * 100}%`, x2: "0%", y2: "0%"},
  }

  return (
    <svg width="0" height="0" className={cn(`absolute`)} {...rest}>
      <defs>
        <linearGradient id={`svg-gradient-${colors.join(',').replace(/#/g, '')}`} {...directionMap[direction]}>
          {colors.map((color: string, index: number) => (
            <stop key={index} offset={`${index * 100 / (colors.length - 1)}%`} stopColor={color} />
          ))}
        </linearGradient>
      </defs>
    </svg>
  )
};

// make an SVG with a 4-corner gradient background (parameterized solution from https://stackoverflow.com/a/53681663)
export const fourCornerGradientBackground = (topLeft: string = "#38C9EA", topRight: string = "#db258f", bottomRight: string = "#FFA93A", bottomLeft: string = "#6D3DFC"): any => {
  return (
      <svg preserveAspectRatio="none" viewBox="0 0 1 1" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs>
          <linearGradient id="g">
              <stop offset="0" stopColor="#fff" stopOpacity="0"></stop>
              <stop offset="1" stopColor="#fff" stopOpacity="1"></stop>
          </linearGradient>
          <mask id="m">
              <rect x="0" y="0" width="1" height="1" fill="url(#g)"></rect>
          </mask>
          <linearGradient id="a" gradientTransform="rotate(90)">
              <stop offset="0" stopColor={topRight}></stop>
              <stop offset="1" stopColor={bottomRight}></stop>
          </linearGradient>
          <linearGradient id="b" gradientTransform="rotate(90)">
              <stop offset="0" stopColor={bottomLeft}></stop>
              <stop offset="1" stopColor={topLeft}></stop>
          </linearGradient>
          </defs>
          <rect x="0" y="0" width="1" height="1" fill="url(#a)" mask="url(#m)"></rect>
          <rect x="0" y="0" width="1" height="1" fill="url(#b)" mask="url(#m)" transform="translate(1,1) rotate(180)"></rect>
      </svg>
  );
};

// Animate a single path of an svg as if it were being drawn
export const AnimatedLinePath = styled.path<any>`
  stroke-linecap: round;
  stroke-linejoin: round;

  stroke-dasharray: ${props => props.pathLength};
  stroke-dashoffset: ${props => props.pathLength};
  animation: dash-stroke 2s linear alternate infinite;
  @keyframes dash-stroke {
    to {
      stroke-dashoffset: ${props => props.pathLength / 2};
    }
  }
`;
// Given an svg as a react functional component, animate the stroke of the svg as if it were being drawn
export const AnimatedLineSVG = (props: any) => {
  const{
    children,
    className,
    ...rest
  } = props;
  const [paths, setPaths] = useState<any>([]);
  const [pathLengths, setPathLengths] = useState<any>([]);
  const hiddenRef = useRef<any>();

  useEffect(() => {
    if (hiddenRef?.current) {
      const svg = hiddenRef.current;
      const pathRefs = Array.from(svg.querySelectorAll('path'));
      const calculatedPathDs = pathRefs.map((pathRef: any) => pathRef.getAttribute('d') || '');
      setPaths(calculatedPathDs);
      const calculatedPathLengths = pathRefs.map((pathRef: any) => {
        return pathRef.getTotalLength();
      });
      setPathLengths(calculatedPathLengths);
    }
  }, []);

  return (
    <>
    <div ref={hiddenRef} className={cn(`hidden`)}>{children}</div>
    <svg
      width={'1em'}
      height={'1em'}
      fill={'transparent'}
      stroke={'currentColor'}
      viewBox="0 0 32 32"
      className={cn(`w-full h-full`, className)}
      {...rest}
    >
      {paths.map((path: any, index: number) => {
        return (
          <AnimatedLinePath
            d={path}
            key={index}
            strokeWidth={2}
            pathLength={pathLengths[index]}
          />
        );
      })}
    </svg>
    </>
  );
};
