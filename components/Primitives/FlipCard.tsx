'use client'

import { ReactNode, useCallback, useState } from 'react';
import { Button, IconSetCache } from '@/components';
import { cn } from '@/utils';

export interface CardSideProps {
  className?: string;
  title?: ReactNode | string;
  children?: ReactNode;
}

export interface FlipCardProps {
  front?: CardSideProps;
  back?: CardSideProps;
  onFlip?: () => void;
  className?: string;
}

export const Side = (props: CardSideProps) => {
  const { className = '', children } = props;
  return <div className={cn(`flex flex-col gap-2 w-full h-auto overflow-auto`, className)}>{children}</div>;
};

export const FlipCard = (props: FlipCardProps) => {
  const { front, back, className = '', onFlip } = props;
  const [flipped, setFlipped] = useState(Boolean(back && !front));

  const flip = useCallback(() => {
    setFlipped(!flipped);
    onFlip?.();
  }, [flipped, onFlip]);

  const FlipButton = useCallback(() => {
    return (
      <Button variant={'none'} onClick={flip} className={cn(`rounded bg-transparent text-secondary hover:bg-muted hover:text-primary h-full absolute right-0 p-1`)}>
        <IconSetCache.Carbon.Undo className="h-auto w-auto" />
      </Button>
    );
  }, [flip]);

  return (
    <div
      className={cn(
        `relative flex flex-col w-full h-auto overflow-hidden justify-center items-center rounded py-2 bg-primary border border-primary text-primary shadow-xl transition-all anim-duration-300 ease-out [transform-style:preserve-3d] [perspective:1000px]`,
        flipped && `[transform:rotateY(180deg)]`,
        className
      )}
    >
      <div className={cn(`relative flex flex-col w-full h-auto gap-1 border-inherit border-b pb-1`)}>
        <div className={cn(`relative pointer-events-auto flex w-full h-full justify-center p-2`, flipped && `[transform:rotateY(-180deg)]`)}>
          <div className={cn(`font-bold text-base text-center w-full h-auto self-center break-words`)}>{flipped ? back?.title : front?.title}</div>
          {flipped ? front && <FlipButton /> : back && <FlipButton />}
        </div>
      </div>
      {flipped ? <Side {...back} className={cn('[transform:rotateY(-180deg)]', back?.className)} /> : <Side {...front} />}
    </div>
  );
};
