---
marp: true
---

<!--
theme: custom-marp-theme
size: 16:9
paginate: true
author: V. Guidoux, avec l'aide de Claude
title: HEIG-VD ProgIM1 Course - Premiers pas en Java
description: Séance "Premiers pas en Java" - installation de l'environnement, machine virtuelle, types et variables - pour l'unité d'enseignement ProgIM1 enseignée à la HEIG-VD, Suisse
url: https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/03-premiers-pas-en-java/
header: "**Premiers pas en Java**"
footer: '[**HEIG-VD**](https://heig-vd.ch) - [ProgIM1 2026-2027](https://github.com/heig-vd-progim-course/heig-vd-progim1-course) - [CC BY-SA 4.0](https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md)'
headingDivider: 2
math: mathjax
-->

# Premiers pas en Java

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

Programmer sans texte, et buter sur cinq limites :

- pas de recherche ;
- pas de copier-coller ;
- pas de comparaison de versions ;
- pas de travail à deux ;
- illisible au-delà d'un écran.

**Le code professionnel est du texte.**

## Objectifs de cette séance (1/2)

À la fin de cette séance, vous devriez être capable de :

- installer IntelliJ et exécuter un programme Java ;
- expliquer ce qu'est la machine virtuelle Java.

![bg right:40%][illustration-objectifs]

## Objectifs de cette séance (2/2)

- distinguer une erreur de compilation d'une erreur d'exécution ;
- déclarer une variable avec un type adapté ;
- expliquer pourquoi `0.1 + 0.2` ne vaut pas `0.3`.

![bg right:40%][illustration-objectifs]

## Le programme de la séance

| Partie                        | Durée  |
| :---------------------------- | -----: |
| Installer son environnement    | 50 min |
| Premier programme              | 30 min |
| La machine virtuelle           | 30 min |
| Les types et les variables     | 55 min |

**Objectif non négociable de la matinée** : tout le monde repart avec IntelliJ
qui fonctionne et un Hello World qui s'exécute.

## Pourquoi Java

Ce n'est ni le plus simple, ni le plus moderne.

Il a une qualité pour apprendre : il est **explicite et sévère**. Il vous
oblige à dire le type de chaque variable, et il refuse de compiler quand
quelque chose ne colle pas.

Un langage plus permissif vous laisserait écrire la même erreur et la
découvrir six semaines plus tard.

## Ce qu'on n'installe pas

Pas de Maven, pas de Gradle, pas de gestionnaire de versions, pas de
framework.

Ces outils résolvent des problèmes que vous n'avez pas encore. Vous les verrez
en ProgIM2, quand votre projet aura de vraies dépendances.

Aujourd'hui : un IDE, un JDK, un fichier.

## Atelier - installation

<!-- _class: lead -->

Les consignes détaillées sont sur le
[support de cours][cours].

Checklist de sortie au tableau. Vous ne partez pas sans l'avoir cochée.

![bg right:40%][illustration-atelier]

## Trois choses à savoir avant de télécharger

1. **Community Edition n'existe plus.** Depuis la version 2025.3, un seul
   installateur, dont les fonctionnalités Java sont gratuites.
2. **macOS** : Apple Silicon et Intel ont deux fichiers différents. Menu
   Pomme, _"À propos de ce Mac"_.
3. **Le JDK se télécharge depuis IntelliJ.** Dans _"New Project"_, champ JDK,
   _"Download JDK..."_, version 25, vendeur Eclipse Temurin.

## Quand vous avez fini

Levez la main, je passe valider. Puis **allez aider quelqu'un**.

Vingt machines différentes, cinquante minutes : c'est la seule manière que ça
tienne.

Une personne qui repart sans environnement fonctionnel est bloquée pour cinq
séances. Ce n'est pas négociable.

## La machine virtuelle

<!-- _class: lead -->

Vous avez cliqué sur une flèche verte et du texte est apparu.

Qu'est-ce qui s'est passé entre les deux ?

## Une machine ne comprend qu'une chose

Un processeur n'exécute que du **code machine** : des suites de nombres
correspondant à des opérations élémentaires.

Personne n'écrit cela à la main depuis les années 1950.

