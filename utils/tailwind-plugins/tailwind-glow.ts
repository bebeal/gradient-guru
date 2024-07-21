import plugin from 'tailwindcss/plugin';

export const GlowTailwindPlugin = plugin(({ addBase, addUtilities, theme }) => {
  const glowIntensity: Record<string, string> = {
    sm: '0 0 3px var(--tw-shadow-color)',
    md: '0 0 5px var(--tw-shadow-color)',
    lg: '0 0 7px var(--tw-shadow-color)',
  };

  const buildDropShadow = (...sizes: string[]) => sizes.map((size) => `drop-shadow(${glowIntensity[size]})`).join(' ');

  addBase({
    '@keyframes svg-glow': {
      '0%, 100%': { filter: buildDropShadow('sm', 'md') },
      '50%': { filter: buildDropShadow('sm', 'md') },
    },
    '@keyframes big-svg-glow': {
      '0%, 100%': { filter: buildDropShadow('md', 'lg') },
      '50%': { filter: buildDropShadow('sm', 'lg', 'lg') },
    },
    '@keyframes text-glow': {
      '0%, 100%': { 'text-shadow': glowIntensity.sm },
      '50%': { 'text-shadow': glowIntensity.lg },
    },
  });

  addUtilities({
    '.text-glow': {
      animation: 'text-glow 2s ease-in-out infinite alternate',
    },
    '.svg-glow': {
      animation: 'svg-glow 2s ease-in-out infinite alternate',
    },
    '.big-svg-glow': {
      animation: 'big-svg-glow 1s ease-in-out infinite alternate',
    },
  });
});
