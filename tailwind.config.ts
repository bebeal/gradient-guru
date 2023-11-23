import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  safelist: [
    // ...[...Array(100).keys()].flatMap(i => [`top-[${i}%]`, `top-[${-i}%]`, `top-[${i*100}%]`, `top-[${-i*100}%]`, `left-[${i}%]`, `left-[${-i}%]`, `left-[${i*100}%]`, `left-[${-i*100}%]`, `translate-y-[${i}%]`, `translate-y-[${-i}%]`, `translate-y-[${i*100}%]`, `translate-y-[${-i*100}%]`, `translate-x-[${i}%]`, `translate-x-[${-i}%]`, `translate-x-[${i*100}%]`, `translate-x-[${-i*100}%]`]),
    {
      pattern: /./,
    }
  ],
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
        accent: {
          50: 'rgb(var(--accent-50) / <alpha-value>)',
          100: 'rgb(var(--accent-100) / <alpha-value>)',
          200: 'rgb(var(--accent-200) / <alpha-value>)',
          300: 'rgb(var(--accent-300) / <alpha-value>)',
          400: 'rgb(var(--accent-400) / <alpha-value>)',
          500: 'rgb(var(--accent-500) / <alpha-value>)',
          600: 'rgb(var(--accent-600) / <alpha-value>)',
          700: 'rgb(var(--accent-700) / <alpha-value>)',
          800: 'rgb(var(--accent-800) / <alpha-value>)',
          900: 'rgb(var(--accent-900) / <alpha-value>)',
          950: 'rgb(var(--accent-950) / <alpha-value>)',
          DEFAULT: 'rgb(var(--accent-500) / <alpha-value>)'
        },
        slate: {
          ...colors.slate,
          DEFAULT: colors.slate['500']
        },
        zinc: {
          ...colors.zinc,
          DEFAULT: colors.zinc['500']
        },
        stone: {
          ...colors.stone,
          DEFAULT: colors.stone['500']
        },
        red: {
          ...colors.red,
          DEFAULT: colors.red['500']
        },
        orange: {
          ...colors.orange,
          DEFAULT: colors.orange['500']
        },
        amber: {
          ...colors.amber,
          DEFAULT: colors.amber['500']
        },
        yellow: {
          ...colors.yellow,
          DEFAULT: colors.yellow['500']
        },
        lime: {
          ...colors.lime,
          DEFAULT: colors.lime['500']
        },
        green: {
          ...colors.green,
          DEFAULT: colors.green['500']
        },
        emerald: {
          ...colors.emerald,
          DEFAULT: colors.emerald['500']
        },
        teal: {
          ...colors.teal,
          DEFAULT: colors.teal['500']
        },
        cyan: {
          ...colors.cyan,
          DEFAULT: colors.cyan['500']
        },
        sky: {
          ...colors.sky,
          DEFAULT: colors.sky['500']
        },
        blue: {
          ...colors.blue,
          DEFAULT: colors.blue['500']
        },
        indigo: {
          ...colors.indigo,
          DEFAULT: colors.indigo['500']
        },
        violet: {
          ...colors.violet,
          DEFAULT: colors.violet['500']
        },
        purple: {
          ...colors.purple,
          DEFAULT: colors.purple['500']
        },
        fuchia: {
          ...colors.fuchsia,
          DEFAULT: colors.fuchsia['500']
        },
        pink: {
          ...colors.pink,
          DEFAULT: colors.pink['500']
        },
        rose: {
          ...colors.rose,
          DEFAULT: colors.rose['500']
        },
        muted: 'rgb(var(--muted) / <alpha-value>)',
        error: 'rgb(var(--error) / <alpha-value>)'
      },
      textColor: {
        primary: 'rgb(var(--text-primary)  / <alpha-value>)',
        secondary: 'rgb(var(--text-secondary) / <alpha-value>)'
      },
      backgroundColor: {
        primary: 'rgb(var(--background-primary) / <alpha-value>)',
        secondary: 'rgb(var(--background-secondary) / <alpha-value>)'
      },
      fill: {
        primary: 'rgb(var(--background-primary) / <alpha-value>)',
        secondary: 'rgb(var(--background-secondary) / <alpha-value>)'
      },
      borderColor: {
        primary: 'rgb(var(--border-primary) / <alpha-value>)',
        secondary: 'rgb(var(--border-secondary) / <alpha-value>)'
      },
      stroke: {
        primary: 'rgb(var(--border-primary) / <alpha-value>)',
        secondary: 'rgb(var(--border-secondary) / <alpha-value>)'
      },
      outlineColor: {
        primary: 'rgb(var(--border-primary) / <alpha-value>)',
        secondary: 'rgb(var(--border-secondary) / <alpha-value>)'
      },
      ringColor: {
        primary: 'rgb(var(--border-primary) / <alpha-value>)',
        secondary: 'rgb(var(--border-secondary) / <alpha-value>)'
      },
      fontFamily: {
        mono: ['Berkeley Mono', 'monospace'],
        argon: ['Argon', 'Berkeley Mono', 'monospace'],
        krypton: ['Krypton', 'Berkeley Mono', 'monospace'],
        neon: ['Neon', 'Berkeley Mono', 'monospace'],
        radon: ['Radon', 'Berkeley Mono', 'monospace'],
        xenon: ['Xenon', 'Berkeley Mono', 'monospace']
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('tailwindcss-radix')
  ],
}
export default config
