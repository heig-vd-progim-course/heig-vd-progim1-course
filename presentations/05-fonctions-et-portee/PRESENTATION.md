---
marp: true
---

<!--
theme: custom-marp-theme
size: 16:9
paginate: true
author: V. Guidoux, avec l'aide de Claude
title: HEIG-VD ProgIM1 Course - Fonctions et portée des variables
description: Séance "Fonctions et portée des variables" - paramètres, valeur de retour, portée - pour l'unité d'enseignement ProgIM1 enseignée à la HEIG-VD, Suisse
url: https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/05-fonctions-et-portee/
header: "**Fonctions et portée des variables**"
footer: '[**HEIG-VD**](https://heig-vd.ch) - [ProgIM1 2026-2027](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/) - [CC BY-SA 4.0](https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md)'
headingDivider: 2
math: mathjax
-->

# Fonctions et portée des variables

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

## La semaine dernière

Tout problème se pose en trois colonnes.

| Entrées         | Traitement              | Sortie        |
| :-------------- | :---------------------- | :------------ |
| Ce qu'il reçoit | Ce qu'il calcule        | Ce qu'il rend |
| Deux notes      | `(grade1 + grade2) / 2` | La moyenne    |

Puis : `IO.readln`, `Double.parseDouble`, `printf`, `Math.round`.

## Objectifs de cette séance (1/2)

À la fin de cette séance, vous devriez être capable de :

- relier entrées, traitement, sortie aux paramètres, au corps et au retour ;
- nommer chaque partie d'une fonction ;
- distinguer un paramètre d'un argument.

## Objectifs de cette séance (2/2)

- écrire et appeler une fonction ;
- prédire ce qu'affiche un programme qui appelle des fonctions ;
- expliquer où une variable existe ;
- diagnostiquer une erreur de portée.

## Le programme de la séance

| Partie                                       |  Durée |
| :------------------------------------------- | -----: |
| Rappel : entrées, traitement, sortie         | 15 min |
| Écrire et appeler une fonction               | 45 min |
| Une fonction en appelle une autre, la portée | 25 min |
| Atelier - prédire et réparer                 | 30 min |
| Atelier - le fil rouge en fonctions          | 50 min |
| Discussion                                   | 15 min |

## Les trois colonnes deviennent une fonction

<!-- _class: lead -->

| Entrées        | Traitement | Sortie               |
| :------------- | :--------- | :------------------- |
| **paramètres** | **corps**  | **valeur de retour** |

Une fonction, ce sont les trois colonnes, pour un **morceau** de programme.

## Remplacer par la valeur

<!-- _class: lead -->

Avant d'exécuter une ligne, Java **remplace chaque variable par sa valeur**.

Puis il calcule, puis il exécute.

## Une variable ou sa valeur : même résultat

```java
public class Main {
    public static void main(String[] args) {
        double grade = 4.5;
        System.out.println(grade);
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(4.5);
    }
}
```

## Un calcul, pas à pas

`double average = (grade1 + grade2) / 2;` avec `grade1` à 4.5 et `grade2` à 5.0

| Étape                   | Ce que Java a devant lui |
| :---------------------- | :----------------------- |
| La ligne écrite         | `(grade1 + grade2) / 2`  |
| Remplacer les variables | `(4.5 + 5.0) / 2`        |
| Calculer la parenthèse  | `9.5 / 2`                |
| Calculer la division    | `4.75`                   |

## La valeur au moment de la ligne (1/2)

```java
public class Main {
    public static void main(String[] args) {
        double a = 4.0;
        double b = a;
        a = 6.0;
        System.out.println(a);
        System.out.println(b);
    }
}
```

Prédisez les deux lignes.

## La valeur au moment de la ligne (2/2)

`6.0` puis `4.0`.

- Ligne 4 : `a` est remplacée par `4.0`, la ligne devient `double b = 4.0;`.
- `b` reçoit une **copie**, pas un lien vers `a`.
- À gauche du `=`, pas de remplacement : dans `age = age + 1;`, seul le `age` de
  droite devient une valeur.

