'use client';

// assets page to show various ways you can import and use svgs, images.
// This will strictly be from client side (bundled and optimized by webpack)
import { useRef, useState } from 'react';
import NextImage from 'next/image';
import MachineLeaerningIcon from '@/assets/icons/Carbon/MachineLearning.svg';
import SendIcon from '@/assets/icons/Carbon/Send.svg';
import PNGTest from '@/assets/images/panda-adversarial.png';
import { AnimatedDashedPath, AnimatedLinePath, AnimatedLineSVG, MissingNoSprite, WildMissingNoAppeaered } from '@/components';

// 3 common ways to use pngs:
// 1. direct import -> react component
// 1. wrapped in <img> -> react component
// 2. wrapped in <NextImage> -> react component
const PNG_wrapped_in_img = () => {
  return <img src={PNGTest.src} alt="panda" width={200} height={200} />;
};
const PNG_wrapped_in_next_image = () => {
  return <NextImage src={PNGTest.src} alt="panda" width={200} height={200} />;
};

// common way to use svgs:
// 1. direct import -> react component
//  - Can use tailwind classes to style it, and override the native svg properties such as width, height, viewBox, etc.
// 2. pure react component structure
// 3. wrapped within other html to animate

const SVG_from_direct_import = () => {
  return <MachineLeaerningIcon width="200" height="200" />;
};
const SVG_from_direct_import_with_props = () => {
  return (
    <div className="w-full h-full p-10">
      <MachineLeaerningIcon
        width="200"
        height="200"
        viewBox="0 0 32 32"
        className="rounded-lg animate-spin [animation-duration:5s] duration-1000 fill-current stroke-current hover:scale-150 transition-transform ease-in-out bg-gradient-to-r from-sky-400 to-violet-400 text-black"
      />
    </div>
  );
};
const SVG_from_pure_react_component = () => {
  return (
    <svg width="200" height="200" viewBox="0 0 32 32" className="fill-current stroke-current bg-slate-500 text-black">
      <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14s14-6.268 14-14S23.732 2 16 2z" />
    </svg>
  );
};
const SVG_animation_wrapper_draw = () => {
  return (
    <AnimatedLineSVG>
      <SendIcon height="56" width="56" viewBox="0 0 32 32" className="w-full h-full bg-transparent text-primary" />
    </AnimatedLineSVG>
  );
};
// https://css-tricks.com/svg-line-animation-works/
const SVG_animation_wrapper_dashed = () => {
  return (
    <div className="relative w-[200px] h-[200px]">
      <div className="absolute w-full h-full z-10">
    <AnimatedDashedPath>
      <svg width="200" height="200" viewBox="0 0 340 333" className="w-full h-full text-primary">
        <path fill="transparent" stroke="currentColor" strokeWidth="4" d="M66.039,133.545c0,0-21-57,18-67s49-4,65,8
        s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
        C46.039,146.545,53.039,128.545,66.039,133.545z"/>
      </svg>
    </AnimatedDashedPath>
      </div>
      <div className="absolute w-full h-full z-1">
        <svg width="200" height="200" viewBox="0 0 340 333" className="w-full h-full text-primary">
          <path fill="transparent" stroke="#777777CC" strokeWidth="4" d="M66.039,133.545c0,0-21-57,18-67s49-4,65,8
          s30,41,53,27s66,4,58,32s-5,44,18,57s22,46,0,45s-54-40-68-16s-40,88-83,48s11-61-11-80s-79-7-70-41
          C46.039,146.545,53.039,128.545,66.039,133.545z"/>
        </svg>
      </div>
    </div>
  );
};
const SVGs_animated_on_hover = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="container relative w-[200px] h-[200px]" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="w-full h-full">
        <MissingNoSprite className="h-full w-full" />
      </div>
      {isHovered && (
        <div className="absolute bottom-0 left-0 w-full flex justify-end items-center">
          <WildMissingNoAppeaered width="100%" className="bg-gray-500" />,
        </div>
      )}
    </div>
  );
};

const AssetsToRender: any = {
  PNG_wrapped_in_img,
  PNG_wrapped_in_next_image,
  SVG_from_direct_import,
  SVG_from_direct_import_with_props,
  SVG_from_pure_react_component,
  SVG_animation_wrapper_draw,
  SVG_animation_wrapper_dashed,
  SVGs_animated_on_hover,
};

const AssetsPage = () => {
  const title = 'Assets';
  return (
    <div className="flex flex-col w-auto h-auto justify-center items-center gap-1 p-2 overflow-auto bg-primary">
      <div className="text-2xl font-bold text-center underline">{title}</div>
      <div className="flex flex-col gap-10 w-full h-full justify-center items-center p-10">
        {Object.keys(AssetsToRender).map((key: any) => {
          const Component: any = AssetsToRender[key];
          return (
            <div key={key} className="flex flex-col rounded items-center justify-center w-full h-full overflow-auto bg-primary text-primary gap-2 border border-primary p-2">
              <div className="flex flex-col items-center justify-center w-full h-auto gap-1 text-sm">
                <h1 className="text-md font-bold text-center">{key.replace(/_/g, ' ')}</h1>
                <div className="border border-black dark:border-white rounded w-auto h-full overflow-auto p-2">
                  <Component />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssetsPage;
