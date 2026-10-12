import java.util.Scanner;

/**
 * Puissance 4 - Jeu complet
 * 
 * Version finale jouable avec toutes les fonctionnalités :
 * - Affichage de la grille
 * - Placement des pions avec gravité
 * - Alternance des joueuses
 * - Détection de victoire (horizontale, verticale, diagonales)
 * - Détection de match nul
 * - Validation des entrées
 * - Messages clairs et informatifs
 * 
 * Règles :
 * - Grille de 6 lignes × 7 colonnes
 * - 2 joueurs : X (rouge) et O (jaune)
 * - Tour par tour, placer un pion dans une colonne
 * - Le pion tombe à la position la plus basse disponible
 * - Le premier à aligner 4 pions gagne
 * - Si la grille est pleine sans alignement : match nul
 * 
 * Documentation : https://docs.oracle.com/en/java/javase/17/docs/api/
 */
public class Main {
    // Constantes pour la configuration du jeu
    public static final int ROWS = 6;
    public static final int COLS = 7;
    public static final char PLAYER1 = 'X';
    public static final char PLAYER2 = 'O';
    public static final char EMPTY = ' ';

    /**
     * Efface l'écran du terminal.
     * Utilise les codes ANSI pour positionner le curseur et effacer l'écran.
     * Fonctionne sur la plupart des terminaux Unix/Linux/macOS et Windows modernes.
     */
    public static void clearScreen() {
        System.out.print("\033[H\033[2J");
        System.out.flush();
    }

    /**
     * Crée une grille de Puissance 4 vide.
     * Toutes les cases sont initialisées avec le caractère EMPTY.
     * 
     * @return un tableau 2D de caractères représentant la grille
     */
    public static char[][] createGrid() {
        char[][] grid = new char[ROWS][COLS];

        for (int row = 0; row < grid.length; row++) {
            for (int col = 0; col < grid[row].length; col++) {
                grid[row][col] = EMPTY;
            }
        }

        return grid;
    }

    /**
     * Affiche la grille de jeu dans la console.
     * Chaque case est entourée de pipes '|' pour la lisibilité.
     * Les numéros de colonnes sont affichés en bas.
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
     * Parcours la colonne de bas en haut pour simuler la gravité.
     * 
     * @param grid le tableau 2D représentant la grille
     * @param col  l'index de la colonne (0-6)
     * @return l'index de la ligne disponible, ou -1 si la colonne est pleine
     */
    public static int findLowestRow(char[][] grid, int col) {
        // Parcourir de la dernière ligne vers le haut
        for (int row = grid.length - 1; row >= 0; row--) {
            if (grid[row][col] == EMPTY) {
                return row; // Première case vide trouvée
            }
        }
        return -1; // Colonne pleine
    }

    /**
     * Place un pion dans la colonne spécifiée.
     * Le pion tombe à la position la plus basse disponible.
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
        }

        return row;
    }

    /**
     * Vérifie si le joueur a gagné.
     * Combine toutes les formes de victoire possibles.
     * 
     * @param grid   le tableau 2D représentant la grille
     * @param player le symbole de la joueuse à vérifier
     * @return true si le joueur a gagné, false sinon
     */
    public static boolean hasWon(char[][] grid, char player) {
        return checkHorizontalWin(grid, player) ||
                checkVerticalWin(grid, player) ||
                checkDiagonalDownWin(grid, player) ||
                checkDiagonalUpWin(grid, player);
    }

    /**
     * Vérifie une victoire horizontale (4 pions alignés sur une ligne).
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
     * 
     * @param grid   le tableau 2D
     * @param player le symbole de la joueuse
     * @return true si victoire verticale
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
     * Vérifie une victoire en diagonale descendante (↘).
     * De haut-gauche vers bas-droite.
     * 
     * @param grid   le tableau 2D
     * @param player le symbole de la joueuse
     * @return true si victoire diagonale descendante
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
     * Vérifie une victoire en diagonale montante (↗).
     * De bas-gauche vers haut-droite.
     * 
     * @param grid   le tableau 2D
     * @param player le symbole de la joueuse
     * @return true si victoire diagonale montante
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

    /**
     * Vérifie si la grille est complètement pleine.
     * Si la première ligne est pleine, toute la grille est pleine.
     * 
     * @param grid le tableau 2D représentant la grille
     * @return true si la grille est pleine, false sinon
     */
    public static boolean isGridFull(char[][] grid) {
        // Il suffit de vérifier la première ligne
        // Si elle est pleine, toute la grille est pleine
        for (int col = 0; col < grid[0].length; col++) {
            if (grid[0][col] == EMPTY) {
                return false; // Au moins une case libre trouvée
            }
        }
        return true; // Toutes les colonnes sont pleines
    }

    public static void main(String[] args) {
        System.out.println("=== Puissance 4 - Jeu complet ===\n");

        // Initialisation
        char[][] grid = createGrid();
        char currentPlayer = PLAYER1;
        Scanner scanner = new Scanner(System.in);

        // Boucle de jeu principale
        while (true) {
            // Effacer l'écran pour un affichage propre
            clearScreen();

            // Titre du jeu
            System.out.println("=== Puissance 4 ===");
            System.out.println();

            // Afficher l'état actuel de la grille
            displayGrid(grid);

            // Demander au joueur de choisir une colonne
            System.out.print("\nJoueur " + currentPlayer +
                    " - Choisissez une colonne (1-7, 0 pour quitter) : ");
            int column = scanner.nextInt();

            // Permettre de quitter
            if (column == 0) {
                System.out.println("Fin de la partie.");
                break;
            }

            // Convertir la colonne utilisatrice (1-7) en index tableau (0-6)
            int columnIndex = column - 1;

            // Validation de la colonne
            if (columnIndex < 0 || columnIndex >= COLS) {
                System.out.println("❌ Colonne invalide ! Choisissez entre 1 et 7.");
                continue;
            }

            // Vérifier que la colonne n'est pas pleine
            if (findLowestRow(grid, columnIndex) == -1) {
                System.out.println("❌ Cette colonne est pleine ! Choisissez-en une autre.");
                continue;
            }

            // Placer le pion
            placeToken(grid, columnIndex, currentPlayer);

            // Vérifier s'il y a victoire
            if (hasWon(grid, currentPlayer)) {
                clearScreen();
                System.out.println("=== Puissance 4 ===");
                System.out.println();
                displayGrid(grid);
                System.out.println("\n🎉 Le joueur " + currentPlayer + " a gagné !");
                break;
            }

            // Vérifier s'il y a match nul
            if (isGridFull(grid)) {
                clearScreen();
                System.out.println("=== Puissance 4 ===");
                System.out.println();
                displayGrid(grid);
                System.out.println("\n🤝 Match nul ! La grille est pleine.");
                break;
            }

            // Alterner les joueurs
            if (currentPlayer == PLAYER1) {
                currentPlayer = PLAYER2;
            } else {
                currentPlayer = PLAYER1;
            }
        }

        scanner.close();
    }
}