## Un appel aussi est remplacé

`Math.sqrt(16) + 1` → `4.0 + 1` → `5.0`

- Une **variable** est remplacée par sa valeur.
- Un **appel** est remplacé par ce qu'il rend.

## Vous utilisez déjà des fonctions

| Appel                       | On lui donne | Elle rend   |
| :-------------------------- | :----------- | :---------- |
| `Double.parseDouble("4.5")` | un `String`  | `4.5`       |
| `Math.round(4.6)`           | un nombre    | `5`         |
| `Math.sqrt(16)`             | un nombre    | `4.0`       |
| `IO.readln("Note : ")`      | une question | un `String` |

Vous ne savez pas **comment** elles font. Vous savez quoi leur donner, et ce
qu'elles rendent.

## Décortiquer l'arrondi au dixième

<!-- _class: lead -->

`Math.round(average * 10) / 10.0`

La ligne du fil rouge, morceau par morceau.

## `Math.round` : l'entier le plus proche

| Appel             | Rend |
| :---------------- | ---: |
| `Math.round(4.4)` |  `4` |
| `Math.round(4.5)` |  `5` |
| `Math.round(4.6)` |  `5` |

- Rend un **entier** (`long`) : plus aucune décimale.
- N'arrondit **qu'à l'unité**. Or on veut 4.75 → 4.8.

## L'astuce : déplacer la virgule

1. **Décaler** la virgule : les dixièmes deviennent des unités.
2. **Arrondir** à l'unité avec `Math.round`.
3. **Remettre** la virgule à sa place.

Deux exemples : **4.75** (la moyenne de Noah) et **4.32**.

## Étape 1 : décaler la virgule

`average * 10`

| `average` | `average * 10` |
| --------: | -------------: |
|    `4.75` |         `47.5` |
|    `4.32` |         `43.2` |

Le chiffre des dixièmes, 7 ou 3, devient le chiffre des unités.

## Étape 2 : arrondir à l'entier

`Math.round(average * 10)`

|  Avant | `Math.round(...)` |
| -----: | ----------------: |
| `47.5` |              `48` |
| `43.2` |              `43` |

47.5 est pile au milieu : il monte. 43.2 est plus près de 43.

## Étape 3 : remettre la virgule

`Math.round(average * 10) / 10.0`

| Avant | `... / 10.0` |
| ----: | -----------: |
|  `48` |        `4.8` |
|  `43` |        `4.3` |

4.75 → 47.5 → 48 → **4.8**. 4.32 → 43.2 → 43 → **4.3**.

## Une étape par ligne

```java
public class Main {
    public static void main(String[] args) {
        double average = 4.75;

        double timesTen = average * 10;
        long roundedTimesTen = Math.round(timesTen);
        double rounded = roundedTimesTen / 10.0;

        System.out.println(timesTen);
        System.out.println(roundedTimesTen);
        System.out.println(rounded);
    }
}
```

## Une étape par ligne : la sortie

| `average` | `timesTen` | `roundedTimesTen` | `rounded` |
| --------: | ---------: | ----------------: | --------: |
|    `4.75` |     `47.5` |              `48` |     `4.8` |
|    `4.32` |     `43.2` |              `43` |     `4.3` |

`Math.round(average * 10) / 10.0` fait la même chose en une ligne : les
parenthèses d'abord, puis l'appel, puis la division.

## Pourquoi `10.0` et pas `10`

```java
public class Main {
    public static void main(String[] args) {
        long roundedTimesTen = Math.round(4.75 * 10);
        System.out.println(roundedTimesTen / 10.0);
        System.out.println(roundedTimesTen / 10);
    }
}
```

`4.8` puis `4`. Un `long` divisé par l'entier `10` : **division entière**.

Retenez ce `4`.

## Le problème : copier un calcul

