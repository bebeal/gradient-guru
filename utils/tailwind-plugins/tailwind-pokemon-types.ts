// tailwind-glass.ts
import plugin from 'tailwindcss/plugin';

const PokemonTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];

export const PokemonTypesTailwindPlugin = plugin(({ addBase, addComponents }) => {
  // Add base styles
  addBase({
    ':root': {
      '--normal-type': '#A8A77A',
      '--fire-type': '#EE8130',
      '--water-type': '#6390F0',
      '--electric-type': '#F7D02C',
      '--grass-type': '#7AC74C',
      '--ice-type': '#96D9D6',
      '--fighting-type': '#C22E28',
      '--poison-type': '#A33EA1',
      '--ground-type': '#E2BF65',
      '--flying-type': '#A98FF3',
      '--psychic-type': '#F95587',
      '--bug-type': '#A6B91A',
      '--rock-type': '#B6A136',
      '--ghost-type': '#735797',
      '--dragon-type': '#6F35FC',
      '--dark-type': '#705746',
      '--steel-type': '#5695A3',
      '--fairy-type': '#D685AD',
    },
  });

  // Add component styles
  addComponents({
    '.pkmn-type-icon': {
      borderRadius: '100%',
      margin: 'auto',
      transition: '200ms all',
      position: 'relative',
      overflow: 'visible',
      '&:hover': {
        filter: 'saturate(200%)',
        transform: 'scale(1.1)',
        cursor: 'pointer',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        borderRadius: '100%',
        opacity: '0',
        zIndex: '-1',
        transition: '200ms all',
      },
      '&:hover::after': {
        filter: 'blur(12px)',
        opacity: '0.9',
      },
    },
  });

  addComponents(
    PokemonTypes.map((type) => {
      return {
        [`.pkmn-type-${type}`]: {
          background: `var(--${type}-type)`,
          '&:after': {
            backgroundColor: `var(--${type}-type)`,
          },
        },
      };
    }),
  );
});
