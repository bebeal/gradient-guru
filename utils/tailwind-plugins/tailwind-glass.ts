
// tailwind-glass.ts
import plugin from 'tailwindcss/plugin';

export const GlassTailwindPlugin = plugin(({ addComponents }) => {
  addComponents({
    '.glass': {
      'backdrop-filter': 'blur(18px) saturate(180%)',
      '-webkit-backdrop-filter': 'blur(18px) saturate(180%)',
      'box-shadow': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      'background': 'rgba(17, 25, 40, 0.50)',
    },
  })
});