```java
public class Main {
    public static void main(String[] args) {
        double averageNoah = (5.5 + 4.0) / 2;
        double roundedNoah = Math.round(averageNoah * 10) / 10.0;
        double averageLou = (4.5 + 5.0) / 2;
        double roundedLou = Math.round(averageLou * 10) / 10;
        System.out.println("Noah : " + roundedNoah);
        System.out.println("Lou : " + roundedLou);
    }
}
```

`Noah : 4.8`, `Lou : 4.0`. Même moyenne, 4.75. Ligne 6 : un `.0` perdu.

## Écrire une fonction : lignes 2 à 4

```java
public class Main {
    public static double roundToTenth(double value) {
        return Math.round(value * 10) / 10.0;
    }

    public static void main(String[] args) {
        double averageNoah = (5.5 + 4.0) / 2;
        double averageLou = (4.5 + 5.0) / 2;
        System.out.println("Noah : " + roundToTenth(averageNoah));
        System.out.println("Lou : " + roundToTenth(averageLou));
    }
}
```

## L'ordre d'exécution

1. `main` démarre et calcule les moyennes.
2. `roundToTenth(averageNoah)` : `main` **se met en pause**.
3. La valeur de `averageNoah` est **copiée** dans `value`.
4. `return` rend 4.8 et **termine** `roundToTenth`.
5. `main` reprend : l'appel est remplacé par 4.8.

Le calcul n'est écrit qu'une fois. La fonction est **à côté** de `main`.

## Le vocabulaire : l'en-tête et le corps

| Morceau          | Nom                  |
| :--------------- | :------------------- |
| `public static`  | modificateurs        |
| `double`         | type de retour       |
| `roundToTenth`   | nom                  |
| `(double value)` | paramètres           |
| `{ ... }`        | corps                |
| `return ...;`    | instruction `return` |

## Le vocabulaire : l'appel

| Morceau                     | Nom              |
| :-------------------------- | :--------------- |
| `roundToTenth(averageNoah)` | appel            |
| `averageNoah`               | **argument**     |
| ce que vaut l'appel         | valeur de retour |

- **Paramètre** : la variable de l'en-tête, `value`.
- **Argument** : la valeur donnée à l'appel, `averageNoah`.

## La signature

Le **nom** et les **types des paramètres** : `roundToTenth(double)`

- Ni le type de retour, ni les noms, ni `public static`.
- Définition officielle de Java. Beaucoup de tutoriels appellent _"signature"_
  toute la première ligne.

Fonction ou **méthode** ? En Java, officiellement : méthode.

## L'ordre compte, les noms non (1/2)

```java
public class Main {
    public static double walkingMinutes(double distanceKm,
                                        double speedKmh) {
        return (distanceKm / speedKmh) * 60;
    }

    public static void main(String[] args) {
        System.out.println(walkingMinutes(10, 5));
        System.out.println(walkingMinutes(5, 10));
    }
}
```

Prédisez les deux lignes.

## L'ordre compte, les noms non (2/2)

```text
120.0
30.0
```

10 km à 5 km/h : 2 h, soit 120 min. 5 km à 10 km/h : 30 min.

Le premier argument va dans le premier paramètre. Java ne regarde **que la
position**.

Arguments inversés : ça compile, et c'est faux. D'où des noms qui disent l'unité
: `distanceKm`, pas `a`.

## Le compilateur vérifie type et nombre

Mauvais type, `roundToTenth("Virginie")` :

`error: incompatible types: String cannot be converted to double`

Mauvais nombre, `walkingMinutes(10)` :

`error: method walkingMinutes in class Main cannot be applied to given types;`

Messages complets dans le support.

## `return`

- Rend une valeur **et termine** la fonction.
- Code après `return` : `error: unreachable statement`.
- Pas de `return` : `error: missing return statement`.
- `void` : la fonction ne rend rien. Comme `main`.

## La valeur rendue ignorée (1/2)

