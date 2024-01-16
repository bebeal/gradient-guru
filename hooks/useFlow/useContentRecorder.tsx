'use client'

import { formatNodeId } from "@/components";
import { TLUiEventHandler, TLEventInfo, TLStoreEventInfo, UiEvent, useEditor, TLRecord, RecordsDiff} from "@tldraw/tldraw";
import { useCallback, useEffect } from "react";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

const HistoryRecordsBufferSize = 1000;

const checkRecords = (records: any) => {
  for (const record of Object.values(records) as any) {
    if (record.typeName === 'shape') {
      return true;
    }
  }
  return false;
};

const isShapeEvent = (event: TLStoreEventInfo) => {
  const { added, removed, updated } = event.changes;
  return checkRecords(added) || checkRecords(removed) || Object.values(updated).some(([from, to]: any) => from.typeName === 'shape' && to.typeName === 'shape');
};

export type UiState = UiEvent & {
  name: string;
};

export type ContentRecorderState = {
  frameId: number | null;
  setFrameId: (newFrameId: number | null) => void;
  canvasState: TLEventInfo;
  setCanvasState: (newCanvasEvent: TLEventInfo) => void;
  uiState: UiState;
  // onUiEvent: TLUiEventHandler;
  setUiState: (newUiState: UiEvent) => void;
  historyRecords: RecordsDiff<TLRecord>[];
  setHistoryRecords?: (newHistoryRecords: RecordsDiff<TLRecord>[]) => void;
  addHistoryRecord: (newHistoryRecord: RecordsDiff<TLRecord>) => void;
  readableRecords: string[];
  setReadableRecords?: (newReadableRecords: string[]) => void;
  addReadableRecord: (eventInfo: RecordsDiff<TLRecord>) => void;
};

export const useContentRecorderStore = create<ContentRecorderState>((set, get) => ({
  frameId: null,
  setFrameId: (newFrameId: number | null) => set({ frameId: newFrameId }),
  canvasState: {} as TLEventInfo,
  uiState: {} as UiState,
  historyRecords: [],
  readableRecords: [],
  setCanvasState: (newCanvasEvent: TLEventInfo) => set({ canvasState: newCanvasEvent }),
  setUiState: (newUiState: UiEvent) => set({ uiState: newUiState }),
  setHistoryRecords: (newHistoryRecords: RecordsDiff<TLRecord>[]) => set({ historyRecords: newHistoryRecords }),
  setReadableRecords: (newReadableRecords: string[]) => set({ readableRecords: newReadableRecords }),
  addHistoryRecord: (newHistoryRecord: RecordsDiff<TLRecord>) => set((state) => {
    const newHistoryRecords = [
      ...state.historyRecords,
      newHistoryRecord,
    ];
    if (HistoryRecordsBufferSize > HistoryRecordsBufferSize) {
      newHistoryRecords.shift();
    }
    return { historyRecords: newHistoryRecords };
  }),
  addReadableRecord: (eventInfo: RecordsDiff<TLRecord>) => set((state) => {
    const events: string[] = [];
    const { added, updated, removed } = eventInfo;
    for (const record of Object.values(added) as any) {
      if (record.typeName === 'shape') {
        events.push(`user created shape [${record.type}] - ${formatNodeId(record.id)}`)
      }
    }
    for (const [from, to] of Object.values(updated) as any) {
      if ( from.typeName === 'shape' || to.typeName === 'shape') {
        // collpase when pushing this event only if its different from last event in arary
        if (events.length > 0 && !events[events.length - 1].includes(`user updated shape [${to.type}] - ${formatNodeId(to.id)}`)) {
          events.push(`user updated shape [${to.type}] - ${formatNodeId(to.id)}`)
        }
      }
    }
    for (const record of Object.values(removed) as any) {
      if (record.typeName === 'shape') {
        events.push(`user deleted shape [${record.type}] - ${formatNodeId(record.id)}`)
      }
    }
    const newReadableRecords = [
      ...state.readableRecords,
      ...events,
    ];
    return { readableRecords: newReadableRecords };
  }),
}));

export const useContentRecorder = () => {
  const editor = useEditor();
  const frameId = useContentRecorderStore(useShallow((state) => state.frameId));
  const setFrameId = useContentRecorderStore(useShallow((state) => state.setFrameId));
  const canvasState = useContentRecorderStore(useShallow((state) => state.canvasState));
  const uiState = useContentRecorderStore(useShallow((state) => state.uiState));
  const historyRecords = useContentRecorderStore(useShallow((state) => state.historyRecords));
  const readableRecords = useContentRecorderStore(useShallow((state) => state.readableRecords));
  const setCanvasState = useContentRecorderStore(useShallow((state) => state.setCanvasState));
  const setUiState = useContentRecorderStore(useShallow((state) => state.setUiState));
  const addHistoryRecord = useContentRecorderStore(useShallow((state) => state.addHistoryRecord));
  const addReadableRecord = useContentRecorderStore(useShallow((state) => state.addReadableRecord));

  // const requestFrameUpdate = useCallback((callback: () => void) => {
  //   if (frameId === null) {
  //     const id = requestAnimationFrame(() => {
  //       callback();
  //       setFrameId(null); // Reset frameId after the frame is rendered
  //     });
  //     setFrameId(id);
  //   }
  // }, [frameId, setFrameId]);

  const onUiEvent = useCallback<TLUiEventHandler>((name, data) => {
    setUiState({ name, ...data } as any);
  }, [setUiState]);

  const onCanvasEvent = useCallback((newCanvasEvent: any) => {
    // requestFrameUpdate(() => setCanvasState(newCanvasEvent));
    setCanvasState(newCanvasEvent);
  }, [setCanvasState]);

  const onStoreEvent = useCallback((event: TLStoreEventInfo) => {
    if (event.source === 'user' && isShapeEvent(event)) {
      // requestFrameUpdate(() => {
        addHistoryRecord(event.changes);
        addReadableRecord(event.changes);
      // });
    }
  }, [addHistoryRecord, addReadableRecord]);

  useEffect(() => {
    if (!editor) return;

    editor.on('change', onStoreEvent);
    editor.on('event', onCanvasEvent);

    const fakeUiState = {
      id: 'select',
      name: 'select-tool',
      source: 'toolbar'
    } as unknown as UiEvent;
    setUiState(fakeUiState);

    return () => {
      // if (frameId !== null) {
      //   cancelAnimationFrame(frameId);
      // }
      editor.off('change');
      editor.off('event');
    };
  }, [editor, frameId, onCanvasEvent, onStoreEvent, setFrameId, setUiState]);

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
};

export const useRecordedContent = () => {
  const canvasState = useContentRecorderStore(useShallow((state) => state.canvasState));
  const uiState = useContentRecorderStore(useShallow((state) => state.uiState));
  const historyRecords = useContentRecorderStore(useShallow((state) => state.historyRecords));
  const readableRecords = useContentRecorderStore(useShallow((state) => state.readableRecords));

  return {
    canvasState,
    uiState,
    historyRecords,
    readableRecords,
  };
};
