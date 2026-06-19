# ⚔ Bastion — Tower Defense

A fast, polished, fully self-contained HTML5 tower-defense game. One file, no
build step to play — and a complete pipeline to ship it to the **App Store** and
**Google Play** as a native app.

## Play it now

Just open `index.html` in any modern browser. No install, no server, works
offline. On phones it's an installable PWA (Add to Home Screen).

## Features

- **6 maps** (Riverbend, Serpent Pass, Spiral Keep, Ashfall, Frostbite, Dunes) × **3 difficulties**
- **8 towers** — Gunner, Cannon, Frost, Tesla, Sniper, Beacon, plus research-unlocked **Venom** & **Mint**
- **9 enemy archetypes** — grunts, runners, armored tanks, flyers, healers, splitters, shielded wardens, mites, and boss Warlords
- **5 enemy factions** — Classic, Zombies, Birds, Tanks, Soldiers (hand-drawn vector creatures)
- **40 waves + endless mode**, with an economy featuring interest and early-call bonuses
- **Research tech-tree** (permanent meta-progression), **12 achievements**, and a **level editor** with shareable custom maps
- Targeting priorities, 1×/2×/5×/10× speed, synthesized audio, particles & screen shake
- Mouse **and** touch controls; responsive from phone to desktop

## Controls

`1`–`8` build towers · `Space` pause · `F` speed · `N` call wave early ·
`U` upgrade · `X` sell · `Esc` cancel · click a tower to inspect/upgrade/sell.

## Project layout

```
index.html              the entire game (HTML + CSS + JS)
icon.svg                master app icon (edit this, then `npm run icons`)
manifest.webmanifest    PWA manifest
sw.js                   offline service worker
icons/                  generated PNG app icons
assets/                 generated icon/splash sources for @capacitor/assets
capacitor.config.json   native app config
tools/                  build + icon-generation scripts
www/                    build output bundled into the native apps
```

## Develop / build

```bash
npm install         # one-time: installs sharp + Capacitor tooling
npm run icons       # regenerate icons from icon.svg
npm run build       # copy web assets into www/
npm run serve       # serve www/ at http://localhost:4321
```

## Ship to the stores

See **[STORE_SUBMISSION.md](STORE_SUBMISSION.md)** for the full, step-by-step
guide (accounts, signing, build commands, listing assets, and a checklist).
Privacy policy: **[PRIVACY_POLICY.md](PRIVACY_POLICY.md)** (Bastion collects no
data).

## Store description (draft)

> **Bastion — Tower Defense.** Hold the line. Build and upgrade 8 distinct towers
> to stop the horde across 6 hand-crafted maps and 40 relentless waves — then test
> your nerve in endless mode. Chain lightning through packs, freeze crowds, snipe
> armored tanks, poison bosses, and mint gold to fund your defense. Unlock
> permanent upgrades in the research tree, earn achievements, switch between 5
> enemy factions, and design your own maps in the built-in level editor. No ads,
> no in-app purchases, no internet required — just pure tower-defense strategy.
