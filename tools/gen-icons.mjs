/* Rasterizes icon.svg into all the PNG sizes the PWA + app stores need.
   Requires sharp (a devDependency): `npm install` then `npm run icons`. */
import sharp from 'sharp';
import { mkdirSync } from 'fs';

mkdirSync('icons', { recursive: true });
const SRC = 'icon.svg';
const BG = '#0b0e16';

// Plain icons (full-bleed art) — used by the PWA, favicons and apple-touch.
const sizes = [1024, 512, 192, 180, 167, 152, 120, 96];
for (const s of sizes) {
  await sharp(SRC, { density: 512 }).resize(s, s).png().toFile(`icons/icon-${s}.png`);
}

// Maskable icon: art inset to ~80% on a solid square so OS masks don't clip it.
const M = 512, pad = Math.round(M * 0.1);
await sharp(SRC, { density: 512 })
  .resize(M - 2 * pad, M - 2 * pad)
  .extend({ top: pad, bottom: pad, left: pad, right: pad, background: BG })
  .png()
  .toFile('icons/icon-maskable-512.png');

// Source assets for `@capacitor/assets` (icon + splash) — lives in assets/.
mkdirSync('assets', { recursive: true });
await sharp(SRC, { density: 512 }).resize(1024, 1024).png().toFile('assets/icon-only.png');
await sharp(SRC, { density: 512 })
  .resize(820, 820)
  .extend({ top: 102, bottom: 102, left: 102, right: 102, background: BG })
  .png()
  .toFile('assets/icon-foreground.png');
await sharp({ create: { width: 1024, height: 1024, channels: 4, background: BG } })
  .png()
  .toFile('assets/icon-background.png');
// Splash: centered emblem on the brand background, 2732x2732 (covers all devices).
const splash = 2732, art = 900;
await sharp(SRC, { density: 512 })
  .resize(art, art)
  .extend({
    top: (splash - art) / 2, bottom: (splash - art) / 2,
    left: (splash - art) / 2, right: (splash - art) / 2,
    background: BG
  })
  .png()
  .toFile('assets/splash.png');
await sharp('assets/splash.png').toFile('assets/splash-dark.png');

console.log('Icons + store assets generated.');
