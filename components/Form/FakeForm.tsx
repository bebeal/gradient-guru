'use client'
import { forwardRef, memo } from 'react';
import { Accordion, Checkbox, Input, Slider } from '@/components';
import { cn, sortObject } from '@/utils';
import React from 'react';

export const FakeFieldRender = memo(({ name, value, type, className, ...rest }: any) => {
  switch (type ? type : typeof value) {
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
    case 'slider':
      return (<Slider value={value} className={className} {...rest} />);
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
          <div key={`${key}`} className={cn(`w-auto h-full grid overflow-hidden rounded items-end p-1 gap-px`, typeof value !== 'object' ? '' : 'col-span-2')}>
            {typeof value !== 'object' && <div className={cn(`font-semibold text-xs text-primary text-left flex-wrap self-justify-left self-start`)}>{key}:</div>}
            <div className={cn("flex-col flex w-full h-auto py-0.5 justify-center items-center px-1.5", typeof value === 'object' && 'col-span-2')}>
                <FakeFieldRender
                  name={key}
                  value={value}
                  className={cn('text-xs w-full placeholder:text-secondary/80')}
                />
            </div>
            </div>
          )
        )}
      </div>
  );
});
FakeForm.displayName = 'FakeForm';
