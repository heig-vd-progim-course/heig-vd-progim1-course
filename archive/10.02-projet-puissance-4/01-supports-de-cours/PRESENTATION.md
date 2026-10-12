---
marp: true
---

<!--
theme: custom-marp-theme
size: 16:9
paginate: true
author: V. Guidoux, avec l'aide de GitHub Copilot
title: HEIG-VD ProgIM1 Course - Projet guidé - Puissance 4
description: Projet guidé Puissance 4 pour l'unité d'enseignement ProgIM1 enseigné à la HEIG-VD, Suisse
url: https://heig-vd-progim-course.github.io/heig-vd-progim1-course/10.02-projet-puissance-4/01-supports-de-cours/index.html
header: "**Projet guidé - Puissance 4**"
footer: '[**HEIG-VD**](https://heig-vd.ch) - [ProgIM1 2025-2026](https://github.com/heig-vd-progim-course/heig-vd-progim1-course) - [CC BY-SA 4.0](https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md)'
headingDivider: 2
math: mathjax
-->

# Projet guidé - Puissance 4

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

## Objectifs du cours

À la fin de cette séance, vous devriez être capable de :

- Analyser un problème complexe et le décomposer en étapes
- Utiliser des tableaux 2D pour une grille de jeu
- Implémenter des algorithmes de détection de motifs
- Organiser votre code en fonctions réutilisables
- Développer une application interactive complète
- Tester et déboguer méthodiquement

![bg right:40%][illustration-objectifs]

## Notions préalables

<!-- _class: lead -->

Deux concepts utilisés dans le projet :

- `break` et `continue`
- Constantes de classe

## L'instruction `break`

**Sortir immédiatement d'une boucle**

```java
int[] numbers = {3, 7, 12, 5, 9};
int searchValue = 5;
boolean found = false;

for (int i = 0; i < numbers.length; i++) {
    if (numbers[i] == searchValue) {
        found = true;
        break; // Sort de la boucle
    }
}
```

## L'instruction `continue`

**Passer à l'itération suivante**

```java
int[] numbers = {-5, 3, -2, 8, 0, 12};

for (int i = 0; i < numbers.length; i++) {
    if (numbers[i] <= 0) {
        continue; // Ignore les négatifs
    }
    System.out.println(numbers[i]);
}
```

## `break` vs `continue`

| Instruction | Effet                              |
| ----------- | ---------------------------------- |
| `break`     | Sort **complètement** de la boucle |
| `continue`  | Passe à l'**itération suivante**   |

**Dans Puissance 4 :**

- `break` → sortir quand un joueur gagne
- `continue` → redemander si colonne invalide

## Constantes de classe

**Valeurs partagées entre plusieurs méthodes**

```java
public class Main {
    public static final int ROWS = 6;
    public static final int COLS = 7;
    public static final char PLAYER1 = 'X';
    public static final char PLAYER2 = 'O';
    public static final char EMPTY = ' ';

    // Méthodes...
}
```

## Pourquoi des constantes de classe ?

**Avantages :**

- **Réutilisabilité** : Utilisées dans plusieurs méthodes
- **Centralisation** : Modifier une seule fois
- **Lisibilité** : `ROWS` plus clair que `6`
- **Configuration globale** du programme

## Signification des mots-clés

`public static final int ROWS = 6;`

- **`public`** : Accessible partout
- **`static`** : Appartient à la classe
- **`final`** : Ne peut pas être modifié (constante)

**Convention :** MAJUSCULES_AVEC_UNDERSCORES

## Le jeu Puissance 4

**Règles du jeu :**

- Grille : 6 lignes × 7 colonnes
- 2 joueurs : X et O
- Chacun son tour place un pion
- Le pion tombe à la position la plus basse
- **But :** Aligner 4 pions

## Exemple de grille

```text
| | | | | | | |
| | | | | | | |
| | |O| | | | |
| |X|O| | | | |
| |X|X|O| | | |
|X|O|X|O|X| | |
 1 2 3 4 5 6 7
```

