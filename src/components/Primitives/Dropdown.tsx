import React, { forwardRef, useCallback } from 'react';
import { Radius, RadiusClasses } from '@/utils/styles';
import { cn } from '@/utils/utils';
import { Icon } from './Icons/Icon';
import { Kbd } from './Kbd';
import { Separator } from './Separator';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

// --------------------------------------------------
// DropdownMenu
// --------------------------------------------------
export interface DropdownMenuProps extends DropdownMenuPrimitive.DropdownMenuProps {
  icon?: React.ReactNode;
  children?: any;
  shortcut?: string;
  items?: any[];
  disabled?: boolean;
  radius?: Radius;
  className?: string;
}
export const DropdownMenu = (props: DropdownMenuProps) => {
  const { icon, children, shortcut, items = [], disabled = false, className = '', radius = 'medium', ...rest } = props;
  const defaultClassname = 'bg-primary text-primary/80 flex items-center gap-1 text-sm font-medium outline-none w-full h-full';
  const highlightedClassname = 'hover:bg-accent/50 hover:text-primary radix-highlighted:bg-accent/50 radix-highlighted:text-primary';
  const openClassname = 'radix-state-open:bg-accent/30 radix-state-open:text-primary radix-state-open:hover:bg-accent/50 radix-state-open:radix-highlighted:bg-accent/50';
  const disabledClassname = 'radix-disabled:opacity-50 radix-disabled:cursor-not-allowed';
  const triggerClassname = cn(defaultClassname, RadiusClasses('medium'), highlightedClassname, openClassname, disabledClassname, `cursor-pointer px-2 py-1 border border-primary`, className);
  const contentClassname = cn(defaultClassname, RadiusClasses('medium'), `min-w-[12rem] p-1 flex-col border border-primary h-auto w-auto shadow-lg animate-enter`);
  const itemClassname = cn(defaultClassname, highlightedClassname, openClassname, disabledClassname, `px-2 py-1`, RadiusClasses('base'));
  const subTriggerClassname = cn(defaultClassname, highlightedClassname, openClassname, disabledClassname, `cursor-pointer px-2 py-1`, RadiusClasses('base'));
  const subContentClassname = cn(defaultClassname, RadiusClasses('medium'), `min-w-[8rem] flex-col border border-primary h-auto w-auto shadow-lg animate-enter`);
  const subItemClassname = cn(defaultClassname, highlightedClassname, openClassname, disabledClassname, `px-2 py-1`, RadiusClasses('base'));

  const DropdownMenuItem = useCallback(
    (item: any, idx: number) => {
      item = { ...item, type: item.type || 'item' };
      switch (item.type) {
        case 'sub':
          return (
            <DropdownMenuPrimitive.Sub {...rest}>
              <DropdownSubTrigger className={subTriggerClassname}>
                {icon}
                {children}
                {shortcut && <DropdownShortcut shortcut={shortcut} />}
              </DropdownSubTrigger>
              <DropdownSubContent className={cn(subContentClassname)}>
                {item?.items && item?.items.length > 0 && item?.items.map((subItem: any, idx: number) => <DropdownMenuItem key={`menu-subItem-${idx}`} className={cn(subItemClassname)} {...subItem} />)}
              </DropdownSubContent>
            </DropdownMenuPrimitive.Sub>
          );
        case 'group':
          return <DropdownGroup key={`group-${idx}`} {...item} />;
        case 'radio':
          return <DropdownRadioGroup key={`radio-${idx}`} {...item} />;
        case 'checkbox':
          return <DropdownCheckboxItem key={`checkbox-${idx}`} {...item} />;
        case 'item':
          return <DropdownItem key={`item-${idx}`} {...item} />;
        case 'label':
          return <DropdownLabel key={`label-${idx}`} {...item} />;
        case 'separator':
          return <DropdownSeparator key={`separator-${idx}`} {...item} />;
        default:
          return null;
      }
    },
    [icon, children, rest, shortcut, subContentClassname, subItemClassname, subTriggerClassname],
  );

  return (
    <DropdownMenuPrimitive.DropdownMenu {...rest}>
      <DropdownTrigger className={triggerClassname}>
        {icon}
        {children}
        {shortcut && <DropdownShortcut shortcut={shortcut} />}
      </DropdownTrigger>
      <DropdownContent className={contentClassname}>
        {items &&
          items.length > 0 &&
          items.map((item: any, idx: number) => {
            return <DropdownMenuItem key={`Dropdown-item-${idx}`} className={cn(itemClassname)} {...item} />;
          })}
      </DropdownContent>
    </DropdownMenuPrimitive.DropdownMenu>
  );
};
DropdownMenu.displayName = DropdownMenuPrimitive.DropdownMenu.displayName;

