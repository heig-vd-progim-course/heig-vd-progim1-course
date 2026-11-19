# 0004. Des sauts plutôt que des cartes imbriquées

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

**Statut** : proposée, 19 novembre 2026.

## Contexte

Les boucles et les conditions pouvaient s'écrire avec des cartes qui en
contiennent d'autres, comme Scratch, ou avec des sauts numérotés, comme
l'assembleur. La maquette v2 a montré les sauts ; Vincent les a retenus.

## Décision

Le programme est une **liste plate**. Les conditions et les boucles sont des
**sauts** (`aller`, `si-maison`) qui désignent une carte par son identifiant.
Une flèche relie le saut à sa cible et la suit quand on la déplace, comme dans
_Human Resource Machine_.

## Options écartées

- **Cartes imbriquées** : un problème de Parsons à deux dimensions, plus dur à
  manipuler au doigt et à rendre accessible au clavier.

## Conséquences

- Le glisser-déposer reste celui d'une liste, comme les problèmes de Parsons du
  site.
- Le compteur de programme devient visible : c'est la machine notionnelle de du
  Boulay, et le langage des diagrammes d'activité de la séance 01.
- Une boucle infinie devient possible : le moteur s'arrête après 100 cartes.
- Java n'a pas de saut : la page de la séance fait le lien (« un saut en
  arrière, c'est un `while` »).

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
