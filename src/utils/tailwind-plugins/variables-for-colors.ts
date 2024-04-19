import { flattenColorPalette } from './tailwind-grid';

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
export const VariablesForColors: any = ({ addBase, theme }: any) => {
  const allColors = flattenColorPalette(theme('colors'));
  const newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ':root': newVars,
  });
};
