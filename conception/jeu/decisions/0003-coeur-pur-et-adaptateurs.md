# 0003. Un cœur pur, des adaptateurs autour

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

**Statut** : proposée, 19 novembre 2026.

## Contexte

Les règles du jeu doivent être lisibles et testées sans navigateur (US-30), et
survivre aux changements de rendu, de stockage ou de page.

## Décision

Séparer trois couches, avec une règle de dépendance vers le bas :

- **domaine** : rue, cartes, moteur, validation, sans DOM ni canevas ;
- **application** : la session de jeu (états, essais, aide, étoiles) et
  l'animateur ;
- **adaptateurs** : lecture des niveaux, canevas, DOM des cartes, stockage,
  sons.

## Options écartées

- **Tout dans la vue**, comme les maquettes : rapide, mais impossible à tester
  et à faire évoluer.
- **Un moteur de jeu** (Phaser, PixiJS) : il impose sa propre architecture, et
  pèse plus lourd que tout le jeu.

## Conséquences

- Le domaine se teste avec Vitest, en millisecondes.
- Les vues sont remplaçables : un rendu différent ne touche pas aux règles.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
