'use client'

import { ForwardedRef, forwardRef, useCallback, useMemo, useState } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { IconSetCache } from "@/components";
import { cn } from "@/utils";
import { useRippleEffect } from "@/hooks";

export type AccordionPrimitiveProps = Omit<AccordionPrimitive.AccordionSingleProps, 'type'> & Omit<AccordionPrimitive.AccordionMultipleProps, 'type'>;

export interface AccordionItemProps {
  icon?: any;
  name?: any;
  content: JSX.Element | null;
  selected?: boolean;
  key?: string;
  open?: boolean;
};

export interface AccordionProps extends AccordionPrimitiveProps {
  type?: 'single' | 'multiple';
  items?: AccordionItemProps[];
  highlightActive?: boolean;
  spaceBetween?: number;
  className?: string;
  triggerClassName?: string;
  ripple?: boolean;
};

const getRoundedClass = (index: number, total: number, spaceBetween: number) => {
  if (spaceBetween !== 0) return 'rounded-lg';
  if (index === 0) return 'rounded-t-lg';
  if (index === total - 1) return 'rounded-b-lg';
  return '';
};

export const Accordion = forwardRef((props: AccordionProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { 
    items=[], 
    highlightActive=true,
    type="multiple",
    spaceBetween=1,
    className='',
    triggerClassName='',
    ripple=true,
  } = props;
  const defaultValues: any = items?.filter((item: any) => item.open).map((item: any, index: number) => `accordion-item-${index}`);
  const [value, setValue] = useState<string | string[]>(type === 'single' ? defaultValues?.[0] : defaultValues);
  const { createRippleEffect } = useRippleEffect();

  const onValueChange = useCallback((event: any, newValue: string | string[]) => {
    ripple && createRippleEffect?.(event);
    if (type === 'single') {
      value === newValue ? setValue('') : setValue(newValue);
    } else {
      value.includes(newValue as any) ? setValue((value as any).filter((v: string) => v !== newValue)) : setValue([...value as any, newValue]);
    }
  }, [value, type, ripple, createRippleEffect]);

  const AccordionItems = useCallback(() => {
    return (
      items?.map((item: any, index: number) => {
        return (
          <AccordionPrimitive.Item key={`accordion-item-${index}`} value={`accordion-item-${index}`}
            className={cn(
              getRoundedClass(index, items.length, spaceBetween),
              `focus-within:border-accent focus:outline-none w-full border border-secondary transition-all`,
              highlightActive && `hover:border-accent/50 data-[state=open]:text-primary data-[state=open]:border-accent/75`,
              item?.selected && `border-accent/75 text-primary`,
            )}
         >
            <AccordionPrimitive.Header className={cn(
              "w-full h-full data-[state=open]:border-b", "data-[state=open]:border-b-secondary", 
              highlightActive && "data-[state=open]:border-b-accent/75",
              item.content === null && "rounded-lg",
            )}>
              <AccordionPrimitive.Trigger
                onClick={(e) => onValueChange(e, `accordion-item-${index}`)}
                className={cn(
                  "group", 
                  item.content === null && "rounded-lg",
                  highlightActive ? "text-secondary" : "text-primary",
                  spaceBetween !== 0 && "data-[state=open]:rounded-t-lg data-[state=closed]:rounded-lg",
                  spaceBetween === 0 && index === 0 && "rounded-t-lg",
                  spaceBetween === 0 && index === items.length - 1 && "rounded-b-lg data-[state=open]:rounded-b-none",
                  "relative overflow-hidden inline-flex w-full items-center justify-between px-4 py-2 text-left bg-primary",
                  "hover:bg-secondary/80 hover:text-primary data-[state=open]:text-primary",
                  triggerClassName,
                )}
              >
                <span className="font-bold">
                  {item.name}
                </span>
                <IconSetCache.Carbon.ChevronDown
                  className={cn(
                    "ml-2 shrink-0",
                    "group-data-[state=open]:rotate-180",
                    "transition-all duration-200 ease-in-out",
                  )}
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content
            className={cn(
              "w-full h-full bg-primary overflow-hidden border border-transparent",
              'radix-state-open:animate-accordion-down radix-state-closed:animate-accordion-up',
              spaceBetween !== 0 && `rounded-b-lg`,
              spaceBetween !== 0 || index === items.length - 1 && `rounded-b-lg`,
              "transition-all",
            )}
            >
              {item.content}
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        );
      })
    );
  }, [items, spaceBetween, highlightActive, triggerClassName, onValueChange]);

  return (
    <AccordionPrimitive.Root
      ref={ref}
      type={type} 
      className={cn(`space-y-[${spaceBetween}px] w-full h-auto`, className)}
      defaultValue={defaultValues}
      value={value as any}
    >
      <AccordionItems />
    </AccordionPrimitive.Root>
  );
});
Accordion.displayName = 'Accordion';
