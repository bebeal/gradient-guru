'use client'

// Browser Window check
export const isWindow: boolean = typeof window !== 'undefined';

// Microsof Windows Device check
export const isWindowsDevice = (): boolean => isWindow && navigator && /Windows|Win/i.test(navigator.userAgent);

// Apple Device check
export const isAppleDevice = (): boolean => isWindow && navigator && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);

// iOS check
export const isIOS = (): boolean => isWindow && navigator && /iPad|iPhone|iPod/.test(navigator.userAgent);

// Safari Browser check
export const isSafari = (): boolean => isWindow && navigator && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// Chrome Browser check
export const isChrome = (): boolean => isWindow && navigator && /chrome/i.test(navigator.userAgent);

// Firefox Browser check
export const isFirefox = (): boolean => isWindow && navigator && /firefox/i.test(navigator.userAgent);

// Edge Browser check
export const isEdge = (): boolean => isWindow && navigator && /edge/i.test(navigator.userAgent);

// IE Browser check
export const isIE = (): boolean => isWindow && navigator && /msie|trident/i.test(navigator.userAgent);

// Mobile check
export const isMobile = (): boolean => isWindow && navigator && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Touch device check
export const isTouchDevice = (): boolean => isWindow && navigator && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

