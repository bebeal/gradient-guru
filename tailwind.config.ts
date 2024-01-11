import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import { AnimationTailwindcssPlugin } from './utils/animate-tailwindcss';
import { AceternityTailwindcssPlugin, addVariablesForColors } from './utils/aceternity-tailwindcss';

const config: Config = {
  safelist: [
    ...[...Array(100).keys()].flatMap(i => [`space-y-[${i}px]`, `space-x-[${i}px]`, `h-[${i}px]`, `w-[${i}px]`, `h-[${i+100}px]`, `w-[${i+100}px]`,  `h-[${i+200}px]`, `w-[${i+200}px]`, `grid-cols-${i}`, `grid-rows-${i}`]),
    `radix-state-open:rounded-t-lg radix-state-closed:rounded-lg rounded-b-lg rounded-t-lg`,
    `radix-state-open:rounded-t-xl radix-state-closed:rounded-xl rounded-b-xl rounded-t-xl`,
    `text-accent-500 text-accent-400`, `!rounded !rounded-full !rounded-sm !rounded-md !rounded-lg !rounded-xl`,
    'text-red text-ruby text-crimson text-pink text-plum text-purple text-violet text-iris text-indigo text-blue text-cyan text-teal text-jade text-green text-grass text-brown text-orange text-sky text-mint text-lime text-yellow text-amber text-gold text-bronze text-gray',
    'bg-red bg-ruby bg-crimson bg-pink bg-plum bg-purple bg-violet bg-iris bg-indigo bg-blue bg-cyan bg-teal bg-jade bg-green bg-grass bg-brown bg-orange bg-sky bg-mint bg-lime bg-yellow bg-amber bg-gold bg-bronze bg-gray',
    `text-red-500 text-error-500 text-green-500 text-success-500 text-primary-500 text-accent-500`,
    `bg-red-500 bg-error-500 bg-green-500 bg-success-500 bg-primary-500 bg-accent-500`,
    'prose prose-sm prose-base prose-slate dark:prose-invert focus:outline-none',
    `object-fit object-contain object-cover max-w-full !max-w-full`
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
        error: 'rgb(var(--error) / <alpha-value>)',
        'kbd-foreground': 'rgb(var(--kbd-foreground) / <alpha-value>)'
      },
      textColor: {
        primary: 'rgb(var(--text-primary)  / <alpha-value>)',
        secondary: 'rgb(var(--text-secondary) / <alpha-value>)'
      },
      backgroundColor: {
        primary: 'rgb(var(--background-primary) / <alpha-value>)',
        secondary: 'rgb(var(--background-secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--background-tertiary) / <alpha-value>)',
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
        argon: ['Argon', 'monospace'],
        krypton: ['Krypton', 'monospace'],
        neon: ['Neon', 'monospace'],
        radon: ['Radon', 'monospace'],
        xenon: ['Xenon', 'monospace']
      },
      boxShadow: {
        'kbd': 'inset 0 0.05em hsla(0,0%,100%,.372),inset 0 0.25em 0.5em rgba(121,121,250,.031),inset 0 0 rgba(0,0,0,.875),inset 0 0 0 0.075em rgba(222,243,255,.334),inset 0 0.08em 0.17em rgba(0,0,0,.875)',
        'kbd-hover': 'inset 0 0.05em white,inset 0 0.25em 0.5em rgba(121,121,250,.031),inset 0 0 rgba(0,0,0,.875),inset 0 0 0 0.075em rgb(var(--text-secondary)),inset 0 0.08em 0.17em rgba(0,0,0,.875)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'accordion-out': {
          'from': { width: '0' },
          'to': { width: 'var(--radix-accordion-content-width)' }
        },
        'accordion-in': {
          'from': { width: 'var(--radix-accordion-content-width)' },
          'to': { width: '0' }
        },
        "bigger-bounce": {
          '0%': {
            transform: "translateY(-40%)",
            opacity: "1",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)"
          },
          "50%": {
            transform: "translateY(0%)",
            opacity: "0",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)"
          },
          '100%': {
            transform: "translateY(-40%)",
            opacity: "1",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)"
          },
        },
        "focus-chat": {
          '0%':   { transform: "translate(0, 0)" },
          "5%":   { transform: "translate(0, 0)" },
          "10%":  { transform: "translate(0.15em, 0)" },
          "20%":  { transform: "translate(0.15em, 0.15em)" },
          "30%":  { transform: "translate(0.15em, 0.15em)" },
          "35%":  { transform: "translate(-0.15em, 0.15em)" },
          "45%":  { transform: "translate(-0.15em, 0)" },
          "55%":  { transform: "translate(-0.15em, 0)" },
          "60%":  { transform: "translate(0, 0)" },
          "70%":  { transform: "translate(0, 0)" },
          "80%":  { transform: "translate(0, 0)" },
          "90%":  { transform: "translate(0, 0)" },
          '100%': { transform: "translate(0, 0)" },
        },
        "banner-pulse": {
          '0%': {
            transform: 'rotate(-25deg) scale(1)'
          },
          '50%': {
            transform: 'rotate(-25deg) scale(1.1)'
          },
          '100%': {
            transform: 'rotate(-25deg) scale(1)'
          }
        },
        "scale-up": {
          '0%': { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          '100%': { transform: "scale(1)" },
        },
        "slide-up-fade": {
          '0%': { opacity: "0", transform: "translateY(100%)" },
          '50%': { opacity: "0.5", transform: "translateY(-10%)" },
          '100%': { opacity: "1", transform: "translateY(0)" },
        },
        "slide-right-fade": {
          '0%': { opacity: "0", transform: "translateX(-100%)" },
          '50%': { opacity: "0.5", transform: "translateX(10%)" },
          '100%': { opacity: "1", transform: "translateX(0)" },
        },
        "slide-down-fade": {
          '0%': { opacity: "0", transform: "translateY(-100%)" },
          '50%': { opacity: "0.5", transform: "translateY(10%)" },
          '100%': { opacity: "1", transform: "translateY(0)" },
        },
        "slide-left-fade": {
          '0%': { opacity: "0", transform: "translateX(100%)" },
          '50%': { opacity: "0.5", transform: "translateX(-10%)" },
          '100%': { opacity: "1", transform: "translateX(0)" },
        },
        "move-background": {
          "to": {
            "background-position": "-100% 0"
          }
        },
        "svg-glow": {
          "0%": { "filter": "drop-shadow(0 0 3px var(--tw-shadow-color)) drop-shadow(0 0 6px var(--tw-shadow-color))" },
          "50%": { "filter": "drop-shadow(0 0 7px var(--tw-shadow-color)) drop-shadow(0 0 14px var(--tw-shadow-color))" },
          "100%": { "filter": "drop-shadow(0 0 3px var(--tw-shadow-color)) drop-shadow(0 0 6px var(--tw-shadow-color))" }
        },
        "bigger-svg-glow": {
          "0%": { "filter": "drop-shadow(0 0 3px var(--tw-shadow-color)) drop-shadow(0 0 5px var(--tw-shadow-color)) drop-shadow(0 0 7px var(--tw-shadow-color))" },
          "50%": { "filter": "drop-shadow(0 0 5px var(--tw-shadow-color)) drop-shadow(0 0 7px var(--tw-shadow-color)) drop-shadow(0 0 10px var(--tw-shadow-color))" },
          "100%": { "filter": "drop-shadow(0 0 3px var(--tw-shadow-color)) drop-shadow(0 0 5px var(--tw-shadow-color)) drop-shadow(0 0 7px var(--tw-shadow-color))" }
        },
        "text-glow": {
          "0%": { "text-shadow": "0 0 2px var(--tw-shadow-color)" },
          "50%": { "text-shadow": "0 0 8px var(--tw-shadow-color)" },
          "100%": { "text-shadow": "0 0 2px var(--tw-shadow-color)" }
        },
        "bigger-text-glow": {
          "0%": { "text-shadow": "0 0 8px var(--tw-shadow-color)" },
          "50%": { "text-shadow": "0 0 14px var(--tw-shadow-color)" },
          "100%": { "text-shadow": "0 0 8px var(--tw-shadow-color)" }
        },
        "full-rotation": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          }
        },
        "ramp-up-spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "25%": {
            transform: "rotate(360deg)",
          },
          "50%": {
            transform: "rotate(720deg)",
          },
          "75%": {
            transform: "rotate(1080deg)",
          },
          "100%": {
            transform: "rotate(1440deg)",
          }
        },
        "pulsate": {
          "0%": {
            'box-shadow': "0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 30px #FFFFFF, 0 0 40px #FFFFFF",
          },
          "50%": {
            'box-shadow': "0 0 20px #FFFFFF, 0 0 30px #FFFFFF, 0 0 40px #FFFFFF, 0 0 50px #FFFFFF, 0 0 60px #FFFFFF",
          },
          "100%": {
            'box-shadow': "0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 30px #FFFFFF, 0 0 40px #FFFFFF",
          }
        },
        // Avatar
        "ripple": {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        "ripple-pause": {
          '0%': { transform: 'scale(2.4)', opacity: '0' },
          '25%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-in-out both",
        "accordion-up": "accordion-up 0.3s ease-in-out both",
        "accordion-out": "accordion-out 0.3s ease-in-out both",
        "accordion-in": "accordion-in 0.3s ease-in-out both",
        "bigger-bounce": "bigger-bounce 1s infinite",
        "focus-chat": "focus-chat 3s infinite cubic-bezier(0.8, 0, 1, 1)",
        "banner-pulse": "banner-pulse 5s infinite linear",
        "scale-up": "scale-up 0.5s linear",
        "slide-up-fade": "slide-up-fade 0.3s ease-in-out",
        "slide-right-fade": "slide-right-fade 0.3s ease-in-out",
        "slide-down-fade": "slide-down-fade 0.3s ease-in-out",
        "slide-left-fade": "slide-left-fade 0.3s ease-in-out",
        "move-background": "move-background 1s linear infinite",
        "rotate-clockwise": "full-rotation 2s linear infinite forwards",
        "rotate-counter-clockwise": "full-rotation 2s linear infinite reverse",
        "svg-glow": "svg-glow 1.5s ease-in-out infinite alternate",
        "bigger-svg-glow": "bigger-svg-glow 1.5s infinite alternate",
        "text-glow": "text-glow 1.5s ease-in-out infinite alternate",
        "bigger-text-glow": "bigger-text-glow 1.5s infinite alternate",
        "ramp-up-spin": "ramp-up-spin 2s linear infinite reverse",
        "pulsate": "pulsate 2s infinite",
        "ripple": 'ripple 1.2s infinite ease-in-out',
        "ripple-pause": 'ripple-pause 2s backwards infinite ease-in-out',
      }
    },
  },
  plugins: [
    AnimationTailwindcssPlugin,
    AceternityTailwindcssPlugin,
    addVariablesForColors,
    require('@tailwindcss/typography'),
    require('tailwindcss-radix'),
    require("@tailwindcss/aspect-ratio")
  ],
}
export default config
