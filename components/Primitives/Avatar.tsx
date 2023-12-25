'use client'

import { Radius, RadiusClasses, Variant, cn } from "@/utils";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import React, { ReactElement } from "react";

export interface AvatarProps extends AvatarPrimitive.AvatarProps {
  variant?: Variant;
  radius?: Radius;
  fallback?: any;
  size?: string;
  color?: string;
  animate?: boolean;
  statusColor?: string;
  badge?: ReactElement;
  padding?: string;
  onLoadingStatusChange?: (status: 'idle' | 'loading' | 'loaded' | 'error') => void;
}

export const Avatar = (props: AvatarProps) => {
  const {
    variant='solid',
    radius='large',
    fallback,
    size='auto',
    color='accent',
    animate=true,
    statusColor,
    badge,
    padding="1",
    ...rest
  } = props;
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  return (
        <AvatarPrimitive.Root
          key={`avatar-${color}-${size}-${variant}-${radius}`}
          className={cn(
            `relative inline-flex h-${size} w-${size} items-center justify-center align-middle select-none uppercase flex-shrink-0`,
            `bg-${color} text-primary`,
            RadiusClasses(radius),
          )}
        >
          {status === 'idle' || status === 'loading' ? <span className="z-0 w-full h-full flex items-center justify-center leading-none" /> : null}
          {status === 'error' ? (
            <AvatarPrimitive.Fallback
              className={cn(
                `z-0 w-full h-full flex items-center justify-center leading-none font-semibold text-lg p-${padding}`,

              )}
              delayMs={0}
            >
              {fallback}
            </AvatarPrimitive.Fallback>
          ) : null}
          <AvatarPrimitive.Image
            alt="Avatar"
            className={cn(
              `w-full h-full object-cover`,
              RadiusClasses(radius),
            )}
            onLoadingStatusChange={(status) => {
              rest?.onLoadingStatusChange?.(status);
              setStatus(status);
            }}
            {...rest}
          >
          </AvatarPrimitive.Image>
          {badge || statusColor && (
            <div
              className={cn(
                `absolute left-100 top-100 bottom-0 right-0 h-2 w-2 text-${statusColor}`,
                RadiusClasses(radius),
              )}
            >
              {badge 
                ? badge 
                : <span className={cn(`block h-2.5 w-2.5 rounded-full bg-${statusColor} text-${statusColor} border-black border border-opacity-30`, 
                    animate && `after:content-[""] after:rounded-full after:w-full after:h-full after:absolute after:animate-ripple after:text-${statusColor} after:border-2 after:border-current`,
                  )}
              />
              }
            </div>
          )}
        </AvatarPrimitive.Root>
      );
};
Avatar.displayName = 'Avatar';

// Avatars: Stacked List of Avatar
export interface AvatarsProps {
  avatars: AvatarProps[];
}
export const Avatars = (props: AvatarsProps) => {
  const { avatars=[] } = props;
  return (
    <div className="flex items-center space-x-2">
      {avatars.map((avatar: AvatarProps, index: number) => {
        return <Avatar key={`avatar-${index}`} {...avatar} />
      }
      )}
    </div>
  )
};
Avatars.displayName = 'Avatars';
