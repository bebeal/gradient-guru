import { memo, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Button, uniqueId } from '@tldraw/tldraw';
import { CopyButton, Form, IconSetCache, Label, Separator, Switch } from '@/components';
import { useContentExtractor, useToasts } from '@/hooks';
import { cn, isEmptyObject } from '@/utils';

export const TabClasses = `w-full h-full flex flex-col p-2 gap-2`;

export const TabTitle = ({ title, children, className }: { title?: string; children?: any; className?: string }) => {
  const titleText: string = title || children || '';
  return (
    <div className={cn('flex flex-col w-full gap-1 justify-center items-center text-base', className)}>
      <div className="text-primary font-bold w-auto h-auto flex justify-center items-center gap-1">{titleText}</div>
      <Separator />
    </div>
  );
};

export const FlowTab = memo(({ title, children, className }: { title?: string; children?: any; className?: string }) => {
  return (
    <div className={cn(TabClasses)}>
      <TabTitle title={title} />
      <div className={cn('p-2 pt-0 flex flex-col w-full h-auto items-center gap-1', className)}>{children}</div>
    </div>
  );
});

export const Title = ({ children, className }: { children?: any; className?: string }) => {
  return <div className={cn('flex w-auto h-auto font-bold justify-center text-center items-center gap-2', className)}>{children}</div>;
};

export const BulletedList = ({ items, className }: { items: any[]; className?: string }) => {
  const getItem = (item: any): ReactNode => {
    if (typeof item === 'object' && item !== null && !Array.isArray(item) && !isEmptyObject(item)) {
      const key: any = Object.keys(item)[0]; // Define a more specific type if possible
      const value = item[key];
      return (
        <div className={cn('flex flex-col', className)}>
          <Label className="text-xs text-primary font-bold">{key}</Label>
          <Form object={value} readOnly={true} className="p-1" />
        </div>
      );
    } else {
      return item;
    }
  };

  return (
    <ul role="list" className="relative w-full h-auto break-words pl-6 pr-2 py-2 list-inside">
      {items.map((item, index: number) => {
        return (
          <li key={`ui-event-${index}`} className="relative flex items-center m-0 p-0 before:content-['\2022'] before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:text-primary before:text-md">
            {getItem(item)}
          </li>
        );
      })}
    </ul>
  );
};

export const ToggleTitle = ({ pressed, onPressedChange, name }: any) => {
  return (
    <div className={cn(`pointer-events-auto relative flex h-full w-full gap-1 justify-center items-center`)}>
      <Switch pressed={pressed} onPressedChange={onPressedChange} className="absolute left-0">
        <div />
      </Switch>
      <div className="font-bold justify-self-center text-sm ml-10 mr-6">{name}</div>
    </div>
  );
};

export const ImageWithSizeIndicator: React.FC<{ src: string }> = ({ src }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  type Size = { width: number; height: number };
  const [size, setSize] = useState<{ natural: Size; offset: Size }>({ natural: { width: 0, height: 0 }, offset: { width: 0, height: 0 } });
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const updateSize = useCallback(() => {
    if (imgRef.current) {
      setSize({
        natural: {
          width: imgRef.current.naturalWidth,
          height: imgRef.current.naturalHeight,
        },
        offset: {
          width: imgRef.current.offsetWidth,
          height: imgRef.current.offsetHeight,
        },
      });
      setPosition({
        x: imgRef.current.offsetLeft,
        y: imgRef.current.offsetTop,
      });
    }
  }, []);

  useEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [updateSize]);

  return (
    <div className="flex items-center justify-center w-full h-full bg-secondary p-2 rounded border border-primary">
      <div className={cn(`relative flex items-center justify-center w-auto h-auto overflow-hidden`)} style={{ padding: `${24}px ${44}px` }}>
        {/* Horizontal Size Indicator */}
        <div className={cn('absolute flex flex-col items-center')} style={{ width: `${size?.offset?.width}px`, height: `${24}px`, top: 0, left: `${position?.x}px` }}>
          <span className="text-white text-xs flex justify-center">{size?.natural?.width}px</span>
          <div className="flex flex-row w-full items-center mt-px">
            <div className="h-[8px] w-[1px] bg-white" />
            <div className="h-[1px] bg-white" style={{ width: 'calc(100% - 2px)' }} />
            <div className="h-[8px] w-[1px] bg-white" />
          </div>
        </div>
        <img ref={imgRef} src={src} onLoad={updateSize} className="object-cover object-center w-auto h-auto border border-primary" alt="Preview of Image Extraction" />
        {/* Vertical Size Indicator */}
        <div className={cn('absolute flex flex-row justify-center items-start')} style={{ height: `${size?.offset?.height}px`, width: `${48}px`, top: `${position?.y}px`, left: `${position?.x + size?.offset?.width - 1}px` }}>
          <div className="flex flex-col w-auto h-full items-center mr-px">
            <div className="w-[8px] h-[1px] bg-white" />
            <div className="w-[1px] bg-white" style={{ height: 'calc(100% - 2px)' }} />
            <div className="w-[8px] h-[1px] bg-white" />
          </div>
          <span className="text-white text-xs h-full flex items-center justify-center">{size?.natural?.height}px</span>
        </div>
      </div>
    </div>
  );
};

export const ExtractAllToast: React.FC<any> = ({ message }) => {
  const openImageInNewTab = () => {
    const image = message.image;
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
        {!message?.image && <div className="text-primary/80 w-full flex justify-center items-center">No Image</div>}
        {message?.image && (
          <div className="flex flex-row w-auto h-auto justify-around items-center !text-xs">
            <a href={message.image} target="_blank" rel="no-referrer" download={`image-preview-${new Date().toISOString().split('T')[0]}.png`} className="text-primary underline flex flex-nowrap h-full w-auto">
              <div className="flex flex-row items-center gap-1">
                <span className="text-primary">Download</span>
                <IconSetCache.Carbon.Download height="100%" className="flex w-auto h-full text-primary" />
              </div>
            </a>
            <a href={'#'} onClick={openImageInNewTab} className="text-primary underline flex flex-nowrap h-full w-auto visited:[&>svg]:text-[#8E24AA]">
              Link <IconSetCache.Custom.ExternalLink height="12" />
            </a>
            <CopyButton value={message.image} />
          </div>
        )}
        {message?.image && <img src={message.image} height="100px" width="auto" alt="Image Extracted" className="object-cover w-full h-full" />}
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
    <Button type={'normal'} className={cn(`w-auto h-auto`)} onClick={onClick}>
      Test Extraction
    </Button>
  );
};
