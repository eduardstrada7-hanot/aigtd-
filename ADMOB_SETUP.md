# AdMob — rewarded ads setup

Your rewarded ads (Revive / Double-gold / Daily ×2) are wired to **Google AdMob**.
This is the checklist to build, test, and go live.

> **Ads only run in the real phone app**, not the web/Vercel version. On the web
> build you'll see the labelled "demo ad" instead.

## ✅ Already done in this repo
- `@capacitor-community/admob` plugin installed.
- AdMob bridge in `index.html` (the `window.BastionNativeAds.showRewarded` glue).
- Your IDs are set in that bridge:
  - App ID: `ca-app-pub-7841019476165936~3167681826`
  - Rewarded unit: `ca-app-pub-7841019476165936/3607499674`
- `npm run add:android` automatically injects the App ID into `AndroidManifest.xml`
  (via `tools/patch-android-admob.mjs`) — AdMob crashes on launch without it.
- Privacy policy updated to disclose AdMob (`PRIVACY_POLICY.md` + the hosted `/privacy` page).
- **Test mode is ON** (`ADMOB.test = true` in `index.html`) so you see Google's
  safe test ads while developing. **Never tap your own real ads** — that gets the
  account banned, which is why test mode exists.

## 1. Build & test on Android (needs Android Studio)
```bash
cd tower-defense
npm install
npm run add:android      # builds web, creates android/, syncs, patches the manifest
npm run open:android     # opens Android Studio
```
In Android Studio: pick a device/emulator and press ▶ Run. Start a game, lose, and
tap **Revive** — a **test** rewarded ad should play, then you keep playing. 🎉

If you edit the game later, just run `npm run sync` and re-run.

## 2. Go live (when you publish)
1. In `index.html`, change `ADMOB.test` from `true` to **`false`** (this switches to
   your real rewarded unit and real ads).
2. `npm run sync`, rebuild the signed release `.aab`, and upload it.
3. In **Play Console → App content → Data safety**, declare data collection
   (because of AdMob): *Device or other IDs* = collected/shared, plus *App activity*
   and *approximate location* per AdMob's guidance. Mark it used for "Advertising or
   marketing." (Google provides AdMob's exact disclosure list in the AdMob help.)
4. In **AdMob → your app → App settings**, link the app to its Play Store listing
   once it's published, and complete **app-ads.txt** if prompted. Real ads only fully
   serve after the app is on the store and linked.

## 3. iOS (later, needs a Mac)
After `npm run add:ios`, add these to `ios/App/App/Info.plist`:
```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-7841019476165936~XXXXXXXXXX</string>  <!-- your iOS App ID from AdMob -->
<key>NSUserTrackingUsageDescription</key>
<string>This identifier will be used to deliver personalized ads to you.</string>
```
Create a **separate iOS app + rewarded unit** in AdMob (IDs differ per platform),
put the iOS rewarded unit in the bridge, and add the SKAdNetwork identifiers from
Google's AdMob iOS guide.

## Troubleshooting
- **App crashes on launch** → the App ID isn't in `AndroidManifest.xml`. Run
  `npm run patch:admob` (or re-run `npm run add:android`).
- **No ad shows** → check Logcat; in test mode a test ad should always be available
  after a few seconds. Make sure the device has internet.
- **"Reward not granted"** → the user closed the ad early; that's expected (no reward).
