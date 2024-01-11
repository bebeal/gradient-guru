'use client'

import { useContentExtractor, useToasts, useModel } from "@/hooks";
import { uniqueId } from "@tldraw/tldraw";
import { cn } from "@/utils";
import { Button, CopyButton, DownloadButton, IconSetCache, Separator } from "@/components"
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
        keepOpen: true,
      });
    });
  }, [extractAll, toast]);

  return (
    <Button variant={'normal'} className={cn(`tlui-button tlui-button__menu w-full h-auto flex justify-start text-start`)} containerClassName={'w-full'} onClick={onClick}>
      Test Extraction
    </Button>
  );
};

export const TestModelButton = () => {
  const {
    modelClient,
    setModelClient,
    modelQueryMutation,
    systemPromptName,
    setSystemPromptName,
  } = useModel();
  const toast = useToasts();

  const onClick = useCallback(async () => {
    // Use mutateAsync instead of mutate
   modelQueryMutation.mutateAsync().then((message: any) => {
      console.log('Model Query Results:', message);
      toast?.addToast({
        id: `model-query-${uniqueId()}`,
        title: 'Model Query Results',
        description: (
          <pre className="w-auto max-h-[500px] overflow-auto rounded p-1">
            <code className="whitespace-pre-wrap break-words rounded leading-none">
              {JSON.stringify(message, null, 2)}
            </code>
          </pre>
        ),
        keepOpen: true,
      });
    });
  }, [modelQueryMutation, toast]);

  return (
    <Button variant={'normal'} className={cn(`tlui-button tlui-button__menu w-full h-auto flex justify-start text-start`)} containerClassName={'w-full'} onClick={onClick}>
      Test Model
    </Button>
  );
};


export const TestButtons = () => {
  
  return (
    <div className="flex flex-col items-center justify-start rounded w-full h-auto">
      <TestExtractionButton />
      <TestModelButton />
    </div>
  );
};
