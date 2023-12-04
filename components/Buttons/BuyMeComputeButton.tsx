'use client'

import { NeonText, ThreeFanGpuProps, IconSetCache } from '@/components'
import { cn } from '@/utils'
import { forwardRef, useCallback, useState } from 'react'
import ParallaxTilt from 'react-parallax-tilt'

export interface BuyMeComputeButtonProps extends ThreeFanGpuProps {
}

export const BuyMeComputeButton = forwardRef((props: BuyMeComputeButtonProps, ref?: any) => {
    const { 
      className, 
      variant = 'realistic', 
      outline = false,
      ...rest 
    } = props
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    const onClick = useCallback((event?: any) => {
      event?.preventDefault()
      setClicked(true)
      setTimeout(() => {
        setClicked(false)
      }, 1000)
    }, [])

    const onEnter = useCallback(() => {
      setHovered(true)
    }, [])
    const onLeave = useCallback(() => {
      setHovered(false)
    }, [])

    return (
      <div className={cn(`bg-secondary p-20 w-auto h-auto relative flex transition-animation duration-1000 justify-center items-center cursor-pointer`, className)}>
      <ParallaxTilt
        tiltMaxAngleX={12.5}
        tiltMaxAngleY={12.5}
        transitionSpeed={1000/2}
        gyroscope={true}
        perspective={500}
        onEnter={onEnter}
        onLeave={onLeave}
      >
        <div
          onClick={onClick}
          className={cn("relative w-full h-full flex flex-col gap-1 justify-center items-center",
            "[filter:drop-shadow(0px_4px_20px_rgba(0,0,0,0.5))] [transition:all_0.5s_ease-out] [transform-style:preserve-3d] [transform:transform:perspective(500px)_translateZ(0px)_rotateX(0deg)_rotateY(0deg)] ",
            hovered && '[filter:drop-shadow(0px_4px_20px_rgba(0,0,0,0.5)] [transform:perspective(500px)_translateZ(25px)]',
            clicked && '[filter:drop-shadow(0px_4px_20px_rgba(0,0,0,0.5)] [transform:perspective(500px)_translateZ(50px)]',
        )}
        >
        { clicked && (
          <>
          <span 
              className={cn(`text-md absolute shadow-white text-white`,
                `animate-text-glow duration-1000`,
                `top-[40%] left-[-20%] [transform:rotate(-33deg)] z-[50]`
              )}
          >
            BRRRR
          </span>
          <span 
              className={cn(`text-sm absolute shadow-white text-white`,
                `animate-text-glow duration-1000`,
                `top-[45%] left-[93%] [transform:rotate(29deg)] z-[50]`
            )}
          >
            BRRRR
          </span>
          <span 
              className={cn(`text-sm absolute shadow-white text-white`,
                `animate-text-glow duration-1000`,
                `top-[105%] left-[39%] [transform:rotate(-4deg)] z-[50]`
            )}
          >
            BRRRR
          </span>
        </>
        )}
        <NeonText 
          colors={['white', '#2c3e50']}
          className={cn(`text-3xl shadow-white`,
            hovered && !clicked && `animate-text-glow`,
            clicked && `animate-bigger-text-glow duration-1000`
          )}
        >
          BUY ME COMPUTE
        </NeonText>
        <div
          className={cn(
              `overflow-visible w-auto h-auto relative`,
              className
          )}
        >
          <IconSetCache.Custom.ThreeFanGpu
            variant={variant}
            outline={outline}
            spinFans={hovered}
            className={cn('w-52 h-auto overflow-visible shadow-white', 
                          hovered && !clicked && `animate-svg-glow`, 
                          clicked && `animate-bigger-svg-glow duration-1000` 
                      )} 
            spinAnimation={ clicked ? 'animate-ramp-up-spin' : 'animate-rotate-counter-clockwise' }
          />
        </div>
        </div>
      </ParallaxTilt>
      </div>
    )
  }
)
