'use client'

import React, { ForwardedRef, forwardRef, useCallback, useEffect, useState } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { DisabledClasses, Radius, RadiusClasses, cn, noop } from "@/utils";
import { IconSetCache } from "..";

// export interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {
  export interface CheckboxProps {
  checked?: boolean | undefined | 'indeterminate';
  defaultChecked?: boolean | undefined | 'indeterminate';
  radius?: Radius;
  children?: any;
  onChange?: (event: any) => void;
  onCheckedChange?: (checked: CheckboxPrimitive.CheckedState) => void;
  size?: number;
  className?: string;
  disabled?: boolean;
  name?: string;
  readOnly?: boolean;
}

export const Checkbox = forwardRef((props: CheckboxProps, ref: ForwardedRef<any>) => {
  const {
    children=<IconSetCache.Carbon.Checkmark width={"100%"} />,
    checked: externalChecked,
    defaultChecked=false, // 'indeterminate',
    onChange: onChangeCallback,
    onCheckedChange:onCheckedChangeCallback,
    disabled=false,
    radius='base',
    size=16,
    className='',
    name,
    readOnly=false,
    ...rest
   } = props;
   const [internalChecked, setInternalChecked] = useState<boolean | undefined | 'indeterminate'>(externalChecked);

   useEffect(() => {
    if (externalChecked !== undefined) {
      setInternalChecked(externalChecked);
    }
  }, [externalChecked]);

   const onCheckedChange = useCallback(() => {
    const newChecked = internalChecked === undefined ? true : !internalChecked;
    const event = {
      target: {
        value: newChecked,
        name,
        type: 'button',
      },
    };
    setInternalChecked(newChecked);
    onCheckedChangeCallback && onCheckedChangeCallback?.(newChecked);
    onChangeCallback && onChangeCallback?.(event);
  },[internalChecked, name, onChangeCallback, onCheckedChangeCallback]);

  //  const onClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.stopPropagation();
  //   onCheckedChange();
  // }, [onCheckedChange]);

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      disabled={disabled}
      defaultChecked={defaultChecked}
      checked={internalChecked}
      className={cn(
        `flex w-[${size}px] h-[${size}px] items-center justify-center rounded border border-primary`,
        "bg-secondary radix-state-checked:bg-accent hover:ring-accent hover:ring-opacity-50 hover:ring-[0.5px] hover:outline-none",
        "focus:outline-none focus-visible:ring focus-visible:ring-accent focus-visible:ring-opacity-75",
        DisabledClasses,
        RadiusClasses(radius),
        readOnly && 'cursor-default pointer-events-none',
      )}
      {...rest}
      onChange={noop}
      onCheckedChange={onCheckedChange}
    >
      <CheckboxPrimitive.Indicator className={cn(`flex h-full justify-center items-center animate-slide-up-fade`, RadiusClasses(radius))}>
        {internalChecked === undefined || internalChecked === 'indeterminate' && <IconSetCache.Custom.Indeterminate className={cn(`w-full h-full text-[rgb(var(--border-primary))]`)} />}
        {internalChecked === true && children}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = "Checkbox";
