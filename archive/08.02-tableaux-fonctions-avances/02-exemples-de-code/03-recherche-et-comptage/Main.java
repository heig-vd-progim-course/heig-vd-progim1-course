/**
 * Démonstration d'algorithmes de recherche et de comptage dans un tableau.
 * 
 * Ce programme illustre différentes techniques pour rechercher un élément
 * et compter ses occurrences, appliquées à la gestion d'une bibliothèque
 * de quartier.
 */
public class Main {

    

    /**
     * Démontre la recherche linéaire avec différentes boucles.
     */
    public static void demonstrateLinearSearch(int[] array) {
        int searchTarget = 205;

        // Recherche avec boucle for
        System.out.println("--- Recherche avec for ---");
        int indexFor = linearSearchFor(array, searchTarget);
        if (indexFor != -1) {
            System.out.println(String.format("Livre %d trouvé à la position %d",
                    searchTarget, indexFor));
        } else {
            System.out.println(String.format("Livre %d non trouvé", searchTarget));
        }

        // Recherche avec boucle while
        System.out.println("\n--- Recherche avec while ---");
        int indexWhile = linearSearchWhile(array, searchTarget);
        if (indexWhile != -1) {
            System.out.println(String.format("Livre %d trouvé à la position %d",
                    searchTarget, indexWhile));
        } else {
            System.out.println(String.format("Livre %d non trouvé", searchTarget));
        }

        // Recherche avec boucle do-while
        System.out.println("\n--- Recherche avec do-while ---");
        int indexDoWhile = linearSearchDoWhile(array, searchTarget);
        if (indexDoWhile != -1) {
            System.out.println(String.format("Livre %d trouvé à la position %d",
                    searchTarget, indexDoWhile));
        } else {
            System.out.println(String.format("Livre %d non trouvé", searchTarget));
        }
    }

    /**
     * Recherche linéaire avec boucle for.
     */
    public static int linearSearchFor(int[] array, int target) {
        for (int i = 0; i < array.length; i++) {
            if (array[i] == target) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Recherche linéaire avec boucle while.
     */
    public static int linearSearchWhile(int[] array, int target) {
        int index = 0;

        while (index < array.length) {
            if (array[index] == target) {
                return index;
            }
            index++;
        }

        return -1;
    }

    /**
     * Recherche linéaire avec boucle do-while.
     */
    public static int linearSearchDoWhile(int[] array, int target) {
        if (array.length == 0) {
            return -1;
        }

        int index = 0;

        do {
            if (array[index] == target) {
                return index;
            }
            index++;
        } while (index < array.length);

        return -1;
    }

    /**
     * Démontre le comptage d'occurrences avec différentes boucles.
     */
    public static void demonstrateCountOccurrences(int[] array) {
        int bookId = 101;

        // Comptage avec for classique
        System.out.println("--- Comptage avec for classique ---");
        int countFor = countOccurrencesFor(array, bookId);
        System.out.println(String.format("Livre %d emprunté %d fois", bookId, countFor));

        // Comptage avec for-each
        System.out.println("\n--- Comptage avec for-each ---");
        int countForEach = countOccurrencesForEach(array, bookId);
        System.out.println(String.format("Livre %d emprunté %d fois", bookId, countForEach));

        // Comptage avec while
        System.out.println("\n--- Comptage avec while ---");
        int countWhile = countOccurrencesWhile(array, bookId);
        System.out.println(String.format("Livre %d emprunté %d fois", bookId, countWhile));
    }

    /**
     * Compte les occurrences avec boucle for classique.
     */
    public static int countOccurrencesFor(int[] array, int value) {
        int count = 0;

        for (int i = 0; i < array.length; i++) {
            if (array[i] == value) {
                count++;
            }
        }

        return count;
    }

    /**
     * Compte les occurrences avec boucle for-each.
     */
    public static int countOccurrencesForEach(int[] array, int value) {
        int count = 0;

        for (int element : array) {
            if (element == value) {
                count++;
            }
        }

        return count;
    }

    /**
     * Compte les occurrences avec boucle while.
     */
    public static int countOccurrencesWhile(int[] array, int value) {
        int count = 0;
        int index = 0;

        while (index < array.length) {
            if (array[index] == value) {
                count++;
            }
            index++;
        }

        return count;
    }

    /**
     * Analyse les livres les plus populaires de la bibliothèque.
     */
    public static void analyzePopularBooks(int[] borrowedBooks) {
        // Identifie les IDs uniques (approche simple pour cet exemple)
        int[] uniqueBooks = { 101, 205, 342, 456, 789 };
        String[] bookTitles = {
                "Permaculture urbaine",
                "Repair Café : Guide pratique",
                "Sobriété numérique",
                "Jardins partagés",
                "Économie circulaire"
        };

        System.out.println("Popularité des livres :");

        int maxBorrows = 0;
        int mostPopularIndex = 0;

        for (int i = 0; i < uniqueBooks.length; i++) {
            int count = countOccurrencesFor(borrowedBooks, uniqueBooks[i]);
            System.out.println(String.format("- %s (ID %d) : %d emprunts",
                    bookTitles[i], uniqueBooks[i], count));

            if (count > maxBorrows) {
                maxBorrows = count;
                mostPopularIndex = i;
            }
        }

        System.out.println(String.format("\n📚 Le livre le plus emprunté est : %s (%d emprunts)",
                bookTitles[mostPopularIndex], maxBorrows));
        System.out.println("💡 Conseil : Envisagez d'acquérir un exemplaire supplémentaire " +
                "de ce livre populaire !");
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Recherche et comptage ===\n");

        // IDs des livres empruntés dans une bibliothèque de quartier
        // Chaque ID correspond à un livre, les doublons indiquent plusieurs emprunts
        int[] borrowedBooks = { 101, 205, 342, 101, 456, 205, 789, 101, 342, 205, 101 };

        System.out.println("=== Recherche linéaire ===\n");
        demonstrateLinearSearch(borrowedBooks);

        System.out.println("\n=== Comptage d'occurrences ===\n");
        demonstrateCountOccurrences(borrowedBooks);

        System.out.println("\n=== Analyse des emprunts ===\n");
        analyzePopularBooks(borrowedBooks);

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
