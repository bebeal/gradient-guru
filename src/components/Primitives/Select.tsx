;

import { Radius, RadiusClasses } from '@/utils/styles';
import { cn } from '@/utils/utils';
import { CaretSortIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import React, { ForwardedRef, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

// ***********************
//       Separator
// ***********************
export const SelectSeparator = forwardRef<HTMLDivElement, SelectPrimitive.SelectSeparatorProps>((props, ref) => {
  const { className = '', ...rest } = props;
  return <SelectPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...rest} />;
});
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// ***********************
//       Label
// ***********************
export const SelectLabel = forwardRef<HTMLDivElement, SelectPrimitive.SelectLabelProps>((props, ref) => {
  const { className = '', ...rest } = props;
  return <SelectPrimitive.Label ref={ref} className={cn('px-1 py-0.5 text-sm font-semibold', className)} {...rest} />;
});
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// ***********************
//       ScrollUp
// ***********************
export const SelectScrollUpButton = forwardRef<HTMLDivElement, SelectPrimitive.SelectScrollUpButtonProps>((props, ref) => {
  const { className = '', ...rest } = props;
  return (
    <SelectPrimitive.ScrollUpButton ref={ref} className={cn('flex cursor-default items-center justify-center py-0.5', className)} {...rest}>
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  );
});
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

// ***********************
//       ScrollDown
// ***********************
export const SelectScrollDownButton = forwardRef<HTMLDivElement, SelectPrimitive.SelectScrollUpButtonProps>((props, ref) => {
  const { className = '', ...rest } = props;
  return (
    <SelectPrimitive.ScrollUpButton ref={ref} className={cn('flex cursor-default items-center justify-center py-0.5', className)} {...rest}>
      <ChevronDownIcon />
    </SelectPrimitive.ScrollUpButton>
  );
});
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

// ***********************
//       Content
// ***********************
export interface SelectContentProps extends SelectPrimitive.SelectContentProps {
  items?: SelectItemProps[];
  radius?: Radius;
  selectedIndex?: number;
  virtualize?: boolean;
  readOnly?: boolean;
}
const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>((props, _ref: any) => {
  const { className = '', position = 'popper', items = [], selectedIndex = 0, radius = 'medium', virtualize = true, readOnly = false, ...rest } = props;
  const [scrollParent, setScrollParent] = useState<HTMLElement>();
  const virtuoso = useRef<VirtuosoHandle>(null);

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        onKeyDown={(e: any) => {
          const index = items.findIndex((v) => (typeof v === 'string' ? v : v.value).indexOf(e.key) === 0);
          virtuoso.current?.scrollToIndex(index);
        }}
        position={position}
        className={cn(
          'relative min-h-[50px] min-w-[6rem] max-h-56 w-full flex overflow-hidden z-50 border border-secondary bg-secondary text-secondary shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 will-change-contents',
          position === 'popper' &&
            'max-h-[var(--radix-select-content-available-height)] max-w-[var(--radix-select-content-available-width)] data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          RadiusClasses(radius),
          readOnly && 'cursor-default pointer-events-none',
          className,
        )}
        {...rest}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          // onKeyDown={(e) => {}}
          ref={(r) => {
            // Set state needed to rerender Virtuoso
            if (r) setScrollParent(r);
          }}
          className={cn(`p-1`, position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]')}
        >
          {virtualize ? (
            <Virtuoso
              ref={virtuoso}
              data={items}
              initialTopMostItemIndex={{
                index: selectedIndex,
                align: 'center',
                behavior: 'auto',
              }}
              totalCount={items.length}
              itemContent={(index, item) => {
                return <SelectItem key={`${item.value}-${index}`} {...item} />;
              }}
              customScrollParent={scrollParent}
            />
          ) : (
            items.map((item, index) => <SelectItem key={`select-item-${item.value}-${index}`} {...item} />)
          )}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

// ***********************
//         Item
// ***********************
export interface SelectItemProps extends SelectPrimitive.SelectItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  radius?: Radius;
}
const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>((props, ref) => {
  const { value, children, className = '', radius = 'small', ...rest } = props;

  return (
    <SelectPrimitive.Item
      ref={ref}
      value={value}
      className={cn(
        `text-secondary`,
        'overflow-hidden relative h-auto justify-center items-center text-center flex-grow cursor-pointer select-none py-1 px-1 text-xs outline-none focus:bg-accent/30 focus:text-black data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=checked]:text-primary',
        `whitespace-normal break-all flex overflow-hidden w-full hyphens-auto`,
        RadiusClasses(radius),
        className,
      )}
      {...rest}
    >
      <SelectPrimitive.ItemText className="justify-self-center">{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator asChild className="opacity-80 justify-self-end">
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName;

// ***********************
//        Trigger
// ***********************
export interface SelectTriggerProps extends SelectPrimitive.SelectTriggerProps {
  radius?: Radius;
  placeholder?: string;
  items?: SelectItemProps[];
}
export const SelectTrigger = forwardRef<any, SelectTriggerProps>((props, ref) => {
  const { id, className = '', placeholder = '', radius = 'medium', value, items, ...rest } = props;
  const children = useMemo(() => {
    return items?.find((v) => v.value === value)?.children || value;
  }, [items, value]);
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      // placeholder={placeholder}
      defaultValue={placeholder}
      className={cn(
        `relative text-secondary flex w-full h-auto overflow-hidden justify-center items-center whitespace-normal break-all border border-secondary bg-secondary px-2 py-0.5 text-sm shadow-sm`,
        `hover:ring-accent/50 hover:ring-[0.5px] hover:outline-none`,
        `placeholder:text-muted focus:outline-none focus:ring-inset focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1`,
        `data-[state=open]:outline-none data-[state=open]:ring-1 data-[state=open]:ring-accent data-[state=open]:ring-inset data-[state=open]:text-primary`,
        RadiusClasses(radius),
        className,
      )}
      {...rest}
    >
      <div className={cn('flex w-full h-auto justify-center')}>
        <SelectPrimitive.Value>{children}</SelectPrimitive.Value>
      </div>
      <SelectPrimitive.Icon asChild className={cn(`opacity-80 text-current`)}>
        <CaretSortIcon />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const mapItems = (initialItems: SelectItemProps[] | string[]) => {
  const newItems = initialItems.map((item) => {
    if (typeof item === 'string' || typeof item === 'number') {
      return { value: item, children: item };
    }
    return item;
  });
  return newItems;
};

// ***********************
//         Select
// ***********************
// export interface SelectProps extends SelectPrimitive.SelectProps {
export interface SelectProps {
  items?: SelectItemProps[] | string[];
  placeholder?: string;
  onChange?: any;
  virtualize?: boolean;
  className?: string;
  defaultValue?: any;
  value?: any;
  onValueChange?: (value: any) => void;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
}
export const Select = forwardRef((props: SelectProps, ref: ForwardedRef<any>) => {
  const {
    items: initialItems = [],
    className = '',
    placeholder = '',
    onChange: onChangeCallback,
    defaultValue,
    value: initialValue,
    onValueChange: onValueChangeCallback,
    defaultOpen = false,
    open,
    onOpenChange,
    name,
    disabled = false,
    required = false,
    virtualize = initialItems.length > 100,
    readOnly = false,
    ...rest
  } = props;
  const [value, setValue] = useState(initialValue || defaultValue);
  const [items, setItems] = useState(mapItems(initialItems));

  useEffect(() => {
    setValue(initialValue || defaultValue);
  }, [defaultValue, initialValue]);

  useEffect(() => {
    setItems(mapItems(initialItems));
  }, [initialItems]);

  // radix doesn't expose the actual event so we have to create a synthetic one for it to work with react-hook-form
  const onValueChange = useCallback(
    (newValue: string) => {
      if (!items.some((v) => v?.value === newValue)) {
        return;
      }
      const event = {
        target: {
          value: newValue,
          name,
          type: 'button',
        },
      };
      onValueChangeCallback?.(newValue);
      onChangeCallback?.(event);
    },
    [items, name, onChangeCallback, onValueChangeCallback],
  );

  return (
    <SelectPrimitive.Root defaultValue={defaultValue} value={value} onValueChange={onValueChange} defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange} name={name} disabled={disabled} required={required} {...rest}>
      <SelectTrigger value={value} items={items} ref={ref} className={cn(className)} placeholder={placeholder} />
      <SelectContent selectedIndex={items.findIndex((v) => v.value === value)} items={items} virtualize={virtualize} readOnly={readOnly} />
    </SelectPrimitive.Root>
  );
});
Select.displayName = SelectPrimitive.Root.displayName;
