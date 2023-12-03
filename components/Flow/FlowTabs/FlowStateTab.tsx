/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Accordion, BulletedList, FakeForm, Switch } from '@/components';
import { useFlowExtractor } from '@/hooks';
import { cn } from '@/utils';
import { FlowTab, TabTitle, UnderlinedTitle } from './shared';
import { useEditor } from '@tldraw/editor';

export interface FlowStateTabProps {
}

export const FlowStateTab = (props: FlowStateTabProps) => {
  const {
    ...rest
  } = props;
  const editor = useEditor();
  const [recordsCount, setRecordsCount] = useState<number>(0);
  const [flowText, setFlowText] = useState<string | null>(null);
  const flowImageRef = useRef<HTMLDivElement | null>(null);
  const {
    fetchImage,
    imageConfig,
    setImageConfig,
    fetchText,
    textConfig,
    setTextConfig,
    extractHistoryRecords
  } = useFlowExtractor();

  useEffect(() => {
    const newRecords = extractHistoryRecords();
    if (recordsCount != newRecords.length) {
      fetchImage().then((image: any) => {
        if (image && flowImageRef.current) {
          flowImageRef.current.innerHTML = '';
          flowImageRef.current?.appendChild(image);
        }
      });
      fetchText().then((text: string | null) => {
        setFlowText(text);
      });
      setRecordsCount(newRecords.length);
    }
  }, [extractHistoryRecords, fetchImage, fetchText, recordsCount]);

  const FlowImageAccordion = useCallback(() => {
    const { enabled, ...controls } = imageConfig;
    return {
      name: (
        <UnderlinedTitle className={cn(`pointer-events-auto relative z-[1000] flex h-full w-full py-0.5`)}>
          <Switch
            asChild
            pressed={imageConfig.enabled}
            onPressedChange={(pressed: boolean) =>
              setImageConfig({ ...imageConfig, enabled: pressed })
            }
            className="absolute left-0"
          >
            <div />
          </Switch>
          Image
        </UnderlinedTitle>
      ),
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-center items-center`)}>
          {Object.keys(controls).length > 0 && (
            <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
              <TabTitle className={cn(`text-md w-full`)}>Controls</TabTitle>
              <FakeForm object={controls} />
            </div>
          )}
          <div className="flex flex-wrap flex-col w-full justify-center items-center">
            <TabTitle className={cn(`text-md w-full`)}>Image</TabTitle>
            <div
              className={cn(
                `flex h-[200px] w-full overflow-hidden p-1 flex-shrink-0 flex-col items-center justify-center will-change-contents`
              )}
            >
              <div ref={flowImageRef} className={cn(`flex w-full h-full overflow-hidden justify-stetch items-stetch [&>svg]:w-full [&>svg]:h-full border border-primary`)} />
            </div>
          </div>
        </div>
      ),
      open: true,
    };
  }, [flowImageRef, imageConfig, setImageConfig]);

  const FlowTextAccordion = useCallback(() => {
    const { enabled, ...controls } = textConfig;
    return {
      name: (
        <UnderlinedTitle className={cn(`pointer-events-auto relative z-[1000] flex h-full w-full py-0.5`)}>
          <Switch
            asChild
            pressed={textConfig.enabled}
            onPressedChange={(pressed: boolean) =>
              setTextConfig({ ...textConfig, enabled: pressed })
            }
            className="absolute left-0"
          >
            <div />
          </Switch>
          Text
        </UnderlinedTitle>
      ),
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-center items-center`)}>
          {Object.keys(controls).length > 0 && (
            <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
              <TabTitle className={cn(`text-md w-full`)}>Controls</TabTitle>
              <FakeForm object={controls} />
            </div>
          )}
          <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
            <TabTitle className={cn(`text-md w-full`)}>Text From Nodes</TabTitle>
            {!flowText ? (
              <div className="items-center justify-center px-2 py-4 text-primary/80">No Text</div>
            ) : (<BulletedList items={flowText.split('\n')} />)
          }
          </div>
        </div>
      ),
      open: true,
    };
  }, [flowText, textConfig, setTextConfig]);

  return (
    <FlowTab title="State" {...rest}>
      <Accordion
        spaceBetween={16}
        className="w-full text-xs"
        triggerClassName="w-full flex justify-center items-center"
        items={[FlowTextAccordion(), FlowImageAccordion()]}
      />
    </FlowTab>
  );
};
FlowStateTab.displayName = 'FlowStateTab';
