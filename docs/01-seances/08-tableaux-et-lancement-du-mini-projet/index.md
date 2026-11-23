# Séance 08 - Tableaux et lancement du mini-projet

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Ressources annexes

- Présentation (web) :
  [Lien vers la présentation](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/08-tableaux-et-lancement-du-mini-projet/)
- Présentation (PDF) :
  [Lien vers le PDF](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/08-tableaux-et-lancement-du-mini-projet/08-tableaux-et-lancement-du-mini-projet-presentation.pdf)
- Théorie : [Ranger dans un tableau](01-ranger-dans-un-tableau.md)
- Activité : [Des tableaux en quatuor](02-activite-des-tableaux-en-quatuor.md)
- Théorie : [Parcourir pour calculer](03-parcourir-pour-calculer.md)
- Atelier : [Tableaux](04-atelier-tableaux.md)
- Mini-projet : [Code secret - Étape 1](05-code-secret-etape-1.md)
- Questionnaire à rendre en séance 09 :
  [Questionnaire 08 (PDF)](../../00-organisation/questionnaire-08.pdf)
- Notes pour l'équipe enseignante :
  [Lien vers les notes](../../98-equipe-enseignante/08-tableaux-et-lancement-du-mini-projet.md)

## Objectifs

En séance 07, votre fil rouge a appris à répéter : il lit autant de notes et de
personnes qu'il en faut. Mais il oublie chaque note dès qu'il l'a ajoutée à la
somme, et il ne peut donc pas dire lesquelles sont en dessous de la moyenne.
Pour cela, il faut **garder** plusieurs valeurs dans une seule variable : un
tableau.

C'est aussi la séance où commence le mini-projet, _Code secret_ : un jeu que
vous construirez étape par étape jusqu'à la séance 11. Sa première étape
repose entièrement sur les tableaux.

À la fin de cette séance, vous devriez être capable de :

- déclarer un tableau, avec ses valeurs ou avec sa seule taille ;
- lire et modifier une case par son indice, en comptant à partir de 0 ;
- parcourir un tableau avec une boucle `for`, sans dépasser sa dernière case ;
- lire le message d'une `ArrayIndexOutOfBoundsException` et trouver sa cause ;
- calculer une somme, une moyenne, un compte, un minimum et un maximum ;
- afficher un tableau avec `Arrays.toString` ;
- expliquer ce qu'est le `String[] args` de `main` ;
- comparer deux tableaux case par case.

## Déroulé

Quatre périodes de 45 minutes, soit 180 minutes d'enseignement, plus 30 minutes
de pause.

| Temps       |  Durée | Contenu                                                                                   |
| :---------- | -----: | :---------------------------------------------------------------------------------------- |
| 00:00-00:10 | 10 min | [Rappel de la séance 07 : le fil rouge oublie les notes](01-ranger-dans-un-tableau.md#le-probleme-le-fil-rouge-oublie-les-notes) |
| 00:10-00:35 | 25 min | [Théorie - Ranger dans un tableau](01-ranger-dans-un-tableau.md)                          |
| 00:35-00:55 | 20 min | [Activité - Des tableaux en quatuor](02-activite-des-tableaux-en-quatuor.md)               |
| 00:55-01:10 | 15 min | [Théorie - Parcourir pour calculer](03-parcourir-pour-calculer.md)                         |
| 01:10-01:25 | 15 min | Pause                                                                                     |
| 01:25-01:45 | 20 min | [Atelier - Tableaux](04-atelier-tableaux.md)                                              |
| 01:45-02:00 | 15 min | [Lancement du mini-projet : Code secret, questionnaires et oral](../../00-organisation/02-mini-projet.md) |
| 02:00-02:15 | 15 min | Pause                                                                                     |
| 02:15-03:20 | 65 min | [Mini-projet - Code secret, étape 1](05-code-secret-etape-1.md)                           |
| 03:20-03:30 | 10 min | Bilan de l'étape 1, distribution du questionnaire                                         |

### Note sur la gestion du temps

Si la séance déborde, ce sont la partie _Prédire_ de l'atelier, l'étape 2 du
fil rouge et la section sur `String[] args` qui sautent. Les deux premières se
terminent à la maison ; la troisième se lit sur la page.

Ce qui ne se coupe jamais : l'indice de trop de l'étape 4 de la théorie,
l'activité en quatuor, et les parties 1 et 2 de l'étape 1 du code secret.
Savoir suivre ce qu'une boucle fait à un tableau, case par case, c'est ce que
la séance doit produire ; et sans l'étape 1, le mini-projet commence en
retard.

## Méthodes d'enseignement et d'apprentissage

- Présentation magistrale courte, sous forme de tutoriel : un même programme
  réécrit pas à pas, avec des quiz à choix multiple à faire en classe.
- Activité en mouvement : retrouver les quatre cartes qui décrivent le même
  programme.
- Atelier individuel : prédire, réparer, puis écrire.
- Mini-projet guidé, en autonomie, avec passage dans les rangs.

## Méthodes d'évaluation

Les tableaux sont évalués à l'oral de la session d'examens.

Le [questionnaire 08](../../00-organisation/questionnaire-08.pdf), distribué en
fin de séance, est à rendre rempli à la main au début de la séance 09. Il
compte pour 2,5% de la note : voir la page
[Évaluation](../../00-organisation/01-evaluation.md#les-questionnaires-10).

## À faire pour la semaine suivante

- Terminer les parties 1 à 3 de l'étape 1 du code secret. L'étape 2 part de
  là : ne venez pas sans elle.
- Remplir le questionnaire 08, à la main, et l'apporter en séance 09.
- Terminer le fil rouge jusqu'à l'étape 2 de l'atelier.
- Refaire les quiz de la théorie une semaine plus tard, sans relire la page
  avant.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
