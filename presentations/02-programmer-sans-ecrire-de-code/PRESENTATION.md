---
marp: true
---

<!--
theme: custom-marp-theme
size: 16:9
paginate: true
author: V. Guidoux, avec l'aide de Claude
title: HEIG-VD ProgIM1 Course - Programmer sans écrire de code
description: Séance "Programmer sans écrire de code" avec MakeCode Arcade pour l'unité d'enseignement ProgIM1 enseignée à la HEIG-VD, Suisse
url: https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/02-programmer-sans-ecrire-de-code/
header: "**Programmer sans écrire de code**"
footer: '[**HEIG-VD**](https://heig-vd.ch) - [ProgIM1 2026-2027](https://github.com/heig-vd-progim-course/heig-vd-progim1-course) - [CC BY-SA 4.0](https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md)'
headingDivider: 2
math: mathjax
-->

# Programmer sans écrire de code

<!--
_class: lead
_paginate: false
-->

<https://github.com/heig-vd-progim-course/heig-vd-progim1-course>

[Support de cours][cours] · [Présentation (web)][presentation-web] ·
[Présentation (PDF)][presentation-pdf]

<small>V. Guidoux, avec l'aide de Claude.</small>

<small>Ce travail est sous licence [CC BY-SA 4.0][license].</small>

![bg brightness:2 opacity:0.2][illustration-principale]

## _Retrouvez plus de détails dans le support de cours_

<!-- _class: lead -->

_Cette présentation est un résumé du support de cours. Pour plus de détails,
consultez le [support de cours][cours]._

## La semaine dernière

Vous avez constaté trois choses :

- une instruction imprécise produit n'importe quoi ;
- tout enchaînement se dessine avec six symboles ;
- tout programme se ramène à une séquence, une sélection et une itération.

Aujourd'hui, on donne cet enchaînement à une machine et on regarde si elle fait
ce que vous aviez prévu.

## Objectifs de cette séance

À la fin de cette séance, vous devriez être capable de :

- lire un programme et prédire son comportement avant de l'exécuter ;
- retrouver les trois structures dans un programme réel ;
- expliquer ce qu'est un événement ;
- modifier un programme sans le casser ;
- transformer votre diagramme en programme qui fonctionne.

![bg right:40%][illustration-objectifs]

## L'outil du jour

<!-- _class: lead -->

