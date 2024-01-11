'use client'

import { forwardRef, useCallback, useState } from 'react';
import ParallaxTilt from 'react-parallax-tilt';
import { IconSetCache, ThreeFanGpuProps } from '@/components';
import { cn } from '@/utils';


export interface BuyMeComputeButtonProps extends ThreeFanGpuProps {}

export const BuyMeComputeButton = forwardRef((props: BuyMeComputeButtonProps, ref?: any) => {
  const { className, variant = 'realistic', outline = false, ...rest } = props;
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const onClick = useCallback((event?: any) => {
    event?.preventDefault();
    setClicked(true);
    setTimeout(() => {
      window.open('/compute', '_blank');
      setClicked(false);
    }, 1000);
  }, []);

  const onEnter = useCallback(() => {
    setHovered(true);
  }, []);
  const onLeave = useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <div className={cn(`bg-transparent w-auto h-auto relative flex transition-animation anim-duration-1000 justify-center items-center cursor-pointer`, className)}>
      <ParallaxTilt tiltMaxAngleX={12.5} tiltMaxAngleY={12.5} transitionSpeed={1000 / 2} gyroscope={true} perspective={500} onEnter={onEnter} onLeave={onLeave}>
        <div
          onClick={onClick}
          className={cn(
            'relative w-auto h-full flex flex-col gap-1 justify-center items-center',
            '[filter:drop-shadow(0px_4px_20px_rgba(0,0,0,0.5))] [transition:all_0.5s_ease-out] [transform-style:preserve-3d] [transform:transform:perspective(500px)_translateZ(0px)_rotateX(0deg)_rotateY(0deg)] ',
            hovered && '[filter:drop-shadow(0px_4px_20px_rgba(0,0,0,0.5)] [transform:perspective(500px)_translateZ(25px)]',
            clicked && '[filter:drop-shadow(0px_4px_20px_rgba(0,0,0,0.5)] [transform:perspective(500px)_translateZ(50px)]'
          )}
        >
          <div className={cn(`overflow-visible w-auto h-auto relative`, className)}>
            {clicked && (
              <>
                <span className={cn(`text-xs absolute shadow-white text-white`, `animate-text-glow anim-duration-1000`, `top-[40%] left-[-50%] [transform:rotate(-33deg)] z-[50]`)}>BRRRR</span>
                <span className={cn(`text-xs absolute shadow-white text-white`, `animate-text-glow anim-duration-1000`, `top-[45%] left-[105%] [transform:rotate(29deg)] z-[50]`)}>BRRRR</span>
              </>
            )}
            <IconSetCache.Custom.ThreeFanGpu
              variant={variant}
              outline={outline}
              spinFans={hovered}
              className={cn('w-20 h-auto overflow-visible shadow-white', hovered && !clicked && `animate-svg-glow`, clicked && `animate-bigger-svg-glow anim-duration-1000`)}
              spinAnimation={clicked ? 'animate-ramp-up-spin' : 'animate-rotate-counter-clockwise'}
            />
          </div>
          <div
            className={cn(
              'flex flex-wrap whitespace-normal text-white font-bold overflow-hidden relative p-2 w-auto text-base shadow-white',
              hovered && !clicked && `animate-text-glow`,
              clicked && `animate-bigger-text-glow anim-duration-1000`,
              className
            )}
          >
            BUY ME COMPUTE
          </div>
        </div>
      </ParallaxTilt>
    </div>
  );
});