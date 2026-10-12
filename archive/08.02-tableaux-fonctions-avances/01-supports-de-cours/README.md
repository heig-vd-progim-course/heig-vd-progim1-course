# Tableaux et fonctions avancés - Supports de cours

V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Ressources annexes

- Objectifs, méthodes d'enseignement et d'apprentissage, et méthodes
  d'évaluation : [Lien vers le contenu](..)
- Supports de cours : [Lien vers le contenu](../01-supports-de-cours/README.md)
  ·
  [Presentation (web)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/08.02-tableaux-fonctions-avances/01-supports-de-cours/index.html)
  ·
  [Presentation (PDF)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/08.02-tableaux-fonctions-avances/01-supports-de-cours/08.02-tableaux-fonctions-avances-presentation.pdf)
- Exemples de code : [Lien vers le contenu](../02-exemples-de-code/)
- Exercices : [Lien vers le contenu](../03-exercices/README.md)

## Introduction

Maintenant que vous maîtrisez les bases des tableaux et des fonctions, nous
allons explorer des stratégies de parcours plus avancées et découvrir la
récursivité. Ces techniques vous permettront de résoudre des problèmes plus
complexes de manière élégante et efficace.

À l'issue de cette séance de cours, vous serez capable de :

- Parcourir un tableau avec différentes stratégies (sauter des éléments, exclure
  des bornes, parcours inversé, parcours partiel).
- Choisir le type de boucle adapté à chaque situation de parcours.
- Implémenter des algorithmes simples de recherche et de comptage dans des
  tableaux.
- Comprendre et appliquer le principe de la récursivité pour des cas simples
  (factorielle, Fibonacci).
- Décomposer des problèmes complexes en fonctions réutilisables travaillant avec
  des tableaux.

## Stratégies de parcours de tableaux

### Parcours avec saut d'éléments

Il arrive souvent de vouloir parcourir un tableau en ne considérant qu'un
élément sur deux, ou sur trois, etc. Cette technique est utile pour traiter des
données par paires, analyser des échantillons, ou optimiser des traitements.

#### Avec accès direct par indice

```java
int[] values = {10, 20, 30, 40, 50, 60};

// Parcours en sautant un élément sur deux
for (int i = 0; i < values.length; i += 2) {
    System.out.println("Élément " + i + " : " + values[i]);
}
// Affiche : 10, 30, 50
```

#### Avec boucle while

```java
int[] values = {10, 20, 30, 40, 50, 60};
int index = 0;

while (index < values.length) {
    System.out.println("Élément " + index + " : " + values[index]);
    index += 2; // Saut de 2 positions
}
```

#### Avec boucle for classique (alternative)

```java
int[] values = {10, 20, 30, 40, 50, 60};

for (int i = 0; i < values.length; i++) {
    if (i % 2 == 0) { // Traite uniquement les indices pairs
        System.out.println("Élément " + i + " : " + values[i]);
    }
}
```

> [!TIP]
>
> L'approche avec `i += 2` est plus efficace que celle avec `i % 2 == 0` car
> elle évite des itérations inutiles.

### Parcours en excluant les bornes

Dans certains cas, on souhaite ignorer le premier et/ou le dernier élément d'un
tableau. Cela peut être utile pour traiter les "valeurs intérieures" d'un
ensemble de données.

#### Exclusion de la première valeur

```java
int[] temperatures = {-5, 12, 15, 18, 14};

// Parcours à partir de l'indice 1
for (int i = 1; i < temperatures.length; i++) {
    System.out.println("Température : " + temperatures[i] + "°C");
}
```

#### Exclusion de la dernière valeur

```java
int[] temperatures = {-5, 12, 15, 18, 14};

// Parcours jusqu'à length - 1
for (int i = 0; i < temperatures.length - 1; i++) {
    System.out.println("Température : " + temperatures[i] + "°C");
}
```

#### Exclusion des deux bornes

```java
int[] temperatures = {-5, 12, 15, 18, 14};

// Parcours de l'indice 1 jusqu'à length - 1
for (int i = 1; i < temperatures.length - 1; i++) {
    System.out.println("Température : " + temperatures[i] + "°C");
}
// Affiche : 12, 15, 18
```

