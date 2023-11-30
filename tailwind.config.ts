import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const min = -10
const max = 10;
const step = 0.1;
const config: Config = {
  safelist: [
    ...[...Array(100).keys()].flatMap(i => [`space-y-[${i}px]`, `space-x-[${i}px]`, `h-[${i}px]`, `w-[${i}px]`]),
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
      boxShadow: {
        'kbd': 'inset 0 0.05em hsla(0,0%,100%,.372),inset 0 0.25em 0.5em rgba(121,121,250,.031),inset 0 -0.1em rgba(0,0,0,.875),0 0 0 0.075em rgba(222,243,255,.334),0 0.08em 0.17em rgba(0,0,0,.875)',
      },
      keyframes: {
        // Accordion
        'slide-down-accordion': {
          '0%': { height: '0' },
          '100%': { height: 'var(--radix-accordion-content-height)' },
        },
        'slide-up-accordion': {
          '0%': { height: 'var(--radix-accordion-content-height)' },
          '100%': { height: '0' },
        },
        'slide-out-accordion': {
          '0%': { width: '0' },
          '100%': { width: 'var(--radix-accordion-content-width)' },
        },
        'slide-in-accordion': {
          '0%': { width: 'var(--radix-accordion-content-width)' },
          '100%': { width: '0' },
        },
        // DotsLoader
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
        // Focus Chat
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
        // Under Construction
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
        // Copy Button
        "scale-up": {
          '0%': { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          '100%': { transform: "scale(1)" },
        },
        // Tooltip/Hovercard
        "slide-up-fade": {
          '0%': { opacity: "0", transform: "translateY(2px)" },
          '100%': { opacity: "1", transform: "translateY(0)" },
        },
        "slide-right-fade": {
          '0%': { opacity: "0", transform: "translateX(-2px)" },
          '100%': { opacity: "1", transform: "translateX(0)" },
        },
        "slide-down-fade": {
          '0%': { opacity: "0", transform: "translateY(-2px)" },
          '100%': { opacity: "1", transform: "translateY(0)" },
        },
        "slide-left-fade": {
          '0%': { opacity: "0", transform: "translateX(2px)" },
          '100%': { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        // Accordion
        "slide-down-accordion": "slide-down-accordion 0.2s ease-in-out",
        "slide-up-accordion": "slide-up-accordion 0.2s ease-in-out",
        "slide-out-accordion": "slide-out-accordion 0.2s ease-in-out",
        "slide-in-accordion": "slide-in-accordion 0.2s ease-in-out",
        // DotsLoader
        "bigger-bounce": "bigger-bounce 1s infinite",
        // Focus Chat
        "focus-chat": "focus-chat 3s infinite cubic-bezier(0.8, 0, 1, 1)",
        // Under Construction
        "banner-pulse": "banner-pulse 5s infinite linear",
        // Copy Button
        "scale-up": "scale-up 0.5s linear",
        // Tooltip
        "slide-up-fade": "slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-right-fade":
        "slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-left-fade": "slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('tailwindcss-radix')
  ],
}
export default config
