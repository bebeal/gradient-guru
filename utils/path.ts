// General utility functions for working with paths routes

// Normalize paths by:
// - Optionally removing leading slashes
// - Optionally removing trailing slashes
// - Optionally removing query parameters
const normalizePath = (path: string, removeLeadingSlash = true, removeTrailingSlash = true, removeQuery = true): string => {
  let normalizedPath = path;
  if (removeLeadingSlash) {
    normalizedPath = normalizedPath.replace(/^\//, '');
  }
  if (removeTrailingSlash) {
    normalizedPath = normalizedPath.replace(/\/$/, '');
  }
  if (removeQuery) {
    normalizedPath = normalizedPath.split('?')[0];
  }
  return normalizedPath;
};

export const matchesPath = (patternsMap: { [key: string]: any }, currentPath: string): any => {
  const patterns = Object.keys(patternsMap);
  const path = normalizePath(currentPath) || normalizePath(window.location.pathname);
  for (const pattern of patterns) {
    // This will check for the pattern with or without a trailing slash
    const regexPattern = `^${normalizePath(pattern).split('?')[0].replace(/\/$/, '')}/?$`;
    const regex = new RegExp(regexPattern, 'i'); // 'i' for case-insensitive match

    if (regex.test(path)) {
      return patternsMap[pattern];
    }
  }
  return undefined;
};
