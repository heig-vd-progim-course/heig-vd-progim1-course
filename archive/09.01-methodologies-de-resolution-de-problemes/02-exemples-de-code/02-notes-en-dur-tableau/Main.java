/**
 * Programme de gestion de notes - Étape 2
 * 
 * Version avec tableau pour stocker les notes.
 * Cette version simplifie grandement le code par rapport à l'étape 1 :
 * - Un seul tableau au lieu de 5 variables individuelles
 * - Boucles simplifiées pour l'affichage
 * - Calculs simplifiés pour min, max et moyenne
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=== Programme de gestion de notes - Étape 2 ===\n");

        // Déclaration et initialisation d'un tableau de 5 notes
        int[] notes = { 5, 6, 4, 4, 5 };

        System.out.println("--- Affichage avec boucle for classique ---");
        // Affichage avec une boucle for utilisant les indices
        for (int i = 0; i < notes.length; i++) {
            System.out.println("Note " + (i + 1) + " : " + notes[i]);
        }

        System.out.println("\n--- Affichage avec boucle for-each ---");
        // Affichage avec une boucle for-each
        int index = 1;
        for (int note : notes) {
            System.out.println("Note " + index + " : " + note);
            index++;
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
    }
}
