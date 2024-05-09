import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export const plugins = [
  // for react with swc for faster refresh instead of esbuild & babel
  react(),
  // for resolving paths in tsconfig.json
  tsconfigPaths(),
  // for importing .svg files as react components, and .svg?url as URLs
  svgr({
    svgrOptions: { dimensions: true, icon: true },
    include: '**/*.svg',
  }),
];

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // Set minify to false to make tests faster, set to true for production
    minify: false,
  },
  plugins,
  resolve: {
    alias: [
      { find: '@', replacement: `${__dirname}/src` },
      { find: '@assets', replacement: `${__dirname}/assets` },
      { find: '@api', replacement: `${__dirname}/server/api` },
      { find: '@client', replacement: `${__dirname}/src` },
      { find: '@clients', replacement: `${__dirname}/src/clients` },
      { find: '@components', replacement: `${__dirname}/src/components` },
      { find: '@hooks', replacement: `${__dirname}/src/hooks` },
      { find: '@lib', replacement: `${__dirname}/src/lib` },
      { find: '@pages', replacement: `${__dirname}/src/pages` },
      { find: '@public', replacement: `${__dirname}/public` },
      { find: '@server', replacement: `${__dirname}/server` },
      { find: '@types', replacement: `${__dirname}/types` },
      { find: '@utils', replacement: `${__dirname}/src/utils` },
    ],
    extensions: ['.cjs', '.mjs', '.js', '.cts', '.mts', '.ts', '.jsx', '.tsx', '.md', '.mdx', '.d.ts', '.json'],
  },
  ssr: {
    noExternal: ['styled-components', '@emotion/*'],
  },
});
