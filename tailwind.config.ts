import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import radixThemePlugin from 'radix-ui-themes-with-tailwind';

const config: Config = {
  // TODO: fix this fucking joke
  safelist: [
    ...[...Array(10).keys()].flatMap(i => [`top-[${i*100}%]`, `top-[${i*-100}%]`, `left-[${i*100}%]`, `left-[${i*-100}%]`, `bottom-[${i*100}%]`, `bottom-[${i*-100}%]`, `right-[${i*100}%]`, `right-[${i*-100}%]`, `translate-x-[${i*100}%]`, `translate-x-[${i*-100}%]`, `translate-y-[${i*100}%]`, `translate-y-[${i*-100}%]`, `duration-${i * 100}`]),
    ...[...Array(100).keys()].flatMap(i => [`space-x-[${i}px]`, `space-x-[${i}px]`, `space-y-[${i}px]`, `space-y-[${i}px]`, `height-[${i}px]`, `height-[${i*10}px]`, `height-[${i*100}px]`, `top-[${i}%]`, `top-[${-i}%]`, `left-[${i}%]`, `left-[${-i}%]`, `bottom-[${i}%]`, `bottom-[${-i}%]`, `right-[${i}%]`, `right-[${-i}%]`, `translate-x-[${i}%]`, `translate-x-[${-i}%]`, `translate-y-[${i}%]`, `translate-y-[${-i}%]`]),
    ...Object.keys(colors).flatMap((color) => Array.from({ length: 9 }, (_, i) => [ `from-${color}-${(i + 1) * 100}`, `via-${color}-${(i + 1) * 100}`, `to-${color}-${(i + 1) * 100}` ]) ).flat(),
    `[background-size:300%] [background-size:400%] [background-size:500%] [background-size:600%] after:animate-gradient-transition`,
    `after:[background-size:100%] after:[background-size:125%] after:[background-size:200%] after:[background-size:300%] after:[background-size:400%] after:[background-size:500%] after:[background-size:600%]`,
    `after:[background-image:linear-gradient(to_right,#FF1834,#FFC900,#00E0D9,#0074E0,#7F00DE,#FF007E)]`,
    `[background-image:linear-gradient(to_right,#FF1834,#FFC900,#00E0D9,#0074E0,#7F00DE,#FF007E)]`,
    `after:[background-image:linear-gradient(to_left,#FF1834,#FFC900,#00E0D9,#0074E0,#7F00DE,#FF007E)]`,
    `[background-image:linear-gradient(to_left,#FF1834,#FFC900,#00E0D9,#0074E0,#7F00DE,#FF007E)]`, `background:radial-gradient(circle_closest-side_at_center,white,transparent)`,
    `[&>svg]:fill-[url(#svg-gradient-FF1834,FFC900,00E0D9,0074E0,7F00DE,FF007E)] [&>svg]:fill-[currentColor]`,
    `[mask:url(#)_center/contain]`
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
      keyframes: {
        'gradient-transition': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        }
      },
      animation: {
        'gradient-transition': 'gradient-transition 15s ease infinite',
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
