package utils;

/**
 * Classe utilitaire pour effectuer des calculs statistiques.
 * 
 * Cette classe contient uniquement des méthodes statiques.
 */
public class Calculator {

    /**
     * Calcule la moyenne d'un tableau de nombres.
     * 
     * @param values le tableau de valeurs
     * @return la moyenne, ou 0 si le tableau est vide
     */
    public static double average(double[] values) {
        if (values.length == 0) {
            return 0;
        }

        double sum = 0;
        for (double value : values) {
            sum += value;
        }
        return sum / values.length;
    }

    /**
     * Trouve la valeur maximale dans un tableau.
     * 
     * @param values le tableau de valeurs
     * @return la valeur maximale, ou Double.MIN_VALUE si vide
     */
    public static double max(double[] values) {
        if (values.length == 0) {
            return Double.MIN_VALUE;
        }

        double maximum = values[0];
        for (double value : values) {
            if (value > maximum) {
                maximum = value;
            }
        }
        return maximum;
    }

    /**
     * Trouve la valeur minimale dans un tableau.
     * 
     * @param values le tableau de valeurs
     * @return la valeur minimale, ou Double.MAX_VALUE si vide
     */
    public static double min(double[] values) {
        if (values.length == 0) {
            return Double.MAX_VALUE;
        }

        double minimum = values[0];
        for (double value : values) {
            if (value < minimum) {
                minimum = value;
            }
        }
        return minimum;
    }

    /**
     * Calcule un pourcentage.
     * 
     * @param value la valeur
     * @param total le total
     * @return le pourcentage (0-100)
     */
    public static double percentage(double value, double total) {
        if (total == 0) {
            return 0;
        }
        return (value / total) * 100;
    }
}
