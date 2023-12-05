'use client'

import { Loading } from '@/utils';
import { forwardRef, ReactNode, Suspense } from 'react';


export const IconWrapper = (Ico: any, displayName: string = '', defaultProps: any) => {
  return forwardRef<any, any>((props?: any, ref?: any): ReactNode => {
    defaultProps = {width: '1em', height: '100%', fill: 'currentColor', stroke: 'none', ...defaultProps}
    const merged = {...defaultProps, ...props};
    return (
      <Suspense fallback={<Loading />}>
        <Ico ref={ref} label={displayName} {...merged} />
      </Suspense>
    );
  });
};
