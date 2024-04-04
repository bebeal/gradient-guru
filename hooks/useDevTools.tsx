'use client';

import { createContext, FC, ReactNode, useContext } from 'react';
import { Geiger } from 'react-geiger';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { cn, ReactQueryDevTool } from '@/utils';

// Define interfaces/types for dev tools and their context
export interface DevTool {
  enabled: boolean;
  visible?: boolean;
  toggle?: (override?: boolean) => void;
  [key: string]: any; // allow for anything else to be passed
}
export interface DevToolsStoreState {
  reactQueryDevTool: DevTool;
  geiger: DevTool;
}
export type DevToolsStoreActions = {
  setDevTool: (tool: keyof DevToolsStoreState, value: Partial<DevTool>) => void;
  isDevToolEnabled: (tool: keyof DevToolsStoreState) => boolean;
  toggleDevTool: (tool: keyof DevToolsStoreState, override?: boolean) => void;
};

export const useDevToolsStore = create<DevToolsStoreState & DevToolsStoreActions>((set, get) => ({
  reactQueryDevTool: {
    enabled: true,
    visible: false,
  },
  geiger: {
    enabled: false,
  },
  setDevTool: (tool, value) => set((state) => ({ [tool]: { ...state[tool], ...value } })),
  isDevToolEnabled: (tool) => get()[tool].enabled,
  toggleDevTool: (tool, override) => set((state) => ({ [tool]: { ...state[tool], visible: override ?? !state[tool].visible } })),
}));

export const DevToolsContext = createContext<DevToolsStoreState & DevToolsStoreActions>({} as DevToolsStoreState & DevToolsStoreActions);

// send on/off flags as props to the DebugTools component
// this component optionally via the ones selected, wraps them all and renders one singular component, with a boolean flag to show/hide it in the UI
export interface DevToolsProviderProps {
  children: ReactNode;
  className?: string;
}
export const DevToolsProvider: FC<DevToolsProviderProps> = ({ children, className }) => {
  const reactQueryDevTool = useDevToolsStore(useShallow((state) => state.reactQueryDevTool));
  const geiger = useDevToolsStore(useShallow((state) => state.geiger));
  const [setDevTool, isDevToolEnabled, toggleDevTool] = useDevToolsStore(useShallow((state) => [state.setDevTool, state.isDevToolEnabled, state.toggleDevTool]));

  // add other dev tools which need to be nested beside the entire app (e.g. for overlays)
  const AppWithDevToolPanels = ({ children }: { children: ReactNode }) => {
    return (
      <div className={cn('fixed top-0 left-0 z-50 pointer-events-auto cursor-auto', className)}>
        {children}
        {reactQueryDevTool?.enabled && <ReactQueryDevTool {...reactQueryDevTool} toggle={() => toggleDevTool('reactQueryDevTool')} />}
      </div>
    );
  };

  // add other dev tools which need to wrap around the entire app (e.g. providers, profilers)
  const DevToolsComponent = ({ children }: { children: ReactNode }) => {
    return (
      <Geiger profilerId={'Geiger'} renderTimeThreshold={0} {...geiger}>
        <AppWithDevToolPanels>{children}</AppWithDevToolPanels>
      </Geiger>
    );
  };

  return (
    <DevToolsContext.Provider value={{
      reactQueryDevTool,
      geiger,
      setDevTool,
      isDevToolEnabled,
      toggleDevTool,
    }}>
      <DevToolsComponent>{children}</DevToolsComponent>
    </DevToolsContext.Provider>
  );
};

export const useDevTools = () => {
  const context = useContext(DevToolsContext);
  if (context === undefined) {
    throw new Error('useDevTools must be used within a DevToolsProvider');
  }
  return context;
};