/* eslint-disable @next/next/no-img-element */
'use client'

import { Accordion, BulletedList, Switch } from '@/components';
import { useFlowEventsRecorder, useFlowExtractor } from '@/hooks';
import { FlowTab, UnderlinedTitle } from './shared';
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

  const FlowImageAccordion = useCallback(() => {
    return {
      name: (
        <UnderlinedTitle className={cn(`flex w-full relative h-full py-1 pointer-events-auto z-[1000]`)}>
          <Switch
            asChild
            pressed={flowExtractor.imageConfig.enabled}
            onPressedChange={(pressed: boolean) => flowExtractor.setImageConfig({ ...flowExtractor.imageConfig, enabled: pressed })}
            className='absolute left-0'
          ><div/></Switch>
          Image
        </UnderlinedTitle>
      ),
      content: (
        <div className={cn(`w-full h-full flex justify-center items-center`)}>
          <FlowImage />
        </div>
      ),
      open: true,
    }
  }, [FlowImage, flowExtractor]);

  const FlowTextAccordion = useCallback(() => {
    return {
      name: (
        <UnderlinedTitle className={cn(`flex w-full relative h-full py-1 pointer-events-auto z-[1000]`)}>
          <Switch
            asChild
            pressed={flowExtractor.textConfig.enabled}
            onPressedChange={(pressed: boolean) => flowExtractor.setTextConfig({ ...flowExtractor.textConfig, enabled: pressed })}
            className='absolute left-0'
          ><div/></Switch>
          Text
        </UnderlinedTitle>
      ),
      content: (
        <div className={cn(`w-full h-full flex justify-center items-center`)}>
          <FlowText />
        </div>
      ),
      open: true,
    }
  }, [FlowText, flowExtractor]);

  return (
    <FlowTab title="State" {...rest}>
      <Accordion 
        spaceBetween={16}
        className="text-xs w-full"
        radius={'xlarge'}
        triggerClassName='w-full flex justify-center items-center'
        items={[
          FlowImageAccordion(),
          FlowTextAccordion(),
        ]}
      />
    </FlowTab>
  )
};
FlowStateTab.displayName = 'FlowStateTab';
