'use client'

import React, { forwardRef, useCallback, useRef } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn, noop } from '@/utils';

// https://github.com/tmcw-up-for-adoption/simple-linear-scale/blob/master/index.js
const linearScale = (input: readonly [number, number], output: readonly [number, number]) => {
  return (value: number) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
};

const getThumbInBoundsOffset = (width: number, left: number, direction: number = 1) => {
  const halfWidth = width / 2;
  const halfPercent = 50;
  const offset = linearScale([0, halfPercent], [0, halfWidth]);
  return (halfWidth - offset(left) * direction) * direction;
}
const convertValueToPercentage = (value: number, min: number, max: number) => {
  return ((value - min) / (max - min)) * 100;
}

const calcStepMarkOffset = (value: number, min: number, max: number, thumbSize: number = 20, direction: number = 1) => {
  const percent = convertValueToPercentage(value, min, max);
  const thumbInBoundsOffset = getThumbInBoundsOffset(thumbSize, percent, direction);
  return `calc(${percent}% + ${thumbInBoundsOffset}px)`;
}

export type SliderProps = Omit<SliderPrimitive.SliderProps, "value" | "onValueChange" | "onChange" | "defaultValue" > & {
  value: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  marks?: number[];
  showValue?: 'value' | 'percent' | 'none' | false;
  thumbSize?: number;
  className?: string;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const {
    min = 0,
    max = 100,
    step = 1,
    name,
    value,
    defaultValue = min + step,
    onChange: onChangeCallback,
    marks=[min, defaultValue, max],
    showValue = 'none',
    thumbSize = 20,
    className,
    ...rest
  } = props;
  const thumbRef = useRef<HTMLDivElement | null>(null);

  const onChange = useCallback((newValue: number) => {
    if (newValue === value) return;
    // synthetic event
    const event = {
      target: {
        value: newValue,
        name: name,
        type: 'button',
      },
    };
    onChangeCallback?.(event as any);
  }, [value, name, onChangeCallback]);

  return (
    <SliderPrimitive.Root
      ref={ref}
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue !== undefined ? [defaultValue] : undefined}
      value={[value]}
      aria-label="value"
      className={cn("relative flex items-center select-none touch-none w-full h-5 mt-[1em] mx-[0.5em]", className)}
      {...rest}
      onChange={noop}
      onValueChange={(newValue) => onChange(newValue[0])}
    >
      <SliderPrimitive.Track className="relative h-1 w-full flex-grow rounded-full bg-secondary cursor-pointer">
        {marks?.map((markValue, index) => (
          <div
            key={index}
            className={cn(`absolute h-[200%] top-[-50%] w-[1px] bg-secondary hover:bg-accent/50`)}
            onClick={(e) => {
              e.stopPropagation();
              onChange(markValue);
              thumbRef.current?.blur();
            }}
            style={{
              left: calcStepMarkOffset(markValue, min, max, thumbSize),
            }}
          />
        ))}
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-accent" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        ref={thumbRef}
        className={cn(
          `block h-[${thumbSize}px] w-[${thumbSize}px] rounded-full bg-accent cursor-pointer overflow-hidden pointer-events-auto`,
          "hover:outline-none hover:ring-[0.5px] hover:ring-accent hover:ring-opacity-75 ",
          "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75",
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-accent focus-within:ring-opacity-75",
        )}
        onPointerUp={(e) => e.currentTarget.blur()}
      >
        {(showValue && showValue !== 'none') && (
          <span 
            className={cn(`absolute text-primary/50 text-xs top-[-100%] -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center`)}
            style={{ left: calcStepMarkOffset(value, min, max, thumbSize) }}
          >
            {showValue === 'percent' && `${convertValueToPercentage(value, min, max).toFixed(0)}%`}
            {showValue === 'value' && `${value}`}
          </span>
        )}
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  );
});

