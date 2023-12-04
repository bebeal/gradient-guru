'use client'

import { 
  ContextMenu,
  TLUiEventSource,
  TLUiOverrides,
  TldrawHandles,
  TldrawHoveredShapeIndicator,
  TldrawProps,
  TldrawScribble,
  TldrawSelectionBackground,
  TldrawSelectionForeground,
  defaultShapeTools,
  defaultShapeUtils,
  defaultTools,
  toolbarItem
} from '@tldraw/tldraw';
import {
	Canvas,
	Editor,
	ErrorScreen,
	LoadingScreen,
	TLAnyShapeUtilConstructor,
	TLOnMountHandler,
	TLStateNodeConstructor,
	TldrawEditor,
	TldrawEditorProps,
	assert,
	useEditor,
} from '@tldraw/editor'
import { registerDefaultSideEffects } from '@tldraw/tldraw/src/lib/defaultSideEffects';
import { usePreloadAssets } from '@tldraw/tldraw/src/lib/ui/hooks/usePreloadAssets';
import { TLExternalContentProps, registerDefaultExternalContentHandlers } from '@tldraw/tldraw/src/lib/defaultExternalContentHandlers';
import { TLEditorAssetUrls, useDefaultEditorAssetsWithOverrides } from '@tldraw/tldraw/src/lib/utils/static-assets/assetUrls';
import { useCallback, useDebugValue, useLayoutEffect, useMemo, useRef } from 'react'
import { DropWrapper, FlowUi, FlowUiProps } from '@/components';
import { Erroring, Loading, cn } from '@/utils';

import { FlowEventsRecorderProvider } from '@/hooks';
import { IconNodeUtil } from './FlowNodes';
import { IconNodeTool } from './FlowTools';

import '@tldraw/tldraw/tldraw.css';
import './Flow.css';

export type FlowProps = TldrawProps & FlowUiProps & {
}

export const Flow = (props: FlowProps) => {
	const {
    // Custom props
    initialShapes=[],
    shapeUtils=[],
    tools=[],
    // Default props
		children,
		maxImageDimension,
		maxAssetSize,
		acceptedImageMimeTypes,
		acceptedVideoMimeTypes,
		onMount,
		...rest
	} = props;
  const assets: TLEditorAssetUrls = useDefaultEditorAssetsWithOverrides(rest.assetUrls);
  const { done: preloadingComplete, error: preloadingError } = usePreloadAssets(assets);
  const customShapeUtils: TLAnyShapeUtilConstructor[] = useMemo(() => [IconNodeUtil], []);
  const customTools: TLStateNodeConstructor[] = useMemo(() => [IconNodeTool], []);

  const overrides: TLUiOverrides = useMemo(() => ({
    tools(editor, tools) {
      // Create a tool item in the ui's context.
      tools.icon = {
        id: 'icon',
        label: 'tool.icon' as any,
        readonlyOk: false,
        icon: 'ApplicationWeb',
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
  
  const withDefaults: TldrawEditorProps = {
		initialState: 'select',
		...rest,
		components: useMemo(
			() => ({
				Scribble: TldrawScribble,
				CollaboratorScribble: TldrawScribble,
				SelectionForeground: TldrawSelectionForeground,
				SelectionBackground: TldrawSelectionBackground,
				Handles: TldrawHandles,
				HoveredShapeIndicator: TldrawHoveredShapeIndicator,
				...rest.components,
			}),
			[rest.components]
		),
		shapeUtils: useMemo(
			() => [...defaultShapeUtils, ...customShapeUtils, ...(shapeUtils ?? [])],
			[customShapeUtils, shapeUtils]
		),
		tools: useMemo(
			() => [...defaultTools, ...customTools, ...defaultShapeTools, ...(tools ?? [])],
			[customTools, tools]
		),
	};

	if (preloadingError) { return <ErrorScreen><Erroring>Could not load assets. Please refresh the page.</Erroring></ErrorScreen>; }
	if (!preloadingComplete) { return <LoadingScreen><div className="flex w-full h-auto justify-center items-center"><Loading dots={true} spinner={false}>Loading assets</Loading></div></LoadingScreen> }
	return (
		<TldrawEditor onMount={onMount} {...withDefaults} className={cn('w-full h-full flex flex-row', rest.className)} >
      <FlowEventsRecorderProvider>
        <FlowUi overrides={overrides} initialShapes={initialShapes} {...withDefaults}>
          <ContextMenu>
            <DropWrapper>
              <Canvas />
            </DropWrapper>
          </ContextMenu>
          <InsideOfEditorContext
            maxImageDimension={maxImageDimension}
            maxAssetSize={maxAssetSize}
            acceptedImageMimeTypes={acceptedImageMimeTypes}
            acceptedVideoMimeTypes={acceptedVideoMimeTypes}
            onMount={onMount}
          />
          {children}
        </FlowUi>
      </FlowEventsRecorderProvider>
		</TldrawEditor>
	)
}

// We put these hooks into a component here so that they can run inside of the context provided by TldrawEditor.
const InsideOfEditorContext = ({
	maxImageDimension = 1000,
	maxAssetSize = 10 * 1024 * 1024, // 10mb
	acceptedImageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'],
	acceptedVideoMimeTypes = ['video/mp4', 'video/quicktime'],
	onMount,
}: Partial<TLExternalContentProps & { onMount: TLOnMountHandler }>) => {
	const editor = useEditor();

	const onMountEvent = useEvent((editor: Editor) => {
		const unsubs: (void | (() => void) | undefined)[] = [];

		unsubs.push(...registerDefaultSideEffects(editor));

		// for content handling, first we register the default handlers...
		registerDefaultExternalContentHandlers(editor, {
			maxImageDimension,
			maxAssetSize,
			acceptedImageMimeTypes,
			acceptedVideoMimeTypes,
		});

		// ...then we run the onMount prop, which may override the above
		unsubs.push(onMount?.(editor));

		return () => {
			unsubs.forEach((fn) => fn?.());
		}
	});

	useLayoutEffect(() => {
		if (editor) return onMountEvent?.(editor);
	}, [editor, onMountEvent])

	return null;
};

// duped from tldraw editor
const useEvent = <Args extends Array<unknown>, Result>(handler: (...args: Args) => Result) => {
	const handlerRef = useRef<(...args: Args) => Result>();

	useLayoutEffect(() => {
		handlerRef.current = handler;
	})

	useDebugValue(handler);

	return useCallback((...args: Args) => {
		const fn = handlerRef.current;
		assert(fn, 'fn does not exist');
		return fn(...args);
	}, []);
}
