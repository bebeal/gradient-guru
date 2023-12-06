'use client'

import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
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

// export type SliderProps = Omit<SliderPrimitive.SliderProps, "value" | "onValueChange" | "onChange" | "defaultValue" > & {
export type SliderProps = {
  value?: number;
  defaultValue?: any;
  onChange?: (value: any) => void;
  onValueChange?: (value: any) => void;
  marks?: number[];
  showValue?: 'value' | 'percent' | 'none' | false;
  thumbSize?: number;
  className?: string;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
}

export const Slider = forwardRef<any, SliderProps>((props, ref) => {
  const {
    min = 0,
    max = 100,
    step = 1,
    name,
    defaultValue = (max - min) / 2,
    value = defaultValue,
    onChange: onChangeCallback,
    onValueChange: onValueChangeCallback,
    marks=[],
    showValue = 'none',
    thumbSize = 20,
    className,
    ...rest
  } = props;
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const [internalValue, setInternalValue] = useState<number>(value || defaultValue);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const onChange = useCallback((newValue: number) => {
    // synthetic event
    const event = {
      target: {
        value: newValue,
        name: name,
        type: 'button',
      },
    };
    onChangeCallback?.(event as any);
  }, [name, onChangeCallback]);

  const onValueChange = useCallback((newValue: number[]) => {
    if (newValue[0] === internalValue) return;
    setInternalValue(newValue[0]);
    onValueChangeCallback?.(newValue[0]);
    onChange(newValue[0]);
  }, [internalValue, onChange, onValueChangeCallback]);

  return (
    <SliderPrimitive.Root
      ref={ref}
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue !== undefined ? [defaultValue] : undefined}
      value={[internalValue]}
      aria-label="value"
      className={cn("relative flex items-center select-none touch-none w-full h-5 mt-[1em] mx-[1em] p-1", className)}
      {...rest}
      onChange={noop}
      onValueChange={onValueChange}
    >
      <SliderPrimitive.Track className="relative h-1 w-full flex-grow rounded-full bg-tertiary cursor-pointer">
        {marks?.map((markValue, index) => (
          <div
            key={index}
            className={cn(`absolute h-[200%] top-[-50%] w-[1.5px] bg-tertiary hover:bg-accent/50`)}
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
          `block h-[${thumbSize}px] w-[${thumbSize}px] rounded-full bg-accent cursor-pointer pointer-events-auto overflow-hidden`,
          "hover:outline-none hover:ring-[0.5px] hover:ring-accent hover:ring-opacity-75 ",
          "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75",
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-accent focus-within:ring-opacity-75",
        )}
        onPointerUp={(e) => e.currentTarget.blur()}
      >
        {(showValue && showValue !== 'none') && (
          <span 
            className={cn(`absolute text-primary/50 text-xs top-[-.75em] -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center leading-none`)}
            style={{ left: calcStepMarkOffset(internalValue, min, max, thumbSize) }}
          >
            {showValue === 'percent' && `${convertValueToPercentage(internalValue, min, max).toFixed(0)}%`}
            {showValue === 'value' && `${internalValue}`}
          </span>
        )}
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  );
});

