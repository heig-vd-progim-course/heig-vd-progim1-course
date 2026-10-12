---
marp: true
---

<!--
theme: custom-marp-theme
size: 16:9
paginate: true
author: V. Guidoux, avec l'aide de GitHub Copilot
title: HEIG-VD ProgIM1 Course - Tableaux et fonctions avancés
description: Techniques avancées de parcours de tableaux et introduction à la récursivité pour l'unité d'enseignement ProgIM1 enseigné à la HEIG-VD, Suisse
url: https://heig-vd-progim-course.github.io/heig-vd-progim1-course/08.02-tableaux-fonctions-avances/01-supports-de-cours/index.html
header: "**Tableaux et fonctions avancés**"
footer: '[**HEIG-VD**](https://heig-vd.ch) - [ProgIM1 2025-2026](https://github.com/heig-vd-progim-course/heig-vd-progim1-course) - [CC BY-SA 4.0](https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md)'
headingDivider: 2
math: mathjax
-->

# Tableaux et fonctions avancés

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

## Objectifs (1/3)

![bg right:40%][illustration-objectifs]

À la fin de cette séance, vous devriez être capable de :

- Parcourir un tableau avec différentes stratégies (sauter des éléments, exclure
  des bornes, parcours inversé, parcours partiel).
- Choisir le type de boucle adapté à chaque situation de parcours.

## Objectifs (2/3)

![bg right:40%][illustration-objectifs]

À la fin de cette séance, vous devriez être capable de :

- Implémenter des algorithmes simples de recherche et de comptage dans des
  tableaux.
- Comprendre et appliquer le principe de la récursivité pour des cas simples
  (factorielle, Fibonacci).

## Objectifs (3/3)

![bg right:40%][illustration-objectifs]

À la fin de cette séance, vous devriez être capable de :

- Décomposer des problèmes complexes en fonctions réutilisables travaillant avec
  des tableaux.

## Parcours avec saut d'éléments (1/4)

Traiter un élément sur deux (ou plus) est utile pour :

- Analyser des données par paires
- Optimiser des traitements
- Échantillonner des données

## Parcours avec saut d'éléments (2/4)

**Approche efficace** : incrémenter l'indice de 2

```java
int[] values = {10, 20, 30, 40, 50, 60};

for (int i = 0; i < values.length; i += 2) {
    System.out.println("Élément " + i + " : " + values[i]);
}
// Affiche : 10, 30, 50
```

## Parcours avec saut d'éléments (3/4)

**Alternative** : tester le modulo de l'indice

```java
int[] values = {10, 20, 30, 40, 50, 60};

for (int i = 0; i < values.length; i++) {
    if (i % 2 == 0) { // Traite uniquement les indices pairs
        System.out.println("Élément " + i + " : " + values[i]);
    }
}
```

## Parcours avec saut d'éléments (4/4)

**Avec while** :

```java
int index = 0;
while (index < values.length) {
    System.out.println("Élément " + index + " : " + values[index]);
    index += 2; // Saut de 2 positions
}
```

## Exclusion des bornes (1/4)

Ignorer le premier et/ou dernier élément est utile pour traiter uniquement les
"valeurs intérieures".

**Exclure la première valeur** :

```java
int[] temperatures = {-5, 12, 15, 18, 14};

for (int i = 1; i < temperatures.length; i++) {
    System.out.println("Température : " + temperatures[i] + "°C");
}
```

## Exclusion des bornes (2/4)

**Exclure la dernière valeur** :

```java
for (int i = 0; i < temperatures.length - 1; i++) {
    System.out.println("Température : " + temperatures[i] + "°C");
}
```

## Exclusion des bornes (3/4)

**Exclure les deux bornes** :

```java
int[] temperatures = {-5, 12, 15, 18, 14};

for (int i = 1; i < temperatures.length - 1; i++) {
    System.out.println("Température : " + temperatures[i] + "°C");
}
// Affiche : 12, 15, 18
```

## Exclusion des bornes (4/4)

**Avec while** :

```java
int index = 1;
while (index < temperatures.length - 1) {
    System.out.println("Température : " + temperatures[index] + "°C");
    index++;
}
```

⚠️ Vérifiez toujours que le tableau contient au moins 2 éléments !

## Parcours inversé (1/3)

Traiter les éléments du dernier au premier est essentiel pour :

- Algorithmes de tri
- Recherche arrière
- Affichage en ordre décroissant

## Parcours inversé (2/3)

**Avec boucle for** :

```java
int[] scores = {85, 92, 78, 95, 88};

for (int i = scores.length - 1; i >= 0; i--) {
    System.out.println("Score " + i + " : " + scores[i]);
}
```

