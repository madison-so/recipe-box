import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' makes the build work on GitHub Pages project sites (username.github.io/repo-name/)
export default defineConfig({
  plugins: [react()],
  base: './',
});
