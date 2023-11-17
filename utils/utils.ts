import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge';
import { ALPHANUMERIC } from "@/constants";

// noop function to use as defaults
export const noop = (...params: any): any => {};

// combine class names using clsx and twMerge
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
};

// 7-character random string e.g. 4k8j3f9
export const nanoid: (size?: number | undefined) => string = customAlphabet(ALPHANUMERIC, 7)
