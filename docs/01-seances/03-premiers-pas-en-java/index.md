# Séance 03 - Premiers pas en Java

V. Guidoux, avec l'aide de Claude.

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Ressources annexes

- Présentation (web) :
  [Lien vers la présentation](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/03-premiers-pas-en-java/)
- Présentation (PDF) :
  [Lien vers le PDF](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/03-premiers-pas-en-java/03-premiers-pas-en-java-presentation.pdf)
- Atelier : [Installer son environnement](01-installer-son-environnement.md)
- Théorie :
  [La machine virtuelle et la compilation](02-machine-virtuelle-et-compilation.md)
- Théorie : [Les types et les variables](03-types-et-variables.md)

## Objectifs

En séance 02, vous avez programmé en assemblant des blocs, et vous avez buté
sur leurs limites. Cette séance installe l'outil que vous utiliserez jusqu'à la
fin du semestre, et pose les deux notions sans lesquelles rien de ce qui suit
n'a de sens : ce qui exécute votre code, et ce que contiennent vos variables.

À la fin de cette séance, vous devriez être capable de :

- installer et lancer IntelliJ IDEA sur votre machine ;
- compiler et exécuter un programme Java, depuis l'IDE et depuis le terminal ;
- expliquer ce qu'est la machine virtuelle Java et à quoi elle sert ;
- distinguer le code source, le bytecode et le code machine ;
- expliquer la différence entre une erreur de compilation et une erreur à
  l'exécution ;
- déclarer une variable en choisissant un type adapté ;
- citer les huit types primitifs de Java et dire à quoi sert chacun ;
- expliquer pourquoi `0.1 + 0.2` ne vaut pas `0.3`, et quoi faire en
  conséquence.

## Déroulé

Quatre périodes de 45 minutes, soit 180 minutes d'enseignement, plus 30 minutes
de pause.

| Temps       | Durée  | Contenu                                                  |
| :---------- | -----: | :------------------------------------------------------- |
| 00:00-00:10 | 10 min | Rappel de la séance 02 et cadrage                         |
| 00:10-01:00 | 50 min | [Atelier - Installer son environnement](01-installer-son-environnement.md) |
| 01:00-01:30 | 30 min | Premier programme : Hello World                           |
| 01:30-01:45 | 15 min | Pause                                                     |
| 01:45-02:15 | 30 min | [Théorie - La machine virtuelle et la compilation](02-machine-virtuelle-et-compilation.md) |
| 02:15-02:30 | 15 min | Pause                                                     |
| 02:30-03:25 | 55 min | [Théorie et atelier - Les types et les variables](03-types-et-variables.md) |
| 03:25-03:30 |  5 min | Clôture et travail pour la semaine suivante               |

### Note sur la gestion du temps

**Le seul objectif non négociable des deux premières périodes : tout le monde
repart avec IntelliJ qui fonctionne et un Hello World qui s'exécute.** Si
l'installation prend les deux périodes entières, c'est acceptable : la théorie
de l'après-midi peut être raccourcie, pas l'inverse. Une personne qui repart
sans environnement fonctionnel est bloquée pour cinq séances.

Le point de compression de l'après-midi est la partie sur les conversions de
types, qui sera de toute façon revue en séance 05.

## Pourquoi Java, et pourquoi pas autre chose

C'est le langage de l'unité d'enseignement, et de la suivante. Ce n'est ni le
plus simple, ni le plus moderne, ni celui que vous utiliserez forcément plus
tard.

Il a une qualité qui compte pour apprendre : il est **explicite et sévère**. Il
vous oblige à dire le type de chaque variable, et il refuse de compiler quand
quelque chose ne colle pas. Un langage plus permissif vous laisserait écrire la
même erreur et la découvrir six semaines plus tard. Ce que vous apprendrez ici
se transpose à presque tous les langages que vous rencontrerez.

## Ce que nous n'installons pas

Pas de Maven, pas de Gradle, pas de gestionnaire de versions de Java, pas de
framework. Ces outils résolvent des problèmes que vous n'avez pas encore.

Vous les verrez en ProgIM2, quand votre projet aura des dépendances externes et
que la question se posera réellement.

## Méthodes d'enseignement et d'apprentissage

- Atelier d'installation guidé, en entraide.
- Démonstration commentée.
- Présentation magistrale courte.
- Manipulation individuelle avec vérification immédiate.

## Méthodes d'évaluation

Cette séance ne donne pas lieu à une note.

La vérification est binaire et immédiate : votre programme compile et affiche
ce qui est attendu, ou non.

## À faire pour la semaine suivante

- Si votre installation n'est pas terminée, la finir et me le signaler avant la
  séance 04. Ne venez pas en séance 04 sans environnement fonctionnel.
- Faire le parcours _"Learn IDE features"_ d'IntelliJ, première section.
  Vingt minutes, et vous gagnerez des heures sur le semestre.
- Écrire un programme qui affiche votre prénom, votre âge et votre taille en
  mètres, en utilisant trois variables de trois types différents.
- Relire la page sur les types, en particulier la partie sur la virgule
  flottante.

<!-- URLs -->

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
