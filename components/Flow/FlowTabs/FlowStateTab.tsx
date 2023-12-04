/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useState } from 'react';
import { Accordion, BulletedList, Form, Switch } from '@/components';
import { ImageConfig, useFlowExtractor, useMounted } from '@/hooks';
import { cn } from '@/utils';
import { FlowTab, TabTitle, UnderlinedTitle } from './shared';
import { useEditor } from '@tldraw/editor';

export interface FlowStateTabProps {
}

export const FlowStateTab = (props: FlowStateTabProps) => {
  const {
    ...rest
  } = props;
  const [flowText, setFlowText] = useState<string | null>(null);
  const [flowImage, setFlowImage] = useState<string | null>(null);
  const editor = useEditor();
  const mounted = useMounted();

  const {
    fetchImage,
    imageConfig,
    setImageConfig,
    fetchText,
    textConfig,
    setTextConfig,
    getImageSchema,
    getTextSchema,
  } = useFlowExtractor();
  const imageSchema = getImageSchema();
  const textSchema = getTextSchema();

  const refetchImage = useCallback(() => {
    fetchImage().then((dataurl: any) => {
      if (dataurl === null) return;
      URL.revokeObjectURL(dataurl);
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
    editor.on('change', () => {
      refetchImage();
      refetchText();
    });
    return () => {
      editor.off('change', () => {
        refetchImage();
        refetchText();
      });
    }
  }, [editor, refetchImage, refetchText]);

  useEffect(() => {
    if (mounted) {
      refetchImage();
      refetchText();
    }
  }, [mounted, refetchImage, refetchText]);

  const onSubmit = useCallback((newImageConfig: Partial<ImageConfig>) => {
    setImageConfig({ ...imageConfig, ...newImageConfig });
  }, [imageConfig, setImageConfig]);

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
              <Form object={controls} schema={imageSchema} onSubmit={onSubmit} />
            </div>
          )}
          <div className="flex flex-wrap flex-col w-full justify-center items-center gap-1">
            {Object.keys(controls).length > 0 && <TabTitle className={cn(`text-md w-full`)}>Image</TabTitle>}
            <div className={cn("relative flex h-[200px] w-full overflow-hidden p-2 flex-shrink-0 flex-col items-center justify-center")}>
              {flowImage 
                ? (<div 
                      className="flex w-full h-full justify-center items-center overflow-hidden"
                      style={{
                        transform: `scale(${imageConfig.scale})`
                      }}
                    >
                      <img
                        src={flowImage}
                        width="auto"
                        height="100%"
                        className="w-auto h-full object-fill"
                        alt="Flow image"
                      />
                    </div>)
                : (<div className="flex w-full h-full overflow-hidden justify-center items-center">No Image</div>)
              }
            </div>
          </div>
        </div>
      ),
      open: true,
    };
  }, [flowImage, imageConfig, imageSchema, onSubmit, setImageConfig]);

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
              <Form object={controls} schema={textSchema} onSubmit={(newTextConfig: any) => setTextConfig({ enabled: textConfig.enabled, ...newTextConfig })} />
            </div>
          )}
          <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
          {Object.keys(controls).length > 0 && <TabTitle className={cn(`text-md w-full`)}>Text From Nodes</TabTitle>}
            {!flowText ? (
              <div className="items-center justify-center px-2 py-4 text-primary/80">No Text</div>
            ) : (<BulletedList items={flowText.split('\n')} />)
          }
          </div>
        </div>
      ),
      open: true,
    };
  }, [textConfig, textSchema, flowText, setTextConfig]);

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
