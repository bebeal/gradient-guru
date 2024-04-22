import { isAppleDevice } from './device';

export const SPACE = '␣';
export const SHIFT = '⇧';
export const ALT_WIN = 'Alt';
export const ALT_MAC = '⌥';
export const CONTROL = '⌃';
export const ENTER = '↵';
export const ARROW_UP = '↑';
export const ARROW_DOWN = '↓';
export const ARROW_LEFT = '←';
export const ARROW_RIGHT = '→';
export const ESCAPE = '⎋';
export const TAB = '↹';
export const CAPSLOCK = '⇪';
export const DELETE_WIN = 'Del';
export const DELETE_MAC = '⌦';
export const PAGE_UP = '⇞';
export const PAGE_DOWN = '⇟';
export const HOME = '↖';
export const END = '↘';
export const INSERT = '⎀';
export const NUMLOCK = '⇭';
export const SCROLL_LOCK = '⤓';
export const PAUSE = '⏸';
export const CLEAR = '⌧';
export const HELP = '⍰';
export const VOLUME_UP = '🔊';
export const VOLUME_DOWN = '🔉';
export const VOLUME_MUTE = '🔇';
export const MEDIA_NEXT = '⏭';
export const MEDIA_PREV = '⏮';
export const MEDIA_STOP = '⏹';
export const MEDIA_PLAY_PAUSE = '⏯';
export const PRINT_SCREEN = '⎙';
export const CONTEXT_MENU = '≣';
export const META_MAC = '⌘';
export const META_WIN = '⊞';
export const F1 = 'F1';
export const F2 = 'F2';
export const F3 = 'F3';
export const F4 = 'F4';
export const F5 = 'F5';
export const F6 = 'F6';
export const F7 = 'F7';
export const F8 = 'F8';
export const F9 = 'F9';
export const F10 = 'F10';
export const F11 = 'F11';
export const F12 = 'F12';

export const KeyMap: Record<string, string> = {
  ' ': SPACE,
  Shift: SHIFT,
  ShiftRight: SHIFT,
  ShiftLeft: SHIFT,
  Alt: isAppleDevice() ? ALT_MAC : ALT_WIN,
  Control: CONTROL,
  Enter: ENTER,
  ArrowUp: ARROW_UP,
  ArrowDown: ARROW_DOWN,
  ArrowLeft: ARROW_LEFT,
  ArrowRight: ARROW_RIGHT,
  Escape: ESCAPE,
  Tab: TAB,
  CapsLock: CAPSLOCK,
  Delete: isAppleDevice() ? DELETE_MAC : DELETE_WIN,
  PageUp: PAGE_UP,
  PageDown: PAGE_DOWN,
  Home: HOME,
  End: END,
  Insert: INSERT,
  NumLock: NUMLOCK,
  ScrollLock: SCROLL_LOCK,
  Pause: PAUSE,
  Clear: CLEAR,
  Help: HELP,
  VolumeUp: VOLUME_UP,
  VolumeDown: VOLUME_DOWN,
  VolumeMute: VOLUME_MUTE,
  MediaNextTrack: MEDIA_NEXT,
  MediaPreviousTrack: MEDIA_PREV,
  MediaStop: MEDIA_STOP,
  MediaPlayPause: MEDIA_PLAY_PAUSE,
  PrintScreen: PRINT_SCREEN,
  ContextMenu: CONTEXT_MENU,
  Meta: isAppleDevice() ? META_MAC : META_WIN,
  OSLeft: isAppleDevice() ? META_MAC : META_WIN,
  OSRight: isAppleDevice() ? META_MAC : META_WIN,
  F1,
  F2,
  F3,
  F4,
  F5,
  F6,
  F7,
  F8,
  F9,
  F10,
  F11,
  F12,
};
