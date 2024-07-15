import type { Config } from 'tailwindcss';
import AspectRatioPlugin from '@tailwindcss/aspect-ratio';
import ContainerQueriesPlugin from '@tailwindcss/container-queries';
import TypographyPlugin from '@tailwindcss/typography';
import { radixThemePreset } from 'radix-themes-tw';
import TailwindCSSRadixPlugin from 'tailwindcss-radix';
import { AnimationTailwindcssPlugin, TailwindGlassPlugin, TailwindGridPlugin, VariablesForColors } from './utils/tailwind-plugins';

const config: Config = {
  safelist: [
    '!cursor-pointer w-[10px] h-[10px] animate-slide-right',
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
    'font-mono font-argon font-krypton font-neon font-radon font-xenon',
  ],
  darkMode: ['class'],
  content: [
    './app/**/*.{js,jsx,ts,tsx,md,mdx}',
    './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
    './hooks/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx,md,mdx}',
    './utils/**/*.{js,jsx,ts,tsx,md,mdx}',
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
        mountain: `url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1124&q=100')`,
      },
      boxShadow: {
        kbd: 'inset 0 0.05em hsla(0,0%,100%,.372),inset 0 0.25em 0.5em rgba(121,121,250,.031),inset 0 0 rgba(0,0,0,.875),inset 0 0 0 0.075em rgba(222,243,255,.334),inset 0 0.08em 0.17em rgba(0,0,0,.875)',
        'kbd-hover': 'inset 0 0.05em white,inset 0 0.25em 0.5em rgba(121,121,250,.031),inset 0 0 rgba(0,0,0,.875),inset 0 0 0 0.075em rgb(var(--text-secondary)),inset 0 0.08em 0.17em rgba(0,0,0,.875)',
      },
      keyframes: {
        // Supports accordion rollout animations of the rest of the accordion
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
        // Slides support toast swiping animations: https://www.radix-ui.com/primitives/docs/components/toast#animating-swipe-gesture
        'swipe-down': {
          from: { transform: 'translateY(var(--radix-toast-swipe-end-y))' },
          to: { transform: `translateY(calc(100% + 18px))` },
        },
        'swipe-up': {
          from: { transform: 'translateY(var(--radix-toast-swipe-end-y))' },
          to: { transform: 'translateY(calc(-100% - 18px))' },
        },
        'swipe-left': {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(-100% - 8px))' },
        },
        'swipe-right': {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + 8px))' },
        },
        'slide-in': {
          from: { transform: 'translateX(calc(100% + 8px))' },
          to: { transform: 'translateX(0))' },
        },
        'hide': {
          from: { 'opacity': '1' },
          to: { 'opacity': '0' },
        },
        // Support tooltip hiding/showing animations
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '50%': { opacity: '0.5', transform: 'translateY(-10%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-right': {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '50%': { opacity: '0.5', transform: 'translateX(10%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '50%': { opacity: '0.5', transform: 'translateY(10%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-left': {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '50%': { opacity: '0.5', transform: 'translateX(-10%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        // supports ripple like animation on all clickbles
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'ripple-pause': {
          '0%': { transform: 'scale(2.4)', opacity: '0' },
          '25%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        // for animating DotDotDot svg to create a simple loading animation
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
        // single specific case use for FocusChat custom icon which shows an arcade like crosshair moving around randomly inside of a speech bubble
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
        // to make components slightly grow and shrink to grab attention
        grow: {
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
        // pulse animation but don't call it pulse cause tailwind already defines a pulse animation which might be useful to have?
        pulsate: {
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
        'swipe-down': 'swipe-down 0.1s ease-out',
        'swipe-up': 'swipe-up 0.1s ease-out',
        'swipe-left': 'swipe-left 0.1s ease-out',
        'swipe-right': 'swipe-right 0.1s ease-out',
        'slide-in': 'slide-in 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        'hide': 'hide 0.1s ease-in-out',
        'fade-up': 'fade-up 0.3s ease-in-out',
        'fade-right': 'fade-right 0.3s ease-in-out',
        'fade-down': 'fade-down 0.3s ease-in-out',
        'fade-left': 'fade-left 0.3s ease-in-out',
        ripple: 'ripple 1.2s infinite ease-in-out',
        'ripple-pause': 'ripple-pause 2s backwards infinite ease-in-out',
        'dot-bounce': 'dot-bounce 1s infinite',
        'focus-chat': 'focus-chat 3s infinite cubic-bezier(0.8, 0, 1, 1)',
        grow: 'grow 5s infinite linear',
        'spin-cw': 'spin 2s linear infinite forwards',
        'spin-ccw': 'spin 2s linear infinite reverse',
        pulsate: 'pulsate 2s infinite',
      },
    },
  },
  plugins: [VariablesForColors, TailwindCSSRadixPlugin, TypographyPlugin, AspectRatioPlugin, ContainerQueriesPlugin, AnimationTailwindcssPlugin, TailwindGlassPlugin, TailwindGridPlugin],
};

export default config;