Attention : `scores.length - 1`, pas `scores.length` !

## Parcours inversé (3/3)

**Avec while** :

```java
int[] scores = {85, 92, 78, 95, 88};
int index = scores.length - 1;

while (index >= 0) {
    System.out.println("Score " + index + " : " + scores[index]);
    index--;
}
```

## Parcours partiel (1/3)

Parcourir une portion spécifique d'un tableau.

## Parcours partiel (2/3)

**Plage définie** :

```java
int[] data = {5, 10, 15, 20, 25, 30, 35, 40};
int start = 2;
int end = 5;

for (int i = start; i < end; i++) {
    System.out.println("Élément " + i + " : " + data[i]);
}
// Affiche : 15, 20, 25
```

## Parcours partiel (3/3)

**Parcours du milieu du tableau** :

```java
int[] values = {1, 2, 3, 4, 5, 6, 7, 8, 9};
int middle = values.length / 2;
int range = 2; // Nombre d'éléments de chaque côté

int start = middle - range;
int end = middle + range + 1;

for (int i = start; i < end && i < values.length; i++) {
    if (i >= 0) { // Protection contre indices négatifs
        System.out.println("Élément " + i + " : " + values[i]);
    }
}
```

Note : Encapsulez ces parcours complexes dans des fonctions réutilisables !

## Recherche d'un élément (1/3)

La recherche linéaire est l'opération fondamentale sur les tableaux.

## Recherche d'un élément (2/3)

**Avec boucle for** :

```java
public static int linearSearch(int[] array, int target) {
    for (int i = 0; i < array.length; i++) {
        if (array[i] == target) {
            return i; // Retourne l'indice de l'élément trouvé
        }
    }
    return -1; // Retourne -1 si l'élément n'est pas trouvé
}
```

Complexité : O(n) - dans le pire cas, parcourt tout le tableau.

## Recherche d'un élément (3/3)

**Avec while** :

```java
public static int linearSearch(int[] array, int target) {
    int index = 0;

    while (index < array.length) {
        if (array[index] == target) {
            return index;
        }
        index++;
    }

    return -1;
}
```

## Comptage d'occurrences (1/3)

Compter combien de fois une valeur apparaît dans un tableau.

## Comptage d'occurrences (2/3)

**Avec for classique** :

```java
public static int countOccurrences(int[] array, int value) {
    int count = 0;

    for (int i = 0; i < array.length; i++) {
        if (array[i] == value) {
            count++;
        }
    }

    return count;
}
```

## Comptage d'occurrences (3/3)

**Avec for-each** :

```java
public static int countOccurrences(int[] array, int value) {
    int count = 0;

    for (int element : array) {
        if (element == value) {
            count++;
        }
    }

    return count;
}
```

## Recherche du minimum (1/2)

```java
public static int findMin(int[] array) {
    int min = array[0];

    for (int i = 1; i < array.length; i++) { // avec for
        if (array[i] < min) {
            min = array[i];
        }
    }

    return min;
}
```

## Recherche du minimum (2/2)

```java
public static int findMin(int[] array) {
    int min = array[0];

    for (int value : array) { // avec for-each
        if (value < min) {
            min = value;
        }
    }

    return min;
}
```

## Recherche du maximum

```java
public static int findMax(int[] array) {
    int max = array[0];
    int index = 1;

    while (index < array.length) { // avec while
        if (array[index] > max) {
            max = array[index];
        }
        index++;
    }

    return max;
}
```

## La récursivité : principe (1/2)

Une fonction récursive s'appelle elle-même pour résoudre un problème.

**Deux parties essentielles** :

1. **Cas de base** : condition d'arrêt (évite la récursion infinie)
2. **Cas récursif** : appel à elle-même avec paramètres modifiés

## La récursivité : principe (2/2)

**Exemple simple** : compter à rebours

```java
public static void countdown(int n) {
    if (n <= 0) { // Cas de base
        System.out.println("Décollage !");
        return;
    }

    System.out.println(n);
    countdown(n - 1); // Cas récursif
}
```

## Exemple 1 : Factorielle (1/2)

La factorielle de n (n!) est le produit de tous les entiers de 1 à n.

```java
/**
 * Calcule la factorielle d'un nombre de manière récursive.
 *
 * @param n le nombre dont on veut calculer la factorielle
 * @return la factorielle de n
 */
public static long factorial(int n) {
    if (n <= 1) { // Cas de base
        return 1;
    }

    return n * factorial(n - 1); // Cas récursif
}
```

## Exemple 1 : Factorielle (2/2)

**Déroulement de `factorial(5)`** :

