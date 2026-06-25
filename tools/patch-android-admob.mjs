/* Post-`cap add android` fixups (the android/ project is regenerable, so this
   re-applies them each time it's created):
   1. Inject the AdMob App ID into AndroidManifest.xml (REQUIRED or the app
      crashes on launch).
   2. Remove Capacitor's boilerplate sample tests, which assert the default
      package name and fail on our custom appId (confusing when run by mistake). */
import { readFileSync, writeFileSync, existsSync, rmSync } from 'fs';

const APP_ID = 'ca-app-pub-7841019476165936~3167681826';   // your AdMob App ID
const MANIFEST = 'android/app/src/main/AndroidManifest.xml';

// --- 2. delete the boilerplate example tests (always) ---
for (const f of [
  'android/app/src/androidTest/java/com/getcapacitor/myapp/ExampleInstrumentedTest.java',
  'android/app/src/test/java/com/getcapacitor/myapp/ExampleUnitTest.java',
]) {
  if (existsSync(f)) { rmSync(f); console.log('[admob] removed sample test', f); }
}

// --- 1. AdMob App ID in the manifest ---
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
xml = xml.replace(/(<application[^>]*>\s*\n)/, `$1${meta}`);   // insert after <application ...>
writeFileSync(MANIFEST, xml);
console.log('[admob] Added AdMob App ID to AndroidManifest.xml.');
