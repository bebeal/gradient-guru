'use client'

import { TLUiEventHandler } from "@tldraw/tldraw";
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { TLRecord } from '@tldraw/tlschema';
import { RecordsDiff } from '@tldraw/store';
import { TLEventInfo, TLStoreEventInfo, UiEvent, useEditor } from "@tldraw/editor";
import { useCallback, useEffect } from "react";

// lower fidelity but more interprettable version of historyRecords
const convertToReadableRecords = (historyRecords: RecordsDiff<TLRecord>[]) => {
  console.log(historyRecords);
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
  console.log(events);
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
  historyRecords: [] as RecordsDiff<TLRecord>[],
  readableRecords: [] as string[],
  addHistoryRecord: (newHistoryRecord: RecordsDiff<TLRecord>, historyRecordsBufferSize=10000) => {
    const readableRecords = convertToReadableRecords([newHistoryRecord]);
    const historyRecords = [...get().historyRecords, newHistoryRecord].slice(-historyRecordsBufferSize);
    set({ historyRecords, readableRecords });
  }
}));

export const useContentRecorder = () => {
  const historyRecordsBufferSize = 1000;
  const editor = useEditor();
  const canvasState = useContentRecorderStore(useShallow((state) => state.canvasState));
  const setCanvasState = useContentRecorderStore(useShallow((state) => state.setCanvasState));
  const uiState = useContentRecorderStore(useShallow((state) => state.uiState));
  const setUiState = useContentRecorderStore(useShallow((state) => state.setUiState));
  const historyRecords = useContentRecorderStore(useShallow((state) => state.historyRecords));
  const readableRecords = useContentRecorderStore(useShallow((state) => state.readableRecords));
  const addHistoryRecord = useContentRecorderStore(useShallow((state) => state.addHistoryRecord));
  
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
    useContentRecorderStore.setState((state: any) => {
      return [
        ...state.readableRecords,
        events.join('\n'),
      ] as any;
    });
  }, []);

  const onStoreEvent = useCallback((event: TLStoreEventInfo) => {
    if (event.source === 'user' && isShapeEvent(event)) {
      addHistoryRecord(event.changes, historyRecordsBufferSize);
    }
  }, [addHistoryRecord, historyRecordsBufferSize, isShapeEvent]);

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
