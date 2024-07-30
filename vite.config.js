// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',  // Use relative paths for the built assets
  build: {
    outDir: 'docs',  // Specify the output directory
  },
});
