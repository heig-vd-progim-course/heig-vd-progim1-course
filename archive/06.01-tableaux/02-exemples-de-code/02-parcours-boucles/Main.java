/**
 * Exemple de parcours d'un tableau avec différentes boucles.
 * 
 * Cet exemple montre comment utiliser for, for-each et while pour parcourir un
 * tableau et calculer des statistiques simples.
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("=== Exemple : Parcours avec différentes boucles ===\n");

        // Tableau des températures de la semaine
        double[] temperatures = { 18.5, 21.0, 19.5, 22.0, 20.5, 23.0, 21.5 };
        String[] days = { "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche" };

        // Parcours avec boucle for classique
        System.out.println("Températures de la semaine (boucle for) :");
        for (int i = 0; i < temperatures.length; i++) {
            System.out.println(days[i] + " : " + temperatures[i] + "°C");
        }

        // Parcours avec boucle for-each
        System.out.println("\nToutes les températures (boucle for-each) :");
        for (double temp : temperatures) {
            System.out.println(temp + "°C");
        }

        // Calcul de la somme avec boucle for
        double sum = 0;
        for (int i = 0; i < temperatures.length; i++) {
            sum += temperatures[i];
        }
        double average = sum / temperatures.length;
        System.out.println("\nTempérature moyenne : " + average + "°C");

        // Recherche du maximum avec boucle for-each
        double max = temperatures[0];
        for (double temp : temperatures) {
            if (temp > max) {
                max = temp;
            }
        }
        System.out.println("Température maximale : " + max + "°C");

        // Parcours avec while pour compter les jours au-dessus de 20°C
        int count = 0;
        int index = 0;
        while (index < temperatures.length) {
            if (temperatures[index] > 20.0) {
                count++;
            }
            index++;
        }
        System.out.println("\nNombre de jours avec température > 20°C : " + count);

        System.out.println("\n=== Fin de l'exemple ===");
    }
}
