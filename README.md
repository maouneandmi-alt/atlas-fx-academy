# ATLAS FX Academy

Landing page multilingue (FR / EN / AR avec support RTL) pour ATLAS FX Academy — plateforme éducative de trading forex et or (XAU/USD) pour le Maroc et l'Afrique francophone.

**Contenu exclusivement éducatif — aucun conseil en investissement.**

## Stack

- **Front** : React 18 + Vite, un seul composant (`src/App.jsx`), CSS intégré, responsive, RTL pour l'arabe.
- **Back** : fonction serverless Vercel (`api/coach.js`) qui sert de proxy sécurisé vers l'API Anthropic (modèle `claude-sonnet-4-6`). La clé API et le prompt système du coach (règles anti-conseil) restent côté serveur.

## Structure

```
atlas-fx-academy/
├── api/
│   └── coach.js        # Fonction serverless : proxy Anthropic + validation
├── src/
│   ├── App.jsx         # Landing page complète (i18n FR/EN/AR intégrée)
│   └── main.jsx        # Point d'entrée React
├── index.html
├── package.json
├── vite.config.js
├── .env.example        # Modèle de variables d'environnement
└── .gitignore
```

## Déploiement sur Vercel

### Option A — via GitHub (recommandé)

1. Créer un dépôt sur GitHub et pousser ce projet :
   ```bash
   git remote add origin https://github.com/VOTRE-COMPTE/atlas-fx-academy.git
   git push -u origin main
   ```
2. Sur [vercel.com](https://vercel.com) → **Add New… → Project** → importer le dépôt. Vercel détecte Vite automatiquement (build `npm run build`, output `dist`).
3. Dans **Settings → Environment Variables**, ajouter :
   - `ANTHROPIC_API_KEY` = votre clé (créée sur [console.anthropic.com](https://console.anthropic.com))
4. **Deploy**. Le chat du coach fonctionne dès que la variable est en place.

### Option B — via la CLI Vercel

```bash
npm i -g vercel
vercel login
vercel                 # premier déploiement (preview)
vercel env add ANTHROPIC_API_KEY
vercel --prod          # déploiement production
```

## Développement local

Le front seul :

```bash
npm install
npm run dev            # http://localhost:5173 (le chat renverra une erreur sans backend)
```

Front + fonction serverless (recommandé pour tester le chat) :

```bash
npm i -g vercel
cp .env.example .env   # puis renseigner ANTHROPIC_API_KEY
vercel dev             # sert le front ET /api/coach en local
```

## Personnalisation

- **Textes / traductions** : objet `T` en tête de `src/App.jsx` (clés `fr`, `en`, `ar`).
- **Tarifs** : `T.<langue>.pricing.plans`.
- **Comportement du coach** : `SYSTEM_PROMPT_BASE` dans `api/coach.js` (jamais côté client).
- **Couleurs** : variables CSS `--bg`, `--panel`, `--border`, `--gold`, `--green`, `--red` dans `src/App.jsx`.

## Points d'attention avant mise en production

- Ajouter une **limitation de débit** (rate limiting) sur `/api/coach` (ex. Vercel WAF, Upstash Ratelimit) pour maîtriser les coûts API.
- Le ticker affiche des **données de démonstration statiques** ; brancher un flux réel si nécessaire.
- Faire valider les mentions légales et l'avertissement sur les risques par un conseil juridique (réglementation AMMC au Maroc pour tout contenu lié aux marchés financiers).

---

© ATLAS TRADE CORP SARL A.U. — Casablanca, Maroc.
