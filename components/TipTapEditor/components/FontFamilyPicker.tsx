
import { Icon } from '@/components/Primitives/Icons/Icon'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { useCallback } from 'react'
import { DropdownButton, DropdownCategoryTitle } from '../extensions/MenuList'
import { TipTapToolbar } from '../TipTapToolbar'

const FONT_FAMILY_GROUPS = [
  {
    label: 'Sans Serif',
    options: [
      { label: 'Inter', value: '' },
      { label: 'Arial', value: 'Arial' },
      { label: 'Helvetica', value: 'Helvetica' },
    ],
  },
  {
    label: 'Serif',
    options: [
      { label: 'Times New Roman', value: 'Times' },
      { label: 'Garamond', value: 'Garamond' },
      { label: 'Georgia', value: 'Georgia' },
    ],
  },
  {
    label: 'Monospace',
    options: [
      { label: 'Courier', value: 'Courier' },
      { label: 'Courier New', value: 'Courier New' },
    ],
  },
  {
    label: 'Berkeley Mono',
    options: [
      { label: 'Berkeley Mono', value: 'Berkeley Mono' }
    ],
  }
]

const FONT_FAMILIES = FONT_FAMILY_GROUPS.flatMap(group => [group.options]).flat()

export type FontFamilyPickerProps = {
  onChange: (value: string) => void // eslint-disable-line no-unused-vars
  value: string
}

export const FontFamilyPicker = ({ onChange, value }: FontFamilyPickerProps) => {
  const currentValue = FONT_FAMILIES.find(size => size.value === value)
  const currentFontLabel = currentValue?.label.split(' ')[0] || 'Inter'

  const selectFont = useCallback((font: string) => () => onChange(font), [onChange])

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <TipTapToolbar.Button active={!!currentValue?.value}>
          {currentFontLabel}
          <Icon set="Carbon" icon="ChevronDown" className="w-2 h-2" />
        </TipTapToolbar.Button>
      </Dropdown.Trigger>
      <Dropdown.Content asChild>
        <div className="flex flex-col gap-1 px-2 py-4 bg-white rounded-lg dark:bg-black">
          {FONT_FAMILY_GROUPS.map(group => (
            <div className="mt-2.5 first:mt-0 gap-0.5 flex flex-col" key={group.label}>
              <DropdownCategoryTitle>{group.label}</DropdownCategoryTitle>
              {group.options.map(font => (
                <DropdownButton
                  isActive={value === font.value}
                  onClick={selectFont(font.value)}
                  key={`${font.label}_${font.value}`}
                >
                  <span style={{ fontFamily: font.value }}>{font.label}</span>
                </DropdownButton>
              ))}
            </div>
          ))}
        </div>
      </Dropdown.Content>
    </Dropdown.Root>
  )
};

