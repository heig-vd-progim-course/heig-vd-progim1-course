/**
 * Démonstration de techniques de parcours avec exclusion des bornes.
 * 
 * Ce programme illustre comment parcourir un tableau en excluant le premier
 * et/ou le dernier élément, utile pour éliminer des valeurs extrêmes ou
 * traiter uniquement les données "intérieures".
 */
public class Main {

    

    /**
     * Affiche toutes les températures avec leurs jours.
     */
    public static void displayAllTemperatures(double[] temperatures) {
        for (int i = 0; i < temperatures.length; i++) {
            System.out.println(String.format("Jour %d : %.1f°C", i + 1, temperatures[i]));
        }
    }

    /**
     * Parcours en excluant la première valeur.
     * 
     * Utile pour ignorer une mesure initiale potentiellement erronée.
     */
    public static void displayWithoutFirst(double[] temperatures) {
        System.out.println("Températures (sans le jour 1) :");

        for (int i = 1; i < temperatures.length; i++) {
            System.out.println(String.format("Jour %d : %.1f°C", i + 1, temperatures[i]));
        }
    }

    /**
     * Parcours en excluant la dernière valeur.
     * 
     * Utile pour ignorer une mesure finale potentiellement erronée.
     */
    public static void displayWithoutLast(double[] temperatures) {
        System.out.println("Températures (sans le jour 7) :");

        for (int i = 0; i < temperatures.length - 1; i++) {
            System.out.println(String.format("Jour %d : %.1f°C", i + 1, temperatures[i]));
        }
    }

    /**
     * Parcours en excluant les deux bornes avec boucle for.
     * 
     * Élimine les valeurs extrêmes pour une analyse plus robuste.
     */
    public static void displayWithoutBounds(double[] temperatures) {
        if (temperatures.length < 3) {
            System.out.println("Pas assez de données pour exclure les bornes.");
            return;
        }

        System.out.println("Températures (sans jours 1 et 7) :");

        for (int i = 1; i < temperatures.length - 1; i++) {
            System.out.println(String.format("Jour %d : %.1f°C", i + 1, temperatures[i]));
        }
    }

    /**
     * Parcours en excluant les deux bornes avec boucle while.
     * 
     * Alternative à la boucle for pour le même résultat.
     */
    public static void displayWithoutBoundsWhile(double[] temperatures) {
        if (temperatures.length < 3) {
            System.out.println("Pas assez de données pour exclure les bornes.");
            return;
        }

        System.out.println("Températures (sans jours 1 et 7) :");

        int index = 1;
        while (index < temperatures.length - 1) {
            System.out.println(String.format("Jour %d : %.1f°C", index + 1, temperatures[index]));
            index++;
        }
    }

    /**
     * Compare les moyennes avec et sans exclusion des bornes.
     * 
     * Démontre l'impact des valeurs extrêmes sur les statistiques.
     */
    public static void compareAverages(double[] temperatures) {
        // Moyenne avec toutes les valeurs
        double fullSum = 0;
        for (int i = 0; i < temperatures.length; i++) {
            fullSum += temperatures[i];
        }
        double fullAverage = fullSum / temperatures.length;

        // Moyenne sans les bornes
        if (temperatures.length >= 3) {
            double trimmedSum = 0;
            int trimmedCount = 0;

            for (int i = 1; i < temperatures.length - 1; i++) {
                trimmedSum += temperatures[i];
                trimmedCount++;
            }

            double trimmedAverage = trimmedSum / trimmedCount;

            System.out.println(String.format("Moyenne avec toutes les valeurs : %.2f°C", fullAverage));
            System.out.println(String.format("Moyenne sans les bornes : %.2f°C", trimmedAverage));
            System.out.println(String.format("Différence : %.2f°C",
                    Math.abs(fullAverage - trimmedAverage)));

            // Interprétation pour le jardinage
            if (Math.abs(fullAverage - trimmedAverage) > 2.0) {
                System.out.println("\n💡 Observation : Les valeurs extrêmes influencent " +
                        "significativement la moyenne.");
                System.out.println("Pour planifier vos cultures, utilisez plutôt la moyenne " +
                        "sans les extrêmes.");
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Exclusion des bornes ===\n");

        // Mesures de température dans un jardin partagé sur une semaine (°C)
        double[] temperatures = { -5.0, 12.5, 15.3, 18.2, 16.8, 14.1, 32.0 };

        System.out.println("Températures mesurées sur 7 jours :");
        displayAllTemperatures(temperatures);

        System.out.println("\n--- Exclusion de la première valeur ---");
        displayWithoutFirst(temperatures);

        System.out.println("\n--- Exclusion de la dernière valeur ---");
        displayWithoutLast(temperatures);

        System.out.println("\n--- Exclusion des deux bornes ---");
        displayWithoutBounds(temperatures);

        System.out.println("\n--- Exclusion avec while ---");
        displayWithoutBoundsWhile(temperatures);

        System.out.println("\n--- Analyse comparative ---");
        compareAverages(temperatures);

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
