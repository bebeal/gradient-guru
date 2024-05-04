import { ReactElement, useState } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { Radius, RadiusClasses, Variant } from '@/utils/styles';
import { cn } from '@/utils/utils';

export interface AvatarProps extends AvatarPrimitive.AvatarProps {
  variant?: Variant;
  radius?: Radius;
  width?: string;
  height?: string;
  fallback?: any;
  size?: string;
  color?: string;
  animate?: boolean;
  statusColor?: string;
  badge?: ReactElement;
  padding?: string;
  border?: any;
  onLoadingStatusChange?: (status: 'idle' | 'loading' | 'loaded' | 'error') => void;
}

export const Avatar = (props: AvatarProps) => {
  const {
    variant = 'solid',
    radius = 'full',
    width,
    height,
    fallback,
    size = 'auto',
    color = 'accent',
    animate = true,
    statusColor,
    badge,
    padding = '1',
    border = 'after:[box-shadow:inset_0_0_0_1px_var(--tw-shadow-color)] after:rounded-full after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:shadow-gray-300 after:opacity-50',
    ...rest
  } = props;
  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  return (
    <AvatarPrimitive.Root
      key={`avatar-${color}-${width}-${height}-${variant}-${radius}`}
      className={cn(
        `relative flex items-center justify-center align-middle select-none uppercase flex-shrink-0`,
        `bg-${color} text-primary`,
        size && `w-${size} h-${size}`,
        width && `w-${width}`,
        height && `h-${height}`,
        border,
        RadiusClasses(radius),
      )}
      {...rest}
    >
      {status === 'idle' || status === 'loading' ? <span className="w-full h-full flex items-center justify-center leading-none" /> : null}
      {status === 'error' ? (
        <AvatarPrimitive.Fallback className={cn(`w-full h-full flex items-center justify-center leading-none font-semibold p-${padding} text-base`, RadiusClasses(radius))} delayMs={0}>
          {fallback}
        </AvatarPrimitive.Fallback>
      ) : null}
      <AvatarPrimitive.Image
        alt="Avatar"
        className={cn(`w-full h-full object-cover`, RadiusClasses(radius))}
        onLoadingStatusChange={(status) => {
          rest?.onLoadingStatusChange?.(status);
          setStatus(status);
        }}
        {...rest}
      ></AvatarPrimitive.Image>
      {badge ||
        (statusColor && (
          <div className={cn(`absolute left-100 top-100 bottom-0 right-0 h-2 w-2 text-${statusColor}`, RadiusClasses(radius))}>
            {badge ? (
              badge
            ) : (
              <span
                className={cn(
                  `block h-2.5 w-2.5 rounded-full bg-${statusColor} text-${statusColor} border-black border border-opacity-30`,
                  animate && `after:content-[""] after:rounded-full after:w-full after:h-full after:absolute after:animate-ripple after:text-${statusColor} after:border-2 after:border-current`,
                )}
              />
            )}
          </div>
        ))}
    </AvatarPrimitive.Root>
  );
};
Avatar.displayName = 'Avatar';

// Avatars: Stacked List of Avatar
export interface AvatarsProps {
  avatars: AvatarProps[];
}
export const Avatars = (props: AvatarsProps) => {
  const { avatars = [] } = props;
  return (
    <div className="flex items-center space-x-2">
      {avatars.map((avatar: AvatarProps, index: number) => {
        return <Avatar key={`avatar-${index}`} {...avatar} />;
      })}
    </div>
  );
};
Avatars.displayName = 'Avatars';
