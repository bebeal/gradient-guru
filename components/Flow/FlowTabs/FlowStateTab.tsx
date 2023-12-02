/* eslint-disable @next/next/no-img-element */

import { useCallback } from 'react';
import { UseQueryOptions, useQuery } from 'react-query';
import { Accordion, BulletedList, Switch } from '@/components';
import { useFlowExtractor } from '@/hooks';
import { Erroring, Loading, cn } from '@/utils';
import { FlowTab, UnderlinedTitle } from './shared';

/* eslint-disable @next/next/no-img-element */

export interface FlowStateTabProps {
  imageQueryOptions?: UseQueryOptions;
  textQueryOptions?: UseQueryOptions;
}
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

  // const {
  //   data: flowImage,
  //   isLoading: flowImageLoading,
  //   isError: flowImageError,
  // } = useQuery<any>({
  //   queryKey: ['flowImage'],
  //   queryFn: flowExtractor.fetchImage,
  //   enabled: flowExtractor.imageConfig.enabled,
  //   ...imageQueryOptions,
  // });
  const {
    data: flowText,
    isLoading: flowTextLoading,
    isError: flowTextError,
  } = useQuery<any>({
    queryKey: ['flowText'],
    queryFn: flowExtractor.fetchText,
    enabled: flowExtractor.textConfig.enabled,
    ...textQueryOptions,
  });

  // const FlowImage = useCallback(() => {
  //   if (flowImageError) return <Erroring>{flowImageError || 'No Nodes for Image'}</Erroring>;
  //   if (!flowImage) return <div className="px-2 py-4 text-primary/80">No Image</div>;
  //   return (
  //     <div
  //       className={cn(
  //         `flex h-full w-full flex-shrink-0 flex-col items-center justify-center will-change-contents w-[${flowExtractor.imageConfig.width}px] h-[${flowExtractor.imageConfig.height}px]`
  //       )}
  //     >
  //       {flowImageLoading ? (
  //         <Loading />
  //       ) : (
  //         <img
  //           src={flowImage}
  //           alt="Flow Image"
  //           width={flowExtractor.imageConfig.width}
  //           height={flowExtractor.imageConfig.height}
  //           className={cn(
  //             `object-contain w-[${flowExtractor.imageConfig.width}px] h-[${flowExtractor.imageConfig.height}px] p-4`
  //           )}
  //         />
  //       )}
  //     </div>
  //   );
  // }, [flowImageError, flowImage, flowExtractor.imageConfig.width, flowExtractor.imageConfig.height, flowImageLoading]);

  const FlowText = useCallback(() => {
    if (flowTextLoading) return <Loading />;
    if (flowTextError) return <Erroring>{flowTextError}</Erroring>;
    if (!flowText) return <div className="items-center justify-center px-2 py-4 text-primary/80">No Text</div>;
    return <BulletedList items={flowText.split('\n')} />;
  }, [flowTextLoading, flowTextError, flowText]);

  // const FlowImageAccordion = useCallback(() => {
  //   return {
  //     name: (
  //       <UnderlinedTitle className={cn(`pointer-events-auto relative z-[1000] flex h-full w-full py-0.5`)}>
  //         <Switch
  //           asChild
  //           pressed={flowExtractor.imageConfig.enabled}
  //           onPressedChange={(pressed: boolean) =>
  //             flowExtractor.setImageConfig({ ...flowExtractor.imageConfig, enabled: pressed })
  //           }
  //           className="absolute left-0"
  //         >
  //           <div />
  //         </Switch>
  //         Image
  //       </UnderlinedTitle>
  //     ),
  //     content: (
  //       <div className={cn(`flex h-full w-full items-center justify-center`)}>
  //         <FlowImage />
  //       </div>
  //     ),
  //     open: true,
  //   };
  // }, [FlowImage, flowExtractor]);

  const FlowTextAccordion = useCallback(() => {
    return {
      name: (
        <UnderlinedTitle className={cn(`pointer-events-auto relative z-[1000] flex h-full w-full py-0.5`)}>
          <Switch
            asChild
            pressed={flowExtractor.textConfig.enabled}
            onPressedChange={(pressed: boolean) =>
              flowExtractor.setTextConfig({ ...flowExtractor.textConfig, enabled: pressed })
            }
            className="absolute left-0"
          >
            <div />
          </Switch>
          Text
        </UnderlinedTitle>
      ),
      content: (
        <div className={cn(`flex h-full w-full items-center justify-center`)}>
          <FlowText />
        </div>
      ),
      open: true,
    };
  }, [FlowText, flowExtractor]);

  return (
    <FlowTab title="State" {...rest}>
      <Accordion
        spaceBetween={16}
        className="w-full text-xs"
        triggerClassName="w-full flex justify-center items-center"
        items={[FlowTextAccordion()]}
      />
    </FlowTab>
  );
};
FlowStateTab.displayName = 'FlowStateTab';
