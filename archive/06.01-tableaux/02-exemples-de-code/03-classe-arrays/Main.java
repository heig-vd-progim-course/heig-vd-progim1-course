import java.util.Arrays;

/**
 * Exemple d'utilisation des méthodes utilitaires de la classe Arrays.
 * 
 * Documentation :
 * https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Arrays.html
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=== Exemple : Classe Arrays ===\n");

        // Création d'un tableau de scores
        int[] scores = { 85, 92, 78, 95, 88 };

        // Affichage avec toString
        System.out.println("Scores originaux :");
        System.out.println(Arrays.toString(scores));

        // Tri avec sort
        System.out.println("\nTri des scores...");
        Arrays.sort(scores);
        System.out.println("Scores triés :");
        System.out.println(Arrays.toString(scores));

        // Copie avec copyOf
        System.out.println("\nCopie du tableau...");
        int[] scoresCopy = Arrays.copyOf(scores, scores.length);
        System.out.println("Copie : " + Arrays.toString(scoresCopy));

        // Copie partielle (3 premiers éléments)
        int[] partialCopy = Arrays.copyOf(scores, 3);
        System.out.println("Copie partielle : " + Arrays.toString(partialCopy));

        // Copie avec extension
        int[] extendedCopy = Arrays.copyOf(scores, 8);
        System.out.println("Copie étendue : " + Arrays.toString(extendedCopy));

        // Remplissage avec fill
        System.out.println("\nCréation d'un nouveau tableau rempli de 100...");
        int[] filledArray = new int[5];
        Arrays.fill(filledArray, 100);
        System.out.println("Tableau rempli : " + Arrays.toString(filledArray));

        // Comparaison avec equals
        System.out.println("\nComparaison de tableaux...");
        int[] array1 = { 1, 2, 3 };
        int[] array2 = { 1, 2, 3 };
        int[] array3 = { 3, 2, 1 };

        System.out.println("array1 : " + Arrays.toString(array1));
        System.out.println("array2 : " + Arrays.toString(array2));
        System.out.println("array3 : " + Arrays.toString(array3));

        System.out.println("\narray1 equals array2 ? " + Arrays.equals(array1, array2));
        System.out.println("array1 equals array3 ? " + Arrays.equals(array1, array3));

        // Tri de chaînes de caractères
        System.out.println("\nTri de noms...");
        String[] names = { "Amaru", "Ariel", "Nox", "David" };
        System.out.println("Avant tri : " + Arrays.toString(names));
        Arrays.sort(names);
        System.out.println("Après tri : " + Arrays.toString(names));

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
