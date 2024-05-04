import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
const viteConfig = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    resolve: {
      // module alias @/ to /src
      alias: [{ find: '@', replacement: __dirname + '/src' }],
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.d.ts', '.json'],
    },
    build: {
      minify: false, // Set to false to make tests faster, set to true for production
    },
    ssr: {
      noExternal: ['styled-components', '@emotion/*'],
    },
    server: {
      port: parseInt(env.PORT) || 3407,
    },
    plugins: [
      // for react with swc for faster refresh instead of esbuild & babel
      react(),
      // for resolving paths in tsconfig.json e.g. so that you can import '@/components'
      tsconfigPaths(),
      // for importing .svg files as react components, and .svg?url as URLs
      svgr({
        svgrOptions: {
          dimensions: true,
          icon: true,
        },
        include: '**/*.svg',
      }),
    ],
  };
});

export default viteConfig;
