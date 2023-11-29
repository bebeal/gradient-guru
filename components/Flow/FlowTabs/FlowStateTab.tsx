/* eslint-disable @next/next/no-img-element */
'use client'

import { Accordion, BulletedList } from '@/components';
import { FlowStateExtractorProps, defaultFlowStateExtractorProps, useFlowEventsRecorder, useFlowStateExtractor } from '@/hooks';
import { FlowTab } from './shared';
import { useCallback } from 'react';
import { UseQueryOptions, useQuery } from 'react-query';
import { Erroring, Loading, cn } from '@/utils';

export interface FlowStateTabProps extends FlowStateExtractorProps {
  imageQueryOptions?: UseQueryOptions;
  textQueryOptions?: UseQueryOptions;
};
export const FlowStateTab = (props: FlowStateTabProps) => {
  const {
    nodesConfig=defaultFlowStateExtractorProps.nodesConfig!,
    imageConfig=defaultFlowStateExtractorProps.imageConfig!,
    textConfig=defaultFlowStateExtractorProps.textConfig!,
    eventsConfig=defaultFlowStateExtractorProps.eventsConfig!,
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
  const flowStateExtractor = useFlowStateExtractor({
    nodesConfig,
    imageConfig,
    textConfig,
    eventsConfig,
  });
  
  const { data: flowImage, isLoading: flowImageLoading, isError: flowImageError } = useQuery<any>({
    queryKey: ['flowImage'], 
    queryFn: flowStateExtractor.fetchImage,
    enabled: imageConfig.enabled,
    ...imageQueryOptions,
  });
  const { data: flowText, isLoading: flowTextLoading, isError: flowTextError } = useQuery<any>({
    queryKey: ['flowText'], 
    queryFn: flowStateExtractor.fetchText,
    enabled: textConfig.enabled,
    ...textQueryOptions,
  });

  const FlowImage = useCallback(() => {
    if (flowImageError) return <Erroring>{flowImageError || 'No Nodes for Image'}</Erroring>;
    if (!flowImage) return <div className="text-primary/80 px-2 py-4">No Image</div>;
    return (
      <div className={cn(`will-change-contents flex flex-col w-full h-full justify-center items-center flex-shrink-0 w-[${imageConfig.width}px] h-[${imageConfig.height}px]`)}>
        {flowImageLoading ? <Loading /> : (<img src={flowImage} alt="Flow Image" width={imageConfig.width} height={imageConfig.height} className={cn(`object-contain w-[${imageConfig.width}px] h-[${imageConfig.height}px] p-4`)} />)}
      </div>
    );
  }, [flowImageLoading, flowImageError, flowImage, imageConfig]);

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
        <FlowImage />
        <div className="flex text-primary/80 text-xs font-bold underline justify-center text-center items-center">Text:</div>
        <FlowText />
      </div>
    </FlowTab>
  )
};
FlowStateTab.displayName = 'FlowStateTab';
