'use client'

import React, { ForwardedRef, MutableRefObject, PureComponent, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CaretSortIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { Radius, RadiusClasses, cn, noop } from '@/utils';
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";

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
  selectedIndex?: number;
  virtualize?: boolean;
};
const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>((props, forwardedRef: any) => {
  const {
    className='',
    position='popper',
    items=[],
    selectedIndex=0,
    radius='medium',
    virtualize=true,
    ...rest
  } = props;
  const [scrollParent, setScrollParent] = React.useState<HTMLElement>();
  const virtuoso = React.useRef<VirtuosoHandle>(null);

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        onKeyDown={(e: any) => {
          const index = items.findIndex((v) => (typeof v === 'string' ? v : v.value).indexOf(e.key) === 0);
          virtuoso.current?.scrollToIndex(index);
        }}
        position={position}
        className={cn(
          "relative max-h-96 min-w-[6rem] flex w-full overflow-hidden z-50 border border-secondary bg-secondary text-secondary shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 will-change-contents",
          position === "popper" && "max-h-[var(--radix-select-content-available-height)] max-w-[var(--radix-select-content-available-width)] data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          RadiusClasses(radius),
          className
        )}
        {...rest}
      >
        
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          onKeyDown={(e) => {}}
          ref={(r) => {
            // Set state needed to rerender Virtuoso
            if (r) setScrollParent(r);
          }}
          className={cn(`p-1`, position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]")}
        >
          {virtualize 
            ? (
          <Virtuoso
            ref={virtuoso}
            data={items}
            initialTopMostItemIndex={{
              index: selectedIndex,
              align: "center",
              behavior: "auto"
            }}
            totalCount={items.length}
            itemContent={(index, item) => {
              return <SelectItem key={`${item.value}-${index}`} {...item} />
            }}
            customScrollParent={scrollParent}
          />
            )
            : (items.map((item, index) => <SelectItem key={`${item.value}-${index}`} {...item} />))}
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
  children: React.ReactNode;
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
        "overflow-hidden relative flex w-full h-auto justify-center items-center text-center flex-grow cursor-default select-none py-1 px-1 text-xs outline-none focus:bg-accent focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=checked]:text-primary",
        RadiusClasses(radius),
        className
      )}
      {...rest}
    >
      <SelectPrimitive.ItemText>
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator asChild className="opacity-80 absolute right-1">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
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
export const SelectTrigger = forwardRef<any, SelectTriggerProps>((props, ref) => {
  const { 
    className='',
    placeholder='',
    radius='medium',
    value,
    ...rest 
  } = props;
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      placeholder={placeholder}
      className={cn(
        `relative text-secondary flex w-full h-auto justify-center items-center whitespace-nowrap border border-secondary bg-secondary px-2 py-0.5 text-sm shadow-sm`,
        `placeholder:text-muted focus:outline-none focus:ring-inset focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1`,
        `data-[state=open]:outline-none data-[state=open]:ring-1 data-[state=open]:ring-accent data-[state=open]:ring-inset data-[state=open]:text-primary`,
        RadiusClasses(radius),
        className
      )}
      {...rest}
    >
      <div className="flex w-full h-full items-center justify-center justify-self-center text-center"><SelectPrimitive.Value>{value}</SelectPrimitive.Value></div>
      <SelectPrimitive.Icon asChild className={cn(`opacity-80 text-current`)}>
        <CaretSortIcon />
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
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLButtonElement>) => void;
  virtualize?: boolean;
  className?: string;
};
export const Select = forwardRef((props: SelectProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { 
    items:initialItems=[],
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
    virtualize=initialItems.length > 100,
    ...rest
  } = props;
  const items = useMemo(() => {
    return initialItems.map((item) => {
      if (typeof item === 'string') {
        return { value: item, children: item };
      }
      return item;
    });
  }, [initialItems]);

  // radix doesn't expose the actual event so we have to create a synthetic one for it to work with react-hook-form
  const onValueChange = useCallback((newValue: string) => {
    const event = {
      target: {
        value: newValue,
        name,
        type: 'button',
      },
    };
    onValueChangeCallback?.(newValue);
    onChangeCallback(event);
  }, [name, onChangeCallback, onValueChangeCallback]);

  return (
    <SelectPrimitive.Root defaultValue={defaultValue} value={value} onValueChange={onValueChange} defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange} name={name} disabled={disabled} required={required} {...rest} >
      <SelectTrigger value={value} ref={ref} className={cn(className)} placeholder={placeholder} />
      <SelectContent selectedIndex={items.findIndex((v) => v.value === value)} items={items} virtualize={virtualize} />
    </SelectPrimitive.Root>
  );
});
Select.displayName = SelectPrimitive.Root.displayName
