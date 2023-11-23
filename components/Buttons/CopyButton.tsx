'use client'

import { useEffect, useState } from "react"
import { Button, IconSetCache, Tooltip } from "@/components";
import { cn } from "@/utils";

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  src?: string;
  tooltip?: string;
  tooltipSuccess?: string;
}

export const copyToClipboard = async (value: string) => {
  navigator.clipboard.writeText(value)
};

export const CopyButton = ({
  value,
  src,
  tooltip='Copy',
  tooltipSuccess='Copied!',
  className,
  ...rest
}: CopyButtonProps) => {
  const [tooltipMessage, setTooltipMessage] = useState<string>(tooltip || '');
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
      setTooltipMessage(tooltip || '');
    }, 2000)
  }, [hasCopied, tooltip]);

  const onClick = async () => {
    await copyToClipboard(value);
    setHasCopied(true);
    if (tooltipSuccess && tooltipSuccess?.length > 0) {
      setTooltipMessage(tooltipSuccess);
    }
  };

  const copyButton = (
    <Button
      variant="ghost"
      className={cn(
        "relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50",
        hasCopied ? "animate-scale-up" : "animate-none",
        className
      )}
      onClick={onClick}
      {...rest}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <IconSetCache.Carbon.CopySuccess className="text-accent" /> : <IconSetCache.Carbon.Copy className="" />}
    </Button>
  );

  return (
    tooltip && tooltip?.length > 0 ?
    (
      <Tooltip content={tooltipMessage}>
        {copyButton}
      </Tooltip>
    )
    : copyButton
  );
};
