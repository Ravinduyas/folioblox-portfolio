/**
 * Copies the Vite build from dist/ up to the repo root, because GitHub Pages is
 * configured to serve this branch's root verbatim and cannot build anything.
 *
 * Copies every top-level entry of dist/ — the prerendered route folders
 * (news/, releases/ …), static/, sitemap.xml, llms.txt and so on — and refuses
 * to overwrite anything in PROTECTED, so source files at the root are safe.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

/** Root entries that are source, never build output. */
const PROTECTED = new Set([
  'app', 'scripts', 'public', 'docs', 'legacy', 'assets', 'source-photos', 'node_modules',
  'dist', 'package.json', 'package-lock.json', 'README.md', 'vite.config.ts', 'tsconfig.json',
  'metadata.json', '.git', '.github', '.gitignore', '.env.example',
]);

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

const MANAGED = fs.readdirSync(DIST);
const clash = MANAGED.filter((entry) => PROTECTED.has(entry));
if (clash.length) {
  console.error(`Build output would overwrite source at the root: ${clash.join(', ')}. Aborting.`);
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
