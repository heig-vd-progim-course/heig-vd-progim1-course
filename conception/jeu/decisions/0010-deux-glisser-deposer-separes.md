# 0010. Deux glisser-déposer séparés

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

**Statut** : acceptée, 19 novembre 2026.

## Contexte

Le site a déjà un glisser-déposer : celui des problèmes de Parsons
(`docs/javascripts/parsons.js`), en JavaScript sans construction, en production
dans les séances. Le jeu en a besoin d'un aussi, avec en plus une zone « Mise de
côté », des cartes verrouillées par l'aide et les flèches des sauts.

## Décision

Garder **deux implémentations séparées** : `parsons.js` reste tel quel, et le
jeu a la sienne, en TypeScript, dans `cards-view.ts`.

## Options écartées

- **Un module commun**, que `parsons.js` adopterait ensuite : moins de code en
  double, mais une modification du jeu pourrait casser les problèmes de Parsons
  des séances, et `parsons.js` devrait passer par une étape de construction.

## Conséquences

- Le jeu évolue sans risque pour les pages des séances existantes.
- Une correction du glisser-déposer (au doigt, au clavier) est à faire aux deux
  endroits : chaque fichier le signale en commentaire.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
