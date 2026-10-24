import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function syncRootImagesPlugin(): Plugin {
  const copyRootImagesToPublic = () => {
    const rootImagesDir = path.resolve(__dirname, 'images');
    const publicImagesDir = path.resolve(__dirname, 'public/images');
    if (fs.existsSync(rootImagesDir)) {
      fs.mkdirSync(publicImagesDir, {recursive: true});
      for (const file of fs.readdirSync(rootImagesDir)) {
        const srcFile = path.join(rootImagesDir, file);
        const destFile = path.join(publicImagesDir, file);
        if (fs.statSync(srcFile).isFile()) {
          fs.copyFileSync(srcFile, destFile);
        }
      }
    }
  };

  return {
    name: 'sync-root-images',
    buildStart() {
      copyRootImagesToPublic();
    },
    configureServer(server) {
      copyRootImagesToPublic();
      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0];
        if (/^\/(images|image|Images)\//i.test(url)) {
          const relPath = decodeURIComponent(url.replace(/^\/+/, ''));
          const rootCandidate = path.resolve(__dirname, relPath);
          const publicCandidate = path.resolve(__dirname, 'public', relPath);
          if (!fs.existsSync(rootCandidate) && !fs.existsSync(publicCandidate)) {
            res.statusCode = 404;
            res.end('Not found');
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [syncRootImagesPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
