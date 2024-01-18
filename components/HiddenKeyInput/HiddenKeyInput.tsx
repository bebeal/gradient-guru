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
		<div className={cn(
      `w-full flex flex-col items-center justify-center pointer-events-none text-[var(--color-text-0)] z-[var(--layer-panels)]`,
    )}>
			<div className={cn(`flex text-xs flex-row w-full rounded-lg p-1 max-w-[308px] gap-1 bg-[var(--color-low)] pointer-events-auto [border:4px_solid_var(--color-background)]`)}>
				<div className={cn(
          `relative flex-grow-[2]`,
          `after:pointer-events-none`,
          `[&:not(:focus-within)]:after:flex [&:not(:focus-within)]:after:absolute [&:not(:focus-within)]:after:items-center [&:not(:focus-within)]:after:text-xs [&:not(:focus-within)]:after:opacity-100 [&:not(:focus-within)]:after:content-["API_Key"] [&:not(:focus-within)]:after:inset-0 [&:not(:focus-within)]:after:p-[0px_12px] [&:not(:focus-within)]:after:z-[999999] [&:not(:focus-within)]:after:bg-none`
        )}>
					<input
            id="api-key"
            className="rounded text-transparent bg-[var(--color-panel)] w-full h-8 focus:text-[var(--color-text-0)]"
						defaultValue={localStorage.getItem(localStorageKey) ?? ''}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						spellCheck={false}
						autoCapitalize="off"
					/>
				</div>
				<a
					className="text-primary w-8 h-8 p-[7px] rounded flex items-center justify-center pointer-events-auto cursor-pointer bg-none overflow-hidden"
					target="_blank"
					href="https://tldraw.notion.site/Make-Real-FAQs-93be8b5273d14f7386e14eb142575e6e?pvs=4"
				>
					{cooldown ? <IconSetCache.Carbon.Checkmark className="h-full w-auto" /> : <IconSetCache.Carbon.Help className="h-full w-auto" />}
				</a>
			</div>
		</div>
	)
};
