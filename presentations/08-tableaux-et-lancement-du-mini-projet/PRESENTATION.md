---
marp: true
---

<!--
theme: custom-marp-theme
size: 16:9
paginate: true
author: V. Guidoux, avec l'aide de Claude
title: HEIG-VD ProgIM1 Course - Tableaux et lancement du mini-projet
description: Séance "Tableaux et lancement du mini-projet" - déclarer, parcourir, indice de trop, somme, minimum, maximum, et étape 1 du code secret - pour l'unité d'enseignement ProgIM1 enseignée à la HEIG-VD, Suisse
url: https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/08-tableaux-et-lancement-du-mini-projet/
header: "**Tableaux et lancement du mini-projet**"
footer: '[**HEIG-VD**](https://heig-vd.ch) - [ProgIM1 2026-2027](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/) - [CC BY-SA 4.0](https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md)'
headingDivider: 2
math: mathjax
-->

# Tableaux et lancement du mini-projet

<!--
_class: lead
_paginate: false
-->

<https://github.com/heig-vd-progim-course/heig-vd-progim1-course>

[Support de cours][cours] · [Présentation (web)][presentation-web] ·
[Présentation (PDF)][presentation-pdf]

<small>V. Guidoux, avec l'aide de Claude.</small>

<small>Ce travail est sous licence [CC BY-SA 4.0][license].</small>

## _Retrouvez plus de détails dans le support de cours_

<!-- _class: lead -->

_Cette présentation est un résumé du support de cours. Pour plus de détails,
consultez le [support de cours][cours]._

## La semaine dernière : les boucles

- La **flèche qui remonte** devient `while` : tant que la condition est vraie,
  on répète.
- Trois ingrédients : **situation initiale**, **condition**, **mise à jour**.
- La condition n'est posée qu'**au début** de chaque tour.
- Un **accumulateur** se déclare avant la boucle.
- On sait combien de tours : `for`. On ne sait pas : `while`.

## Le fil rouge, à la fin de la séance 07

<!-- _class: lead -->

Il lit autant de notes qu'il en faut, et calcule leur moyenne.

Nouvelle demande : afficher les notes **en dessous de la moyenne**.

Impossible : quand la moyenne est connue, les notes ont **disparu**.

## Objectifs de cette séance (1/2)

À la fin de cette séance, vous devriez être capable de :

- déclarer un tableau, avec ses valeurs ou avec sa seule taille ;
- lire et modifier une case par son indice, en comptant à partir de 0 ;
- parcourir un tableau sans dépasser sa dernière case ;
- lire une `ArrayIndexOutOfBoundsException` et trouver sa cause.

## Objectifs de cette séance (2/2)

- calculer une somme, une moyenne, un compte, un minimum et un maximum ;
- afficher un tableau avec `Arrays.toString` ;
- expliquer ce qu'est le `String[] args` de `main` ;
- comparer deux tableaux case par case.

## Étape 1 : une variable par note (1/2)

```java
public class Main {
    public static void main(String[] args) {
        double grade1 = 5;
        double grade2 = 6;
        double grade3 = 4;
        double grade4 = 4.5;
        double grade5 = 5.5;
```

## Étape 1 : une variable par note (2/2)

```java
        double sum = (((grade1 + grade2) + grade3) + grade4) + grade5;
        double average = sum / 5;

        System.out.println("Moyenne : " + average);
    }
}
```

`Moyenne : 5.0`

## Quiz : une sixième note

Pour passer à six notes, combien d'endroits faut-il modifier ?

A. Un : ajouter `double grade6 = ...;`

B. Deux : la déclaration et la somme

C. Trois : la déclaration, la somme et le `5` de la ligne 10

D. Aucun : Java s'adapte

## C. Trois

<!-- _class: lead -->

Oubliez le `5` de la division, et la moyenne est **fausse**, sans aucun
message d'erreur.

Pour comparer chaque note à la moyenne : cinq `if`. Avec trente notes,
trente.

