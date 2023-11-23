'use client'

import React, { ForwardedRef, forwardRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CaretSortIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { Radius, RadiusClasses, cn, noop } from '@/utils';

// ***********************
//       Separator
// ***********************
export const SelectSeparator = forwardRef<HTMLDivElement, SelectPrimitive.SelectSeparatorProps>((props, ref) => {
  const {
    className='',
    ...rest
  } = props;
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
      {...rest}
    />
  )
})
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

// ***********************
//       Label
// ***********************
export const SelectLabel = forwardRef<HTMLDivElement, SelectPrimitive.SelectLabelProps>((props, ref) => {
  const {
    className='',
    ...rest
  } = props;
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn("px-1 py-0.5 text-sm font-semibold", className)}
      {...rest}
    />
  )
})
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

// ***********************
//       ScrollUp
// ***********************
export const SelectScrollUpButton = forwardRef<HTMLDivElement, SelectPrimitive.SelectScrollUpButtonProps>((props, ref) => {
  const {
    className='',
    ...rest
  } = props;
  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn(
        "flex cursor-default items-center justify-center py-0.5",
        className
      )}
      {...rest}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  );
})
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

// ***********************
//       ScrollDown
// ***********************
export const SelectScrollDownButton = forwardRef<HTMLDivElement, SelectPrimitive.SelectScrollUpButtonProps>((props, ref) => {
  const {
    className='',
    ...rest
  } = props;
  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn(
        "flex cursor-default items-center justify-center py-0.5",
        className
      )}
      {...rest}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollUpButton>
  );
})
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

// ***********************
//       Content
// ***********************
export interface SelectContentProps extends SelectPrimitive.SelectContentProps {
  items?: SelectItemProps[];
  radius?: Radius;
};
const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>((props, ref) => {
  const {
    className='',
    position='popper',
    items=[],
    radius='medium',
    ...rest
  } = props;

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}

        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden border border-secondary bg-secondary text-secondary shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          RadiusClasses(radius),
          className
        )}
        {...rest}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {items.map((item, index) => (
            <SelectItem key={`${item.value}-${index}`}  className={className} {...item} />
          ))}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName


// ***********************
//         Item
// ***********************
export interface SelectItemProps extends SelectPrimitive.SelectItemProps {
  value: string;
  children?: React.ReactNode;
  className?: string;
  radius?: Radius;
};
const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>((props, ref) => {
  const {
    value,
    children,
    className='',
    radius='small',
    ...rest
  } = props;

  return (
    <SelectPrimitive.Item
      ref={ref}
      value={value}
      className={cn(
        "relative flex w-full h-full justify-center text-center items-center flex-grow cursor-default select-none py-0.5 pl-1 pr-7 text-sm outline-none focus:bg-accent focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        RadiusClasses(radius),
        className
      )}
      {...rest}
    >
      <SelectPrimitive.ItemText>
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.Icon asChild>
        <CheckIcon className="absolute right-2 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName

// ***********************
//        Trigger
// ***********************
export interface SelectTriggerProps extends SelectPrimitive.SelectTriggerProps {
  radius?: Radius;
}
export const SelectTrigger = React.forwardRef<any, SelectTriggerProps>((props, ref) => {
  const { 
    className='',
    placeholder='',
    radius='medium',
    ...rest 
  } = props;
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      placeholder={placeholder}
      className={cn(
        `relative flex h-6 w-full justify-center items-center whitespace-nowrap border border-secondary bg-secondary px-2 py-1 text-sm shadow-sm ring-offset-background`,
        `placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1`,
        RadiusClasses(radius),
        className
      )}
      {...rest}
    >
      <div className="flex w-full h-full items-center justify-center justify-self-center text-center"><SelectPrimitive.Value /></div>
      <SelectPrimitive.Icon asChild>
        <CaretSortIcon className={cn(`opacity-50`)} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

// ***********************
//         Select
// ***********************
export interface SelectProps extends SelectPrimitive.SelectProps {
  items?: SelectItemProps[] | string[];
  className?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLButtonElement>) => void;
};
export const Select = forwardRef((props: SelectProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { 
    items: initialItems=[],
    className='',
    placeholder='',
    onChange: onChangeCallback=noop,
    defaultValue,
    value,
    onValueChange: onValueChangeCallback=noop,
    defaultOpen=false,
    open,
    onOpenChange,
    name,
    disabled=false,
    required=false,
    ...rest
  } = props;
  const items = initialItems.map((item: any) => {
    if (typeof item === 'string') {
      return { value: item, children: item };
    }
    return item;
  });

  // radix doesn't expose the actual event so we have to create a synthetic one for it to work with react-hook-form
  const onChange = (value: string) => {
    // synthetic event
    const event = {
      target: {
        value,
        name,
        type: 'button',
      },
    };
    onChangeCallback?.(event);
  };

  const onValueChange = (value: string) => {
    onValueChangeCallback?.(value);
    onChange?.(value);
  };

  return (
    <SelectPrimitive.Root defaultValue={defaultValue} value={value} onValueChange={onValueChange} defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange} name={name} disabled={disabled} required={required} {...rest} >
      <SelectTrigger ref={ref} className={cn(className)} placeholder={placeholder} />
      <SelectContent items={items} />
    </SelectPrimitive.Root>
  );
});
Select.displayName = SelectPrimitive.Root.displayName
