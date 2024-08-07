'use client';

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { QueryClient } from '@tanstack/react-query';
import { createGlobalStyle } from 'styled-components';

export const makeQueryClient = (overrideOptions?: any) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 1000,
      },
    },
    ...overrideOptions,
  });
};

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

const ReactQueryDevToolProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then((d) => ({
    default: d.ReactQueryDevtools,
  })),
);

export const ReactQueryDevToolPanel: React.FC<any> = ({ visible, setVisible, toggle }: { visible: boolean; setVisible: (value: boolean) => void; toggle: () => void }) => {
  return (
    <ReactQueryDevToolProduction
      key={visible ? 'open' : 'closed'} // hack to force re-render
      initialIsOpen={visible}
      position="top"
      buttonPosition="top-left"
    />
  );
};

const ReactQueryDevToolToggle: React.FC<any> = ({ visible, setVisible, toggle }: { visible: boolean; setVisible: (value: boolean) => void; toggle: () => void }) => {
  return (
    <div className="p-2 w-auto h-auto flex">
      <IconButton className="p-2 hover:cursor-pointer text-[1em]" color="indigo" radius="large" variant="surface" onPointerDown={toggle}>
        <MagnifyingGlassIcon />
      </IconButton>
    </div>
  );
};

export const ReactQueryDevTool = (props: any) => {
  const { visible: visibleFromProps = false, toggle: toggleCallback, ...rest } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(visibleFromProps);

  const toggle = useCallback(
    (event?: any) => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      setVisible((prev: boolean) => {
        const newValue = !prev;
        window.localStorage.setItem('TanstackQueryDevtools.open', String(newValue));
        toggleCallback?.(newValue);
        return newValue;
      });
    },
    [toggleCallback],
  );

  // listen for closes on the devtools panel and update the state
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (!mutation.addedNodes) return;
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i] as HTMLElement;
          const btn = node.querySelector('.tsqd-minimize-btn');
          if (btn) {
            btn.addEventListener('click', toggle);
          }
        }
      });
    });

    if (ref.current) {
      observer.observe(ref.current, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
    };
  }, [toggle]);

  return (
    <div ref={ref} className="fixed top-0 left-0 pointer-events-auto cursor-auto w-auto h-auto">
      <ReactQueryDevToolToggle visible={visible} setVisible={setVisible} toggle={toggle} />
      <ReactQueryDevToolPanel visible={visible} setVisible={setVisible} toggle={toggle} {...rest} />
      <OverrideReactQueryStyles />
    </div>
  );
};
