/**
 * Copies the Vite build from dist/ up to the repo root, because GitHub Pages is
 * configured to serve this branch's root verbatim and cannot build anything.
 *
 * Only ever touches the four published paths listed in MANAGED — everything
 * else at the root (src/, app/, package.json, README…) is left alone.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

/** The published surface. Anything here is build output and safe to replace. */
const MANAGED = ['index.html', '404.html', 'static', '.nojekyll'];

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('No build found in dist/ — run `npm run build` first.');
  process.exit(1);
}

// Refuse to run if the root index.html is still the source entry, which would
// mean the app/ move never happened and we'd be clobbering a real file.
const rootIndex = path.join(ROOT, 'index.html');
if (fs.existsSync(rootIndex) && fs.readFileSync(rootIndex, 'utf8').includes('src/main.tsx')) {
  console.error('Root index.html looks like the source entry, not build output. Aborting.');
  process.exit(1);
}

for (const entry of MANAGED) {
  const from = path.join(DIST, entry);
  const to = path.join(ROOT, entry);
  fs.rmSync(to, {recursive: true, force: true});
  if (fs.existsSync(from)) {
    fs.cpSync(from, to, {recursive: true});
    console.log(`published  ${entry}`);
  }
}

console.log('\nBuild copied to repo root. Commit and push to deploy.');
