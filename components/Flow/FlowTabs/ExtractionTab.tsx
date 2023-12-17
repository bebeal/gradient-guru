'use client';

import { Accordion, FlipCard, FlowTab, Form, ToggleTitle } from '@/components';
import { useContentExtractor, useContentRecorder } from '@/hooks';
import { TLShapeId, useEditor } from '@tldraw/tldraw';
import { cn } from '@/utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const ExtractionTab = () => {
  const {
    imageExtractorConfig, getImageExtractorSchema, getImagePreview,
    jsonExtractorConfig, getJSONExtractorSchema,
    textExtractorConfig, getTextExtractorSchema,
    canvasExtractorConfig, getCanvasStateExtractorSchema,
    uiExtractorConfig, getUiStateExtractorSchema,
    getNodesToExcludeSchema, setExtractorConfig
  } = useContentExtractor();
  const {
    historyRecords
  } = useContentRecorder();
  const editor = useEditor();
  const [imagePreview, setImagePreview] = useState<any>()
  const previousLength = useRef(historyRecords.length);
  const [mounted, setMounted] = useState(false);

  const fetchImage = useCallback(() => {
    getImagePreview().then((value: string | null) => {
      if (value) {
        setImagePreview((prev: any) => {
          if (prev) {
            URL.revokeObjectURL(prev);
          }
          return value;
        });
      }
    });
  }, [getImagePreview]);

  useEffect(() => {
    if (historyRecords.length > previousLength.current) {
      fetchImage();
      previousLength.current = historyRecords.length;
    }
  }, [fetchImage, getImagePreview, historyRecords.length]);

  useEffect(() => {
    if (!mounted) {
      fetchImage();
      setMounted(true);
    }
  }, [fetchImage, mounted]);

  const ImageExtraction = useMemo(() => {
    return (
      <FlipCard
        className={cn(imageExtractorConfig.enabled && `border-accent`)}
        title={<ToggleTitle name="Image Extraction Preview" pressed={imageExtractorConfig.enabled} onPressedChange={(enabled: boolean) => setExtractorConfig('imageExtractorConfig', { ...imageExtractorConfig, enabled })} />}
        front={{
          children: (
            <div className={cn(`flex flex-col gap-1`)}>
              <Form object={imageExtractorConfig} schema={getImageExtractorSchema()} onSubmit={(newImageConfig: any) => setExtractorConfig('imageExtractorConfig', newImageConfig)} />
              <Accordion
                className='px-2'
                items={[
                  {
                    name: 'Nodes Filter',
                    content: <Form object={Array.from(editor.getCurrentPageShapeIds() || {}).reduce((obj, item) => ({ ...obj, [item]: imageExtractorConfig.nodesToExclude?.includes(item) }), {})} schema={getNodesToExcludeSchema()} onSubmit={(newNodesToExclude: any) => {
                      const nodesToExclude = Object.keys(newNodesToExclude || {}).filter((nodeId: any) => newNodesToExclude[nodeId]) as TLShapeId[];
                      setExtractorConfig('imageExtractorConfig', { ...imageExtractorConfig, nodesToExclude });
                    }} />
                  }
                ]}
              />
            </div>
          )
        }}
        back={{
          children: imagePreview ? <div className="flex w-full h-[200px] justify-center items-center overflow-hidden rounded border border-primary transition-all"><img src={imagePreview} width="auto" height="100%" className="w-auto h-full object-fill rounded" alt="Flow image" /></div> :  <div className="flex w-full h-full justify-center items-center">No Image</div>
        }}
      />
    )
  }, [imageExtractorConfig, getImageExtractorSchema, editor, getNodesToExcludeSchema, imagePreview, setExtractorConfig]);

  const JSONExtraction = useMemo(() => {
    return (
      <FlipCard
        className={cn(``, jsonExtractorConfig.enabled && `border-accent`)}
        title={<ToggleTitle name="JSON Extraction" pressed={jsonExtractorConfig.enabled} onPressedChange={(enabled: boolean) => setExtractorConfig('jsonExtractorConfig', { ...jsonExtractorConfig, enabled })} />}
        front={{
          children: <Form object={jsonExtractorConfig} schema={getJSONExtractorSchema()} onSubmit={(newJsonConfig: any) => setExtractorConfig('jsonExtractorConfig', newJsonConfig)} />
        }}
        back={{
          children: <Form object={jsonExtractorConfig.nodesToExclude} schema={getNodesToExcludeSchema()} onSubmit={(newNodesToExclude: any) => setExtractorConfig('jsonExtractorConfig', { ...jsonExtractorConfig, nodesToExclude: newNodesToExclude })} />
        }}
      />
    )
  }, [getJSONExtractorSchema, getNodesToExcludeSchema, jsonExtractorConfig, setExtractorConfig]);

  const TextExtraction = useMemo(() => {
    return (
      <FlipCard
        className={cn(textExtractorConfig.enabled && `border-accent`)}
        title={<ToggleTitle name="Text Extraction" pressed={textExtractorConfig.enabled} onPressedChange={(enabled: boolean) => setExtractorConfig('textExtractorConfig', { ...textExtractorConfig, enabled })} />}
        front={{
          children: <Form object={textExtractorConfig} schema={getTextExtractorSchema()} onSubmit={(newTextConfig: any) => setExtractorConfig('textExtractorConfig', newTextConfig)} />
        }}
        back={{
          children: <Form object={textExtractorConfig.nodesToExclude} schema={getNodesToExcludeSchema()} onSubmit={(newNodesToExclude: any) => setExtractorConfig('textExtractorConfig', { ...textExtractorConfig, nodesToExclude: newNodesToExclude })} />
        }}
      />
    )
  }, [getNodesToExcludeSchema, getTextExtractorSchema, setExtractorConfig, textExtractorConfig]);

  const CanvasStateExtraction = useMemo(() => {
    return (
      <FlipCard
        className={cn(canvasExtractorConfig.enabled && `border-accent`)}
        title={<ToggleTitle name="Canvas State Extraction" pressed={canvasExtractorConfig.enabled} onPressedChange={(enabled: boolean) => setExtractorConfig('canvasExtractorConfig', { ...canvasExtractorConfig, enabled })} />}
        front={{
          children: <Form object={canvasExtractorConfig} schema={getCanvasStateExtractorSchema()} onSubmit={(newCanvasConfig: any) => setExtractorConfig('canvasExtractorConfig', newCanvasConfig)} />
        }}
      />
    )
  }, [canvasExtractorConfig, getCanvasStateExtractorSchema, setExtractorConfig]);

  const uiStateExtraction = useMemo(() => {
    return (
      <FlipCard
        className={cn(uiExtractorConfig.enabled && `border-accent`)}
        title={<ToggleTitle name="UI State Extraction" pressed={uiExtractorConfig.enabled} onPressedChange={(enabled: boolean) => setExtractorConfig('uiExtractorConfig', { ...uiExtractorConfig, enabled })} />}
        front={{
          children: <Form object={uiExtractorConfig} schema={getUiStateExtractorSchema()} onSubmit={(newUiConfig: any) => setExtractorConfig('uiExtractorConfig', newUiConfig)} />
        }}
      />
    )
  }, [getUiStateExtractorSchema, setExtractorConfig, uiExtractorConfig]);

  return (
    <FlowTab title="Extraction">
      <div className="flex flex-col justify-center gap-4 w-full h-auto">
        {ImageExtraction}
        {JSONExtraction}
        {TextExtraction}
        {CanvasStateExtraction}
        {uiStateExtraction}
      </div>
    </FlowTab>
  );
};
ExtractionTab.displayName = 'ExtractionTab';