#### Avec boucle while

```java
int[] temperatures = {-5, 12, 15, 18, 14};
int index = 1;

while (index < temperatures.length - 1) {
    System.out.println("Température : " + temperatures[index] + "°C");
    index++;
}
```

> [!IMPORTANT]
>
> Vérifiez toujours que le tableau contient suffisamment d'éléments avant
> d'exclure les bornes. Un tableau de moins de 2 éléments pourrait causer des
> problèmes.

### Parcours inversé

Le parcours inversé permet de traiter les éléments d'un tableau du dernier au
premier. Cette technique est essentielle pour des algorithmes de tri, de
recherche arrière, ou d'affichage dans l'ordre décroissant.

#### Avec accès direct par indice

```java
int[] scores = {85, 92, 78, 95, 88};

// Parcours du dernier au premier
for (int i = scores.length - 1; i >= 0; i--) {
    System.out.println("Score " + i + " : " + scores[i]);
}
```

#### Avec boucle while

```java
int[] scores = {85, 92, 78, 95, 88};
int index = scores.length - 1;

while (index >= 0) {
    System.out.println("Score " + index + " : " + scores[index]);
    index--;
}
```

#### Avec boucle do-while

```java
int[] scores = {85, 92, 78, 95, 88};
int index = scores.length - 1;

if (scores.length > 0) { // Protection contre tableau vide
    do {
        System.out.println("Score " + index + " : " + scores[index]);
        index--;
    } while (index >= 0);
}
```

> [!WARNING]
>
> Attention à l'indice de départ : `scores.length - 1` et non `scores.length`
> qui provoquerait une erreur `ArrayIndexOutOfBoundsException`.

### Parcours partiel (sous-ensemble)

Il est parfois nécessaire de ne parcourir qu'une portion d'un tableau, par
exemple pour analyser une plage de données spécifique ou traiter un segment
particulier.

#### Parcours d'une plage définie

```java
int[] data = {5, 10, 15, 20, 25, 30, 35, 40};
int start = 2;
int end = 5;

// Parcours de l'indice 2 à 4 (exclusif sur end)
for (int i = start; i < end; i++) {
    System.out.println("Élément " + i + " : " + data[i]);
}
// Affiche : 15, 20, 25
```

#### Avec boucle while

```java
int[] data = {5, 10, 15, 20, 25, 30, 35, 40};
int start = 2;
int end = 5;
int index = start;

while (index < end) {
    System.out.println("Élément " + index + " : " + data[index]);
    index++;
}
```

#### Parcours du milieu du tableau

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

> [!TIP]
>
> Utilisez des fonctions pour encapsuler ces parcours complexes et les rendre
> réutilisables.

## Algorithmes simples sur tableaux

### Recherche d'un élément

La recherche est l'une des opérations les plus fondamentales sur les tableaux.

#### Recherche linéaire simple

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

#### Avec boucle while

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

#### Recherche avec do-while (si tableau non vide)

```java
public static int linearSearch(int[] array, int target) {
    if (array.length == 0) {
        return -1;
    }

    int index = 0;

    do {
        if (array[index] == target) {
            return index;
        }
        index++;
    } while (index < array.length);

    return -1;
}
```

> [!NOTE]
>
> La recherche linéaire a une complexité O(n), ce qui signifie que dans le pire
> cas, elle doit parcourir tout le tableau.

### Comptage d'occurrences

Compter combien de fois une valeur apparaît dans un tableau est une opération
courante pour analyser des données.

#### Avec boucle for classique

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

#### Avec boucle for-each

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

#### Avec boucle while

```java
public static int countOccurrences(int[] array, int value) {
    int count = 0;
    int index = 0;

    while (index < array.length) {
        if (array[index] == value) {
            count++;
        }
        index++;
    }

    return count;
}
```

### Recherche du minimum et du maximum

Trouver les valeurs extrêmes dans un tableau est essentiel pour de nombreux
algorithmes.

#### Recherche du minimum

```java
public static int findMin(int[] array) {
    int min = array[0];

    for (int i = 1; i < array.length; i++) {
        if (array[i] < min) {
            min = array[i];
        }
    }

    return min;
}
```

