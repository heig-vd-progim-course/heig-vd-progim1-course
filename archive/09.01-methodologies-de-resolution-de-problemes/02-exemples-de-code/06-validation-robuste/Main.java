import java.util.Scanner;

/**
 * Programme de gestion de notes - Étape 6
 * 
 * Version avec validation robuste des entrées utilisatrice.
 * Cette version ajoute :
 * - La validation du type de données saisies (hasNextInt)
 * - La validation des valeurs (plage acceptable)
 * - La gestion des erreurs de saisie
 * - Des boucles pour redemander jusqu'à obtenir une valeur valide
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=== Programme de gestion de notes - Étape 6 ===\n");

        // Création du Scanner pour lire les entrées
        Scanner scanner = new Scanner(System.in);

        // Demande du nombre de notes à saisir avec validation
        int count = 0;
        boolean validCount = false;

        while (!validCount) {
            System.out.print("Combien de notes souhaitez-vous saisir ? ");

            // Vérification que l'entrée est bien un nombre entier
            if (scanner.hasNextInt()) {
                count = scanner.nextInt();

                // Validation du nombre
                if (count > 0) {
                    validCount = true;
                } else {
                    System.out.println("Erreur : le nombre de notes doit être positif");
                }
            } else {
                System.out.println("Erreur : veuillez entrer un nombre entier valide");
                scanner.next(); // Consommer l'entrée invalide
            }
        }

        // Création du tableau de la taille appropriée
        int[] notes = new int[count];

        System.out.println("\n--- Saisie des notes ---");
        // Saisie des notes avec validation
        for (int i = 0; i < count; i++) {
            boolean valid = false;

            while (!valid) {
                System.out.print("Entrez la note " + (i + 1) + " (entre 1 et 6) : ");

                // Vérification que l'entrée est bien un nombre entier
                if (scanner.hasNextInt()) {
                    int grade = scanner.nextInt();

                    // Validation de la note
                    if (grade >= 1 && grade <= 6) {
                        notes[i] = grade;
                        valid = true;
                    } else {
                        System.out.println("Erreur : la note doit être entre 1 et 6");
                    }
                } else {
                    System.out.println("Erreur : veuillez entrer un nombre entier valide");
                    scanner.next(); // Consommer l'entrée invalide
                }
            }
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

        // Proposition de modification avec validation
        System.out.println("\n--- Modification d'une note ---");
        System.out.print("Souhaitez-vous modifier une note ? (oui/non) : ");
        scanner.nextLine(); // Consommer le retour à la ligne restant
        String response = scanner.nextLine().toLowerCase();

        if (response.equals("oui") || response.equals("o")) {
            boolean validModification = false;

            while (!validModification) {
                System.out.print("Quelle note souhaitez-vous modifier ? (1-" + count + ") : ");

                if (scanner.hasNextInt()) {
                    int indexToModify = scanner.nextInt() - 1;

                    // Validation de l'index
                    if (indexToModify >= 0 && indexToModify < count) {
                        System.out.println("Note actuelle : " + notes[indexToModify]);

                        boolean validNewGrade = false;
                        while (!validNewGrade) {
                            System.out.print("Entrez la nouvelle note (entre 1 et 6) : ");

                            if (scanner.hasNextInt()) {
                                int newGrade = scanner.nextInt();

                                if (newGrade >= 1 && newGrade <= 6) {
                                    notes[indexToModify] = newGrade;
                                    validNewGrade = true;
                                    validModification = true;
                                    System.out.println("Note modifiée avec succès !");
                                } else {
                                    System.out.println("Erreur : la note doit être entre 1 et 6");
                                }
                            } else {
                                System.out.println("Erreur : veuillez entrer un nombre entier valide");
                                scanner.next(); // Consommer l'entrée invalide
                            }
                        }
                    } else {
                        System.out.println("Erreur : l'index doit être entre 1 et " + count);
                    }
                } else {
                    System.out.println("Erreur : veuillez entrer un nombre entier valide");
                    scanner.next(); // Consommer l'entrée invalide
                }
            }

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
