import java.util.Scanner;

/**
 * Puissance 4 - Étape 5 : Détection de victoire verticale et diagonale
 * 
 * Cette étape complète les détections de victoire avec :
 * - Détection verticale
 * - Détection diagonale descendante (↘)
 * - Détection diagonale montante (↗)
 * - Fonction globale hasWon() qui combine toutes les détections
 * 
 * Documentation : https://docs.oracle.com/en/java/javase/17/docs/api/
 */
public class Main {
    

    public static char[][] createGrid() {
        char[][] grid = new char[6][7];
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
        System.out.println(" 1 2 3 4 5 6 7");
    }

    public static int findLowestRow(char[][] grid, int col) {
        for (int row = grid.length - 1; row >= 0; row--) {
            if (grid[row][col] == ' ') {
                return row;
            }
        }
        return -1;
    }

    public static int placeToken(char[][] grid, int col, char player) {
        int row = findLowestRow(grid, col);
        if (row != -1) {
            grid[row][col] = player;
        }
        return row;
    }

    /**
     * Vérifie si le joueur a gagné (toutes formes de victoire combinées).
     * 
     * @param grid   le tableau 2D représentant la grille
     * @param player le symbole de la joueuse
     * @return true si le joueur a gagné, false sinon
     */
    public static boolean hasWon(char[][] grid, char player) {
        return checkHorizontalWin(grid, player) ||
                checkVerticalWin(grid, player) ||
                checkDiagonalDownWin(grid, player) ||
                checkDiagonalUpWin(grid, player);
    }

    /**
     * Vérifie une victoire horizontale.
     * 
     * @param grid   le tableau 2D
     * @param player le symbole de la joueuse
     * @return true si victoire horizontale
     */
    public static boolean checkHorizontalWin(char[][] grid, char player) {
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

    /**
     * Vérifie une victoire verticale (4 pions alignés dans une colonne).
     * Parcours chaque colonne de haut en bas.
     * 
     * @param grid   le tableau 2D
     * @param player le symbole de la joueuse
     * @return true si victoire verticale
     */
    public static boolean checkVerticalWin(char[][] grid, char player) {
        // Parcourir chaque colonne
        for (int col = 0; col < grid[0].length; col++) {
            // Pour chaque colonne, vérifier toutes les positions possibles
            // On s'arrête à grid.length - 4 car on a besoin de 4 lignes
            for (int row = 0; row <= grid.length - 4; row++) {
                // Vérifier si les 4 cases consécutives verticales contiennent le symbole
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
     * Vérifie une victoire en diagonale descendante (↘).
     * De haut-gauche vers bas-droite.
     * On avance en ligne ET en colonne simultanément.
     * 
     * @param grid   le tableau 2D
     * @param player le symbole de la joueuse
     * @return true si victoire diagonale descendante
     */
    public static boolean checkDiagonalDownWin(char[][] grid, char player) {
        // On doit pouvoir descendre de 3 lignes ET aller à droite de 3 colonnes
        for (int row = 0; row <= grid.length - 4; row++) {
            for (int col = 0; col <= grid[0].length - 4; col++) {
                // Vérifier la diagonale de (row, col) vers (row+3, col+3)
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
     * Vérifie une victoire en diagonale montante (↗).
     * De bas-gauche vers haut-droite.
     * On remonte en ligne ET on avance en colonne.
     * 
     * @param grid   le tableau 2D
     * @param player le symbole de la joueuse
     * @return true si victoire diagonale montante
     */
    public static boolean checkDiagonalUpWin(char[][] grid, char player) {
        // On commence à la ligne 3 (besoin de remonter de 3 lignes)
        // On peut aller jusqu'à length - 4 en colonnes (besoin de 4 colonnes)
        for (int row = 3; row < grid.length; row++) {
            for (int col = 0; col <= grid[0].length - 4; col++) {
                // Vérifier la diagonale de (row, col) vers (row-3, col+3)
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

    public static void main(String[] args) {
        System.out.println("=== Puissance 4 - Étape 5 : Détections complètes ===\n");

        char[][] grid = createGrid();
        char currentPlayer = 'X';
        Scanner scanner = new Scanner(System.in);

        while (true) {
            displayGrid(grid);

            System.out.print("\nJoueur " + currentPlayer +
                    " - Choisissez une colonne (1-7, 0 pour quitter) : ");
            int column = scanner.nextInt();

            if (column == 0) {
                System.out.println("Fin de la partie.");
                break;
            }

            int columnIndex = column - 1;

            if (columnIndex < 0 || columnIndex >= 7) {
                System.out.println("Colonne invalide !");
                continue;
            }

            if (findLowestRow(grid, columnIndex) == -1) {
                System.out.println("Colonne pleine !");
                continue;
            }

            placeToken(grid, columnIndex, currentPlayer);

            // Vérifier toutes les formes de victoire
            if (hasWon(grid, currentPlayer)) {
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
            System.out.println();
        }

        scanner.close();
    }
}
