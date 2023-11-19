import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import radixThemePlugin from 'radix-ui-themes-with-tailwind';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          ...colors.slate,
          DEFAULT: colors.slate['500'],
        },
        zinc: {
          ...colors.zinc,
          DEFAULT: colors.zinc['500'],
        },
        stone: {
          ...colors.stone,
          DEFAULT: colors.stone['500'],
        },
        red: {
          ...colors.red,
          DEFAULT: colors.red['500'],
        },
        orange: {
          ...colors.orange,
          DEFAULT: colors.orange['500'],
        },
        amber: {
          ...colors.amber,
          DEFAULT: colors.amber['500'],
        },
        yellow: {
          ...colors.yellow,
          DEFAULT: colors.yellow['500'],
        },
        lime: {
          ...colors.lime,
          DEFAULT: colors.lime['500'],
        },
        green: {
          ...colors.green,
          DEFAULT: colors.green['500'],
        },
        emerald: {
          ...colors.emerald,
          DEFAULT: colors.emerald['500'],
        },
        teal: {
          ...colors.teal,
          DEFAULT: colors.teal['500'],
        },
        cyan: {
          ...colors.cyan,
          DEFAULT: colors.cyan['500'],
        },
        sky: {
          ...colors.sky,
          DEFAULT: colors.sky['500'],
        },
        blue: {
          ...colors.blue,
          DEFAULT: colors.blue['500'],
        },
        indigo: {
          ...colors.indigo,
          DEFAULT: colors.indigo['500'],
        },
        violet: {
          ...colors.violet,
          DEFAULT: colors.violet['500'],
        },
        purple: {
          ...colors.purple,
          DEFAULT: colors.purple['500'],
        },
        fuchia: {
          ...colors.fuchsia,
          DEFAULT: colors.fuchsia['500'],
        },
        pink: {
          ...colors.pink,
          DEFAULT: colors.pink['500'],
        },
        rose: {
          ...colors.rose,
          DEFAULT: colors.rose['500'],
        },
      },
      textColor: {
        primary: 'rgb(var(--text-primary)  / <alpha-value>)',
        secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--text-tertiary) / <alpha-value>)',
      },
      backgroundColor: {
        primary: 'rgb(var(--background-primary) / <alpha-value>)',
        secondary: 'rgb(var(--background-secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--background-tertiary) / <alpha-value>)',
      },
      fill: {
        primary: 'rgb(var(--background-primary) / <alpha-value>)',
        secondary: 'rgb(var(--background-secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--background-tertiary) / <alpha-value>)',
      },
      borderColor: {
        primary: 'rgb(var(--border-primary) / <alpha-value>)',
        secondary: 'rgb(var(--border-secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--border-tertiary) / <alpha-value>)',
      },
      stroke: {
        primary: 'rgb(var(--border-primary) / <alpha-value>)',
        secondary: 'rgb(var(--border-secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--border-tertiary) / <alpha-value>)',
      },
      outlineColor: {
        primary: 'rgb(var(--border-primary) / <alpha-value>)',
        secondary: 'rgb(var(--border-secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--border-tertiary) / <alpha-value>)',
      },
      ringColor: {
        primary: 'rgb(var(--border-primary) / <alpha-value>)',
        secondary: 'rgb(var(--border-secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--border-tertiary) / <alpha-value>)',
      },
      fontFamily: {
        mono: ['Berkeley Mono', 'monospace'],
        argon: ['Argon', 'Berkeley Mono', 'monospace'],
        krypton: ['Krypton', 'Berkeley Mono', 'monospace'],
        neon: ['Neon', 'Berkeley Mono', 'monospace'],
        radon: ['Radon', 'Berkeley Mono', 'monospace'],
        xenon: ['Xenon', 'Berkeley Mono', 'monospace'],
      },
    },
  },
  plugins: [
    radixThemePlugin({
      useTailwindColorNames: true,
      useTailwindRadiusNames: true,
      mapMissingTailwindColors: true,
    }),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('tailwindcss-radix')
  ],
}
export default config
