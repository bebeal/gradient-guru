'use client';

// Benjamin Noah Beal
import React, { forwardRef, useCallback, useMemo, useRef } from 'react';
import { cn } from '@/utils';

export const GPU_PARTS = ['base', 'fan-1', 'fan-2', 'fan-3', 'PCIE', 'gpu', 'inner-circle'];
export type GpuParts = (typeof GPU_PARTS)[number];
export type VariantSet = {
  color?: string;
  className?: string;
};

export type GpuVariantSet = 'unique' | 'realistic';
export const GpuPartVariantSets: Record<GpuVariantSet, Record<GpuParts, VariantSet>> = {
  unique: {
    base: { color: '#000000', className: cn('fill-current bg-current') }, // black
    'fan-1': { color: '#FF0000', className: cn('fill-current bg-current') }, // red
    'fan-2': { color: '#00FF00', className: cn('fill-current bg-current') }, // green
    'fan-3': { color: '#0000FF', className: cn('fill-current bg-current') }, // blue
    PCIE: { color: '#FFFF00', className: cn('fill-current bg-current') }, // yellow
    'inner-circle': {},
    gpu: { className: cn('w-auto h-auto') },
  },
  realistic: {
    base: {
      color: '#2C3E50',
      className: cn('fill-[url(#baseGradient)] stroke-[url(#baseGradient)] [box-shadow:0_4px_6px_rgba(0, 0, 0, 0.1)]'),
    }, // dark grey blue gradient
    'fan-1': {
      color: '#BDC3C7',
      className: cn(
        'fill-[url(#fanGradient)] stroke-[url(#fanGradient)] [box-shadow:inset_-2px_-2px_4px_#8a949e,inset_2px_2px_4px_#d5dce3]'
      ),
    }, // silver gradient
    'fan-2': {
      color: '#BDC3C7',
      className: cn(
        'fill-[url(#fanGradient)] stroke-[url(#fanGradient)] [box-shadow:inset_-2px_-2px_4px_#8a949e,inset_2px_2px_4px_#d5dce3]'
      ),
    }, // silver gradient
    'fan-3': {
      color: '#BDC3C7',
      className: cn(
        'fill-[url(#fanGradient)] stroke-[url(#fanGradient)] [box-shadow:inset_-2px_-2px_4px_#8a949e,inset_2px_2px_4px_#d5dce3]'
      ),
    }, // silver gradient
    PCIE: {
      color: '#F39C12',
      className: cn('fill-[url(#pcieGradient)] stroke-[url(#pcieGradient)] [box-shadow:0_4px_6px_rgba(0, 0, 0, 0.1)] '),
    }, // gold gradient
    'inner-circle': {},
    gpu: { className: cn('w-full h-full p-1') },
  },
};