```java
public class Main {
    public static double roundToTenth(double value) {
        return Math.round(value * 10) / 10.0;
    }

    public static void main(String[] args) {
        double average = (3.3 + 4.6) / 2;
        roundToTenth(average);
        System.out.println("Moyenne : " + average);
    }
}
```

Prédisez.

## La valeur rendue ignorée (2/2)

`Moyenne : 3.9499999999999997`

Ça compile. La fonction a rendu 4.0, et personne ne l'a récupéré.

Elle ne modifie **pas** `average`. Il faut ranger le résultat :

`double rounded = roundToTenth(average);`

## Afficher n'est pas rendre

<!-- _class: lead -->

`println` montre une valeur **à une personne**.

`return` donne une valeur **au programme**.

Une fonction de calcul rend son résultat. Elle ne l'affiche pas.

## Une fonction en appelle une autre

```java
public class Main {
    public static double roundToTenth(double value) {
        return Math.round(value * 10) / 10.0;
    }

    public static double computeAverage(double grade1, double grade2) {
        return roundToTenth((grade1 + grade2) / 2);
    }

    public static void main(String[] args) {
        System.out.println(computeAverage(3.3, 4.6));
    }
}
```

## Chacune attend l'autre

`main` appelle `computeAverage`, qui appelle `roundToTenth`.

Chacune se met en pause jusqu'à ce que celle qu'elle a appelée ait rendu sa
valeur.

`main` finit par ne plus faire que **lire, appeler, afficher**.

## La portée : ça compile ?

```java
public class Main {
    public static double computeAverage(double grade1, double grade2) {
        double average = (grade1 + grade2) / 2;
        return average;
    }

    public static void main(String[] args) {
        computeAverage(4.5, 5.0);
        System.out.println(average);
    }
}
```

## Non

<!-- _class: lead -->

`Main.java:9: error: cannot find symbol`

`symbol: variable average`

`average` existe, mais dans `computeAverage`. Pas dans `main`.

## La règle

Une variable existe **de sa déclaration à l'accolade fermante de son bloc**.

- Une variable déclarée dans une fonction est **locale** à cette fonction.
- Un paramètre est une variable locale.
- Ce qui entre passe par un **paramètre**.
- Ce qui sort passe par **`return`**.

## Le même nom, deux variables : prédisez

```java
public class Main {
    public static double addBonus(double grade) {
        grade = grade + 0.5;
        return grade;
    }

    public static void main(String[] args) {
        double grade = 4.0;
        double withBonus = addBonus(grade);
        System.out.println(grade + " " + withBonus);
    }
}
```

## Bien découper

- Une fonction, une tâche.
- Un nom qui est un **verbe** : `computeAverage`, `roundToTenth`.
- Une fonction de calcul ne lit pas et n'affiche pas.
- Un rectangle _"Calculer ..."_ du diagramme est une fonction toute trouvée.

## Atelier - découper en fonctions

<!-- _class: lead -->

**Une fonction de calcul ne lit rien au clavier et n'affiche rien.**

## Le déroulé de l'atelier

1. **Prédire** : quatre programmes, prédiction écrite avant d'exécuter.
2. **Réparer** : trois bugs placés exprès.
3. **Le fil rouge en fonctions** : tester les fonctions seules, brancher la
   saisie, puis un groupe de trois personnes.
4. **Provoquer** l'erreur de portée dans votre propre code.

## À vous de jouer !

- Terminer le fil rouge en fonctions, étape 3 comprise.
- Au moins deux extensions, avec leur tableau de tests.
- Pour chaque cas non couvert de la séance 04 : dans quelle fonction le vérifier
  ?

## Questions

<!-- _class: lead -->

Est-ce que vous avez des questions ?

<!-- URLs -->

[presentation-web]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/05-fonctions-et-portee/
[presentation-pdf]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/presentations/05-fonctions-et-portee/05-fonctions-et-portee-presentation.pdf
[cours]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/01-seances/05-fonctions-et-portee/
[license]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
