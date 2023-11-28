'use client'

import React, { ForwardedRef, forwardRef } from "react";
import { PropsWithoutRefOrColor, Checkbox as ThemedCheckbox} from "@radix-ui/themes";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Radius, RadiusClasses, cn, noop } from "@/utils";

export interface CheckboxProps extends Omit<PropsWithoutRefOrColor<typeof ThemedCheckbox>, 'children'> {
  radius?: Radius;
  onChange?: (event: React.ChangeEvent<HTMLButtonElement>) => void;
  onCheckedChange?: (checked: CheckboxPrimitive.CheckedState) => void;
}

export const Checkbox = forwardRef((props: CheckboxProps, ref: ForwardedRef<any>) => {
  const {
    radius='small',
    onChange: onChangeCallback=noop,
    onCheckedChange:onCheckedChangeCallback=noop,
    disabled=false,
    size='1',
    variant='surface',
    className='',
    ...rest
   } = props;
   // radix doesn't expose the actual event so we have to create a synthetic one for it to work with react-hook-form
   const onChange = (checked: CheckboxPrimitive.CheckedState) => {
    // synthetic event
    const event = {
      target: {
        value: checked,
        name: rest.name,
        type: 'button',
      },
    };
    onChangeCallback?.(event);
   };

   const onCheckedChange = (checked: CheckboxPrimitive.CheckedState) => {
    onCheckedChangeCallback?.(checked);
    onChange?.(checked);
   };

  return (
    <ThemedCheckbox ref={ref} onCheckedChange={onCheckedChange} disabled={disabled} className={cn(RadiusClasses(radius), className)} variant={variant} size={size} {...rest} />
  );
});
Checkbox.displayName = "Checkbox";
