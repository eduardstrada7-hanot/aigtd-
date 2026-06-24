/* Injects the AdMob App ID into the generated Android manifest.
   AdMob REQUIRES this meta-data or the app crashes on launch.
   Runs automatically after `npm run add:android` (the android/ project is
   regenerable, so this re-applies the edit each time it's created). */
import { readFileSync, writeFileSync, existsSync } from 'fs';

const APP_ID = 'ca-app-pub-7841019476165936~3167681826';   // your AdMob App ID
const MANIFEST = 'android/app/src/main/AndroidManifest.xml';

if (!existsSync(MANIFEST)) {
  console.warn('[admob] No Android project yet — run `npm run add:android` first.');
  process.exit(0);
}

let xml = readFileSync(MANIFEST, 'utf8');

if (xml.includes('com.google.android.gms.ads.APPLICATION_ID')) {
  console.log('[admob] AdMob App ID already present in AndroidManifest.xml.');
  process.exit(0);
}

const meta = `        <meta-data\n            android:name="com.google.android.gms.ads.APPLICATION_ID"\n            android:value="${APP_ID}" />\n`;

// insert right after the opening <application ...> tag
xml = xml.replace(/(<application[^>]*>\s*\n)/, `$1${meta}`);
writeFileSync(MANIFEST, xml);
console.log('[admob] Added AdMob App ID to AndroidManifest.xml.');
