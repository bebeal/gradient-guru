'use client'

import { createContext, useContext } from 'react';

export interface DebugPanelContextValue {
  debugMode: number;
  setDebug: (newDebugMode: number) => void;
}

export const DebugPanelContext = createContext<DebugPanelContextValue>({
  debugMode: 1,
  setDebug: () => {},
});

export const useDebugPanel = () => useContext(DebugPanelContext);
