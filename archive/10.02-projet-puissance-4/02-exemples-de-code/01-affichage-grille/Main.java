/**
 * Puissance 4 - Étape 1 : Affichage de la grille
 * 
 * Cette première étape met en place la structure de base :
 * - Création d'un tableau 2D pour représenter la grille
 * - Initialisation avec des cases vides
 * - Affichage formaté de la grille
 * 
 * Documentation : https://docs.oracle.com/en/java/javase/17/docs/api/
 */
public class Main {
    

    /**
     * Crée une grille de Puissance 4 vide (6 lignes × 7 colonnes).
     * Chaque case est initialisée avec un espace ' ' pour représenter une case
     * vide.
     * 
     * @return un tableau 2D de caractères représentant la grille
     */
    public static char[][] createGrid() {
        // Grille standard : 6 lignes (hauteur) × 7 colonnes (largeur)
        char[][] grid = new char[6][7];

        // Initialiser toutes les cases à vide (espace)
        for (int row = 0; row < grid.length; row++) {
            for (int col = 0; col < grid[row].length; col++) {
                grid[row][col] = ' ';
            }
        }

        return grid;
    }

    /**
     * Affiche la grille de jeu dans la console.
     * Chaque case est entourée de pipes '|' pour la lisibilité.
     * Les numéros de colonnes sont affichés en bas pour aider le joueur.
     * 
     * @param grid le tableau 2D représentant la grille
     */
    public static void displayGrid(char[][] grid) {
        // Parcourir chaque ligne
        for (int row = 0; row < grid.length; row++) {
            System.out.print("|");

            // Parcourir chaque colonne de la ligne
            for (int col = 0; col < grid[row].length; col++) {
                System.out.print(grid[row][col] + "|");
            }

            // Passer à la ligne suivante
            System.out.println();
        }

        // Afficher les numéros de colonnes (de 1 à 7 pour l'utilisatrice)
        System.out.println(" 1 2 3 4 5 6 7");
    }

    public static void main(String[] args) {
        System.out.println("=== Puissance 4 - Étape 1 : Affichage de la grille ===\n");

        // Création et initialisation de la grille
        char[][] grid = createGrid();

        // Affichage de la grille vide
        displayGrid(grid);
    }
}
