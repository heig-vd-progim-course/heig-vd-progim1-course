# Séance 07 - Boucles

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

!!! note "Les boucles sont à l'évaluation finale"

    L'[évaluation écrite](../../00-organisation/01-evaluation.md) a porté sur
    les séances 01 à 05. Les boucles n'y figuraient pas : elles font partie de
    l'évaluation finale, et vous en aurez besoin dans le mini-projet, dès la
    séance 08.

## Ressources annexes

- Présentation (web) :
  [Lien vers la présentation](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/07-boucles/)
- Présentation (PDF) :
  [Lien vers le PDF](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/07-boucles/07-boucles-presentation.pdf)
- Théorie : [Répéter avec `while`](01-repeter-avec-while.md)
- Activité :
  [Des boucles en chair et en os](02-activite-boucles-en-chair-et-en-os.md)
- Atelier : [Dérouler et réparer](03-atelier-derouler-et-reparer.md)
- Théorie : [`for` et `do-while`](04-for-et-do-while.md)
- Atelier : [`for` et FizzBuzz](05-atelier-for-et-fizzbuzz.md)
- Notes pour l'équipe enseignante :
  [Lien vers les notes](../../98-equipe-enseignante/07-boucles.md)

## Objectifs

En séance 06, vos programmes ont appris à décider : le losange de vos
diagrammes d'activité. Mais votre fil rouge refuse une note de 7 sans pouvoir
la redemander, et il traite exactement trois personnes de deux notes chacune.
Pour faire mieux, il faut **répéter**.

Cette séance traduit en Java la dernière structure de la séance 01 : la flèche
qui remonte, l'itération. Avec elle, vous avez les trois briques dont tout
programme est fait : séquence, sélection, itération.

À la fin de cette séance, vous devriez être capable de :

- traduire une flèche qui remonte en boucle `while` ;
- nommer les trois ingrédients d'une boucle : situation initiale, condition et
  mise à jour ;
- dérouler une boucle à la main, dans un tableau de trace ;
- dire à quel moment la condition d'une boucle est posée ;
- repérer une boucle infinie et un tour de trop ou de moins ;
- accumuler une somme et compter des éléments dans une boucle ;
- réécrire une boucle qui compte avec `for` ;
- choisir entre `for` et `while`, et reconnaître une boucle `do-while`.

## Déroulé

Quatre périodes de 45 minutes, soit 180 minutes d'enseignement, plus 30 minutes
de pause.

| Temps       |  Durée | Contenu                                                                                          |
| :---------- | -----: | :----------------------------------------------------------------------------------------------- |
| 00:00-00:10 | 10 min | [Rappel de la séance 06 : un `if` ne se répète pas](01-repeter-avec-while.md#rappel-un-if-ne-se-repete-pas) |
| 00:10-00:30 | 20 min | [Théorie - Répéter avec `while`](01-repeter-avec-while.md#remplacer-if-par-while)                 |
| 00:30-00:55 | 25 min | [Activité - Des boucles en chair et en os](02-activite-boucles-en-chair-et-en-os.md)              |
| 00:55-01:30 | 35 min | [Atelier - Dérouler et réparer](03-atelier-derouler-et-reparer.md)                                |
| 01:30-01:45 | 15 min | Pause                                                                                            |
| 01:45-02:00 | 15 min | Correction au tableau, en live coding                                                            |
| 02:00-02:20 | 20 min | [Théorie - `for` et `do-while`](04-for-et-do-while.md)                                            |
| 02:20-02:35 | 15 min | Pause                                                                                            |
| 02:35-03:20 | 45 min | [Atelier - `for` et FizzBuzz](05-atelier-for-et-fizzbuzz.md)                                      |
| 03:20-03:30 | 10 min | Correction de FizzBuzz en live coding, clôture                                                   |

### Note sur la gestion du temps

Si la séance déborde, ce sont la partie _Écrire_ du premier atelier, les
étapes 3 et 4 du fil rouge dans le second, et la partie _Jouer une boucle_ de
l'activité qui sautent. Les deux premières se terminent à la maison. La boucle
`do-while` peut se réduire à la lecture de la page.

Ce qui ne se coupe jamais : la partie _Dérouler_ du premier atelier, avec ses
tableaux de trace, et FizzBuzz. Savoir dérouler une boucle à la main, c'est ce
que la séance doit produire.

## Méthodes d'enseignement et d'apprentissage

- Présentation magistrale courte, entrecoupée de prédictions et de quiz à
  choix multiple, à faire en classe.
- Activité en mouvement : retrouver les trois cartes qui vont ensemble, puis
  jouer une boucle devant la classe.
- Ateliers individuels : dérouler sur papier, remettre des lignes dans l'ordre,
  réparer, puis écrire.
- Correction au tableau, en live coding, à partir des questions de la classe.

## Méthodes d'évaluation

Cette séance ne donne pas lieu à une note. Les boucles seront évaluées à
l'évaluation finale.

La vérification est immédiate : les quiz et les exercices de remise en ordre du
support vous disent tout de suite si vous avez juste, et la console confirme ou
contredit vos tableaux de trace.

## À faire pour la semaine suivante

- Terminer le fil rouge jusqu'à l'étape 2 de l'atelier _`for` et FizzBuzz_. Il
  sera repris en séance 08, avec les tableaux : ne venez pas sans lui.
- Faire la partie _Écrire_ du premier atelier, puis réécrire chaque programme
  avec `for`.
- Faire le tableau de trace de votre FizzBuzz quand `i` vaut 14, 15, puis 16.
- Refaire les quiz et les exercices de remise en ordre une semaine plus tard,
  sans relire la page avant.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
