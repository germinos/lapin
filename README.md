# La Garenne — Gestion d'élevage cunicole

Application React (Vite) avec un petit serveur Express qui relaie les
appels de l'assistant IA vers l'API Anthropic.

## En local

```bash
npm install
cp .env.example .env        # puis renseignez votre ANTHROPIC_API_KEY
npm run build
npm start                   # sert l'app sur http://localhost:3000
```

Pour développer avec rechargement à chaud, dans deux terminaux :

```bash
npm start        # terminal 1 : serveur API sur le port 3000
npm run dev       # terminal 2 : Vite sur le port 5173, proxifie /api vers 3000
```

## Déploiement (Railway / tout hébergeur Node)

1. Poussez ce dossier tel quel (avec `package.json` à la racine).
2. Railpack détecte Node automatiquement grâce à `package.json` et exécute
   `npm run build` puis `npm start`.
3. Dans les variables d'environnement du service, ajoutez :
   - `ANTHROPIC_API_KEY` — votre clé API Anthropic (obligatoire pour
     l'assistant IA ; le reste de l'application fonctionne sans elle).
4. Le serveur écoute sur `process.env.PORT` (fourni automatiquement par
   la plupart des hébergeurs).

## Structure

```
├── index.html          # point d'entrée HTML
├── src/
│   ├── main.jsx         # monte l'app React
│   └── App.jsx          # l'application (cheptel, reproduction, IA, etc.)
├── server.js            # sert le build + proxy /api/claude
├── vite.config.js
└── package.json
```
