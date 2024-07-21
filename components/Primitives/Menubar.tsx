'use client';

import React, { forwardRef, useCallback } from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { cn, Radius, RadiusClasses } from '@/utils';
import { Icon } from './Icons';
import { Kbd } from './Kbd';

// --------------------------------------------------
// MenubarShortcut
// --------------------------------------------------
export interface MenubarShortcutProps {
  shortcut: string;
  className?: string;
}
export const MenubarShortcut = (props: MenubarShortcutProps) => {
  const { shortcut, className, ...rest } = props;

  return (
    <div className={cn('text-xs text-secondary overflow-hidden h-auto w-auto', className)} {...rest}>
      <Kbd>{shortcut}</Kbd>
    </div>
  );
};
MenubarShortcut.displayname = 'MenubarShortcut';

// --------------------------------------------------
// Menubar
// --------------------------------------------------
export interface MenubarProps extends MenubarPrimitive.MenubarProps {
  items?: MenubarMenuProps[];
  radius?: Radius;
  className?: string;
}
export const Menubar = (props: MenubarProps) => {
  const { items = [], radius = 'medium', className, ...menubarProps } = props;
  return (
    <MenubarPrimitive.Root className={cn('relative flex w-auto h-auto overflow-hidden bg-primary', RadiusClasses(radius), className)} {...menubarProps}>
      {items.map((menuItem, idx) => {
        const cornerClassname = idx === 0 ? `rounded-l-md` : idx === items.length - 1 ? `rounded-r-md` : `rounded-none`;
        return <MenubarMenu key={`menu-item-${idx}`} className={cornerClassname} {...menuItem} />;
      })}
    </MenubarPrimitive.Root>
  );
};
Menubar.displayName = MenubarPrimitive.Menubar.displayName;

// --------------------------------------------------
// MenubarMenu
// --------------------------------------------------
export interface MenubarMenuProps extends MenubarPrimitive.MenubarMenuProps {
  icon?: React.ReactNode;
  children?: string;
  shortcut?: string;
  items?: any[];
  disabled?: boolean;
  radius?: Radius;
  className?: string;
}
export const MenubarMenu = (props: MenubarMenuProps) => {
  const { icon, children, shortcut, items = [], disabled = false, className = '', radius = 'medium', ...rest } = props;
  const defaultClassname = 'bg-primary text-primary/80 flex items-center gap-1 text-sm font-medium outline-none select-none w-full h-full';
  const highlightedClassname = 'hover:bg-accent/50 hover:text-primary radix-highlighted:bg-accent/50 radix-highlighted:text-primary';
  const openClassname = 'radix-state-open:bg-accent/30 radix-state-open:text-primary radix-state-open:hover:bg-accent/50 radix-state-open:radix-highlighted:bg-accent/50';
  const disabledClassname = 'radix-disabled:opacity-50 radix-disabled:cursor-not-allowed';
  const triggerClassname = cn(defaultClassname, highlightedClassname, openClassname, disabledClassname, `cursor-pointer px-2 py-1 border border-primary`, className);
  const contentClassname = cn(defaultClassname, RadiusClasses('medium'), `min-w-[12rem] p-1 flex-col border border-primary h-auto w-auto overflow-hidden shadow-lg animate-enter`);
  const itemClassname = cn(defaultClassname, highlightedClassname, openClassname, disabledClassname, `px-2 py-1`, RadiusClasses('base'));
  const subTriggerClassname = cn(defaultClassname, highlightedClassname, openClassname, disabledClassname, `cursor-pointer px-2 py-1`, RadiusClasses('base'));
  const subContentClassname = cn(defaultClassname, RadiusClasses('medium'), `min-w-[8rem] flex-col border border-primary h-auto w-auto overflow-hidden shadow-lg animate-enter`);
  const subItemClassname = cn(defaultClassname, highlightedClassname, openClassname, disabledClassname, `px-2 py-1`, RadiusClasses('base'));

  const MenubarMenuItem = useCallback(
    (item: any, idx: number) => {
      item = { ...item, type: item.type || 'item' };
      switch (item.type) {
        case 'sub':
          return (
            <MenubarPrimitive.Sub {...rest}>
              <MenubarSubTrigger className={subTriggerClassname}>
                {icon}
                {children}
                {shortcut && <MenubarShortcut shortcut={shortcut} />}
              </MenubarSubTrigger>
              <MenubarSubContent className={cn(subContentClassname)}>
                {item?.items && item?.items.length > 0 && item?.items.map((subItem: any, idx: number) => <MenubarMenuItem key={`menu-subItem-${idx}`} className={cn(subItemClassname)} {...subItem} />)}
              </MenubarSubContent>
            </MenubarPrimitive.Sub>
          );
        case 'group':
          return <MenubarGroup key={`group-${idx}`} {...item} />;
        case 'radio':
          return <MenubarRadioGroup key={`radio-${idx}`} {...item} />;
        case 'checkbox':
          return <MenubarCheckboxItem key={`checkbox-${idx}`} {...item} />;
        case 'item':
          return <MenubarItem key={`item-${idx}`} {...item} />;
        case 'label':
          return <MenubarLabel key={`label-${idx}`} {...item} />;
        case 'separator':
          return <MenubarSeparator key={`separator-${idx}`} {...item} />;
        default:
          return null;
      }
    },
    [icon, children, rest, shortcut, subContentClassname, subItemClassname, subTriggerClassname],
  );

  return (
    <MenubarPrimitive.Menu {...rest}>
      <MenubarTrigger className={triggerClassname}>
        {icon}
        {children}
        {shortcut && <MenubarShortcut shortcut={shortcut} />}
      </MenubarTrigger>
      <MenubarContent className={contentClassname}>
        {items &&
          items.length > 0 &&
          items.map((item: any, idx: number) => {
            return <MenubarMenuItem key={`menubar-item-${idx}`} className={cn(itemClassname)} {...item} />;
          })}
      </MenubarContent>
    </MenubarPrimitive.Menu>
  );
};
MenubarMenu.displayName = MenubarPrimitive.Menu.displayName;

