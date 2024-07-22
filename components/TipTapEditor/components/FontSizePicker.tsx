import { Icon } from '@/components/Primitives/Icons/Icon'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { useCallback } from 'react'
import { DropdownButton } from '../extensions/MenuList'
import { TipTapToolbar } from '../TipTapToolbar'

const FONT_SIZES = [
  { label: 'Smaller', value: '12px' },
  { label: 'Small', value: '14px' },
  { label: 'Medium', value: '' },
  { label: 'Large', value: '18px' },
  { label: 'Extra Large', value: '24px' },
]

export type FontSizePickerProps = {
  onChange: (value: string) => void // eslint-disable-line no-unused-vars
  value: string
}

export const FontSizePicker = ({ onChange, value }: FontSizePickerProps) => {
  const currentValue = FONT_SIZES.find(size => size.value === value)
  const currentSizeLabel = currentValue?.label.split(' ')[0] || 'Medium'

  const selectSize = useCallback((size: string) => () => onChange(size), [onChange])

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <TipTapToolbar.Button active={!!currentValue?.value}>
          {currentSizeLabel}
          <Icon set="Carbon" icon="ChevronDown" className="w-2 h-2" />
        </TipTapToolbar.Button>
      </Dropdown.Trigger>
      <Dropdown.Content asChild>
        <div className="flex flex-col gap-1 px-2 py-4 bg-white rounded-lg dark:bg-black">
          {FONT_SIZES.map(size => (
            <DropdownButton
              isActive={value === size.value}
              onClick={selectSize(size.value)}
              key={`${size.label}_${size.value}`}
            >
              <span style={{ fontSize: size.value }}>{size.label}</span>
            </DropdownButton>
          ))}
        </div>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
