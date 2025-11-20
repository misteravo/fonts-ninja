# Notes techniques - Font Ninja

Ce document explique les choix techniques effectués lors du développement de Font Ninja.

## Architecture et Framework

### Next.js 15 avec App Router

**Choix** : Utilisation de Next.js 15.5.6 avec l'App Router (architecture basée sur les dossiers).

**Justification** :
- **Performance** : Next.js offre un rendu côté serveur (SSR) et une génération statique (SSG) optimale pour améliorer les temps de chargement
- **App Router** : Architecture moderne qui permet une meilleure organisation du code avec les layouts, les routes dynamiques et les métadonnées intégrées
- **API Routes intégrées** : Simplifie la création d'endpoints API sans configuration supplémentaire
- **Optimisation automatique** : Optimisation des images, des polices et du code JavaScript automatiquement gérée

### TypeScript

**Choix** : Utilisation de TypeScript pour tout le projet.

**Justification** :
- **Sécurité des types** : Réduction des erreurs à l'exécution grâce au typage statique
- **Meilleure expérience développeur** : Autocomplétion et détection d'erreurs en temps réel dans l'IDE
- **Maintenabilité** : Code plus facile à maintenir et à comprendre grâce aux types explicites
- **Refactoring sécurisé** : Modifications du code facilitées avec la garantie de cohérence des types

## Styling

### Tailwind CSS 4

**Choix** : Utilisation de Tailwind CSS 4 avec configuration inline via `@theme`.

**Justification** :
- **Productivité** : Développement rapide avec des classes utilitaires prêtes à l'emploi
- **Cohérence** : Système de design unifié avec des variables CSS personnalisées
- **Performance** : Purge automatique des styles non utilisés en production
- **Thèmes** : Gestion simplifiée des thèmes clair/sombre via les variables CSS
- **Configuration inline** : Nouvelle fonctionnalité de Tailwind 4 permettant une configuration plus flexible

### Variables CSS personnalisées

**Choix** : Utilisation de variables CSS pour les couleurs et les thèmes.

**Justification** :
- **Thèmes dynamiques** : Basculement entre thème clair et sombre via une simple classe `dark` sur l'élément racine
- **Maintenabilité** : Centralisation des couleurs dans un seul fichier (`globals.css`)
- **Accessibilité** : Respect des préférences système de l'utilisateur (dark mode)
- **Performance** : Pas de JavaScript nécessaire pour le changement de thème (uniquement CSS)

## Gestion des thèmes

### Cookies pour la persistance

**Choix** : Utilisation de `js-cookie` pour sauvegarder la préférence de thème.

**Justification** :
- **Persistance** : La préférence de l'utilisateur est conservée entre les sessions
- **Simplicité** : Solution légère et facile à implémenter
- **Compatibilité** : Fonctionne côté serveur et client grâce à `isomorphic-dompurify`

### Context API React

**Choix** : Utilisation de Context API pour gérer l'état du thème.

**Justification** :
- **Simplicité** : Pas besoin d'une bibliothèque externe pour un état global simple
- **Intégration native** : Solution React native, pas de dépendance supplémentaire
- **Performance** : Le thème change rarement, donc pas besoin d'un système d'état complexe

## Sécurité

### DOMPurify (isomorphic-dompurify)

**Choix** : Utilisation de `isomorphic-dompurify` pour sanitizer les SVG.

**Justification** :
- **Sécurité XSS** : Protection contre les attaques XSS lors du rendu de SVG dynamiques
- **Isomorphique** : Fonctionne côté serveur et client (nécessaire pour Next.js SSR)
- **Performance** : Sanitization rapide et efficace
- **Nécessité** : Les SVG proviennent de données externes et sont injectés via `dangerouslySetInnerHTML`

## Structure du projet

### Organisation par fonctionnalité

**Choix** : Structure organisée par type de fichier (components, utils, types, etc.).

**Justification** :
- **Clarté** : Facile de trouver où se trouve chaque type de fichier
- **Scalabilité** : Structure qui s'adapte bien à la croissance du projet
- **Conventions** : Suit les conventions Next.js et React standard

### Path aliases (@/*)

**Choix** : Utilisation de l'alias `@/*` pour les imports.

**Justification** :
- **Lisibilité** : Imports plus clairs (`@/components/card` au lieu de `../../components/card`)
- **Maintenabilité** : Refactoring facilité lors du déplacement de fichiers
- **Cohérence** : Standard dans les projets Next.js modernes

## Performance

### Turbopack

**Choix** : Utilisation de Turbopack pour le développement et la production.

**Justification** :
- **Vitesse** : Builds et rechargements beaucoup plus rapides que Webpack
- **Futur** : Technologie moderne développée par Vercel, successeur de Webpack
- **Optimisation** : Meilleure optimisation des bundles en production

### Optimisation des polices

**Choix** : Utilisation de `next/font` pour optimiser les polices.

**Justification** :
- **Performance** : Polices optimisées et préchargées automatiquement
- **Core Web Vitals** : Amélioration des métriques de performance (CLS, LCP)
- **Simplicité** : Configuration minimale requise

## API et données

### API Routes Next.js

**Choix** : Utilisation des API Routes de Next.js pour servir les données JSON.

**Justification** :
- **Simplicité** : Pas besoin d'un serveur backend séparé
- **Cohérence** : Même stack technique pour le frontend et l'API
- **Déploiement** : Déploiement simplifié (tout dans un seul projet)
- **Type safety** : Types TypeScript partagés entre frontend et API

### Données JSON statiques

**Choix** : Stockage des données de polices dans des fichiers JSON statiques.

**Justification** :
- **Simplicité** : Pas besoin d'une base de données pour un MVP
- **Performance** : Chargement rapide des données depuis le système de fichiers
- **Versioning** : Les données sont versionnées avec le code
- **Évolutivité** : Facile de migrer vers une base de données plus tard si nécessaire

## Composants

### Composants réutilisables

**Choix** : Création de composants réutilisables (Card, Link, Navigation, etc.).

**Justification** :
- **DRY** : Évite la duplication de code
- **Maintenabilité** : Modifications centralisées
- **Cohérence** : Interface utilisateur cohérente dans toute l'application
- **Testabilité** : Composants isolés plus faciles à tester

### Server Components par défaut

**Choix** : Utilisation de Server Components Next.js par défaut.

**Justification** :
- **Performance** : Moins de JavaScript envoyé au client
- **SEO** : Contenu rendu côté serveur, meilleur pour le référencement
- **Simplicité** : Pas besoin de gestion d'état complexe pour l'affichage de données
- **Client Components** : Utilisés uniquement quand nécessaire (thème, interactions)

## Outils de développement

### ESLint

**Choix** : Configuration ESLint avec `eslint-config-next`.

**Justification** :
- **Qualité de code** : Détection automatique des erreurs et mauvaises pratiques
- **Cohérence** : Règles standardisées pour tout le projet
- **Intégration** : Configuration optimisée pour Next.js

### Configuration TypeScript stricte

**Choix** : Activation du mode strict de TypeScript.

**Justification** :
- **Sécurité** : Détection plus stricte des erreurs potentielles
- **Qualité** : Code plus robuste et prévisible
- **Meilleures pratiques** : Encourage l'écriture de code TypeScript de qualité
