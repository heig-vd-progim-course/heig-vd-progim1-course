# Tableaux - Supports de cours

V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Ressources annexes

- Objectifs, méthodes d'enseignement et d'apprentissage, et méthodes
  d'évaluation : [Lien vers le contenu](..)
- Supports de cours : [Lien vers le contenu](../01-supports-de-cours/README.md)
  ·
  [Presentation (web)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/06.01-tableaux/01-supports-de-cours/index.html)
  ·
  [Presentation (PDF)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/06.01-tableaux/01-supports-de-cours/06.01-tableaux-presentation.pdf)
- Exemples de code : [Lien vers le contenu](../02-exemples-de-code/)
- Exercices : [Lien vers le contenu](../03-exercices/README.md)

## Table des matières

- [Ressources annexes](#ressources-annexes)
- [Table des matières](#table-des-matières)
- [Objectifs](#objectifs)
- [Introduction aux tableaux](#introduction-aux-tableaux)
- [Les tableaux en Java](#les-tableaux-en-java)
  - [Déclaration et initialisation](#déclaration-et-initialisation)
  - [Accès aux éléments](#accès-aux-éléments)
  - [Taille d'un tableau](#taille-dun-tableau)
  - [Valeurs par défaut](#valeurs-par-défaut)
- [Parcourir un tableau](#parcourir-un-tableau)
  - [Boucle for classique](#boucle-for-classique)
  - [Boucle for-each](#boucle-for-each)
  - [Boucle while](#boucle-while)
- [Tableaux multidimensionnels](#tableaux-multidimensionnels)
  - [Tableaux à deux dimensions](#tableaux-à-deux-dimensions)
  - [Tableaux irréguliers](#tableaux-irréguliers)
- [La classe Arrays](#la-classe-arrays)
  - [Affichage avec toString](#affichage-avec-tostring)
  - [Tri avec sort](#tri-avec-sort)
  - [Copie avec copyOf](#copie-avec-copyof)
  - [Remplissage avec fill](#remplissage-avec-fill)
  - [Comparaison avec equals](#comparaison-avec-equals)
- [Limites des tableaux](#limites-des-tableaux)
- [Conclusion](#conclusion)
  - [Source](#source)

## Objectifs

À la fin de cette séance, vous devriez être capable de :

- Décrire ce qu'est un tableau et ses caractéristiques en Java.
- Créer et initialiser des tableaux de types primitifs et d'objets.
- Accéder aux éléments d'un tableau par leur index.
- Parcourir un tableau avec différentes structures de boucle.
- Manipuler des tableaux multidimensionnels.
- Utiliser les méthodes utilitaires de la classe `Arrays`.
- Comprendre les limites des tableaux et quand utiliser des structures
- Résoudre des problèmes pratiques impliquant le stockage et le traitement de

## Introduction aux tableaux

Un tableau est une structure de données qui permet de stocker plusieurs valeurs
du même type dans une seule variable. Les tableaux sont particulièrement utiles
lorsque nous devons gérer des collections de données, comme une liste de notes,
une série de températures relevées chaque jour, ou un ensemble de noms.

Imaginons que nous souhaitons stocker les notes de cinq étudiants. Sans
tableaux, nous aurions besoin de cinq variables distinctes :

```java
double note1 = 5.5;
double note2 = 4.0;
double note3 = 5.0;
double note4 = 4.5;
double note5 = 6.0;
```

Avec un tableau, nous pouvons stocker toutes ces notes dans une seule variable :

```java
double[] notes = {5.5, 4.0, 5.0, 4.5, 6.0};
```

Cette approche présente plusieurs avantages :

- Code plus concis et lisible.
- Possibilité de parcourir les données avec des boucles.
- Facilité de manipulation de grandes quantités de données.
- Organisation logique des données liées.

## Les tableaux en Java

En Java, un tableau est un objet qui contient un nombre fixe d'éléments du même
type. Une fois créé, la taille d'un tableau ne peut plus être modifiée. Tous les
éléments d'un tableau sont stockés de manière contiguë en mémoire et sont
accessibles par un index numérique qui commence à zéro.

### Déclaration et initialisation

Il existe plusieurs façons de déclarer et d'initialiser un tableau en Java.

Déclaration avec création et initialisation immédiate :

```java
// Tableau d'entiers avec valeurs initiales
int[] numbers = {10, 20, 30, 40, 50};

// Tableau de chaînes de caractères
String[] fruits = {"pomme", "banane", "orange"};
```

Déclaration avec spécification de la taille :

```java
// Création d'un tableau de 5 entiers (valeurs par défaut : 0)
int[] temperatures = new int[5];

// Création d'un tableau de 3 chaînes (valeurs par défaut : null)
String[] names = new String[3];
```

Déclaration suivie d'initialisation :

```java
// Déclaration
double[] prices;

// Initialisation plus tard dans le code
prices = new double[]{9.99, 19.99, 29.99};
```

Notez que la notation `int[] numbers` est préférée en Java à `int numbers[]`,
bien que les deux syntaxes soient valides.

### Accès aux éléments

Les éléments d'un tableau sont accessibles par leur index, qui commence à zéro.
Pour accéder à un élément, on utilise la notation avec crochets :

```java
String[] days = {"lundi", "mardi", "mercredi", "jeudi", "vendredi"};

// Accès en lecture
String firstDay = days[0];      // "lundi"
String thirdDay = days[2];      // "mercredi"

// Accès en écriture (modification)
days[1] = "MARDI";              // Modifie "mardi" en "MARDI"
```

La représentation du tableau `days` peut être visualisée ainsi :

| Index | Valeur       |
| ----- | ------------ |
| 0     | `"lundi"`    |
| 1     | `"mardi"`    |
| 2     | `"mercredi"` |
| 3     | `"jeudi"`    |
| 4     | `"vendredi"` |

Attention : tenter d'accéder à un index qui n'existe pas provoque une erreur
`ArrayIndexOutOfBoundsException` :

```java
String[] fruits = {"pomme", "banane"};
String fruit = fruits[5];  // Erreur : l'index 5 n'existe pas
```

### Taille d'un tableau

La propriété `length` permet de connaître le nombre d'éléments dans un tableau :

```java
int[] numbers = {10, 20, 30, 40};
int size = numbers.length;  // 4

// Accès au dernier élément
int lastNumber = numbers[numbers.length - 1];  // 40
```

Cette propriété est particulièrement utile pour parcourir un tableau sans
risquer de dépasser ses limites.

### Valeurs par défaut

Lorsqu'un tableau est créé avec `new` sans valeurs explicites, ses éléments
reçoivent des valeurs par défaut selon leur type :

- Types numériques (`int`, `double`, etc.) : `0` ou `0.0`
- Type `boolean` : `false`
- Types objets (`String`, etc.) : `null`

```java
int[] numbers = new int[3];      // {0, 0, 0}
boolean[] flags = new boolean[2]; // {false, false}
String[] names = new String[2];   // {null, null}
```

## Parcourir un tableau

Il existe plusieurs façons de parcourir les éléments d'un tableau en Java.

### Boucle for classique

La boucle `for` classique est idéale lorsque nous avons besoin de connaître
l'index de chaque élément :

```java
String[] fruits = {"pomme", "banane", "orange", "kiwi"};

for (int i = 0; i < fruits.length; i++) {
    System.out.println("Fruit " + i + " : " + fruits[i]);
}
```

Cette approche permet également de modifier les éléments pendant le parcours :

```java
int[] numbers = {1, 2, 3, 4, 5};

// Doubler chaque nombre
for (int i = 0; i < numbers.length; i++) {
    numbers[i] = numbers[i] * 2;
}
```

### Boucle for-each

La boucle `for-each` (ou boucle améliorée) est plus concise et plus lisible
lorsque nous voulons simplement parcourir tous les éléments sans modifier le
tableau :

```java
String[] cities = {"Yverdon", "Lausanne", "Genève"};

for (String city : cities) {
    System.out.println(city);
}
```

Cette syntaxe se lit : "pour chaque `city` dans `cities`".

Attention : avec la boucle `for-each`, nous ne pouvons pas modifier les éléments
du tableau :

```java
int[] numbers = {1, 2, 3};

// Ceci ne modifie PAS le tableau
for (int num : numbers) {
    num = num * 2;  // Modifie seulement la variable locale 'num'
}
```

### Boucle while

La boucle `while` peut également être utilisée, bien qu'elle soit moins courante
pour parcourir des tableaux :

```java
double[] prices = {9.99, 19.99, 29.99};
int index = 0;

while (index < prices.length) {
    System.out.println("Prix : " + prices[index]);
    index++;
}
```

## Tableaux multidimensionnels

Un tableau multidimensionnel est un tableau dont les éléments sont eux-mêmes des
tableaux. Le cas le plus courant est le tableau à deux dimensions, qui peut être
visualisé comme une grille ou une matrice.

### Tableaux à deux dimensions

Un tableau à deux dimensions peut représenter, par exemple, une grille de jeu,
un planning hebdomadaire, ou une matrice mathématique :

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

Visualisation de cette grille :

|       | Col 0 | Col 1 | Col 2 |
| ----- | ----- | ----- | ----- |
| Row 0 | A0    | A1    | A2    |
| Row 1 | B0    | B1    | B2    |
| Row 2 | C0    | C1    | C2    |

Déclaration avec taille spécifiée :

```java
// Tableau de 4 lignes et 7 colonnes (planning de 4 semaines)
int[][] weeklyHours = new int[4][7];

// Attribution de valeurs
weeklyHours[0][0] = 8;  // Semaine 1, Lundi : 8 heures
weeklyHours[0][1] = 6;  // Semaine 1, Mardi : 6 heures
```

Parcours d'un tableau à deux dimensions :

```java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Parcours avec boucles imbriquées
for (int row = 0; row < matrix.length; row++) {
    for (int col = 0; col < matrix[row].length; col++) {
        System.out.print(matrix[row][col] + " ");
    }
    System.out.println();  // Nouvelle ligne après chaque rangée
}
```

### Tableaux irréguliers

En Java, les tableaux multidimensionnels peuvent avoir des lignes de longueurs
différentes. On parle alors de tableaux irréguliers (jagged arrays) :

```java
// Planning avec un nombre d'heures variable par semaine
int[][] schedule = {
    {8, 7, 6},           // Semaine 1 : 3 jours
    {8, 8, 8, 8, 8},     // Semaine 2 : 5 jours
    {6, 7}               // Semaine 3 : 2 jours
};

// Affichage avec vérification de la longueur de chaque ligne
for (int week = 0; week < schedule.length; week++) {
    System.out.print("Semaine " + (week + 1) + " : ");
    for (int day = 0; day < schedule[week].length; day++) {
        System.out.print(schedule[week][day] + "h ");
    }
    System.out.println();
}
```

## La classe Arrays

Java fournit la classe utilitaire `java.util.Arrays` qui contient de nombreuses
méthodes pour manipuler les tableaux. Pour l'utiliser, il faut d'abord
l'importer :

```java
import java.util.Arrays;
```

### Affichage avec toString

La méthode `Arrays.toString()` convertit un tableau en une chaîne de caractères
lisible :

```java
int[] numbers = {5, 2, 8, 1, 9};
System.out.println(Arrays.toString(numbers));
// Affiche : [5, 2, 8, 1, 9]
```

Pour les tableaux multidimensionnels, utilisez `Arrays.deepToString()` :

```java
int[][] matrix = {{1, 2}, {3, 4}};
System.out.println(Arrays.deepToString(matrix));
// Affiche : [[1, 2], [3, 4]]
```

### Tri avec sort

La méthode `Arrays.sort()` trie les éléments d'un tableau dans l'ordre croissant
:

```java
int[] numbers = {5, 2, 8, 1, 9};
Arrays.sort(numbers);
System.out.println(Arrays.toString(numbers));
// Affiche : [1, 2, 5, 8, 9]

String[] names = {"Amaru",  "Nox", "Ariel"};
Arrays.sort(names);
System.out.println(Arrays.toString(names));
// Affiche : [Amaru, Ariel, Nox]
```

### Copie avec copyOf

La méthode `Arrays.copyOf()` crée une copie d'un tableau avec une nouvelle
taille :

```java
int[] original = {1, 2, 3, 4, 5};

// Copie complète
int[] copy = Arrays.copyOf(original, original.length);

// Copie partielle (3 premiers éléments)
int[] partial = Arrays.copyOf(original, 3);
// Résultat : [1, 2, 3]

// Copie avec extension (rempli de zéros)
int[] extended = Arrays.copyOf(original, 8);
// Résultat : [1, 2, 3, 4, 5, 0, 0, 0]
```

### Remplissage avec fill

La méthode `Arrays.fill()` remplit un tableau avec une valeur spécifique :

```java
int[] numbers = new int[5];
Arrays.fill(numbers, 7);
System.out.println(Arrays.toString(numbers));
// Affiche : [7, 7, 7, 7, 7]

// Remplissage partiel (du début à l'index 3 exclus)
int[] partial = new int[5];
Arrays.fill(partial, 0, 3, 9);
System.out.println(Arrays.toString(partial));
// Affiche : [9, 9, 9, 0, 0]
```

### Comparaison avec equals

La méthode `Arrays.equals()` compare deux tableaux pour vérifier s'ils
contiennent les mêmes éléments dans le même ordre :

```java
int[] array1 = {1, 2, 3};
int[] array2 = {1, 2, 3};
int[] array3 = {3, 2, 1};

System.out.println(Arrays.equals(array1, array2));  // true
System.out.println(Arrays.equals(array1, array3));  // false
```

Pour les tableaux multidimensionnels, utilisez `Arrays.deepEquals()`.

## Limites des tableaux

Bien que les tableaux soient très utiles, ils présentent certaines limitations :

1. Taille fixe : Une fois créé, un tableau ne peut pas changer de taille. Si
   nous avons besoin d'ajouter ou de supprimer des éléments fréquemment, un
   tableau n'est pas la structure la plus adaptée.

2. Pas de méthodes pratiques : Les tableaux n'ont que la propriété `length` et
   aucune méthode pour ajouter, supprimer ou rechercher des éléments facilement.

3. Types homogènes : Un tableau ne peut contenir que des éléments du même type.

Pour ces raisons, Java propose des alternatives plus flexibles dans le framework
Collections, comme `ArrayList`, `LinkedList`, `HashSet`, etc. Ces structures
seront explorées dans des cours ultérieurs.

Cependant, les tableaux restent très utiles dans les situations suivantes :

- Lorsque la taille est connue à l'avance et ne changera pas.
- Pour des raisons de performance (les tableaux sont plus rapides et utilisent
  moins de mémoire).
- Pour travailler avec des API qui requièrent des tableaux.
- Pour représenter des structures mathématiques (matrices, vecteurs).

## Conclusion

Les tableaux sont une structure de données fondamentale en Java qui permet de
stocker et de manipuler des collections d'éléments du même type. Ils offrent un
accès rapide aux éléments par index et sont particulièrement efficaces lorsque
la taille des données est connue à l'avance.

Points clés à retenir :

- Un tableau a une taille fixe définie à sa création.
- Les indices commencent à zéro et vont jusqu'à `length - 1`.
- La propriété `length` permet de connaître le nombre d'éléments.
- Plusieurs types de boucles permettent de parcourir un tableau.
- Les tableaux multidimensionnels permettent de représenter des grilles et des
  matrices.
- La classe `Arrays` fournit des méthodes utilitaires pour manipuler les
  tableaux.

Dans les prochains cours, nous explorerons des structures de données plus
flexibles qui permettent de gérer des collections dont la taille peut varier
dynamiquement.

### Source

- <https://dev.java/learn/language-basics/arrays/>
- <https://www.w3schools.com/java/java_arrays.asp>

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
