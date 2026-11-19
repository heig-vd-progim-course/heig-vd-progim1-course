# CodeMirror pour les blocs de code exécutable

Cette recette construit `docs/vendor/codemirror/codemirror.js`, l'éditeur des
blocs `java-run` (voir `docs/javascripts/java-runner.js`).

## Pourquoi un fichier construit et versionné

CodeMirror 6 est découpé en paquets qui dépendent tous de `@codemirror/state`.
Chargés séparément depuis un CDN, deux paquets peuvent tirer deux versions de
`@codemirror/state`, et l'éditeur casse. Un seul fichier, construit ici avec des
versions figées, n'a qu'une copie de chaque paquet, ne dépend d'aucun CDN et ne
change que si l'on reconstruit.

## Reconstruire

Il faut Node.js et npm.

```sh
cd outils/codemirror
npm ci
npm run build
```

`npm ci` installe exactement les versions de `package-lock.json`. Pour mettre à
jour CodeMirror, changer les versions dans `package.json`, lancer `npm install`
puis `npm run build`, et tester la page
`docs/99-ressources/essai-java-executable.md`.

Pour ajouter une fonctionnalité de CodeMirror à l'éditeur, l'exporter dans
`entry.js`, reconstruire, puis l'utiliser dans `enhanceEditor` de
`java-runner.js`.
