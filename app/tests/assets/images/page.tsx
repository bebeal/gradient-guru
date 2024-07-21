'use client';

// assets page to show various ways you can import and use svgs, images.
// This will strictly be from client side (bundled and optimized by webpack)
import { FC, useEffect, useRef, useState } from 'react';
import NextImage from 'next/image';
import { Icon, Kbd, Loading } from '@/components';
import mountains from '@/public/images/mountains.jpg';
import PNGTest from '@/public/images/panda-adversarial.png';
import Slow3GThrottling from '@/public/images/Slow3GThrottling.png';
import { getShimmerPlaceholder } from '@/utils';

// 3 common ways to use pngs:
// 1. direct import -> react component
// 1. wrapped in <img> -> react component
// 2. wrapped in <NextImage> -> react component
const PNG_wrapped_in_img = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loadTime, setLoadTime] = useState<number | null>(null);
  const startTime = useRef<number>(Date.now());
  useEffect(() => {
    startTime.current = Date.now();
  }, []);
  useEffect(() => {
    if (imgRef.current?.complete) {
      const endTime = Date.now();
      setLoadTime(endTime - startTime.current);
    }
  }, [imgRef.current?.complete]);
  return (
    <div className="flex flex-row gap-2 w-full justify-center items-center">
      {PNGTest.src && <img ref={imgRef} src={PNGTest.src} alt="panda" width={200} height={200} />}
      {/* {loadTime && <p className="text-sm">Load time: {loadTime}ms</p>} */}
    </div>
  );
};

const PNG_wrapped_in_next_image = () => {
  const nextRef = useRef<any>(null);
  const [loadTime, setLoadTime] = useState<number | null>(null);
  const startTime = useRef<number>(Date.now());
  useEffect(() => {
    startTime.current = Date.now();
  }, []);
  useEffect(() => {
    if (nextRef.current?.complete) {
      const endTime = Date.now();
      setLoadTime(endTime - startTime.current);
    }
  }, [nextRef.current?.complete]);
  return (
    <div className="flex flex-row gap-10 w-full justify-center items-center">
      {PNGTest.src && <NextImage ref={nextRef} src={PNGTest.src} alt="panda" width={200} height={200} />}
      {/* {loadTime && <p className="text-sm">Load time: {loadTime}ms</p>} */}
    </div>
  );
};

// Hint to test these, throttle the network speed to slow 3G in devtools
const Image_With_Shimmer_Placeholder = () => {
  return (
    <div className="flex flex-col w-full h-full gap-2 justify-center items-center">
      <h1>Image Component With Shimmer Data URL Placeholder</h1>
      <div className="flex flex-row w-full h-full gap-2 justify-around items-center">
        <div className="text-sm font-bold text-center flex flex-col p-4">
          Turn on Network Throttling in DevTools to see the shimmer effect
          <div className="flex flex-col gap-1 w-full justify-center items-center mt-2">
            <div className="flex w-auto">
              <Kbd>F12</Kbd>
            </div>
            <div className="">
              <Icon set="Carbon" icon="Add" className="w-4" />
            </div>
            <img src={Slow3GThrottling.src} alt="3G Throttling instructions" className="flex w-auto h-full max-h-[300px]" />
          </div>
        </div>
        <div className="border border-black dark:border-white rounded w-auto h-full overflow-auto p-2">
          <NextImage
            src={mountains}
            alt="Mountains w/ Shimmer Placeholder"
            placeholder={getShimmerPlaceholder(700, 475)}
            loading="lazy"
            width={700}
            height={475}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Image_With_Blur_Placeholder = () => {
  return (
    <div className="flex flex-col w-full h-full gap-2 justify-center items-center">
      <h1>Image Component With Blur Placeholder</h1>
      <div className="flex flex-row w-full h-full gap-2 justify-around items-center">
        <div className="text-sm font-bold text-center flex flex-col p-4">
          Turn on Network Throttling in DevTools to see the blur placeholder
          <div className="flex flex-col gap-1 w-full justify-center items-center mt-4">
            <div className="flex w-auto">
              <Kbd>F12</Kbd>
            </div>
            <div className="">
              <Icon set="Carbon" icon="Add" className="w-4" />
            </div>
            <img src={Slow3GThrottling.src} alt="3G Throttling instructions" className="flex w-auto h-full max-h-[300px]" />
          </div>
        </div>
        <div className="border border-black dark:border-white rounded w-auto h-full overflow-auto p-2">
          <NextImage
            alt="Mountains w/ Blur Placeholder"
            src={mountains}
            placeholder="blur"
            loading="lazy"
            quality={100}
            width={700}
            height={475}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
      </div>
    </div>
  );
};

const AssetsToRender: Record<string, FC> = {
  Image_With_Shimmer_Placeholder,
  Image_With_Blur_Placeholder,
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
                <Component />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssetsPage;
