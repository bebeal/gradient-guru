'use client';

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from 'react';
import { TLStoreEventInfo, useEditor } from '@tldraw/editor';
import { Accordion, BulletedList, Form } from '@/components';
import { useContentExtractor } from '@/hooks';
import { cn } from '@/utils';
import { FlowTab, TabTitle, ToggleTitle } from './shared';
import { debounce } from 'lodash';

export interface StateTabProps {}

export const StateTab = (props: StateTabProps) => {
  const { ...rest } = props;
  const [flowText, setFlowText] = useState<string | null>(null);
  const [flowImage, setFlowImage] = useState<string | null>(null);
  const editor = useEditor();
  const [mounted, setMounted] = useState(false);

  const { fetchImage, imageConfig, setImageConfig, fetchText, textConfig, setTextConfig, getImageSchema, getTextSchema } = useContentExtractor();
  const imageSchema = getImageSchema();
  const textSchema = getTextSchema();

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

  const isShapeEvent = useCallback((event: TLStoreEventInfo) => {
    const checkRecords = (records: any) => {
      for (const record of Object.values(records) as any) {
        if (record.typeName === 'shape') {
          return true;
        }
      }
      return false;
    };

    const { added, removed, updated } = event.changes;

    return checkRecords(added) || checkRecords(removed) || Object.values(updated).some(([from, to]: any) => from.typeName === 'shape' && to.typeName === 'shape');
  }, []);

  useEffect(() => {
    editor.on('change', (e: any) => {
      if (e.source === 'user' && isShapeEvent(e)) {
        if (flowImage) {
          URL.revokeObjectURL(flowImage);
        }
        refetchImage();
        refetchText();
      }
    });
    return () => {
      editor.off('change');
    };
  }, [editor, flowImage, isShapeEvent, refetchImage, refetchText]);

  useEffect(() => {
    if (!mounted) {
      refetchImage();
      refetchText();
      setMounted(true);
    }
  }, [mounted, refetchImage, refetchText]);

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
              <Form object={config} schema={imageSchema} onSubmit={(newImageConfig: any) => setImageConfig({ ...imageConfig, ...newImageConfig })} />
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
  }, [flowImage, imageConfig, imageSchema, setImageConfig]);

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
              <Form object={config} schema={textSchema} onSubmit={(newTextConfig: any) => setTextConfig({ enabled: textConfig.enabled, ...newTextConfig })} />
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
  }, [textConfig, textSchema, flowText, setTextConfig]);

  return (
    <FlowTab title="State" {...rest}>
      <Accordion spaceBetween={16} className="w-full text-xs p-1" triggerClassName="w-full flex justify-center items-center" items={[FlowTextAccordion(), FlowImageAccordion()]} />
    </FlowTab>
  );
};
StateTab.displayName = 'StateTab';
