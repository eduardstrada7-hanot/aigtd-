/* Copies the web assets into ./www, which Capacitor bundles into the native apps.
   The game source stays in the project root so the dev preview keeps working. */
import { mkdirSync, copyFileSync, rmSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const OUT = 'www';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const files = ['index.html', 'manifest.webmanifest', 'sw.js'];
for (const f of files) copyFileSync(f, join(OUT, f));

// copy the icons folder
function copyDir(src, dst) {
  mkdirSync(dst, { recursive: true });
  for (const name of readdirSync(src)) {
    const s = join(src, name), d = join(dst, name);
    if (statSync(s).isDirectory()) copyDir(s, d);
    else copyFileSync(s, d);
  }
}
try { copyDir('icons', join(OUT, 'icons')); }
catch { console.warn('No icons/ yet — run `npm run icons` first.'); }

console.log('Built ->', OUT);
