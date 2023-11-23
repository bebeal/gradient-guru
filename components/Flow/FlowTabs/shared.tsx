import { Separator } from "@/components";

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