On écrit du texte lisible, et un programme traduit. Deux familles de
traduction existent.

## Compiler

Un programme lit tout votre code et produit un exécutable, une fois pour
toutes.

- La traduction a lieu **avant** l'exécution.
- Rien n'est produit si le code est incohérent.
- Rapide, mais lié à un système et un processeur.

C'est le modèle du C et du C++.

## Interpréter

Un programme lit et exécute votre code ligne par ligne.

- La traduction a lieu **pendant** l'exécution.
- Une faute ligne 200 n'apparaît qu'en y arrivant.
- Plus lent, mais fonctionne partout où l'interpréteur existe.

C'est le modèle de Python et de JavaScript.

## Java fait les deux

Java compile, mais **pas en code machine**.

Il compile en **bytecode** : un langage intermédiaire, illisible pour vous
comme pour votre processeur, et **identique sur tous les systèmes**.

Ce bytecode est ensuite exécuté par la **machine virtuelle Java**, la JVM, qui
le traduit en code machine au moment de l'exécution.

## La chaîne complète

```text
Main.java   --javac-->   Main.class   --java-->   JVM   -->   processeur
code source              bytecode                 traduit     exécute
(vous)                   (portable)               à la volée
```

## Pourquoi cette étape en plus

Parce qu'un seul fichier compilé fonctionne partout.

Le même `.class` tourne sur votre Windows, sur le Mac d'à côté et sur un
serveur Linux, **sans être recompilé**.

C'est la promesse de Java depuis 1995 : _"write once, run anywhere"_.

Ce n'est pas la JVM qui est portable. C'est **votre programme** qui le devient.

## JDK, JRE, JVM

| Sigle | Contient                            | Pour qui              |
| :---- | :---------------------------------- | :-------------------- |
| JVM   | Le moteur qui exécute le bytecode   | Personne seule        |
| JRE   | La JVM et les bibliothèques de base | Qui veut **exécuter** |
| JDK   | Le JRE, plus `javac`                | Qui veut **écrire**   |

Vous avez installé un **JDK**. JDK contient JRE, qui contient JVM.

## Le faire à la main (1/2)

```sh
javac Bonjour.java
```

Rien ne s'affiche. En informatique, le silence veut souvent dire que tout s'est
bien passé.

Un fichier `Bonjour.class` est apparu : c'est le bytecode.

## Le faire à la main (2/2)

```sh
java Bonjour
```

```text
Bonjour tout le monde
```

Notez : `java Bonjour`, **sans extension**. Vous donnez un nom de classe, pas
un fichier.

## Les deux moments où ça casse

<!-- _class: lead -->

C'est le point à retenir de la matinée.

## Erreur de compilation

Avant le démarrage. Le compilateur a refusé de traduire.

```java
System.out.println("Bonjour")
```

```text
Casse.java:3: error: ';' expected
        System.out.println("Bonjour")
                                     ^
1 error
```

Fichier, ligne, colonne, nature du problème. **Rien ne s'est exécuté.**

## Erreur à l'exécution

Pendant que le programme tourne. Le code était cohérent, la situation ne
l'était pas.

```java
int total = 15;
int nombre = 0;
System.out.println(total / nombre);
```

```text
Exception in thread "main" java.lang.ArithmeticException: / by zero
	at Casse.main(Casse.java:5)
```

Le programme a démarré, puis s'est arrêté net.

## La distinction qui compte

|               | Compilation        | Exécution               |
| :------------ | :----------------- | :---------------------- |
| Quand         | Avant le démarrage | Pendant                 |
| Détectée par  | `javac`            | La JVM                  |
| A tourné      | Non                | Oui, jusqu'à la rupture |
| Coût          | Faible             | Élevé                   |

Un langage strict **déplace des erreurs de la droite vers la gauche**.

## Un message d'erreur n'est pas une punition

<!-- _class: lead -->

C'est une information, souvent précise et souvent exacte.

La semaine dernière, vous cherchiez un bogue **sans aucun message**.
Aujourd'hui vous avez le fichier, la ligne et la nature du problème.

C'est un luxe. Lisez-le.

## Les types et les variables

<!-- _class: lead -->

