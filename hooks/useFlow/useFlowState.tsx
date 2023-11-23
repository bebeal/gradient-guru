import { TLUiEventHandler } from "@tldraw/tldraw";
import { TLEventInfo, TLStoreEventInfo, UiEvent, UiEventType, useEditor } from "@tldraw/editor";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type FlowStateContextType = {
  canvasEvent: TLEventInfo;
  storeEvents: TLStoreEventInfo[];
  uiEvents: UiEvent[];
  simplifiedStoreEvents: string[];
  onUiEvent: TLUiEventHandler;
  setCanvasEvent: (newCanvasEvent: TLEventInfo) => void;
  setStoreEvents: (newStoreEvents: TLStoreEventInfo[]) => void;
  setUiEvents: (newUiEvents: any[]) => void;
  setSimplifiedStoreEvents: (newSimplifiedStoreEvents: string[]) => void;
};
export const FlowStateContext = createContext<FlowStateContextType | undefined>(undefined);

export type FlowStateProviderProps = {
	children: any;
};
export const FlowStateProvider = (props: FlowStateProviderProps) => {
  const {
    children,
    ...rest
  } = props;
  const editor = useEditor();
  // 3 raw data streams coming from tldraw: canvasEvents, uiEvents, storeEvents
  const [canvasEvent, setCanvasEvent] = useState<TLEventInfo>({} as TLEventInfo);
  const [storeEvents, setStoreEvents] = useState<TLStoreEventInfo[]>([]);
  const [uiEvents, setUiEvents] = useState<UiEvent[]>([]);
  // lower fidelity but more interprettable version of storeEvents
  // breaks down into 3 types of events: added, updated, removed
  const [simplifiedStoreEvents, setSimplifiedStoreEvents] = useState<string[]>([]);
  
  const onCanvasEvent = useCallback((newCanvasEvent: TLEventInfo) => {
    setCanvasEvent(newCanvasEvent);
  }, []);

  const onUiEvent = useCallback<TLUiEventHandler>((name, data) => {
    setUiEvents((uiEvents: any) => [{[name]: data}, ...uiEvents]);
  }, []);

  const logStoreEvent = useCallback((newEvent: TLStoreEventInfo) => {
    setStoreEvents((storeEvents: TLStoreEventInfo[]) => [newEvent, ...storeEvents]);
  }, []);

  const logSimplifiedStoreEvent = useCallback((newEvent: string) => {
    setSimplifiedStoreEvents((simplifiedStoreEvents: string[]) => [newEvent, ...simplifiedStoreEvents]);
  }, []);

  // lower fidelity event logging for store events
  const onStoreEvent = useCallback((event: TLStoreEventInfo) => {
    logStoreEvent(event);
    if (event.source === 'user') {
      // Added
      for (const record of Object.values(event.changes.added)) {
        if (record.typeName === 'shape') {
          logSimplifiedStoreEvent(`created shape (${record.type})`)
        }
      }
      // Updated
      for (const [from, to] of Object.values(event.changes.updated)) {
        if ( from.typeName === 'instance' && to.typeName === 'instance' && from.currentPageId !== to.currentPageId ) {
          logSimplifiedStoreEvent(`changed page (${from.currentPageId}, ${to.currentPageId})`)
        }
      }
      // Removed
      for (const record of Object.values(event.changes.removed)) {
        if (record.typeName === 'shape') {
          logSimplifiedStoreEvent(`deleted shape (${record.type})`)
        }
      }
    }
  }, [logSimplifiedStoreEvent, logStoreEvent]);

  useEffect(() => {
    if (!editor) return;

    editor.on('change', onStoreEvent);
    editor.on('event', onCanvasEvent);

    return () => {
      editor.off('change', onStoreEvent);
      editor.off('event', onCanvasEvent);
    };
  }, [editor, onCanvasEvent, onStoreEvent]);

  const context: FlowStateContextType = {
    canvasEvent,
    storeEvents,
    uiEvents,
    simplifiedStoreEvents,
    onUiEvent,
    setCanvasEvent,
    setStoreEvents,
    setUiEvents,
    setSimplifiedStoreEvents,
  };

  return <FlowStateContext.Provider value={context}>{children}</FlowStateContext.Provider>
}

export const useFlowState = () => {
	const flowState = useContext(FlowStateContext)

	if (!flowState) {
		throw new Error('useFlowState must be used within a FlowStateProvider')
	}

	return flowState;
};
