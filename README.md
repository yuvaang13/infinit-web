# Infinit — Website

Premium marketing + download site for Infinit (K–8 STEM local AI tutor).

- **Stack**: Next.js 14, Tailwind CSS, Framer Motion
- **Theme**: Infinit palette (`#A682FF` `#715AFF` `#5887FF` `#55C1FF` `#102E4A`)
- **Download**: `public/downloads/Infinit-1.0.0.dmg` — served statically. Button uses `download` attribute for local save.

## Dev
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm start
```

## Deploy to Vercel
Push to `main` on `yuvaang13/infinit-web` — Vercel auto-deploys.

Static DMG located at `/downloads/Infinit-1.0.0.dmg` (currently 8 MB placeholder). Replace with your real `hdiutil` / `create-dmg` artifact before production.

To create a real DMG locally:
```bash
hdiutil create -volname Infinit -srcfolder ./dist/Infinit.app -ov -format UDZO public/downloads/Infinit-1.0.0.dmg
```

## Structure
```
app/page.tsx    → single-page premium site
app/globals.css → Tailwind + theme
public/downloads/Infinit-1.0.0.dmg
public/infinit-logo.png
```
