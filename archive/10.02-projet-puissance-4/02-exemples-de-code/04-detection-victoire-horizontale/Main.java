import java.util.Scanner;

/**
 * Puissance 4 - Étape 4 : Détection de victoire horizontale
 * 
 * Cette étape ajoute la première détection de victoire :
 * - Algorithme de fenêtre glissante pour l'horizontal
 * - Vérification après chaque coup
 * - Annonce du gagnant et fin de partie
 * 
 * Documentation : https://docs.oracle.com/en/java/javase/17/docs/api/
 */
public class Main {
    

    /**
     * Crée une grille de Puissance 4 vide.
     * 
     * @return un tableau 2D de caractères
     */
    public static char[][] createGrid() {
        char[][] grid = new char[6][7];
        for (int row = 0; row < grid.length; row++) {
            for (int col = 0; col < grid[row].length; col++) {
                grid[row][col] = ' ';
            }
        }
        return grid;
    }

    /**
     * Affiche la grille.
     * 
     * @param grid le tableau 2D représentant la grille
     */
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

    /**
     * Trouve la ligne la plus basse disponible dans une colonne.
     * 
     * @param grid le tableau 2D représentant la grille
     * @param col  l'index de la colonne
     * @return l'index de la ligne disponible, ou -1 si pleine
     */
    public static int findLowestRow(char[][] grid, int col) {
        for (int row = grid.length - 1; row >= 0; row--) {
            if (grid[row][col] == ' ') {
                return row;
            }
        }
        return -1;
    }

    /**
     * Place un pion dans la colonne spécifiée.
     * 
     * @param grid   le tableau 2D
     * @param col    l'index de la colonne
     * @param player le symbole de la joueuse
     * @return l'index de la ligne où le pion a été placé
     */
    public static int placeToken(char[][] grid, int col, char player) {
        int row = findLowestRow(grid, col);
        if (row != -1) {
            grid[row][col] = player;
        }
        return row;
    }

    /**
     * Vérifie s'il y a une victoire horizontale (4 pions alignés sur une ligne).
     * Utilise l'algorithme de la fenêtre glissante : pour chaque ligne,
     * on vérifie toutes les séquences possibles de 4 cases consécutives.
     * 
     * @param grid   le tableau 2D représentant la grille
     * @param player le symbole de la joueuse à vérifier
     * @return true si le joueur a 4 pions alignés horizontalement, false sinon
     */
    public static boolean checkHorizontalWin(char[][] grid, char player) {
        // Parcourir chaque ligne
        for (int row = 0; row < grid.length; row++) {
            // Pour chaque ligne, vérifier toutes les positions possibles
            // On s'arrête à grid[row].length - 4 car on a besoin de 4 cases
            for (int col = 0; col <= grid[row].length - 4; col++) {
                // Vérifier si les 4 cases consécutives contiennent le symbole de la joueuse
                if (grid[row][col] == player &&
                        grid[row][col + 1] == player &&
                        grid[row][col + 2] == player &&
                        grid[row][col + 3] == player) {
                    return true; // Victoire trouvée !
                }
            }
        }
        return false; // Aucune victoire horizontale
    }

    public static void main(String[] args) {
        System.out.println("=== Puissance 4 - Étape 4 : Détection de victoire horizontale ===\n");

        char[][] grid = createGrid();
        char currentPlayer = 'X';
        Scanner scanner = new Scanner(System.in);

        // Boucle de jeu
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

            // Vérifier s'il y a victoire horizontale
            if (checkHorizontalWin(grid, currentPlayer)) {
                System.out.println();
                displayGrid(grid);
                System.out.println("\nLe joueur " + currentPlayer + " a gagné horizontalement !");
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
