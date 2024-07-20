import { isAppleDevice } from "./device";

// todo: use https://gitlab.com/nfriend/ts-key-enum/-/blob/master/Key.enum.d.ts instead but also make the mapping to the symbols
const SPACE = '␣';
const SHIFT = '⇧';
export const ALT_WIN = 'Alt';
export const ALT_MAC = '⌥';
const CONTROL = '⌃';
const ENTER = '↵';
const ARROW_UP = '↑';
const ARROW_DOWN = '↓';
const ARROW_LEFT = '←';
const ARROW_RIGHT = '→';
const ESCAPE = '⎋';
const TAB = '↹';
const CAPSLOCK = '⇪';
export const DELETE_WIN = 'Del';
export const DELETE_MAC = '⌦';
const PAGE_UP = '⇞';
const PAGE_DOWN = '⇟';
const HOME = '↖';
const END = '↘';
const INSERT = '⎀';
const NUMLOCK = '⇭';
const SCROLL_LOCK = '⤓';
const PAUSE = '⏸';
const CLEAR = '⌧';
const HELP = '⍰';
const VOLUME_UP = '🔊';
const VOLUME_DOWN = '🔉';
const VOLUME_MUTE = '🔇';
const MEDIA_NEXT = '⏭';
const MEDIA_PREV = '⏮';
const MEDIA_STOP = '⏹';
const MEDIA_PLAY_PAUSE = '⏯';
const PRINT_SCREEN = '⎙';
const CONTEXT_MENU = '≣';
const F1 = 'F1';
const F2 = 'F2';
const F3 = 'F3';
const F4 = 'F4';
const F5 = 'F5';
const F6 = 'F6';
const F7 = 'F7';
const F8 = 'F8';
const F9 = 'F9';
const F10 = 'F10';
const F11 = 'F11';
const F12 = 'F12';
export const META_MAC = '⌘';
export const META_WIN = '⊞';

const META_KEY = isAppleDevice() ? META_MAC : META_WIN;
const ALT_KEY = isAppleDevice() ? ALT_MAC : ALT_WIN;
const DEL_KEY = isAppleDevice() ? DELETE_MAC : DELETE_WIN;

const MetaMappings: Record<string, string> = {
  'Meta': META_KEY,
  'OSLeft': META_KEY,
  'OSRight': META_KEY,
  'Cmd': META_KEY,
};
const FunctionMappings: Record<string, string> = {
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
  F12
};
export const KeyMap: Record<string, string> = {
  ' ': SPACE,
  'Shift': SHIFT,
  'ShiftRight': SHIFT,
  'ShiftLeft': SHIFT,
  'Alt': ALT_KEY,
  'Control': CONTROL,
  'Enter': ENTER,
  'ArrowUp': ARROW_UP,
  'ArrowDown': ARROW_DOWN,
  'ArrowLeft': ARROW_LEFT,
  'ArrowRight': ARROW_RIGHT,
  'Escape': ESCAPE,
  'Tab': TAB,
  'CapsLock': CAPSLOCK,
  'Delete': DEL_KEY,
  'PageUp': PAGE_UP,
  'PageDown': PAGE_DOWN,
  'Home': HOME,
  'End': END,
  'Insert': INSERT,
  'NumLock': NUMLOCK,
  'ScrollLock': SCROLL_LOCK,
  'Pause': PAUSE,
  'Clear': CLEAR,
  'Help': HELP,
  'VolumeUp': VOLUME_UP,
  'VolumeDown': VOLUME_DOWN,
  'VolumeMute': VOLUME_MUTE,
  'MediaNextTrack': MEDIA_NEXT,
  'MediaPreviousTrack': MEDIA_PREV,
  'MediaStop': MEDIA_STOP,
  'MediaPlayPause': MEDIA_PLAY_PAUSE,
  'PrintScreen': PRINT_SCREEN,
  'ContextMenu': CONTEXT_MENU,
  ...MetaMappings,
  ...FunctionMappings,
};
