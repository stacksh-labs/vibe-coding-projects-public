# Boulangerie Philippe Camon - Landing Page

Landing page responsive pour une boulangerie artisanale française, réalisée avec React, Vite et TailwindCSS.

## Aperçu

Le site présente :
- Un hero chaleureux avec slogan et call-to-action
- L'histoire de Philippe Camon et son four à bois traditionnel
- Les spécialités de la boulangerie (pain, viennoiseries, pâtisseries, salé)
- Le savoir-faire artisanal (levain naturel, cuisson au feu de bois, 100% maison)
- Une section contact avec carte Google Maps intégrée et lien itinéraire

## Stack technique

- React 18
- Vite 5
- TailwindCSS 3
- HTML / CSS / JavaScript (sans backend)

## Démarrage

```bash
npm install
npm run dev
```

Le site est ensuite accessible sur l'URL locale affichée par Vite.

## Build production

```bash
npm run build
npm run preview
```

## Déploiement statique

`vite.config.js` utilise `base: './'` pour faciliter le déploiement sur hébergement statique (sous-dossier ou ouverture locale du build).

## Structure

- `index.html` : point d'entrée HTML (racine Vite)
- `src/main.jsx` : bootstrap React
- `src/App.jsx` : sections de la landing page
- `src/index.css` : styles globaux, palette, animations fade-in
- `tailwind.config.js` : thème Tailwind personnalisé (couleurs, typographies)

## Notes qualité

- Design mobile-first
- Animations douces au scroll via `IntersectionObserver`
- Code structuré et prêt pour production
