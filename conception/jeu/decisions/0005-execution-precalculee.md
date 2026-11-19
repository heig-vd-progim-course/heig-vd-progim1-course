# 0005. Une exécution calculée, puis animée

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

**Statut** : proposée, 19 novembre 2026.

## Contexte

Une exécution doit pouvoir se suivre pas à pas, s'interrompre, et être testée
sans attendre d'animation.

## Décision

Le moteur calcule la **trace complète** d'une exécution, d'un coup : chaque
étape porte l'état de Théa et des cases. L'animateur rejoue ensuite cette trace.
Le pas à pas, la pause et la reprise ne sont que des façons de la rejouer.

## Options écartées

- **Exécuter en animant**, une carte à la fois : la logique dépendrait du temps,
  et chaque test devrait attendre l'animation.

## Conséquences

- Le moteur est une fonction pure : programme et rue en entrée, trace en sortie.
- La trace est bornée (100 cartes au plus) : la calculer en entier ne coûte
  rien.
- Revenir une étape en arrière deviendrait facile, si on le voulait.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
