# Programme

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## La logique du semestre

Le semestre est construit en deux moitiés qui n'ont pas le même rythme.

**Séances 01 à 07 : comprendre.** On part de l'acte de donner une instruction,
on programme sans écrire de code, puis on installe un vrai langage et on
descend jusqu'à la machine qui l'exécute. À chaque séance, une activité précède
la théorie : on manipule l'idée avant de lui donner un nom. Une évaluation
écrite a lieu entre les séances 06 et 07.

**Séances 08 à 12 : faire.** Vous avez tous les éléments de base. Vous les
appliquez à un problème que vous avez choisi, en autonomie encadrée par des
jalons. Le cours devient un atelier.

## Les séances

| Séance | Titre                                                                      | Contenu principal |
| -----: | :------------------------------------------------------------------------- | :---------------- |
|     01 | [Donner des instructions](01-donner-des-instructions/index.md)             | Précision des instructions, diagrammes d'activité, apprendre à apprendre |
|     02 | [Programmer sans écrire de code](02-programmer-sans-ecrire-de-code/index.md) | MakeCode Arcade : observer, modifier, créer |
|     03 | [Premiers pas en Java](03-premiers-pas-en-java/index.md)                   | Installation, machine virtuelle et compilation, types et variables |
|     04 | [Du diagramme au code](04-du-diagramme-au-code/index.md)                   | Entrées, traitement, sortie. Saisie clavier, affichage, premier programme complet |
|     05 | [Fonctions et portée des variables](05-fonctions-et-portee/index.md)       | Paramètres, corps, valeur de retour. Ce qu'une variable voit |
|     06 | [Conditions](06-conditions.md)                                             | `if`, `else`, opérateurs de comparaison et logiques |
|      — | **Évaluation écrite** (50 %)                                               | Papier et crayon, sans ressources |
|     07 | [Boucles](07-boucles.md)                                                   | `while`, `for`, conditions d'arrêt |
|     08 | [Tableaux et lancement du mini-projet](08-tableaux-et-lancement-du-mini-projet.md) | Collections de données, parcours. Jalon 1 |
|     09 | [Chaînes de caractères](09-chaines-de-caracteres.md)                       | Manipuler du texte, formater une sortie. Jalon 2 |
|     10 | [Déboguer et tester](10-deboguer-et-tester.md)                             | Lire une erreur, isoler un bogue, vérifier. Jalon 3 |
|     11 | [Git et finalisation](11-git-et-finalisation.md)                           | Versionner son travail, le publier. Jalon 4 |
|     12 | [Présentations orales](12-presentations-orales.md)                         | Rendu final et soutenance. Jalon 5 |
|      — | **Évaluation finale**                                                      | Après le semestre, sur l'ensemble du cours |

## Le fil rouge

Un même problème traverse les séances 04 à 09 : **calculer la moyenne des notes
d'un groupe de personnes et dire qui a réussi**.

Il est assez simple pour être posé en séance 04 avec les seules variables, et
assez riche pour mobiliser ensuite les fonctions, les conditions, les boucles,
les tableaux et le formatage du texte.

Sa forme évolue à chaque séance :

| Séance | Ce que devient la solution                                      |
| -----: | :-------------------------------------------------------------- |
|     04 | Un programme qui lit deux notes au clavier et affiche la moyenne |
|     05 | La moyenne devient une **fonction** qui prend des notes et rend un résultat, appelée pour trois personnes |
|     06 | Le programme **décide** si la moyenne est suffisante              |
|     07 | Il accepte un **nombre quelconque** de notes                      |
|     08 | Les notes sont rangées dans un **tableau** et parcourues          |
|     09 | La sortie est **formatée** proprement et les noms sont gérés      |

À chaque fois, la version précédente est réécrite plutôt que rallongée. C'est
la manière la plus directe de rendre visible qu'un programme n'est pas écrit
une fois, mais réécrit.

## L'ordre des notions

Les fonctions arrivent **avant** les conditions et les boucles. C'est
inhabituel, et c'est volontaire.

Une fonction est une boîte à qui on donne quelque chose et qui rend quelque
chose. C'est plus simple à comprendre qu'une boucle, et cela permet dès la
séance 05 d'écrire des programmes découpés plutôt qu'un `main` qui s'allonge.
Quand les conditions puis les boucles arrivent, elles se logent dans des
fonctions qui existent déjà.

Cet ordre est celui du cours
[Apprenez à programmer en Java](https://openclassrooms.com/fr/courses/6173501-apprenez-a-programmer-en-java)
d'OpenClassrooms.

## Ce qui a changé par rapport à l'édition précédente

À l'attention de l'équipe enseignante, et par transparence pour les personnes
qui étudient :

- Le cours ne commence plus par la programmation mais par l'acte de donner une
  instruction, avec une activité par deux dès la première séance.
- La séance 02 se fait entièrement sans écrire de code, avec MakeCode Arcade.
  Les limites des blocs, constatées en fin de séance, motivent le passage au
  code textuel.
- La théorie sur la machine virtuelle et la compilation est donnée le jour où
  les personnes compilent leur premier programme, et non comme un chapitre
  séparé.
- Les diagrammes d'activité sont dessinés à la main. Le pseudo-code a été
  abandonné : une étape intermédiaire de plus entre le diagramme et le code
  n'apportait rien.
- Les fonctions passent avant les conditions et les boucles.
- La portée des variables et les chaînes de caractères deviennent des sujets à
  part entière.
- L'évaluation est passée d'un examen final unique à une évaluation écrite à
  mi-semestre et un mini-projet à jalons avec soutenance orale.
- Git est introduit sur un besoin réel plutôt qu'en théorie.
- L'apprentissage de l'apprentissage et la gestion de l'attention font partie
  du programme, pas des recommandations en passant.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
