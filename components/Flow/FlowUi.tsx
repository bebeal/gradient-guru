'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Button, TLUiEventHandler, TldrawUiContextProvider, TldrawUiProps, useActions, useBreakpoint, useKeyboardShortcuts, useNativeClipboardEvents, useTranslation } from '@tldraw/tldraw';
import { TLAnyShapeUtilConstructor, TLShape, setUserPreferences, useEditor, useValue } from '@tldraw/editor'
import { useEditorEvents } from '@tldraw/tldraw/src/lib/ui/hooks/useEditorEvents';
import { MenuZone } from '@tldraw/tldraw/src/lib/ui/components/MenuZone';
import { NavigationZone } from '@tldraw/tldraw/src/lib/ui/components/NavigationZone/NavigationZone';
import { Toolbar } from '@tldraw/tldraw/src/lib/ui/components/Toolbar/Toolbar';
import { HelpMenu } from '@tldraw/tldraw/src/lib/ui/components/HelpMenu';
import { Dialogs } from '@tldraw/tldraw/src/lib/ui/components/Dialogs';
import { Toasts } from '@tldraw/tldraw/src/lib/ui/components/Toasts';
import { FollowingIndicator } from '@tldraw/tldraw/src/lib/ui/components/FollowingIndicator';
import { BackToContent } from '@tldraw/tldraw/src/lib/ui/components/BackToContent';
import { StopFollowing } from '@tldraw/tldraw/src/lib/ui/components/StopFollowing';
import { StylePanel } from '@tldraw/tldraw/src/lib/ui/components/StylePanel/StylePanel';
import { DebugPanel } from '@tldraw/tldraw/src/lib/ui/components/DebugPanel';
import { ExitPenMode } from '@tldraw/tldraw/src/lib/ui/components/PenModeToggle';
import { ToastProvider, ToastViewport } from '@radix-ui/react-toast'
import { cn } from '@/utils';
import { FlowTabs } from '@/components';
import { ContentExtractorProvider, useContentRecorder } from '@/hooks';
import { ScratchPanel } from './FlowExtensions';

export type FlowUiProps = TldrawUiProps & {
  initialShapes?: TLShape[];
  scratchNodeUtils?: TLAnyShapeUtilConstructor[];
};

export const FlowUi = (props: FlowUiProps) => {
  const {
    children,
    hideUi=false,
    initialShapes,
    scratchNodeUtils,
    onUiEvent: onUiEventCallback,
    ...rest
  } = props;
  const { onUiEvent: recordUiEvent } = useContentRecorder();

  const onUiEvent = useCallback<TLUiEventHandler>((name, data) => {
    recordUiEvent?.(name, data);
    onUiEventCallback?.(name, data);
  }, [onUiEventCallback, recordUiEvent]);

	return (
		<TldrawUiContextProvider onUiEvent={onUiEvent} {...rest}>
      <ContentExtractorProvider>
        <FlowUiInner
          initialShapes={initialShapes}
          hideUi={hideUi}
          scratchNodeUtils={scratchNodeUtils}
          {...rest}
        >
          {children}
        </FlowUiInner>
      </ContentExtractorProvider>
		</TldrawUiContextProvider>
	)
};

const FlowUiInner = (props: FlowUiProps) => {
  const {
    children,
    hideUi,
    initialShapes,
    scratchNodeUtils,
    ...rest
  } = props;
	// The hideUi prop should prevent the UI from mounting.
	// If we ever need want the UI to mount and preserve state, then
	// we should change this behavior and hide the UI via CSS instead.
	return (
		<>
			{children}
			{hideUi ? null : <FlowUiContent initialShapes={initialShapes} scratchNodeUtils={scratchNodeUtils} {...rest} />}
		</>
	)
};

const FlowUiContent = (props: FlowUiProps) => {
  const {
    initialShapes,
    scratchNodeUtils,
    ...rest
  } = props;
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
      editor.updateInstanceState({ isReadonly: false, isGridMode: true });
      if (initialShapes && initialShapes?.length > 0) {
        editor.createShapes(initialShapes);
      }
      editor.zoomToFit();
      setMounted(true);
    }
  }, [editor, initialShapes, mounted]);

	return (
		<ToastProvider>
      <FlowTabs className="tl-tabs" />
			<div
				className={cn('tlui-layout', {
					'tlui-layout__mobile': breakpoint < 5,
				})}
				data-breakpoint={breakpoint}
			>
				{isFocusMode ? (
					<div className={cn("tlui-layout__top")}>
						<Button
							type="icon"
							className={cn("tlui-focus-button")}
							title={`${msg('focus-mode.toggle-focus-mode')}`}
							icon="dot"
							onClick={() => toggleFocus.onSelect('menu')}
						/>
					</div>
				) : (
					<>
						<div className={cn("tlui-layout__top")}>
							<div className={cn("tlui-layout__top__left")}>
								<MenuZone />
								<div className={cn("tlui-helper-buttons")}>
									<ExitPenMode />
									<BackToContent />
									<StopFollowing />
								</div>
							</div>
							<div className={cn("tlui-layout__top__center")}></div>
							<div className={cn("tlui-layout__top__right")}>
								{breakpoint >= 5 && !isReadonlyMode && (
									<div className={cn("tlui-style-panel__wrapper")}>
										<StylePanel />
									</div>
								)}
                <ScratchPanel scratchNodeUtils={scratchNodeUtils || []} />
							</div>
						</div>
						<div className={cn("tlui-layout__bottom")}>
							<div className={cn("tlui-layout__bottom__main")}>
								<NavigationZone />
								<Toolbar />
								{breakpoint >= 4 && <HelpMenu />}
							</div>
							{isDebugMode && <DebugPanel renderDebugMenuItems={null} />}
						</div>
					</>
				)}
				<Toasts />
				<Dialogs />
				<ToastViewport />
				<FollowingIndicator />
			</div>
		</ToastProvider>
	)
};