[MakeCode Arcade](https://arcade.makecode.com/)

On programme en assemblant des blocs. Pas de syntaxe, pas de point-virgule
oublié, pas d'installation.

## Pourquoi des blocs

Écrire du code demande deux choses en même temps :

- savoir **quoi** faire faire à la machine ;
- savoir **l'écrire** correctement.

Tant que les deux sont mélangés, une erreur de raisonnement et une virgule
manquante se ressemblent. Vous ne savez pas laquelle vous venez de commettre.

Les blocs suppriment temporairement la seconde difficulté.

## Pourquoi une seule séance

Parce que les blocs atteignent vite leur limite.

Vous allez la sentir vous-même cet après-midi, en phase 3. Le débriefing
servira à la nommer, et cette limite sera le point de départ de la séance 03.

**Ce n'est pas une récréation avant les choses sérieuses.** C'est la démarche
de tout le semestre, en accéléré.

## Le programme de la séance

| Phase       | Durée  | Ce que vous faites                     |
| :---------- | -----: | :------------------------------------- |
| Observer    | 35 min | Lire un jeu qui fonctionne             |
| Modifier    | 45 min | Le changer sans le casser              |
| Créer       | 55 min | En faire un de toutes pièces           |
| Restitution | 15 min | Jouer à celui de quelqu'un d'autre     |

## Phase 1 - Observer

<!-- _class: lead -->

## La règle de la phase 1

**Vous ne lancez pas le jeu avant d'avoir écrit ce qu'il va faire.**

Lancer d'abord ne vous apprend rien : vous reconstruirez l'explication après
coup et vous aurez l'impression d'avoir compris.

Prédire d'abord vous dit exactement où votre modèle mental est faux.

![bg right:40%][illustration-observer]

## Ce que vous cherchez

Dans le programme qu'on vous donne, retrouvez :

- la **séquence** : des blocs empilés, exécutés de haut en bas ;
- la **sélection** : un bloc `si ... alors` ;
- l'**itération** : un bloc `pour toujours` ou `répéter`.

Votre losange de la semaine dernière est devenu un bloc `si`. Votre flèche qui
remontait est devenue un bloc `pour toujours`.

## Une quatrième forme

Certains blocs commencent par `quand`. Par exemple
`quand le bouton A est pressé`.

Ils ne s'exécutent pas dans l'ordre : **ils attendent**.

C'est un **événement** : une instruction laissée à la machine, du type _"si un
jour ceci arrive, alors fais cela"_.

## Pourquoi l'événement compte

Un diagramme d'activité se lit du début à la fin.

Un programme à événements n'a pas ce déroulé unique : plusieurs choses
attendent en parallèle et se déclenchent dans un ordre que vous ne maîtrisez
pas.

Notez simplement aujourd'hui que cela existe et que **cela se dessine mal**.

## Phase 2 - Modifier

<!-- _class: lead -->

## La règle de la phase 2

**Un changement à la fois. On teste après chaque changement.**

- Cinq modifications puis une panne : cinq causes possibles, et leurs
  combinaisons.
- Une modification puis une panne : une cause, et vous la connaissez déjà.

Le réflexe de tout changer d'un coup est celui qui vous coûtera le plus cher
cette année.

![bg right:40%][illustration-modifier]

## Quatre niveaux de modification

1. **Changer une valeur** : vitesse, nombre de vies, points par ramassage.
2. **Changer une apparence** : personnage, fond, son.
3. **Changer une condition** : perdre sous zéro, ennemi après vingt points.
4. **Ajouter un comportement** : bonus, second niveau, écran de fin.

Dans l'ordre. Personne ne finira les douze modifications, et c'est prévu.

## L'exercice le plus utile de la journée

1. **Cassez volontairement** votre jeu.
2. **Échangez de poste** avec la personne à côté de vous.
3. **Trouvez ce qu'elle a cassé** et réparez-le.

Du débogage sur du code que vous n'avez pas écrit, avec un bogue que vous
n'avez pas introduit, sans message d'erreur.

**C'est la situation normale du métier.** Notez le temps que ça vous prend.

## Phase 3 - Créer

<!-- _class: lead -->

## La règle de la phase 3

**Le diagramme d'abord. L'éditeur ensuite.**

Vous dessinez, vous me montrez, et seulement après vous ouvrez l'éditeur.

Qui ouvre l'éditeur en premier passera l'après-midi à empiler des blocs au
hasard et repartira avec quelque chose qui bouge sans savoir pourquoi.

![bg right:40%][illustration-creer]

## Cinq sujets

1. **Le ramasseur** : des objets apparaissent, les toucher donne un point.
2. **L'esquive** : des objets tombent, les toucher fait perdre une vie.
3. **Le tri** : deux zones, deux couleurs, pousser dans la bonne.
4. **Le chronomètre** : appuyer exactement au bout de cinq secondes.
5. **La mémoire** : reproduire une séquence de couleurs qui s'allonge.

Ou le vôtre, du même calibre.

## Le piège

Votre sujet vous paraîtra trop simple. Vous aurez envie d'ajouter des niveaux,
des ennemis, une histoire.

**Ne le faites pas.** Faites d'abord fonctionner la version minimale, de bout en
bout, avec un début et une fin.

Cette envie reviendra au mini-projet en séance 08. Elle y coûtera beaucoup plus
cher.

## Construire dans l'ordre

1. Le personnage apparaît et se déplace. **Testez.**
2. Les objets apparaissent. **Testez.**
3. La collision donne un point. **Testez.**
4. La partie se termine. **Testez.**
5. Le score s'affiche. **Testez.**

Si l'étape 3 ne marche pas, ne construisez pas l'étape 4 en espérant que
l'ensemble tombe juste. Vous aurez deux problèmes au lieu d'un.

## Quand vous êtes bloqué

Dans cet ordre, et pas dans un autre :

1. Relisez votre diagramme. Neuf fois sur dix, l'étape qui manque y est absente
   aussi.
2. Regardez la documentation des blocs.
3. Demandez à la personne à côté de dire ce qu'elle comprend de votre
   programme.
4. Appelez-moi.

La quatrième option est la plus rapide sur le moment et la moins utile sur le
semestre.

## Restitution croisée

Vous laissez votre jeu ouvert et vous allez jouer à celui de quelqu'un
d'autre, sans explication.

Une seule question : **quelles sont les règles de ce jeu ?**

La semaine dernière, vous lisiez des règles pour en déduire un diagramme.
Aujourd'hui, quelqu'un lit votre programme en y jouant.

## Si l'écart est grand

<!-- _class: lead -->

La question n'est pas _"elle n'a pas compris"_.

La question est _"qu'est-ce que mon programme ne dit pas clairement ?"_

## À vous de jouer !

- Terminer le jeu s'il n'est pas fini, et garder son lien de partage.
- Corriger votre diagramme pour qu'il corresponde à ce que le programme **fait**,
  et non à ce que vous aviez prévu.
- Écrire trois lignes : ce que les blocs ont facilité, et à quel moment ils
  vous ont gêné.

![bg right:40%][illustration-a-vous-de-jouer]

## Une note sur l'outil

MakeCode est publié sous licence MIT et son code source est public.

L'éditeur en ligne, lui, est un service hébergé par Microsoft : ce que vous y
écrivez transite par leurs serveurs.

On n'y met donc rien de personnel. C'est un réflexe à prendre pour tous les
outils en ligne que vous utiliserez.

## Questions

<!-- _class: lead -->

Est-ce que vous avez des questions ?

## Sources

- [Illustration principale][illustration-principale] par
  [Richard Jacobs](https://unsplash.com/@rj2747) sur
  [Unsplash](https://unsplash.com/photos/8oenpCXktqQ)
- [Illustration objectifs][illustration-objectifs] par
  [Aline de Nadai](https://unsplash.com/@alinedenadai) sur
  [Unsplash](https://unsplash.com/photos/j6brni7fpvs)
- [Illustration observer][illustration-observer] par
  [American Jael](https://unsplash.com/@americanjael) sur
  [Unsplash](https://unsplash.com/photos/OEvLi8LM7cc)
- [Illustration modifier][illustration-modifier] par
  [Samuel Girven](https://unsplash.com/@samuelgirven) sur
  [Unsplash](https://unsplash.com/photos/VJ2s0c20qCo)
- [Illustration créer][illustration-creer] par
  [Alec Favale](https://unsplash.com/@alecfavale) sur
  [Unsplash](https://unsplash.com/photos/Ivzo69e18nk)
- [Illustration à vous de jouer][illustration-a-vous-de-jouer] par
  [Tim van Cleef](https://unsplash.com/@_timvancleef) sur
  [Unsplash](https://unsplash.com/photos/1JBOZwuW7sI)

<!-- URLs -->

[presentation-web]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/02-programmer-sans-ecrire-de-code/
[presentation-pdf]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/02-programmer-sans-ecrire-de-code/02-programmer-sans-ecrire-de-code-presentation.pdf
[cours]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/01-seances/02-programmer-sans-ecrire-de-code/
[license]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md

<!-- Illustrations -->

[illustration-principale]:
	https://images.unsplash.com/photo-1517486430290-35657bdcef51?fit=crop&h=720
[illustration-objectifs]:
	https://images.unsplash.com/photo-1516389573391-5620a0263801?fit=crop&h=720
[illustration-observer]:
	https://images.unsplash.com/photo-1712762056200-50d8f803ba10?fit=crop&h=720
[illustration-modifier]:
	https://images.unsplash.com/photo-1576678927484-cc907957088c?fit=crop&h=720
[illustration-creer]:
	https://images.unsplash.com/photo-1563460716037-460a3ad24ba9?fit=crop&h=720
[illustration-a-vous-de-jouer]:
	https://images.unsplash.com/photo-1554906493-4812e307243d?fit=crop&h=720
