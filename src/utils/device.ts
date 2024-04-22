// Check client side via if window is defined
export const isClientSide = (): boolean => typeof window !== 'undefined';

// Microsof Windows Device check
export const isWindowsDevice = (): boolean => isClientSide() && navigator && /Windows|Win/i.test(navigator.userAgent);

// Apple Device check
export const isAppleDevice = (): boolean => isClientSide() && navigator && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);

// iOS check
export const isIOS = (): boolean => isClientSide() && navigator && /iPad|iPhone|iPod/.test(navigator.userAgent);

// Safari Browser check
export const isSafari = (): boolean => isClientSide() && navigator && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// Chrome Browser check
export const isChrome = (): boolean => isClientSide() && navigator && /chrome/i.test(navigator.userAgent);

// Firefox Browser check
export const isFirefox = (): boolean => isClientSide() && navigator && /firefox/i.test(navigator.userAgent);

// Edge Browser check
export const isEdge = (): boolean => isClientSide() && navigator && /edge/i.test(navigator.userAgent);

// IE Browser check
export const isIE = (): boolean => isClientSide() && navigator && /msie|trident/i.test(navigator.userAgent);

// Mobile check
export const isMobile = (): boolean => isClientSide() && navigator && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Touch device check
export const isTouchDevice = (): boolean => isClientSide() && navigator && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
