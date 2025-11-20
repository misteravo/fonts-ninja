# Font Ninja

Une application Next.js moderne pour parcourir et explorer des familles de polices. Visualisez de magnifiques aperçus de polices avec des affichages d'alphabet et de pangrammes, découvrez des polices de diverses fonderies et explorez la typographie dans une interface élégante et conviviale.

## Fonctionnalités

- 🎨 **Galerie de polices** : Parcourez les familles de polices dans une mise en page en grille paginée
- 🔤 **Aperçus Alphabet et Pangramme** : Visualisez les polices avec des aperçus SVG d'alphabet et de pangramme
- 🏢 **Informations sur les fonderies** : Consultez les détails sur les fonderies de polices
- 💰 **Informations de prix** : Affichez les prix des polices lorsqu'ils sont disponibles
- 🌓 **Thème sombre/clair** : Basculez entre les modes sombre et clair
- 📱 **Design responsive** : Interface moderne construite avec Tailwind CSS
- ⚡ **Next.js 15** : Construit avec les dernières fonctionnalités de Next.js incluant App Router

## Stack technique

- **Framework** : [Next.js 15.5.6](https://nextjs.org/) avec App Router
- **Langage** : TypeScript
- **Styling** : Tailwind CSS 4
- **Icônes** : Lucide React
- **Optimisation des polices** : Optimisation des polices Next.js (Inter de Google Fonts)

## Lancement du projet

1. Installez les dépendances :
```bash
npm install
```

2. Lancez le serveur de développement :
```bash
npm run dev
```

3. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Structure du projet

```
font-ninja/
├── src/
│   ├── app/
│   │   ├── api/              # Routes API
│   │   │   ├── families/     # Endpoint des familles de polices
│   │   │   └── familyDetails/ # Endpoint des détails de police
│   │   ├── font/
│   │   │   └── [id]/         # Pages de détails de police dynamiques
│   │   ├── layout.tsx        # Layout racine avec fournisseur de thème
│   │   ├── page.tsx          # Page d'accueil avec galerie de polices
│   │   └── globals.css       # Styles globaux
│   ├── components/           # Composants React
│   │   ├── card.tsx
│   │   ├── link.tsx
│   │   ├── navigation.tsx
│   │   ├── svg-renderer.tsx
│   │   └── theme-button.tsx
│   ├── data/                 # Fichiers de données JSON
│   │   ├── fontDetails.json
│   │   ├── fontFamiliesPage1.json
│   │   ├── fontFamiliesPage2.json
│   │   └── fontFamiliesPage3.json
│   ├── providers/            # Fournisseurs de contexte
│   │   └── theme-provider.tsx
│   ├── types/                # Définitions de types TypeScript
│   │   └── font-family.ts
│   └── utils/                # Fonctions utilitaires
│       ├── classnames.ts
│       └── sanitize.ts
├── public/                   # Assets statiques
└── package.json
```

## Scripts disponibles

- `npm run dev` - Démarrer le serveur de développement avec Turbopack
- `npm run build` - Construire pour la production avec Turbopack
- `npm run start` - Démarrer le serveur de production
- `npm run lint` - Exécuter ESLint

## Fonctionnalités en détail

### Galerie de polices (Page d'accueil)

- Affiche les familles de polices dans une grille de 3 colonnes
- Navigation paginée (3 pages)
- Chaque carte affiche :
  - Aperçu SVG de l'alphabet
  - Nom de la famille de polices
  - Nom de la fonderie
  - Prix (si disponible)
  - Nombre de styles de police

### Page de détails de police

- Visualisez les aperçus SVG d'alphabet ou de pangramme
- Basculez entre les modes d'aperçu
- Affichez les informations détaillées de la police
- Affiche les détails de la fonderie

### Support des thèmes

- Basculement entre mode sombre et clair
- Préférence de thème persistante à l'aide de cookies
- Transitions de thème fluides

## Routes API

### `/api/families?page={pageNumber}`

Retourne les données des familles de polices paginées.

**Paramètres de requête :**
- `page` (optionnel) : Numéro de page (par défaut : 1)

**Réponse :**
```json
{
  "families": [...],
  "totalFamilies": number
}
```

### `/api/familyDetails`

Retourne des informations détaillées sur une famille de polices.

**Réponse :**
```json
{
  "idFont": number,
  "name": string,
  "foundry": {...},
  "images": {
    "alphabet": { "svg": string },
    "pangram": { "svg": string }
  },
  ...
}
```
