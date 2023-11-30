/* eslint-disable @next/next/no-img-element */
'use client'

import { Accordion, BulletedList } from '@/components';
import { useFlowEventsRecorder, useFlowExtractor } from '@/hooks';
import { FlowTab } from './shared';
import { useCallback } from 'react';
import { UseQueryOptions, useQuery } from 'react-query';
import { Erroring, Loading, cn } from '@/utils';

export interface FlowStateTabProps {
  imageQueryOptions?: UseQueryOptions;
  textQueryOptions?: UseQueryOptions;
};
export const FlowStateTab = (props: FlowStateTabProps) => {
  const {
    imageQueryOptions = {
      cacheTime: 0,
      refetchInterval: 100,
    },
    textQueryOptions = {
      cacheTime: 0,
      refetchInterval: 100,
    },
    ...rest
  } = props;
  const flowExtractor = useFlowExtractor();
  
  const { data: flowImage, isLoading: flowImageLoading, isError: flowImageError } = useQuery<any>({
    queryKey: ['flowImage'], 
    queryFn: flowExtractor.fetchImage,
    enabled: flowExtractor.imageConfig.enabled,
    ...imageQueryOptions,
  });
  const { data: flowText, isLoading: flowTextLoading, isError: flowTextError } = useQuery<any>({
    queryKey: ['flowText'], 
    queryFn: flowExtractor.fetchText,
    enabled: flowExtractor.textConfig.enabled,
    ...textQueryOptions,
  });

  const FlowImage = useCallback(() => {
    if (flowImageError) return <Erroring>{flowImageError || 'No Nodes for Image'}</Erroring>;
    if (!flowImage) return <div className="text-primary/80 px-2 py-4">No Image</div>;
    return (
      <div className={cn(`will-change-contents flex flex-col w-full h-full justify-center items-center flex-shrink-0 w-[${flowExtractor.imageConfig.width}px] h-[${flowExtractor.imageConfig.height}px]`)}>
        {flowImageLoading ? <Loading /> : (<img src={flowImage} alt="Flow Image" width={flowExtractor.imageConfig.width} height={flowExtractor.imageConfig.height} className={cn(`object-contain w-[${flowExtractor.imageConfig.width}px] h-[${flowExtractor.imageConfig.height}px] p-4`)} />)}
      </div>
    );
  }, [flowImageError, flowImage, flowExtractor.imageConfig.width, flowExtractor.imageConfig.height, flowImageLoading]);

  const FlowText = useCallback(() => {
    if (flowTextLoading) return <Loading />;
    if (flowTextError) return <Erroring>{flowTextError}</Erroring>;
    if (!flowText) return <div className="text-primary/80 px-2 py-4 justify-center items-center">No Text</div>;
    return <BulletedList items={flowText.split('\n')} />;
  }, [flowTextLoading, flowTextError, flowText]);

  return (
    <FlowTab title="State" {...rest}>
      <div className="flex flex-col gap-1 w-full h-auto overflow-auto justify-center items-center transition-all will-change-contents duration-500 ease-in-out">
        <div className="flex text-primary/80 text-xs font-bold underline justify-center text-center items-center">Image:</div>
        {/* <FlowImage /> */}
        <div className="w-[100px] h-[100px] flex justify-center items-center bg-black">blank image</div>
        <div className="flex text-primary/80 text-xs font-bold underline justify-center text-center items-center">Text:</div>
        <FlowText />
      </div>
    </FlowTab>
  )
};
FlowStateTab.displayName = 'FlowStateTab';
