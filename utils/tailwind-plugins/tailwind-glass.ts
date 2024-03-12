
// tailwind-glass.ts
import plugin from 'tailwindcss/plugin';

const glassPlugin = plugin(function({ addUtilities }) {
  const newUtilities = {
    'glass': {
      backdropFilter: 'blur(16px) saturate(180%)',
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      backgroundColor: 'rgba(17, 25, 40, 0.75)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.125)',
    },
  };
  addUtilities(newUtilities);
});

export default glassPlugin;
