# 0002. TypeScript, esbuild et un fichier figé

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

**Statut** : acceptée, 19 novembre 2026.

## Contexte

Le site est statique, publié par un workflow sans Node. La recette de CodeMirror
(`outils/codemirror/`) a montré un modèle : des sources hors de `docs/`, un
fichier construit et versionné.

## Décision

Écrire le jeu en **TypeScript strict**, le construire avec **esbuild** en un
seul fichier, `docs/javascripts/thealivery.js`, versionné. Les sources, les
tests et la recette vivent dans `outils/thealivery/`, avec des versions figées
et un `package-lock.json`.

## Options écartées

- **JavaScript sans construction**, comme `parsons.js` : pas de vérification des
  types, et le code du jeu sera dix fois plus gros.
- **Un framework** (React, Vue, Svelte) : du poids et une dépendance de plus,
  pour une interface simple.
- **Construire dans le workflow** : il faudrait Node dans le workflow, et le
  site ne se construirait plus sans lui.

## Conséquences

- Il faut Node pour modifier le jeu, pas pour publier le site.
- Le fichier construit peut être oublié après une modification : `npm run check`
  le vérifie.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
