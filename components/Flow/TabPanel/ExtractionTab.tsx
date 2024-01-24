'use client';

import { Accordion, FlowFormItem, FlowTab, Form, ImageWithRuler, ToggleTitle } from '@/components';
import { useContentExtractor, useRecordedContent } from '@/hooks';
import { ImageSchema } from '@/hooks/useFlow/ExtractionUtils';
import { cn, getSVGAsBlob, getSvgPreview } from '@/utils';
import { TLShapeId, useEditor } from '@tldraw/tldraw';
import { useCallback, useEffect, useState } from 'react';

export const ExtractionTab = () => {
  const editor = useEditor();
  const {
    imageExtractorConfig,
    updateImageConfig,
    nodesExtractorConfig,
    getNodesExtractorSchema,
    extractNodes,
    updateNodesConfig,
    canvasExtractorConfig,
    getCanvasStateExtractorSchema,
    updateCanvasConfig,
    uiExtractorConfig,
    getUiStateExtractorSchema,
    updateUiConfig,
    getNodesToExcludeSchema,
    getNodeIds,
    currentPageShapeIds
  } = useContentExtractor();
  const { canvasState, uiState } = useRecordedContent();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [nodesPreview, setNodesPreview] = useState<any | null>(null);

  useEffect(() => {
    const generateImagePreview = async () => {
      const nodesInImage: TLShapeId[] = getNodeIds(imageExtractorConfig.nodesToExclude);
      if (nodesInImage.length === 0) {
        setImagePreview(null);
        return;
      }
      const svgPreview = await getSvgPreview(editor, nodesInImage, imageExtractorConfig);
      const imgUrl = await getSVGAsBlob(svgPreview!);
      if (imgUrl) {
        setImagePreview((oldImgUrl) => {
          if (oldImgUrl) {
            URL.revokeObjectURL(oldImgUrl);
          }
          return imgUrl;
        });
      }
    };

    generateImagePreview();
  }, [imageExtractorConfig, editor, getNodeIds]);

  useEffect(() => {
    const generateNodesPreview = async () => {
      const nodes = await extractNodes();
      setNodesPreview(nodes);
    };
    generateNodesPreview();
  }, [nodesExtractorConfig, editor, getNodeIds, extractNodes]);

  const ImageExtractorConfiguration = useCallback(() => {
    const enabled = imageExtractorConfig.enabled;
    const onPressedChange = (enabled: boolean) => updateImageConfig({ enabled });
    return {
      name: <ToggleTitle pressed={enabled} onPressedChange={onPressedChange}>Image Extraction Configuration</ToggleTitle>,
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-stretch items-center`)}>
          <div className="flex p-1 flex-wrap flex-col w-full justify-center items-center">
            <Form object={imageExtractorConfig} schema={ImageSchema} onSubmit={updateImageConfig} />
            {/* <Accordion
                className="text-xs w-full px-5"
                triggerClassName="px-2 py-1 font-semibold text-xs text-primary"
                items={[
                  {
                    name: 'Filter Out Nodes',
                    content: (
                      <Form
                        object={Array.from(currentPageShapeIds || {}).reduce((obj: any, item: any) => ({ ...obj, [item]: imageExtractorConfig.nodesToExclude?.includes(item) }), {})}
                        schema={getNodesToExcludeSchema()}
                        onSubmit={(newNodesToExclude: any) => {
                          const nodesToExclude = Object.keys(newNodesToExclude || {}).filter((nodeId: any) => newNodesToExclude[nodeId]) as TLShapeId[];
                          updateImageConfig({ nodesToExclude });
                        }}
                      />
                    ),
                  },
                ]}
              /> */}
          </div>
          <div className="flex flex-wrap flex-col w-full justify-center items-center">
            {imagePreview ? <ImageWithRuler src={imagePreview} /> :  <div className="text-primary/80 w-full h-full flex justify-center items-center">No Image</div>}
          </div>
        </div>
      ),
      open: enabled,
    };
  }, [currentPageShapeIds, getNodesToExcludeSchema, imageExtractorConfig, imagePreview, updateImageConfig]);

  const NodesExtractorConfiguration = useCallback(() => {
    const enabled = nodesExtractorConfig.enabled;
    const onPressedChange = (enabled: boolean) => updateNodesConfig({ enabled });
    return {
      name: <ToggleTitle pressed={enabled} onPressedChange={onPressedChange}>Nodes Extraction Configuration</ToggleTitle>,
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-stretch items-center`)}>
          <div className="flex p-1 flex-wrap flex-col w-full h-auto justify-center items-center max-h-[200px]">
            <Form object={nodesExtractorConfig} schema={getNodesExtractorSchema()} onSubmit={updateNodesConfig} ItemRenderer={FlowFormItem} />
          </div>
          <div className="flex flex-col w-full h-auto justify-center items-center border border-primary p-1">
            {nodesPreview ? (
              <pre className="p-1 overflow-auto max-h-[200px] w-full">
                <code>{JSON.stringify(nodesPreview, null, 2)}</code>
              </pre>
            ) : (
              <div className="text-primary/80 px-2 py-4 w-full flex justify-center items-center">No Nodes</div>
            )}
          </div>
        </div>
      ),
      open: enabled,
    };
  }, [nodesExtractorConfig, getNodesExtractorSchema, updateNodesConfig, nodesPreview]);

  const CanvasStateExtractorConfiguration = useCallback(() => {
    const enabled = canvasExtractorConfig.enabled;
    const onPressedChange = (enabled: boolean) => updateCanvasConfig({ enabled });
    return {
      name: <ToggleTitle pressed={enabled} onPressedChange={onPressedChange}>Canvas State Extraction Configuration</ToggleTitle>,
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-stretch items-center`)}>
          <div className="flex p-1 flex-wrap flex-col w-full h-auto justify-center items-center max-h-[200px]">
            <Form object={canvasExtractorConfig} schema={getCanvasStateExtractorSchema()} onSubmit={updateCanvasConfig} />
          </div>
          <div className="flex flex-col w-full h-auto justify-center items-center border border-primary p-1">
            {Object.keys(canvasState).length > 0
              ? (
                <pre className="p-1 overflow-auto max-h-[200px] w-full">
                  <code>{JSON.stringify(canvasState, null, 2)}</code>
                </pre>
              ) : <div className="text-primary/80 px-2 py-4 w-full flex justify-center items-center">No Canvas Event</div>}
          </div>
        </div>
      ),
      open: enabled,
    };
  }, [canvasExtractorConfig, canvasState, getCanvasStateExtractorSchema, updateCanvasConfig]);

  const UiStateExtractorConfiguration = useCallback(() => {
    const enabled = uiExtractorConfig.enabled;
    const onPressedChange = (enabled: boolean) => updateUiConfig({ enabled });
    return {
      name: <ToggleTitle pressed={enabled} onPressedChange={onPressedChange}>UI State Extraction Configuration</ToggleTitle>,
      content: (
        <div className={cn(`w-full h-full flex flex-col justify-stretch items-center`)}>
          <div className="flex p-1 flex-wrap flex-col w-full h-auto justify-center items-center max-h-[200px]">
            <Form object={uiExtractorConfig} schema={getUiStateExtractorSchema()} onSubmit={updateUiConfig} />
          </div>
          <div className="flex flex-col w-full h-auto justify-center items-center border border-primary p-1">
            {Object.keys(uiState).length > 0
              ? (
                <pre className="p-1 overflow-auto max-h-[200px] w-full">
                  <code>{JSON.stringify(uiState, null, 2)}</code>
                </pre>
              ) : <div className="text-primary/80 px-2 py-4 w-full flex justify-center items-center">No UI Event</div>}
          </div>
        </div>
      ),
      open: enabled,
    };
  }, [uiExtractorConfig, uiState, getUiStateExtractorSchema, updateUiConfig]);

  return (
    <FlowTab title="Extraction" className="gap-2">
      <div className="flex flex-col justify-center gap-4 w-full p-1">
        <Accordion items={[ImageExtractorConfiguration()]} />
        <Accordion items={[NodesExtractorConfiguration()]} />
        <Accordion items={[CanvasStateExtractorConfiguration()]} />
        <Accordion items={[UiStateExtractorConfiguration()]} />
      </div>
    </FlowTab>
  );
};
ExtractionTab.displayName = 'ExtractionTab';