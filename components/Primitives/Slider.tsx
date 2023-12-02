'use client'

import React, { forwardRef, useRef, useState } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/utils';

// todo: https://github.com/radix-ui/primitives/issues/1188
export interface SliderProps extends SliderPrimitive.SliderProps {
  showValue?: 'value' | 'percent' | 'none' | false;
  thumbSize?: number;
  className?: string;
}

export const Slider = forwardRef((props: SliderProps, externalRef?: any) => {
  const {
    min = 0,
    max = 100,
    step = 1,
    defaultValue = [Math.round(((max || 0) + (min || 0)) / 2 / step) * step],
    showValue = 'percent',
    thumbSize = 20,
    onValueChange,
    className,
    ...rest
  } = props;
  const internalRef = useRef(null);
  const [ref, setRef] = useState(externalRef || internalRef);
  const [value, setValue] = useState(defaultValue);

  // https://github.com/tmcw-up-for-adoption/simple-linear-scale/blob/master/index.js
  const linearScale = (input: readonly [number, number], output: readonly [number, number]) => {
    return (value: number) => {
      if (input[0] === input[1] || output[0] === output[1]) return output[0];
      const ratio = (output[1] - output[0]) / (input[1] - input[0]);
      return output[0] + ratio * (value - input[0]);
    };
  }

  const getTextInBoundsOffset = (width: number, percent: number) => {
    const halfWidth = width / 2;
    const halfPercent = 50;
    const offset = linearScale([0, halfPercent], [0, halfWidth]);
    return (halfWidth - offset(percent));
  }

  const percent = ((value[0] - min) / (max - min)) * 100;
  const textInBoundsOffset = getTextInBoundsOffset(thumbSize, percent);

  const valueToRender = showValue === 'none' ? '' : showValue === 'percent' ? `${Math.round(percent)}%` : value[0];

  return (
    <SliderPrimitive.Root
      ref={ref}
      minStepsBetweenThumbs={1}
      min={min}
      max={max}
      step={step}
      value={value}
      aria-label="value"
      className={cn("relative flex h-5 w-64 touch-none items-center mt-[1em]", className)}
      {...rest}
      onValueChange={(newValue: number[]) => {
        if (newValue === value) return;
        setValue?.(newValue);
        onValueChange?.(newValue);
      }}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-secondary cursor-pointer">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-accent" />
      </SliderPrimitive.Track>
        {(showValue && showValue !== 'none') && (
          <span 
            className={cn(`absolute text-primary/50 text-xs top-[-85%] -translate-x-1/2`)}
            style={{ left: `calc(${percent}% + ${textInBoundsOffset}px)` }}
          >
            {valueToRender}
          </span>
        )}
      <SliderPrimitive.Thumb
        className={cn(
          `block h-[${thumbSize}px] w-[${thumbSize}px] rounded-full bg-accent cursor-pointer`,
          "focus:outline-none focus-visible:ring focus-visible:ring-accent focus-visible:ring-opacity-75",
          "hover:outline-none hover:ring-[0.5px] hover:ring-accent hover:ring-opacity-75 ",
          "hover:bg-accent-hover",
        )}
      />
    </SliderPrimitive.Root>
  );
});


