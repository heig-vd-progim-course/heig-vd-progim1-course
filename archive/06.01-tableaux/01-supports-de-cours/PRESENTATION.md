---
marp: true
---

<!--
theme: custom-marp-theme
size: 16:9
paginate: true
author: V. Guidoux, avec l'aide de GitHub Copilot
title: HEIG-VD ProgIM1 Course - Tableaux
description: Cours sur les tableaux pour l'unité d'enseignement ProgIM1 enseigné à la HEIG-VD, Suisse
url: https://heig-vd-progim-course.github.io/heig-vd-progim1-course/06.01-tableaux/01-supports-de-cours/index.html
header: "**Tableaux**"
footer: '[**HEIG-VD**](https://heig-vd.ch) - [ProgIM1 2025-2026](https://github.com/heig-vd-progim-course/heig-vd-progim1-course) - [CC BY-SA 4.0](https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md)'
headingDivider: 2
math: mathjax
-->

# Tableaux

<!--
_class: lead
_paginate: false
-->

<https://github.com/heig-vd-progim-course/heig-vd-progim1-course>

[Support de cours][cours] · [Présentation (web)][presentation-web] ·
[Présentation (PDF)][presentation-pdf]

<small>V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).</small>

<small>Ce travail est sous licence [CC BY-SA 4.0][license].</small>

![bg brightness:2 opacity:0.2][illustration-principale]

## _Retrouvez plus de détails dans le support de cours_

<!-- _class: lead -->

_Cette présentation est un résumé du support de cours. Pour plus de détails,
consultez le [support de cours][cours]._

## Objectifs (1/2)

À la fin de cette séance, vous devriez être capable de :

- Décrire ce qu'est un tableau et ses caractéristiques en Java.
- Créer et initialiser des tableaux de types primitifs et d'objets.
- Accéder aux éléments d'un tableau par leur index.

![bg right:40%][illustration-objectifs]

## Objectifs (1/2)

À la fin de cette séance, vous devriez être capable de :

- Parcourir un tableau avec différentes structures de boucle.
- Manipuler des tableaux multidimensionnels.
- Utiliser les méthodes utilitaires de la classe `Arrays`.

![bg right:40%][illustration-objectifs]

## Introduction aux tableaux

**Sans tableau :**

```java
double note1 = 5.5;
double note2 = 4.0;
double note3 = 5.0;
double note4 = 4.5;
double note5 = 6.0;
```

**Avec un tableau :**

```java
double[] notes = {5.5, 4.0, 5.0, 4.5, 6.0};
```

## Pourquoi utiliser des tableaux ?

- Code plus concis et lisible.
- Possibilité de parcourir les données avec des boucles.
- Facilité de manipulation de grandes quantités de données.
- Organisation logique des données liées.

**Exemple concret :** Stocker les températures relevées chaque jour de la
semaine, les noms des étudiants d'une classe, ou les scores d'un joueur.

## Déclaration et initialisation (1/2)

**Avec valeurs initiales :**

```java
int[] numbers = {10, 20, 30, 40, 50};
String[] fruits = {"pomme", "banane", "orange"};
```

**Avec taille spécifiée :**

```java
int[] temperatures = new int[5];     // {0, 0, 0, 0, 0}
String[] names = new String[3];      // {null, null, null}
```

## Déclaration et initialisation (2/2)

**Déclaration suivie d'initialisation :**

```java
double[] prices;
prices = new double[]{9.99, 19.99, 29.99};
```

## Accès aux éléments (1/2)

Les éléments sont accessibles par leur index, qui commence à zéro :

```java
String[] days = {"lundi", "mardi", "mercredi", "jeudi", "vendredi"};

String firstDay = days[0];      // "lundi"
String thirdDay = days[2];      // "mercredi"

days[1] = "MARDI";              // Modification
```

## Accès aux éléments (2/2)

**Représentation du tableau :**

| Index | Valeur       |
| ----- | ------------ |
| 0     | `"lundi"`    |
| 1     | `"mardi"`    |
| 2     | `"mercredi"` |
| 3     | `"jeudi"`    |
| 4     | `"vendredi"` |

## Taille d'un tableau avec `length`

```java
int[] numbers = {10, 20, 30, 40};
int size = numbers.length;  // 4

// Accès au dernier élément
int lastNumber = numbers[numbers.length - 1];  // 40

String[] fruits = {"pomme", "banane"};
String fruit = fruits[5];  // Erreur !
```

**Attention :** Accéder à un index inexistant provoque une erreur
`ArrayIndexOutOfBoundsException`.

## Parcourir un tableau - Boucle for classique (1/2)

Idéale pour connaître l'index de chaque élément :

```java
String[] fruits = {"pomme", "banane", "orange", "kiwi"};

for (int i = 0; i < fruits.length; i++) {
    System.out.println("Fruit " + i + " : " + fruits[i]);
}
```

## Parcourir un tableau - Boucle for classique (2/2)

Permet de modifier les éléments :

```java
int[] numbers = {1, 2, 3, 4, 5};

for (int i = 0; i < numbers.length; i++) {
    numbers[i] = numbers[i] * 2;
}
```

## Parcourir un tableau - Boucle for-each

Plus concise pour parcourir tous les éléments sans modification :

```java
String[] cities = {"Yverdon", "Lausanne", "Genève"};

for (String city : cities) {
    System.out.println(city);
}
```

