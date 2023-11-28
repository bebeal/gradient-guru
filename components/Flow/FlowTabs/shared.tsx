import { FakeForm, Label, Separator } from "@/components";
import { isEmptyObject } from "@/utils";

export const TabClasses = `w-full h-full flex flex-col p-2 overflow-auto gap-2`;

export const TabTitle = ({title, children}: {title?: string, children?: any}) => {
  const titleText: string = title || children || '';
  return (
    <div className="flex flex-col w-full gap-1 justify-center items-center">
      <div className="text-lg text-primary font-bold">{titleText}</div>
      <Separator />
    </div>
  );
};

export const FlowTab = ({title, children}: {title?: string, children?: any}) => {
  return (
    <div className={TabClasses}>
      <TabTitle title={title} />
      <div className="p-2">
        {children}
      </div>
    </div>
  );
};

export const BulletedList = ({items}: {items: any[]}) => {
  const getItem = (item: any) => {
    if (
      typeof item === 'object' &&
      item !== null &&
      !Array.isArray(item) &&
      !isEmptyObject(item)
    ) {
      const key: any = Object.keys(item)[0]
      const value = item[key]
      return (
        <div className="flex flex-col">
          <Label className="text-xs text-primary font-bold">{key}</Label>
          <FakeForm object={value} className="p-1" />
        </div>
      )
    } else {
      return item
    }
  }

  return (
    <ul role="list" className="relative w-full h-full break-words pl-6 pr-2 py-2 list-inside">
    {items.map((item: any, index: number) => {
      return (
        <li key={`ui-event-${index}`} className="relative flex items-center m-0 p-0 before:content-[''] before:absolute before:left-[-10px] before:top-[6px] before:w-1 before:h-1 before:bg-white before:rounded-full">
          {getItem(item)}
        </li>
      )
    })}
  </ul>
  )
};