**Victoire** : horizontal, vertical ou diagonal

## Représentation en mémoire

**Tableau 2D de caractères :**

```java
char[][] grid = new char[6][7];
```

- 6 lignes (0 à 5)
- 7 colonnes (0 à 6)

## Contenu des cases

**Symboles utilisés :**

- `' '` → case vide
- `'X'` → pion de la joueuse 1
- `'O'` → pion de la joueuse 2

## Décomposition du problème

**Fonctionnalités nécessaires :**

1. Afficher la grille
2. Placer un pion (avec gravité)
3. Alterner les joueurs
4. Détecter victoire
5. Détecter match nul
6. Boucle de jeu

**Approche : développement incrémental**

## Étape 1 : Affichage de la grille

**Objectif :** Créer et afficher une grille vide

```java
public static void displayGrid(char[][] grid) {
    for (int row = 0; row < grid.length; row++) {
        System.out.print("|");
        for (int col = 0; col < grid[row].length; col++) {
            System.out.print(grid[row][col] + "|");
        }
        System.out.println();
    }
    System.out.println(" 1 2 3 4 5 6 7");
}
```

**Concepts :** Boucles imbriquées, affichage formaté

## Étape 1 : Initialisation

**Remplir la grille avec des espaces :**

```java
public static char[][] createGrid() {
    char[][] grid = new char[6][7];
    for (int row = 0; row < grid.length; row++) {
        for (int col = 0; col < grid[row].length; col++) {
            grid[row][col] = ' ';
        }
    }
    return grid;
}
```

## Étape 2 : Placement d'un pion

**Algorithme :**

1. Demander la colonne
2. Valider l'entrée (1-7)
3. Trouver la ligne disponible
4. Placer le pion

**Concept clé : la gravité**

## Trouver la ligne disponible

**Parcourir de bas en haut :**

```java
public static int findLowestRow(char[][] grid, int col) {
    for (int row = grid.length - 1; row >= 0; row--) {
        if (grid[row][col] == ' ') {
            return row;
        }
    }
    return -1;  // Colonne pleine
}
```

## Placement complet

```java
public static int placeToken(char[][] grid,
                            int col, char player) {
    int row = findLowestRow(grid, col);
    if (row != -1) {
        grid[row][col] = player;
    }
    return row;
}
```

## Validation de la colonne

```java
int col;
do {
    System.out.print("Colonne (1-7) : ");
    col = scanner.nextInt() - 1;
} while (col < 0 || col >= 7 ||
         findLowestRow(grid, col) == -1);
```

## Étape 3 : Alternance des joueuses

**Variable de joueur courant :**

```java
char currentPlayer = 'X';
```

**Après chaque coup :**

```java
if (currentPlayer == 'X') {
    currentPlayer = 'O';
} else {
    currentPlayer = 'X';
}
```

## Étape 4 : Détection horizontale

**Stratégie : fenêtre glissante**

Vérifier toutes les séquences de 4 cases.

```text
|X|X|X|X| | | |   ← Victoire !
 0 1 2 3 4 5 6
```

On teste les colonnes 0-3, 1-4, 2-5, 3-6

## Implémentation horizontale

```java
public static boolean checkHorizontalWin(
        char[][] grid, char player) {
    for (int row = 0; row < grid.length; row++) {
        for (int col = 0; col <= grid[row].length - 4; col++) {
            if (grid[row][col] == player &&
                grid[row][col + 1] == player &&
                grid[row][col + 2] == player &&
                grid[row][col + 3] == player) {
                return true;
            }
        }
    }
    return false;
}
```

## Étape 5 : Détection verticale

**Même principe, en colonnes :**

