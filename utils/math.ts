export const PI = Math.PI;
export const TAU = PI * 2;
export const PI2 = PI / 2;
export const EPSILON = Math.PI / 180;

export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const lerp = (start: number, end: number, t: number) => {
  return start * (1 - t) + end * t;
};
