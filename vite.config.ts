import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

/**
 * GitHub Pages serves this repo's root verbatim — it does not build anything.
 * So the compiled index.html has to BE the repo root index.html, which is why
 * the whole source tree lives under app/ instead: the two would otherwise
 * collide. `npm run deploy` builds to dist/ and copies the result up.
 *
 * Assets go to static/ rather than assets/, to stay clear of the existing
 * (unbuilt) assets/ folder at the root.
 */
const REPO_BASE = '/folioblox-portfolio/';

/**
 * Pages has no server-side rewrite. scripts/prerender.mjs writes a real
 * index.html for every known route (so they return 200 with full content) and
 * a 404.html app shell, so any other path still boots the client router.
 */

export default defineConfig(({command, isPreview, isSsrBuild}) => {
  // The SSR build (entry-server.tsx) only feeds the prerender — kept apart from dist/.
  const outDir = path.resolve(__dirname, isSsrBuild ? 'dist-ssr' : 'dist');
  // Only the dev server runs at the root; build and preview both use the
  // deployed subpath, so `npm run preview` reproduces Pages exactly.
  const isDevServer = command === 'serve' && !isPreview;

  return {
    // Root is app/ so that the built index.html can own the repo root.
    root: path.resolve(__dirname, 'app'),
    publicDir: path.resolve(__dirname, 'public'),
    // Dev serves from /, the deployed copy lives under the repo subpath.
    base: isDevServer ? '/' : REPO_BASE,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      outDir,
      assetsDir: 'static',
      emptyOutDir: true,
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
