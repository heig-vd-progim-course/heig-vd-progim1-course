/**
 * Exemple d'utilisation de tableaux à deux dimensions.
 * 
 * Cet exemple montre comment créer et manipuler une matrice (grille).
 */
public class Main {
    

    /**
     * Affiche une grille de morpion de manière lisible.
     *
     * @param grid la grille à afficher
     */
    public static void displayGrid(String[][] grid) {
        for (int row = 0; row < grid.length; row++) {
            for (int col = 0; col < grid[row].length; col++) {
                System.out.print(grid[row][col]);
                if (col < grid[row].length - 1) {
                    System.out.print(" | ");
                }
            }
            System.out.println();
            if (row < grid.length - 1) {
                System.out.println("---------");
            }
        }
    }

    /**
     * Affiche une matrice numérique de manière lisible.
     *
     * @param matrix la matrice à afficher
     */
    public static void displayMatrix(int[][] matrix) {
        for (int row = 0; row < matrix.length; row++) {
            for (int col = 0; col < matrix[row].length; col++) {
                System.out.print(String.format("%4d", matrix[row][col]));
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Tableau à deux dimensions ===\n");

        // Création d'une grille de morpion (tic-tac-toe)
        String[][] grid = {
                { "X", "O", "X" },
                { "O", "X", "O" },
                { "X", "O", "X" }
        };

        // Affichage de la grille
        System.out.println("Grille de morpion :");
        displayGrid(grid);

        // Accès à un élément spécifique
        System.out.println("\nÉlément à la position [1][2] : " + grid[1][2]);

        // Modification d'un élément
        grid[0][1] = "X";
        System.out.println("\nAprès modification de [0][1] :");
        displayGrid(grid);

        // Création d'une matrice numérique
        System.out.println("\n--- Matrice numérique ---\n");
        int[][] matrix = {
                { 1, 2, 3, 4 },
                { 5, 6, 7, 8 },
                { 9, 10, 11, 12 }
        };

        System.out.println("Matrice 3x4 :");
        displayMatrix(matrix);

        // Calcul de la somme de chaque ligne
        System.out.println("\nSommes par ligne :");
        for (int row = 0; row < matrix.length; row++) {
            int sum = 0;
            for (int col = 0; col < matrix[row].length; col++) {
                sum += matrix[row][col];
            }
            System.out.println("Ligne " + row + " : " + sum);
        }

        // Calcul de la somme de chaque colonne
        System.out.println("\nSommes par colonne :");
        for (int col = 0; col < matrix[0].length; col++) {
            int sum = 0;
            for (int row = 0; row < matrix.length; row++) {
                sum += matrix[row][col];
            }
            System.out.println("Colonne " + col + " : " + sum);
        }

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
