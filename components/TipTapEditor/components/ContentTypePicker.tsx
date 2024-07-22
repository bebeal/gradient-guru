import { Icon } from "@/components/Primitives/Icons/Icon"
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { useMemo } from "react"
import { DropdownButton, DropdownCategoryTitle } from "../extensions/MenuList"
import { TipTapToolbar } from "../TipTapToolbar"

export type ContentTypePickerOption = {
  label: string
  id: string
  type: 'option'
  disabled: () => boolean
  isActive: () => boolean
  onClick: () => void
  icon?: string;
  set?: string;
}

export type ContentTypePickerCategory = {
  label: string
  id: string
  type: 'category'
}

export type ContentPickerOptions = Array<ContentTypePickerOption | ContentTypePickerCategory>

export type ContentTypePickerProps = {
  options: ContentPickerOptions
}

const isOption = (option: ContentTypePickerOption | ContentTypePickerCategory): option is ContentTypePickerOption =>
  option.type === 'option'
const isCategory = (option: ContentTypePickerOption | ContentTypePickerCategory): option is ContentTypePickerCategory =>
  option.type === 'category'

export const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
  const activeItem = useMemo(() => options.find(option => option.type === 'option' && option.isActive()), [options])

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <TipTapToolbar.Button active={activeItem?.id !== 'paragraph' && !!activeItem?.type}>
          <Icon set="Lucide" icon={(activeItem?.type === 'option' && activeItem.icon) || 'Pilcrow'} />
          <Icon set="Carbon" icon="ChevronDown" className="w-2 h-2" />
        </TipTapToolbar.Button>
      </Dropdown.Trigger>
      <Dropdown.Content asChild>
        <div className="flex flex-col gap-1 px-2 py-4 bg-white rounded-lg dark:bg-black">
          {options.map(option => {
            if (isOption(option)) {
              return (
                <DropdownButton key={option.id} onClick={option.onClick} isActive={option.isActive()}>
                  <Icon name={option.icon} className="w-4 h-4 mr-1" />
                  {option.label}
                </DropdownButton>
              )
            } else if (isCategory(option)) {
              return (
                <div className="mt-2 first:mt-0" key={option.id}>
                  <DropdownCategoryTitle key={option.id}>{option.label}</DropdownCategoryTitle>
                </div>
              )
            }
          })}
        </div>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
