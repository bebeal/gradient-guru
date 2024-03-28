'use client';

import { useCallback, useState } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { useRippleEffect } from '@/hooks';
import { cn, ConvertRadiusClass, Radius, RadiusClasses } from '@/utils';
import { Icon } from './Icons';

export type AccordionPrimitiveProps = Omit<AccordionPrimitive.AccordionSingleProps, 'type'> & Omit<AccordionPrimitive.AccordionMultipleProps, 'type'>;

export interface AccordionItemProps {
  icon?: any;
  name?: any;
  content: JSX.Element | null;
  selected?: boolean;
  key?: string;
  open?: boolean;
}

export interface AccordionProps extends AccordionPrimitiveProps {
  type?: 'single' | 'multiple';
  items?: AccordionItemProps[];
  highlightActive?: boolean;
  radius?: Radius;
  spaceBetween?: number;
  className?: string;
  triggerClassName?: string;
  ripple?: boolean;
}

const getRoundedClass = (index: number, total: number, spaceBetween: number, radius: Radius = 'medium') => {
  if (spaceBetween !== 0) return `rounded-${ConvertRadiusClass(radius)}`;
  if (spaceBetween === 0 && index === 0 && total === 1) return `rounded-${ConvertRadiusClass(radius)}`;
  if (index === 0) return `rounded-t-${ConvertRadiusClass(radius)}`;
  if (index === total - 1) return `rounded-b-${ConvertRadiusClass(radius)}`;
  return '';
};

export const Accordion = (props: AccordionProps) => {
  const { items = [], highlightActive = true, type = 'multiple', spaceBetween = 16, radius = 'large', className = '', triggerClassName = '', ripple = true, asChild } = props;
  const getValues: any = useCallback((values: any) => values?.filter((item: any) => item.open).map((item: any, index: number) => `accordion-item-${index}`), []);
  const [value, setValue] = useState<string | string[]>(type === 'single' ? getValues(items)?.[0] : getValues(items));
  const { createRippleEffect } = useRippleEffect();

  // useEffect(() => {
  //   setValue(type === 'single' ? getValues(items)?.[0] : getValues(items));
  // }, [getValues, items, type]);

  const onValueChange = useCallback(
    (event: any, newValue: string | string[]) => {
      event.preventDefault();
      ripple && createRippleEffect?.(event);
      if (type === 'single') {
        value === newValue ? setValue('') : setValue(newValue);
      } else {
        value.includes(newValue as any) ? setValue((value as any).filter((v: string) => v !== newValue)) : setValue([...(value as any), newValue]);
      }
    },
    [createRippleEffect, ripple, type, value],
  );

  return (
    <AccordionPrimitive.Root type={type} className={cn(`space-y-[${spaceBetween}px] w-full h-auto transition-all`, className)} defaultValue={getValues(items)} value={value as any}>
      {items?.map((item: any, index: number) => {
        return (
          <AccordionPrimitive.Item
            key={`accordion-item-${index}`}
            value={`accordion-item-${index}`}
            className={cn(
              getRoundedClass(index, items.length, spaceBetween, radius),
              `focus-within:border-accent focus:outline-none w-full border border-secondary`,
              highlightActive && `hover:border-accent/50 radix-state-open:text-primary radix-state-open:border-accent/75`,
              item?.selected && `border-accent/75 text-primary`,
            )}
          >
            <AccordionPrimitive.Header
              className={cn('w-full h-auto radix-state-open:border-b', 'radix-state-open:border-b-secondary', highlightActive && 'radix-state-open:border-b-accent/75', item.content === null && RadiusClasses(radius))}
            >
              <AccordionPrimitive.Trigger
                asChild={asChild}
                onClick={(e) => onValueChange(e, `accordion-item-${index}`)}
                className={cn(
                  'group',
                  item.content === null && RadiusClasses(radius),
                  highlightActive ? 'text-secondary' : 'text-primary',
                  spaceBetween !== 0 && `radix-state-open:rounded-t-${ConvertRadiusClass(radius)} radix-state-closed:${RadiusClasses(radius)}`,
                  spaceBetween === 0 && index === 0 && `rounded-t-${ConvertRadiusClass(radius)}`,
                  spaceBetween === 0 && index === items.length - 1 && `rounded-b-${ConvertRadiusClass(radius)} radix-state-open:rounded-b-none`,
                  'relative overflow-hidden bg-primary w-full flex border border-transparent',
                  'hover:bg-secondary/80 hover:text-primary radix-state-open:text-primary',
                )}
              >
                <div className={cn('flex w-full h-auto items-center px-2 py-1 pointer-events-none', triggerClassName)}>
                  <div className="font-bold text-xs flex-grow text-center items-center w-full">{item.name}</div>
                  <Icon set="Carbon" icon="ChevronDown" className={cn('ml-auto shrink-0', 'group-radix-state-open:rotate-180', 'transition-transform anim-duration-200 ease-linear')} />
                </div>
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionPrimitive.Content
              className={cn(
                'w-full h-auto bg-primary overflow-auto border border-transparent',
                spaceBetween !== 0 && `rounded-b-${ConvertRadiusClass(radius)}`,
                spaceBetween !== 0 || (index === items.length - 1 && `rounded-b-${ConvertRadiusClass(radius)}`),
                'radix-state-closed:animate-accordion-up radix-state-open:animate-accordion-down',
              )}
            >
              {item.content}
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        );
      })}
    </AccordionPrimitive.Root>
  );
};

Accordion.displayName = 'Accordion';
