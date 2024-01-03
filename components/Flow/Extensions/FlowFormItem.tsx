'use client';

import { forwardRef } from 'react';
import { Badge } from '@radix-ui/themes';
import { DataModality, Models } from '@/clients/Models';
import { DefaultFormItem, FormFields, IconSetCache, Select } from "@/components";
import { cn } from "@/utils";

const ModalityColors: Record<DataModality, { variant: "solid" | "soft" | "surface" | "outline", color: "tomato" | "red" | "ruby" | "crimson" | "pink" | "plum" | "purple" | "violet" | "iris" | "indigo" | "blue" | "cyan" | "teal" | "jade" | "green" | "grass" | "brown" | "orange" | "sky" | "mint" | "lime" | "yellow" | "amber" | "gold" | "bronze" | "gray" }> = {
  text: {
    variant: 'surface',
    color: 'sky',
  },
  image: {
    variant: 'surface',
    color: 'green',
  },
  audio: {
    variant: 'surface',
    color: 'red',
  },
  video: {
    variant: 'surface',
    color: 'yellow',
  },
};


const CompactBadge = ({ modality, className, animate=false }: { modality: DataModality; className?: string, animate?: boolean }) => {
  return (
    <div className={cn(`h-auto w-auto text-${ModalityColors[modality].color}`, "flex justify-center items-center relative rounded")}>
    <span className={cn(`block h-2.5 w-2.5 rounded-full bg-${ModalityColors[modality].color} text-${ModalityColors[modality].color} border-black border border-opacity-30`, 
          animate && `after:animate-ripple after:content-[""] after:rounded-full after:w-full after:h-full after:left-0 after:top-0 after:absolute after:text-${ModalityColors[modality].color} after:border-2 after:border-current after:translate-x-1/2 after:translate-y-1/2`,
          className
        )}
    />
    </div>
  )
}

export const DataModalityBadge = ({ modality, className, compact=false, animate=false }: { modality: DataModality; className?: string, compact?: boolean, animate?: boolean }) => {

  if (compact) {
    return (
      <CompactBadge modality={modality} animate={animate} className="p-1 after:p-0" />
    )
  }
  return (
    <Badge
      variant={ModalityColors[modality].variant}
      color={ModalityColors[modality].color}
      size={'1'}
      className={cn('!relative !text-[8px] text-center justify-center items-center flex gap-1 flex-row oveflow-hidden !h-full !w-auto', className)}
    >
      <CompactBadge modality={modality} />
      {modality}
    </Badge>
  )
};


export const FlowFormItem = forwardRef<any, any>((props, ref) => {
  const { field, schema, placeholder, readOnly, form, item, className='' } = props;

  if (item === 'node-schema') {
    return (
      <div className={cn("w-full h-full grid grid-cols-1 col-span-2 gap-1 overflow-auto rounded items-center")}><FormFields form={form} schema={schema} prefix={`${field?.name}.`} readOnly={readOnly} ItemRenderer={FlowFormItem} /></div>
    );
  } else if (item === 'modality') {
    const values = form.getValues();
    const modalities = values?.modalities;
    // for the content I want compact versions for teh trigger I want the full version
    const compact = schema?.spec?.meta?.compact || false;
    if (compact) {
      // 4x4 GRID
      return (
        <div className={cn("grid grid-cols-2 gap-1 w-auto h-full px-1 justify-center items-center", modalities.length > 2 && `grid-rows-2` )}>
          {modalities?.map((modality: any) => {
            return (<DataModalityBadge key={modality} modality={modality as any} compact={true} />);
          })}
        </div>
      );
    } else {
      // 2x2 GRID
      return (
        <div className={cn("grid grid-cols-2 gap-1 w-auto h-full px-1 justify-center items-center", modalities.length > 2 && `grid-rows-2`)}>
          {modalities?.map((modality: any) => {
            return (<DataModalityBadge key={modality} modality={modality as any} />);
          })}
        </div>
      );
    }
  } else if (item === 'client') {
    const values = form.getValues();
    const client_name = values?.client_name;
    let icon = <></>;
    if (client_name === 'Open AI') {
      icon = <IconSetCache.Logos.OpenAI height={"auto"} className={cn("flex rounded w-auto h-[16px] text-primary")}/>;
    }
    return (
      <div className="flex flex-row items-center justify-center text-primary gap-1 w-full h-auto px-2">
        {icon}
        <div className={cn(`flex  w-auto leading-none h-full`)}>Open AI</div>
      </div>
    );
  } else if (item === 'model') {
    const values = form.getValues();
    const client_name = values?.client_name;
    let betterItems: any[] = Array.from(schema?._whitelist);
    if (client_name === 'Open AI') {
      betterItems = betterItems.map((model: string) => {
        const modelFromMap = Models[model];
        const modalities = modelFromMap?.modalities || [];
        
        const DataModalitiesBadges = (
          <div className={cn(`grid grid-cols-2 gap-3 ml-2 h-auto`, modalities.length > 2 && `grid-rows-2`)}>
            {modalities.map((modality: DataModality) => (
              <DataModalityBadge key={modality} modality={modality} compact={true} />
            ))}
          </div>
        );
  
        return { 
          value: model,
          children: (
            <div className="flex flex-row justify-start items-center text-xs text-center text-primary gap-2 w-auto h-full p-2 py-1"><IconSetCache.Logos.OpenAI height={"auto"} width={"100%"} className={cn("flex p-[3px] rounded w-[24px] h-[24px]", model.includes('gpt-3') && 'bg-[#19c37d]', model.includes('gpt-4') && 'bg-[#ab68ff]' )}/> <div className={cn(`flex h-full w-auto leading-none items-center`)}>{model}{DataModalitiesBadges}</div></div>
          ),
          className: 'justify-start'
        }
      });
    }
    return (<Select className={className} items={betterItems} {...field} readOnly={readOnly} />);
  }
 return <DefaultFormItem ref={ref} {...props} />;
});
FlowFormItem.displayName = 'FlowFormItem';