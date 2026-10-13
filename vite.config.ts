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
/**
 * Where the site is published. The live site is the root of
 * https://explorationrecordings.com (AWS S3 + CloudFront). Set SITE_URL to
 * build for somewhere else — the GitHub Pages workflow passes
 * https://ravinduyas.github.io/folioblox-portfolio/ — and every asset path,
 * the router basename, canonicals, sitemap and llms.txt follow it.
 */
const SITE_URL = (process.env.SITE_URL || 'https://explorationrecordings.com/').replace(/\/?$/, '/');
const SITE_BASE = new URL(SITE_URL).pathname; // "/" at a domain root, "/repo/" on Pages

/**
 * Pages has no server-side rewrite. scripts/prerender.mjs writes a real
 * index.html for every known route (so they return 200 with full content) and
 * a 404.html app shell, so any other path still boots the client router.
 */

export default defineConfig(({command, isPreview, isSsrBuild}) => {
  // The SSR build (entry-server.tsx) only feeds the prerender — kept apart from dist/.
  const outDir = path.resolve(__dirname, isSsrBuild ? 'dist-ssr' : 'dist');
  // The dev server always runs at the root; build and preview use SITE_BASE,
  // so `npm run preview` reproduces the deployed paths exactly.
  const isDevServer = command === 'serve' && !isPreview;

  return {
    // Root is app/ so that the built index.html can own the repo root.
    root: path.resolve(__dirname, 'app'),
    publicDir: path.resolve(__dirname, 'public'),
    base: isDevServer ? '/' : SITE_BASE,
    // seo.ts reads this for canonicals, social cards, sitemap and llms.txt.
    define: {
      'import.meta.env.VITE_SITE_URL': JSON.stringify(SITE_URL),
    },
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
