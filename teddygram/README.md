# Teddygram 🧸

> Le réseau social des peluches préférées — pour les enfants de 10 ans et plus !

Teddygram est une mini application web permettant aux enfants de partager des photos de leurs peluches préférées, d'écrire des anecdotes rigolotes à leur sujet, et de liker les peluches des autres.

## Fonctionnalités

- **Feed de posts** : toutes les peluches partagées s'affichent sous forme de cards colorées
- **Créer un post** : formulaire avec upload de photo, nom de la peluche, prénom et description
- **Liker** : bouton "J'adore ❤️" avec toggle (like/unlike), persisté en localStorage
- **Posts de démo** : 5 peluches pré-chargées au premier lancement
- **Persistance** : tous les posts et les likes sont sauvegardés en localStorage (pas de backend)
- **Responsive** : mobile-first, fonctionne sur téléphone et desktop
- **Accessibilité** : rôles ARIA, navigation clavier, fermeture modale avec Echap

## Stack technique

- **React 18** + **Vite**
- **TailwindCSS v3** (palette personnalisée, animations, typographie Nunito)
- **Google Fonts** (Nunito)
- Pas de router, pas de backend, pas d'authentification

## Lancer le projet

```bash
npm install
npm run dev
```

L'application est disponible sur `http://localhost:5173`.

## Structure du projet

```
src/
├── components/
│   ├── Header.jsx       # En-tête sticky avec titre et bouton
│   ├── PostCard.jsx     # Card d'un post (photo, infos, like)
│   └── PostForm.jsx     # Modal de création de post
├── hooks/
│   └── usePosts.js      # Gestion des posts et likes (localStorage)
├── App.jsx              # Composant principal (feed + modal)
├── index.css            # Tailwind + Google Fonts + classes utilitaires
└── main.jsx             # Point d'entrée React
tailwind.config.js       # Thème personnalisé (couleurs, animations...)
postcss.config.js        # Configuration PostCSS
```

## Design

- Palette joyeuse : roses, violets, oranges pastels
- Police ronde : Nunito (Google Fonts)
- Cards avec coins arrondis, ombres et effets hover
- Animations : float, wiggle, pop
- Émojis intégrés partout pour le fun