1. `factorial(5)` = 5 × `factorial(4)`
2. `factorial(4)` = 4 × `factorial(3)`
3. `factorial(3)` = 3 × `factorial(2)`
4. `factorial(2)` = 2 × `factorial(1)`
5. `factorial(1)` = 1 (cas de base)

## Exemple 2 : Fibonacci (1/2)

Suite de Fibonacci : 0, 1, 1, 2, 3, 5, 8, 13...

Chaque nombre est la somme des deux précédents.

```java
public static int fibonacci(int n) {
    if (n <= 1) { // Cas de base
        return n;
    }

    return fibonacci(n - 1) + fibonacci(n - 2); // Cas récursif
}
```

## Exemple 2 : Fibonacci (2/2)

**Déroulement de `fibonacci(5)`** :

```
          fib(5)
        /        \
    fib(4)      fib(3)
    /    \      /    \
fib(3) fib(2) fib(2) fib(1)
  ...    ...   ...    1
```

Résultat : **5**. Attention : Version inefficace pour grandes valeurs (recalcule
plusieurs fois les mêmes valeurs).

## Exemple 3 : Chaîne de souhaits (1/2)

Une personne souhaite une bonne journée à deux autres, qui font de même...

```java
public static void wishGoodDay(int depth, String personName) {
    if (depth <= 0) { // Cas de base
        return;
    }

    System.out.println(personName + " souhaite une bonne journée !");

    // Cas récursif
    wishGoodDay(depth - 1, personName + "-A");
    wishGoodDay(depth - 1, personName + "-B");
}
```

## Exemple 3 : Chaîne de souhaits (2/2)

**Exécution de `wishGoodDay(3, "Noor")`** :

```
Noor souhaite une bonne journée !
Noor-A souhaite une bonne journée !
Noor-A-A souhaite une bonne journée !
Noor-A-B souhaite une bonne journée !
Noor-B souhaite une bonne journée !
Noor-B-A souhaite une bonne journée !
Noor-B-B souhaite une bonne journée !
```

Propagation exponentielle : 2^depth appels !

## Récursivité vs Itération (1/2)

| Aspect      | Récursivité                       | Itération                |
| ----------- | --------------------------------- | ------------------------ |
| Lisibilité  | Souvent plus élégante et concise  | Peut être plus verbose   |
| Performance | Plus lente (appels de fonctions)  | Généralement plus rapide |
| Mémoire     | Utilise la pile d'appels          | Utilise moins de mémoire |
| Cas d'usage | Problèmes naturellement récursifs | Parcours simples         |

## Récursivité vs Itération (2/2)

**Exemple de factorielle itérative** :

```java
public static long factorialIterative(int n) {
    long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

## Quand utiliser la récursivité ? (1/2)

**Utilisez la récursivité quand** :

- Le problème est naturellement récursif (arbres, fractales, etc.)
- Le code récursif est significativement plus clair
- La profondeur de récursion reste limitée

## Quand utiliser la récursivité ? (2/2)

**Évitez la récursivité quand** :

- Une version itérative est aussi claire
- La performance est critique
- La profondeur de récursion peut être très grande

Note : La récursivité est un outil puissant, mais pas toujours la meilleure
solution !

## À vous de jouer !

![bg right:40%][illustration-a-vous-de-jouer]

- Réaliser les exercices proposés dans les [exercices][exercices].
- Explorer les exemples de code fournis.

## Questions

<!--
_class: lead
-->

## Sources

- [Illustration objectifs][illustration-objectifs] par
  [Usman Yousaf](https://unsplash.com/@usmanyousaf) sur
  [Unsplash](https://unsplash.com/photos/pTrhfmj2jDA)
- [Illustration à vous de jouer][illustration-a-vous-de-jouer] par
  [Annie Spratt](https://unsplash.com/@anniespratt) sur
  [Unsplash](https://unsplash.com/photos/QckxruozjRg)

<!-- URLs -->

[presentation-web]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/08.02-tableaux-fonctions-avances/01-supports-de-cours/index.html
[presentation-pdf]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/08.02-tableaux-fonctions-avances/01-supports-de-cours/08.02-tableaux-fonctions-avances-presentation.pdf
[cours]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/tree/main/08.02-tableaux-fonctions-avances/01-supports-de-cours
[exercices]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/tree/main/08.02-tableaux-fonctions-avances/03-exercices
[license]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md

<!-- Illustrations -->

[illustration-principale]: ./images/home.jpg
[illustration-objectifs]:
	https://images.unsplash.com/photo-1516389573391-5620a0263801?fit=crop&h=720
[illustration-a-vous-de-jouer]:
	https://images.unsplash.com/photo-1509198397868-475647b2a1e5?fit=crop&h=720
