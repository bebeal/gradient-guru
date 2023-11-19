'use client'

import { forwardRef, ReactNode } from 'react';

export const Icon = (Ico: any, displayName: string = '', defaultProps: any) => {
  return forwardRef<any, any>((props?: any, ref?: any): ReactNode => {
    defaultProps = {width: '32', height: '32', fill: 'currentColor', stroke: 'none', ...defaultProps}
    const merged = {...defaultProps, ...Ico, ...props};
    return (
      <Ico ref={ref} label={displayName} {...merged} />
    );
  });
};


