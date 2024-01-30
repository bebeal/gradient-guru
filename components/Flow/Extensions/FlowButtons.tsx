'use client'

import { useContentExtractor, useToasts, useModel } from "@/hooks";
import { uniqueId, useEditor } from "@tldraw/tldraw";
import { cn } from "@/utils";
import { Button, CopyButton, DownloadButton, IconSetCache, Separator, zoomToFitNewNode } from "@/components"
import { useCallback } from "react";

export const ExtractAllToast: React.FC<any> = ({ message }) => {
  const openImageInNewTab = () => {
    const image = message.dataUrl;
    const newTab: Window | null = window.open();
    if (newTab === null) {
      console.error('Unable to open new tab');
      return;
    }
    const styles = `
    <style>
      html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: #212529;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    </style>
  `;
    newTab.document.head.innerHTML = styles;
    newTab.document.body.innerHTML = `<iframe src="${image}" frameborder="0" allowfullscreen></iframe>`;
  };

  const ImageSection = () => {
    return (
      <>
        {!message?.dataUrl && <div className="text-primary/80 w-full flex justify-center items-center">No Image</div>}
        {message?.dataUrl && (
          <div className="flex flex-row w-auto h-auto justify-around items-center !text-xs">
            <a href={message.dataUrl} target="_blank" rel="no-referrer" download={`image-preview-${new Date().toISOString().split('T')[0]}.png`} className="text-primary underline flex flex-nowrap h-full w-auto">
              <div className="flex flex-row items-center gap-1">
                <DownloadButton simDownload tooltip />
              </div>
            </a>
            <a href={'#'} onClick={openImageInNewTab} className="text-primary underline flex flex-nowrap h-full w-auto visited:[&>svg]:text-[#8E24AA]">
              Link <IconSetCache.Custom.ExternalLink height="12" />
            </a>
            <CopyButton value={message.dataUrl} />
          </div>
        )}
        {message?.dataUrl && <img src={message.dataUrl} alt="Image Extracted" className="object-fit w-auto h-full max-h-[200px]" />}
      </>
    );
  };

  const NodesSection = () => {
    return (
      <>
        {!message?.nodes && <div className="text-primary/80 w-full flex justify-center items-center">No Nodes</div>}
        {message?.nodes && (
          <pre className="p-1 w-auto h-full flex justify-center items-center">
            <code>{JSON.stringify(message.nodes, null, 2)}</code>
          </pre>
        )}
      </>
    );
  };

  const CanvasStateSection = () => {
    return (
      <>
        {!message?.canvasState && <div className="text-primary/80 w-full flex justify-center items-center">No Canvas Event</div>}
        {message?.canvasState && (
          <pre className="p-1 w-auto h-full flex justify-center items-center">
            <code>{JSON.stringify(message.canvasState, null, 2)}</code>
          </pre>
        )}
      </>
    );
  };

  const UIStateSection = () => {
    return (
      <>
        {!message?.uiState && <div className="text-primary/80 w-full flex justify-center items-center">No UI State</div>}
        {message?.uiState && (
          <pre className="p-1 w-auto h-full flex justify-center items-center">
            <code>{JSON.stringify(message.uiState, null, 2)}</code>
          </pre>
        )}
      </>
    );
  };

  return (
    <div className="relative flex flex-col gap-1 w-full pointer-events-auto overflow-visible !text-[8px]">
      <Separator className="w-full bg-muted" />
      <div className="text-primary font-bold text-xs">Image:</div>
      <div className="flex flex-col w-full overflow-y-auto">
        <ImageSection />
      </div>
      <Separator className="w-full bg-muted" />
      <div className="text-primary font-bold text-xs">Nodes:</div>
      <div className="flex flex-row w-full overflow-y-auto max-h-[100px]">
        <NodesSection />
      </div>
      <Separator className="w-full bg-muted" />
      <div className="text-primary font-bold text-xs">Canvas State:</div>
      <div className="flex flex-row w-full overflow-y-auto max-h-[100px]">
        <CanvasStateSection />
      </div>
      <Separator className="w-full bg-muted" />
      <div className="text-primary font-bold text-xs">UI State:</div>
      <div className="flex flex-row w-full overflow-y-auto max-h-[100px]">
        <UIStateSection />
      </div>
      <Separator className="w-full bg-muted" />
    </div>
  );
};

