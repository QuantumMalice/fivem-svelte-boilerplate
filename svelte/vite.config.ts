import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    tailwindcss()
  ],
  base: './',
  build: {
      minify: 'esbuild',
      outDir: '../web',
      emptyOutDir: true,
      rollupOptions: {
      output: {
          entryFileNames: `app.js`,
          chunkFileNames: `[name].js`,
          assetFileNames: (assetInfo) => {
              if (assetInfo.name?.endsWith('.css')) {
                  return 'style.[ext]';
              }

              return 'assets/[name].[ext]';
          }
      }
      }
  },
})