#### Recherche du maximum avec while

```java
public static int findMax(int[] array) {
    int max = array[0];
    int index = 1;

    while (index < array.length) {
        if (array[index] > max) {
            max = array[index];
        }
        index++;
    }

    return max;
}
```

#### Recherche du minimum avec for-each

```java
public static int findMin(int[] array) {
    int min = array[0];

    for (int value : array) {
        if (value < min) {
            min = value;
        }
    }

    return min;
}
```

> [!TIP]
>
> Ces algorithmes peuvent être adaptés pour trouver l'indice de la valeur
> minimale ou maximale en retournant l'indice au lieu de la valeur.

## Introduction à la récursivité

La récursivité est une technique de programmation où une fonction s'appelle
elle-même pour résoudre un problème. Cette approche est particulièrement
élégante pour certains types de problèmes mathématiques et algorithmiques.

### Principe de base

Une fonction récursive comporte toujours deux parties essentielles :

1. **Cas de base** : condition d'arrêt qui empêche la récursion infinie
2. **Cas récursif** : appel de la fonction à elle-même avec des paramètres
   modifiés

### Exemple 1 : Factorielle

La factorielle d'un nombre n (notée n!) est le produit de tous les entiers de 1
à n.

```java
/**
 * Calcule la factorielle d'un nombre de manière récursive.
 *
 * @param n le nombre dont on veut calculer la factorielle
 * @return la factorielle de n
 */
public static long factorial(int n) {
    // Cas de base
    if (n <= 1) {
        return 1;
    }

    // Cas récursif : n! = n * (n-1)!
    return n * factorial(n - 1);
}
```

**Exemple d'exécution** : `factorial(5)`

1. `factorial(5)` = 5 × `factorial(4)`
2. `factorial(4)` = 4 × `factorial(3)`
3. `factorial(3)` = 3 × `factorial(2)`
4. `factorial(2)` = 2 × `factorial(1)`
5. `factorial(1)` = 1 (cas de base)
6. Retour : 2 × 1 = 2
7. Retour : 3 × 2 = 6
8. Retour : 4 × 6 = 24
9. Retour : 5 × 24 = 120

### Exemple 2 : Suite de Fibonacci

La suite de Fibonacci est une séquence où chaque nombre est la somme des deux
précédents : 0, 1, 1, 2, 3, 5, 8, 13...

```java
/**
 * Calcule le n-ième terme de la suite de Fibonacci.
 *
 * @param n la position dans la suite (0-indexée)
 * @return le n-ième nombre de Fibonacci
 */
public static int fibonacci(int n) {
    // Cas de base
    if (n <= 1) {
        return n;
    }

    // Cas récursif : F(n) = F(n-1) + F(n-2)
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```

**Exemple d'exécution** : `fibonacci(5)`

1. `fibonacci(5)` = `fibonacci(4)` + `fibonacci(3)`
2. `fibonacci(4)` = `fibonacci(3)` + `fibonacci(2)`
3. ... (l'arbre d'appels devient complexe)
4. Résultat final : 5

> [!WARNING]
>
> La version récursive de Fibonacci est inefficace pour de grandes valeurs de n
> car elle recalcule les mêmes valeurs plusieurs fois. Une version itérative ou
> avec mémoïsation serait préférable en pratique.

### Exemple 3 : Chaîne de souhaits

Un exemple ludique pour comprendre la récursivité : une personne souhaite une
bonne journée à deux autres personnes, qui font de même, et ainsi de suite.

```java
/**
 * Simule une chaîne de souhaits où chaque personne en salue deux autres.
 *
 * @param depth le nombre de niveaux de propagation
 * @param personName le nom de la personne qui souhaite
 */
public static void wishGoodDay(int depth, String personName) {
    // Cas de base : arrêt de la chaîne
    if (depth <= 0) {
        return;
    }

    System.out.println(personName + " souhaite une bonne journée !");

    // Cas récursif : propagation à deux personnes
    wishGoodDay(depth - 1, personName + "-A");
    wishGoodDay(depth - 1, personName + "-B");
}
```

**Exemple d'exécution** : `wishGoodDay(3, "Noor")`

