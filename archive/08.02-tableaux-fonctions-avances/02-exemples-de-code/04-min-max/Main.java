/**
 * Démonstration d'algorithmes de recherche du minimum et du maximum.
 * 
 * Ce programme illustre différentes techniques pour trouver les valeurs
 * extrêmes dans un tableau, appliquées au suivi de production d'énergie
 * solaire dans un quartier.
 */
public class Main {

    

    /**
     * Affiche la production pour chaque mois.
     */
    public static void displayProduction(double[] production, String[] months) {
        for (int i = 0; i < production.length; i++) {
            System.out.println(String.format("%s : %.1f kWh", months[i], production[i]));
        }
    }

    /**
     * Démontre la recherche du minimum avec différentes boucles.
     */
    public static void demonstrateFindMin(double[] production, String[] months) {
        // Recherche avec for
        System.out.println("--- Recherche avec for ---");
        double minFor = findMinFor(production);
        int minIndexFor = findIndexFor(production, minFor);
        System.out.println(String.format("Production minimale : %.1f kWh (%s)",
                minFor, months[minIndexFor]));

        // Recherche avec for-each
        System.out.println("\n--- Recherche avec for-each ---");
        double minForEach = findMinForEach(production);
        System.out.println(String.format("Production minimale : %.1f kWh", minForEach));

        // Recherche avec while
        System.out.println("\n--- Recherche avec while ---");
        double minWhile = findMinWhile(production);
        System.out.println(String.format("Production minimale : %.1f kWh", minWhile));
    }

    /**
     * Recherche du minimum avec boucle for.
     */
    public static double findMinFor(double[] array) {
        double min = array[0];

        for (int i = 1; i < array.length; i++) {
            if (array[i] < min) {
                min = array[i];
            }
        }

        return min;
    }

    /**
     * Recherche du minimum avec boucle for-each.
     */
    public static double findMinForEach(double[] array) {
        double min = array[0];

        for (double value : array) {
            if (value < min) {
                min = value;
            }
        }

        return min;
    }

    /**
     * Recherche du minimum avec boucle while.
     */
    public static double findMinWhile(double[] array) {
        double min = array[0];
        int index = 1;

        while (index < array.length) {
            if (array[index] < min) {
                min = array[index];
            }
            index++;
        }

        return min;
    }

    /**
     * Démontre la recherche du maximum avec différentes boucles.
     */
    public static void demonstrateFindMax(double[] production, String[] months) {
        // Recherche avec for
        System.out.println("--- Recherche avec for ---");
        double maxFor = findMaxFor(production);
        int maxIndexFor = findIndexFor(production, maxFor);
        System.out.println(String.format("Production maximale : %.1f kWh (%s)",
                maxFor, months[maxIndexFor]));

        // Recherche avec while
        System.out.println("\n--- Recherche avec while ---");
        double maxWhile = findMaxWhile(production);
        System.out.println(String.format("Production maximale : %.1f kWh", maxWhile));

        // Recherche avec do-while
        System.out.println("\n--- Recherche avec do-while ---");
        double maxDoWhile = findMaxDoWhile(production);
        System.out.println(String.format("Production maximale : %.1f kWh", maxDoWhile));
    }

    /**
     * Recherche du maximum avec boucle for.
     */
    public static double findMaxFor(double[] array) {
        double max = array[0];

        for (int i = 1; i < array.length; i++) {
            if (array[i] > max) {
                max = array[i];
            }
        }

        return max;
    }

    /**
     * Recherche du maximum avec boucle while.
     */
    public static double findMaxWhile(double[] array) {
        double max = array[0];
        int index = 1;

        while (index < array.length) {
            if (array[index] > max) {
                max = array[index];
            }
            index++;
        }

        return max;
    }

    /**
     * Recherche du maximum avec boucle do-while.
     */
    public static double findMaxDoWhile(double[] array) {
        double max = array[0];
        int index = 1;

        if (array.length > 1) {
            do {
                if (array[index] > max) {
                    max = array[index];
                }
                index++;
            } while (index < array.length);
        }

        return max;
    }

    /**
     * Recherche simultanée du minimum et du maximum (plus efficace).
     */
    public static void demonstrateFindMinMax(double[] production, String[] months) {
        if (production.length == 0) {
            System.out.println("Pas de données disponibles");
            return;
        }

        double min = production[0];
        double max = production[0];
        int minIndex = 0;
        int maxIndex = 0;

        for (int i = 1; i < production.length; i++) {
            if (production[i] < min) {
                min = production[i];
                minIndex = i;
            }
            if (production[i] > max) {
                max = production[i];
                maxIndex = i;
            }
        }

        System.out.println("Recherche en un seul parcours :");
        System.out.println(String.format("Minimum : %.1f kWh (%s)", min, months[minIndex]));
        System.out.println(String.format("Maximum : %.1f kWh (%s)", max, months[maxIndex]));
        System.out.println(String.format("Variation : %.1f kWh", max - min));
    }

    /**
     * Trouve l'indice d'une valeur donnée.
     */
    public static int findIndexFor(double[] array, double value) {
        for (int i = 0; i < array.length; i++) {
            if (Math.abs(array[i] - value) < 0.001) { // Comparaison de doubles
                return i;
            }
        }
        return -1;
    }

    /**
     * Analyse complète de la production annuelle.
     */
    public static void analyzeProduction(double[] production, String[] months) {
        double min = findMinFor(production);
        double max = findMaxFor(production);
        int minIndex = findIndexFor(production, min);
        int maxIndex = findIndexFor(production, max);

        // Calcul de la production totale et moyenne
        double total = 0;
        for (double value : production) {
            total += value;
        }
        double average = total / production.length;

        System.out.println("Bilan annuel de la production solaire :");
        System.out.println(String.format("- Production totale : %.1f kWh", total));
        System.out.println(String.format("- Production moyenne : %.1f kWh/mois", average));
        System.out.println(String.format("- Mois le plus faible : %s (%.1f kWh)",
                months[minIndex], min));
        System.out.println(String.format("- Mois le plus fort : %s (%.1f kWh)",
                months[maxIndex], max));

        // Conseil d'optimisation
        double ratio = max / min;
        if (ratio > 4.0) {
            System.out.println("\n💡 Conseil : La production varie fortement selon les saisons.");
            System.out.println("Envisagez un système de stockage par batterie pour " +
                    "équilibrer la consommation.");
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Recherche du minimum et du maximum ===\n");

        // Production d'énergie solaire (kWh) d'un panneau partagé sur 12 mois
        double[] solarProduction = { 45.2, 62.8, 95.5, 128.3, 156.7, 165.2,
                170.8, 158.4, 122.6, 88.9, 52.3, 38.1 };
        String[] months = { "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" };

        System.out.println("Production solaire annuelle :");
        displayProduction(solarProduction, months);

        System.out.println("\n=== Recherche du minimum ===\n");
        demonstrateFindMin(solarProduction, months);

        System.out.println("\n=== Recherche du maximum ===\n");
        demonstrateFindMax(solarProduction, months);

        System.out.println("\n=== Recherche simultanée ===\n");
        demonstrateFindMinMax(solarProduction, months);

        System.out.println("\n=== Analyse annuelle ===\n");
        analyzeProduction(solarProduction, months);

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
