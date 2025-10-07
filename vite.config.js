import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-files',
      closeBundle() {
        // Copy necessary files to dist
        const filesToCopy = [
          { from: 'src/utils/renderer.js', to: 'dist/utils/renderer.js' },
          { from: 'src/audioUtils.js', to: 'dist/audioUtils.js' },
          { from: 'src/config.js', to: 'dist/config.js' },
        ];

        filesToCopy.forEach(({ from, to }) => {
          const dir = dirname(to);
          if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
          }
          copyFileSync(from, to);
        });

        console.log('✓ Copied necessary files to dist');
      },
    },
  ],
  base: './',
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/react'),
    },
  },
  publicDir: 'src/assets',
});
