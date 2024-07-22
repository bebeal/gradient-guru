import * as Popover from '@radix-ui/react-popover'
import { forwardRef } from 'react'
import { TipTapToolbar } from '../TipTapToolbar'
import { cn } from '@/utils/utils'
import { Icon } from '@/components/Primitives/Icons/Icon'

export const Trigger = Popover.Trigger
export const Portal = Popover.Portal

export type MenuProps = {
  children: React.ReactNode
  trigger: React.ReactNode
  triggerClassName?: string
  customTrigger?: boolean
  isOpen?: boolean
  onOpenChange?: (state: boolean) => void
  withPortal?: boolean
  tooltip?: string
  isActive?: boolean
}

export const Menu = ({
  customTrigger,
  trigger,
  triggerClassName,
  children,
  isOpen,
  withPortal,
  tooltip,
  onOpenChange,
}: MenuProps) => {
  return (
    <Popover.Root onOpenChange={onOpenChange}>
      {customTrigger ? (
        <Trigger asChild>{trigger}</Trigger>
      ) : (
        <Trigger asChild>
          <TipTapToolbar.Button className={triggerClassName} tooltip={!isOpen ? tooltip : ''}>
            {trigger}
          </TipTapToolbar.Button>
        </Trigger>
      )}
      {withPortal ? (
        <Popover.Portal>
          <Popover.Content asChild sideOffset={8}>
            <div className="bg-white rounded-lg dark:bg-black min-w-[15rem] p-2 flex flex-col gap-0.5 max-h-80 overflow-auto z-[9999]">
              {children}
            </div>
          </Popover.Content>
        </Popover.Portal>
      ) : (
        <Popover.Content asChild sideOffset={8}>
          <div className="bg-white rounded-lg dark:bg-black min-w-[15rem] p-2 flex flex-col gap-0.5 max-h-80 overflow-auto z-[9999]">
            {children}
          </div>
        </Popover.Content>
      )}
    </Popover.Root>
  )
}

Menu.displayName = 'Menu'

export const Item = ({
  label,
  close = true,
  set='Lucide',
  icon,
  disabled,
  onClick,
  isActive,
}: {
  label: string | React.ReactNode
  set?: string
  icon?: string;
  close?: boolean
  disabled?: boolean
  onClick: () => void
  isActive?: boolean
}) => {
  const className = cn(
    'flex items-center gap-2 p-1.5 text-sm font-medium text-neutral-500 text-left bg-transparent w-full rounded',
    !isActive && !disabled,
    'hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-neutral-900 dark:hover:text-neutral-200',
    isActive && !disabled && 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200',
    disabled && 'text-neutral-400 cursor-not-allowed dark:text-neutral-600',
  )

  const ItemComponent = close ? Popover.Close : 'button'
  return (
    <ItemComponent className={className} onClick={onClick} disabled={disabled}>
      <Icon set={set} icon={icon} />
      {label}
    </ItemComponent>
  )
}

export type CategoryTitle = {
  children: React.ReactNode
}

export const CategoryTitle = ({ children }: CategoryTitle) => {
  return (
    <div className="mt-4 first:mt-1.5 mb-1.5 text-[0.625rem] font-medium text-neutral-400 dark:text-neutral-600 uppercase select-none px-1">
      {children}
    </div>
  )
}

export const Divider = forwardRef<HTMLHRElement>((props, ref) => {
  return <hr {...props} ref={ref} className="my-1 border-neutral-200 dark:border-neutral-800" />
})

Divider.displayName = 'Divider'
