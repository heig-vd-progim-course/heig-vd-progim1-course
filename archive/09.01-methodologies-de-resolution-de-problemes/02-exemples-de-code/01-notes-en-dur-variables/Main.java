/**
 * Programme de gestion de notes - Étape 1
 * 
 * Version initiale avec variables individuelles et calculs dans main.
 * Cette version montre la progression dans l'affichage des notes :
 * - Affichage individuel avec System.out.println pour chaque note
 * - Affichage avec boucle while
 * - Affichage avec boucle for
 * - Calcul du minimum, maximum et moyenne
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=== Programme de gestion de notes - Étape 1 ===\n");

        // Déclaration et initialisation de 5 notes
        int note1 = 5;
        int note2 = 6;
        int note3 = 4;
        int note4 = 4;
        int note5 = 5;

        System.out.println("--- Affichage individuel ---");
        // Affichage de chaque note individuellement
        System.out.println("Note 1 : " + note1);
        System.out.println("Note 2 : " + note2);
        System.out.println("Note 3 : " + note3);
        System.out.println("Note 4 : " + note4);
        System.out.println("Note 5 : " + note5);

        System.out.println("\n--- Calcul de la moyenne ---");
        // Calcul de la moyenne
        int sum = note1 + note2 + note3 + note4 + note5;
        double average = sum / 5.0;

        System.out.println("\n=== Résumé des statistiques ===");
        System.out.println("Moyenne : " + average);
    }
}
