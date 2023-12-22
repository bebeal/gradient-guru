'use client'

import { TLUiEventHandler } from "@tldraw/tldraw";
import { TLRecord } from '@tldraw/tlschema';
import { RecordsDiff } from '@tldraw/store';
import { TLEventInfo, TLStoreEventInfo, UiEvent, useEditor } from "@tldraw/editor";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type UiState = UiEvent & {
  name: string;
};

export type ContentRecorderState = {
  canvasState: TLEventInfo;
  setCanvasState: (newCanvasEvent: TLEventInfo) => void;
  uiState: UiState;
  onUiEvent: TLUiEventHandler;
  setUiState: (newUiState: UiEvent) => void;
  historyRecords: RecordsDiff<TLRecord>[];
  readableRecords: string[];
  addHistoryRecord: (newHistoryRecord: RecordsDiff<TLRecord>, historyRecordsBufferSize?: number) => void;
};

export const ContentRecorderContext = createContext<ContentRecorderState | undefined>(undefined);
export const ContentRecorderProvider = (props: any) => {
  const {
    historyRecordsBufferSize = 1000,
    children,
  } = props;
  const editor = useEditor();
  const [canvasState, setCanvasState] = useState<TLEventInfo>({} as TLEventInfo);
  const [uiState, setUiState] = useState<UiState>({} as UiState);
  const [historyRecords, setHistoryRecords] = useState<RecordsDiff<TLRecord>[]>([]);
  const [readableRecords, setReadableRecords] = useState<string[]>([]);

  const onCanvasEvent = useCallback((newCanvasEvent: any) => {    
    setCanvasState(Object.keys(newCanvasEvent).sort().reduce((obj: any, key: any) => {
      obj[key] = newCanvasEvent?.[key];
      return obj;
    }, {}));
  }, [setCanvasState]);

  const onUiEvent = useCallback<TLUiEventHandler>((name, data) => {
    setUiState({name, ...data} as any);
  }, [setUiState]);

  const checkRecords = useCallback((records: any) => {
    for (const record of Object.values(records) as any) {
      if (record.typeName === 'shape') {
        return true;
      }
    }
    return false;
  }, []);

  const isShapeEvent = useCallback((event: TLStoreEventInfo) => {
    const { added, removed, updated } = event.changes;
    return checkRecords(added) || checkRecords(removed) || Object.values(updated).some(([from, to]: any) => from.typeName === 'shape' && to.typeName === 'shape');
  }, [checkRecords]);

  // TODO: fix this, the incoming data stream broke, eventInfo has many items in updated every time this icalled, and its never called with added or removed
  const addReadableRecord = useCallback((eventInfo: RecordsDiff<TLRecord>) => {
    const events: string[] = [];
    const { added, updated, removed } = eventInfo;
    for (const record of Object.values(added) as any) {
      if (record.typeName === 'shape') {
        events.push(`user created shape [${record.type}] - ${(record.id).replace('shape:', '')}`)
      }
    }
    for (const [from, to] of Object.values(updated) as any) {
      if ( from.typeName === 'shape' || to.typeName === 'shape') {
        // collpase when pushing this event only if its different from last event in arary
        if (events.length > 0 && !events[events.length - 1].includes(`user updated shape [${to.type}] - ${(to.id).replace('shape:', '')}`)) {
          events.push(`user updated shape [${to.type}] - ${(to.id).replace('shape:', '')}`);
        }
      }
    }
    for (const record of Object.values(removed) as any) {
      if (record.typeName === 'shape') {
        events.push(`user deleted shape [${record.type}] - ${(record.id).replace('shape:', '')}`)
      }
    }
    setReadableRecords((prevReadableRecords: any) => {
      return [
        ...prevReadableRecords,
        ...events,
      ] as any;
    });
  }, []);

  const addHistoryRecord = useCallback((newHistoryRecord: RecordsDiff<TLRecord>, historyRecordsBufferSize?: number) => {
    setHistoryRecords((prevHistoryRecords: any) => {
      const newHistoryRecords = [
        ...prevHistoryRecords,
        newHistoryRecord,
      ];
      if (historyRecordsBufferSize && newHistoryRecords.length > historyRecordsBufferSize) {
        newHistoryRecords.shift();
      }
      return newHistoryRecords;
    });
  }, []);

  const onStoreEvent = useCallback((event: TLStoreEventInfo) => {
    if (event.source === 'user' && isShapeEvent(event)) {
      addHistoryRecord(event.changes, historyRecordsBufferSize);
      addReadableRecord(event.changes);
    }
  }, [addHistoryRecord, addReadableRecord, historyRecordsBufferSize, isShapeEvent]);

  // useEffect(() => {
  //   console.log('historyRecords', historyRecords);
  //   console.log('readableRecords', readableRecords);
  // }, [historyRecords, readableRecords]);

  useEffect(() => {
    if (!editor) return;

    editor.on('change', onStoreEvent);
    editor.on('event', onCanvasEvent);

    // TODO: fix later. idk why initial UI event isn't getting picked up, just ignoring it for now
    const fakeUiState = {
      id: 'select',
      name: 'select-tool',
      source: 'toolbar'
    };
    setUiState(fakeUiState as any);

    return () => {
      editor.off('change');
      editor.off('event');
    };
  }, [editor, onCanvasEvent, onStoreEvent, setUiState]);

  const context: ContentRecorderState = {
    canvasState,
    setCanvasState,
    uiState,
    setUiState,
    onUiEvent,
    historyRecords,
    readableRecords,
    addHistoryRecord
  };

  return <ContentRecorderContext.Provider value={context}>{children}</ContentRecorderContext.Provider>
};

export const useContentRecorder = () => {
	const flowEventsRecorder = useContext(ContentRecorderContext)

	if (!flowEventsRecorder) {
		throw new Error('useContentRecorder must be used within a ContentRecorderProvider')
	}

	return {
    ...flowEventsRecorder,
  };
};
