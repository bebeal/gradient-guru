'use client'

import { cn } from '@/utils';
import { TLRecord } from '@tldraw/tlschema';
import { RecordsDiff } from '@tldraw/store';
import { useEditor } from '@tldraw/editor';
import { useCallback, useRef } from 'react';
import { Slider } from '@/components';

// TODO: Allow user to be able to restore the current state of the canvas to a previous snapshot of the canvas
// TODO: Allow user to set a start and end point on the timeline to record a snippet that can then replace the timeline

// Stores records of type RecordsDiff<TLRecord> in a cache and allows the user to scrub through the snapshots as a timeline slider
export interface FlowTimelineScrubberProps {
  maxCacheSize?: number; // The maximum number of snapshots to store in the cache
  events?: RecordsDiff<TLRecord>[]; // The events to store in the cache
}

export const FlowTimelineScrubber = (props: FlowTimelineScrubberProps) => {
  const { maxCacheSize = 10000, events=[] } = props;
  const scrubberRef = useRef(null);
  // Pointer to keep track of the current position of the timeline slider
  const pointer = useRef(0);
  const editor = useEditor();

  // Handler for changes in the slider's value
  const handleSliderChange = useCallback((e: number[]) => {
      const previousPosition = pointer.current;
      const previousPercentage = previousPosition / maxCacheSize;
      const nextPosition = e[0];
      const nextPercentage = nextPosition / maxCacheSize;
      const prevIndex = Math.ceil(previousPercentage * events.length);
      const nextIndex = Math.ceil(nextPercentage * events.length);

      pointer.current = nextPosition;

      // Updating the Canvas State with the diffs either forward or backward depending on the direction of the slider
      editor.store.mergeRemoteChanges(() => {
        if (nextIndex > prevIndex) {
          // If the slider moves forward (redo scenario), it iterates through the diffs array from the previous index to the next index, applying each diff forward.
          // added records are inserted into the store.
          // updated records are updated in the store with their new states.
          // removed records are deleted from the store.
          for (let i = prevIndex; i <= nextIndex; i++) {
            const changes = events[i];
            if (!changes) continue;

            Object.values(changes.added).forEach((record) => {
              editor.store.put([record]);
            });

            Object.values(changes.updated).forEach(([prev, next]: any) => {
              editor.store.put([next]);
            });

            Object.values(changes.removed).forEach((record: any) => {
              editor.store.remove([record.id]);
            });
          }
        } else if (nextIndex < prevIndex) {
          // If the slider moves backward (undo scenario), it iterates in reverse and undoes each diff:
          // added records are deleted from the store.
          // updated records are reverted to their previous states.
          // removed records are re-inserted into the store.
          for (let i = prevIndex; i >= nextIndex; i--) {
            const changes = events[i];
            if (!changes) continue;

            Object.values(changes.added).forEach((record: any) => {
              editor.store.remove([record.id]);
            });

            Object.values(changes.updated).forEach(([prev, next]: any) => {
              editor.store.put([prev]);
            });

            Object.values(changes.removed).forEach((record: any) => {
              editor.store.put([record]);
            });
          }
        }
      });
      
    }, [editor.store, events, maxCacheSize]);

  return (
    <div className={cn(`flex w-auto h-auto p-2`)}>
      <Slider
        ref={scrubberRef}
        min={0}
        max={maxCacheSize}
        defaultValue={[maxCacheSize]}
        onValueChange={handleSliderChange}
      />
    </div>
  );
};