## Étape 2 : un tableau (ligne 3)

```java
public class Main {
    public static void main(String[] args) {
        double[] grades = {5, 6, 4, 4.5, 5.5};

        System.out.println(grades[0]);
        System.out.println(grades[4]);
        System.out.println(grades.length);
    }
}
```

`5.0`, `5.5`, `5`

## Des cases numérotées à partir de 0

| Indice |   0 |   1 |   2 |   3 |   4 |
| :----- | --: | --: | --: | --: | --: |
| Valeur | 5.0 | 6.0 | 4.0 | 4.5 | 5.5 |

- `grades[0]` est la **première** case.
- `grades.length` vaut 5, sans parenthèses.
- La dernière case est `grades[grades.length - 1]`.
- La taille ne change plus une fois le tableau créé.

## Quiz : la case 1

Avec `double[] grades = {5, 6, 4, 4.5, 5.5};`, que vaut `grades[1]` ?

A. `5.0` - B. `6.0` - C. `4.0` - D. Une erreur

## B. `6.0`

<!-- _class: lead -->

La case 0 contient `5.0`, la case 1 contient `6.0`.

Si vous avez répondu A, vous avez compté à partir de 1.

## Étape 3 : parcourir (lignes 3, 4 et 6 à 9)

```java
public class Main {
    public static void main(String[] args) {
        double[] grades = {5, 6, 4, 4.5, 5.5};
        double sum = 0;

        for (int i = 0; i < grades.length; i++) {
            sum = sum + grades[i];
        }
        double average = sum / grades.length;

        System.out.println("Moyenne : " + average);
    }
}
```

## Le tableau de trace

| `i` | `i < grades.length` | `grades[i]` | `sum` en fin de tour |
| --: | :-----------------: | ----------: | -------------------: |
|   0 |       `true`        |         5.0 |                  5.0 |
|   1 |       `true`        |         6.0 |                 11.0 |
|   2 |       `true`        |         4.0 |                 15.0 |
|   3 |       `true`        |         4.5 |                 19.5 |
|   4 |       `true`        |         5.5 |                 25.0 |
|   5 |       `false`       |             |              on sort |

## La boucle de parcours

<!-- _class: lead -->

`for (int i = 0; i < grades.length; i++)`

Elle part de **0**, et s'arrête **avant** `grades.length`.

Six notes ? Une valeur de plus entre les accolades. Le reste s'adapte.

## Étape 4 : l'indice de trop (ligne 5)

```java
public class Main {
    public static void main(String[] args) {
        double[] grades = {5, 6, 4, 4.5, 5.5};

        for (int i = 0; i <= grades.length; i++) {
            System.out.println(grades[i]);
        }
    }
}
```

`5.0`, `6.0`, `4.0`, `4.5`, `5.5`... puis le programme s'arrête.

## Lire le message (1/2)

`ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5`

`at Main.main(Main.java:6)`

Au sixième tour, `i` vaut 5, et `5 <= 5` est vrai : Java essaie de lire
`grades[5]`, une case qui n'existe pas.

## Lire le message (2/2)

| Morceau                              | Ce qu'il dit                                       |
| :----------------------------------- | :------------------------------------------------- |
| `ArrayIndexOutOfBoundsException`     | Un indice de tableau hors des limites              |
| `Index 5 out of bounds for length 5` | L'indice 5 n'existe pas dans un tableau de 5 cases |
| `Main.java:6`                        | C'est arrivé ligne 6                               |

Le compilateur ne dit rien : l'erreur n'apparaît qu'**à l'exécution**.

## Quiz : trois cases

Un tableau a 3 cases. Quel indice provoque une
`ArrayIndexOutOfBoundsException` ?

A. `0` - B. `2` - C. `3` - D. Aucun : Java agrandit le tableau

## C. `3`

<!-- _class: lead -->

Les indices valides vont de **0 à 2**.

Un tableau ne s'agrandit **jamais**.

