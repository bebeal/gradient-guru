'use client'

import { TLUiEventHandler } from "@tldraw/tldraw";
import { TLRecord } from '@tldraw/tlschema';
import { RecordsDiff } from '@tldraw/store';
import { TLEventInfo, TLStoreEventInfo, UiEvent, useEditor } from "@tldraw/editor";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type FlowEventsRecorderContextType = {
  canvasEvent: TLEventInfo;
  historyRecords: RecordsDiff<TLRecord>[];
  uiEvents: UiEvent[];
  onUiEvent: TLUiEventHandler;
  getHistoryRecords: () => string[];
  setCanvasEvent: (newCanvasEvent: TLEventInfo) => void;
  setUiEvents: (newUiEvents: any[]) => void;
};
export const FlowEventsRecorderContext = createContext<FlowEventsRecorderContextType | undefined>(undefined);

export type FlowEventsRecorderProviderProps = {
  historyRecordsBufferSize?: number;
	children: any;
};
export const FlowEventsRecorderProvider = (props: FlowEventsRecorderProviderProps) => {
  const {
    historyRecordsBufferSize = 1000,
    children,
    ...rest
  } = props;
  const editor = useEditor();
  // 3 raw data streams coming from tldraw: canvasEvents, uiEvents, historyRecords
  const [canvasEvent, setCanvasEvent] = useState<TLEventInfo>({} as TLEventInfo);
  // lower fidelity but more interprettable version of historyRecords
  // breaks down into 3 types of events: added, updated, removed
  const historyRecords = useRef<RecordsDiff<TLRecord>[]>([]);
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

  const getHistoryRecords = useCallback(() => {
    const events: string[] = [];
    historyRecords.current.forEach((diff: any) => {
      const { added, updated, removed } = diff;
      for (const record of Object.values(added) as any) {
        if (record.typeName === 'shape') {
          events.push(`user created shape (${(record.id).replace('shape:', '')} - ${record.type})`)
        }
      }
      for (const [from, to] of Object.values(updated) as any) {
        if ( from.typeName === 'shape' || to.typeName === 'shape') {
          // collpase when pushing this event only if its different from last event in arary
          if (events.length > 0 && !events[events.length - 1].includes(`user updated shape (${(to.id).replace('shape:', '')})`)) {
            events.push(`user updated shape (${(to.id).replace('shape:', '')})`);
          }
        }
      }
      for (const record of Object.values(removed) as any) {
        if (record.typeName === 'shape') {
          events.push(`user deleted shape (${(record.id).replace('shape:', '')} - ${record.type})`)
        }
      }
    });
    return events;
  }, [historyRecords]);

  const isShapeEvent = useCallback((event: TLStoreEventInfo) => {
    const checkRecords = (records: any) => {
      for (const record of Object.values(records) as any) {
        if (record.typeName === 'shape') {
          return true;
        }
      }
      return false;
    };
  
    const { added, removed, updated } = event.changes;
  
    return checkRecords(added) || checkRecords(removed) || Object.values(updated).some(([from, to]: any) => from.typeName === 'shape' && to.typeName === 'shape');
  }, []);


  // lower fidelity event logging for store events
  const onStoreEvent = useCallback((event: TLStoreEventInfo) => {
    if (event.source === 'user' && isShapeEvent(event)) {
      if (historyRecords.current.length > historyRecordsBufferSize) {
        historyRecords.current.shift();
      }
      historyRecords.current.push(event.changes);
    }
  }, [historyRecordsBufferSize, isShapeEvent]);

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
    historyRecords: historyRecords.current,
    uiEvents,
    onUiEvent,
    setUiEvents,
    getHistoryRecords,
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
