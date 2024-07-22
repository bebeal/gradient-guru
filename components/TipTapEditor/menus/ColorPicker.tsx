import { Icon } from "@/components/Primitives/Icons/Icon"
import { memo, useCallback, useState } from "react"
import { HexColorPicker } from 'react-colorful'
import { themeColors } from "../constants"
import { TipTapToolbar } from "../TipTapToolbar"
import { cn } from "@/utils/utils"

export type ColorButtonProps = {
  color?: string
  active?: boolean
  onColorChange?: (color: string) => void // eslint-disable-line no-unused-vars
}

export const ColorButton = memo(({ color, active, onColorChange }: ColorButtonProps) => {
  const wrapperClassName = cn(
    'flex items-center justify-center px-1.5 py-1.5 rounded group',
    !active && 'hover:bg-neutral-100',
    active && 'bg-neutral-100',
  )
  const bubbleClassName = cn(
    'w-4 h-4 rounded bg-slate-100 shadow-sm ring-offset-2 ring-current',
    !active && `hover:ring-1`,
    active && `ring-1`,
  )

  const handleClick = useCallback(() => {
    if (onColorChange) {
      onColorChange(color || '')
    }
  }, [onColorChange, color])

  return (
    <button onClick={handleClick} className={wrapperClassName}>
      <div style={{ backgroundColor: color, color: color }} className={bubbleClassName}></div>
    </button>
  )
})

ColorButton.displayName = 'ColorButton'


export type ColorPickerProps = {
  color?: string
  onChange?: (color: string) => void
  onClear?: () => void
}

export const ColorPicker = ({ color, onChange, onClear }: ColorPickerProps) => {
  const [colorInputValue, setColorInputValue] = useState(color || '')

  const handleColorUpdate = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setColorInputValue(event?.target?.value);
  }, []);

  const handleColorChange = useCallback(() => {
    const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(colorInputValue);

    if (!isCorrectColor) {
      if (onChange) {
        onChange('');
      }

      return undefined;
    }

    if (onChange) {
      onChange(colorInputValue);
    }
  }, [colorInputValue, onChange]);

  return (
    <div className="flex flex-col gap-2">
      <HexColorPicker className="w-full" color={color || ''} onChange={onChange} />
      <input
        type="text"
        className="w-full p-2 text-black bg-white border rounded dark:bg-black dark:text-white border-neutral-200 dark:border-neutral-800 focus:outline-1 focus:ring-0 focus:outline-neutral-300 dark:focus:outline-neutral-700"
        placeholder="#000000"
        value={colorInputValue}
        onChange={handleColorUpdate}
        onBlur={handleColorChange}
      />
      <div className="flex flex-wrap items-center gap-1 max-w-[15rem]">
        {themeColors.map(currentColor => (
          <ColorButton
            active={currentColor === color}
            color={currentColor}
            key={currentColor}
            onColorChange={onChange}
          />
        ))}
        <TipTapToolbar.Button tooltip="Reset color to default" onClick={onClear}>
          <Icon set="Lucide" icon="Undo" />
        </TipTapToolbar.Button>
      </div>
    </div>
  )
}
