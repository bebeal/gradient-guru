'use client';

import React, { useCallback, useState } from 'react';
import ReactParallaxTilt from 'react-parallax-tilt';
import Image from 'next/image';
import { ThreeFanGpu, ThreeFanGpuProps } from '@/components/Primitives/Icons/CustomIcons/ThreeFanGpu';
import { Separator } from '@/components/Primitives/Separator';
import { cn } from '@/utils';
// import as asset SVG, see webpack definition in next.config.js
import { ImageCaption } from '@/utils/images';

const GPU = (props: ThreeFanGpuProps) => {
  const { className, variant = 'unique', outline = false, ...rest } = props;
  const [hovered, setHovered] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  const onClick = useCallback(
    (event?: any) => {
      event?.preventDefault();
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
      }, 1000);
    },
    [setClicked],
  );

  const onEnter = useCallback(() => {
    setHovered(true);
  }, [setHovered]);

  const onLeave = useCallback(() => {
    setHovered(false);
  }, [setHovered]);

  return (
    <ReactParallaxTilt tiltMaxAngleX={12.5} tiltMaxAngleY={12.5} transitionSpeed={1000 / 2} gyroscope={true} perspective={500} onEnter={onEnter} onLeave={onLeave}>
      <div
        onClick={onClick}
        className={cn(
          'relative w-full h-full flex flex-col gap-1 justify-center items-center py-10',
          '[filter:drop-shadow(0px_4px_20px_rgba(0,0,0,0.5))] [transition:all_0.5s_ease-out] [transform-style:preserve-3d] [transform:transform:perspective(500px)_translateZ(0px)_rotateX(0deg)_rotateY(0deg)] ',
          hovered && '[filter:drop-shadow(0px_4px_20px_rgba(0,0,0,0.5)] [transform:perspective(500px)_translateZ(25px)]',
          clicked && '[filter:drop-shadow(0px_4px_20px_rgba(0,0,0,0.5)] [transform:perspective(500px)_translateZ(50px)]',
        )}
      >
        <div className={cn(`overflow-visible w-auto h-auto relative`, className)}>
          {(hovered || clicked) && (
            <>
              <span className={cn(`text-xs absolute shadow-white text-white`, `text-glow`, `top-[40%] left-[-30%] [transform:rotate(-33deg)] z-[50]`)}>BRRRR</span>
              <span className={cn(`text-xs absolute shadow-white text-white`, `text-glow`, `top-[45%] left-[110%] [transform:rotate(29deg)] z-[50]`)}>BRRRR</span>
            </>
          )}
          <ThreeFanGpu
            variant={variant}
            outline={outline}
            spinFans={hovered}
            className={cn('w-full h-auto overflow-visible shadow-white', hovered && !clicked && `svg-glow`, clicked && `big-svg-glow`)}
            spinAnimation={clicked ? 'animate-ramp-up-spin' : 'animate-spin-ccw'}
          />
        </div>
      </div>
    </ReactParallaxTilt>
  );
};

const GPUPage = () => {
  return (
    <div className="h-full w-full bg-[#405CB1] bg-grid-[#E4EAF6]/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="relative flex w-[50%] h-auto p-4 overflow-hidden rounded">
        <ImageCaption image={<GPU />} caption="GPU Architecture" text="[#98AEDD]" />
      </div>
    </div>
  );
};

export default GPUPage;
