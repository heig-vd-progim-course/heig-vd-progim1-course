/**
 * Exemple de décomposition d'un programme en fonctions.
 * 
 * Ce programme calcule des statistiques sur des notes d'étudiants.
 * Il est décomposé en petites fonctions, chacune ayant une responsabilité
 * claire.
 */
public class Main {

    /**
     * Calcule la moyenne d'un tableau de notes.
     * 
     * @param grades le tableau de notes
     * @return la moyenne des notes
     */
    public static double calculateAverage(double[] grades) {
        double sum = 0.0;
        for (double grade : grades) {
            sum += grade;
        }
        return sum / grades.length;
    }

    /**
     * Trouve la note minimale dans un tableau.
     * 
     * @param grades le tableau de notes
     * @return la note la plus basse
     */
    public static double findMinimum(double[] grades) {
        double min = grades[0];
        for (double grade : grades) {
            if (grade < min) {
                min = grade;
            }
        }
        return min;
    }

    /**
     * Trouve la note maximale dans un tableau.
     * 
     * @param grades le tableau de notes
     * @return la note la plus haute
     */
    public static double findMaximum(double[] grades) {
        double max = grades[0];
        for (double grade : grades) {
            if (grade > max) {
                max = grade;
            }
        }
        return max;
    }

    /**
     * Compte le nombre de notes supérieures ou égales à 4.0 (réussite).
     * 
     * @param grades le tableau de notes
     * @return le nombre de réussites
     */
    public static int countPassing(double[] grades) {
        int count = 0;
        for (double grade : grades) {
            if (grade >= 4.0) {
                count++;
            }
        }
        return count;
    }

    /**
     * Affiche toutes les notes du tableau.
     * 
     * @param grades le tableau de notes à afficher
     */
    public static void displayGrades(double[] grades) {
        System.out.println("Notes des étudiants :");
        for (int i = 0; i < grades.length; i++) {
            System.out.println("  Étudiant " + (i + 1) + " : " + grades[i]);
        }
    }

    /**
     * Affiche un rapport complet des statistiques.
     * 
     * @param grades le tableau de notes
     */
    public static void displayStatistics(double[] grades) {
        System.out.println("\n╔════════════════════════════════╗");
        System.out.println("║     STATISTIQUES DES NOTES     ║");
        System.out.println("╚════════════════════════════════╝");

        // On appelle chaque fonction pour obtenir les statistiques
        double average = calculateAverage(grades);
        double minimum = findMinimum(grades);
        double maximum = findMaximum(grades);
        int passing = countPassing(grades);
        int failing = grades.length - passing;

        System.out.println("Nombre d'étudiants : " + grades.length);
        System.out.println("Moyenne générale   : " + average);
        System.out.println("Note minimale      : " + minimum);
        System.out.println("Note maximale      : " + maximum);
        System.out.println("Réussites (≥ 4.0)  : " + passing);
        System.out.println("Échecs (< 4.0)     : " + failing);

        // Calcul du taux de réussite
        double successRate = (passing * 100.0) / grades.length;
        System.out.println("Taux de réussite   : " + successRate + " %");
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Décomposition en fonctions ===\n");

        // Données : notes de 8 étudiants
        double[] grades = { 5.5, 3.5, 4.0, 6.0, 4.5, 3.0, 5.0, 4.5 };

        // Affichage des notes
        displayGrades(grades);

        // Affichage des statistiques (qui utilise toutes les autres fonctions)
        displayStatistics(grades);

        System.out.println("\n=== Avantages de la décomposition ===");
        System.out.println("✓ Code plus lisible : chaque fonction a un nom explicite");
        System.out.println("✓ Code réutilisable : on peut appeler calculateAverage() ailleurs");
        System.out.println("✓ Plus facile à tester : on peut tester chaque fonction séparément");
        System.out.println("✓ Plus facile à maintenir : si on veut changer le calcul,");
        System.out.println("  on modifie une seule fonction");

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
