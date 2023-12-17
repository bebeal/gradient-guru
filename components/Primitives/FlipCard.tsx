import { ReactNode, useCallback, useState } from 'react';
import { Button, IconSetCache } from '@/components';
import { cn } from '@/utils';

export interface CardSideProps {
  className?: string;
  title?: ReactNode | string;
  children?: ReactNode;
}

export interface FlipCardProps {
  title?: ReactNode | string;
  front?: CardSideProps;
  back?: CardSideProps;
  className?: string;
}

export const FlipCard = (props: FlipCardProps) => {
  const { front, back, title, className = '' } = props;
  const [flipped, setFlipped] = useState(Boolean(back && !front));

  const flip = useCallback(() => {
    setFlipped(!flipped);
  }, [flipped]);

  const FlipButton = useCallback(() => {
    return (
      <Button variant={'none'} onClick={flip} className={cn(`rounded bg-transparent text-secondary hover:bg-muted hover:text-primary self-center absolute right-0 p-1`)}>
        <IconSetCache.Carbon.Undo className="h-auto w-auto" />
      </Button>
    );
  }, [flip]);

  const Side = useCallback((props: CardSideProps) => {
      const { className = '', children } = props;
      return (
        <div className={cn(`flex flex-col gap-2 w-full h-full`, className)}>
          <div className={cn(`flex w-auto h-auto text-sm`)}>{children}</div>
        </div>
      );
  }, [] );

  return (
    <div
      className={cn(
        `flex flex-col w-full h-auto justify-center items-center rounded py-2 px-1 bg-primary border border-primary text-primary shadow-xl transition-all duration-300 ease-out [transform-style:preserve-3d] [perspective:1000px]`,
        flipped && `[transform:rotateY(180deg)]`,
        className
      )}
    >
      <div className={cn(`relative pointer-events-auto flex flex-row w-full h-auto items-center p-2`, flipped && `[transform:rotateY(-180deg)]`)}>
          <div className={cn(`font-bold text-base flex-grow text-center items-center w-full`)}>{title}</div>
          {flipped ? front && <FlipButton /> : back && <FlipButton />}
        </div>
      {flipped ? <Side {...back} className="[transform:rotateY(-180deg)]" /> : <Side {...front} />}
    </div>
  );
};
