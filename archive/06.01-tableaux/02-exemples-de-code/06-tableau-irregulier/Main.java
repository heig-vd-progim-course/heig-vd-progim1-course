/**
 * Exemple d'utilisation de tableaux irréguliers (jagged arrays).
 * 
 * Cet exemple montre comment créer et manipuler des tableaux 2D avec des lignes
 * de longueurs différentes.
 */
public class Main {
    

    /**
     * Affiche un planning hebdomadaire de manière lisible.
     *
     * @param schedule le planning à afficher (tableau irrégulier)
     */
    public static void displaySchedule(int[][] schedule) {
        for (int week = 0; week < schedule.length; week++) {
            System.out.print("Semaine " + (week + 1) + " :");
            for (int day = 0; day < schedule[week].length; day++) {
                System.out.print(" " + schedule[week][day] + "h");
            }
            System.out.println(" (" + schedule[week].length + " jours)");
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Tableau irrégulier ===\n");

        // Planning hebdomadaire avec un nombre de jours variable
        // Semaine 1: 3 jours, Semaine 2: 5 jours, Semaine 3: 2 jours, Semaine 4: 4
        // jours
        int[][] weeklyHours = {
                { 8, 7, 6 }, // Semaine 1: 3 jours
                { 8, 8, 8, 8, 7 }, // Semaine 2: 5 jours
                { 6, 7 }, // Semaine 3: 2 jours
                { 8, 8, 6, 7 } // Semaine 4: 4 jours
        };

        // Affichage du planning
        System.out.println("Planning des heures travaillées :");
        displaySchedule(weeklyHours);

        // Calcul des heures par semaine
        System.out.println("\nHeures totales par semaine :");
        for (int week = 0; week < weeklyHours.length; week++) {
            int total = 0;
            for (int day = 0; day < weeklyHours[week].length; day++) {
                total += weeklyHours[week][day];
            }
            System.out.println("Semaine " + (week + 1) + " : " + total + " heures");
        }

        // Calcul du total général
        int grandTotal = 0;
        for (int week = 0; week < weeklyHours.length; week++) {
            for (int day = 0; day < weeklyHours[week].length; day++) {
                grandTotal += weeklyHours[week][day];
            }
        }
        System.out.println("\nTotal général : " + grandTotal + " heures");

        // Moyenne d'heures par jour travaillé
        int totalDays = 0;
        for (int week = 0; week < weeklyHours.length; week++) {
            totalDays += weeklyHours[week].length;
        }
        double averageHours = (double) grandTotal / totalDays;
        System.out.println("Moyenne par jour : " + averageHours + " heures");

        // Exemple avec des notes d'étudiants (nombre variable de notes par étudiant)
        System.out.println("\n--- Notes des étudiants ---\n");
        double[][] studentGrades = {
                { 5.5, 4.0, 5.0 }, // Étudiant 1: 3 notes
                { 4.5, 5.5, 6.0, 5.0 }, // Étudiant 2: 4 notes
                { 5.0, 4.5 }, // Étudiant 3: 2 notes
                { 6.0, 5.5, 5.0, 4.5, 5.5 } // Étudiant 4: 5 notes
        };

        System.out.println("Moyennes des étudiants :");
        for (int student = 0; student < studentGrades.length; student++) {
            double sum = 0;
            for (int grade = 0; grade < studentGrades[student].length; grade++) {
                sum += studentGrades[student][grade];
            }
            double average = sum / studentGrades[student].length;
            System.out.println("Étudiant " + (student + 1) + " (" + 
                    studentGrades[student].length + " notes) : " + average);
        }

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
