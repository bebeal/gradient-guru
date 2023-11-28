'use client'

import { FC, useState } from 'react';
import { FileType, cn, getFormattedSize } from "@/utils";
import { FakeForm, HoverCard, IconSetCache } from '@/components';

export interface DirectoryTreeProps {
  name?: string;
  size?: number;
  type?: FileType;
  children?: DirectoryTreeProps[];
  level?: number;
  initialOpen?: boolean;
  isLast?: boolean;
  tooltip?: boolean;
};

export const DirectoryTree: FC<DirectoryTreeProps> = (props: DirectoryTreeProps) => {
  const { name, size: baseSize=0, type='file', children=[], level = 0, initialOpen=children !== undefined && children?.length > 0, isLast=true, tooltip = true, ...rest } = props;

  const [isOpen, setIsOpen] = useState(initialOpen);
  const [size, setSize] = useState(getFormattedSize(baseSize));
  const isDirectory = children.length > 0 || type === 'directory';

  const toggleOpen = () => {
    if (isDirectory) {
      setIsOpen(!isOpen);
    }
  };

  const getIcon = (props?: any) => {
    if (isDirectory) {
      return isOpen ? <IconSetCache.Custom.OpenFolder {...props} /> : <IconSetCache.Custom.Folder {...props} />;
    } else {
      return type === 'zipped' ? <IconSetCache.Custom.ZippedFile {...props} /> : <IconSetCache.Custom.File {...props} />;
    }
  };

  const getMetaDataTooltip = (children?: any) => {
    const filterOut = ['children', 'isLast', 'tooltip', 'size'];
    const filteredProps = Object.keys(props)
      .filter((key: string) => !filterOut.includes(key))
      .reduce((obj: any, key: string) => {
        obj[key] = (props as Record<string, any>)[key];
        return obj;
      } , {});
    
    filteredProps['num children'] = props['children']?.length || 0;
    filteredProps['size'] = size;
    return (
      <HoverCard openDelay={500} closeDelay={0} clickToDismiss content={<FakeForm object={filteredProps} />}>
        {children}
      </HoverCard>
    );
  };

  const CurrentChild = () => {
    const child = (
      <div className="ml-[16px] flex gap-1 w-full h-auto items-center justify-start">
        <div>{getIcon()}</div>
        <div className="flex w-full">{name}</div>
      </div>
    );
    return tooltip && Object.keys(props).length !== 0 ? getMetaDataTooltip(child) : child;
  }

  return (
    <div className="flex flex-col w-full h-full text-base">
      <div 
        className={cn('relative flex items-center justify-between gap-1 h-auto w-full', 
                    { 'hover:underline cursor-pointer': isDirectory })} 
        onClick={toggleOpen}
      >
        <div className={cn(`absolute h-full flex w-auto`,
                           `before:content-[""] before:absolute before:left-[0.25rem] before:top-[50%] before:w-[8px] before:h-[1px] before:bg-gray-400`,
                           `after:content-[""] after:absolute after:top-[0] after:bottom-0 after:left-[0.25rem] after:h-full after:w-[1px] after:bg-gray-400`,
                           { 'after:h-[50%]': isLast },
        )} />
        <CurrentChild />
        {baseSize > 0 && <div className="flex w-full h-full items-start justify-end text-[0.5rem] text-gray-400">{size}</div>}
      </div>
      {isDirectory && isOpen &&
        <div className={cn("relative w-auto h-auto")}>
          {!isLast && <div className={cn(`absolute h-full flex w-auto`, `after:content-[""] after:absolute after:top-[0] after:left-[0.25rem] after:h-full after:w-[1px] after:bg-gray-400`)} />}
          <ul className={cn(`flex flex-col ml-[18px] w-auto h-auto list-none`)}>
            {children.map((child, index) => {
              return (
                <li key={index} className={cn(
                  `flex flex-col w-auto h-auto`,
                )}>
                  <DirectoryTree {...child} level={level + 1} isLast={index === children.length - 1} tooltip={tooltip} />
                </li>
              )
            })}
          </ul>
        </div>
      }
    </div>
  );
};