// --------------------------------------------------
// DropdownTrigger
// --------------------------------------------------
export interface DropdwonTriggerProps extends DropdownMenuPrimitive.DropdownMenuTriggerProps {}
export const DropdownTrigger = forwardRef((props: DropdwonTriggerProps, ref?: any) => {
  const { children, className } = props;
  return (
    <DropdownMenuPrimitive.Trigger ref={ref} className={className}>
      {children}
    </DropdownMenuPrimitive.Trigger>
  );
});
DropdownTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

// --------------------------------------------------
// DropdownContent
// --------------------------------------------------
export interface DropdownContentProps extends DropdownMenuPrimitive.DropdownMenuContentProps {}
export const DropdownContent = forwardRef((props: DropdownContentProps, ref?: any) => {
  const { className } = props;
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content ref={ref} className={className} sideOffset={5} align={'start'} alignOffset={0} {...props} />
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownTrigger.displayName = DropdownMenuPrimitive.Content.displayName;

// --------------------------------------------------
// DropdownSubTrigger
// --------------------------------------------------
export interface DropdownSubTriggerProps extends DropdownMenuPrimitive.DropdownMenuSubTriggerProps {}
export const DropdownSubTrigger = forwardRef((props: DropdownSubTriggerProps, ref?: any) => {
  const { children, className } = props;
  return (
    <DropdownMenuPrimitive.SubTrigger ref={ref} className={cn(className)} {...props}>
      {children}
      <Icon set="Carbon" icon="ChevronRight" className="h-3 w-3 self-center justify-self-end" />
    </DropdownMenuPrimitive.SubTrigger>
  );
});
DropdownSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

// --------------------------------------------------
// DropdownSubContent
// --------------------------------------------------
export interface DropdownSubContentProps extends DropdownMenuPrimitive.DropdownMenuSubContentProps {}
export const DropdownSubContent = forwardRef((props: DropdownSubContentProps, ref?: any) => {
  const { children, className } = props;
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        ref={ref}
        className={className}
        sideOffset={4}
        // align={"start"}
        alignOffset={0}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.SubContent>
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

// --------------------------------------------------
// DropdownGroup
// --------------------------------------------------
export interface DropdownGroupProps extends DropdownMenuPrimitive.DropdownMenuGroupProps {
  items?: any[];
  className?: string;
}
export const DropdownGroup = (props: DropdownGroupProps) => {
  const { items = [], className, ...rest } = props;
  return (
    <DropdownMenuPrimitive.Group className={cn('flex flex-col gap-1', className)} {...rest}>
      {items.map((item: any, idx: number) => (
        <DropdownItem key={`group-item-${idx}`} {...item} />
      ))}
    </DropdownMenuPrimitive.Group>
  );
};
DropdownGroup.displayName = DropdownMenuPrimitive.Group.displayName;
DropdownGroup.displayName = 'DropdownGroup';

// --------------------------------------------------
// DropdownRadioGroup
// --------------------------------------------------
export interface DropdownRadioGroupProps extends DropdownMenuPrimitive.DropdownMenuRadioGroupProps {
  items?: any[];
  value?: string;
  onValueChange?: (value: string) => void;
  radioRadius?: Radius;
  className?: string;
  disabledClassname?: string;
}
export const DropdownRadioGroup = (props: DropdownRadioGroupProps) => {
  const { items = [], value: initialValue = items?.[0]?.children, onValueChange: onValueChangeCallback, radioRadius = 'full', className } = props;
  const [value, setValue] = React.useState(initialValue);

  const onValueChange = (newValue: string) => {
    setValue(newValue);
    onValueChangeCallback?.(newValue);
  };

  return (
    <DropdownMenuPrimitive.RadioGroup value={value} onValueChange={onValueChange} className={cn('flex-col w-full')}>
      {items.map((item: any, idx: number) => {
        item.value = item.value || item.children || idx;
        return (
          <DropdownMenuPrimitive.RadioItem
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
              <DropdownMenuPrimitive.ItemIndicator>
                <Icon set="Carbon" icon="DotMark" className={cn('absolute inset-0 w-3 h-3 text-accent', radioRadius && RadiusClasses(radioRadius))} />
              </DropdownMenuPrimitive.ItemIndicator>
            </span>
            {item.children}
          </DropdownMenuPrimitive.RadioItem>
        );
      })}
    </DropdownMenuPrimitive.RadioGroup>
  );
};
DropdownRadioGroup.displayName = DropdownMenuPrimitive.RadioGroup.displayName;

// --------------------------------------------------
// DropdownCheckboxItem
// --------------------------------------------------
export interface DropdownCheckboxItemProps {
  children?: string | { children: string; activechildren: string };
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  checkboxRadius?: Radius;
  className?: string;
}
export const DropdownCheckboxItem = (props: DropdownCheckboxItemProps) => {
  const { children, checked: initialChecked = false, onCheckedChange: onCheckedChangeCallback, checkboxRadius = 'small', className } = props;
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
    <DropdownMenuPrimitive.CheckboxItem
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
        <DropdownMenuPrimitive.ItemIndicator>
          <Icon set="Carbon" icon="Checkmark" className={cn('absolute inset-0 w-2.5 h-2.5 left-[0.0625rem] top-[0.0625rem] text-primary')} />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      <span className={cn(`${getLongerchildrenLength()}ch`)}>{renderchildren()}</span>
    </DropdownMenuPrimitive.CheckboxItem>
  );
};
DropdownCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

// --------------------------------------------------
// DropdownItem
// --------------------------------------------------
export interface DropdownItemProps {
  icon?: React.ReactNode;
  children?: string;
  shortcut?: string;
  className?: string;
  action?: () => void;
  disabled?: boolean;
}
export const DropdownItem = (props: DropdownItemProps) => {
  const { icon, children, className, disabled = false, action } = props;

  const onClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      action?.();
    },
    [action],
  );

  return (
    <DropdownMenuPrimitive.Item disabled={disabled} onPointerDown={onClick} tabIndex={0} className={cn('relative flex items-center justify-between gap-1 h-[25px] w-full px-[10px] cursor-pointer font-bold pointer-events-auto', className)}>
      {icon}
      {children}
    </DropdownMenuPrimitive.Item>
  );
};
DropdownItem.displayName = 'DropdownItem';

// --------------------------------------------------
// DropdownLabel
// --------------------------------------------------
export interface DropdownLabelProps extends DropdownMenuPrimitive.DropdownMenuLabelProps {
  children?: string;
}
export const DropdownLabel = forwardRef((props: DropdownLabelProps, ref?: any) => {
  const { children } = props;
  return (
    <DropdownMenuPrimitive.Label ref={ref} className={cn('relative flex items-center gap-1 h-[25px] w-full px-[10px] font-bold')}>
      {children}
    </DropdownMenuPrimitive.Label>
  );
});
DropdownLabel.displayName = 'DropdownLabel';

// --------------------------------------------------
// DropdownSeparator
// --------------------------------------------------
export const DropdownSeparator = () => {
  return <Separator orientation="horizontal" className={'pointer-events-none cursor-default'} />;
};
DropdownSeparator.displayName = 'DropdownSeparator';

// --------------------------------------------------
// DropdownShortcut
// --------------------------------------------------
export interface DropdownShortcutProps {
  shortcut: string;
  className?: string;
}
export const DropdownShortcut = (props: DropdownShortcutProps) => {
  const { shortcut, className, ...rest } = props;

  return (
    <div className={cn('text-xs text-secondary overflow-hidden h-auto w-auto', className)} {...rest}>
      <Kbd>{shortcut}</Kbd>
    </div>
  );
};
DropdownShortcut.displayname = 'DropdownShortcut';
