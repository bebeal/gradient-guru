import { clsx, type ClassValue } from 'clsx';
import { customAlphabet } from 'nanoid';
import { twMerge } from 'tailwind-merge';

export const NUMBERS: string = '0123456789';
export const UPPER_ALPHABET: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const LOWER_ALPHABET: string = UPPER_ALPHABET.toLowerCase();
export const ALPHABET: string = UPPER_ALPHABET + LOWER_ALPHABET;
export const ALPHANUMERIC: string = NUMBERS + ALPHABET;

// combine class names using clsx and twMerge
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

// noop function to use as defaults
export const noop = (...params: any): any => {};

// 7-character random string e.g. 4k8j3f9
export const nanoid: (size?: number | undefined) => string = customAlphabet(ALPHANUMERIC, 7);

export const sleep = (ms: number = 0) => new Promise((resolve) => setTimeout(resolve, ms));

export const loadScript = (src: string, id?: string, onload?: () => void, onerror?: () => void) => {
  return new Promise<void>((resolve, reject) => {
    // if script already exists, resolve
    if (id && document.getElementById(id)) {
      resolve();
      return;
    }
    // create script element
    const script = document.createElement('script');
    if (id) {
      script.id = id;
    }
    script.src = src;
    // add onload and onerror handlers
    script.onload = () => {
      onload?.();
      resolve();
    };
    script.onerror = () => {
      onerror?.();
      reject(new Error(`Failed to load script ${src}`));
    };
    // append script to head
    document.head.appendChild(script);
  });
};
