
import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge';
import { ALPHANUMERIC } from "./constants";

// noop function to use as defaults
export const noop = (...params: any): any => {};

// combine class names using clsx and twMerge
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
};

// 7-character random string e.g. 4k8j3f9
export const nanoid: (size?: number | undefined) => string = customAlphabet(ALPHANUMERIC, 7);

// filter out keys from object
export const filterObject = (obj: any, keys: string[] = []) => {
  return Object.keys(obj).reduce((acc: any, key: any) => {
    if (!keys.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

// sort object by
// 1. type (boolean, number, string, object)
// 2. key (lexicographically)
// 3. key length (ascending)
export const sortObject = (
  object: any,
  typesOverride?: any,
  order: string[] = ['readonly', 'boolean', 'number', 'string', 'object']
) => {
  return Object.fromEntries(Object.entries(object).sort(([keyA, valueA], [keyB, valueB]) => {
    const typeIndexA = order.indexOf(typesOverride?.[keyA] ?? typeof valueA);
    const typeIndexB = order.indexOf(typesOverride?.[keyB] ?? typeof valueB);

    if (typeIndexA === typeIndexB) {
      const lexicographicOrder = keyA.localeCompare(keyB);
      if (lexicographicOrder === 0) {
        return keyA.length - keyB.length;
      }
      return lexicographicOrder;
    }

    return typeIndexA - typeIndexB;
  }));
};

export const isEmptyObject = (obj?: object) => obj ? Object.keys(obj).length === 0 : false;

export const arrayToObject = (arr: string[], value: any = true): { [key: string]: boolean } => {
  const result = arr.reduce((obj, item) => ({ ...obj, [item]: value }), {});
  return result;
}

export const toCamelCase = (snakeStr: string): string => {
  const components = snakeStr.split('_');
  return components[0] + components.slice(1).map(x => x.charAt(0).toUpperCase() + x.slice(1)).join('');
};

export const toSnakeCase = (camelStr: string): string => {
  return camelStr.split('').map(c => c === c.toUpperCase() ? `_${c.toLowerCase()}` : c).join('').trimStart();
};

// Get initials from name, e.g. John Doe => JD
export const getInitials = (name: string): string => {
  return name.split(" ").map((word) => word[0]?.toUpperCase() || "").join("");
};

// Format the given date (uses current one if not provided) to YYYY-MM-DD
export const formatDate = (date?: Date | number): string => {
  if (typeof date === 'number') {
    date = new Date(date);
  }
  return (date || new Date()).toISOString().slice(0, 10) || '';
};

// Format the given date (uses current one if not provided) to YYYY-MM-DD HH:MM:SS
export const formatTime = (date?: Date | number): string => {
  if (typeof date === 'number') {
    date = new Date(date);
  }
  return (date || new Date()).toISOString().slice(0, 19).replace("T", " ") || '';
};
