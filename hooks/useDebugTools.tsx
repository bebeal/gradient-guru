'use client';

import { createContext, FunctionComponent, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createGlobalStyle } from 'styled-components';

// Hide React Query Devtools Button
const OverrideReactQueryStyles = createGlobalStyle`
  .go3489369143 div svg {
    display: none !important;
    pointer-events: none !important;
  }
  
  .go3489369143 button {
    display: none !important;
    pointer-events: none !important;
  }
`;

export interface DebugToolsProps {
  reactQueryDevTools?: boolean;
  // Define props for additional debug tools here
}

// send on/off flags as props to the DebugTools component
// this component optionally via the ones selected, wraps them all and renders one singular component, with a boolean flag to show/hide it in the UI
export const DebugTools: FunctionComponent<DebugToolsProps> = ({ reactQueryDevTools }) => {
  const { showReactQueryDevTools, toggleReactQueryDevTools } = useContext(DebugToolsContext);

  // Use React Portal to render the debug button directly into the body or another predefined element
  // This ensures it is always accessible and not affected by other layout styles
  return createPortal(
    <div className="fixed top-0 left-0 z-50 pointer-events-auto cursor-auto">
      {reactQueryDevTools && (
        <IconButton className="p-2 m-2 hover:cursor-pointer" color="indigo" radius="large" variant="surface" onPointerDown={toggleReactQueryDevTools}>
          <MagnifyingGlassIcon width="18" height="18" />
        </IconButton>
      )}
      {reactQueryDevTools && (
        <ReactQueryDevtools
          key={showReactQueryDevTools ? 'open' : 'closed'} // hack to force re-render on toggle
          initialIsOpen={false}
          position="top"
          buttonPosition="top-left"
        />
      )}
    </div>,
    document.body,
  );
};

export type DebugToolsContextType = DebugToolsProps & {
  showDebugPanel?: boolean;
  toggleDebugPanel?: (show?: boolean) => void;
  showReactQueryDevTools?: boolean;
  toggleReactQueryDevTools?: () => void;
};

export const DebugToolsContext = createContext<DebugToolsContextType>({} as DebugToolsContextType);

export type DebugToolsProviderProps = DebugToolsProps & {
  children: ReactNode;
};

export const DebugToolsProvider: FunctionComponent<DebugToolsProviderProps> = (props) => {
  
  const { reactQueryDevTools = true, children } = props;
  const [showDebugPanel, setShowDebugPanel] = useState<boolean>(false);
  const [showReactQueryDevTools, setShowReactQueryDevTools] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // I don't wanna use the devtools standard button so this is a hack to get custom button to toggle the devtools
  const toggleReactQueryDevTools = useCallback((event?: any) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setShowReactQueryDevTools((prev) => {
      const newValue = !prev;
      window.localStorage.setItem('TanstackQueryDevtools.open', String(newValue));
      return newValue;
    });
  }, []);

  const toggleDebugPanel = useCallback((override?: boolean) => {
    setShowDebugPanel((prev) => (override !== undefined ? override : !prev));
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          const btn = document.querySelector(`.go2885158556`);
          if (btn) {
            btn.addEventListener('click', toggleReactQueryDevTools);
            // Once the button is found and the event listener is added, we don't need to observe mutations anymore
            observer.disconnect();
          }
        }
      }
    });
  
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  
    return () => observer.disconnect();
  }, [toggleReactQueryDevTools]);

  const contextValue: DebugToolsContextType = {
    reactQueryDevTools,
    showDebugPanel,
    toggleDebugPanel,
    showReactQueryDevTools,
    toggleReactQueryDevTools,
  };

  return (
    <DebugToolsContext.Provider value={contextValue}>
      {showDebugPanel && <OverrideReactQueryStyles />}
      {children}
      {showDebugPanel && mounted && <DebugTools reactQueryDevTools={reactQueryDevTools} />}
    </DebugToolsContext.Provider>
  );
};

export const useDebugTools = () => {
  const context = useContext(DebugToolsContext);
  if (!context) {
    throw new Error('useDebugTools must be used within a DebugToolsProvider');
  }
  return context;
};
