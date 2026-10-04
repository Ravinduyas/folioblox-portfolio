/**
 * Build-time prerender — the last step of `npm run build`.
 *
 * GitHub Pages serves static files only, so a client-rendered SPA reaches
 * crawlers as an empty <div id="root"> and every inner URL as a 404. This
 * renders each route in ROUTES (app/src/seo.ts) with the server build of the
 * app, bakes that page's title, meta, canonical, Open Graph and JSON-LD into
 * the head, and writes it to dist/<route>/index.html — so /news/ is a real
 * page with a 200 and full content.
 *
 * Also writes:
 *   404.html     app shell (noindex) so unknown paths still boot the router
 *   sitemap.xml  every prerendered route with lastmod
 *   llms.txt     plain-text brief of the label for AI assistants (llmstxt.org)
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SSR_DIR = path.join(ROOT, 'dist-ssr');

const entry = fs.readdirSync(SSR_DIR).find((file) => /^entry-server\.m?js$/.test(file));
if (!entry) {
  console.error('No server build in dist-ssr/ — run `vite build --ssr src/entry-server.tsx` first.');
  process.exit(1);
}
const {render, headHtml, ROUTES, sitemapXml, llmsTxt} = await import(pathToFileURL(path.join(SSR_DIR, entry)).href);

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const SEO_BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/;
const ROOT_DIV = '<div id="root"></div>';
if (!SEO_BLOCK.test(template) || !template.includes(ROOT_DIV)) {
  console.error('dist/index.html is missing the <!--seo--> block or the empty #root — check app/index.html.');
  process.exit(1);
}

const page = (head, body) =>
  template.replace(SEO_BLOCK, head).replace(ROOT_DIV, `<div id="root">${body}</div>`);

for (const route of ROUTES) {
  const html = page(headHtml(route), render(route));
  const file = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route, 'index.html');
  fs.mkdirSync(path.dirname(file), {recursive: true});
  fs.writeFileSync(file, html);
  console.log(`prerendered  ${route}`);
}

// Unknown paths: the empty shell, kept out of search. The client router takes over.
const notFoundHead = headHtml('/404').replace(
  /<meta name="robots"[^>]*>/,
  '<meta name="robots" content="noindex, follow" data-seo />',
);
fs.writeFileSync(path.join(DIST, '404.html'), page(notFoundHead, ''));

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemapXml());
fs.writeFileSync(path.join(DIST, 'llms.txt'), llmsTxt());
fs.rmSync(SSR_DIR, {recursive: true, force: true});

console.log(`\n${ROUTES.length} pages + 404.html, sitemap.xml, llms.txt written to dist/`);
