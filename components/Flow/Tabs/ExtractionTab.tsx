'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TLShapeId, useEditor } from '@tldraw/tldraw';
import { Accordion, FlipCard, FlowFormItem, FlowTab, Form, ImageWithSizeIndicator, ToggleTitle } from '@/components';
import { useContentExtractor, useContentRecorder } from '@/hooks';
import { cn } from '@/utils';

export const ExtractionTab = () => {
  const {
    imageExtractorConfig,
    getImageExtractorSchema,
    getImagePreview,
    nodesExtractorConfig,
    extractNodes,
    getNodesExtractorSchema,
    canvasExtractorConfig,
    getCanvasStateExtractorSchema,
    uiExtractorConfig,
    getUiStateExtractorSchema,
    getNodesToExcludeSchema,
    setExtractorConfig,
  } = useContentExtractor();
  const [imageExtractionTabSide, setImageExtractionTabSide] = useState<'Image Extraction Config' | 'Image Extraction Preview'>('Image Extraction Config');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [nodesExtractionTabSide, setJsonExtractionTabSide] = useState<'Nodes Extraction Config' | 'Nodes Extraction Preview'>('Nodes Extraction Config');
  const [nodesPreview, setNodesPreview] = useState<any | null>(null);
  const [canvasExtractionTabSide, setCanvasExtractionTabSide] = useState<'Canvas State Extraction Config' | 'Canvas State Extraction Preview'>('Canvas State Extraction Config');
  const [uiExtractionTabSide, setUiExtractionTabSide] = useState<'UI State Extraction Config' | 'UI State Extraction Preview'>('UI State Extraction Config');
  const { canvasState, uiState, historyRecords } = useContentRecorder();
  const editor = useEditor();
  const [mounted, setMounted] = useState(false);
  const previousLength = useRef(historyRecords.length);

  const onFlip = useCallback((tabSide: any, setTabSide: any) => {
    if (tabSide.includes('Config')) {
      setTabSide(tabSide.replace('Config', 'Preview'));
    } else {
      setTabSide(tabSide.replace('Preview', 'Config'));
    }
  }, []);

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

  const fetchNodes = useCallback(() => {
    extractNodes().then((value: any) => {
      setNodesPreview(value);
    });
  }, [extractNodes]);

  // refetch image when config changes
  useEffect(() => {
    fetchImage();
  }, [fetchImage, imageExtractorConfig]);

  useEffect(() => {
    fetchNodes();
  }, [fetchNodes, nodesExtractorConfig]);

  // refetch image when history changes, indicating shape was updated/added/removed
  useEffect(() => {
    if (historyRecords.length > previousLength.current) {
      fetchImage();
      previousLength.current = historyRecords.length;
    }
  }, [fetchImage, historyRecords.length]);

  // fetch content on mount
  useEffect(() => {
    if (!mounted && editor) {
      fetchNodes();
      fetchImage();
      setMounted(true);
    }
  }, [editor, fetchImage, fetchNodes, mounted]);

  const ImageExtraction = useMemo(() => {
    return (
      <FlipCard
        onFlip={() => onFlip(imageExtractionTabSide, setImageExtractionTabSide)}
        className={cn(imageExtractorConfig.enabled && `border-accent`)}
        title={<ToggleTitle name={imageExtractionTabSide} pressed={imageExtractorConfig.enabled} onPressedChange={(enabled: boolean) => setExtractorConfig('imageExtractorConfig', { enabled })} />}
        front={{
          children: (
            <div className={cn(`flex flex-col gap-1 w-full`)}>
              <Form object={imageExtractorConfig} schema={getImageExtractorSchema()} onSubmit={(newImageConfig: any) => setExtractorConfig('imageExtractorConfig', newImageConfig)} />
              <Accordion
                className="px-2"
                items={[
                  {
                    name: 'Filter Out Nodes',
                    content: (
                      <Form
                        object={Array.from(editor.getCurrentPageShapeIds() || {}).reduce((obj, item) => ({ ...obj, [item]: imageExtractorConfig.nodesToExclude?.includes(item) }), {})}
                        schema={getNodesToExcludeSchema()}
                        onSubmit={(newNodesToExclude: any) => {
                          const nodesToExclude = Object.keys(newNodesToExclude || {}).filter((nodeId: any) => newNodesToExclude[nodeId]) as TLShapeId[];
                          setExtractorConfig('imageExtractorConfig', { ...imageExtractorConfig, nodesToExclude });
                        }}
                      />
                    ),
                  },
                ]}
              />
            </div>
          ),
        }}
        back={{
          children: imagePreview ? <ImageWithSizeIndicator src={imagePreview} /> : <div className="text-primary/80 px-2 py-4 w-full h-full flex justify-center items-center">No Image</div>,
        }}
      />
    );
  }, [imageExtractorConfig, imageExtractionTabSide, getImageExtractorSchema, editor, getNodesToExcludeSchema, imagePreview, onFlip, setExtractorConfig]);

  const NodesExtraction = useMemo(() => {
    const { enabled, nodePropertiesToExtract } = nodesExtractorConfig;
    return (
      <FlipCard
        onFlip={() => onFlip(nodesExtractionTabSide, setJsonExtractionTabSide)}
        className={cn(nodesExtractorConfig.enabled && `border-accent`)}
        title={<ToggleTitle name={nodesExtractionTabSide} pressed={enabled} onPressedChange={(enabled: boolean) => setExtractorConfig('nodesExtractorConfig', { enabled })} />}
        front={{
          className: 'max-h-[260px]',
          children: (
            <div className={cn(`flex flex-col gap-1 w-full`)}>
              <Form object={nodePropertiesToExtract} schema={getNodesExtractorSchema()} onSubmit={(nodePropertiesToExtract: any) => setExtractorConfig('nodesExtractorConfig', { nodePropertiesToExtract })} ItemRenderer={FlowFormItem} />
            </div>
          ),
        }}
        back={{
          className: 'max-h-[260px]',
          children: nodesPreview ? (
            <pre className="overflow-auto p-1 w-auto flex justify-center items-center">
              <code>{JSON.stringify(nodesPreview, null, 2)}</code>
            </pre>
          ) : (
            <div className="text-primary/80 px-2 py-4 w-full flex justify-center items-center">No Nodes</div>
          ),
        }}
      />
    );
  }, [getNodesExtractorSchema, nodesExtractionTabSide, nodesExtractorConfig, nodesPreview, onFlip, setExtractorConfig]);

  const CanvasStateExtraction = useMemo(() => {
    return (
      <FlipCard
        onFlip={() => onFlip(canvasExtractionTabSide, setCanvasExtractionTabSide)}
        className={cn(canvasExtractorConfig.enabled && `border-accent`)}
        title={<ToggleTitle name={canvasExtractionTabSide} pressed={canvasExtractorConfig.enabled} onPressedChange={(enabled: boolean) => setExtractorConfig('canvasExtractorConfig', { enabled })} />}
        front={{
          children: (
            <div className={cn(`flex flex-col gap-1 w-full`)}>
              <Form object={canvasExtractorConfig} schema={getCanvasStateExtractorSchema()} onSubmit={(newCanvasConfig: any) => setExtractorConfig('canvasExtractorConfig', newCanvasConfig)} />
            </div>
          ),
        }}
        back={{
          children: Object.keys(canvasState).length > 0 ? <Form object={canvasState} readOnly={true} /> : <div className="text-primary/80 px-2 py-4 w-full flex justify-center items-center">No Canvas Event</div>,
        }}
      />
    );
  }, [canvasExtractionTabSide, canvasExtractorConfig, canvasState, getCanvasStateExtractorSchema, onFlip, setExtractorConfig]);

  const uiStateExtraction = useMemo(() => {
    return (
      <FlipCard
        onFlip={() => onFlip(uiExtractionTabSide, setUiExtractionTabSide)}
        className={cn(uiExtractorConfig.enabled && `border-accent`)}
        title={<ToggleTitle name={uiExtractionTabSide} pressed={uiExtractorConfig.enabled} onPressedChange={(enabled: boolean) => setExtractorConfig('uiExtractorConfig', { enabled })} />}
        front={{
          children: (
            <div className={cn(`flex flex-col gap-1 w-full`)}>
              <Form object={uiExtractorConfig} schema={getUiStateExtractorSchema()} onSubmit={(newUiConfig: any) => setExtractorConfig('uiExtractorConfig', newUiConfig)} />
            </div>
          ),
        }}
        back={{
          children: Object.keys(uiState).length > 0 ? <Form object={uiState} readOnly={true} /> : <div className="text-primary/80 px-2 py-4 w-full flex justify-center items-center">No UI State</div>,
        }}
      />
    );
  }, [getUiStateExtractorSchema, onFlip, setExtractorConfig, uiExtractorConfig, uiState, uiExtractionTabSide]);

  return (
    <FlowTab title="Extraction" className="gap-2">
      <div className="flex flex-col justify-center gap-4 w-full">
        {ImageExtraction}
        {NodesExtraction}
        {CanvasStateExtraction}
        {uiStateExtraction}
      </div>
    </FlowTab>
  );
};
ExtractionTab.displayName = 'ExtractionTab';