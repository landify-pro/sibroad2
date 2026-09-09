import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../dist/', import.meta.url);
const html = await readFile(new URL('index.html', root), 'utf8');
const required = [
  'assets/styles.css',
  'assets/script.js',
  'assets/favicon.svg',
  'assets/hero-desktop.webp',
  'assets/hero-mobile.webp',
  'assets/about-desktop.webp',
  'assets/about-mobile.webp'
];

for (const file of required) await access(join(root.pathname, file));

for (const id of ['top', 'company', 'services', 'advantages', 'process', 'contacts']) {
  if (!html.includes(`id="${id}"`)) throw new Error(`Missing section #${id}`);
}

if (/src="https?:|href="https?:/.test(html)) throw new Error('Unexpected remote asset dependency');
console.log(`Validated ${required.length} assets and 6 navigation targets.`);
