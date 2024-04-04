import AspectRatioPlugin from '@tailwindcss/aspect-ratio';
import ContainerQueriesPlugin from '@tailwindcss/container-queries';
import TypographyPlugin from '@tailwindcss/typography';
import { radixThemePreset } from 'radix-themes-tw';
import TailwindCSSRadixPlugin from 'tailwindcss-radix';
import { AnimationTailwindcssPlugin, TailwindGlassPlugin, TailwindGridPlugin, VariablesForColors } from './utils/tailwind-plugins';
import type { Config } from 'tailwindcss';

const config: Config = {
  safelist: [
    '!cursor-pointer w-[10px] h-[10px]',
    ...[...Array(100).keys()].flatMap((i) => [`space-y-[${i}px]`, `space-x-[${i}px]`, `h-[${i}px]`, `w-[${i}px]`, `h-[${i + 100}px]`, `w-[${i + 100}px]`, `h-[${i + 200}px]`, `w-[${i + 200}px]`, `grid-cols-${i}`, `grid-rows-${i}`]),
    ...[...Array(10).keys()].flatMap((i) => [`space-y-[${i}px]`, `space-x-[${i}px]`, `w-[${i * 100}px]`, `h-[${i + 100}px]`]),
    `radix-state-open:rounded-t-lg radix-state-closed:rounded-lg rounded-b-lg rounded-t-lg rounded-lg radix-state-open:rounded-lg`,
    `radix-state-open:rounded-t-xl radix-state-closed:rounded-xl rounded-b-xl rounded-t-xl`,
    `text-accent-500 text-accent-400`,
    `!rounded !rounded-full !rounded-sm !rounded-md !rounded-lg !rounded-xl`,
    'text-red text-ruby text-crimson text-pink text-plum text-purple text-violet text-iris text-indigo text-blue text-cyan text-teal text-jade text-green text-grass text-brown text-orange text-sky text-mint text-lime text-yellow text-amber text-gold text-bronze text-gray',
    'bg-red bg-ruby bg-crimson bg-pink bg-plum bg-purple bg-violet bg-iris bg-indigo bg-blue bg-cyan bg-teal bg-jade bg-green bg-grass bg-brown bg-orange bg-sky bg-mint bg-lime bg-yellow bg-amber bg-gold bg-bronze bg-gray',
    `text-red-500 text-error-500 text-green-500 text-success-500 text-primary-500 text-accent-500`,
    `bg-red-500 bg-error-500 bg-green-500 bg-success-500 bg-primary-500 bg-accent-500`,
    'prose prose-sm prose-base prose-slate dark:prose-invert focus:outline-none',
    `object-fit object-contain object-cover max-w-full !max-w-full text-error bg-[rgb(0, 0, 0)] bg-[rgb(var(--accent-500))]`,
  ],
  darkMode: ['class'],
  content: [
    './app/**/*.{js,jsx,ts,tsx,md,mdx}',
    './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
    './hooks/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx,md,mdx}',
    './utils/**/*.{js,jsx,ts,tsx,md,mdx}',
    './content/**/*.{js,jsx,ts,tsx,md,mdx}',
    './clients/**/*.{js,jsx,ts,tsx,md,mdx}',
  ],
  preset: [radixThemePreset],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        error: 'rgb(var(--error) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        'kbd-foreground': 'rgb(var(--kbd-foreground) / <alpha-value>)',
        accent: {
          400: 'rgb(var(--accent-400) / <alpha-value>)',
          500: 'rgb(var(--accent-500) / <alpha-value>)',
          600: 'rgb(var(--accent-600) / <alpha-value>)',
          DEFAULT: 'rgb(var(--accent-500) / <alpha-value>)',
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
        argon: ['Argon', 'monospace'],
        krypton: ['Krypton', 'monospace'],
        neon: ['Neon', 'monospace'],
        radon: ['Radon', 'monospace'],
        xenon: ['Xenon', 'monospace'],
      },
      backgroundImage: {
        'mountain': `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1124&q=100')`,
      },
      boxShadow: {
        kbd: 'inset 0 0.05em hsla(0,0%,100%,.372),inset 0 0.25em 0.5em rgba(121,121,250,.031),inset 0 0 rgba(0,0,0,.875),inset 0 0 0 0.075em rgba(222,243,255,.334),inset 0 0.08em 0.17em rgba(0,0,0,.875)',
        'kbd-hover': 'inset 0 0.05em white,inset 0 0.25em 0.5em rgba(121,121,250,.031),inset 0 0 rgba(0,0,0,.875),inset 0 0 0 0.075em rgb(var(--text-secondary)),inset 0 0.08em 0.17em rgba(0,0,0,.875)',
      },
      keyframes: {
        'accordion-down': {
          from: { maxHeight: '0' },
          to: { maxHeight: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { maxHeight: 'var(--radix-accordion-content-height)' },
          to: { maxHeight: '0' },
        },
        'accordion-out': {
          from: { maxWidth: '0' },
          to: { maxWidth: 'var(--radix-accordion-content-width)' },
        },
        'accordion-in': {
          from: { maxWidth: 'var(--radix-accordion-content-width)' },
          to: { maxWidth: '0' },
        },
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '50%': { opacity: '0.5', transform: 'translateY(-10%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-right-fade': {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '50%': { opacity: '0.5', transform: 'translateX(10%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-down-fade': {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '50%': { opacity: '0.5', transform: 'translateY(10%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-left-fade': {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '50%': { opacity: '0.5', transform: 'translateX(-10%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'ripple': {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'ripple-pause': {
          '0%': { transform: 'scale(2.4)', opacity: '0' },
          '25%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'dot-bounce': {
          '0%': {
            transform: 'translateY(-40%)',
            opacity: '1',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0%)',
            opacity: '0',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '100%': {
            transform: 'translateY(-40%)',
            opacity: '1',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
        },
        'focus-chat': {
          '0%': { transform: 'translate(0, 0)' },
          '5%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(0.15em, 0)' },
          '20%': { transform: 'translate(0.15em, 0.15em)' },
          '30%': { transform: 'translate(0.15em, 0.15em)' },
          '35%': { transform: 'translate(-0.15em, 0.15em)' },
          '45%': { transform: 'translate(-0.15em, 0)' },
          '55%': { transform: 'translate(-0.15em, 0)' },
          '60%': { transform: 'translate(0, 0)' },
          '70%': { transform: 'translate(0, 0)' },
          '80%': { transform: 'translate(0, 0)' },
          '90%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'grow': {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.1)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        'pulsate': {
          '0%': {
            'box-shadow': '0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 30px #FFFFFF, 0 0 40px #FFFFFF',
          },
          '50%': {
            'box-shadow': '0 0 20px #FFFFFF, 0 0 30px #FFFFFF, 0 0 40px #FFFFFF, 0 0 50px #FFFFFF, 0 0 60px #FFFFFF',
          },
          '100%': {
            'box-shadow': '0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 30px #FFFFFF, 0 0 40px #FFFFFF',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.3s ease-in-out both',
        'accordion-up': 'accordion-up 0.3s ease-in-out both',
        'accordion-out': 'accordion-out 0.3s ease-in-out both',
        'accordion-in': 'accordion-in 0.3s ease-in-out both',
        'slide-up-fade': 'slide-up-fade 0.3s ease-in-out',
        'slide-right-fade': 'slide-right-fade 0.3s ease-in-out',
        'slide-down-fade': 'slide-down-fade 0.3s ease-in-out',
        'slide-left-fade': 'slide-left-fade 0.3s ease-in-out',
        'ripple': 'ripple 1.2s infinite ease-in-out',
        'ripple-pause': 'ripple-pause 2s backwards infinite ease-in-out',
        'dot-bounce': 'dot-bounce 1s infinite',
        'focus-chat': 'focus-chat 3s infinite cubic-bezier(0.8, 0, 1, 1)',
        'grow': 'grow 5s infinite linear',
        'spin-cw': 'spin 2s linear infinite forwards',
        'spin-ccw': 'spin 2s linear infinite reverse',
        'pulsate': 'pulsate 2s infinite',
      },
    },
  },
  plugins: [
    VariablesForColors,
    TailwindCSSRadixPlugin,
    TypographyPlugin,
    AspectRatioPlugin,
    ContainerQueriesPlugin,
    AnimationTailwindcssPlugin,
    TailwindGlassPlugin,
    TailwindGridPlugin,
  ],
};

export default config;
