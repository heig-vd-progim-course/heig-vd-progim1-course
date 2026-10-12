import java.util.Scanner;

/**
 * Puissance 4 - Étape 3 : Alternance des joueuses
 * 
 * Cette étape ajoute le système de tour par tour :
 * - Boucle de jeu pour placer plusieurs pions
 * - Alternance automatique entre les joueurs X et O
 * - Validation de la colonne (non pleine)
 * - Possibilité de quitter avec 0
 * 
 * Documentation : https://docs.oracle.com/en/java/javase/17/docs/api/
 */
public class Main {
    

    /**
     * Crée une grille de Puissance 4 vide (6 lignes × 7 colonnes).
     * 
     * @return un tableau 2D de caractères représentant la grille
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
     * Affiche la grille de jeu dans la console.
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
     * Trouve la ligne la plus basse disponible dans une colonne donnée.
     * 
     * @param grid le tableau 2D représentant la grille
     * @param col  l'index de la colonne (0-6)
     * @return l'index de la ligne disponible, ou -1 si la colonne est pleine
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
     * @param grid   le tableau 2D représentant la grille
     * @param col    l'index de la colonne (0-6)
     * @param player le symbole de la joueuse ('X' ou 'O')
     * @return l'index de la ligne où le pion a été placé, ou -1 si impossible
     */
    public static int placeToken(char[][] grid, int col, char player) {
        int row = findLowestRow(grid, col);

        if (row != -1) {
            grid[row][col] = player;
            return row;
        }

        return -1;
    }

    public static void main(String[] args) {
        System.out.println("=== Puissance 4 - Étape 3 : Alternance des joueuses ===\n");

        // Création et initialisation de la grille
        char[][] grid = createGrid();

        // Le joueur X commence toujours
        char currentPlayer = 'X';

        Scanner scanner = new Scanner(System.in);

        // Boucle de jeu
        while (true) {
            // Afficher la grille
            displayGrid(grid);

            // Demander au joueur courant de jouer
            System.out.print("\nJoueur " + currentPlayer +
                    " - Choisissez une colonne (1-7, 0 pour quitter) : ");
            int column = scanner.nextInt();

            // Permettre de quitter
            if (column == 0) {
                System.out.println("Fin de la partie.");
                break;
            }

            // Convertir en index tableau
            int columnIndex = column - 1;

            // Vérifier que la colonne est valide
            if (columnIndex < 0 || columnIndex >= 7) {
                System.out.println("Colonne invalide ! Choisissez entre 1 et 7.");
                continue;
            }

            // Vérifier que la colonne n'est pas pleine
            if (findLowestRow(grid, columnIndex) == -1) {
                System.out.println("Cette colonne est pleine ! Choisissez-en une autre.");
                continue;
            }

            // Placer le pion
            placeToken(grid, columnIndex, currentPlayer);

            // Alterner les joueurs
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
