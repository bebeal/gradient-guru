'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, TLUiEventHandler, TLUiEventSource, TLUiOverrides, TldrawUiContextProvider, TldrawUiProps, toolbarItem, useActions, useBreakpoint, useKeyboardShortcuts, useNativeClipboardEvents, useTranslation, useUiEvents } from '@tldraw/tldraw';
import { TLShape, setUserPreferences, useEditor, useValue } from '@tldraw/editor'
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
import { FlowEventsRecorderProvider, useFlowEventsRecorder } from '@/hooks';

export type FlowUiProps = TldrawUiProps & {
  initialShapes?: TLShape[];
};

export const FlowUi = (props: FlowUiProps) => {
  const {
    children,
    hideUi=false,
    initialShapes,
    onUiEvent: onUiEventCallback,
    ...rest
  } = props;
  const { onUiEvent: recordUiEvent } = useFlowEventsRecorder();

  const onUiEvent = useCallback<TLUiEventHandler>((name, data) => {
    recordUiEvent?.(name, data);
    onUiEventCallback?.(name, data);
  }, [onUiEventCallback, recordUiEvent]);

  const uiOverrides: TLUiOverrides = useMemo(() => ({
    tools(editor, tools) {
      // Create a tool item in the ui's context.
      tools.icon = {
        id: 'icon',
        label: 'tool.icon' as any,
        readonlyOk: false,
        icon: 'color',
        kbd: 'c',
        onSelect: (source: TLUiEventSource) => {
          editor.setCurrentTool('icon')
          // trackEvent('select-tool', { source, id: 'icon' })
        },
      }
      return tools
    },
    toolbar(_app, toolbar, { tools }) {
      toolbar.push(toolbarItem(tools.icon))
      return toolbar
    },
  }), []);

	return (
		<TldrawUiContextProvider overrides={uiOverrides} onUiEvent={onUiEvent} {...rest}>
        <FlowUiInner
          initialShapes={initialShapes}
          hideUi={hideUi}
          {...rest}
        >
          {children}
        </FlowUiInner>
		</TldrawUiContextProvider>
	)
};

const FlowUiInner = (props: FlowUiProps) => {
  const {
    children,
    hideUi,
    initialShapes,
    ...rest
  } = props;
	// The hideUi prop should prevent the UI from mounting.
	// If we ever need want the UI to mount and preserve state, then
	// we should change this behavior and hide the UI via CSS instead.
	return (
		<>
			{children}
			{hideUi ? null : <FlowUiContent initialShapes={initialShapes} {...rest} />}
		</>
	)
};

const FlowUiContent = (props: FlowUiProps) => {
  const {
    initialShapes,
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
      editor.setCurrentTool('select');

      setTimeout(() => {
        if (initialShapes && initialShapes?.length > 0) {
          editor.createShapes(initialShapes);
        }
        editor.zoomToFit();
        setMounted(true);
      }, 0);
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

