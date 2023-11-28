
import { TLUiEventHandler } from "@tldraw/tldraw";
import { cn } from '@/utils';
import { TLRecord } from '@tldraw/tlschema';
import { RecordsDiff } from '@tldraw/store';
import { Slider } from '@/components';
import { Editor, TLEventInfo, TLShape, TLShapeId, TLStoreEventInfo, UiEvent, UiEventType, useEditor } from "@tldraw/editor";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type FlowEventsRecorderContextType = {
  canvasEvent: TLEventInfo;
  storeEvents: RecordsDiff<TLRecord>[];
  uiEvents: UiEvent[];
  onUiEvent: TLUiEventHandler;
  getStoreEvents: () => string[];
  setCanvasEvent: (newCanvasEvent: TLEventInfo) => void;
  setUiEvents: (newUiEvents: any[]) => void;
};
export const FlowEventsRecorderContext = createContext<FlowEventsRecorderContextType | undefined>(undefined);

export type FlowEventsRecorderProviderProps = {
	children: any;
};
export const FlowEventsRecorderProvider = (props: FlowEventsRecorderProviderProps) => {
  const {
    children,
    ...rest
  } = props;
  const editor = useEditor();
  // 3 raw data streams coming from tldraw: canvasEvents, uiEvents, storeEvents
  const [canvasEvent, setCanvasEvent] = useState<TLEventInfo>({} as TLEventInfo);
  // lower fidelity but more interprettable version of storeEvents
  // breaks down into 3 types of events: added, updated, removed
  const storeEvents = useRef<RecordsDiff<TLRecord>[]>([]);
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

  const getStoreEvents = useCallback(() => {
    const events: string[] = [];
    storeEvents.current.forEach((diff: any) => {
      const { added, updated, removed } = diff;
      for (const record of Object.values(added) as any) {
        if (record.typeName === 'shape') {
          events.push(`user created shape (${(record.id).replace('shape:', '')} - ${record.type})`)
        }
      }
      for (const record of Object.values(updated) as any) {
        if (record.typeName === 'shape') {
          events.push(`user updated shape (${(record.id).replace('shape:', '')} - ${record.type})`)
        }
      }
      for (const record of Object.values(removed) as any) {
        if (record.typeName === 'shape') {
          events.push(`user deleted shape (${(record.id).replace('shape:', '')} - ${record.type})`)
        }
      }
    });
    return events;
  }, [storeEvents]);


  // lower fidelity event logging for store events
  const onStoreEvent = useCallback((event: TLStoreEventInfo) => {
    if (event.source === 'user') {
      storeEvents.current.push(event.changes);
    }
  }, []);

  useEffect(() => {
    if (!editor) return;

    editor.on('change', onStoreEvent);
    editor.on('event', onCanvasEvent);

    return () => {
      editor.off('change', onStoreEvent);
      editor.off('event', onCanvasEvent);
    };
  }, [editor, onCanvasEvent, onStoreEvent]);

  const context: FlowEventsRecorderContextType = {
    canvasEvent,
    storeEvents: storeEvents.current,
    uiEvents,
    onUiEvent,
    setUiEvents,
    getStoreEvents,
    setCanvasEvent,
  };

  return <FlowEventsRecorderContext.Provider value={context}>{children}</FlowEventsRecorderContext.Provider>
}

export const useFlowEventsRecorder = () => {
	const flowEventsRecorder = useContext(FlowEventsRecorderContext)

	if (!flowEventsRecorder) {
		throw new Error('useFlowEventsRecorder must be used within a FlowEventsRecorderProvider')
	}

	return flowEventsRecorder;
};
