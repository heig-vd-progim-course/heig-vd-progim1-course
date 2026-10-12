/**
 * Démonstration de différentes techniques de parcours avec saut d'éléments.
 * 
 * Ce programme illustre comment parcourir un tableau en ne considérant qu'un
 * élément sur deux, utile pour analyser des données par paires ou optimiser
 * des traitements.
 */
public class Main {

    

    /**
     * Affiche toutes les valeurs du tableau avec leurs indices.
     */
    public static void displayAllConsumption(double[] consumption) {
        for (int i = 0; i < consumption.length; i++) {
            String period;
            if (i % 2 == 0) {
                period = "jour";
            } else {
                period = "nuit";
            }
            System.out.println(String.format("Jour %d (%s) : %.1f kWh",
                    (i / 2) + 1, period, consumption[i]));
        }
    }

    /**
     * Parcours des éléments d'indice pair avec boucle for et i += 2.
     * 
     * C'est l'approche la plus efficace car elle évite les itérations inutiles.
     */
    public static void displayDayConsumptionWithFor(double[] consumption) {
        System.out.println("Consommation de jour uniquement :");

        for (int i = 0; i < consumption.length; i += 2) {
            System.out.println(String.format("Jour %d : %.1f kWh", (i / 2) + 1, consumption[i]));
        }
    }

    /**
     * Parcours des éléments d'indice pair avec boucle while.
     * 
     * Alternative à la boucle for, utile quand le saut n'est pas constant.
     */
    public static void displayDayConsumptionWithWhile(double[] consumption) {
        System.out.println("Consommation de jour uniquement :");

        int index = 0;
        while (index < consumption.length) {
            System.out.println(String.format("Jour %d : %.1f kWh",
                    (index / 2) + 1, consumption[index]));
            index += 2; // Saut de 2 positions
        }
    }

    /**
     * Parcours avec test de modulo pour filtrer les indices pairs.
     * 
     * Moins efficace que i += 2 car elle itère sur tous les éléments,
     * mais utile quand la condition de saut est plus complexe.
     */
    public static void displayDayConsumptionWithModulo(double[] consumption) {
        System.out.println("Consommation de jour uniquement :");

        for (int i = 0; i < consumption.length; i++) {
            if (i % 2 == 0) { // Traite uniquement les indices pairs
                System.out.println(String.format("Jour %d : %.1f kWh",
                        (i / 2) + 1, consumption[i]));
            }
        }
    }

    /**
     * Analyse comparative entre consommation de jour et de nuit.
     * 
     * Utilise deux parcours avec saut pour calculer les moyennes séparément.
     */
    public static void analyzeConsumption(double[] consumption) {
        double dayTotal = 0;
        double nightTotal = 0;
        int dayCount = 0;
        int nightCount = 0;

        // Calcul de la consommation de jour (indices pairs)
        for (int i = 0; i < consumption.length; i += 2) {
            dayTotal += consumption[i];
            dayCount++;
        }

        // Calcul de la consommation de nuit (indices impairs)
        for (int i = 1; i < consumption.length; i += 2) {
            nightTotal += consumption[i];
            nightCount++;
        }

        double dayAverage = dayTotal / dayCount;
        double nightAverage = nightTotal / nightCount;

        System.out.println(String.format("Consommation moyenne de jour : %.2f kWh", dayAverage));
        System.out.println(String.format("Consommation moyenne de nuit : %.2f kWh", nightAverage));
        System.out.println(String.format("Différence : %.2f kWh", dayAverage - nightAverage));

        // Conseil d'optimisation énergétique
        if (dayAverage > nightAverage * 1.3) {
            System.out.println("\n💡 Conseil : Envisagez de déplacer certaines activités " +
                    "énergivores vers les heures de nuit pour réduire la consommation.");
        }
    }

    public static void main(String[] args) {
        System.out.println("=== Exemple : Parcours avec saut d'éléments ===\n");

        // Données : consommation énergétique d'un foyer (kWh) sur 10 jours
        // Les indices pairs représentent la consommation de jour
        // Les indices impairs représentent la consommation de nuit
        double[] consumption = { 12.5, 8.2, 15.3, 9.1, 11.8, 7.5, 13.2, 8.8, 14.1, 9.3 };

        System.out.println("Consommation énergétique complète :");
        displayAllConsumption(consumption);

        System.out.println("\n--- Approche 1 : Boucle for avec i += 2 ---");
        displayDayConsumptionWithFor(consumption);

        System.out.println("\n--- Approche 2 : Boucle while ---");
        displayDayConsumptionWithWhile(consumption);

        System.out.println("\n--- Approche 3 : Test de modulo ---");
        displayDayConsumptionWithModulo(consumption);

        System.out.println("\n--- Analyse comparative ---");
        analyzeConsumption(consumption);

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
