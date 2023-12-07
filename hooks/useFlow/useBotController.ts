'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { InstancePresenceRecordType, TLShape, TLShapeId, useEditor } from '@tldraw/tldraw';

// list of tldraw editor functions that can be called by the bot
export const functions = [
  'bringForward',
  'bringToFront',
  'getShapes',
  'getSelectedShapes',
  'pan',
  'pageToScreen',
  'screenToPage',
  'rotateShapesBy',
  'setCurrentTool',
  'setCamera',
  'sendBackward',
  'sendToBack',
  'setOpacity',
  'startFollowingUser',
  'groupShapes',
  'ungroupShapes',
  'zoomToSelection',
];
export enum BotStatusEnum {
  Idle = 'Idle',
  Thinking = 'Thinking',
  Working = 'Working',
}

export interface EditableBotControllerProperties {
  userId?: string;
  userName?: string;
  chatMessage?: string;
  color?: string;
  cursorSpeed?: number;
}

export type StaticCursorTypes = 'default' | 'pointer' | 'cross' | 'move' | 'grab' | 'grabbing' | 'text';
export type CursorTypes =
  | StaticCursorTypes
  | 'ew-resize'
  | 'ns-resize'
  | 'nesw-resize'
  | 'nwse-resize'
  | 'nwse-rotate'
  | 'nesw-rotate'
  | 'senw-rotate'
  | 'swne-rotate'
  | 'zoom-in'
  | 'zoom-out';

export interface useBotControllerProps {
  cursor?: { x?: number; y?: number; rotation?: number; type?: CursorTypes };
  properties?: EditableBotControllerProperties;
}

