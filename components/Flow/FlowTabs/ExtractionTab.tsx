'use client';

import { Accordion, BulletedList, FlipCard, FlowTab, Form, ToggleTitle } from '@/components';
import { useContentExtractor, useContentRecorder } from '@/hooks';
import { TLShapeId, useEditor } from '@tldraw/tldraw';
import { cn } from '@/utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const ImageWithSizeIndicator: React.FC<{ src: string }> = ({ src }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  type Size = { width: number; height: number };
  const [size, setSize] = useState<{natural: Size, offset: Size}>({ natural: { width: 0, height: 0 }, offset: { width: 0, height: 0 } });
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const updateSize = useCallback(() => {
    if (imgRef.current) {
      setSize({
        natural: {
          width: imgRef.current.naturalWidth,
          height: imgRef.current.naturalHeight
        },
        offset: {
          width: imgRef.current.offsetWidth,
          height: imgRef.current.offsetHeight
        }
      });
      setPosition({
        x: imgRef.current.offsetLeft,
        y: imgRef.current.offsetTop
      });
    }
  }, []);

  useEffect(() => {
    updateSize(); // Initial check
    window.addEventListener('resize', updateSize); // Update size on window resize
    return () => window.removeEventListener('resize', updateSize);
  }, [updateSize]);

  return (
    <div className="flex items-center justify-center w-full h-full bg-secondary p-2 rounded border border-primary">
      <div className={cn(`relative flex items-center justify-center w-auto h-auto flex-1 overflow-hidden`)} style={{padding: `${24}px ${44}px`}}>
        {/* Horizontal Size Indicator */}
        <div className={cn("absolute flex flex-col items-center")} style={{width: `${size?.offset?.width}px`, height: `${24}px`, top: 0, left: `${position?.x}px`}}>
          <span className="text-white text-xs flex justify-center">
            {size?.natural?.width}px
          </span>
          <div className="flex flex-row w-full items-center mt-px">
            <div className="h-[8px] w-[1px] bg-white" />
            <div className="h-[1px] bg-white" style={{width: 'calc(100% - 2px)'}} />
            <div className="h-[8px] w-[1px] bg-white" />
          </div>
        </div>
        <img ref={imgRef} src={src} onLoad={updateSize} className="object-cover w-auto h-auto border border-primary" alt="Preview of Image Extraction" />
        {/* Vertical Size Indicator */}
        <div className={cn("absolute flex flex-row justify-center items-start")} style={{height: `${size?.offset?.height}px`, width: `${48}px`, top: `${position?.y}px`, left: `${position?.x + size?.offset?.width - 1}px`}}>
          <div className="flex flex-col w-auto h-full items-center mr-px">
            <div className="w-[8px] h-[1px] bg-white" />
            <div className="w-[1px] bg-white" style={{height: 'calc(100% - 2px)'}} />
            <div className="w-[8px] h-[1px] bg-white" />
          </div>
          <span className="text-white text-xs h-full flex items-center justify-center">
            {size?.natural?.height}px
          </span>
        </div>
      </div>
    </div>
  );
};


