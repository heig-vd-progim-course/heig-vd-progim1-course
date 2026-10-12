# Séance 04 - Du diagramme au code

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Ressources annexes

- Présentation (web) :
  [Lien vers la présentation](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/04-du-diagramme-au-code/)
- Présentation (PDF) :
  [Lien vers le PDF](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/04-du-diagramme-au-code/04-du-diagramme-au-code-presentation.pdf)
- Activité : [Poser le problème](01-activite-poser-le-probleme.md)
- Théorie : [Lire au clavier](02-lire-au-clavier.md)
- Théorie : [Afficher un résultat lisible](03-afficher-un-resultat.md)
- Atelier : [Du diagramme au code](04-atelier-du-diagramme-au-code.md)
- Notes pour l'équipe enseignante :
  [Lien vers les notes](../../98-equipe-enseignante/04-du-diagramme-au-code.md)

## Objectifs

En séance 01, vous avez dessiné des diagrammes d'activité. En séance 03, vous
avez déclaré des variables et affiché leur contenu. Les deux n'ont pas encore
été reliés, et vos programmes ne savent rien faire d'autre que répéter les
valeurs écrites dans le code.

Cette séance relie les deux. C'est la première fois que vous écrivez un
programme qui fait quelque chose d'utile, de bout en bout : il reçoit des
valeurs, il calcule, il répond.

C'est aussi la séance qui lance le **fil rouge** du semestre : calculer la
moyenne des notes d'un groupe de personnes et dire qui a réussi. Aujourd'hui,
la première version : deux notes et une moyenne.

À la fin de cette séance, vous devriez être capable de :

- poser un problème en termes d'entrées, de traitement et de sortie ;
- lire une valeur saisie au clavier et la convertir en nombre ;
- expliquer pourquoi une saisie peut faire planter un programme qui compile ;
- afficher un résultat lisible, avec le nombre de décimales voulu ;
- traduire un diagramme d'activité simple en programme Java ;
- identifier les cas que l'énoncé ne couvre pas.

## Déroulé

Quatre périodes de 45 minutes, soit 180 minutes d'enseignement, plus 30 minutes
de pause.

| Temps       | Durée  | Contenu                                                  |
| :---------- | -----: | :------------------------------------------------------- |
| 00:00-00:10 | 10 min | Rappel de la séance 03 et cadrage                         |
| 00:10-00:40 | 30 min | [Activité - Poser le problème](01-activite-poser-le-probleme.md) |
| 00:40-01:15 | 35 min | [Théorie - Lire au clavier](02-lire-au-clavier.md)        |
| 01:15-01:30 | 15 min | Pause                                                     |
| 01:30-02:05 | 35 min | [Théorie - Afficher un résultat lisible](03-afficher-un-resultat.md) |
| 02:05-02:20 | 15 min | Pause                                                     |
| 02:20-03:15 | 55 min | [Atelier - Du diagramme au code](04-atelier-du-diagramme-au-code.md) |
| 03:15-03:30 | 15 min | Comparaison des solutions, clôture                        |

### Note sur la gestion du temps

Si la séance déborde, ce qui se coupe en premier, ce sont les extensions de
l'atelier, puis la partie sur l'arrondi de la page _"Afficher un résultat
lisible"_. Vous pouvez les faire à la maison.

Ce qui ne se coupe pas : à la fin de la séance, chaque personne a un programme
qui lit deux notes au clavier et affiche leur moyenne, et l'a construit à
partir de son propre diagramme.

## Méthodes d'enseignement et d'apprentissage

- Activité en groupe, sans ordinateur.
- Démonstration commentée.
- Présentation magistrale courte.
- Atelier individuel, avec comparaison par deux.

## Méthodes d'évaluation

Cette séance ne donne pas lieu à une note.

La vérification est immédiate : votre programme lit deux notes, affiche leur
moyenne au dixième, et donne les résultats que vous aviez prédits dans votre
tableau de tests.

## À faire pour la semaine suivante

- Terminer le programme du fil rouge, s'il ne l'est pas. Il sera repris dès le
  début de la séance 05 : ne venez pas sans lui.
- Faire au moins une des extensions de l'atelier, diagramme compris.
- Écrire, sur papier, la liste des cas que votre programme ne gère pas. Gardez
  cette liste : elle servira en séance 06.
- Relire la section sur les erreurs de la page
  [Lire au clavier](02-lire-au-clavier.md). Vous devez pouvoir dire, pour
  chaque message, ce qui l'a provoqué.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
