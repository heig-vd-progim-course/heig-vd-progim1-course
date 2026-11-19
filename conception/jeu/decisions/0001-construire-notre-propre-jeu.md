# 0001. Construire notre propre jeu

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

**Statut** : proposée, 19 novembre 2026.

## Contexte

Des jeux de robot sur grille existent depuis 1981 (Karel). L'état de l'art en
retient quatre familles : Karel et Reeborg's World, Blockly Games, Rapid Router,
Lightbot et Brilliant.

## Décision

Construire Thealivery, plutôt qu'adapter un jeu existant.

## Options écartées

- **Rapid Router** : le plus proche de l'intention, mais une application Django
  sous AGPL, en Python, inutilisable dans un site statique.
- **Blockly Games** : sous Apache 2.0, mais en blocs à composer librement, pas
  en cartes à remettre en ordre, et sans intégration aux pages du cours.
- **Lightbot, Brilliant, Code.org** : commerciaux ou hébergés, fermés.

## Conséquences

- Aucun existant ne combine Parsons en icônes, pages Zensical, niveaux en
  Markdown et progression de ProgIM1 : c'est ce que le jeu apporte.
- Le coût de maintenance est à nous : d'où un code testé et ces ADR.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