export const ExtractionTab = () => {
  const {
    imageExtractorConfig, getImageExtractorSchema, getImagePreview,
    jsonExtractorConfig, extractJSON, getJSONExtractorSchema,
    textExtractorConfig, extractText, getTextExtractorSchema,
    canvasExtractorConfig, extractCanvasState, getCanvasStateExtractorSchema,
    uiExtractorConfig, extractUiState, getUiStateExtractorSchema,
    getNodesToExcludeSchema, setExtractorConfig
  } = useContentExtractor();
  const [imageExtractionTabSide, setImageExtractionTabSide] = useState<'Image Extraction Config' | 'Image Extraction Preview'>('Image Extraction Config');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [jsonExtractionTabSide, setJsonExtractionTabSide] = useState<'JSON Extraction Config' | 'JSON Extraction Preview'>('JSON Extraction Config');
  const [jsonPreview, setJsonPreview] = useState<any | null>(null);
  const [textExtractionTabSide, setTextExtractionTabSide] = useState<'Text Extraction Config' | 'Text Extraction Preview'>('Text Extraction Config');
  const [textPreview, setTextPreview] = useState<string[] | null>(null);
  const [canvasExtractionTabSide, setCanvasExtractionTabSide] = useState<'Canvas State Extraction Config' | 'Canvas State Extraction Preview'>('Canvas State Extraction Config');
  const [uiExtractionTabSide, setUiExtractionTabSide] = useState<'UI State Extraction Config' | 'UI State Extraction Preview'>('UI State Extraction Config');
  const { canvasState, uiState, historyRecords } = useContentRecorder();
  const previousLength = useRef(historyRecords.length);
  const [mounted, setMounted] = useState(false);
  const editor = useEditor();

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

  const fetchJSON = useCallback(() => {
    extractJSON().then((value: any) => {
      setJsonPreview(value);
    });
  }, [extractJSON]);

  const fetchText = useCallback(() => {
    setTextPreview(extractText()); 
  }, [extractText]);

  // refetch image when config changes
  useEffect(() => {
    fetchImage();
  }, [fetchImage, imageExtractorConfig]);

  useEffect(() => {
    fetchJSON();
  }, [fetchJSON, jsonExtractorConfig]);

  // refetch text when config changes
  useEffect(() => {
    fetchText();
  }, [fetchText, textExtractorConfig]);

  // refetch image when history changes, indicating shape was updated/added/removed
  useEffect(() => {
    if (historyRecords.length > previousLength.current) {
      fetchImage();
      previousLength.current = historyRecords.length;
    }
  }, [fetchImage, historyRecords.length]);

  // fetch image and text on mount
  useEffect(() => {
    if (!mounted) {
      fetchImage();
      fetchJSON();
      fetchText();
      setMounted(true);
    }
  }, [fetchImage, fetchJSON, fetchText, mounted]);

  const ImageExtraction = useMemo(() => {
    return (
      <FlipCard
        onFlip={() => onFlip(imageExtractionTabSide, setImageExtractionTabSide)}
        className={cn(`h-[274px]`, imageExtractorConfig.enabled && `border-accent`)}
        title={<ToggleTitle name={imageExtractionTabSide} pressed={imageExtractorConfig.enabled} onPressedChange={(enabled: boolean) => setExtractorConfig('imageExtractorConfig', { enabled })} />}
        front={{
          children: (
            <div className={cn(`flex flex-col gap-1 w-full`)}>
              <Form object={imageExtractorConfig} schema={getImageExtractorSchema()} onSubmit={(newImageConfig: any) => setExtractorConfig('imageExtractorConfig', newImageConfig)} />
              <Accordion
                className='px-2'
                items={[
                  {
                    name: 'Filter Out Nodes',
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
          children: imagePreview ? <ImageWithSizeIndicator src={imagePreview} /> :  <div className="text-primary/80 px-2 py-4 w-full flex justify-center items-center">No Image</div>
        }}
      />
    )
  }, [imageExtractorConfig, imageExtractionTabSide, getImageExtractorSchema, editor, getNodesToExcludeSchema, imagePreview, onFlip, setExtractorConfig]);

  const onJSONFormSubmit = useCallback((nodePropertiesToExtract: any) => {
    setExtractorConfig('jsonExtractorConfig', { nodePropertiesToExtract });
  }, [setExtractorConfig]);

  const JSONExtraction = useMemo(() => {
    const {enabled, nodePropertiesToExtract } = jsonExtractorConfig;
    return (
      <FlipCard
        onFlip={() => onFlip(jsonExtractionTabSide, setJsonExtractionTabSide)}
        className={cn(jsonExtractorConfig.enabled && `border-accent`)}
        title={<ToggleTitle name={jsonExtractionTabSide} pressed={enabled} onPressedChange={(enabled: boolean) => setExtractorConfig('jsonExtractorConfig', { enabled })} />}
        front={{
          children: (
            <div className={cn(`flex flex-col gap-1 w-full`)}>
              <Form object={nodePropertiesToExtract} schema={getJSONExtractorSchema()} onSubmit={onJSONFormSubmit} />
            </div>
          )
        }}
        back={{
          children: jsonPreview ? (<pre className="overflow-auto p-1"> <code>{JSON.stringify(jsonPreview, null, 2)}</code> </pre>) : (<div className="text-primary/80 px-2 py-4 w-full flex justify-center items-center">No JSON</div>)
        }}
      />
    );
  }, [getJSONExtractorSchema, jsonExtractionTabSide, jsonExtractorConfig, jsonPreview, onFlip, onJSONFormSubmit, setExtractorConfig]);

  const TextExtraction = useMemo(() => {
    return (
      <FlipCard
        onFlip={() => onFlip(textExtractionTabSide, setTextExtractionTabSide)}
        className={cn(textExtractorConfig.enabled && `border-accent`)}
        title={<ToggleTitle name={textExtractionTabSide} pressed={textExtractorConfig.enabled} onPressedChange={(enabled: boolean) => setExtractorConfig('textExtractorConfig', { enabled })} />}
        front={{
          children: (
            <div className={cn(`flex flex-col gap-1 w-full`)}>
              <Form object={textExtractorConfig} schema={getTextExtractorSchema()} onSubmit={(newTextConfig: any) => setExtractorConfig('textExtractorConfig', newTextConfig)} />
              <Accordion
                className='px-2'
                items={[
                  {
                    name: 'Filter Out Nodes',
                    content: <Form object={Array.from(editor.getCurrentPageShapeIds() || {}).reduce((obj, item) => ({ ...obj, [item]: textExtractorConfig.nodesToExclude?.includes(item) }), {})} schema={getNodesToExcludeSchema()} onSubmit={(newNodesToExclude: any) => {
                      const nodesToExclude = Object.keys(newNodesToExclude || {}).filter((nodeId: any) => newNodesToExclude[nodeId]) as TLShapeId[];
                      setExtractorConfig('textExtractorConfig', { ...textExtractorConfig, nodesToExclude });
                    }} />
                  }
                ]}
              />
            </div>
          )
        }}
        back={{
          children: textPreview && textPreview.length > 0 ? <BulletedList items={textPreview} /> : <div className="text-primary/80 px-2 py-4 w-full flex justify-center items-center">No Text</div>
        }}
      />
    )
  }, [editor, getNodesToExcludeSchema, getTextExtractorSchema, onFlip, setExtractorConfig, textExtractionTabSide, textExtractorConfig, textPreview]);

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
          )
        }}
        back={{
          children: Object.keys(canvasState).length > 0 ? <Form object={canvasState} readOnly={true} /> : <div className="text-primary/80 px-2 py-4 w-full flex justify-center items-center">No Canvas Event</div>
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
          )
        }}
        back={{
          children: Object.keys(uiState).length > 0 ? <Form object={uiState} readOnly={true} /> : <div className="text-primary/80 px-2 py-4 w-full flex justify-center items-center">No UI State</div>
        }}
      />
    );
  }, [getUiStateExtractorSchema, onFlip, setExtractorConfig, uiExtractorConfig, uiState, uiExtractionTabSide]);

  return (
    <FlowTab title="Extraction">
      <div className="flex flex-col justify-center gap-4 w-full">
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
