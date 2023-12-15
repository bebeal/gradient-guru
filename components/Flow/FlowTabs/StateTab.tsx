'use client';

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Accordion, BulletedList, Form } from '@/components';
import { useContentExtractor, useContentRecorder } from '@/hooks';
import { cn } from '@/utils';
import { FlowTab, TabTitle, ToggleTitle } from './shared';

export interface StateTabProps {}

export const StateTab = (props: StateTabProps) => {
  const { ...rest } = props;
  const [flowText, setFlowText] = useState<string | null>(null);
  const [flowImage, setFlowImage] = useState<string | null>(null);
  const { historyRecords } = useContentRecorder();
  const { fetchImage, imageConfig, setImageConfig, fetchText, textConfig, setTextConfig, getImageSchema, getTextSchema } = useContentExtractor();
  const previousLength = useRef(historyRecords.length);

  const refetchImage = useCallback(() => {
    fetchImage().then((dataurl: any) => {
      if (dataurl === null) return;
      setFlowImage(dataurl);
    });
  }, [fetchImage]);

  const refetchText = useCallback(() => {
    fetchText().then((text: string | null) => {
      if (text === null) return;
      setFlowText(text);
    });
  }, [fetchText]);

  useEffect(() => {
    if (historyRecords.length > previousLength.current) {
      refetchImage();
      refetchText();
      previousLength.current = historyRecords.length;
    }
  }, [historyRecords.length, refetchImage, refetchText]);

  const FlowImageAccordion = useCallback(() => {
    const { enabled, ...config } = imageConfig;
    const hasConfig = Object.keys(config).length > 0;
    return {
      name: <ToggleTitle title="Image Preview" pressed={imageConfig.enabled} onPressedChange={(enabled: boolean) => setImageConfig({ ...imageConfig, enabled })} />,
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-center items-center`)}>
          {hasConfig && (
            <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
              <TabTitle className={cn(`text-md w-full`)}>Controls</TabTitle>
              <Form object={config} schema={getImageSchema()} onSubmit={(newImageConfig: any) => setImageConfig({ ...imageConfig, ...newImageConfig })} />
            </div>
          )}
          <div className="flex flex-wrap flex-col w-full justify-center items-center gap-1">
            {hasConfig && <TabTitle className={cn(`text-md w-full`)}>Image</TabTitle>}
            <div className={cn('relative flex h-[200px] w-full overflow-hidden p-2 flex-shrink-0 flex-col items-center justify-center')}>
              {flowImage ? (
                <div
                  className="flex w-full h-full justify-center items-center overflow-hidden"
                  style={{
                    transform: `scale(${imageConfig.scale})`,
                  }}
                >
                  <img src={flowImage} width="auto" height="100%" className="w-auto h-full object-fill" alt="Flow image" />
                </div>
              ) : (
                <div className="flex w-full h-full overflow-hidden justify-center items-center">No Image</div>
              )}
            </div>
          </div>
        </div>
      ),
      open: true,
    };
  }, [flowImage, imageConfig, getImageSchema, setImageConfig]);

  const FlowTextAccordion = useCallback(() => {
    const { enabled, ...config } = textConfig;
    const hasConfig = Object.keys(config).length > 0;
    return {
      name: <ToggleTitle title="Extracted Text" pressed={textConfig.enabled} onPressedChange={(enabled: boolean) => setTextConfig({ ...textConfig, enabled })} />,
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-center items-center`)}>
          {hasConfig && (
            <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
              <TabTitle className={cn(`text-md w-full`)}>Controls</TabTitle>
              <Form object={config} schema={getTextSchema()} onSubmit={(newTextConfig: any) => setTextConfig({ enabled: textConfig.enabled, ...newTextConfig })} />
            </div>
          )}
          <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
            {hasConfig && <TabTitle className={cn(`text-md w-full`)}>Text From Nodes</TabTitle>}
            {!flowText ? <div className="items-center justify-center px-2 py-4 text-primary/80">No Text</div> : <BulletedList items={flowText.split('\n')} />}
          </div>
        </div>
      ),
      open: true,
    };
  }, [textConfig, getTextSchema, flowText, setTextConfig]);

  return (
    <FlowTab title="State" {...rest}>
      <Accordion spaceBetween={16} className="w-full text-xs p-1" triggerClassName="w-full flex justify-center items-center" items={[FlowTextAccordion(), FlowImageAccordion()]} />
    </FlowTab>
  );
};
StateTab.displayName = 'StateTab';
