# Séance 02 - Programmer sans écrire de code

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Ressources annexes

- Présentation (web) :
  [Lien vers la présentation](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/02-programmer-sans-ecrire-de-code/)
- Présentation (PDF) :
  [Lien vers le PDF](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/02-programmer-sans-ecrire-de-code/02-programmer-sans-ecrire-de-code-presentation.pdf)
- Phase 1 : [Observer](01-observer.md)
- Phase 2 : [Modifier](02-modifier.md)
- Phase 3 : [Créer](03-creer.md)

## Objectifs

En séance 01, vous avez constaté qu'une instruction imprécise produit
n'importe quoi, et vous avez appris à dessiner un enchaînement d'actions. Cette
séance sert à vérifier que cet enchaînement, une fois donné à une machine,
produit bien ce que vous aviez prévu.

Nous utilisons pour cela [MakeCode Arcade](https://arcade.makecode.com/), un
éditeur dans lequel on programme en assemblant des blocs plutôt qu'en tapant du
texte. Pas de syntaxe, pas de point-virgule oublié, pas d'installation.

À la fin de cette séance, vous devriez être capable de :

- lire un programme existant et prédire son comportement avant de l'exécuter ;
- identifier une séquence, une sélection et une itération dans un programme
  réel ;
- expliquer ce qu'est un événement et en quoi il diffère d'une instruction
  exécutée dans l'ordre ;
- modifier un programme existant sans le casser, en procédant par petits
  changements testés un à un ;
- traduire un diagramme d'activité que vous avez dessiné en un programme qui
  fonctionne ;
- nommer au moins deux choses que les blocs rendent faciles et deux choses
  qu'ils rendent impossibles.

Le dernier objectif est celui qui prépare la suite du semestre.

## Pourquoi des blocs, et pourquoi seulement une séance

Écrire du code demande deux choses en même temps : savoir quoi faire faire à la
machine, et savoir l'écrire correctement. Tant que les deux sont mélangés, une
erreur de raisonnement et une virgule manquante se ressemblent, et on ne sait
pas laquelle on vient de commettre.

Les blocs suppriment temporairement la seconde difficulté. On peut alors se
tromper uniquement sur le raisonnement, ce qui est le but.

Une seule séance, parce que les blocs atteignent vite leur limite. Vous la
sentirez vous-même en phase 3, et le débriefing servira à la nommer.

## Déroulé

Quatre périodes de 45 minutes, soit 180 minutes d'enseignement, plus 30 minutes
de pause.

| Temps       | Durée  | Contenu                                     |
| :---------- | -----: | :------------------------------------------ |
| 00:00-00:10 | 10 min | Rappel de la séance 01 et cadrage            |
| 00:10-00:25 | 15 min | Prise en main de l'éditeur                   |
| 00:25-01:00 | 35 min | [Phase 1 - Observer](01-observer.md)         |
| 01:00-01:15 | 15 min | Pause                                        |
| 01:15-02:00 | 45 min | [Phase 2 - Modifier](02-modifier.md)         |
| 02:00-02:15 | 15 min | Pause                                        |
| 02:15-03:10 | 55 min | [Phase 3 - Créer](03-creer.md)               |
| 03:10-03:25 | 15 min | Restitution croisée                          |
| 03:25-03:30 |  5 min | Débriefing et travail pour la semaine        |

### Note sur la gestion du temps

Le point de compression est la phase 3 : elle peut descendre à 40 minutes en
réduisant le périmètre des jeux demandés. Ne comprimez ni la restitution
croisée ni le débriefing, qui portent tout l'intérêt pédagogique de la séance.

## La restitution croisée

Quinze minutes, en fin de séance. Chaque personne laisse son jeu ouvert sur son
poste et va jouer à celui de quelqu'un d'autre, sans explication préalable.

Une seule question à la personne qui a joué : **quelles sont les règles de ce
jeu ?**

C'est la boucle bouclée avec l'activité des jeux de société de la séance 01.
Là, vous lisiez des règles écrites pour en déduire un diagramme. Ici, quelqu'un
lit votre programme en le jouant et tente d'en déduire vos règles. Quand
l'écart est grand, la question à se poser n'est pas _"il n'a pas compris"_ mais
_"qu'est-ce que mon programme ne dit pas clairement ?"_.

## Méthodes d'enseignement et d'apprentissage

- Démonstration commentée.
- Travail individuel guidé sur machine.
- Travail individuel autonome sur machine.
- Évaluation par les pairs sous forme de restitution croisée.
- Discussion collective de débriefing.

## Méthodes d'évaluation

Cette séance ne donne pas lieu à une note.

Le retour est immédiat et de deux natures : le programme fait ou ne fait pas ce
que vous aviez prévu, et une autre personne comprend ou ne comprend pas vos
règles en jouant.

## À faire pour la semaine suivante

- Terminer le jeu de la phase 3 s'il n'est pas fini, et en garder le lien de
  partage.
- Relire votre diagramme d'activité et le corriger pour qu'il corresponde à ce
  que votre programme fait réellement, et non à ce que vous aviez prévu.
- Écrire trois lignes : qu'est-ce que les blocs vous ont facilité, et à quel
  moment vous ont-ils gêné. Nous en parlerons en séance 03.

## Sources et liens utiles

- [MakeCode Arcade](https://arcade.makecode.com/) - l'éditeur.
- [Tutoriels officiels](https://arcade.makecode.com/tutorials) - si vous voulez
  aller plus loin de votre côté.
- [Documentation des blocs](https://arcade.makecode.com/reference) - la liste
  complète de ce qui existe.

MakeCode est publié sous licence MIT et son code source est disponible sur
GitHub ([microsoft/pxt](https://github.com/microsoft/pxt) et
[microsoft/pxt-arcade](https://github.com/microsoft/pxt-arcade)). L'éditeur en
ligne, lui, est un service hébergé par Microsoft : ce que vous y écrivez
transite par leurs serveurs. Nous n'y mettons donc rien de personnel.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
