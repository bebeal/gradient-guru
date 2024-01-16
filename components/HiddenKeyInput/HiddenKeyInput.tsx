import { ChangeEvent, useCallback, useState } from "react";
import { IconSetCache } from "..";
import { cn } from "@/utils";

export interface HiddenKeyInputProps {
  localStorageKey?: string;
}

export const HiddenKeyInput = (props: HiddenKeyInputProps) => {
  const {
    localStorageKey="gg_api_key",
  } = props;
  const [cooldown, setCooldown] = useState<boolean>(false);

  	// Store the API key locally
	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		localStorage.setItem(localStorageKey, e.target.value)
	}, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
			e.currentTarget.blur();
			setCooldown(true);
			setTimeout(() => setCooldown(false), 1200);
		}
	}, [])

  return (
		<div className={cn(`w-full flex items-center justify-center text-[var(--color-text-0)] focus:text-[var(--color-text-0)]`)}>
			<div className={cn(`w-full flex items-center justify-center bg-[var(--color-low)] rounded gap-1 border-[4px_solid_var(--color_background)] max-w-[308px]`)}>
				<div className={cn(`relative flex-grow-[2] after:pointer-events-none [&:not(:focus-within)]:after:content-["API Key"] [&:not(:focus-within)]:after:absolute [&:not(:focus-within)]:after:inset-0 [&:not(:focus-within)]:after:flex [&:not(:focus-within)]:after:items-center [&:not(:focus-within)]:after:p-[0px_12px] [&:not(:focus-within)]:after:z-[99999] [&:not(:focus-within)]:after:bg-none`)}>
					<input
						id="openai_key_risky_but_cool"
						defaultValue={localStorage.getItem(localStorageKey) ?? ''}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						spellCheck={false}
						autoCapitalize="off"
					/>
				</div>
				<a
					className="flex items-center justify-center rounded bg-none w-8 h-8 flex-shrink-0 cursor-pointer"
					target="_blank"
					href="https://tldraw.notion.site/Make-Real-FAQs-93be8b5273d14f7386e14eb142575e6e?pvs=4"
				>
					{cooldown ? <IconSetCache.Carbon.Checkmark /> : <IconSetCache.Carbon.Help />}
				</a>
			</div>
		</div>
	)
};
