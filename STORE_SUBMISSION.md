# Shipping Bastion to the App Store & Google Play

Bastion is a single self-contained web game wrapped as a native app with
[Capacitor](https://capacitorjs.com/). This guide takes you from the source in
this folder to a published listing on both stores.

> **What's already done for you (in this repo):** the game, a PWA manifest +
> offline service worker, the Capacitor config (`capacitor.config.json`), the
> build pipeline (`npm run build` → `www/`), and all app icons + splash assets
> (`npm run icons`). You provide accounts, signing, screenshots, and the listing.

---

## 0. Prerequisites (the parts only you can do)

| Need | Google Play | App Store |
|---|---|---|
| Developer account | [Google Play Console](https://play.google.com/console) — **$25 one-time** | [Apple Developer Program](https://developer.apple.com/programs/) — **$99/year** |
| Build machine | Windows / macOS / Linux + **Android Studio** | **macOS + Xcode** (required — see note) |
| Node.js | v18+ | v18+ |

> **iOS needs a Mac.** Xcode only runs on macOS. If you're on Windows and don't
> have a Mac, use a cloud Mac (e.g. **MacinCloud**, **Codemagic**, or GitHub
> Actions `macos` runners) — or ship Android first. Capacitor + Codemagic can
> build and upload the iOS app entirely in the cloud.

Install the toolchain once:

```bash
cd tower-defense
npm install
npm run icons      # already generated, but safe to re-run after editing icon.svg
npm run build      # produces www/
```

---

## 1. One-time native project setup

```bash
# Android
npm run add:android       # build + npx cap add android + sync

# iOS (on a Mac)
npm run add:ios           # build + npx cap add ios + sync
```

Generate platform icons & splash screens from the source art in `assets/`:

```bash
npm run assets            # @capacitor/assets fills every iOS/Android density
```

After **any** change to the game, re-sync the web build into the native shells:

```bash
npm run sync              # npm run build + npx cap sync
```

---

## 2. Google Play — build & submit

1. **Open the project:** `npm run open:android` (launches Android Studio).
2. **Set the version** in `android/app/build.gradle` (`versionCode` must
   increase every upload; `versionName` is the human version, e.g. `1.0.0`).
3. **Create a signing key** (one time — keep it safe forever; losing it means you
   can't update the app):
   ```bash
   keytool -genkey -v -keystore bastion-release.keystore -alias bastion -keyalg RSA -keysize 2048 -validity 10000
   ```
   Wire it into `android/app/build.gradle` (or use Play App Signing, recommended).
4. **Build the release bundle:** in Android Studio → *Build → Generate Signed
   Bundle / APK → Android App Bundle (.aab)*. Or CLI:
   ```bash
   cd android && ./gradlew bundleRelease
   ```
   Output: `android/app/build/outputs/bundle/release/app-release.aab`.
5. **Play Console → Create app →** upload the `.aab` to *Internal testing* first,
   then promote to *Production*. Fill in the listing (see §4) and submit.

> **No Android Studio?** You can instead package the PWA as a Trusted Web
> Activity with [PWABuilder](https://www.pwabuilder.com/) — point it at your
> hosted `www/` URL and it produces a signed `.aab`. Capacitor is recommended for
> a true native build, but PWABuilder is a fast path.

---

## 3. App Store — build & submit (macOS)

1. **Open the project:** `npm run open:ios` (launches Xcode).
2. In Xcode, select the **App** target → *Signing & Capabilities* → set your
   **Team** and a unique **Bundle Identifier** (must match `appId` =
   `com.bastion.towerdefense`, or change both to your own reverse-domain id).
3. Set **version** and **build number** (build number increases every upload).
4. **App Store Connect → My Apps → +** → create the app record with the same
   bundle id.
5. In Xcode: *Product → Archive*, then *Distribute App → App Store Connect →
   Upload*.
6. Back in App Store Connect, attach the build, complete the listing (§4), answer
   the **App Privacy** questions (Bastion collects **no data** — see
   `PRIVACY_POLICY.md`), and **Submit for Review**.

---

## 4. Store listing assets you'll need

| Item | Google Play | App Store |
|---|---|---|
| App name | Bastion — Tower Defense | Bastion — Tower Defense |
| Short description | ≤ 80 chars | subtitle ≤ 30 chars |
| Full description | ≤ 4000 chars (draft in `README.md`) | ≤ 4000 chars |
| App icon | 512×512 PNG (`icons/icon-512.png`) | 1024×1024 PNG (`icons/icon-1024.png`) |
| Feature graphic | 1024×500 PNG | — |
| Screenshots | 2–8, phone + 7"/10" tablet | 6.7", 6.5", 5.5", iPad 12.9" |
| Privacy policy URL | **required** (host `PRIVACY_POLICY.md`) | **required** |
| Content rating | IARC questionnaire (Bastion = Everyone) | Age rating questionnaire (4+) |
| Category | Games → Strategy | Games → Strategy |

**Screenshots:** run the game full-screen in a phone-sized browser (or the
emulator/simulator) and capture the menu, mid-battle, the research tree, and the
level editor. A few framed marketing shots go a long way.

---

## 5. Pre-flight checklist

- [ ] `npm run build` succeeds and `www/index.html` plays offline.
- [ ] `appId` / Bundle Id is **yours** (change `com.bastion.towerdefense` if needed, in `capacitor.config.json` **before** adding platforms).
- [ ] Version + build numbers bumped.
- [ ] Icons & splash regenerated (`npm run assets`).
- [ ] Privacy policy hosted at a public URL.
- [ ] Screenshots captured for every required size.
- [ ] Signed release built (`.aab` / Xcode archive).
- [ ] Tested on a real device (`npx cap run android` / `npx cap run ios`).

---

## 6. Updating the app later

```bash
# 1. edit index.html (the game)
# 2. bump CACHE in sw.js  (e.g. bastion-v1 -> bastion-v2) so PWA users update
# 3. bump version/build numbers in the native projects
npm run sync
# 4. rebuild the signed bundle and upload a new release
```

That's it — the web game is the single source of truth; everything else is a thin
native shell around it.
