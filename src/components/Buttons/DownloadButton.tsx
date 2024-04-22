import { useCallback, useMemo, useRef } from 'react';

import { Button } from '@/components/Primitives/Button';
import { Icon } from '@/components/Primitives/Icons';
import { Tooltip } from '@/components/Primitives/Tooltip';
import { DownloaderProps, DownloadState, useDownloader } from '@/hooks/useDownloader';
import { cn, nanoid, noop } from '@/utils/utils';

const getColorFromState = (state: DownloadState) => {
  switch (state) {
    case 'idle':
      return 'primary';
    case 'pending':
      return 'accent';
    case 'success':
      return 'green';
    case 'error':
      return 'red';
  }
};

const getTooltipMessageFromState = (state: DownloadState) => {
  switch (state) {
    case 'idle':
      return 'Download';
    case 'pending':
      return 'Downloading...';
    case 'success':
      return 'Downloaded';
    case 'error':
      return 'Error';
  }
};

export interface DownloadButtonProps extends DownloaderProps {
  className?: string;
  onClick?: (e: any) => void;
  tooltip?: boolean;
  id?: string;
}

export const DownloadButton = (props: DownloadButtonProps) => {
  const { id = `${nanoid()}`, className = '', onClick: onClickCallback = noop, tooltip = false } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { downloader, downloadPercentage, status } = useDownloader(props);

  const onClick = useCallback(
    (e: any) => {
      downloader.mutate();
      onClickCallback?.(e);
    },
    [onClickCallback, downloader],
  );

  const DownloadButton = useMemo(
    () => (
      <Button ref={buttonRef} onClick={onClick} variant={'none'} className={cn('rounded-full h-8 w-8 p-2 relative hover:bg-primary/30', className)}>
        {status === 'pending' || status === 'error' ? (
          <div className={cn(`absolute w-full h-full text-${getColorFromState(status)}-500 left-0 top-0`)}>
            <Icon
              set="Custom"
              icon="Spinner"
              id={`download-spinner-${id}`}
              className={cn('absolute inset-0 flex items-center justify-center text-xs w-full h-full')}
              percentage={downloadPercentage.toFixed(2)}
              active={status !== 'error'}
              color={getColorFromState(status)}
            />
            {status !== 'error' && <div className="flex items-center justify-center h-full w-auto leading-[0.5rem] text-[0.50rem] tracking-tight">{`${Math.round(Number(downloadPercentage))}%`}</div>}
            {status === 'error' && <div className="flex items-center justify-center h-8 w-8 text-base">!</div>}
          </div>
        ) : (
          <Icon set="Carbon" icon="Download" className="h-8 w-8" />
        )}
        <span className="sr-only">Copy</span>
      </Button>
    ),
    [onClick, className, status, id, downloadPercentage],
  );

  return tooltip ? <Tooltip content={getTooltipMessageFromState(status)}>{DownloadButton}</Tooltip> : DownloadButton;
};
