'use client'

import React from 'react';
import Image, { ImageProps } from 'next/image';
import { MDXComponents } from 'mdx/types';
import { MDXLayout } from './MDXLayout';

// generic layout using the `wrapper` prop
export const CustomMDXComponents: MDXComponents = {
  wrapper: (props) => <MDXLayout {...props} useRemote={false} />,
  img: (props: any) => (
    <div className="relative w-full h-auto border border-primary">
      <Image
        fill
        priority
        sizes="100vw"
        style={{
          objectFit: 'contain',
        }}
        {...(props as ImageProps)}
        alt={props.alt || ''}
      />
    </div>
  ),
};
