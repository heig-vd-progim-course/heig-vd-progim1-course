# Conception du jeu d'apprentissage

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

Ce dossier rassemble la conception de **Thealivery**, un jeu intégré aux pages
du cours : Théa, moine du thé, livre ses infusions à vélo-roulotte sur une
grille, et l'on remet dans l'ordre les cartes de sa tournée, comme dans un
problème de Parsons. C'est le dossier de travail de l'équipe enseignante, il
n'est pas publié sur le site.

## Démarche

Chaque étape produit un document, relu avant de passer à la suivante.

| Étape | Document                                                                                                                                                 | État    |
| ----: | :------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
|     1 | [Cadrage](01-cadrage.md)                                                                                                                                 | Validé  |
|     2 | [État de l'art](02-etat-de-l-art.md)                                                                                                                     | Validé  |
|     3 | [Besoins](03-besoins.md)                                                                                                                                 | Validé  |
|     4 | [Conception du jeu](04-conception-du-jeu.md)                                                                                                             | Validé  |
|     5 | Maquettes : [v1](maquettes/maquette-v1.html), [v2](maquettes/maquette-v2.html), [v3](maquettes/maquette-v3.html), [niveaux](niveaux/), [écrans](ecrans/) | Validé  |
|     6 | [Architecture](05-architecture.md) et [décisions](decisions/)                                                                                            | Validé  |
|     7 | Code : moteur TypeScript testé, vue séparée                                                                                                              | À faire |
|     8 | Tests avec des personnes qui étudient                                                                                                                    | À faire |

Les décisions importantes seront consignées une par une dans `decisions/`, au
format ADR (Architecture Decision Record) : le contexte, la décision, les
options écartées et leurs conséquences. La personne qui reprend le projet doit
pouvoir comprendre pourquoi les choses sont faites ainsi sans le demander.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