export interface ThreeFanGpuProps {
  variant?: GpuVariantSet;
  spinFans?: boolean;
  outline?: boolean;
  spinAnimation?: string;
  className?: string;
}
export const ThreeFanGpu = forwardRef((props: ThreeFanGpuProps, ref?: any) => {
  const {
    variant = 'realistic',
    spinFans = true,
    outline = false,
    spinAnimation = 'animate-rotate-counter-clockwise',
    className = '',
    ...rest
  } = props;
  const internalRef: any = useRef<any>(undefined);

  const getPartProperties = useCallback(
    (part: GpuParts, partVariant: GpuVariantSet = variant) => {
      const stylesForParts: any = GpuPartVariantSets?.[partVariant];

      const isFan = part.includes('fan');
      let styles = stylesForParts[part];
      if (isFan) {
        styles = { ...styles, className: cn('[transform-box:fill-box] origin-center', styles?.className) };
      }
      if (isFan && spinFans) {
        // must spin around its center so it looks as if theres no movement just spin
        return { ...styles, className: cn(styles?.className, spinAnimation) };
      }
      return styles;
    },
    [variant, spinFans, spinAnimation]
  );

  const SvgRealisticGradients = useCallback(() => {
    return (
      <defs>
        <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#34495e' }} />
          <stop offset="100%" style={{ stopColor: '#2c3e50' }} />
        </linearGradient>
        <linearGradient id="fanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#d5dce3' }} />
          <stop offset="100%" style={{ stopColor: '#8a949e' }} />
        </linearGradient>
        <linearGradient id="pcieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#f1c40f' }} />
          <stop offset="100%" style={{ stopColor: '#f39c12' }} />
        </linearGradient>
        <filter id="glassEffect" x="0" y="0">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="out" />
        </filter>
      </defs>
    );
  }, []);

  interface BaseGpuIconProps {
    gpuVariant?: GpuVariantSet;
    className?: string;
    width?: string;
    height?: string;
  }

  const BaseGpuIcon = useCallback(
    (props: BaseGpuIconProps) => {
      const { gpuVariant = variant, className = '', ...rest } = props;
      const gpuStyles = getPartProperties('gpu', gpuVariant);
      const gpuClassName = cn(gpuStyles?.className, className);

      return (
        <svg id="gpu" viewBox="0 0 85 35.86" ref={internalRef} {...gpuStyles} className={gpuClassName} {...rest}>
          <SvgRealisticGradients />
          <g id="base" {...getPartProperties('base', gpuVariant)}>
            <path d="m81.3 0h-23.84l-2.37 1.92c-0.08 0.07-0.18 0.1-0.29 0.1h-24.61c-0.1 0-0.21-0.04-0.29-0.1l-2.37-1.92h-23.83c-2.04 0-3.7 1.66-3.7 3.7v25.71c0 2.04 1.66 3.7 3.7 3.7h23.84l2.37-1.92c0.08-0.07 0.18-0.1 0.29-0.1h24.62c0.1 0 0.21 0.04 0.29 0.1l2.37 1.92h23.82c2.04 0 3.7-1.66 3.7-3.7v-25.72c0-2.03-1.66-3.69-3.7-3.69zm-53.55 17.32c0 0.03 0 0.06-0.01 0.1-0.21 3-1.45 5.81-3.54 8-0.02 0.03-0.05 0.05-0.07 0.08l-0.14 0.14c-2.1 2.1-4.8 3.39-7.71 3.7-0.03 0.01-0.05 0.01-0.08 0.01-0.44 0.05-0.89 0.07-1.34 0.07-3.45 0-6.69-1.34-9.13-3.78s-3.78-5.68-3.78-9.13c0-0.13 0-0.26 0.01-0.39v-0.08c0.11-3.03 1.26-5.87 3.27-8.13 0.01-0.02 0.03-0.03 0.04-0.05 0.15-0.16 0.3-0.32 0.46-0.48 2.44-2.44 5.68-3.78 9.13-3.78s6.69 1.34 9.13 3.78c0.47 0.47 0.91 0.98 1.3 1.51 0.01 0.01 0.01 0.02 0.02 0.03 1.6 2.19 2.47 4.83 2.47 7.59-0.01 0.26-0.02 0.53-0.03 0.81zm27.64 0c0 0.03 0 0.06-0.01 0.1-0.21 3-1.45 5.81-3.54 8-0.02 0.03-0.05 0.05-0.07 0.08-0.04 0.05-0.09 0.09-0.13 0.14-2.1 2.1-4.8 3.39-7.71 3.7-0.03 0.01-0.05 0.01-0.08 0.01-0.44 0.05-0.89 0.07-1.34 0.07-3.45 0-6.69-1.34-9.13-3.78s-3.78-5.68-3.78-9.13c0-0.13 0-0.26 0.01-0.39v-0.08c0.11-3.03 1.25-5.87 3.27-8.13 0.01-0.02 0.03-0.03 0.04-0.05 0.15-0.16 0.3-0.32 0.46-0.48 2.44-2.44 5.68-3.78 9.13-3.78s6.69 1.34 9.13 3.78c0.47 0.47 0.91 0.98 1.3 1.51 0.01 0.01 0.01 0.02 0.02 0.03 1.6 2.19 2.47 4.83 2.47 7.59-0.02 0.26-0.03 0.53-0.04 0.81zm27.64 0c0 0.03 0 0.06-0.01 0.1-0.21 3-1.45 5.81-3.54 8-0.02 0.03-0.05 0.05-0.07 0.08-0.04 0.05-0.09 0.09-0.13 0.14-2.1 2.1-4.8 3.39-7.71 3.7-0.04-0.01-0.07-0.01-0.09-0.01-0.44 0.05-0.89 0.07-1.34 0.07-3.45 0-6.69-1.34-9.13-3.78s-3.78-5.68-3.78-9.13c0-0.13 0-0.26 0.01-0.39v-0.08c0.11-3.03 1.26-5.87 3.27-8.13 0.01-0.02 0.03-0.03 0.04-0.05 0.15-0.16 0.3-0.32 0.46-0.48 2.44-2.44 5.68-3.78 9.13-3.78s6.69 1.34 9.13 3.78c0.47 0.47 0.91 0.98 1.29 1.51 0.01 0.01 0.01 0.02 0.02 0.03 1.6 2.19 2.47 4.83 2.47 7.59 0 0.28-0.01 0.55-0.02 0.83z" />
          </g>
          <g id="PCIE" {...getPartProperties('PCIE', gpuVariant)}>
            <rect id="data-lane" x="4.03" y="34.01" width="13.16" height="1.85" />
            {/* Long Section: Typically 16-pin PCIe lane, Facilitates data, control, and power connections */}
            <rect id="key-notch" x="21.18" y="34.01" width="4.35" height="1.85" />
            {/* Short Section: Key Notch: Ensures correct orientation and secure attachment */}
          </g>
          <g id="fan-1" {...getPartProperties('fan-1', gpuVariant)}>
            {/* Left side fan */}
            <path
              id="inner-circle"
              {...getPartProperties('inner-circle', gpuVariant)}
              d="m15.79 20.55c0.01 0 0.02-0.01 0.03-0.01 1.83-0.43 3.2-2.08 3.2-4.05 0-0.07 0-0.14-0.01-0.22v-0.02c-0.11-2.01-1.66-3.65-3.63-3.9h-0.02c-0.16-0.02-0.33-0.03-0.5-0.03-1.87 0-3.45 1.24-3.98 2.94 0 0.01 0 0.02-0.01 0.02-0.11 0.38-0.18 0.78-0.18 1.2 0 0.58 0.12 1.13 0.33 1.63v0.01c0.64 1.48 2.11 2.52 3.82 2.52 0.34 0.01 0.65-0.03 0.95-0.09z"
            />
            <path d="m18.1 12.6c1.18-2.43 0.99-4.99-0.55-7.81-0.87-0.2-1.77-0.3-2.69-0.3-0.3 0-0.59 0.01-0.88 0.03 1.96 2.55 3 5.04 3.09 7.41 0.37 0.18 0.72 0.41 1.03 0.67z" />
            <path d="m24.44 9.27c-0.72-0.96-1.59-1.8-2.56-2.5-0.14 3.21-0.94 5.78-2.4 7.65 0.17 0.37 0.29 0.77 0.36 1.18 2.47-1.11 3.98-3.19 4.6-6.33z" />
            <path d="m10.75 13.52c0.24-0.33 0.52-0.64 0.84-0.9-2.19-1.58-4.74-1.85-7.78-0.81-0.46 1.08-0.77 2.25-0.89 3.47 2.85-1.49 5.48-2.08 7.83-1.76z" />
            <path d="m9.8 16.86c-0.01-0.12-0.01-0.24-0.01-0.37 0-0.29 0.03-0.58 0.07-0.86-2.69 0.2-4.82 1.64-6.48 4.38 0.36 1.16 0.88 2.24 1.55 3.22 1.23-2.97 2.87-5.11 4.87-6.37z" />
            <path d="m11.23 20.02c-0.29-0.29-0.54-0.62-0.75-0.98-1.94 1.88-2.64 4.35-2.15 7.52 1 0.65 2.09 1.15 3.26 1.48-0.97-3.07-1.09-5.76-0.36-8.02z" />
            <path d="m19.26 19.01c2.6 0.74 5.09 0.11 7.59-1.9 0.01-0.21 0.02-0.41 0.02-0.62 0-1.02-0.13-2-0.37-2.94-2.17 2.38-4.44 3.83-6.76 4.33-0.12 0.39-0.28 0.78-0.48 1.13z" />
            <path d="m13.62 11.58c0.39-0.1 0.8-0.15 1.22-0.15-0.66-2.62-2.45-4.46-5.44-5.62-1.07 0.55-2.05 1.25-2.9 2.09 3.14 0.68 5.53 1.92 7.12 3.68z" />
            <path d="m14.35 21.53c-0.42-0.04-0.82-0.14-1.2-0.27-0.27 2.69 0.77 5.03 3.19 7.14 1.21-0.15 2.37-0.48 3.45-0.96-2.73-1.73-4.55-3.71-5.44-5.91z" />
            <path d="m17.71 20.68c-0.34 0.23-0.71 0.42-1.09 0.56 1.52 2.23 3.82 3.35 7.03 3.42 0.81-0.87 1.5-1.87 2.03-2.95-0.88 0.12-1.72 0.18-2.52 0.18-2.12 0-3.94-0.4-5.45-1.21z" />
          </g>
          <g id="fan-2" {...getPartProperties('fan-2', gpuVariant)}>
            {/* Center fan */}
            <path
              id="inner-circle"
              {...getPartProperties('inner-circle', gpuVariant)}
              d="m43.43 20.55c0.01 0 0.02-0.01 0.03-0.01 1.83-0.43 3.2-2.08 3.2-4.05 0-0.07 0-0.14-0.01-0.22v-0.02c-0.11-2.01-1.66-3.65-3.63-3.9h-0.02c-0.16-0.02-0.33-0.03-0.5-0.03-1.87 0-3.45 1.24-3.98 2.94 0 0.01 0 0.02-0.01 0.02-0.11 0.38-0.18 0.78-0.18 1.2 0 0.58 0.12 1.13 0.33 1.63v0.01c0.64 1.48 2.11 2.52 3.82 2.52 0.34 0.01 0.65-0.03 0.95-0.09z"
            />
            <path d="m45.74 12.6c1.18-2.43 0.99-4.99-0.55-7.81-0.87-0.2-1.77-0.3-2.69-0.3-0.3 0-0.59 0.01-0.88 0.03 1.96 2.55 3 5.04 3.09 7.41 0.37 0.18 0.72 0.41 1.03 0.67z" />
            <path d="m41.26 11.58c0.39-0.1 0.8-0.15 1.22-0.15-0.66-2.62-2.45-4.46-5.44-5.62-1.07 0.55-2.05 1.25-2.9 2.09 3.14 0.68 5.53 1.92 7.12 3.68z" />
            <path d="m41.98 21.53c-0.42-0.04-0.82-0.14-1.2-0.27-0.27 2.69 0.77 5.03 3.19 7.14 1.21-0.15 2.37-0.48 3.45-0.96-2.72-1.73-4.54-3.71-5.44-5.91z" />
            <path d="m52.08 9.27c-0.72-0.96-1.59-1.8-2.56-2.5-0.14 3.21-0.94 5.78-2.4 7.65 0.17 0.37 0.29 0.77 0.36 1.18 2.47-1.11 3.98-3.19 4.6-6.33z" />
            <path d="m46.9 19.01c2.6 0.74 5.09 0.11 7.59-1.9 0.01-0.21 0.01-0.41 0.01-0.62 0-1.02-0.13-2-0.37-2.94-2.17 2.38-4.44 3.83-6.76 4.33-0.11 0.39-0.27 0.78-0.47 1.13z" />
            <path d="m38.39 13.52c0.24-0.33 0.52-0.64 0.84-0.9-2.19-1.58-4.74-1.85-7.78-0.81-0.46 1.08-0.77 2.25-0.89 3.47 2.85-1.49 5.48-2.08 7.83-1.76z" />
            <path d="m38.86 20.02c-0.29-0.29-0.54-0.62-0.74-0.98-1.94 1.88-2.64 4.35-2.15 7.52 1 0.65 2.09 1.15 3.26 1.48-0.97-3.07-1.09-5.76-0.37-8.02z" />
            <path d="m37.44 16.86c-0.01-0.12-0.01-0.24-0.01-0.37 0-0.29 0.03-0.58 0.07-0.86-2.69 0.2-4.82 1.64-6.48 4.38 0.36 1.16 0.88 2.24 1.55 3.22 1.23-2.97 2.87-5.11 4.87-6.37z" />
            <path d="m45.34 20.68c-0.34 0.23-0.71 0.42-1.09 0.56 1.52 2.23 3.82 3.35 7.03 3.42 0.81-0.87 1.5-1.87 2.03-2.95-0.88 0.12-1.72 0.18-2.52 0.18-2.11 0-3.93-0.4-5.45-1.21z" />
          </g>
          <g id="fan-3" {...getPartProperties('fan-3', gpuVariant)}>
            {/* Right side fan */}
            <path
              id="inner-circle"
              {...getPartProperties('inner-circle', gpuVariant)}
              d="m71.07 20.55c0.01 0 0.02-0.01 0.03-0.01 1.83-0.43 3.2-2.08 3.2-4.05 0-0.07 0-0.14-0.01-0.22v-0.02c-0.11-2.01-1.66-3.65-3.63-3.9h-0.02c-0.16-0.02-0.33-0.03-0.5-0.03-1.87 0-3.45 1.24-3.98 2.94 0 0.01 0 0.02-0.01 0.02-0.11 0.38-0.18 0.78-0.18 1.2 0 0.58 0.12 1.13 0.33 1.63v0.01c0.64 1.48 2.11 2.52 3.82 2.52 0.34 0.01 0.65-0.03 0.95-0.09z"
            />
            <path d="m66.03 13.52c0.24-0.33 0.52-0.64 0.84-0.9-2.19-1.58-4.74-1.85-7.78-0.81-0.46 1.08-0.77 2.25-0.89 3.47 2.85-1.49 5.48-2.08 7.83-1.76z" />
            <path d="m73.38 12.6c1.18-2.43 0.99-4.99-0.55-7.81-0.87-0.2-1.77-0.3-2.69-0.3-0.3 0-0.59 0.01-0.88 0.03 1.96 2.55 3 5.04 3.09 7.41 0.37 0.18 0.72 0.41 1.03 0.67z" />
            <path d="m66.5 20.02c-0.29-0.29-0.54-0.62-0.74-0.98-1.94 1.88-2.64 4.35-2.15 7.52 1 0.65 2.09 1.15 3.26 1.48-0.97-3.07-1.09-5.76-0.37-8.02z" />
            <path d="m72.98 20.68c-0.34 0.23-0.71 0.42-1.09 0.56 1.52 2.23 3.82 3.35 7.03 3.42 0.81-0.87 1.5-1.87 2.03-2.95-0.88 0.12-1.72 0.18-2.52 0.18-2.11 0-3.93-0.4-5.45-1.21z" />
            <path d="m65.08 16.86c-0.01-0.12-0.01-0.24-0.01-0.37 0-0.29 0.03-0.58 0.07-0.86-2.69 0.2-4.82 1.64-6.48 4.38 0.36 1.16 0.88 2.24 1.55 3.22 1.23-2.97 2.87-5.11 4.87-6.37z" />
            <path d="m74.54 19.01c2.6 0.74 5.09 0.11 7.59-1.9 0.01-0.21 0.02-0.41 0.02-0.62 0-1.02-0.13-2-0.37-2.94-2.17 2.38-4.44 3.83-6.76 4.33-0.12 0.39-0.28 0.78-0.48 1.13z" />
            <path d="m68.9 11.58c0.39-0.1 0.8-0.15 1.22-0.15-0.66-2.62-2.45-4.46-5.44-5.62-1.07 0.55-2.05 1.25-2.9 2.09 3.14 0.68 5.53 1.92 7.12 3.68z" />
            <path d="m79.72 9.27c-0.72-0.96-1.59-1.8-2.56-2.5-0.14 3.21-0.94 5.78-2.4 7.65 0.17 0.37 0.29 0.77 0.36 1.18 2.47-1.11 3.98-3.19 4.6-6.33z" />
            <path d="m69.62 21.53c-0.42-0.04-0.82-0.14-1.2-0.27-0.27 2.69 0.77 5.03 3.19 7.14 1.21-0.15 2.37-0.48 3.45-0.96-2.72-1.73-4.54-3.71-5.44-5.91z" />
          </g>
        </svg>
      );
    },
    [variant, SvgRealisticGradients, getPartProperties]
  );

  const ThreeFanGpuComponent = useMemo(() => {
    return (
      <BaseGpuIcon
        gpuVariant={variant}
        className={cn(
          className,
          outline && `[&>*]:stroke-black [&>*]:[stroke-alignment:outside] [&>*]:[stroke-width:0.5] w-full h-full`
        )}
      />
    );
  }, [variant, outline, className, BaseGpuIcon]);

  return ThreeFanGpuComponent;
});
