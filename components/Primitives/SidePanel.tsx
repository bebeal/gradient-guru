'use client';

import { ForwardedRef, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { useRippleEffect } from '@/hooks';
import { cn } from '@/utils';
import { IconSetCache, Radius, RadiusClasses } from '@/components';

export interface SidePanelTabProps {
  icon?: any;
  name?: string;
  content?: JSX.Element;
}

export interface SidePanelProps {
  tabs: SidePanelTabProps[];
  resizeable?: boolean;
  defatultTabIndex?: number | undefined;
  defaultWidth?: number;
  bounds?: [number, number];
  overlay?: boolean;
  ripple?: boolean;
  animate?: boolean;
  handle?: boolean;
  radius?: Radius;
  className?: string;
}

export const SidePanel = forwardRef((props: SidePanelProps, ref?: ForwardedRef<HTMLElement>) => {
  const { tabs, resizeable = true, defatultTabIndex = undefined, defaultWidth = 350, bounds = [200, 600], overlay = true, ripple = true, animate = true, handle=true, radius = 'medium', className = '', ...rest } = props;
  // activeTabIndex = undefined means no tab is active
  const [activeTabIndex, setActiveTabIndex] = useState<number | undefined>(defatultTabIndex);
  const [panelWidth, setPanelWidth] = useState<number>(defaultWidth);
  const [resizing, setResizing] = useState<boolean>(false);
  const resizeRef: any = useRef();
  const [cursor, setCursor] = useState<string>('cursor-ew-resize');
  const { createRippleEffect } = useRippleEffect();

  const changeTab = useCallback((e: any, tabValue: string, index: number) => {
    ripple && createRippleEffect?.(e);
    setActiveTabIndex((active) => active === index ? undefined : index);
  }, [createRippleEffect, ripple]);

  const onResizeHandleMouseDown = useCallback((e: MouseEvent) => {
    if (!resizeable) return;

    const startX = e.clientX;
    const startWidth = panelWidth;
    let animationFrameId: number;

    const doResize = (e: MouseEvent) => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        let currentWidth = startWidth + e.clientX - startX;
        const isWithinBounds = currentWidth >= bounds[0] && currentWidth <= bounds[1];

        // Limiting the cursor movement to the bounds of the resize handle
        if (!isWithinBounds) {
          currentWidth = Math.min(Math.max(currentWidth, bounds[0]), bounds[1]);
          e.preventDefault();
        }

        setCursor(isWithinBounds ? 'cursor-ew-resize' : 'cursor-not-allowed');
        setResizing(true);
        setPanelWidth(currentWidth);
      });
    };

    const stopResize = () => {
      setResizing(false);
      setCursor('cursor-ew-resize');
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mousemove', doResize);
      document.removeEventListener('mouseup', stopResize);
    };

    document.addEventListener('mousemove', doResize);
    document.addEventListener('mouseup', stopResize);
  }, [bounds, panelWidth, resizeable]);

  useEffect(() => {
    const resizeHandle = resizeRef.current;
    if (resizeable && resizeHandle) {
      resizeHandle.addEventListener('mousedown', onResizeHandleMouseDown);

      return () => {
        resizeHandle.removeEventListener('mousedown', onResizeHandleMouseDown);
      };
    }
  }, [onResizeHandleMouseDown, resizeable]);

  const togglePanel = useCallback(() => {
    if (activeTabIndex !== undefined) {
      setActiveTabIndex(undefined);
    } else {
      setActiveTabIndex(0);
    }
  }, [activeTabIndex]);

  return (
    <>
      <Tabs.Root className={cn(`relative flex w-auto h-full`, `text-primary shadow-2 shadow-2xl`, `transition-all z-[500]`, className)} data-orientation="vertical" orientation="vertical" activationMode="manual" value={activeTabIndex !== undefined ? `${tabs[activeTabIndex]?.name}` : undefined} {...rest}>
        <Tabs.List className={cn(`flex flex-col w-auto h-auto items-center z-[503]`, `bg-primary border-0 border-r border-transparent`, activeTabIndex === undefined ? `border-r-primary` : `border-r-transparent`)} aria-label="ColumnPanel">
          {tabs.map((tab, index) => {
            const tabValue = `${tab?.name}`;
            const tabIsActive = activeTabIndex === index;
            return (
              <Tabs.Trigger
                className={cn(
                  'relative w-10 h-10 p-2 -mr-0.5 flex justify-center items-center overflow-hidden cursor-pointer [&>*]:pointer-events-none',
                  'font-bold text-secondary border border-transparent bg-transparent',
                  'hover:bg-secondary/50 hover:text-accent',
                  RadiusClasses(radius),
                  'rounded-r-none',
                  index === 0 && 'border-r-transparent rounded-tr-none',
                  tabIsActive && `border border-accent border-r-transparent bg-secondary text-accent hover:border-r-[rgb(var(--background-secondary))]`
                )}
                key={tabValue}
                value={tabValue}
                title={tabValue}
                onMouseUp={(e: any) => changeTab(e, tabValue, index)}
              >
                {tab.icon || tab.name}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
        <div
          className={cn(`relative h-full flex overflow-y-hidden bg-red-500`, `bg-transparent`, !resizing && `transition-all anim-duration-600 ease-in-out`, `shadow-black shadow-2xl`)}
          style={{
            width: activeTabIndex !== undefined ? `${panelWidth}px` : `0px`,
          }}
        >
          {tabs.map((tab, index) => {
            const tabValue = `${tab?.name}`;
            const tabIsActive = activeTabIndex === index;
            return (
              <Tabs.Content
                key={tabValue}
                value={tabValue}
                data-state={'active'}
                data-orientation={'horizontal'}
                className={cn(
                  `w-full h-full overflow-auto bg-secondary outline-none border`,
                  RadiusClasses(radius),
                  index === 0 && tabIsActive && 'rounded-tl-none',
                  index === tabs.length - 1 && tabIsActive && 'rounded-bl-none',
                  'border-accent',
                  `transition-all anim-duration-600 ease-in-out transform will-change-transform`,
                  `top-0 left-0 absolute`,
                  !animate && !tabIsActive && `hidden`
                )}
                style={{
                  transform: `translateY(${((activeTabIndex || 0) - index) * -100}%)`,
                }}
              >
                {tab.content}
              </Tabs.Content>
            );
          })}
        </div>
        {resizing && overlay && <div className={cn('absolute left-0 top-0 w-screen h-screen z-[505]', cursor, resizing ? 'bg-black bg-opacity-50' : 'bg-transparent')} />}
        <div draggable={false} ref={resizeRef} className={cn(`absolute top-0 -right-px w-0.5 h-full z-[505] select-none`, resizing ? `bg-accent` : `bg-transparent`, cursor)} onDoubleClick={togglePanel} >
          {handle && (
            <div onClick={togglePanel} className={cn("z-[506] absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 flex h-4 w-3 items-center justify-center rounded-sm border bg-primary hover:bg-secondary !cursor-pointer", resizing ? `border-accent` : `border-primary`, activeTabIndex !== undefined && `border-accent`, cursor)}>
              <IconSetCache.Carbon.Draggable className="h-2.5 w-2.5" />
            </div>
          )}
        </div>
      </Tabs.Root>
    </>
  );
});