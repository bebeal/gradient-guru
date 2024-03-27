'use client';

// assets page to show various ways you can import and use svgs, images.
// This will strictly be from client side (bundled and optimized by webpack)
import NextImage from 'next/image';
import PNGTest from '@/assets/images/panda-adversarial.png';
import { FC } from 'react';

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

const AssetsToRender: Record<string, FC> = {
  PNG_wrapped_in_img,
  PNG_wrapped_in_next_image,
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