export const useBotController = (props: useBotControllerProps) => {
  const {
    cursor: initialCursor = {
      x: 100,
      y: 100,
      rotation: 0,
      type: 'default',
    },
    properties: initialProperties = {
      userId: 'Bot',
      userName: 'Bot',
      chatMessage: 'Yo!',
      color: '#49555f',
      cursorSpeed: 0.25,
    },
  } = props;
  const [init, setInit] = useState<boolean>(false);
  const editor = useEditor();
  // two cursors to allow for smooth animation movement of the bot
  const [cursor, setCursor] = useState<any>({
    x: 0,
    y: 0,
    rotation: initialCursor.rotation,
    type: initialCursor.type,
  }); // cursor is the current position of the bot
  const [targetCursor, setTargetCursor] = useState<any>(initialCursor); // targetCursor is the target position of the bot
  const [id, setId] = useState<any>();
  const [currentPageId, setCurrentPageId] = useState<any>();
  const [lastActivityTimestamp, setLastActivityTimestamp] = useState<any>();
  const [properties, setProperties] = useState<any>(initialProperties);
  // true if the bot is moving, automatically gets set to false when the bot reaches its target location
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const botRef = useRef<number | null>();
  // will be set to the shape that the bot is currently moving if the bot is moving a shape
  const [movingShape, setMovingShape] = useState<TLShape | TLShapeId | null>(null);

  // Safely select a shape if it exists
  const safeSelect = (shape: TLShape | null, select: boolean = true) => {
    if (shape && select) {
      editor.setSelectedShapes([...editor.selectedShapeIds, shape.id]);
    }
  };

  // Move the bot to a specific location
  const moveTo = useCallback(
    (x: number, y: number, rotation?: number, type?: CursorTypes) => {
      setTargetCursor({ x, y, rotation: rotation || cursor?.rotation || 0, type: type || cursor?.type || 'default' });
      setIsMoving(true);
    },
    [cursor]
  );

  // Move the bot to a specific shapes location and optionally select it
  const moveToShape = (shape: TLShape | TLShapeId, rotation?: number, select: boolean = false) => {
    const actualShape = editor.getShape(shape);
    if (actualShape) {
      moveTo(actualShape.x, actualShape.y, rotation);
      safeSelect(actualShape, select);
    }
  };

  // Move the bot to a shape and schedule the shape to be and optionally selected and moved to a specific location
  const moveShapeTo = (shape: TLShape | TLShapeId, x: number, y: number, rotation?: number, select: boolean = true) => {
    const actualShape: any = editor.getShape(shape);
    if (actualShape) {
      moveToShape(shape, undefined, select);
      setTimeout(() => {
        safeSelect(actualShape, select);
        setMovingShape(shape);
        setTargetCursor({ ...cursor, x: x, y: y, rotation: rotation });
      }, 101); // 101 is a magic number that allows the bot to move to the shape before the shape is moved
    }
  };

  // Move the bot to the middle of the canvas
  const toMiddle = useCallback(() => {
    const instancePage = editor.getInstanceState();
    const screenBounds = instancePage.screenBounds;
    const middleX = screenBounds.w / 2;
    const middleY = screenBounds.h / 2;
    moveTo(middleX, middleY);
  }, [editor, moveTo]);

  // Spawn the bot in the canvas
  const spawn = useCallback(() => {
    if (editor) {
      const id = InstancePresenceRecordType.createId(`${editor.store.id}-${properties?.userId}`);
      const pageId = editor.currentPageId;
      const newLastActivityTimestamp = Date.now();
      setId(id);
      setCurrentPageId(pageId);
      setLastActivityTimestamp(newLastActivityTimestamp);
      const { cursorSpeed, ...restOfProps } = properties;
      const newBotPresence: any = InstancePresenceRecordType.create({
        ...restOfProps,
        id: id,
        currentPageId: pageId,
        cursor: cursor,
        lastActivityTimestamp: newLastActivityTimestamp,
      });
      setProperties({
        ...newBotPresence,
        cursorSpeed,
      });
      editor.store.put([newBotPresence]);
      setInit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor, editor]);

  // this is the main loop that runs every frame (triggered from useEffect below)
  // it moves and rotates the bot until it reaches its target location
  const loop = useCallback(() => {
    if (!editor || !init) return;
    const cursorIsMoving = cursor.x !== targetCursor.x || cursor.y !== targetCursor.y;

    if (cursorIsMoving) {
      const dx = targetCursor.x - cursor.x;
      const dy = targetCursor.y - cursor.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 1) {
        const moveX = cursor.x + dx * properties?.cursorSpeed;
        const moveY = cursor.y + dy * properties?.cursorSpeed;
        const rotationSpeed = 0.05; // Adjust the speed of rotation
        const dRotation = targetCursor.rotation - cursor.rotation;
        const newRotation = cursor.rotation + dRotation * rotationSpeed;
        setCursor({ ...cursor, x: moveX, y: moveY, rotation: newRotation, type: targetCursor.type });

        if (movingShape) {
          const actualShape: any = editor.getShape(movingShape);
          if (actualShape) {
            editor.updateShape({ ...actualShape, x: moveX, y: moveY, rotation: newRotation });
          }
        }
      } else {
        setCursor(targetCursor);
        if (movingShape) {
          const actualShape: any = editor.getShape(movingShape);
          if (actualShape) {
            editor.updateShape({
              ...actualShape,
              x: targetCursor.x,
              y: targetCursor.y,
              rotation: targetCursor.rotation,
            });
          }
          editor.deselect(actualShape);
          setMovingShape(null);
        }
      }
      setIsMoving(cursorIsMoving);
    }

    botRef.current = requestAnimationFrame(loop);
  }, [cursor, editor, init, movingShape, properties?.cursorSpeed, targetCursor]);

  // runs every frame essentially polling for the bot's next move
  useEffect(() => {
    if (botRef.current) {
      cancelAnimationFrame(botRef.current);
    }
    botRef.current = requestAnimationFrame(loop);
    return () => {
      if (botRef.current) {
        cancelAnimationFrame(botRef.current);
      }
    };
  }, [cursor, targetCursor, isMoving, loop]);

  // automatically set the bot to idle if it has not moved in 5 seconds
  useEffect(() => {
    const idleTimeout = 5000;
    if (!init) return;

    if (isMoving) {
      const checkIdle = setInterval(() => {
        const diff = Date.now() - lastActivityTimestamp;
        if (isMoving && diff > idleTimeout) {
          setIsMoving(false);
        }
      }, 1000);

      return () => clearInterval(checkIdle);
    }
  }, [init, isMoving, lastActivityTimestamp]);

  // automatically update the bot's cursor type when it changes
  useEffect(() => {
    setCursor({
      ...cursor,
      type: targetCursor.type,
    });
  }, [targetCursor.type]);

  // Automatically update bot's properties in the tldraw store
  // this is so no other part of the controller or external use needs to manage this
  useEffect(() => {
    if (!init || !id || !editor) return;
    const newLastActivityTimestamp = Date.now();
    const { cursorSpeed, ...restOfProps } = properties;
    const botData: any = InstancePresenceRecordType.create({
      ...restOfProps,
      chatMessage: isMoving ? BotStatusEnum.Working : properties.chatMessage,
      id,
      currentPageId,
      cursor,
      lastActivityTimestamp: newLastActivityTimestamp,
    });
    setProperties({
      ...botData,
      chatMessage: properties.chatMessage,
      cursorSpeed,
    });
    setLastActivityTimestamp(newLastActivityTimestamp);
    editor?.store?.put([botData]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPageId,
    cursor,
    editor,
    id,
    init,
    isMoving,
    properties.chatMessage,
    properties.color,
    properties.cursorSpeed,
    properties.userId,
    properties.userName,
  ]);

  // spawn the bot when the editor is ready
  useEffect(() => {
    if (editor && !init) {
      spawn();
      setIsMoving(true);
    }
  }, [editor, init, spawn]);

  return {
    cursor,
    setCursor,
    targetCursor,
    setTargetCursor,
    properties,
    setProperties,
    lastActivityTimestamp,
    setLastActivityTimestamp,
    spawn,
    toMiddle,
    moveTo,
    moveToShape,
    moveShapeTo,
    loop,
    id,
    setId,
    movingShape,
    setMovingShape,
    init,
    setInit,
    isMoving,
    setIsMoving,
  };
};
