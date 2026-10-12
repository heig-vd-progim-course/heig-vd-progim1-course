# Projet guidé - Puissance 4 - Exercices

V. Guidoux, avec l'aide de
[GitHub Copilot](https://github.com/features/copilot).

Ce travail est sous licence [CC BY-SA 4.0][licence].

## Ressources annexes

- Objectifs, méthodes d'enseignement et d'apprentissage, et méthodes
  d'évaluation : [Lien vers le contenu](..)
- Supports de cours : [Lien vers le contenu](../01-supports-de-cours/README.md)
  ·
  [Presentation (web)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/10.02-projet-puissance-4/01-supports-de-cours/index.html)
  ·
  [Presentation (PDF)](https://heig-vd-progim-course.github.io/heig-vd-progim1-course/10.02-projet-puissance-4/01-supports-de-cours/10.02-projet-puissance-4-presentation.pdf)
- Exemples de code : [Lien vers le contenu](../02-exemples-de-code/)
- Exercices : [Lien vers le contenu](../03-exercices/README.md)

## Introduction

Ces exercices vous guident dans la construction progressive d'un jeu Puissance 4
complet. Chaque exercice correspond à une étape du développement et construit
sur le précédent.

**Approche recommandée :**

1. Lisez l'énoncé de l'exercice
2. Essayez de l'implémenter par vous-même
3. Testez votre code
4. Consultez la solution si nécessaire
5. Comparez votre approche avec la solution proposée

**Conseil :** Il est important d'essayer par vous-même avant de regarder la
solution. L'apprentissage se fait par la pratique et les erreurs !

---

## Exercice 1 : Affichage d'une grille de morpion

**Objectif :** Créer et afficher une grille de morpion 3×3.

**Consigne :**

Avant de vous lancer dans le Puissance 4, commencez par quelque chose de plus
simple : un morpion (Tic-Tac-Toe). Créez un programme qui :

1. Crée un tableau 2D de 3 lignes et 3 colonnes
2. Initialise toutes les cases à vide (espace `' '`)
3. Affiche la grille avec des séparateurs `|`
4. Affiche les numéros de colonnes en dessous

**Résultat attendu :**

```text
| | | |
| | | |
| | | |
 1 2 3
```

**Indices :**

- Utilisez un tableau 2D : `char[][]`
- Deux boucles imbriquées pour l'initialisation
- Deux boucles imbriquées pour l'affichage

<details>
<summary>Solution</summary>

```java
public class TicTacToe {

    public static char[][] createGrid() {
        char[][] grid = new char[3][3];

        // Initialiser toutes les cases à vide
        for (int row = 0; row < grid.length; row++) {
            for (int col = 0; col < grid[row].length; col++) {
                grid[row][col] = ' ';
            }
        }

        return grid;
    }

    public static void displayGrid(char[][] grid) {
        for (int row = 0; row < grid.length; row++) {
            System.out.print("|");
            for (int col = 0; col < grid[row].length; col++) {
                System.out.print(grid[row][col] + "|");
            }
            System.out.println();
        }
        System.out.println(" 1 2 3");
    }
    public static void main(String[] args) {
        // Créer une grille 3x3
        char[][] grid = createGrid();

        // Afficher la grille
        displayGrid(grid);
    }

}
```

**Explication :**

- `createGrid()` crée le tableau et l'initialise avec des espaces
- Les boucles imbriquées permettent de parcourir chaque case (ligne puis
  colonne)
- `displayGrid()` affiche chaque case entourée de `|` pour la lisibilité

Une fois cet exercice maîtrisé, vous pouvez l'adapter pour le Puissance 4 (6×7)
!

</details>

---

## Exercice 2 : Placement avec gravité simple

**Objectif :** Implémenter le placement d'un pion qui tombe au plus bas.

**Consigne :**

En partant de votre grille du Puissance 4 (6×7), implémentez :

1. Une fonction `findLowestRow(char[][] grid, int col)` qui trouve la ligne la
   plus basse disponible dans une colonne
2. Une fonction `placeToken(char[][] grid, int col, char player)` qui place un
   pion

Testez en plaçant plusieurs pions dans la même colonne pour vérifier qu'ils
s'empilent correctement.

**Test :**

```java
char[][] grid = createGrid();
placeToken(grid, 3, 'X');  // Colonne 4 (index 3)
placeToken(grid, 3, 'O');  // Même colonne
placeToken(grid, 3, 'X');  // Même colonne
displayGrid(grid);
```

**Résultat attendu :**

```text
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | |X| | | | |
| | |O| | | | |
| | |X| | | | |
 1 2 3 4 5 6 7
```

**Indices :**

- Parcourir la colonne de bas en haut
  (`for (int row = grid.length - 1; row >= 0; row--)`)
- Retourner l'index de la première case vide trouvée
- Retourner -1 si la colonne est pleine

<details>
<summary>Solution</summary>

```java
/**
 * Trouve la ligne la plus basse disponible dans une colonne.
 */
public static int findLowestRow(char[][] grid, int col) {
    // Parcourir de bas en haut
    for (int row = grid.length - 1; row >= 0; row--) {
        if (grid[row][col] == ' ') {
            return row;  // Première case vide trouvée
        }
    }
    return -1;  // Colonne pleine
}

/**
 * Place un pion dans la colonne spécifiée.
 */
public static int placeToken(char[][] grid, int col, char player) {
    int row = findLowestRow(grid, col);

    if (row != -1) {
        grid[row][col] = player;
    }

    return row;
}
```

**Explication :**

- On parcourt la colonne de bas (`grid.length - 1`) en remontant (`row--`)
- Dès qu'on trouve une case vide, on retourne son index
- Si on arrive au bout sans trouver de case vide, la colonne est pleine → `-1`

</details>

---

## Exercice 3 : Boucle de jeu avec alternance

**Objectif :** Créer une boucle de jeu permettant de placer plusieurs pions en
alternant les joueurs.

**Consigne :**

Implémentez une boucle de jeu qui :

1. Affiche la grille
2. Demande au joueur courant de choisir une colonne (avec Scanner)
3. Valide que la colonne est entre 1 et 7
4. Valide que la colonne n'est pas pleine
5. Place le pion
6. Alterne les joueurs (X puis O puis X...)
7. Permet de quitter en tapant 0

**Indices :**

- Utilisez une boucle `while (true)`
- Variable `char currentPlayer = 'X';`
- Pour alterner : utilisez un `if-else` pour changer entre 'X' et 'O'

<details>
<summary>Solution</summary>

```java
import java.util.Scanner;

public class ConnectFour {

    // ... autres fonctions (createGrid, displayGrid, etc.)
    public static void main(String[] args) {
        char[][] grid = createGrid();
        char currentPlayer = 'X';
        Scanner scanner = new Scanner(System.in);

        while (true) {
            displayGrid(grid);

            System.out.print("\nJoueur " + currentPlayer +
                           " - Colonne (1-7, 0 pour quitter) : ");
            int column = scanner.nextInt();

            // Quitter
            if (column == 0) {
                System.out.println("Fin de la partie.");
                break;
            }

            // Convertir en index tableau
            int columnIndex = column - 1;

            // Validation
            if (columnIndex < 0 || columnIndex >= 7) {
                System.out.println("Colonne invalide !");
                continue;
            }

            if (findLowestRow(grid, columnIndex) == -1) {
                System.out.println("Colonne pleine !");
                continue;
            }

            // Placement
            placeToken(grid, columnIndex, currentPlayer);

            // Alternance
            if (currentPlayer == 'X') {
                currentPlayer = 'O';
            } else {
                currentPlayer = 'X';
            }

            System.out.println();
        }

        scanner.close();
    }

}
```

**Explication :**

- La boucle `while (true)` continue indéfiniment jusqu'au `break`
- On affiche, on demande, on valide, on place, on alterne
- `continue` permet de recommencer la boucle sans changer de joueur si l'entrée
  est invalide

</details>

---

## Exercice 4 : Détection horizontale

**Objectif :** Implémenter la détection de 4 pions alignés horizontalement.

**Consigne :**

Créez une fonction `checkHorizontalWin(char[][] grid, char player)` qui :

1. Parcourt chaque ligne de la grille
2. Pour chaque ligne, vérifie toutes les séquences de 4 cases consécutives
3. Retourne `true` si 4 pions du joueur sont alignés, `false` sinon

Ajoutez cette vérification après chaque coup dans votre boucle de jeu.

**Algorithme :**

```text
Pour chaque ligne :
    Pour chaque colonne de 0 à (largeur - 4) :
        Si les 4 cases suivantes contiennent le symbole du joueur :
            Retourner true
Retourner false
```

**Test :**

Essayez de gagner en plaçant 4 X d'affilée sur la ligne du bas.

**Indices :**

- Boucle externe : `for (int row = 0; row < grid.length; row++)`
- Boucle interne : `for (int col = 0; col <= grid[row].length - 4; col++)`
- Vérifier : `grid[row][col]`, `grid[row][col+1]`, `grid[row][col+2]`,
  `grid[row][col+3]`

<details>
<summary>Solution</summary>

```java
/**
 * Vérifie une victoire horizontale.
 */
public static boolean checkHorizontalWin(char[][] grid, char player) {
    // Parcourir chaque ligne
    for (int row = 0; row < grid.length; row++) {
        // Pour chaque ligne, vérifier toutes les séquences de 4
        // On s'arrête à length - 4 car on a besoin de 4 cases
        for (int col = 0; col <= grid[row].length - 4; col++) {
            // Vérifier si les 4 cases consécutives sont au joueur
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

**Dans la boucle de jeu, après placement :**

```java
placeToken(grid, columnIndex, currentPlayer);

// Vérifier victoire
if (checkHorizontalWin(grid, currentPlayer)) {
    System.out.println();
    displayGrid(grid);
    System.out.println("\nLe joueur " + currentPlayer + " a gagné !");
    break;
}

if (currentPlayer == 'X') {
    currentPlayer = 'O';
} else {
    currentPlayer = 'X';
}
```

**Explication :**

- La fenêtre glissante : on vérifie 4 cases consécutives à chaque position
- `col <= grid[row].length - 4` : si on a 7 colonnes (0-6), on s'arrête à la
  colonne 3 car 3+1+2+3 = 6
- On compare les 4 cases avec le symbole du joueur

</details>

---

## Exercice 5 : Détection verticale et diagonales

**Objectif :** Compléter les détections avec vertical et diagonales.

**Consigne :**

Implémentez trois nouvelles fonctions :

1. `checkVerticalWin(char[][] grid, char player)` : détection verticale
2. `checkDiagonalDownWin(char[][] grid, char player)` : diagonale ↘
3. `checkDiagonalUpWin(char[][] grid, char player)` : diagonale ↗

Créez ensuite une fonction globale `hasWon(char[][] grid, char player)` qui
combine toutes les détections.

**Indices :**

**Vertical :**

- Parcourir les colonnes (boucle externe sur `col`)
- Pour chaque colonne, vérifier les lignes de 0 à `length - 4`
- Vérifier : `grid[row][col]`, `grid[row+1][col]`, etc.

**Diagonale descendante ↘ :**

- Limites : `row <= length - 4` ET `col <= width - 4`
- Vérifier : `grid[row][col]`, `grid[row+1][col+1]`, etc.

**Diagonale montante ↗ :**

- Commencer à `row = 3` (besoin de remonter)
- Limites : `row < length` ET `col <= width - 4`
- Vérifier : `grid[row][col]`, `grid[row-1][col+1]`, etc.

<details>
<summary>Solution</summary>

```java
/**
 * Vérifie si le joueur a gagné (toutes formes).
 */
public static boolean hasWon(char[][] grid, char player) {
    return checkHorizontalWin(grid, player) ||
           checkVerticalWin(grid, player) ||
           checkDiagonalDownWin(grid, player) ||
           checkDiagonalUpWin(grid, player);
}

/**
 * Détection verticale.
 */
public static boolean checkVerticalWin(char[][] grid, char player) {
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

/**
 * Détection diagonale descendante ↘.
 */
public static boolean checkDiagonalDownWin(char[][] grid, char player) {
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

/**
 * Détection diagonale montante ↗.
 */
public static boolean checkDiagonalUpWin(char[][] grid, char player) {
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

**Dans la boucle de jeu :**

```java
// Remplacer checkHorizontalWin par hasWon
if (hasWon(grid, currentPlayer)) {
    System.out.println();
    displayGrid(grid);
    System.out.println("\nLe joueur " + currentPlayer + " a gagné !");
    break;
}
```

**Explication :**

- Chaque fonction suit le même principe que l'horizontal mais dans une direction
  différente
- Les diagonales avancent à la fois en ligne ET en colonne
- `hasWon()` combine toutes les vérifications avec l'opérateur `||`

</details>

---

## Exercice 6 : Match nul et jeu complet

**Objectif :** Finaliser le jeu avec la détection de match nul.

**Consigne :**

Implémentez une fonction `isGridFull(char[][] grid)` qui vérifie si la grille
est complètement pleine. Une astuce : si la première ligne est pleine, toute la
grille est pleine !

Ajoutez cette vérification dans la boucle de jeu, après la vérification de
victoire.

Améliorez également :

- Utilisez des constantes pour les dimensions et les symboles
- Ajoutez des messages clairs et informatifs
- Assurez-vous que le code est bien commenté

**Test final :**

Jouez une partie complète ! Essayez de :

- Gagner horizontalement
- Gagner verticalement
- Gagner en diagonale
- Remplir la grille pour un match nul

<details>
<summary>Solution</summary>

```java
/**
 * Vérifie si la grille est pleine (match nul).
 */
public static boolean isGridFull(char[][] grid) {
    // Vérifier la première ligne
    // Si elle est pleine, toute la grille est pleine
    for (int col = 0; col < grid[0].length; col++) {
        if (grid[0][col] == ' ') {
            return false;  // Au moins une case libre
        }
    }
    return true;  // Toutes les colonnes sont pleines
}
```

**Dans la boucle de jeu :**

```java
placeToken(grid, columnIndex, currentPlayer);

// Vérifier victoire
if (hasWon(grid, currentPlayer)) {
    System.out.println();
    displayGrid(grid);
    System.out.println("\n🎉 Le joueur " + currentPlayer + " a gagné !");
    break;
}

// Vérifier match nul
if (isGridFull(grid)) {
    System.out.println();
    displayGrid(grid);
    System.out.println("\n🤝 Match nul ! La grille est pleine.");
    break;
}

if (currentPlayer == 'X') {
    currentPlayer = 'O';
} else {
    currentPlayer = 'X';
}
```

**Constantes recommandées :**

```java
public static final int ROWS = 6;
public static final int COLS = 7;
public static final char PLAYER1 = 'X';
public static final char PLAYER2 = 'O';
public static final char EMPTY = ' ';
```

**Félicitations !** Vous avez un Puissance 4 complet et fonctionnel !

</details>

---

## Pour aller plus loin

Maintenant que vous avez un jeu fonctionnel, voici des extensions possibles :

1. **Interface colorée** : Utilisez des codes ANSI pour colorer les pions
2. **Rejouer** : Proposez de recommencer après une partie
3. **Scores** : Comptez les victoires de chaque joueur
4. **Grille personnalisable** : Demandez les dimensions au début
5. **IA simple** : Créez un adversaire qui joue aléatoirement
6. **Historique** : Affichez la liste des coups joués
7. **Annuler** : Permettez d'annuler le dernier coup
8. **Sauvegarder** : Enregistrez et chargez des parties

**Choisissez ce qui vous intéresse et amusez-vous !**

[licence]:
	https://github.com/heig-vd-progim-course/heig-vd-progim1-course/blob/main/LICENSE.md
