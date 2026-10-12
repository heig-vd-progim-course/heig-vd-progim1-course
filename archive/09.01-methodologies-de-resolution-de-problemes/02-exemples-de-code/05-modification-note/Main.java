import java.util.Scanner;

/**
 * Programme de gestion de notes - Étape 5
 * 
 * Version complète avec possibilité de modifier une note.
 * Cette version ajoute :
 * - La possibilité de modifier une note après la saisie
 * - Le recalcul des statistiques après modification
 * - Une interface plus complète pour l'utilisatrice
 * 
 * Note : Cette version suppose que l'utilisatrice entre des valeurs correctes.
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=== Programme de gestion de notes - Étape 5 ===\n");

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

        // Calcul des statistiques
        System.out.println("\n--- Calcul des statistiques ---");

        int min = notes[0];
        int max = notes[0];
        int sum = 0;

        for (int i = 0; i < notes.length; i++) {
            if (notes[i] < min) {
                min = notes[i];
            }
            if (notes[i] > max) {
                max = notes[i];
            }
            sum += notes[i];
        }

        double average = sum / (double) notes.length;

        System.out.println("Minimum : " + min);
        System.out.println("Maximum : " + max);
        System.out.println("Moyenne : " + average);

        // Proposition de modification
        System.out.println("\n--- Modification d'une note ---");
        System.out.print("Souhaitez-vous modifier une note ? (oui/non) : ");
        scanner.nextLine(); // Consommer le retour à la ligne restant
        String response = scanner.nextLine().toLowerCase();

        if (response.equals("oui") || response.equals("o")) {
            System.out.print("Quelle note souhaitez-vous modifier ? (1-" + count + ") : ");
            int indexToModify = scanner.nextInt() - 1;

            System.out.println("Note actuelle : " + notes[indexToModify]);
            System.out.print("Entrez la nouvelle note : ");
            int newGrade = scanner.nextInt();

            notes[indexToModify] = newGrade;
            System.out.println("Note modifiée avec succès !");

            // Affichage des notes après modification
            System.out.println("\n--- Affichage des notes après modification ---");
            for (int i = 0; i < notes.length; i++) {
                System.out.println("Note " + (i + 1) + " : " + notes[i]);
            }

            // Recalcul des statistiques
            System.out.println("\n--- Nouvelles statistiques ---");

            min = notes[0];
            max = notes[0];
            sum = 0;

            for (int i = 0; i < notes.length; i++) {
                if (notes[i] < min) {
                    min = notes[i];
                }
                if (notes[i] > max) {
                    max = notes[i];
                }
                sum += notes[i];
            }

            average = sum / (double) notes.length;

            System.out.println("Minimum : " + min);
            System.out.println("Maximum : " + max);
            System.out.println("Moyenne : " + average);
        } else {
            System.out.println("Aucune modification effectuée.");
        }

        System.out.println("\n=== Programme terminé ===");

        // Fermeture du Scanner
        scanner.close();
    }
}
