"use client";

import { Button, ButtonProps } from "@/components";
import { cn } from "@/utils";
import { Radius } from "@/components";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { ElementRef, forwardRef, useCallback, useEffect, useState } from "react";

// --------------------------------------------------
// ToolbarButton
// --------------------------------------------------
export interface ToolbarButtonProps extends ButtonProps {
  icon?: any;
  label?: string;
  shortcut?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}
export const ToolbarButton = (props: ToolbarButtonProps) => {
  return (
    <ToolbarPrimitive.Button
      asChild
      className={cn("relative flex w-auto h-auto px-2.5 py-2")}
    >
      <Button {...props} />
    </ToolbarPrimitive.Button>
  );
};
ToolbarButton.displayName = ToolbarPrimitive.Button.displayName;

// --------------------------------------------------
// ToolbarSeparator
// --------------------------------------------------
export interface ToolbarSeparatorProps extends ToolbarPrimitive.ToolbarSeparatorProps {
  className?: string;
}
export const ToolbarSeparator = (props: ToolbarSeparatorProps) => {
  return (
    <ToolbarPrimitive.Separator
      className={cn("w-[1px] text-[rgb(var(--text-primary))] bg-[rgb(var(--text-primary))] py-2.5 ")}
      {...props}
    />
  );
};
ToolbarSeparator.displayName = ToolbarPrimitive.Separator.displayName;

// --------------------------------------------------
// ToolbarLink
// --------------------------------------------------
export interface ToolbarLinkProps extends ToolbarPrimitive.ToolbarLinkProps {
  className?: string;
}
export const ToolbarLink = (props: ToolbarLinkProps) => {
  return (
    <ToolbarPrimitive.Link
      target="_blank"
      className={cn(
        "text-sm text-secondary relative flex justify-center items-center w-auto h-auto",
        "hover:text-primary",
        "focus:outline-none focus-visible:z-20 focus-visible:ring focus-visible:ring-accent focus-visible:ring-opacity-75",
      )}
      {...props}
    />
  );
};
ToolbarLink.displayName = ToolbarPrimitive.Link.displayName;

// --------------------------------------------------
// ToolbarGroup
// --------------------------------------------------
export interface ToolbarGroupProps extends ToolbarPrimitive.ToolbarToggleGroupMultipleProps {
  items?: any[];
  className?: string;
}
export const ToolbarGroup = (props: ToolbarGroupProps) => {
  const { items = [], type, className, ...rest } = props;
  return (
    <ToolbarPrimitive.ToggleGroup
      className={cn("relative flex justify-stretch items-stretch w-auto h-auto", className)}
      type="multiple"
    >
      {items.map((toolbarItem, idx) => {
        return (
          <ToolbarPrimitive.ToggleItem
            key={`toolbar-item-group-${idx}`}
            value={toolbarItem?.value || idx}
            aria-label={toolbarItem?.value || idx}
            className={cn(
              "group radix-state-on:bg-accent-900/50 radix-state-off:text-primary leading-none",
              "bg-primary",
              "border-y border-x px-2.5 py-2 first:rounded-l-md last:rounded-r-md",
              "not(:first-child):radix-state-off:border-transparent",
              "border-secondary [&:not(:last-child)&:not(:first-child)]:radix-state-off:border-l-transparent [&:not(:last-child)&:not(:first-child)]:radix-state-off:border-r-transparent radix-state-on:border-accent radix-state-on:text-accent",
              "focus:relative focus:outline-none focus-visible:z-20 focus-visible:ring focus-visible:ring-accent/75",
              toolbarItem?.className,
            )}
            {...toolbarItem}
          />
        );
      })}
    </ToolbarPrimitive.ToggleGroup>
  );
};
ToolbarGroup.displayName = ToolbarPrimitive.ToggleGroup.displayName;

export interface ToolbarProps extends ToolbarPrimitive.ToolbarProps {
  radius?: Radius;
  items?: any[];
}
export const Toolbar = forwardRef<ElementRef<typeof ToolbarPrimitive.Root>, ToolbarProps>((props, ref) => {
  const { items = [], radius = "small", className, ...rest } = props;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const ToolbarItem = useCallback((item: any, idx: number) => {
    item = { ...item, type: item.type || "item" };
    switch (item.type) {
      case "button":
        return <ToolbarButton key={`toolbar-item-button-${idx}`} {...item} />;
      case "link":
        return <ToolbarLink key={`toolbar-item-link-${idx}`} {...item} />;
      case "separator":
        return <ToolbarSeparator key={`toolbar-item-seperator-${idx}`} {...item} />;
      case "group":
        return <ToolbarGroup key={`toolbar-item-group-${idx}`} {...item} />;
      case "spacer":
        return <div key={`toolbar-item-spacer-${idx}`} className="w-full flex-1" />;
      default:
        return null;
    }
  }, []);

  return (
    mounted && (
      <ToolbarPrimitive.Root
        ref={ref}
        className={cn("flex w-auto h-auto items-center justify-center bg-primary text-primary", className)}
        {...rest}
      >
        {items.map((toolbarItem, idx) => {
          return ToolbarItem(toolbarItem, idx);
        })}
      </ToolbarPrimitive.Root>
    )
  );
});
Toolbar.displayName = ToolbarPrimitive.Root.displayName;