**Se lit :** "pour chaque `city` dans `cities`"

**Attention :** Ne permet pas de modifier les éléments du tableau.

## Tableaux multidimensionnels (1/2)

Un tableau de tableaux, souvent visualisé comme une grille :

```java
String[][] grid = {
    {"A0", "A1", "A2"},
    {"B0", "B1", "B2"},
    {"C0", "C1", "C2"}
};

String bTwo = grid[1][2];  // "B2"
String cZero = grid[2][0];   // "C0"

// grid[Ligne][Colonne]
```

## Tableaux multidimensionnels (2/2)

**Visualisation :**

|       | Col 0 | Col 1 | Col 2 |
| ----- | ----- | ----- | ----- |
| Row 0 | A0    | A1    | A2    |
| Row 1 | B0    | B1    | B2    |
| Row 2 | C0    | C1    | C2    |

## Parcourir un tableau 2D - Boucles imbriquées

```java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

for (int row = 0; row < matrix.length; row++) {
    for (int col = 0; col < matrix[row].length; col++) {
        System.out.print(matrix[row][col] + " ");
    }
    System.out.println();
}
```

**Résultat :**

```text
1 2 3
4 5 6
7 8 9
```

## La classe Arrays (1/2)

La classe `java.util.Arrays` fournit des méthodes utilitaires :

```java
import java.util.Arrays;
```

**Affichage :**

```java
int[] numbers = {5, 2, 8, 1, 9};
System.out.println(Arrays.toString(numbers));
// Affiche : [5, 2, 8, 1, 9]
```

## La classe Arrays (2/2)

**Tri :**

```java
Arrays.sort(numbers);
System.out.println(Arrays.toString(numbers));
// Affiche : [1, 2, 5, 8, 9]
```

## Autres méthodes utiles (1/2)

**Copie :**

```java
int[] original = {1, 2, 3, 4, 5};
int[] copy = Arrays.copyOf(original, original.length);
```

**Remplissage :**

```java
int[] numbers = new int[5];
Arrays.fill(numbers, 7);
// Résultat : [7, 7, 7, 7, 7]
```

## Autres méthodes utiles (2/2)

**Comparaison :**

```java
int[] array1 = {1, 2, 3};
int[] array2 = {1, 2, 3};
System.out.println(Arrays.equals(array1, array2));  // true
```

<!-- ## Limites des tableaux

**Limitations principales :**

- Taille fixe : impossible de changer la taille après création.
- Pas de méthodes pratiques pour ajouter, supprimer ou rechercher des éléments.
- Types homogènes uniquement.

**Quand utiliser des tableaux :**

- Taille connue à l'avance et constante.
- Performance critique (vitesse et mémoire).
- Structures mathématiques (matrices, vecteurs).

**Alternative :** Collections Java (`ArrayList`, `LinkedList`, etc.) pour plus
de flexibilité.

## Points clés à retenir

- Un tableau a une **taille fixe** définie à sa création.
- Les indices commencent à **zéro** et vont jusqu'à `length - 1`.
- Plusieurs types de **boucles** permettent de parcourir un tableau.
- Les tableaux **multidimensionnels** représentent des grilles et matrices.
- La classe **`Arrays`** fournit des méthodes utilitaires.
- Les tableaux sont **efficaces** mais **peu flexibles**.

![bg right:40%][illustration-conclusion] -->s

## À vous de jouer !

- Relire le support de cours.
- Explorer les exemples de code.
- Faire les exercices.
- Poser des questions si nécessaire.

**La programmation s'apprend par la pratique !** **N'hésitez pas à créer vos
propres exercices.**

![bg right:40%][illustration-a-vous-de-jouer]

## Questions

<!-- _class: lead -->

Est-ce que vous avez des questions ?

## Sources

- [Illustration objectifs][illustration-objectifs] par
  [Aline de Nadai](https://unsplash.com/@alinedenadai) sur
  [Unsplash](https://unsplash.com/photos/j6brni7fpvs)
- [Illustration conclusion][illustration-conclusion] par
  [Nick Fewings](https://unsplash.com/@jannerboy62) sur
  [Unsplash](https://unsplash.com/photos/four-lego-toy-minifigs-HtBlQdxfG9k)
- [Illustration à vous de jouer][illustration-a-vous-de-jouer] par
  [Nikita Kachanovsky](https://unsplash.com/@nkachanovskyyy) sur
  [Unsplash](https://unsplash.com/photos/FJFPuE1MAOM)

<!-- URLs -->

[presentation-web]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/06.01-tableaux/01-supports-de-cours/index.html
[presentation-pdf]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/06.01-tableaux/01-supports-de-cours/06.01-tableaux-presentation.pdf
[cours]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/tree/main/06.01-tableaux/01-supports-de-cours
[license]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md

<!-- Illustrations -->

[illustration-principale]:
	https://images.unsplash.com/photo-1578662996442-48f60103fc96?fit=crop&h=720
[illustration-objectifs]:
	https://images.unsplash.com/photo-1516389573391-5620a0263801?fit=crop&h=720
[illustration-conclusion]:
	https://images.unsplash.com/photo-1611604548018-d56bbd85d681?fit=crop&h=720
[illustration-a-vous-de-jouer]:
	https://images.unsplash.com/photo-1509198397868-475647b2a1e5?fit=crop&h=720
