'use client'

// Environment check
export const isDevEnv: boolean = process.env.NODE_ENV === 'development';

// Window check
export const isWindow: boolean = typeof window !== 'undefined';

// Apple
export const isAppleDevice = (): boolean => navigator && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);

// iOS check
export const isIOS = (): boolean => navigator && /iPad|iPhone|iPod/.test(navigator.userAgent);

// Safari Browser check
export const isSafari = (): boolean => navigator && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// Chrome Browser check
export const isChrome = (): boolean => navigator && /chrome/i.test(navigator.userAgent);

// Firefox Browser check
export const isFirefox = (): boolean => navigator && /firefox/i.test(navigator.userAgent);

// Edge Browser check
export const isEdge = (): boolean => navigator && /edge/i.test(navigator.userAgent);

// IE Browser check
export const isIE = (): boolean => navigator && /msie|trident/i.test(navigator.userAgent);

// Mobile check
export const isMobile = (): boolean => navigator && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Touch device check
export const isTouchDevice = (): boolean => isWindow && 'ontouchstart' in window || navigator.maxTouchPoints > 0;




