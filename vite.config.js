import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // Ensures correct relative path for assets in production
  plugins: [react()],
  build: {
    outDir: 'dist', // Sets the output directory for production build
  },
  server: {
    mimeTypes: {
      '.js': 'application/javascript',
      '.css': 'text/css',
    },
    hmr: {
      overlay: false, // Disables the overlay for errors and warnings
    },
  },
});

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   base: './', // Ensures correct relative path for assets in production
//   plugins: [react()],
//   build: {
//     outDir: 'dist', // Sets the output directory for production build
//   },
//   server: {
//     mimeTypes: {
//       '.js': 'application/javascript',
//       '.css': 'text/css',
//     },
//   },
// });