// --------------------------------------------------
// MenubarTrigger
// --------------------------------------------------
export interface MenuTriggerProps extends MenubarPrimitive.MenubarTriggerProps {}
export const MenubarTrigger = forwardRef((props: MenuTriggerProps, ref?: any) => {
  const { children, className, ...rest } = props;
  return (
    <MenubarPrimitive.Trigger ref={ref} className={className}>
      {children}
    </MenubarPrimitive.Trigger>
  );
});
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

// --------------------------------------------------
// MenubarContent
// --------------------------------------------------
export interface MenubarContentProps extends MenubarPrimitive.MenubarContentProps {}
export const MenubarContent = forwardRef((props: MenubarContentProps, ref?: any) => {
  const { className, ...rest } = props;
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content ref={ref} className={className} sideOffset={5} align={'start'} alignOffset={0} {...props} />
    </MenubarPrimitive.Portal>
  );
});
MenubarTrigger.displayName = MenubarPrimitive.Content.displayName;

// --------------------------------------------------
// MenubarSubTrigger
// --------------------------------------------------
export interface MenubarSubTriggerProps extends MenubarPrimitive.MenubarSubTriggerProps {}
export const MenubarSubTrigger = forwardRef((props: MenubarSubTriggerProps, ref?: any) => {
  const { children, className, ...rest } = props;
  return (
    <MenubarPrimitive.SubTrigger ref={ref} className={cn(className)} {...props}>
      {children}
      <Icon set="Carbon" icon="ChevronRight" className="h-3 w-3 self-center justify-self-end" />
    </MenubarPrimitive.SubTrigger>
  );
});
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

// --------------------------------------------------
// MenubarSubContent
// --------------------------------------------------
export interface MenubarSubContentProps extends MenubarPrimitive.MenubarContentProps {}
export const MenubarSubContent = forwardRef((props: MenubarSubContentProps, ref?: any) => {
  const { children, className, ...rest } = props;
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.SubContent ref={ref} className={className} sideOffset={4} align={'start'} alignOffset={0} {...props}>
        {children}
      </MenubarPrimitive.SubContent>
    </MenubarPrimitive.Portal>
  );
});
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

// --------------------------------------------------
// MenubarGroup
// --------------------------------------------------
export interface MenubarGroupProps extends MenubarPrimitive.MenubarGroupProps {
  items?: any[];
  className?: string;
}
export const MenubarGroup = (props: MenubarGroupProps) => {
  const { items = [], className, ...rest } = props;
  return (
    <MenubarPrimitive.Group className={cn('flex flex-col gap-1', className)} {...rest}>
      {items.map((item: any, idx: number) => (
        <MenubarItem key={`group-item-${idx}`} {...item} />
      ))}
    </MenubarPrimitive.Group>
  );
};
MenubarGroup.displayName = MenubarPrimitive.Group.displayName;
MenubarGroup.displayName = 'MenubarGroup';

// --------------------------------------------------
// MenubarRadioGroup
// --------------------------------------------------
export interface MenubarRadioGroupProps extends MenubarPrimitive.MenubarRadioGroupProps {
  items?: any[];
  value?: string;
  onValueChange?: (value: string) => void;
  radioRadius?: Radius;
  className?: string;
  disabledClassname?: string;
}
export const MenubarRadioGroup = (props: MenubarRadioGroupProps) => {
  const { items = [], value: initialValue = items?.[0]?.children, onValueChange: onValueChangeCallback, radioRadius = 'full', className, disabledClassname, ...rest } = props;
  const [value, setValue] = React.useState(initialValue);

  const onValueChange = (newValue: string) => {
    setValue(newValue);
    onValueChangeCallback?.(newValue);
  };

  return (
    <MenubarPrimitive.RadioGroup value={value} onValueChange={onValueChange} className={cn('flex-col w-full')}>
      {items.map((item: any, idx: number) => {
        item.value = item.value || item.children || idx;
        return (
          <MenubarPrimitive.RadioItem
            key={idx}
            value={item.value}
            onSelect={(e) => {
              // to keep manu open after selecting a radio item
              e.preventDefault();
            }}
            className={cn('group relative flex items-center gap-1 w-full h-[25px] px-[10px] cursor-pointer', className)}
            {...item}
          >
            <span className="relative inset-0 flex items-center justify-center leading-0 w-3 h-3">
              <Icon set="Carbon" icon="RadioButton" className={cn('absolute inset-0 w-3 h-3 bg-secondary text-[rgb(var(--border-primary))]', radioRadius && RadiusClasses(radioRadius))} />
              <MenubarPrimitive.ItemIndicator>
                <Icon set="Carbon" icon="DotMark" className={cn('absolute inset-0 w-3 h-3 text-accent', radioRadius && RadiusClasses(radioRadius))} />
              </MenubarPrimitive.ItemIndicator>
            </span>
            {item.children}
          </MenubarPrimitive.RadioItem>
        );
      })}
    </MenubarPrimitive.RadioGroup>
  );
};
MenubarRadioGroup.displayName = MenubarPrimitive.RadioGroup.displayName;

