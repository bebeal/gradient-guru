import { TLUiEventHandler } from "@tldraw/tldraw";
import { TLEventInfo, TLStoreEventInfo, UiEvent, UiEventType, useEditor } from "@tldraw/editor";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type FlowStateContextType = {
  canvasEvent: TLEventInfo;
  storeEvents: string[];
  uiEvents: UiEvent[];
  onUiEvent: TLUiEventHandler;
  setCanvasEvent: (newCanvasEvent: TLEventInfo) => void;
  setStoreEvents: (newStoreEvents: string[]) => void;
  setUiEvents: (newUiEvents: any[]) => void;
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
  // lower fidelity but more interprettable version of storeEvents
  // breaks down into 3 types of events: added, updated, removed
  const [storeEvents, setStoreEvents] = useState<string[]>([]);
  const [uiEvents, setUiEvents] = useState<UiEvent[]>([]);
  
  const onCanvasEvent = useCallback((newCanvasEvent: any) => {    
    setCanvasEvent(Object.keys(newCanvasEvent).sort().reduce((obj: any, key: any) => {
      obj[key] = newCanvasEvent?.[key];
      return obj;
    }, {}));
  }, []);

  const onUiEvent = useCallback<TLUiEventHandler>((name, data) => {
    setUiEvents((uiEvents: any) => [{name, ...data}, ...uiEvents]);
  }, []);

  const logStoreEvent = useCallback((newEvent: string) => {
    setStoreEvents((storeEvents: string[]) => [newEvent, ...storeEvents]);
  }, []);

  // lower fidelity event logging for store events
  const onStoreEvent = useCallback((event: TLStoreEventInfo) => {
    if (event.source === 'user') {
      // Added
      for (const record of Object.values(event.changes.added)) {
        if (record.typeName === 'shape') {
          logStoreEvent(`${event.source} created shape (${(record.id).replace('shape:', '')} - ${record.type})`)
        }
      }
      // Updated
      for (const [from, to] of Object.values(event.changes.updated)) {
        if ( from.typeName === 'instance' && to.typeName === 'instance' && from.currentPageId !== to.currentPageId ) {
          logStoreEvent(`${event.source} changed page (${from.currentPageId}, ${to.currentPageId})`)
        }
      }
      // Removed
      for (const record of Object.values(event.changes.removed)) {
        if (record.typeName === 'shape') {
          logStoreEvent(`${event.source} deleted shape (${(record.id).replace('shape:', '')} - ${record.type})`)
        }
      }
    }
  }, [logStoreEvent]);

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
    onUiEvent,
    setStoreEvents,
    setCanvasEvent,
    setUiEvents,
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
