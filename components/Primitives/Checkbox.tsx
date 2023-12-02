'use client'

import React, { ForwardedRef, forwardRef, useEffect, useState } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { DisabledClasses, Radius, RadiusClasses, cn } from "@/utils";
import { IconSetCache } from "..";

export interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {
  checked?: boolean | undefined | 'indeterminate';
  defaultChecked?: boolean | undefined | 'indeterminate';
  radius?: Radius;
  children?: any;
  onChange?: (event: React.ChangeEvent<HTMLButtonElement>) => void;
  onCheckedChange?: (checked: CheckboxPrimitive.CheckedState) => void;
  size?: number;
}

export const Checkbox = forwardRef((props: CheckboxProps, ref: ForwardedRef<any>) => {
  const {
    children=<IconSetCache.Carbon.Checkmark width={"100%"} />,
    checked: externalChecked,
    defaultChecked='indeterminate',
    onChange: onChangeCallback,
    onCheckedChange:onCheckedChangeCallback,
    disabled=false,
    radius='base',
    size=16,
    className='',
    ...rest
   } = props;
   const [internalChecked, setInternalChecked] = useState<boolean | undefined | 'indeterminate'>(defaultChecked);
   const isChecked = externalChecked !== undefined ? externalChecked : internalChecked;

   useEffect(() => {
    if (externalChecked !== undefined) {
      setInternalChecked(externalChecked);
    }
  }, [externalChecked]);

   // radix doesn't expose the actual event so we have to create a synthetic one for it to work with react-hook-form
   const onChange = (newChecked: boolean) => {
    // synthetic event
    const event = {
      target: {
        value: newChecked,
        name: rest.name,
        type: 'button',
      },
    };
    onChangeCallback?.(event as any);
   };

   const onCheckedChange = () => {
    const newChecked = isChecked === undefined ? true : !isChecked;
    setInternalChecked(newChecked);
    onCheckedChangeCallback && onCheckedChangeCallback?.(newChecked);
    onChange?.(newChecked);
   };

   const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onCheckedChange();
  };

  return (
    <CheckboxPrimitive.Root
      ref={ref} disabled={disabled}
      checked={isChecked}
      onClick={onClick}
      onCheckedChange={onCheckedChange}
      className={cn(
        `flex w-[${size}px] h-[${size}px] items-center justify-center rounded border border-primary`,
        "bg-secondary radix-state-checked:bg-accent hover:ring-accent hover:ring-opacity-50 hover:ring-[0.5px] hover:outline-none",
        "focus:outline-none focus-visible:ring focus-visible:ring-accent focus-visible:ring-opacity-75",
        DisabledClasses,
        RadiusClasses(radius),
      )}
      {...rest}
    >
      <CheckboxPrimitive.Indicator className={cn(`flex h-full justify-center items-center animate-slide-up-fade`, RadiusClasses(radius))}>
        {isChecked === undefined || isChecked === 'indeterminate' && <IconSetCache.Custom.Indeterminate className={cn(`w-full h-full text-[rgb(var(--border-primary))]`)} />}
        {isChecked === true && children}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = "Checkbox";
