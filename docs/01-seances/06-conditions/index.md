# Séance 06 - Conditions

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

!!! warning "Cette séance ne fait pas partie de l'évaluation écrite"

    L'[évaluation écrite](../../00-organisation/01-evaluation.md) du lundi 9
    novembre 2026 porte sur les séances 01 à 05 **uniquement**. Les conditions
    n'y sont pas évaluées, que vous ayez suivi cette séance avant ou après.

    Elles le seront à l'évaluation finale, et vous en aurez besoin dans le
    mini-projet. Si votre évaluation écrite n'a pas encore eu lieu, ne laissez
    pas cette séance prendre le temps de vos révisions.

## Ressources annexes

- Présentation (web) :
  [Lien vers la présentation](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/06-conditions/)
- Présentation (PDF) :
  [Lien vers le PDF](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/06-conditions/06-conditions-presentation.pdf)
- Théorie : [Décider avec `if` et `else`](01-decider-avec-if.md)
- Atelier : [Décider](02-atelier-decider.md)
- Théorie :
  [Plusieurs cas et opérateurs logiques](03-plusieurs-cas-et-operateurs-logiques.md)
- Atelier : [Couvrir tous les cas](04-atelier-couvrir-tous-les-cas.md)
- Théorie : [`switch` et l'opérateur ternaire](05-switch-et-ternaire.md)
- Notes pour l'équipe enseignante :
  [Lien vers les notes](../../98-equipe-enseignante/06-conditions.md)

## Objectifs

En séance 05, vous avez découpé le fil rouge en fonctions. Mais toutes les
lignes de vos programmes s'exécutaient, à chaque fois, dans un ordre fixé : la
**séquence** de la séance 01. Votre `computeAverage` accepte encore une note de
7, et votre programme ne sait pas dire si une personne a réussi.

Cette séance traduit en Java le **losange** de vos diagrammes d'activité : la
sélection. Le programme pose une question, et la suite dépend de la réponse.
Les conditions se logent dans les fonctions de la séance 05 : `hasPassed` et
`isValidGrade` sont des fonctions qui rendent un `boolean`.

À la fin de cette séance, vous devriez être capable de :

- traduire un losange de diagramme d'activité en `if` et `else` ;
- écrire une condition avec les opérateurs de comparaison, et distinguer `=` de
  `==` ;
- écrire une fonction qui rend un `boolean`, et l'utiliser comme condition ;
- choisir entre plusieurs cas avec `else if`, dans le bon ordre ;
- combiner des conditions avec `&&`, `||` et `!` ;
- tester une condition avec une valeur de chaque côté de chaque limite ;
- expliquer pourquoi on ne compare pas deux `double` avec `==` ;
- réécrire un choix entre deux valeurs avec l'opérateur ternaire, et un choix
  entre des valeurs exactes avec `switch`.

## Déroulé

Quatre périodes de 45 minutes, soit 180 minutes d'enseignement, plus 30 minutes
de pause.

| Temps       |  Durée | Contenu                                                                                         |
| :---------- | -----: | :---------------------------------------------------------------------------------------------- |
| 00:00-00:15 | 15 min | [Rappel de la séance 05 : dans quel ordre ?](01-decider-avec-if.md#rappel-dans-quel-ordre)       |
| 00:15-00:30 | 15 min | [Théorie - Décider avec `if` et `else`](01-decider-avec-if.md#du-losange-au-code)                |
| 00:30-01:10 | 40 min | [Atelier - Décider](02-atelier-decider.md)                                                      |
| 01:10-01:25 | 15 min | Correction au tableau, en live coding                                                           |
| 01:25-01:40 | 15 min | Pause                                                                                           |
| 01:40-02:00 | 20 min | [Théorie - Plusieurs cas et opérateurs logiques](03-plusieurs-cas-et-operateurs-logiques.md)     |
| 02:00-02:35 | 35 min | [Atelier - Couvrir tous les cas, parties 1 à 5](04-atelier-couvrir-tous-les-cas.md)              |
| 02:35-02:50 | 15 min | Pause                                                                                           |
| 02:50-03:05 | 15 min | [Théorie - `switch` et l'opérateur ternaire](05-switch-et-ternaire.md)                           |
| 03:05-03:20 | 15 min | [Atelier - Couvrir tous les cas, partie 6](04-atelier-couvrir-tous-les-cas.md#6-apres-la-pause-switch-et-ternaire) |
| 03:20-03:30 | 10 min | Live coding, discussion, clôture                                                                |

### Note sur la gestion du temps

Si la séance déborde, ce sont la partie _Écrire_ des deux ateliers et l'étape 2
de la partie 6 qui sautent : elles se terminent à la maison. La théorie sur
`switch` et l'opérateur ternaire peut se réduire à la lecture de la page.

Ce qui ne se coupe jamais : les parties _Prédire_ et _Réparer_ du premier
atelier, et le fil rouge qui décide. Un programme qui distingue réussi et
échoué, testé à la limite de 4, est ce que la séance doit produire.

## Méthodes d'enseignement et d'apprentissage

- Présentation magistrale courte, entrecoupée de prédictions et de quiz à
  choix multiple, à faire en classe.
- Démonstration commentée, erreurs comprises.
- Ateliers individuels : prédire, exécuter, réparer, puis écrire.
- Échange de programmes entre voisins pour chercher les cas non couverts.
- Correction au tableau, en live coding, à partir des questions de la classe.

## Méthodes d'évaluation

Cette séance ne donne pas lieu à une note, et elle n'est **pas** évaluée à
l'évaluation écrite du 9 novembre.

La vérification est immédiate : les quiz du support vous disent tout de suite
si vous avez juste, vos prédictions correspondent ou non à ce que la console
affiche, et votre tableau de tests révèle les limites mal placées.

## À faire pour la semaine suivante

- Si votre évaluation écrite n'a pas encore eu lieu : c'est la priorité.
  Refaites l'[examen blanc](../../00-organisation/01-evaluation.md#comment-sy-preparer)
  sur papier.
- Terminer le fil rouge jusqu'à la partie 6 de l'atelier _Couvrir tous les
  cas_. Il sera repris en séance 07 : ne venez pas sans lui.
- Faire la partie _Écrire_ des deux ateliers, chacune avec son tableau de
  tests.
- Reprendre votre liste de cas non couverts de la chasse. Pour chacun, dites
  quelle notion manque pour le corriger.
- Refaire les quiz du support une semaine plus tard, sans relire la page avant.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
