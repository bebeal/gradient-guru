import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  resolve: {
    // module alias @/ to /src
    alias: [{ find: '@', replacement: __dirname + '/src' }],
  },
  build: {
    minify: false, // Set to false to make tests faster, set to true for production
  },
  plugins: [react(), tsconfigPaths()],
});
