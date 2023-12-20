'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, HoverCard, IconSetCache } from "@/components";
import { cn } from "@/utils";

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  tooltip?: string;
  tooltipSuccess?: string;
}

export const CopyButton = ({
  value,
  tooltip = 'Copy',
  tooltipSuccess = 'Copied!',
  className,
  ...rest
}: CopyButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [tooltipMessage, setTooltipMessage] = useState<string>(tooltip);
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const [animationKey, setAnimationKey] = useState<number>(0);

  useEffect(() => {
    let timeout: any;
    if (hasCopied) {
      timeout = setTimeout(() => {
        setHasCopied(false);
        setTooltipMessage(tooltip);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [hasCopied, tooltip]);

  const onClick = useCallback(async (event: any) => {
    event.preventDefault();
    if (!navigator.clipboard) {
      console.error('Clipboard API not available');
      return;
    }
    await navigator.clipboard.writeText(value);
    setHasCopied(true);
    setTooltipMessage(tooltipSuccess);
    setAnimationKey((prev) => prev + 1);
  }, [tooltipSuccess, value]);

  const CopyButton = useMemo(() => {
    return (
      <Button
        ref={buttonRef}
        variant="none"
        className={cn(
          "relative flex items-center justify-center h-6 w-6 text-primary hover:bg-secondary rounded shadow-2xl outline-none z-[50]",
          className
        )}
        onClick={onClick}
        {...rest}
      >
        <div key={animationKey} className={cn("flex items-center justify-center h-6 w-6", hasCopied ? "animate-scale-up" : "animate-none",)}>
          <span className="sr-only">Copy</span>
          {hasCopied ? <IconSetCache.Custom.CopySuccess className="text-accent" /> : <IconSetCache.Carbon.Copy className="text-primary" />}
        </div>
      </Button>
    );
  }, [animationKey, className, hasCopied, onClick, rest]);

  return tooltip ? (
    <HoverCard content={tooltipMessage}>
      {CopyButton}
    </HoverCard>
  ) : CopyButton;
};