export const TestExtractionButton = () => {
  const { extractAll } = useContentExtractor();
  const toast = useToasts();

  const onClick = useCallback(() => {
    extractAll().then((message: any) => {
      console.log('Extract All Results:', message);
      toast?.addToast({
        id: `extract-all-${uniqueId()}`,
        title: 'Extract All Results',
        description: <ExtractAllToast message={message} />,
      });
    });
  }, [extractAll, toast]);

  return (
    <Button variant={'normal'} className={cn(`tlui-button tlui-button__menu w-full h-auto flex justify-start text-start`)} containerClassName={'w-full'} onClick={onClick}>
      Test Extraction
    </Button>
  );
};

export const TestModelButton = (props: any) => {
  const {
    children = 'Test Model',
    className = 'tlui-button tlui-button__menu w-full h-auto flex justify-start text-start',
    containerClassName = 'w-full',
    variant='normal',
  } = props;
  const {
    modelClient,
    setModelClient,
    modelQueryMutation,
    systemPromptName,
    setSystemPromptName,
  } = useModel();
  const toast = useToasts();
  const editor = useEditor();

  const onClick = useCallback(async () => {
    // Use mutateAsync instead of mutate
   modelQueryMutation.mutateAsync().then((message: any) => {
      console.log('Model Query Results:', message);
      toast?.addToast({
        id: `model-query-${uniqueId()}`,
        title: 'Model Query Results',
        description: (
          <pre className="w-auto max-h-[400px] overflow-auto rounded p-1">
            <code className="whitespace-pre-wrap break-words rounded leading-none text-xs bg-secondary">
              {JSON.stringify(message, null, 2)}
            </code>
          </pre>
        ),
        
      });
      setTimeout(() => {
        zoomToFitNewNode(editor);
      }, 0);
    });
  }, [editor, modelQueryMutation, toast]);

  return (
    <Button variant={variant} className={cn(className)} containerClassName={cn(containerClassName)} onClick={onClick}>
      {children}
    </Button>
  );
};

export const MakeRealButton = () => {
  return (
    <div className="tlui-style-panel__wrapper w-full h-auto !mb-0 p-px">
      <TestModelButton variant='gradient' className={cn('w-full gap-2 tracking-normal [word-spacing:normal]')} containerClassName={'w-full'}>
        <IconSetCache.Carbon.DataEnrichment height="100%" width="14" stroke="currentColor" fill="currentColor" />
        <div className="w-full h-auto text-sm font-bold flex items-center justify-center">Make Real</div>
      </TestModelButton>
    </div>
  )
};

export const TestDisplayInfoButton = () => {
  const {
    modelClient,
    setModelClient,
    modelQueryMutation,
    systemPromptName,
    setSystemPromptName,
  } = useModel();
  const { imageExtractorConfig, nodesExtractorConfig, canvasExtractorConfig, uiExtractorConfig } = useContentExtractor();
  const toast = useToasts();

  const onClick = useCallback(() => {
    const message = {
      modelConfig: {
        ...modelClient.config,
      },
      systemPromptName,
      imageExtractorConfig,
      nodesExtractorConfig,
      canvasExtractorConfig,
      uiExtractorConfig,
    };
    console.log('Display Info Result:', message);
    toast?.addToast({
      id: `display-info-${uniqueId()}`,
      title: 'Display Info',
      description: <div className="relative flex flex-col gap-1 w-full pointer-events-auto overflow-auto !text-[8px] max-h-[200px]">{JSON.stringify(message, null, 2)}</div>,
    });
  
  }, [canvasExtractorConfig, imageExtractorConfig, modelClient.config, nodesExtractorConfig, systemPromptName, toast, uiExtractorConfig]);

  return (
    <Button variant={'normal'} className={cn(`tlui-button tlui-button__menu w-full h-auto flex justify-start text-start`)} containerClassName={'w-full'} onClick={onClick}>
      Display Info
    </Button>
  );
};

export const TestButtons = () => {
  return (
    <div className="flex flex-col items-center justify-start rounded w-full h-auto">
      <TestExtractionButton />
      <TestModelButton />
      <TestDisplayInfoButton />
    </div>
  );
};
