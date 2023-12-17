import { memo } from 'react';
import { Form, Label, Separator, Switch } from '@/components';
import { cn, isEmptyObject } from '@/utils';

export const TabClasses = `w-full h-full flex flex-col p-2 gap-2`;

export const TabTitle = ({ title, children, className }: { title?: string; children?: any; className?: string }) => {
  const titleText: string = title || children || '';
  return (
    <div className={cn('flex flex-col w-full gap-1 justify-center items-center text-base', className)}>
      <div className="text-primary font-bold w-auto h-auto flex justify-center items-center gap-1">{titleText}</div>
      <Separator />
    </div>
  );
};

export const FlowTab = memo(({ title, children, className }: { title?: string; children?: any; className?: string }) => {
  return (
    <div className={cn(TabClasses)}>
      <TabTitle title={title} />
      <div className={cn('p-2 flex flex-col w-auto h-full items-center gap-1', className)}>{children}</div>
    </div>
  );
});

export const Title = ({ children, className }: { children?: any; className?: string }) => {
  return <div className={cn('flex w-auto h-auto font-bold justify-center text-center items-center gap-2', className)}>{children}</div>;
};

export const BulletedList = ({ items, className }: { items: any[]; className?: string }) => {
  const getItem = (item: any) => {
    if (typeof item === 'object' && item !== null && !Array.isArray(item) && !isEmptyObject(item)) {
      const key: any = Object.keys(item)[0];
      const value = item[key];
      return (
        <div className={cn('flex flex-col', className)}>
          <Label className="text-xs text-primary font-bold">{key}</Label>
          <Form object={value} readOnly={true} className="p-1" />
        </div>
      );
    } else {
      return item;
    }
  };

  return (
    <ul role="list" className="relative w-full h-full break-words pl-6 pr-2 py-2 list-inside">
      {items.map((item: any, index: number) => {
        return (
          <li key={`ui-event-${index}`} className="relative flex items-center m-0 p-0 before:content-[''] before:absolute before:left-[-10px] before:top-[6px] before:w-1 before:h-1 before:bg-white before:rounded-full">
            {getItem(item)}
          </li>
        );
      })}
    </ul>
  );
};

export const ToggleTitle = ({ pressed, onPressedChange, name }: any) => {
  return (
    <div className={cn(`pointer-events-auto relative flex h-full w-full gap-1 justify-center items-center`)}>
      <Switch pressed={pressed} onPressedChange={onPressedChange} className="absolute left-0">
        <div />
      </Switch>
      <div className="font-bold justify-self-center text-sm pl-4">{name}</div>
    </div>
  );
};
