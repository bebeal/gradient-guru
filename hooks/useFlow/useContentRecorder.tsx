'use client'

import { TLUiEventHandler } from "@tldraw/tldraw";
import { create } from 'zustand';
import { TLRecord } from '@tldraw/tlschema';
import { RecordsDiff } from '@tldraw/store';
import { TLEventInfo, TLStoreEventInfo, UiEvent, useEditor } from "@tldraw/editor";
import { useCallback, useEffect } from "react";

// lower fidelity but more interprettable version of historyRecords
const convertToReadableRecords = (historyRecords: RecordsDiff<TLRecord>[]) => {
  const events: string[] = [];
  historyRecords.forEach((diff: any) => {
    const { added, updated, removed } = diff;
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
  });
  return events;
};

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
export const useContentRecorderStore = create<ContentRecorderState>((set, get) => ({
  canvasState: {} as TLEventInfo,
  setCanvasState: (newCanvasEvent: TLEventInfo) => set({ canvasState: newCanvasEvent }),
  uiState: {} as UiState,
  onUiEvent: (name: string, data: any) => {},
  setUiState: (newUiState: UiEvent) => set({ uiState: newUiState }),
  historyRecords: [],
  readableRecords: [],
  addHistoryRecord: (newHistoryRecord: RecordsDiff<TLRecord>, historyRecordsBufferSize=10000) => {
    const readableRecords = convertToReadableRecords([newHistoryRecord]);
    const historyRecords = [...get().historyRecords, newHistoryRecord].slice(-historyRecordsBufferSize);
    set({ historyRecords, readableRecords });
  }
}));

export const useContentRecorder = () => {
  const historyRecordsBufferSize = 10000;
  const editor = useEditor();
  const canvasState = useContentRecorderStore((state) => state.canvasState);
  const setCanvasState = useContentRecorderStore((state) => state.setCanvasState);
  const uiState = useContentRecorderStore((state) => state.uiState);
  const setUiState = useContentRecorderStore((state) => state.setUiState);
  const historyRecords = useContentRecorderStore((state) => state.historyRecords);
  const readableRecords = useContentRecorderStore((state) => state.readableRecords);
  const addHistoryRecord = useContentRecorderStore((state) => state.addHistoryRecord);
  
  const onCanvasEvent = useCallback((newCanvasEvent: any) => {    
    setCanvasState(Object.keys(newCanvasEvent).sort().reduce((obj: any, key: any) => {
      obj[key] = newCanvasEvent?.[key];
      return obj;
    }, {}));
  }, [setCanvasState]);

  const onUiEvent = useCallback<TLUiEventHandler>((name, data) => {
    setUiState({name, ...data} as any);
  }, [setUiState]);

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
      addHistoryRecord(event.changes, historyRecordsBufferSize);
    }
  }, [addHistoryRecord, historyRecordsBufferSize, isShapeEvent]);

  useEffect(() => {
    if (!editor) return;

    editor.on('change', onStoreEvent);
    editor.on('event', onCanvasEvent);

    return () => {
      editor.off('change');
      editor.off('event');
    };
  }, [editor, onCanvasEvent, onStoreEvent]);

  return {
    canvasState,
    setCanvasState,
    uiState,
    setUiState,
    onUiEvent,
    historyRecords,
    readableRecords,
    addHistoryRecord
  };
}
