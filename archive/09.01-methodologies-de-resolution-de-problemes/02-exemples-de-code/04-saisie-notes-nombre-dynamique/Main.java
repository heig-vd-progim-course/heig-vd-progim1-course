import java.util.Scanner;

/**
 * Programme de gestion de notes - Étape 4
 * 
 * Version avec saisie interactive des notes (nombre dynamique).
 * Cette version ajoute :
 * - La possibilité pour l'utilisatrice de choisir le nombre de notes
 * - La création d'un tableau de taille dynamique
 * - Une meilleure flexibilité du programme
 * 
 * Note : Cette version suppose que l'utilisatrice entre des valeurs correctes.
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=== Programme de gestion de notes - Étape 4 ===\n");

        // Création du Scanner pour lire les entrées
        Scanner scanner = new Scanner(System.in);

        // Demande du nombre de notes à saisir
        System.out.print("Combien de notes souhaitez-vous saisir ? ");
        int count = scanner.nextInt();

        // Création du tableau de la taille appropriée
        int[] notes = new int[count];

        System.out.println("\n--- Saisie des notes ---");
        // Saisie des notes
        for (int i = 0; i < count; i++) {
            System.out.print("Entrez la note " + (i + 1) + " : ");
            notes[i] = scanner.nextInt();
        }

        System.out.println("\n--- Affichage des notes saisies ---");
        // Affichage des notes
        for (int i = 0; i < notes.length; i++) {
            System.out.println("Note " + (i + 1) + " : " + notes[i]);
        }

        System.out.println("\n--- Calcul du minimum ---");
        // Calcul du minimum
        int min = notes[0];
        for (int i = 1; i < notes.length; i++) {
            if (notes[i] < min) {
                min = notes[i];
            }
        }
        System.out.println("Note minimale : " + min);

        System.out.println("\n--- Calcul du maximum ---");
        // Calcul du maximum
        int max = notes[0];
        for (int i = 1; i < notes.length; i++) {
            if (notes[i] > max) {
                max = notes[i];
            }
        }
        System.out.println("Note maximale : " + max);

        System.out.println("\n--- Calcul de la moyenne ---");
        // Calcul de la moyenne
        int sum = 0;
        for (int note : notes) {
            sum += note;
        }
        double average = sum / (double) notes.length;
        System.out.println("Moyenne : " + average);

        System.out.println("\n=== Résumé des statistiques ===");
        System.out.println("Minimum : " + min);
        System.out.println("Maximum : " + max);
        System.out.println("Moyenne : " + average);

        // Fermeture du Scanner
        scanner.close();
    }
}
