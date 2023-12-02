'use client'
import { forwardRef, memo } from 'react';
import { Accordion, Checkbox, Input } from '@/components';
import { cn, sortObject } from '@/utils';
import React from 'react';

export const FakeFieldRender = memo(({ name, value, className, ...rest }: any) => {
  switch (typeof value) {
    case 'boolean':
      return (<Checkbox checked={value} className={className} {...rest} />);
    case 'object':
      if (Array.isArray(value)) {
        return (
          <div className="flex flex-row w-full flex-wrap items-center gap-1">
          {value.map((item: any, index: any) => (
            <div key={index} className="flex flex-row items-center">
              <div className="flex items-center justify-center mx-1 text-primary/80">{item}</div>
              {index < value.length - 1 && <div className="flex items-center justify-center mx-1 text-primary/80">,</div>}
            </div>
          ))}
          </div>
        )
      } else {
        return (
          <Accordion 
            highlightActive={false}
            className="text-xs w-full"
            triggerClassName="px-2 py-1 font-semibold text-xs text-primary"
            items={[ 
              {name: name, open: true, content: <FakeForm object={value} className='px-1 py-2' />} 
            ]} 
          />
        );
      }
    case 'number':
      return (<Input value={value.toFixed(2)} extraCharWidth={0} readOnly className={cn(className, `p-0 cursor-text bg-transparent border-transparent text-primary/80 ring-transparent hover:border-transparent hover:bg-transparent hover:cursor-text hover:text-primary/80 hover:ring-transparent focus:border-transparent focus:bg-transparent focus:cursor-text focus:text-primary/80 focus:ring-transparent`,)} {...rest} />);
    default:
    case 'string':
      return (<Input value={value} extraCharWidth={0} readOnly className={cn(className, `p-0 cursor-text bg-transparent border-transparent text-primary/80 ring-transparent hover:border-transparent hover:bg-transparent hover:cursor-text hover:text-primary/80 hover:ring-transparent focus:border-transparent focus:bg-transparent focus:cursor-text focus:text-primary/80 focus:ring-transparent`,)} {...rest} />);
    }
});

export interface FakeFormProps {
  object: Record<string, any>;
  className?: string;
}
export const FakeForm = forwardRef<any, FakeFormProps>((props, ref) => {
  const {
    object = {},
    className = '',
    ...rest
  } = props;

  const objectSortedByType: Record<string, any> = sortObject(object);

  return (
      <div
        ref={ref}
        className={cn(`px-2 py-4 grid`, Object.keys(objectSortedByType).length > 1 ? 'grid-cols-2' : 'grid-cols-1', className)}
        {...rest}
      >
        {Object.entries(objectSortedByType).map(([key, value]) => (
          <div key={`${key}`} className={cn(`w-auto h-auto grid overflow-auto rounded items-center`, typeof value !== 'object' ? 'grid-cols-[minmax(0,_1fr)_1fr]' : 'grid-cols-[minmax(0,_1fr)] col-span-2')}>
            {typeof value !== 'object' && <div className={cn(`font-semibold text-xs text-primary text-right`)}>{key}</div>}
            <div className="flex-col flex w-auto items-start py-0.5">
              <div className="flex flex-row items-center w-full gap-0.5">
                {typeof value !== 'object' && ':'}
                <FakeFieldRender
                  name={key}
                  value={value}
                  className={cn('text-xs w-auto font-normal p-0')}
                />
              </div>
            </div>
            </div>
          )
        )}
      </div>
  );
});
FakeForm.displayName = 'FakeForm';
