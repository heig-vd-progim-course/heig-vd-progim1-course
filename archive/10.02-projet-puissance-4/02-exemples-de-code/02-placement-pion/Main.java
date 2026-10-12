import java.util.Scanner;

/**
 * Puissance 4 - Étape 2 : Placement d'un pion
 * 
 * Cette étape ajoute la fonctionnalité de placement d'un pion :
 * - Demande de colonne au joueur
 * - Validation de l'entrée
 * - Implémentation de la gravité (le pion tombe au plus bas)
 * - Vérification que la colonne n'est pas pleine
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
     * La gravité fait tomber le pion jusqu'en bas.
     * 
     * @param grid le tableau 2D représentant la grille
     * @param col  l'index de la colonne (0-6)
     * @return l'index de la ligne disponible, ou -1 si la colonne est pleine
     */
    public static int findLowestRow(char[][] grid, int col) {
        // Parcourir la colonne de bas en haut
        for (int row = grid.length - 1; row >= 0; row--) {
            // Si la case est vide, c'est la position où le pion tombera
            if (grid[row][col] == ' ') {
                return row;
            }
        }
        // Si on arrive ici, la colonne est pleine
        return -1;
    }

    /**
     * Place un pion dans la colonne spécifiée en respectant la gravité.
     * Le pion tombe à la position la plus basse disponible.
     * 
     * @param grid   le tableau 2D représentant la grille
     * @param col    l'index de la colonne (0-6)
     * @param player le symbole de la joueuse ('X' ou 'O')
     * @return l'index de la ligne où le pion a été placé, ou -1 si impossible
     */
    public static int placeToken(char[][] grid, int col, char player) {
        // Trouver la ligne la plus basse disponible
        int row = findLowestRow(grid, col);

        // Si une position est disponible, placer le pion
        if (row != -1) {
            grid[row][col] = player;
            return row;
        }

        // Colonne pleine, placement impossible
        return -1;
    }

    public static void main(String[] args) {
        System.out.println("=== Puissance 4 - Étape 2 : Placement d'un pion ===\n");

        // Création et initialisation de la grille
        char[][] grid = createGrid();
        displayGrid(grid);

        // Scanner pour lire l'entrée utilisatrice
        Scanner scanner = new Scanner(System.in);

        // Demander au joueur de choisir une colonne
        System.out.print("\nChoisissez une colonne (1-7) : ");
        int column = scanner.nextInt();

        // Convertir la colonne utilisatrice (1-7) en index tableau (0-6)
        int columnIndex = column - 1;

        // Placer le pion X dans la colonne choisie
        placeToken(grid, columnIndex, 'X');

        // Afficher la grille après placement
        System.out.println();
        displayGrid(grid);

        scanner.close();
    }
}