## Étape 5 : afficher tout le tableau (1/2)

```java
public class Main {
    public static void main(String[] args) {
        double[] grades = {5, 6, 4, 4.5, 5.5};

        System.out.println(grades);
    }
}
```

`[D@2b2fa4f7` : une sorte d'adresse, pas le contenu.

## Étape 5 : afficher tout le tableau (2/2)

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        double[] grades = {5, 6, 4, 4.5, 5.5};

        grades[2] = 5.5;
        System.out.println(Arrays.toString(grades));
    }
}
```

`[5.0, 6.0, 5.5, 4.5, 5.5]` : la case 2 a été remplacée.

## Étape 6 : créer vide, puis remplir (1/2)

```java
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int count = Integer.parseInt(IO.readln("Nombre de notes : "));
        double[] grades = new double[count];

        System.out.println(Arrays.toString(grades));
```

## Étape 6 : créer vide, puis remplir (2/2)

```java

        for (int i = 0; i < grades.length; i++) {
            grades[i] = Double.parseDouble(IO.readln("Note " + (i + 1) + " : "));
        }
        System.out.println(Arrays.toString(grades));
    }
}
```

## Un tableau neuf n'est pas vide

```text
Nombre de notes : 3
[0.0, 0.0, 0.0]
Note 1 : 4
Note 2 : 5.5
Note 3 : 6
[4.0, 5.5, 6.0]
```

- `new double[count]` : la taille vient d'une variable.
- Chaque case vaut `0.0` au départ.
- `i + 1` : la note 1 va dans la case 0.

## Étape 7 : les notes en dessous (1/2)

```java
public class Main {
    public static void main(String[] args) {
        double[] grades = {5, 6, 4, 4.5, 5.5};
        double sum = 0;

        for (int i = 0; i < grades.length; i++) {
            sum = sum + grades[i];
        }
        double average = sum / grades.length;
        System.out.println("Moyenne : " + average);
```

## Étape 7 : les notes en dessous (2/2)

```java
        for (int i = 0; i < grades.length; i++) {
            if (grades[i] < average) {
                System.out.println("En dessous : " + grades[i]);
            }
        }
    }
}
```

`Moyenne : 5.0`, `En dessous : 4.0`, `En dessous : 4.5`

## Quiz : deux boucles

Pourquoi faut-il deux boucles, et pas une seule ?

A. Un tableau ne se parcourt qu'une fois par boucle

B. Java interdit un `if` dans la boucle qui fait la somme

C. La moyenne n'est connue qu'après avoir additionné toutes les notes

D. Ce n'est pas nécessaire

## C. La moyenne arrive trop tard

<!-- _class: lead -->

Pendant la première boucle, `average` n'existe pas encore.

C'est pour cela qu'il fallait **garder** les notes.

## Activité - Des tableaux en quatuor

<!-- _class: lead -->

**Avant de rejoindre qui que ce soit, faites tourner le programme de votre
carte dans votre tête, tour par tour, en notant ce que devient chaque case.**

## Parcourir pour calculer

Toujours la même forme :

1. un résultat, déclaré **avant** la boucle ;
2. une boucle qui visite chaque case ;
3. dans la boucle, une mise à jour du résultat ;
4. après la boucle, le résultat est prêt.

## Compter (1/2)

```java
public class Main {
    public static void main(String[] args) {
        double[] grades = {5, 6, 3.5, 4.5, 3};
        int passedCount = 0;
```

## Compter (2/2)

```java
        for (int i = 0; i < grades.length; i++) {
            if (grades[i] >= 4) {
                passedCount++;
            }
        }
        System.out.println("Suffisantes : " + passedCount + " sur " + grades.length);
    }
}
```

`Suffisantes : 3 sur 5`

## Le minimum et le maximum (1/2)

On part de la **première case** : c'est la meilleure valeur vue jusqu'ici.

```java
public class Main {
    public static void main(String[] args) {
        double[] grades = {5, 6, 4, 4.5, 5.5};
        double min = grades[0];
        double max = grades[0];

        for (int i = 1; i < grades.length; i++) {
            if (grades[i] < min) {
                min = grades[i];
            }
```

## Le minimum et le maximum (2/2)

```java
            if (grades[i] > max) {
                max = grades[i];
            }
        }
        System.out.println("Minimum : " + min);
        System.out.println("Maximum : " + max);
    }
}
```

`Minimum : 4.0`, `Maximum : 6.0`

## Quiz : des températures négatives

`int[] temperatures = {-3, -8, -1, -5};`

Le programme cherche la plus haute en partant de `int max = 0;`.

A. `-1` - B. `0` - C. `-8` - D. Une erreur

## B. `0`

<!-- _class: lead -->

Aucune température n'est plus grande que 0 : `max` ne change jamais.

Il compile, s'exécute, et répond **faux**.

On part de `temperatures[0]`, jamais d'une valeur inventée.

## Le `String[] args` de `main`

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(args.length);
    }
}
```