```java
public static boolean checkVerticalWin(
        char[][] grid, char player) {
    for (int col = 0; col < grid[0].length; col++) {
        for (int row = 0; row <= grid.length - 4; row++) {
            if (grid[row][col] == player &&
                grid[row + 1][col] == player &&
                grid[row + 2][col] == player &&
                grid[row + 3][col] == player) {
                return true;
            }
        }
    }
    return false;
}
```

## Diagonale descendante ↘

```java
public static boolean checkDiagonalDown(
        char[][] grid, char player) {
    for (int row = 0; row <= grid.length - 4; row++) {
        for (int col = 0; col <= grid[0].length - 4; col++) {
            if (grid[row][col] == player &&
                grid[row + 1][col + 1] == player &&
                grid[row + 2][col + 2] == player &&
                grid[row + 3][col + 3] == player) {
                return true;
            }
        }
    }
    return false;
}
```

## Diagonale montante ↗

```java
public static boolean checkDiagonalUp(
        char[][] grid, char player) {
    for (int row = 3; row < grid.length; row++) {
        for (int col = 0; col <= grid[0].length - 4; col++) {
            if (grid[row][col] == player &&
                grid[row - 1][col + 1] == player &&
                grid[row - 2][col + 2] == player &&
                grid[row - 3][col + 3] == player) {
                return true;
            }
        }
    }
    return false;
}
```

## Fonction globale de victoire

**Combiner toutes les détections :**

```java
public static boolean hasWon(char[][] grid, char player) {
    return checkHorizontalWin(grid, player) ||
           checkVerticalWin(grid, player) ||
           checkDiagonalDown(grid, player) ||
           checkDiagonalUp(grid, player);
}
```

## Étape 6 : Détection de match nul

```java
public static boolean isGridFull(char[][] grid) {
    for (int col = 0; col < grid[0].length; col++) {
        if (grid[0][col] == ' ') {
            return false;
        }
    }
    return true;
}
```

**Astuce :** Vérifier la première ligne suffit

## Boucle de jeu (1/2)

```java
while (true) {
    displayGrid(grid);

    int col = getPlayerMove(scanner, grid, currentPlayer);
    placeToken(grid, col, currentPlayer);

    if (hasWon(grid, currentPlayer)) {
        displayGrid(grid);
        System.out.println(currentPlayer + " a gagné !");
        break;
    }
```

## Boucle de jeu (2/2)

```java
    if (isGridFull(grid)) {
        System.out.println("Match nul !");
        break;
    }

    // Alternance
    if (currentPlayer == 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
}
```

## À vous de jouer !

- (Re)lire le support de cours.
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

- [Documentation Java](https://docs.oracle.com/en/java/javase/17/docs/api/)
- [Règles du Puissance 4](https://fr.wikipedia.org/wiki/Puissance_4)
- [Illustration objectifs][illustration-objectifs] par
  [Aline de Nadai](https://unsplash.com/@alinedenadai) sur
  [Unsplash](https://unsplash.com/photos/j6brni7fpvs)
- [Illustration à vous de jouer][illustration-a-vous-de-jouer] par
  [Nikita Kachanovsky](https://unsplash.com/@nkachanovskyyy) sur
  [Unsplash](https://unsplash.com/photos/FJFPuE1MAOM)

<!-- URLs -->

[presentation-web]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/12.01-projet-puissance-4/01-supports-de-cours/index.html
[presentation-pdf]:
	https://heig-vd-progim-course.github.io/heig-vd-progim1-course/12.01-projet-puissance-4/01-supports-de-cours/12.01-projet-puissance-4-presentation.pdf
[cours]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/tree/main/12.01-projet-puissance-4/01-supports-de-cours
[license]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md

<!-- Illustrations -->

[illustration-principale]: ./images/home.jpg
[illustration-objectifs]:
	https://images.unsplash.com/photo-1516389573391-5620a0263801?fit=crop&h=720
[illustration-a-vous-de-jouer]:
	https://images.unsplash.com/photo-1509198397868-475647b2a1e5?fit=crop&h=720
