
// Browser check
export const isBrowser: boolean = typeof window !== 'undefined';
export const isDevEnv: boolean = process.env.NODE_ENV === 'development';
export const isSafari = (): boolean => navigator && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