// --------------------------------------------------
// MenubarCheckboxItem
// --------------------------------------------------
export interface MenubarCheckboxItemProps {
  children?: string | { children: string; activechildren: string };
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  checkboxRadius?: Radius;
  className?: string;
}
export const MenubarCheckboxItem = (props: MenubarCheckboxItemProps) => {
  const { children, checked: initialChecked = false, onCheckedChange: onCheckedChangeCallback, checkboxRadius = 'small', className, ...rest } = props;
  const [checked, setChecked] = React.useState(initialChecked);

  const getLongerchildrenLength = () => {
    if (typeof children === 'string') return children.length;
    if (children) {
      return children.children.length > (children.activechildren?.length || 0) ? children.children.length : children.activechildren?.length;
    }
    return 0;
  };

  const renderchildren = () => {
    if (typeof children === 'string') return children;
    if (children) {
      return checked && children.activechildren ? children.activechildren : children.children;
    }
    return '';
  };

  const onCheckedChange = (newChecked: boolean) => {
    setChecked(newChecked);
    onCheckedChangeCallback?.(newChecked);
  };

  return (
    <MenubarPrimitive.CheckboxItem
      checked={checked}
      onCheckedChange={onCheckedChange}
      onSelect={(e) => {
        // to keep manu open after selecting a checkbox item
        e.preventDefault();
      }}
      className={cn('group relative flex items-center gap-1 w-full h-[25px] px-[10px] cursor-pointer', className)}
    >
      <span className="relative inset-0 flex items-center justify-center leading-0 w-3 h-3">
        <div className={cn('absolute inset-0 w-3 h-3 border border-primary', `group-radix-state-checked:bg-accent/50 group-radix-state-unchecked:bg-secondary`, checkboxRadius && RadiusClasses(checkboxRadius))} />
        <MenubarPrimitive.ItemIndicator>
          <Icon set="Carbon" icon="Checkmark" className={cn('absolute inset-0 w-2.5 h-2.5 left-[0.0625rem] top-[0.0625rem] text-primary')} />
        </MenubarPrimitive.ItemIndicator>
      </span>
      <span className={cn(`${getLongerchildrenLength()}ch`)}>{renderchildren()}</span>
    </MenubarPrimitive.CheckboxItem>
  );
};
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

// --------------------------------------------------
// MenubarItem
// --------------------------------------------------
export interface MenubarItemProps extends MenubarPrimitive.MenubarItemProps {
  icon?: React.ReactNode;
  children?: string;
  shortcut?: string;
  className?: string;
}
export const MenubarItem = (props: MenubarItemProps) => {
  const { icon, children, shortcut, className, ...rest } = props;
  return (
    <MenubarPrimitive.Item {...props} className={cn('group relative flex items-center justify-between gap-1 h-[25px] w-full px-[10px] cursor-pointer', className)}>
      <>
        {icon}
        {children}
      </>
      {shortcut && <MenubarShortcut shortcut={shortcut} />}
    </MenubarPrimitive.Item>
  );
};
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

// --------------------------------------------------
// MenubarLabel
// --------------------------------------------------
export interface MenubarLabelProps extends MenubarPrimitive.MenubarLabelProps {
  children?: string;
}
export const MenubarLabel = forwardRef((props: MenubarLabelProps, ref?: any) => {
  const { children, ...rest } = props;
  return (
    <MenubarPrimitive.Label ref={ref} className={cn('relative flex items-center gap-1 h-[25px] w-full px-[10px] font-bold')}>
      {children}
    </MenubarPrimitive.Label>
  );
});
MenubarLabel.displayName = 'MenubarLabel';

// --------------------------------------------------
// MenubarSeparator
// --------------------------------------------------
export interface MenubarSeparatorProps extends MenubarPrimitive.MenubarSeparatorProps {}
export const MenubarSeparator = forwardRef((props: MenubarSeparatorProps, ref?: any) => {
  return <MenubarPrimitive.Separator ref={ref} className={cn(`h-[0.5px] bg-[rgb(var(--text-primary))] text-[rgb(var(--text-primary))] w-[calc(100%-10px)] py-[0.5px]`)} {...props} />;
});
MenubarSeparator.displayName = 'MenubarSeparator';
