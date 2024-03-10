import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// combine class names using clsx and twMerge
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