![bg right:40%][illustration-types]

## Une variable, c'est l'état de la séance 01

Dans la dictée de dessin, il fallait savoir d'où partait le crayon pour que
l'instruction suivante ait un sens.

```java
int age = 20;
```

- `int` : le **type**, ce que la variable a le droit de contenir ;
- `age` : le **nom** ;
- `20` : la **valeur**.

## `=` n'est pas le signe des maths

```java
age = age + 1;
```

Ce n'est pas une équation, ce serait faux.

C'est une **affectation** : calcule `age + 1`, et range le résultat dans
`age`.

## Pourquoi déclarer un type

```java
int age = "vingt";
```

```text
error: incompatible types: String cannot be converted to int
```

Trois secondes sur votre écran.

Dans un langage qui ne vérifie rien, le même code démarre, tourne, et plante
plus tard, ailleurs, sans indiquer d'où ça vient.

## Les huit types primitifs - entiers

| Type    | Taille  | Maximum                   |
| :------ | :------ | ------------------------: |
| `byte`  | 8 bits  | 127                       |
| `short` | 16 bits | 32 767                    |
| `int`   | 32 bits | 2 147 483 647             |
| `long`  | 64 bits | 9 223 372 036 854 775 807 |

**En pratique : `int`.** Passez à `long` au-delà de deux milliards.

## Les huit types primitifs - le reste

| Type      | Pour quoi                       |
| :-------- | :------------------------------ |
| `float`   | Virgule, 7 chiffres significatifs |
| `double`  | Virgule, 15 à 16 chiffres       |
| `char`    | Un seul caractère, `'A'`        |
| `boolean` | `true` ou `false`, rien d'autre |

**En pratique : `double`.** `String` prend une majuscule : ce n'est pas un
primitif.

## Premier piège - la division entière

```java
System.out.println(7 / 2);
System.out.println(7 % 2);
System.out.println(7.0 / 2);
```

```text
3
1
3.5
```

Deux entiers, division entière. L'opérateur `%` donne le reste.

## Le piège appliqué à nos moyennes

```java
int somme = 5 + 4 + 5;

System.out.println(somme / 3);
System.out.println((double) somme / 3);
```

```text
4
4.666666666666667
```

La première ligne est fausse et **ne produit aucune erreur**. Compile,
s'exécute, affiche un résultat plausible.

## Le vrai piège

<!-- _class: lead -->

```java
System.out.println(0.1 + 0.2);
```

```text
0.30000000000000004
```

## Ce n'est pas un bogue de Java

Vous obtiendrez la même chose en Python, en JavaScript, en C et dans votre
tableur.

Un `double` est stocké en binaire : des sommes de puissances de deux. Un demi,
un quart, un huitième.

`0.5` s'écrit exactement. `0.1` ne tombe jamais juste, il faudrait une infinité
de termes.

Même phénomène qu'un tiers en décimal : `0,3333...` ne se termine jamais.

## L'erreur s'accumule

```java
double somme = 0.1 + 0.1 + 0.1 + 0.1 + 0.1
             + 0.1 + 0.1 + 0.1 + 0.1 + 0.1;
System.out.println(somme);
```

```text
0.9999999999999999
```

Dix fois un dixième ne font pas un.

## Le cas le plus traître

```java
double total = 1.1 + 1.1 + 1.1;
System.out.println(total);
System.out.println(total == 3.3);
```

```text
3.3000000000000003
false
```

Le résultat a l'air juste au premier coup d'oeil. La comparaison répond
pourtant `false`.

## `float` ment encore mieux

```java
System.out.println(0.1f + 0.2f);
System.out.println(0.1 + 0.2);
```

```text
0.3
0.30000000000000004
```

Le `float` est si imprécis que l'affichage arrondit l'erreur.

**Un type qui cache ses erreurs est pire qu'un type qui les montre.**

## La règle

<!-- _class: lead -->

```java
System.out.println(0.1 + 0.2 == 0.3);
```

```text
false
```

**Ne comparez jamais deux nombres à virgule avec `==`.**

## Trois solutions

**Comparer à une tolérance près**

```java
Math.abs((0.1 + 0.2) - 0.3) < 1e-9   // true
```

