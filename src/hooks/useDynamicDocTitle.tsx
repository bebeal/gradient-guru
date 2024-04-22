import { useCallback, useEffect } from 'react';

import { isEmptyObject } from '@/utils/objects';
import { matchesPath } from '@/utils/path';

export interface IDocConfig {
  title: string;
  shorthand?: string;
  separator?: string;
  description?: string;
  url?: string;
}

// Updates the document title dynamically, based on the current path and the given config,
//or optionally provide an overrides object which has the most priority
export const useDynamicDocTitle = (
  config: IDocConfig,
  overrides?: { [key: string]: string }, // path -> title
) => {
  // the default doc title pattern is:
  // '/' -> full title
  // '/some/path' -> 'shorthand separator /some/path'
  const formatTitle = useCallback(
    (path: string): string => {
      return path && path.length > 1 ? `${config.shorthand} ${config.separator || '•'} ${path}` : `${config.title}`;
    },
    [config],
  );

  useEffect(() => {
    // Only run on client-side.
    if (typeof window === 'undefined') return;
    const path = window.location.pathname;
    let title: string = formatTitle(path);
    if (overrides && !isEmptyObject(overrides)) {
      title = matchesPath(overrides, path) || title;
    }
    document.title = title;
  }, [config, formatTitle, overrides]);

  // Safely return the title and path, defaulting to empty strings if not running in a browser context
  return {
    title: typeof window !== 'undefined' ? document.title : '',
    path: typeof window !== 'undefined' ? window.location.pathname : '',
  };
};
