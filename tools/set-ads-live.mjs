/* Flips AdMob from TEST ads to LIVE ads — in the built www/ only, never the source.
   Run via `npm run sync:release` when building the release .aab you upload to the store.
   Day-to-day `npm run sync` keeps test ads (safe). */
import { readFileSync, writeFileSync } from 'fs';

const FILE = 'www/index.html';
let html = readFileSync(FILE, 'utf8');

const from = 'test: true, /* ADMOB_TEST_FLAG */';
const to   = 'test: false, /* ADMOB_TEST_FLAG */';

if (html.includes(to)) {
  console.log('[ads] Already set to LIVE ads.');
} else if (html.includes(from)) {
  html = html.replace(from, to);
  writeFileSync(FILE, html);
  console.log('[ads] ⚡ LIVE ADS ENABLED for this release build (www/index.html).');
} else {
  console.error('[ads] ⚠️ Could not find the ADMOB_TEST_FLAG marker — check index.html.');
  process.exit(1);
}
