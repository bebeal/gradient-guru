'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import { setUserPreferences, TLAnyShapeUtilConstructor, TLShape, useEditor, useValue } from '@tldraw/editor';
import { TldrawUiProps } from '@tldraw/tldraw';
import { BackToContent } from '@tldraw/tldraw/src/lib/ui/components/BackToContent';
import { DebugPanel } from '@tldraw/tldraw/src/lib/ui/components/DebugPanel';
import { Dialogs } from '@tldraw/tldraw/src/lib/ui/components/Dialogs';
import { FollowingIndicator } from '@tldraw/tldraw/src/lib/ui/components/FollowingIndicator';
import { HelpMenu } from '@tldraw/tldraw/src/lib/ui/components/HelpMenu';
import { MenuZone } from '@tldraw/tldraw/src/lib/ui/components/MenuZone';
import { NavigationZone } from '@tldraw/tldraw/src/lib/ui/components/NavigationZone/NavigationZone';
import { ExitPenMode } from '@tldraw/tldraw/src/lib/ui/components/PenModeToggle';
import { Button } from '@tldraw/tldraw/src/lib/ui/components/primitives/Button';
import { StopFollowing } from '@tldraw/tldraw/src/lib/ui/components/StopFollowing';
import { StylePanel } from '@tldraw/tldraw/src/lib/ui/components/StylePanel/StylePanel';
import { Toolbar } from '@tldraw/tldraw/src/lib/ui/components/Toolbar/Toolbar';
import { useActions } from '@tldraw/tldraw/src/lib/ui/hooks/useActions';
import { useBreakpoint } from '@tldraw/tldraw/src/lib/ui/hooks/useBreakpoint';
import { useNativeClipboardEvents } from '@tldraw/tldraw/src/lib/ui/hooks/useClipboardEvents';
import { useEditorEvents } from '@tldraw/tldraw/src/lib/ui/hooks/useEditorEvents';
import { useKeyboardShortcuts } from '@tldraw/tldraw/src/lib/ui/hooks/useKeyboardShortcuts';
import { useTranslation } from '@tldraw/tldraw/src/lib/ui/hooks/useTranslation/useTranslation';
import { TldrawUiContextProvider } from '@tldraw/tldraw/src/lib/ui/TldrawUiContextProvider';
import { Toasts, ToastViewport, zoomToFitNewNode } from '@/components';
import { ToastsProvider, useContentRecorder } from '@/hooks';
import { cn } from '@/utils';
import { ScratchPanel } from './Extensions';
import { TestButtons } from './Extensions/TestButtons';
import { FlowSidePanel } from './FlowSidePanel';

export type FlowUiProps = TldrawUiProps & {
  initialShapes?: TLShape[];
  scratchNodeUtils?: TLAnyShapeUtilConstructor[];
};

export const FlowUi = memo((props: FlowUiProps) => {
  const { children, hideUi = false, initialShapes, scratchNodeUtils, onUiEvent: onUiEventCallback, ...rest } = props;
  const { onUiEvent: recordUiEvent } = useContentRecorder();

  const onUiEvent = useCallback<any>(
    (name: any, data: any) => {
      recordUiEvent?.(name, data);
      onUiEventCallback?.(name, data);
    },
    [onUiEventCallback, recordUiEvent]
  );

  return (
    <TldrawUiContextProvider onUiEvent={onUiEvent} {...rest}>
      <ToastsProvider>
        <FlowUiInner initialShapes={initialShapes} hideUi={hideUi} scratchNodeUtils={scratchNodeUtils} {...rest}>
          {children}
        </FlowUiInner>
      </ToastsProvider>
    </TldrawUiContextProvider>
  );
});

const FlowUiInner = memo((props: FlowUiProps) => {
  const { children, hideUi, initialShapes, scratchNodeUtils, ...rest } = props;
  // The hideUi prop should prevent the UI from mounting.
  // If we ever need want the UI to mount and preserve state, then
  // we should change this behavior and hide the UI via CSS instead.
  return (
    <>
      {children}
      {hideUi ? null : <FlowUiContent initialShapes={initialShapes} scratchNodeUtils={scratchNodeUtils} {...rest} />}
    </>
  );
});

const FlowUiContent = memo((props: FlowUiProps) => {
  const { initialShapes, scratchNodeUtils, ...rest } = props;
  const [mounted, setMounted] = useState(false);
  const editor = useEditor();
  const msg = useTranslation();
  const breakpoint = useBreakpoint();
  const isReadonlyMode = useValue('isReadonlyMode', () => editor.getInstanceState().isReadonly, [editor]);
  const isFocusMode = useValue('focus', () => editor.getInstanceState().isFocusMode, [editor]);
  const isDebugMode = useValue('debug', () => editor.getInstanceState().isDebugMode, [editor]);

  useKeyboardShortcuts();
  useNativeClipboardEvents();
  useEditorEvents();

  const { 'toggle-focus-mode': toggleFocus } = useActions();

  useEffect(() => {
    if (!editor) return;

    if (!mounted) {
      setUserPreferences({ id: editor?.user?.getId(), isDarkMode: true });
      editor.updateInstanceState({ isReadonly: false, isGridMode: true, isDebugMode: true });

      // to get the initial history records to show up
      setTimeout(() => {
        if (initialShapes && initialShapes?.length > 0) {
          editor.createShapes(initialShapes);
        }
        zoomToFitNewNode(editor);
        setMounted(true);
      }, 0);
    }
  }, [editor, initialShapes, mounted]);

  return (
    <>
      <FlowSidePanel />
      <div
        className={cn('tlui-layout', {
          'tlui-layout__mobile': breakpoint < 5,
        })}
        data-breakpoint={breakpoint}
      >
        {isFocusMode ? (
          <div className={cn('tlui-layout__top')}>
            <Button type="icon" className={cn('tlui-focus-button')} title={`${msg('focus-mode.toggle-focus-mode')}`} icon="dot" onClick={() => toggleFocus.onSelect('menu')} />
          </div>
        ) : (
          <>
            <div className={cn('tlui-layout__top')}>
              <div className={cn('tlui-layout__top__left')}>
                <MenuZone />
                <div className={cn('tlui-helper-buttons')}>
                  <ExitPenMode />
                  <BackToContent />
                  <StopFollowing />
                </div>
              </div>
              <div className={cn('tlui-layout__top__center')}></div>
              <div className={cn('tlui-layout__top__right')}>
                {breakpoint >= 5 && !isReadonlyMode && (
                  <div className={cn('tlui-style-panel__wrapper')}>
                    <StylePanel />
                  </div>
                )}
                <ScratchPanel scratchNodeUtils={scratchNodeUtils || []} />
              </div>
            </div>
            <div className={cn('tlui-layout__bottom')}>
              <div className={cn('tlui-layout__bottom__main')}>
                <NavigationZone />
                <Toolbar />
                {breakpoint >= 4 && <HelpMenu />}
              </div>
              {isDebugMode && <DebugPanel renderDebugMenuItems={() => <TestButtons />} />}
            </div>
          </>
        )}
        <Toasts />
        <Dialogs />
        <ToastViewport />
        <FollowingIndicator />
      </div>
    </>
  );
});