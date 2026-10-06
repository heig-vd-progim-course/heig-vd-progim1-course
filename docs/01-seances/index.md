# Programme

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## La logique du semestre

Le semestre est construit en deux moitiés qui n'ont pas le même rythme.

**Séances 01 à 07 : comprendre.** On part de l'acte de donner une instruction,
on programme sans écrire de code, puis on installe un vrai langage et on
descend jusqu'à la machine qui l'exécute. À chaque séance, une activité précède la théorie : on
manipule l'idée avant de lui donner un nom. La moitié du semestre se termine
par une évaluation écrite.

**Séances 08 à 12 : faire.** Vous avez tous les éléments de base. Vous les
appliquez à un problème que vous avez choisi, en autonomie encadrée par des
jalons. Le cours devient un atelier.

## Les séances

| Séance | Titre                                                                      | Contenu principal |
| -----: | :------------------------------------------------------------------------- | :---------------- |
|     01 | [Donner des instructions](01-donner-des-instructions/index.md)             | Précision des instructions, diagrammes d'activité, apprendre à apprendre |
|     02 | [Programmer sans écrire de code](02-programmer-sans-ecrire-de-code/index.md) | MakeCode Arcade : observer, modifier, créer |
|     03 | [Premiers pas en Java](03-premiers-pas-en-java/index.md)                   | Installation, machine virtuelle et compilation, types et variables |
|     04 | [Du problème au programme](04-du-probleme-au-programme.md)                 | Du diagramme au pseudo-code, puis au Java. Lancement du fil rouge |
|     05 | [Sélection](05-selection.md)                                               | Conditions, `if`, `else`, opérateurs logiques |
|     06 | [Itération](06-iteration.md)                                               | Boucles `while` et `for`, conditions d'arrêt |
|     07 | [Récapitulatif et évaluation écrite](07-recapitulatif-et-evaluation-ecrite.md) | Examen blanc puis évaluation écrite (50%) |
|     08 | [Fonctions et lancement du mini-projet](08-fonctions-et-lancement-du-mini-projet.md) | Paramètres, traitement, résultat. Jalon 1 |
|     09 | [Tableaux](09-tableaux.md)                                                 | Collections de données, parcours. Jalon 2 |
|     10 | [Déboguer et tester](10-deboguer-et-tester.md)                             | Lire une erreur, isoler un bogue, vérifier. Jalon 3 |
|     11 | [Git et finalisation](11-git-et-finalisation.md)                           | Versionner son travail, le publier. Jalon 4 |
|     12 | [Présentations orales](12-presentations-orales.md)                         | Rendu final et soutenance. Jalon 5 |

## Le fil rouge

Un même problème traverse les séances 04 à 09 : **calculer la moyenne des notes
d'un groupe de personnes et dire qui a réussi**. Il est assez simple pour être
posé en séance 04 avec les seules variables, et assez riche pour mobiliser
ensuite les conditions, les boucles, les fonctions et les tableaux.

À chaque séance, le même problème est repris avec l'outil nouvellement appris,
et la solution précédente est retravaillée. Cela rend visible une chose qui est
difficile à expliquer autrement : un programme n'est pas écrit une fois, il est
réécrit.

## Ce qui a changé par rapport à l'édition précédente

À l'attention de l'équipe enseignante, et par transparence pour les personnes
qui étudient :

- Le cours ne commence plus par la programmation mais par l'acte de donner une
  instruction, avec une activité par deux dès la première séance.
- La séance 02 se fait entièrement sans écrire de code, avec MakeCode Arcade :
  observer un programme qui fonctionne, le modifier, puis en créer un. Les
  limites des blocs, constatées en fin de séance, motivent le passage au code
  textuel en séance 03.
- Les diagrammes d'activité sont dessinés à la main avant d'être produits avec
  un outil. L'outil viendra plus tard, s'il vient.
- L'évaluation est passée d'un examen final unique à une évaluation écrite à
  mi-semestre et un mini-projet à jalons avec soutenance orale.
- La théorie sur la machine virtuelle et la compilation est donnée en séance
  03, le jour où les personnes compilent leur premier programme, et non comme
  un chapitre séparé.
- Git est introduit, en séance 11, sur un besoin réel plutôt qu'en théorie.
- L'apprentissage de l'apprentissage et la gestion de l'attention font partie
  du programme, pas des recommandations en passant.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