**Arrondir à l'affichage**

```java
System.out.printf("%.2f%n", 0.1 + 0.2);   // 0.30
```

**Ne pas utiliser de virgule** : pour de l'argent, compter en centimes.

## Bonne nouvelle pour nos moyennes

Comparer une moyenne à un seuil avec `>=` fonctionne presque toujours :
l'erreur ne fait pas basculer un résultat de part et d'autre de 4.0.

C'est `==` qui casse, et l'accumulation d'un grand nombre d'additions.

Règle simple : `>=` et `<=` sur des `double`, oui. `==`, jamais.

## Conversion automatique

Quand rien ne se perd, Java la fait tout seul :

```java
int entier = 5;
double decimal = entier;   // 5.0
```

## Conversion explicite

Quand quelque chose se perd, il faut la demander :

```java
double note = 3.99;
int tronque = (int) note;  // 3, et non 4
```

Java exige le `(int)` : il refuse de jeter de l'information dans votre dos. Et
cela **tronque**, cela n'arrondit pas.

## Le dépassement de capacité

```java
System.out.println(Integer.MAX_VALUE);
System.out.println(Integer.MAX_VALUE + 1);
```

```text
2147483647
-2147483648
```

Le compteur a fait le tour. Aucune erreur, aucun avertissement, le programme
continue avec une valeur absurde.

## La concaténation, qui surprend tout le monde

```java
System.out.println("1" + 2 + 3);
System.out.println(1 + 2 + "3");
```

```text
123
33
```

Java lit de gauche à droite.

## Nommer ses variables

```java
// Correct
int studentCount = 24;
double averageGrade = 4.7;
final double PASSING_GRADE = 4.0;

// À éviter
int n = 24;
double x2 = 4.7;
```

En anglais, en camelCase, un nom qui dit **ce que la variable contient**.

## `final`, la réponse à votre bogue de la semaine dernière

En séance 02, une même valeur était écrite à deux endroits et vous n'en avez
changé qu'un.

```java
final double PASSING_GRADE = 4.0;
PASSING_GRADE = 3.0;
```

```text
error: cannot assign a value to final variable PASSING_GRADE
```

Une constante n'existe qu'à un seul endroit, et le compilateur monte la garde.

## À vous de jouer !

- Finir l'installation, et me le signaler **avant** la séance 04.
- Faire la première section de _"Learn IDE features"_.
- Afficher prénom, âge et taille avec trois types différents.
- Refaire l'exercice de la moyenne.

![bg right:40%][illustration-a-vous-de-jouer]

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
- [Illustration atelier][illustration-atelier] par
  [American Jael](https://unsplash.com/@americanjael) sur
  [Unsplash](https://unsplash.com/photos/OEvLi8LM7cc)
- [Illustration types][illustration-types] par
  [Samuel Girven](https://unsplash.com/@samuelgirven) sur
  [Unsplash](https://unsplash.com/photos/VJ2s0c20qCo)
- [Illustration à vous de jouer][illustration-a-vous-de-jouer] par
  [Tim van Cleef](https://unsplash.com/@_timvancleef) sur
  [Unsplash](https://unsplash.com/photos/1JBOZwuW7sI)

<!-- URLs -->

[presentation-web]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/03-premiers-pas-en-java/
[presentation-pdf]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/03-premiers-pas-en-java/03-premiers-pas-en-java-presentation.pdf
[cours]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/01-seances/03-premiers-pas-en-java/
[license]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md

<!-- Illustrations -->

[illustration-principale]:
	https://images.unsplash.com/photo-1517486430290-35657bdcef51?fit=crop&h=720
[illustration-objectifs]:
	https://images.unsplash.com/photo-1516389573391-5620a0263801?fit=crop&h=720
[illustration-atelier]:
	https://images.unsplash.com/photo-1712762056200-50d8f803ba10?fit=crop&h=720
[illustration-types]:
	https://images.unsplash.com/photo-1576678927484-cc907957088c?fit=crop&h=720
[illustration-a-vous-de-jouer]:
	https://images.unsplash.com/photo-1554906493-4812e307243d?fit=crop&h=720
