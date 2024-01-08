'use client'

import { IconSetCache } from "@/components";
import { cn } from "@/utils";
import { Portal } from "@radix-ui/react-portal";

export const TldrawLogoButton = (props: any) => {
  const {
    className,
    ...rest
  } = props;
  const twitterLink = 'https://twitter.com/tldraw';
  const siteLink = 'https://www.tldraw.com/';
  const githubLink = 'https://github.com/tldraw/tldraw';
  const discordLink = 'https://discord.com/invite/s4FXZ6fppJ';

  return (
    <Portal>
      <div className="absolute flex items-center justify-end w-full h-4 text-primary rounded shadow-md bottom-[45px] right-2">
        <a href={githubLink} target="_blank" rel="noopener noreferrer" className="flex w-auto h-full text-primary">
          <IconSetCache.Logos.Tldraw height="100%" className={cn("w-full h-full", className)} {...rest} />
        </a>
      </div>
    </Portal>
  )
};
