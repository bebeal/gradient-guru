'use client'

import { 
  TldrawProps
} from '@tldraw/tldraw';
import {
	Canvas,
	Editor,
	ErrorScreen,
	LoadingScreen,
	TLOnMountHandler,
	TldrawEditor,
	TldrawEditorProps,
	assert,
	setUserPreferences,
	useEditor,
} from '@tldraw/editor'
import { useCallback, useDebugValue, useLayoutEffect, useMemo, useRef } from 'react'
import { TldrawHandles } from '@tldraw/tldraw/src/lib/canvas/TldrawHandles';
import { TldrawHoveredShapeIndicator } from '@tldraw/tldraw/src/lib/canvas/TldrawHoveredShapeIndicator'
import { TldrawScribble } from '@tldraw/tldraw/src/lib/canvas/TldrawScribble'
import { TldrawSelectionBackground } from '@tldraw/tldraw/src/lib/canvas/TldrawSelectionBackground'
import { TldrawSelectionForeground } from '@tldraw/tldraw/src/lib/canvas/TldrawSelectionForeground'
import {
	TLExternalContentProps,
	registerDefaultExternalContentHandlers,
} from '@tldraw/tldraw/src/lib/defaultExternalContentHandlers'
import { defaultShapeTools } from '@tldraw/tldraw/src/lib/defaultShapeTools'
import { defaultShapeUtils } from '@tldraw/tldraw/src/lib/defaultShapeUtils'
import { registerDefaultSideEffects } from '@tldraw/tldraw/src/lib/defaultSideEffects'
import { defaultTools } from '@tldraw/tldraw/src/lib/defaultTools'
import { ContextMenu } from '@tldraw/tldraw/src/lib/ui/components/ContextMenu'
import { usePreloadAssets } from '@tldraw/tldraw/src/lib/ui/hooks/usePreloadAssets'
import { useDefaultEditorAssetsWithOverrides } from '@tldraw/tldraw/src/lib/utils/static-assets/assetUrls'
import { FlowUi, FlowUiProps } from '@/components';
import { cn } from '@/utils';
import '@tldraw/tldraw/tldraw.css';
import './Flow.css';

const customShapeUtils: any = [];
const customTools: any = [];

export type FlowProps = TldrawProps & FlowUiProps & {
}

export const Flow = (props: FlowProps) => {
	const {
    // Custom props
    initialShapes=[],
    shapeUtils=customShapeUtils,
    tools=customTools,
    // Default props
		children,
		maxImageDimension,
		maxAssetSize,
		acceptedImageMimeTypes,
		acceptedVideoMimeTypes,
		onMount,
		...rest
	} = props

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
			() => [...defaultShapeUtils, ...(shapeUtils ?? [])],
			[shapeUtils]
		),
		tools: useMemo(
			() => [...defaultTools, ...defaultShapeTools, ...(tools ?? [])],
			[tools]
		),
	};

	const assets = useDefaultEditorAssetsWithOverrides(rest.assetUrls);
	const { done: preloadingComplete, error: preloadingError } = usePreloadAssets(assets);

	if (preloadingError) { return <ErrorScreen>Could not load assets. Please refresh the page.</ErrorScreen>; }
	if (!preloadingComplete) { return <LoadingScreen>Loading assets...</LoadingScreen>; }
	return (
		<TldrawEditor {...withDefaults} className={cn('w-full h-full flex flex-row', rest.className)}>
			<FlowUi initialShapes={initialShapes} {...withDefaults}>
				<ContextMenu>
					<Canvas />
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
