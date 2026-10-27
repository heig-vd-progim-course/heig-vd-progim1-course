# Séance 05 - Fonctions et portée des variables

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Ressources annexes

- Présentation (web) :
  [Lien vers la présentation](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/05-fonctions-et-portee/)
- Présentation (PDF) :
  [Lien vers le PDF](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/05-fonctions-et-portee/05-fonctions-et-portee-presentation.pdf)
- Théorie : [Les fonctions et la portée des variables](01-fonctions-et-portee.md)
- Atelier : [Découper en fonctions](02-atelier-decouper-en-fonctions.md)
- Notes pour l'équipe enseignante :
  [Lien vers les notes](../../98-equipe-enseignante/05-fonctions-et-portee.md)

## Objectifs

En séance 04, vous avez posé chaque problème en trois colonnes : ce que le
programme reçoit, ce qu'il calcule, ce qu'il rend. Puis vous avez écrit le
premier programme du fil rouge, tout entier dans `main`.

Cette séance applique les trois colonnes à des **morceaux** de programme. Une
fonction reçoit des valeurs, ses **paramètres**, les traite dans son **corps**,
et rend un résultat, sa **valeur de retour**. Vous en utilisez déjà :
`Double.parseDouble` et `Math.round` en sont. Aujourd'hui, vous écrivez les
vôtres.

Les fonctions arrivent avant les conditions et les boucles exprès : tout ce qui
suit s'écrira dans des fonctions, plutôt que dans un `main` qui s'allonge.

À la fin de cette séance, vous devriez être capable de :

- relier les entrées, le traitement et la sortie d'un problème aux paramètres,
  au corps et à la valeur de retour d'une fonction ;
- nommer chaque partie d'une fonction : en-tête, type de retour, nom,
  paramètres, corps, `return`, et dire ce qu'est sa signature ;
- distinguer un paramètre d'un argument ;
- écrire une fonction qui reçoit des paramètres et rend un résultat, et
  l'appeler depuis `main` ou depuis une autre fonction ;
- prédire ce qu'affiche un programme qui appelle des fonctions ;
- expliquer où une variable existe et où elle n'existe pas ;
- diagnostiquer une erreur de portée à partir du message du compilateur.

## Déroulé

Quatre périodes de 45 minutes, soit 180 minutes d'enseignement, plus 30 minutes
de pause.

| Temps       |  Durée | Contenu                                                                                                  |
| :---------- | -----: | :------------------------------------------------------------------------------------------------------- |
| 00:00-00:15 | 15 min | Rappel de la séance 04 : entrées, traitement, sortie                                                    |
| 00:15-01:00 | 45 min | [Théorie - Écrire et appeler une fonction](01-fonctions-et-portee.md)                                    |
| 01:00-01:15 | 15 min | Pause                                                                                                    |
| 01:15-01:40 | 25 min | [Théorie - Une fonction en appelle une autre, la portée](01-fonctions-et-portee.md#la-portee-des-variables) |
| 01:40-02:10 | 30 min | [Atelier - Prédire et réparer](02-atelier-decouper-en-fonctions.md)                                      |
| 02:10-02:25 | 15 min | Pause                                                                                                    |
| 02:25-03:15 | 50 min | [Atelier - Le fil rouge en fonctions](02-atelier-decouper-en-fonctions.md#3-le-fil-rouge-en-fonctions)    |
| 03:15-03:30 | 15 min | Discussion, clôture                                                                                      |

### Note sur la gestion du temps

Si la séance déborde, ce sont les extensions de l'atelier et l'étape 3 du fil
rouge (le groupe de trois personnes) qui sautent : elles se terminent à la
maison.

Ce qui ne se coupe jamais : la partie _Prédire_ et la partie _Réparer_ de
l'atelier. C'est en prédisant et en réparant qu'on comprend ce que fait un
appel, et c'est la notion la plus difficile de la séance.

## Méthodes d'enseignement et d'apprentissage

- Présentation magistrale courte, entrecoupée de prédictions à faire en
  classe.
- Démonstration commentée, erreurs comprises.
- Atelier individuel : prédire, exécuter, réparer, puis écrire.
- Discussion en classe.

## Méthodes d'évaluation

Cette séance ne donne pas lieu à une note.

La vérification est immédiate : vos prédictions correspondent ou non à ce que
la console affiche, et votre fil rouge en fonctions donne les mêmes résultats
que votre tableau de tests de la séance 04.

## À faire pour la semaine suivante

- Terminer le fil rouge en fonctions, étape 3 comprise. Il sera repris en
  séance 06 : ne venez pas sans lui.
- Faire au moins deux extensions de l'atelier, chacune avec son tableau de
  tests.
- Relire votre liste des cas non couverts de la séance 04. Pour chaque cas,
  dites dans quelle fonction il faudrait le vérifier. Vous saurez écrire ces
  vérifications en séance 06.
- Coller un des programmes du support dans le
  [Java Visualizer de Python Tutor](https://pythontutor.com/java.html) et
  suivre l'exécution pas à pas.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
