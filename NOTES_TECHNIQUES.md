# Notes techniques - Font Ninja

## Architecture

**Next.js 15 + App Router** : SSR/SSG pour la performance, API Routes intégrées, optimisations automatiques.

**TypeScript** : Typage strict pour la sécurité, meilleure DX, maintenabilité.

## Styling

**Tailwind CSS 4** : Classes utilitaires, purge automatique, configuration inline via `@theme`.

**Variables CSS** : Thèmes clair/sombre via variables CSS.

## Thèmes

**Cookies + Context API** : Persistance de la préférence utilisateur, gestion simple avec React Context.

## Sécurité

**DOMPurify (isomorphic)** : Sanitization des SVG dynamiques pour prévenir les attaques XSS, compatible SSR.

## Structure

**Organisation par type** : Components, utils, types séparés pour la clarté et la scalabilité.

**Path aliases (@/*)** : Imports simplifiés et maintenables.

## Performance

**Turbopack** : Builds et rechargements rapides, successeur moderne de Webpack.

**next/font** : Optimisation automatique des polices, amélioration des Core Web Vitals.

## API & Données

**API Routes Next.js** : Endpoints intégrés, même stack, déploiement simplifié.

**JSON statiques** : Données versionnées avec le code, migration vers DB facilitée si nécessaire.

## Composants

**Server Components par défaut** : Moins de JS côté client, meilleur SEO, Client Components uniquement si nécessaire.

**Composants réutilisables** : DRY, cohérence UI, maintenabilité.

## Outils

**ESLint + TypeScript strict** : Qualité de code, détection d'erreurs, meilleures pratiques.
