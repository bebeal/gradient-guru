'use client'

import { DataModality, Models } from "@/clients";
import { DataModalityBadge, DefaultFormItem, FormFields, IconSetCache, Select } from "@/components";
import { cn } from "@/utils";
import { forwardRef } from "react";

export const FlowFormItem = forwardRef<any, any>((props, ref) => {
  const { field, schema, placeholder, readOnly, form, item, className='' } = props;

  if (item === 'node-schema') {
    return (
      <div className={"w-full h-full grid grid-cols-1 col-span-2 gap-1 overflow-auto rounded items-center"}><FormFields form={form} schema={schema} prefix={`${field?.name}.`} readOnly={readOnly} ItemRenderer={FlowFormItem} /></div>
    );
  } else if (item === 'modality') {
    const values = form.getValues();
    const modalities = values?.modalities;
    // for the content I want compact versions for teh trigger I want the full version
    const compact = schema?.spec?.meta?.compact || false;
    if (compact) {
      // 4x4 GRID
      return (
        <div className="grid grid-cols-2 grid-rows-2 gap-1 w-auto h-auto p-1">
          {modalities?.map((modality: any) => {
            return (<DataModalityBadge key={modality} modality={modality as any} compact={true} />);
          })}
        </div>
      );
    } else {
      // 2x2 GRID
      return (
        <div className="grid grid-cols-2 grid-rows-2 gap-1 w-auto h-auto p-1">
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
      icon = <IconSetCache.Logos.OpenAI height={"auto"} className={cn("flex p-[3px] rounded w-[24px] h-[24px] text-primary")}/>;
    }
    return (
      <div className="flex flex-row items-center justify-center text-primary gap-1 w-full h-full p-3">
        {icon}
        <div className={cn(`flex h-auto w-auto leading-none `)}>Open AI</div>
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
          <div className="grid grid-cols-2 grid-rows-2 gap-3 ml-2">
            {modalities.map((modality: DataModality) => (
              <DataModalityBadge key={modality} modality={modality} compact={true} />
            ))}
          </div>
        );
  
        return { 
          value: model,
          children: (
            <div className="flex flex-row justify-start items-center text-center text-primary gap-2 w-auto h-full p-2"><IconSetCache.Logos.OpenAI height={"auto"} width={"100%"} className={cn("flex p-[3px] rounded w-[24px] h-[24px]", model.includes('gpt-3') && 'bg-[#19c37d]', model.includes('gpt-4') && 'bg-[#ab68ff]' )}/> <div className={cn(`flex h-full w-auto leading-none items-center`)}>{model}{DataModalitiesBadges}</div></div>
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