`0`

`args` est un **tableau de `String`** : les mots tapés après le nom du
programme dans un terminal. Depuis IntelliJ, aucun.

## Atelier - Tableaux

<!-- _class: lead -->

**Avant d'exécuter un programme, écrivez sur papier le contenu du tableau à
la fin, case par case.**

## Mini-projet : Code secret

<!-- _class: lead -->

Un même jeu, construit pas à pas, de la séance 08 à la séance 11.

Tout le monde suit les mêmes étapes. Pas de partie libre.

## Le jeu

Un code secret de quatre chiffres, de 1 à 6. Dix essais pour le trouver.

À chaque essai, le jeu répond :

- combien de chiffres sont **bien placés** : bon chiffre, bonne place ;
- combien sont **mal placés** : dans le code, mais pas à cette place.

Code `1 2 3 4`, proposition `1 3 5 6` : un bien placé, un mal placé.

## Une étape par séance

- **08**, tableaux : comparer la proposition au code, compter les bien
  placés.
- **09**, tableaux à deux dimensions : les mal placés, l'historique, des
  fonctions.
- **10**, exceptions : ne plus planter sur `abc`.
- **11**, hasard et tri : un vrai code secret, un classement.
- **12**, Git : rendre son jeu.

## Questionnaires et oral

- En fin de séance, un **questionnaire** papier, à rendre rempli à la main au
  début de la suivante.
- Validé ou non : rendu à temps, et des réponses **réfléchies**, pas forcément
  justes. 2,5% chacun, 10% en tout.
- En session : un **oral**, deux questions tirées au sort, 40%. Les questions
  ressemblent à celles des questionnaires.
- Une aide extérieure se déclare dans le questionnaire. À l'oral, aucune.

## Code secret - Étape 1

<!-- _class: lead -->

**Exécutez votre programme après chaque partie, avant d'écrire la suivante.**

Ranger, comparer, jouer jusqu'à trouver.

## Le compteur qui ne repart pas de 0

<!-- _class: lead -->

Sans `wellPlaced = 0;` au début de chaque comptage : 1, puis 3, puis 7 bien
placés.

La personne trouve le code... et le jeu lui dit qu'elle a perdu.

## À vous de jouer !

- Terminer les parties 1 à 3 de l'étape 1 du code secret.
- Remplir le questionnaire 08 **à la main**, et l'apporter en séance 09.
- Terminer le fil rouge jusqu'à l'étape 2 de l'atelier.
- Refaire les quiz dans une semaine, sans relire la page avant.

## Questions

<!-- _class: lead -->

Est-ce que vous avez des questions ?

<!-- URLs -->

[presentation-web]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/08-tableaux-et-lancement-du-mini-projet/
[presentation-pdf]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/08-tableaux-et-lancement-du-mini-projet/08-tableaux-et-lancement-du-mini-projet-presentation.pdf
[cours]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/01-seances/08-tableaux-et-lancement-du-mini-projet/
[license]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
