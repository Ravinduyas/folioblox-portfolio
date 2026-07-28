import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

// Served from https://ravinduyas.github.io/folioblox-portfolio/ on GitHub Pages,
// but from / during local dev and preview.
const BASE = process.env.GITHUB_PAGES === 'true' ? '/folioblox-portfolio/' : '/';

/**
 * GitHub Pages has no server-side rewrite, so a hard load of /music would 404.
 * Pages serves 404.html for any unmatched path, so shipping a copy of index.html
 * under that name lets the client router pick the request up instead.
 */
function spaFallback(): Plugin {
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    closeBundle() {
      const dist = path.resolve(__dirname, 'dist');
      const index = path.join(dist, 'index.html');
      if (fs.existsSync(index)) {
        fs.copyFileSync(index, path.join(dist, '404.html'));
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: BASE,
    plugins: [react(), tailwindcss(), spaFallback()],
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
