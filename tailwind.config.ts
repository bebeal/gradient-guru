import type { Config } from 'tailwindcss';
import { radixThemePreset } from 'radix-themes-tw';
import typographyPlugin from '@tailwindcss/typography';
import aspectRatioPlugin from '@tailwindcss/aspect-ratio'
import containerQueriesPlugin from '@tailwindcss/container-queries';
import tailwindGlassPlugin from './utils/tailwind-plugins/tailwind-glass';

const config: Config = {
  safelist: ["glass"],
  darkMode: ['class'],
  content: [
    './app/**/*.{js,jsx,ts,tsx,md,mdx}',
    './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
    './hooks/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx,md,mdx}',
    './utils/**/*.{js,jsx,ts,tsx,md,mdx}',
  ],
  preset: [radixThemePreset],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',  
        muted: 'rgb(var(--muted) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        error: 'rgb(var(--error) / <alpha-value>)'
      },
      textColor: {
        primary: 'rgb(var(--text-primary)  / <alpha-value>)',
        secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--text-tertiary) / <alpha-value>)'
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
    },
    fontFamily: {
      mono: ['Berkeley Mono', 'monospace'],
      argon: ['Argon', 'monospace'],
      krypton: ['Krypton', 'monospace'],
      neon: ['Neon', 'monospace'],
      radon: ['Radon', 'monospace'],
      xenon: ['Xenon', 'monospace']
    },
  },
  plugins: [
    typographyPlugin,
    aspectRatioPlugin,
    containerQueriesPlugin,
    tailwindGlassPlugin
  ],
};

export default config;
