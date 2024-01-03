'use client';

import { useMemo } from 'react';
import { TLShapeId, useEditor } from '@tldraw/tldraw';
import { Accordion, FlipCard, FlowFormItem, FlowTab, Form, ImageWithSizeIndicator, ToggleTitle } from '@/components';
import { useContentExtractor, useImagePreview, useNodesPreview, useRecordedContent } from '@/hooks';
import { cn } from '@/utils';

export const ExtractionTab = () => {
  const {
    imageExtractorConfig,
    getImageExtractorSchema,
    updateImageConfig,
    nodesExtractorConfig,
    getNodesExtractorSchema,
    updateNodesConfig,
    canvasExtractorConfig,
    getCanvasStateExtractorSchema,
    updateCanvasConfig,
    uiExtractorConfig,
    getUiStateExtractorSchema,
    updateUiConfig,
    getNodesToExcludeSchema,
  } = useContentExtractor();
  const { canvasState, uiState } = useRecordedContent();
  const editor = useEditor();
  const { imagePreview } = useImagePreview();
  const { nodesPreview } = useNodesPreview();

  const ImageExtraction = useMemo(() => {
    return (
      <FlipCard
        className={cn(imageExtractorConfig.enabled && `border-accent`)}
        front={{
          title: <ToggleTitle pressed={imageExtractorConfig.enabled} onPressedChange={(enabled: boolean) => updateImageConfig({ enabled })}>Extracted Image</ToggleTitle>,
          children: (
            <div className={cn(`flex flex-col gap-1 w-full`)}>
              <Form object={imageExtractorConfig} schema={getImageExtractorSchema()} onSubmit={updateImageConfig} />
              <Accordion
                className="px-4"
                items={[
                  {
                    name: 'Filter Out Nodes',
                    content: (
                      <Form
                        object={Array.from(editor.getCurrentPageShapeIds() || {}).reduce((obj, item) => ({ ...obj, [item]: imageExtractorConfig.nodesToExclude?.includes(item) }), {})}
                        schema={getNodesToExcludeSchema()}
                        onSubmit={(newNodesToExclude: any) => {
                          const nodesToExclude = Object.keys(newNodesToExclude || {}).filter((nodeId: any) => newNodesToExclude[nodeId]) as TLShapeId[];
                          updateImageConfig({ nodesToExclude });
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
          title: <ToggleTitle pressed={imageExtractorConfig.enabled} onPressedChange={(enabled: boolean) => updateImageConfig({ enabled })}>Extracted Image Config</ToggleTitle>,
          children: imagePreview ? <ImageWithSizeIndicator src={imagePreview} /> : <div className="text-primary/80 px-2 py-4 w-full h-full flex justify-center items-center">No Image</div>,
        }}
      />
    );
  }, [imageExtractorConfig, getImageExtractorSchema, updateImageConfig, editor, getNodesToExcludeSchema, imagePreview]);

  const NodesExtraction = useMemo(() => {
    const { enabled, nodePropertiesToExtract } = nodesExtractorConfig;
    return (
      <FlipCard
        className={cn(nodesExtractorConfig.enabled && `border-accent`)}
        front={{
          title: <ToggleTitle pressed={enabled} onPressedChange={(enabled: boolean) => updateNodesConfig({ enabled })}>Extracted Nodes Config</ToggleTitle>,
          className: 'max-h-[260px]',
          children: (
            <div className={cn(`flex flex-col gap-1 w-full`)}>
              <Form object={nodePropertiesToExtract} schema={getNodesExtractorSchema()} onSubmit={updateNodesConfig} ItemRenderer={FlowFormItem} />
            </div>
          ),
        }}
        back={{
          title: <ToggleTitle pressed={enabled} onPressedChange={(enabled: boolean) => updateNodesConfig({ enabled })}>Extracted Nodes</ToggleTitle>,
          className: 'max-h-[260px]',
          children: nodesPreview ? (
            <pre className="p-1 w-auto h-auto flex justify-center items-center">
              <code>{JSON.stringify(nodesPreview, null, 2)}</code>
            </pre>
          ) : (
            <div className="text-primary/80 px-2 py-4 w-full flex justify-center items-center">No Nodes</div>
          ),
        }}
      />
    );
  }, [getNodesExtractorSchema, nodesExtractorConfig, nodesPreview, updateNodesConfig]);

  const CanvasStateExtraction = useMemo(() => {
    return (
      <FlipCard
        className={cn(canvasExtractorConfig.enabled && `border-accent`)}
        front={{
          title: <ToggleTitle pressed={canvasExtractorConfig.enabled} onPressedChange={(enabled: boolean) => updateCanvasConfig({ enabled })}>Canvas State Config</ToggleTitle>,
          children: (
            <div className={cn(`flex flex-col gap-1 w-full`)}>
              <Form object={canvasExtractorConfig} schema={getCanvasStateExtractorSchema()} onSubmit={(newCanvasConfig: any) => updateCanvasConfig(newCanvasConfig)} />
            </div>
          ),
        }}
        back={{
          title: <ToggleTitle pressed={canvasExtractorConfig.enabled} onPressedChange={(enabled: boolean) => updateCanvasConfig({ enabled })}>Canvas State</ToggleTitle>,
          children: Object.keys(canvasState).length > 0 ? <Form object={canvasState} readOnly={true} /> : <div className="text-primary/80 px-2 py-4 w-full flex justify-center items-center">No Canvas Event</div>,
        }}
      />
    );
  }, [canvasExtractorConfig, canvasState, getCanvasStateExtractorSchema, updateCanvasConfig]);

  const uiStateExtraction = useMemo(() => {
    return (
      <FlipCard
        className={cn(uiExtractorConfig.enabled && `border-accent`)}
        front={{
          title: <ToggleTitle pressed={uiExtractorConfig.enabled} onPressedChange={(enabled: boolean) => updateUiConfig({ enabled })}>UI State Config</ToggleTitle>,
          children: (
            <div className={cn(`flex flex-col gap-1 w-full`)}>
              <Form object={uiExtractorConfig} schema={getUiStateExtractorSchema()} onSubmit={(newUiConfig: any) => updateUiConfig(newUiConfig)} />
            </div>
          ),
        }}
        back={{
          title: <ToggleTitle pressed={uiExtractorConfig.enabled} onPressedChange={(enabled: boolean) => updateUiConfig( { enabled })}>UI State</ToggleTitle>,
          children: Object.keys(uiState).length > 0 ? <Form object={uiState} readOnly={true} /> : <div className="text-primary/80 px-2 py-4 w-full flex justify-center items-center">No UI State</div>,
        }}
      />
    );
  }, [getUiStateExtractorSchema, uiExtractorConfig, uiState, updateUiConfig]);

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