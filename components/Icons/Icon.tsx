'use client'

import { forwardRef, ReactNode } from 'react';

export const Icon = (Ico: any, displayName: string = '', defaultProps: any) => {
  return forwardRef<any, any>((props?: any, ref?: any): ReactNode => {
    defaultProps = {width: '1em', height: '100%', fill: 'currentColor', stroke: 'currentColor', ...defaultProps}
    const merged = {...defaultProps, ...props};
    return (
      <Ico ref={ref} label={displayName} {...merged} />
    );
  });
};
