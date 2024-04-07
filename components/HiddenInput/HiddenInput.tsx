'use client'

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Icon } from "@/components";
import { cn } from "@/utils";

export interface HiddenInputProps {
  localStorageKey?: string;
  onChange?: (key: string) => void;
	value?: string;
}

export const HiddenInput = (props: HiddenInputProps) => {
  const {
    localStorageKey="gg_api_key",
    onChange,
		value,
  } = props;
  const [cooldown, setCooldown] = useState<boolean>(false);
	const [defaultValue, setDefaultValue] = useState<string | undefined>(value);

  // Store the API key locally
	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(localStorageKey, e.target.value);
			onChange?.(e.target.value);
		}
	}, [localStorageKey, onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
			e.currentTarget.blur();
			setCooldown(true);
			setTimeout(() => setCooldown(false), 1200);
		}
	}, []);

	useEffect(() => {
		if  (typeof window !== 'undefined') {
			setDefaultValue((currentDefaultValue) => {
				if (!currentDefaultValue) {
					return localStorage.getItem(localStorageKey) ?? ''
				}
				return currentDefaultValue;
			});
		}
	}, [localStorageKey]);

  return (
		<div className={cn(
      `w-full flex flex-col items-center justify-center pointer-events-none text-secondary z-[var(--layer-overlays)]`,
    )}>
			<div className={cn(`flex text-xs flex-row w-full rounded-lg p-1 max-w-[308px] gap-1 bg-[rgb(var(--background-tertiary))] pointer-events-auto [border:1px_solid_rgb(var(--background-tertiary))]`)}>
				<div className={cn(
          `relative flex-grow-[2]`,
          `after:pointer-events-none`,
          `[&:not(:focus-within)]:after:flex [&:not(:focus-within)]:after:absolute [&:not(:focus-within)]:after:items-center [&:not(:focus-within)]:after:text-xs [&:not(:focus-within)]:after:px-2 [&:not(:focus-within)]:after:py-3 [&:not(:focus-within)]:after:opacity-100 [&:not(:focus-within)]:after:content-["(Hidden)"] [&:not(:focus-within)]:after:inset-0 [&:not(:focus-within)]:after:z-[999999] [&:not(:focus-within)]:after:bg-none`
        )}>
					<input
            id="api-key"
						value={value}
            className="rounded text-transparent bg-primary w-full h-8 focus:text-primary px-2 py-3 overflow-x-auto"
						defaultValue={defaultValue}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						spellCheck={false}
            autoComplete="off"
						autoCapitalize="off"
					/>
				</div>
				<a
					className="text-primary w-8 h-8 p-[7px] rounded flex items-center justify-center pointer-events-auto cursor-pointer bg-none overflow-hidden"
					target="_blank"
					href="https://tldraw.notion.site/Make-Real-FAQs-93be8b5273d14f7386e14eb142575e6e?pvs=4"
				>
					{cooldown ? <Icon set="Carbon" icon="Checkmark" className="h-full w-auto" /> : <Icon set="Carbon" icon="Help" className="h-full w-auto" />}
				</a>
			</div>
		</div>
	);
};