```
Noor souhaite une bonne journée !
Noor-A souhaite une bonne journée !
Noor-A-A souhaite une bonne journée !
Noor-A-B souhaite une bonne journée !
Noor-B souhaite une bonne journée !
Noor-B-A souhaite une bonne journée !
Noor-B-B souhaite une bonne journée !
```

### Récursivité vs Itération

Tout algorithme récursif peut être transformé en version itérative et vice
versa. Voici une comparaison :

| Aspect      | Récursivité                       | Itération                |
| ----------- | --------------------------------- | ------------------------ |
| Lisibilité  | Souvent plus élégante et concise  | Peut être plus verbose   |
| Performance | Plus lente (appels de fonctions)  | Généralement plus rapide |
| Mémoire     | Utilise la pile d'appels          | Utilise moins de mémoire |
| Cas d'usage | Problèmes naturellement récursifs | Parcours simples         |

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

> [!IMPORTANT]
>
> La récursivité est un outil puissant, mais elle n'est pas toujours la
> meilleure solution. Utilisez-la quand elle rend le code plus clair et
> maintenable.

## Pour aller plus loin

### Fonctions avancées avec tableaux

Au-delà des parcours simples, les tableaux peuvent être manipulés de manière
plus sophistiquée grâce à des fonctions spécialisées.

#### Copie de tableau

```java
public static int[] copyArray(int[] source) {
    int[] copy = new int[source.length];

    for (int i = 0; i < source.length; i++) {
        copy[i] = source[i];
    }

    return copy;
}
```

#### Inversion de tableau

```java
public static void reverseArray(int[] array) {
    int left = 0;
    int right = array.length - 1;

    while (left < right) {
        // Échange des éléments
        int temp = array[left];
        array[left] = array[right];
        array[right] = temp;

        left++;
        right--;
    }
}
```

#### Fusion de deux tableaux triés

```java
public static int[] mergeArrays(int[] array1, int[] array2) {
    int[] merged = new int[array1.length + array2.length];
    int i = 0, j = 0, k = 0;

    while (i < array1.length && j < array2.length) {
        if (array1[i] <= array2[j]) {
            merged[k++] = array1[i++];
        } else {
            merged[k++] = array2[j++];
        }
    }

    // Copie des éléments restants
    while (i < array1.length) {
        merged[k++] = array1[i++];
    }

    while (j < array2.length) {
        merged[k++] = array2[j++];
    }

    return merged;
}
```

### Récursivité avec tableaux

La récursivité peut également être appliquée aux opérations sur tableaux.

#### Somme récursive d'un tableau

```java
public static int sumRecursive(int[] array, int index) {
    // Cas de base : fin du tableau
    if (index >= array.length) {
        return 0;
    }

    // Cas récursif : élément courant + somme du reste
    return array[index] + sumRecursive(array, index + 1);
}

// Utilisation : sumRecursive(array, 0)
```

#### Recherche récursive dans un tableau

```java
public static int searchRecursive(int[] array, int target, int index) {
    // Cas de base : fin du tableau
    if (index >= array.length) {
        return -1;
    }

    // Cas de base : élément trouvé
    if (array[index] == target) {
        return index;
    }

    // Cas récursif : chercher dans le reste du tableau
    return searchRecursive(array, target, index + 1);
}

// Utilisation : searchRecursive(array, target, 0)
```

> [!NOTE]
>
> Ces exemples récursifs avec tableaux sont pédagogiques. En pratique, les
> versions itératives sont généralement préférables pour des raisons de
> performance.

## Sources

- [Oracle Java Documentation - Arrays](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Arrays.html)
- [Dev.java - Learn Java: Arrays](https://dev.java/learn/language-basics/arrays/)
- [Dev.java - Learn Java: Controlling Flow](https://dev.java/learn/language-basics/controlling-flow/)
- [W3Schools - Java Arrays](https://www.w3schools.com/java/java_arrays_reallife.asp)
- [W3Schools - Java Methods](https://www.w3schools.com/java/java_methods.asp)
- [W3Schools - Java Recursion](https://www.w3schools.com/java/java_recursion.asp)

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
