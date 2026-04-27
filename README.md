# Portfolio v2 — Mohamed Mokhtar El Mazani

Portfolio académique BAC 3 Technologie de l'Informatique — EPHEC Louvain-la-Neuve.

## Stack

- **Next.js 16** (App Router, standalone output)
- **Tailwind CSS v4** (config via `@theme` dans `globals.css`)
- **TypeScript**

## Structure

```
src/
├── app/
│   ├── page.tsx               # Landing
│   ├── cv/page.tsx            # Curriculum Vitae
│   ├── projet-pro/page.tsx    # Projet professionnel
│   ├── portfolio/             # Portfolio d'activités (11 activités)
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── auto-evaluation/page.tsx
├── components/
│   ├── NavBar.tsx
│   └── Footer.tsx
└── data/
    └── activities.ts          # Source de vérité des 11 activités
public/
└── files/
    ├── cv-mohamed-elmazani.pdf
    └── proofs/                # Preuves par activité
```

## Développement

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Build production

```bash
npm run build
npm start
```

## Déploiement

Self-hosted sur homelab — Dockerfile + Caddy (reverse proxy).
