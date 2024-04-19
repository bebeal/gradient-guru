import AspectRatioPlugin from '@tailwindcss/aspect-ratio';
import ContainerQueriesPlugin from '@tailwindcss/container-queries';
import TypographyPlugin from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    // Before editing this section, make sure no paths are matching with `/src/main.js`
    // Look https://github.com/vitejs/vite/pull/6959 for more details
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,md,mdx,html}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    AspectRatioPlugin,
    ContainerQueriesPlugin,
    TypographyPlugin,
  ],
};

export default config;
